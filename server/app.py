#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response, jsonify, session
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Resource

# Local imports
from config import app, db, api

# Add your model imports
from models import User, Album, Collection, CollectionAlbum
# Views go here!


@app.route('/')
def index():
    return '<h1>Phase 4 Project Server</h1>'
#-------------------Endpoints I need ------------------------------------------

# User Login
class UserLogin(Resource):
    def post(self):
        data = request.get_json()
        if not data:
            return make_response({"message": "Missing request data"}, 400)

        username = data.get("username")
        password = data.get("password")

        if not username or not password:
            return make_response({"message": "Invalid request data"}, 400)

        user = User.query.filter_by(username=username).first()

        if not user or not user.check_password(password):
            return make_response({"message": "Invalid username or password"}, 401)

        session[user.id] = user.id

        return user.to_dict()

api.add_resource(UserLogin, "/api/login")




#Get All Users 
class Users(Resource):

    def get(self):
        users = User.query.all()
        serialized_users = [user.to_dict(rules=("-collections", "-user_albums"))for user in users]
        return make_response(jsonify(serialized_users), 200)
    
    def post(self):
        data = request.json
        try:
            user = User(
                username = data["username"],
                password = data["password"],
                profile_picture = data["profile_picture"],  
            )
        except ValueError as v_error:
            return make_response({ "errors": [str(v_error)]}, 400)
        
        db.session.add(user)
        db.session.commit()
        return make_response(user.to_dict(rules=("-collections", "-user_albums"))), 201

api.add_resource(Users, "/api/users")

#Get User Profile
class UserProfile(Resource):
    def get(self, user_id):
        user = User.query.get(user_id)
        if user:
            serialized_user = {
                "id": user.id,
                "username": user.username,
                "profile_picture": user.profile_picture,
            }
            return make_response(serialized_user, 200)
        else:
            return {"message": "User not found"}, 404

api.add_resource(UserProfile, "/api/profile/<int:user_id>")

#Get User Collections
class Collections(Resource):
    def get(self, user_id):
        collections = Collection.query.filter_by(user_id=user_id)
        serialized_collections = []

        for collection in collections:
            serialized_collection = {
                "id": collection.id,
                "title": collection.title,
                "user_id": collection.user_id,
                "albums": [album.to_dict() for album in collection.albums] 
            }
            serialized_collections.append(serialized_collection)

        return make_response(serialized_collections, 200)
    
api.add_resource(Collections, "/api/users/<int:user_id>/collections")

#Get User Favorites
class UserFavorites(Resource):
    def get(self, user_id, collection_id):
                collections = Collection.query.filter_by(user_id=user_id, collection_id=collection_id)
                return make_response([collection.to_dict() for collection in collections], 200)
    
    def post(self, user_id, collection_id):
        data = request.json
        try:
            collection = Collection(
                user_id = user_id,
                collection_id = collection_id,
                album_id = data["album_id"],  
            )
        except ValueError as v_error:
            return make_response({ "errors": [str(v_error)]}, 400)
        
        db.session.add(collection)
        db.session.commit()
        return make_response(collection.to_dict()), 201

api.add_resource(UserFavorites, "/api/collections/<int:collection_id>/user/<int:user_id>")



    
#Get All Albums
class Albums(Resource):
    def get(self):
        albums = Album.query.all()
        return make_response([album.to_dict() for album in albums], 200)

api.add_resource(Albums, "/api/albums")

#Get Album by Id
class AlbumById(Resource):
    def get(self, album_id):
     album = Album.query.get(album_id)
     #check for album and return message
     return make_response(album.to_dict(), 200)
api.add_resource(AlbumById, "/api/albums/<int:album_id>")

# Add Album to collection
class AddAlbumToCollection(Resource):
    def post(self, collection_id, album_id):
        collection = Collection.query.get(collection_id)
        album = Album.query.get(album_id)
        
        if not album:
            return {"message": "Album not found"}, 404

        if collection and album:
            if album not in collection.albums:
                collection.albums.append(album)
                db.session.commit()
                return {"message": "Album added to collection"}, 201
            else:
                return {"message": "Album already in collection"}, 409
        else:
            return {"message": "Collection or Album not found"}, 404

api.add_resource(AddAlbumToCollection, "/api/collections/<int:collection_id>/albums/<int:album_id>")

# Remove Album from collection
class RemoveAlbumFromCollection(Resource):
    def delete(self, collection_id, album_id):
        collection = Collection.query.get(collection_id)
        album = Album.query.get(album_id)

        if not collection or not album:
            return {"message": "Collection or Album not found"}, 404

        collection_album = CollectionAlbum.query.filter_by(collection_id=collection.id, album_id=album.id).first()

        if collection_album:
            db.session.delete(collection_album)  
            db.session.commit()
            return {"message": "Album removed from collection"}, 200
        else:
            return {"message": "Album not in collection"}, 404

api.add_resource(RemoveAlbumFromCollection, "/api/collections/<int:collection_id>/albums/<int:album_id>")


if __name__ == '__main__':
    app.run(port=5555, debug=True)


#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response, jsonify
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

#User Login
class UserLogin(Resource):
    def post(self):
        data = request.get_json()
        username = data.get("username")
        password = data.get("password")

        if not username or not password:
            return {"message":"Invalid username or password"}, 400
        
        user = User.query.filter_by(username=username).first()

        if user and user.password == password:
            return {"message": "Login successful", "user_id": user.id}, 200
        else:
            return {"message": "Invalid username or password"}, 401
        
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

#Get All Collections
class Collections(Resource):
    def get(self):
        collections = Collection.query.all()
        serialized_collections = []

        for collection in collections:
            serialized_collection = {
                "id": collection.id,
                "title": collection.title,
                "user_id": collection.user_id
            }
            serialized_collections.append(serialized_collection)

        return make_response(serialized_collections, 200)
    
api.add_resource(Collections, "/api/collections")
    
#Get All Albums
class Albums(Resource):
    def get(self):
        albums = Album.query.all()
        return make_response([album.to_dict() for album in albums], 200)

api.add_resource(Albums, "/api/albums")

#Add Album to collection
class AddAlbumToCollection(Resource):
    def post(self, collection_id, album_id):
        collection = Collection.query.get(collection_id)
        album = Album.query.get(album_id)
        
        if not collection or not album:
            return {"message": "Collection or Album not found"}, 404

        if album not in collection.albums:
            collection.albums.append(album)
            db.session.commit()
            return {"message": "Album added to collection"}, 201
        else:
            return {"message": "Album already in collection"}, 409

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


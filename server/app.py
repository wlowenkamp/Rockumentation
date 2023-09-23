#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response, jsonify, session
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Resource
import json 
import ipdb 

# Local imports
from config import app, db, api, bcrypt

# Add your model imports
from models import User, Album, Collection, AlbumCollection
# Views go here!


@app.route('/')
def index():
    return '<h1>Phase 4 Project Server</h1>'
#-------------------Endpoints I need ------------------------------------------

# Registration route
class UserRegister(Resource):
    def post(self):
        data = request.get_json()
        if not data:
            print("Received request with missing data")
            return make_response(jsonify({"message": "Missing request data"}), 400)

        username = data.get("username")
        password = data.get("password")
        profile_picture = data.get("profile_picture")

        print("Received data:", data)

        if not username or not password:
            print("Invalid request data - username or password missing")
            return make_response(jsonify({"message": "Invalid request data"}), 400)

        # Check for username
        existing_user = User.query.filter_by(username=username).first()
        if existing_user:
            print("Username already exists")
            return make_response(jsonify({"message": "Username already exists"}), 409)
            
        
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

        
        new_user = User(
            username=username,
            password=hashed_password,
            profile_picture=profile_picture
        )
        

        db.session.add(new_user)
        db.session.commit()

        new_collection=Collection(
            name= f"{username}'s Master Collection",
            user_id=new_user.id 
        )

        db.session.add(new_collection)
        db.session.commit()

        serialized_user = new_user.to_dict(rules=("-id", "-collection"))

        response_data = {
            "message": "Registration successful",
            "user": serialized_user
        }

        return response_data, 201

api.add_resource(UserRegister, "/api/register")


# User Login
class UserLogin(Resource):
    def post(self):
        data = request.get_json()
        username = data["username"]
        password = data["password"]

        user = User.query.filter_by(username=username).first()

        if user.authenticate(password):
            session["user_id"] = user.id
            user_data = user.to_dict(only=("username", "profile_picture"))
            return make_response(user_data, 202)
        else:
            return {"message": "Invalid username or password"}, 401

api.add_resource(UserLogin, "/api/login")


#Check Session
class CheckSession(Resource):
    def get(self):
        print(session)
        
        user = User.query.filter(User.id==session.get('user_id')).first()
        if user:
            return make_response(user.to_dict(only=("id","username", "profile_picture", "collection", "collection.albums", "collection.id")), 200)
        return {'message': 'Not logged in'}, 401
    

api.add_resource(CheckSession, "/api/check_session")

#User LogOut

class Logout(Resource):
    def delete(self):
        session["user_id"] = None
        return make_response("", 204)

api.add_resource(Logout, "/api/logout")




#Get All Users 
class Users(Resource):

    def get(self):
        users = User.query.all()
        serialized_users = [user.to_dict(rules=("-id", "-collection",)) for user in users]
        return make_response(jsonify(serialized_users), 200)
    
    def post(self):
        data = request.json
        try:
            new_user = User(
                username=data["username"],
                password_hash=data["password"],
                profile_picture=data["profile_picture"],  
            )
        except ValueError as v_error:
            return make_response({"errors": [str(v_error)]}, 400)
        
        db.session.add(new_user)
        db.session.commit()
        return make_response(new_user.to_dict(rules=("-id", "-collection",)), 201)

api.add_resource(Users, "/api/users")


# Get User Profile
class UserProfile(Resource):
    def get(self, username):
        user = User.query.filter_by(username=username).first()
        if user:
            return make_response(user.to_dict(only=("id", "username", "profile_picture", "collection")), 201)
        else:
            return {"message": "User not found"}, 404


api.add_resource(UserProfile, "/api/profile/<string:username>")

# Get User Collection
class UserCollection(Resource):
    def get(self, username):
        user = User.query.filter_by(username=username).first()
        if not user:
            return {"message": "User not found"}, 404

        collection = user.collection

        collection_data = [item.to_dict() for item in collection.albums]


        return jsonify(collection_data)

api.add_resource(UserCollection, "/api/users/<string:username>/collection", methods=["GET"])


   
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

# Add Album to Collection
class AddAlbumToCollection(Resource):
    def patch(self, username):
        user = User.query.filter_by(username=username).first()
        collection = user.collection
        data = request.get_json()

        
        collection.albums.append(data)
        try:
            db.session.commit()

        except: 
            db.session.rollback()
            return make_response("Album was not succesfully saved.", 500)

        return {"message": "Album added to collection successfully."}

api.add_resource(AddAlbumToCollection, "/api/users/<string:username>/collection")

# Remove Album from Collection
class RemoveAlbumFromCollection(Resource):
    def delete(self, user_id, album_id):
        user = User.query.get(user_id)
        album = Album.query.get(album_id)

        if not user or not album:
            return {"message": "User or Album not found"}, 404

        if album in user.collection:
            user.collection.remove(album)
            db.session.commit()
            return {"message": "Album removed from collection"}, 200
        else:
            return {"message": "Album not in collection"}, 404

api.add_resource(RemoveAlbumFromCollection, "/api/users/<string:username>/collection")

# Update Profile Pic
class UpdateProfilePicture(Resource):
    def patch(self, user_id):
        user = User.query.get(user_id)
        data = request.get_json()
        if not user:
            return {"message": "User not found"}, 404

        for attr in data:
            setattr(user, attr, data[attr])
        db.session.commit()

        return make_response(user.to_dict(only=("id", "profile_picture", "username",)), 200)

api.add_resource(UpdateProfilePicture, "/api/profile/<int:user_id>/profile_picture")

#Add To Collection post to create new instance of AlbumCollection
class AddToCollection(Resource):
    def post(self):
        data = request.json
        ac1 = AlbumCollection(album_id = data["album_id"], collection_id = data["collection_id"])
        print("#############################")
        print(ac1)
        print("#############################")

        db.session.add(ac1)
        try: 
            db.session.commit()
        except:
            db.session.rollback()
            return make_response({"error": "could not save albumcollection"},500)
        


        return make_response(ac1.album.to_dict())

api.add_resource(AddToCollection, "/api/addingnewalbum")



if __name__ == '__main__':
    app.run(port=5555, debug=True)


from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from sqlalchemy import MetaData
from config import db, bcrypt

metadata = MetaData(
    naming_convention={
        "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
        "uq": "uq_%(table_name)s_%(column_0_name)s",
        "ck": "ck_%(table_name)s_%(constraint_name)s",
        "ix": "ix_%(table_name)s_%(column_0_name)s",
    }
)

class User(db.Model, SerializerMixin):
    __tablename__ = "user"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    password = db.Column(db.String, nullable=False)
    profile_picture = db.Column(db.String)
    serialize_rules = ("-collections.user",)
    #password_hash = db.Column(db.String)

    # def get_password_hash(self):
    #     return self.password_hash
    
    # def set_password_hash(self, password_string):
    #     self.password_hash = bcrypt().generate_password_hash(password_string).decode("utf-8")

    # password_hash = property(get_password_hash, set_password_hash)

    # def authenticate(self, password_string):
    #     return bcrypt().check_password_hash(self.password_hash, password_string)

    def __repr__(self):
        return f"<User(id={self.id}, username={self.username})>"

    collections = db.relationship("Collection", back_populates="user")
    user_albums = association_proxy("collections", "collection_albums")

    @validates("username")
    def validates_username(self, key, new_username):
        if not new_username:
            raise ValueError("A username must be provided")
        elif len(new_username) > 20:
            raise ValueError("A username must be shorter than 15 characters")
        else:
            existing_user = User.query.filter(new_username == User.username).first()
            if existing_user:
                raise ValueError("That username already exists")
            return new_username

    @validates("password")
    def validates_password(self, key, new_password):
        if not new_password:
            raise ValueError("Please set a password")

        has_letter = False
        has_number = False

        for char in new_password:
            if char.isalpha():
                has_letter = True
            elif char.isdigit():
                has_number = True

            if has_letter and has_number:
                break

        if not (has_letter and has_number):
            raise ValueError(
                "Password must contain at least one letter AND at least one number"
            )
        return new_password
    
    @validates("profile_picture")
    def validates_profile_picture(self, key, new_profile_picture):
        if not new_profile_picture:
            new_profile_picture = "https://cdn.vectorstock.com/i/preview-1x/77/30/default-avatar-profile-icon-grey-photo-placeholder-vector-17317730.jpg"
        return new_profile_picture

class Collection(db.Model, SerializerMixin):
    __tablename__ = "collection"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    collection_albums = db.relationship("CollectionAlbum", backref="collection")
    user = db.relationship("User", back_populates="collections")

class CollectionAlbum(db.Model, SerializerMixin):
    __tablename__ = "collection_album"
    id = db.Column(db.Integer, primary_key=True)
    album_id = db.Column(db.Integer, db.ForeignKey("album.id"), nullable=False)
    collection_id = db.Column(
        db.Integer, db.ForeignKey("collection.id"), nullable=False
    )

class Album(db.Model, SerializerMixin):
    __tablename__ = "album"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    image = db.Column(db.String, nullable=False)
    artist = db.Column(db.String, nullable=False)
    genre = db.Column(db.String, nullable=False)
    release_year = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return f"<Album(id={self.id}, title={self.title}, artist={self.artist})>"

    collection_albums = db.relationship("CollectionAlbum", backref="album")

    @validates("title")
    def validates_title(self, key, new_title):
        if not new_title:
            raise ValueError("Album title must be provided")

        existing_album = Album.query.filter_by(title=new_title).first()
        
        if existing_album:
            for collection_album in existing_album.collection_albums:
                if collection_album.collection.user_id == self.collection_albums[0].collection.user_id:
                    raise ValueError("An album with this title already exists for this user")
        return new_title

    @validates("image")
    def validates_image(self, key, new_image):
        if not new_image:
            raise ValueError("An image URL must be provided")

        if not new_image.startswith("http://") and not new_image.startswith("https://"):
            raise ValueError("Invalid image URL format")
        return new_image

    @validates("artist")
    def validates_artist(self, key, new_artist):
        if not new_artist:
            raise ValueError("An artist name must be provided")
        return new_artist

    @validates("genre")
    def validates_genre(self, key, new_genre):
        if not new_genre:
            raise ValueError("A genre must be provided")
        return new_genre


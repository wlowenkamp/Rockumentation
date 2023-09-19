from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
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

    
    collection = db.relationship('Collection', uselist=False, back_populates='user')

    # master_collection = db.relationship("Collection", uselist=False, back_populates="user")

    def set_password(self, password):
        self.password = bcrypt.generate_password_hash(password).decode("utf-8")

    def check_password(self, password):
       return bcrypt.check_password_hash(self.password, password)

    def authenticate(self, passed_string):
        return bcrypt.check_password_hash(self.password, passed_string.encode("utf-8")) 
        
    def __repr__(self):
        return f"<User(id={self.id}, username={self.username})>"

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

    
class Collection(db.Model, SerializerMixin):
    __tablename__ = "collection"


    name = db.Column(db.String(255), primary_key=True, default="Master Collection")
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)

    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    user = db.relationship('User', back_populates='collection')






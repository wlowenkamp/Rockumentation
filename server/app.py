#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api

# Local imports
from config import app, db, api

# Add your model imports
from models import *

api.init_app(app)

# Views go here!

@app.route('/')
def index():
    return '<h1>Phase 4 Project Server</h1>'


if __name__ == '__main__':
    app.run(port=5555, debug=True)


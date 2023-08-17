#!/usr/bin/env python3

# Standard library imports
import random
import datetime


# Remote library imports
from faker import Faker

# Local imports
from app import app, db
from models import User, Album, Collection, CollectionAlbum


if __name__ == "__main__":
    fake = Faker()
    with app.app_context():
        print("Starting seed...")

        # Create Users

        def create_users():
            User.query.delete()

            usernames = ["Wlowenkamp", "Cmcgrath", "MusicGuy"]
            passwords = ["password1", "password1", "password1"]

            for username, password in zip(usernames, passwords):
                new_user = User(
                    username=username,
                    password=password,
                    profile_picture="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png",
                )

                db.session.add(new_user)
                db.session.commit()

                print("User created")

        # Create Collection --- users will create collections themselves
        def create_collection():
            pass

        # Create Album
        def create_albums():
            album_titles = [
                "Thriller",
                "The Dark Side of the Moon",
                "Abbey Road",
                "Hotel California",
                "Rumours",
                "Back in Black",
                "The Wall",
                "Led Zeppelin IV",
                "Nevermind",
                "Born to Run",
                "Purple Rain",
                "The Eminem Show",
                "Born in the U.S.A.",
                "The Joshua Tree",
                "The Queen Is Dead",
                "A Night at the Opera",
                "Sgt. Pepper's Lonely Hearts Club Band",
                "Bad",
                "The Chronic",
                "The College Dropout",
                "The Blueprint",
                "American Idiot",
                "In Utero",
                "The Marshall Mathers LP",
                "DAMN.",
                "Back to Black",
                "1989",
                "The Suburbs",
                "AM",
                "To Pimp a Butterfly",
                "Random Access Memories",
                "good kid, m.A.A.d city",
                "Swimming",
                "Hot Fuss",
                "Hozier",
                "Demon Days",
                "Pure Heroine",
                "Channel Orange",
                "Currents",
                "Funeral",
                "Wasting Light",
                "Yeezus",
                "Viva la Vida or Death and All His Friends",
                "Is This It",
                "Brothers",
                "Elephant",
                "Vessel",
                "Blonde",
                "Because the Internet",
                "The Black Parade",
                "Legend",
            ]

            album_artists = [
                "Michael Jackson",
                "Pink Floyd",
                "The Beatles",
                "Eagles",
                "Fleetwood Mac",
                "AC/DC",
                "Pink Floyd",
                "Led Zeppelin",
                "Nirvana",
                "Bruce Springsteen",
                "Prince",
                "Eminem",
                "Bruce Springsteen",
                "U2",
                "The Smiths",
                "Queen",
                "The Beatles",
                "Michael Jackson",
                "Dr. Dre",
                "Kanye West",
                "Jay-Z",
                "Green Day",
                "Nirvana",
                "Eminem",
                "Kendrick Lamar",
                "Amy Winehouse",
                "Taylor Swift",
                "Arcade Fire",
                "Arctic Monkeys",
                "Kendrick Lamar",
                "Daft Punk",
                "Kendrick Lamar",
                "Mac Miller",
                "The Killers",
                "Hozier",
                "Gorillaz",
                "Lorde",
                "Frank Ocean",
                "Tame Impala",
                "Arcade Fire",
                "Foo Fighters",
                "Kanye West",
                "Coldplay",
                "The Strokes",
                "The Black Keys",
                "The White Stripes",
                "Twenty One Pilots",
                "Frank Ocean",
                "Childish Gambino",
                "My Chemical Romance",
                "Bob Marley and The Wailers",
            ]

            album_images = [
                "https://www.albumartexchange.com/coverart/gallery/mi/michaeljackson_thriller_d33u.jpg",
                "https://upload.wikimedia.org/wikipedia/commons/c/c7/The_Dark_Side_of_the_Moon_Cover.svg",
                "https://upload.wikimedia.org/wikipedia/en/4/42/Beatles_-_Abbey_Road.jpg",
                "https://upload.wikimedia.org/wikipedia/en/4/49/Hotelcalifornia.jpg",
                "https://upload.wikimedia.org/wikipedia/en/f/fb/FMacRumours.PNG",
                "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/ACDC_Back_in_Black_cover.svg/1200px-ACDC_Back_in_Black_cover.svg.png",
                "https://i.discogs.com/KkYJreR35wMa8jIb58e51zjCk-mU23DM4aaaIUP7DFg/rs:fit/g:sm/q:90/h:547/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTM0MjEw/NjAtMTQ5NDUwMTY0/NC01NzM4LmpwZWc.jpeg",
                "https://upload.wikimedia.org/wikipedia/en/2/26/Led_Zeppelin_-_Led_Zeppelin_IV.jpg",
                "https://upload.wikimedia.org/wikipedia/en/b/b7/NirvanaNevermindalbumcover.jpg",
                "https://upload.wikimedia.org/wikipedia/en/thumb/7/7a/Born_to_Run_%28Front_Cover%29.jpg/220px-Born_to_Run_%28Front_Cover%29.jpg",
                "https://upload.wikimedia.org/wikipedia/en/9/9c/Princepurplerain.jpg",
                "https://upload.wikimedia.org/wikipedia/en/3/35/The_Eminem_Show.jpg",
                "https://upload.wikimedia.org/wikipedia/en/3/31/BruceBorn1984.JPG",
                "https://upload.wikimedia.org/wikipedia/en/6/6b/The_Joshua_Tree.png",
                "https://upload.wikimedia.org/wikipedia/en/e/ed/The-Queen-is-Dead-cover.png",
                "https://upload.wikimedia.org/wikipedia/en/4/4d/Queen_A_Night_At_The_Opera.png",
                "https://upload.wikimedia.org/wikipedia/en/5/50/Sgt._Pepper%27s_Lonely_Hearts_Club_Band.jpg",
                "https://upload.wikimedia.org/wikipedia/en/5/51/Michael_Jackson_-_Bad.png",
                "https://upload.wikimedia.org/wikipedia/en/1/19/Dr.DreTheChronic.jpg",
                "https://upload.wikimedia.org/wikipedia/en/a/a3/Kanyewest_collegedropout.jpg",
                "https://upload.wikimedia.org/wikipedia/en/2/2c/The_Blueprint.png",
                "https://upload.wikimedia.org/wikipedia/en/e/ed/Green_Day_-_American_Idiot_album_cover.png",
                "https://upload.wikimedia.org/wikipedia/en/e/e5/In_Utero_%28Nirvana%29_album_cover.jpg",
                "https://upload.wikimedia.org/wikipedia/en/a/ae/The_Marshall_Mathers_LP.jpg",
                "https://upload.wikimedia.org/wikipedia/en/5/51/Kendrick_Lamar_-_Damn.png",
                "https://upload.wikimedia.org/wikipedia/en/6/67/Amy_Winehouse_-_Back_to_Black_%28album%29.png",
                "https://upload.wikimedia.org/wikipedia/en/f/f6/Taylor_Swift_-_1989.png",
                "https://upload.wikimedia.org/wikipedia/en/8/81/Arcade_Fire_-_The_Suburbs.jpg",
                "https://upload.wikimedia.org/wikipedia/commons/e/e7/%22AM%22_%28Arctic_Monkeys%29.jpg",
                "https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2015/3/11/1426099817173/f1efb3f4-9a6d-4f78-8ca8-594ab646d198-bestSizeAvailable.jpeg?width=465&dpr=1&s=none",
                "https://upload.wikimedia.org/wikipedia/commons/7/74/Daft_Punk_-_Random_Access_Memories.jpg",
                "https://m.media-amazon.com/images/I/51xrNHAW7mL._UF1000,1000_QL80_.jpg",
                "https://m.media-amazon.com/images/I/51814ZhkdtS.jpg",
                "https://upload.wikimedia.org/wikipedia/en/1/17/The_Killers_-_Hot_Fuss.png",
                "https://upload.wikimedia.org/wikipedia/en/a/a0/Hozier_-_Hozier.png",
                "https://upload.wikimedia.org/wikipedia/en/d/df/Gorillaz_Demon_Days.PNG",
                "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Lorde_Pure_Heroine.png/800px-Lorde_Pure_Heroine.png",
                "https://upload.wikimedia.org/wikipedia/en/2/28/Channel_ORANGE.jpg",
                "https://upload.wikimedia.org/wikipedia/en/9/9b/Tame_Impala_-_Currents.png",
                "https://upload.wikimedia.org/wikipedia/en/2/25/ArcadeFireFuneralCover.jpg",
                "https://upload.wikimedia.org/wikipedia/en/0/05/Foo_Fighters_Wasting_Light_Album_Cover.jpg",
                "https://upload.wikimedia.org/wikipedia/en/0/03/Yeezus_album_cover.png",
                "https://upload.wikimedia.org/wikipedia/en/b/b2/Coldplay_-_Viva_la_Vida_or_Death_and_All_His_Friends.png",
                "https://upload.wikimedia.org/wikipedia/en/thumb/e/e7/The_Strokes_-_Ist_Tis_It_US_cover.png/220px-The_Strokes_-_Ist_Tis_It_US_cover.png",
                "https://upload.wikimedia.org/wikipedia/en/9/93/The_Black_Keys_-_Brothers.jpg",
                "https://upload.wikimedia.org/wikipedia/en/thumb/1/11/Elephant%2C_The_White_Stripes.png/220px-Elephant%2C_The_White_Stripes.png",
                "https://upload.wikimedia.org/wikipedia/en/2/20/Vessel_by_Twenty_One_Pilots.jpg",
                "https://upload.wikimedia.org/wikipedia/en/7/70/Childish-gambino-because-the-internet.gif",
                "https://upload.wikimedia.org/wikipedia/en/e/ea/Blackparadecover.jpg",
                "https://upload.wikimedia.org/wikipedia/en/c/c2/BobMarley-Legend.jpg",
            ]
            album_genres = [
                "Pop",
                "Progressive Rock",
                "Rock",
                "Rock",
                "Rock",
                "Rock",
                "Progressive Rock",
                "Rock",
                "Grunge",
                "Rock",
                "Pop/Rock",
                "Hip-Hop",
                "Rock",
                "Rock",
                "Indie Rock",
                "Rock",
                "Rock",
                "Pop",
                "Hip-Hop",
                "Hip-Hop",
                "Hip-Hop",
                "Punk Rock",
                "Grunge",
                "Hip-Hop",
                "Hip-Hop",
                "Soul/R&B",
                "Pop",
                "Indie Rock",
                "Indie Rock",
                "Hip-Hop",
                "Electronic",
                "Hip-Hop",
                "Hip-Hop",
                "Indie Rock",
                "Indie Folk",
                "Alternative Rock",
                "Pop",
                "Indie Pop",
                "R&B",
                "Psychedelic Rock",
                "Indie Rock",
                "Alternative Rock",
                "Hip-Hop",
                "Alternative Rock",
                "Indie Rock",
                "Blues Rock",
                "Indie Rock",
                "Indie Pop",
                "R&B",
                "Hip-Hop",
                "Reggae",
            ]

            album_release_years = [
                1982,
                1973,
                1969,
                1976,
                1977,
                1980,
                1979,
                1971,
                1991,
                1975,
                1984,
                2002,
                1984,
                1987,
                1986,
                1975,
                1975,
                1975,
                1987,
                1992,
                2001,
                2004,
                1994,
                1993,
                2000,
                2017,
                2006,
                2014,
                2013,
                2017,
                2013,
                2018,
                2012,
                2019,
                2014,
                2010,
                2013,
                2015,
                2007,
                2013,
                2010,
                2006,
                2019,
                2009,
                2003,
                2010,
                2016,
                2013,
                2007,
                1977,
            ]
            for title, artist, image, genre, release_year in zip(
                album_titles,
                album_artists,
                album_images,
                album_genres,
                album_release_years,
            ):
                new_album = Album(
                    title=title,
                    artist=artist,
                    image=image,
                    genre=genre,
                    release_year=release_year,
                )
                db.session.add(new_album)
                db.session.commit()

        print("Seeding users..")
        create_users()

        print("Seeding albums...")
        create_albums()

        print("Seeding collections")
        create_collection()

        print("Seeding complete!")

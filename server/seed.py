#!/usr/bin/env python3

# Standard library imports
import random



# Remote library imports
from faker import Faker

# Local imports
from app import app, db
from models import User, Album, Collection




if __name__ == "__main__":
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        User.query.delete()
        Album.query.delete()
        Collection.query.delete()

        


        # Users
        users_data = [
            {"username": "Wlowenkamp", "password": "password1", "profile_picture": "https://scontent.fosu2-1.fna.fbcdn.net/v/t1.6435-9/53333154_2378574502176834_2128324052295614464_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=174925&_nc_ohc=LnJ0jB5bwlMAX_fsl-m&_nc_ht=scontent.fosu2-1.fna&oh=00_AfCLtxsaf0qxX9WNHMW0RHv5Q-he7HXIoa2tlzikn9mWLw&oe=65302B0C"},
            {"username": "Clowenkamp", "password": "password1", "profile_picture": "https://scontent.fosu2-2.fna.fbcdn.net/v/t1.6435-9/119816023_3536493099777858_4509614180732850408_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=174925&_nc_ohc=KDPxhP00j30AX8kL8Gk&_nc_ht=scontent.fosu2-2.fna&oh=00_AfD4EzhhYDmjxM1jvkOwcUWMTIqDdZXuKK0xFOvSKyQcUA&oe=653145E6"},
            {"username": "DannyDevito", "password": "password1", "profile_picture": "https://cdn.mos.cms.futurecdn.net/a9S8crNdUjgmaDGWQTbVVM-1920-80.jpg.webp"},

        ]

        # Seed Users and create "Master Collection" for each user
        for user_data in users_data:
            new_user = User(
                username=user_data["username"],
                profile_picture=user_data["profile_picture"]
            )
            new_user.set_password(user_data["password"]) 

            new_collection = Collection(
                # title="Favorites",
                user=new_user
            )

            db.session.add(new_user)
            db.session.add(new_collection)
            db.session.commit()



        print("Users and Master Collections seeded successfully")


        #Albums
        album_data = [
            Album(title="Thriller", image="https://www.albumartexchange.com/coverart/gallery/mi/michaeljackson_thriller_d33u.jpg", artist="Michael Jackson", genre="Pop", release_year=1982),
            Album(title="The Dark Side of the Moon", image="https://upload.wikimedia.org/wikipedia/commons/c/c7/The_Dark_Side_of_the_Moon_Cover.svg", artist="Pink Floyd", genre="Progressive Rock", release_year=1973),
            Album(title="Abbey Road", image="https://upload.wikimedia.org/wikipedia/en/4/42/Beatles_-_Abbey_Road.jpg", artist="The Beatles", genre="Rock", release_year=1969),
            Album(title="Hotel California", image="https://upload.wikimedia.org/wikipedia/en/4/49/Hotelcalifornia.jpg", artist="Eagles", genre="Rock", release_year=1976),
            Album(title="Rumours", image="https://upload.wikimedia.org/wikipedia/en/f/fb/FMacRumours.PNG", artist="Fleetwood Mac", genre="Rock", release_year=1977),
            Album(title="Back in Black", image="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/ACDC_Back_in_Black_cover.svg/1200px-ACDC_Back_in_Black_cover.svg.png", artist="AC/DC", genre="Rock", release_year=1980),
            Album(title="The Wall", image="https://i.discogs.com/KkYJreR35wMa8jIb58e51zjCk-mU23DM4aaaIUP7DFg/rs:fit/g:sm/q:90/h:547/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTM0MjEw/NjAtMTQ5NDUwMTY0/NC01NzM4LmpwZWc.jpeg", artist="Pink Floyd", genre="Progressive Rock", release_year=1979),
            Album(title="Led Zeppelin IV", image="https://upload.wikimedia.org/wikipedia/en/2/26/Led_Zeppelin_-_Led_Zeppelin_IV.jpg", artist="Led Zeppelin", genre="Rock", release_year=1971),
            Album(title="Nevermind", image="https://upload.wikimedia.org/wikipedia/en/b/b7/NirvanaNevermindalbumcover.jpg", artist="Nirvana", genre="Grunge", release_year=1991),
            Album(title="Born to Run", image="https://upload.wikimedia.org/wikipedia/en/thumb/7/7a/Born_to_Run_%28Front_Cover%29.jpg/220px-Born_to_Run_%28Front_Cover%29.jpg", artist="Bruce Springsteen", genre="Rock", release_year=1975),
            Album(title="Purple Rain", image="https://upload.wikimedia.org/wikipedia/en/9/9c/Princepurplerain.jpg", artist="Prince", genre="Pop/Rock", release_year=1984),
            Album(title="The Eminem Show", image="https://upload.wikimedia.org/wikipedia/en/3/35/The_Eminem_Show.jpg", artist="Eminem", genre="Hip-Hop", release_year=2002),
            Album(title="Born in the U.S.A.", image="https://upload.wikimedia.org/wikipedia/en/3/31/BruceBorn1984.JPG", artist="Bruce Springsteen", genre="Rock", release_year=1984),
            Album(title="The Joshua Tree", image="https://upload.wikimedia.org/wikipedia/en/6/6b/The_Joshua_Tree.png", artist="U2", genre="Rock", release_year=1987),
            Album(title="The Queen Is Dead", image="https://upload.wikimedia.org/wikipedia/en/e/ed/The-Queen-is-Dead-cover.png", artist="The Smiths", genre="Indie Rock", release_year=1986),
            Album(title="A Night at the Opera", image="https://upload.wikimedia.org/wikipedia/en/4/4d/Queen_A_Night_At_The_Opera.png", artist="Queen", genre="Rock", release_year=1975),
            Album(title="Sgt. Pepper's Lonely Hearts Club Band", image="https://upload.wikimedia.org/wikipedia/en/5/50/Sgt._Pepper%27s_Lonely_Hearts_Club_Band.jpg", artist="The Beatles", genre="Rock", release_year=1967),
            Album(title="Bad", image="https://upload.wikimedia.org/wikipedia/en/5/51/Michael_Jackson_-_Bad.png", artist="Michael Jackson", genre="Pop", release_year=1987),
            Album(title="The Chronic", image="https://upload.wikimedia.org/wikipedia/en/1/19/Dr.DreTheChronic.jpg", artist="Dr. Dre", genre="Hip-Hop", release_year=1992),
            Album(title="The College Dropout", image="https://upload.wikimedia.org/wikipedia/en/a/a3/Kanyewest_collegedropout.jpg", artist="Kanye West", genre="Hip-Hop", release_year=2004),
            Album(title="The Blueprint", image="https://upload.wikimedia.org/wikipedia/en/2/2c/The_Blueprint.png", artist="Jay-Z", genre="Hip-Hop", release_year=2001),
            Album(title="American Idiot", image="https://upload.wikimedia.org/wikipedia/en/e/ed/Green_Day_-_American_Idiot_album_cover.png", artist="Green Day", genre="Punk Rock", release_year=2004),
            Album(title="In Utero", image="https://upload.wikimedia.org/wikipedia/en/e/e5/In_Utero_%28Nirvana%29_album_cover.jpg", artist="Nirvana", genre="Grunge", release_year=1993),
            Album(title="The Marshall Mathers LP", image="https://upload.wikimedia.org/wikipedia/en/a/ae/The_Marshall_Mathers_LP.jpg", artist="Eminem", genre="Hip-Hop", release_year=2000),
            Album(title="DAMN.", image="https://upload.wikimedia.org/wikipedia/en/5/51/Kendrick_Lamar_-_Damn.png", artist="Kendrick Lamar", genre="Hip-Hop", release_year=2017),
            Album(title="Back to Black", image="https://upload.wikimedia.org/wikipedia/en/6/67/Amy_Winehouse_-_Back_to_Black_%28album%29.png", artist="Amy Winehouse", genre="Soul/R&B", release_year=2006),
            Album(title="1989", image="https://upload.wikimedia.org/wikipedia/en/f/f6/Taylor_Swift_-_1989.png", artist="Taylor Swift", genre="Pop", release_year=2014),
            Album(title="The Suburbs", image="https://upload.wikimedia.org/wikipedia/en/8/81/Arcade_Fire_-_The_Suburbs.jpg", artist="Arcade Fire", genre="Indie Rock", release_year=2010),
            Album(title="AM", image="https://upload.wikimedia.org/wikipedia/commons/e/e7/%22AM%22_%28Arctic_Monkeys%29.jpg", artist="Arctic Monkeys", genre="Indie Rock", release_year=2013),
            Album(title="To Pimp a Butterfly", image="https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2015/3/11/1426099817173/f1efb3f4-9a6d-4f78-8ca8-594ab646d198-bestSizeAvailable.jpeg?width=465&dpr=1&s=none", artist="Kendrick Lamar", genre="Hip-Hop", release_year=2015),
            Album(title="good kid, m.A.A.d city", image="https://m.media-amazon.com/images/I/51xrNHAW7mL._UF1000,1000_QL80_.jpg", artist="Kendrick Lamar", genre="Hip-Hop", release_year=2012),
            Album(title="Swimming", image="https://m.media-amazon.com/images/I/51814ZhkdtS.jpg", artist="Mac Miller", genre="Hip-Hop", release_year=2018),
            Album(title="Hot Fuss", image="https://upload.wikimedia.org/wikipedia/en/1/17/The_Killers_-_Hot_Fuss.png", artist="The Killers", genre="Alternative Rock", release_year=2004),
            Album(title="Hozier", image="https://upload.wikimedia.org/wikipedia/en/a/a0/Hozier_-_Hozier.png", artist="Hozier", genre="Indie Rock", release_year=2014),
            Album(title="Demon Days", image="https://upload.wikimedia.org/wikipedia/en/d/df/Gorillaz_Demon_Days.PNG", artist="Gorillaz", genre="Alternative Rock", release_year=2005),
            Album(title="Pure Heroine", image="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Lorde_Pure_Heroine.png/800px-Lorde_Pure_Heroine.png", artist="Lorde", genre="Indie Pop", release_year=2013),
            Album(title="Channel Orange", image="https://upload.wikimedia.org/wikipedia/en/2/28/Channel_ORANGE.jpg", artist="Frank Ocean", genre="R&B", release_year=2012),
            Album(title="Currents", image="https://upload.wikimedia.org/wikipedia/en/9/9b/Tame_Impala_-_Currents.png", artist="Tame Impala", genre="Psychedelic Rock", release_year=2015),
            Album(title="Funeral", image="https://upload.wikimedia.org/wikipedia/en/2/25/ArcadeFireFuneralCover.jpg", artist="Arcade Fire", genre="Indie Rock", release_year=2004),
            Album(title="Wasting Light", image="https://upload.wikimedia.org/wikipedia/en/0/05/Foo_Fighters_Wasting_Light_Album_Cover.jpg", artist="Foo Fighters", genre="Alternative Rock", release_year=2011),
            Album(title="Yeezus", image="https://upload.wikimedia.org/wikipedia/en/0/03/Yeezus_album_cover.png", artist="Kanye West", genre="Hip-Hop", release_year=2013),
            Album(title="Viva la Vida or Death and All His Friends", image="https://upload.wikimedia.org/wikipedia/en/b/b2/Coldplay_-_Viva_la_Vida_or_Death_and_All_His_Friends.png", artist="Coldplay", genre="Alternative Rock", release_year=2008),
            Album(title="Is This It", image="https://upload.wikimedia.org/wikipedia/en/thumb/e/e7/The_Strokes_-_Ist_Tis_It_US_cover.png/220px-The_Strokes_-_Ist_Tis_It_US_cover.png", artist="The Strokes", genre="Indie Rock", release_year=2001),
            Album(title="Brothers", image="https://upload.wikimedia.org/wikipedia/en/9/93/The_Black_Keys_-_Brothers.jpg", artist="The Black Keys", genre="Blues Rock", release_year=2010),
            Album(title="Elephant", image="https://upload.wikimedia.org/wikipedia/en/thumb/1/11/Elephant%2C_The_White_Stripes.png/220px-Elephant%2C_The_White_Stripes.png", artist="The White Stripes", genre="Alternative Rock", release_year=2003),
            Album(title="Vessel", image="https://upload.wikimedia.org/wikipedia/en/2/20/Vessel_by_Twenty_One_Pilots.jpg", artist="Twenty One Pilots", genre="Indie Rock", release_year=2013),
            Album(title="Blonde", image="https://upload.wikimedia.org/wikipedia/en/7/70/Childish-gambino-because-the-internet.gif", artist="Frank Ocean", genre="R&B", release_year=2016),
            Album(title="Because the Internet", image="https://upload.wikimedia.org/wikipedia/en/e/ea/Blackparadecover.jpg", artist="Childish Gambino", genre="Hip-Hop", release_year=2013),
            Album(title="The Black Parade", image="https://upload.wikimedia.org/wikipedia/en/2/28/Channel_ORANGE.jpg", artist="My Chemical Romance", genre="Alternative Rock", release_year=2006),
            Album(title="Legend", image="https://upload.wikimedia.org/wikipedia/en/c/c2/BobMarley-Legend.jpg", artist="Bob Marley and The Wailers", genre="Reggae", release_year=1977),
        ]

        # Seed albums
        for album_info in album_data:
            new_album = Album(
                title=album_info.title,
                image=album_info.image,
                artist=album_info.artist,
                genre=album_info.genre,
                release_year=album_info.release_year,
            )
            db.session.add(new_album)
        db.session.commit()

        print("Albums seeded successfully.")









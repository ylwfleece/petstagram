from app.models import db, Photo
from faker import Faker
import random


fake = Faker()

photo_keys = [
    "https://petstagram-top-25.s3.us-east-2.amazonaws.com/cat1.jpg",
    "https://petstagram-top-25.s3.us-east-2.amazonaws.com/cat2.jpg",
    "https://petstagram-top-25.s3.us-east-2.amazonaws.com/cat3.jpg",
    "https://petstagram-top-25.s3.us-east-2.amazonaws.com/cat4.jpg",
    "https://petstagram-top-25.s3.us-east-2.amazonaws.com/corgy.jpg",
    "https://petstagram-top-25.s3.us-east-2.amazonaws.com/dog1.jpg",
    "https://petstagram-top-25.s3.us-east-2.amazonaws.com/dog2.jpeg",
    "https://petstagram-top-25.s3.us-east-2.amazonaws.com/dog3.jpg",
    "https://petstagram-top-25.s3.us-east-2.amazonaws.com/elephants.jpg",
    "https://petstagram-top-25.s3.us-east-2.amazonaws.com/fish.jpg",
    "https://petstagram-top-25.s3.us-east-2.amazonaws.com/hamster.jpg",
    "https://petstagram-top-25.s3.us-east-2.amazonaws.com/lizard.jpg",
    "https://petstagram-top-25.s3.us-east-2.amazonaws.com/monkey.jpg",
    "https://petstagram-top-25.s3.us-east-2.amazonaws.com/parrot.jpeg",
    "https://petstagram-top-25.s3.us-east-2.amazonaws.com/porcupine.jpg",
    "https://petstagram-top-25.s3.us-east-2.amazonaws.com/pug.jpg",
    "https://petstagram-top-25.s3.us-east-2.amazonaws.com/snake.jpg",
    "https://petstagram-top-25.s3.us-east-2.amazonaws.com/spiders.jpg",
    "https://petstagram-top-25.s3.us-east-2.amazonaws.com/turtle.jpg",
    "https://petstagram-top-25.s3.us-east-2.amazonaws.com/llama.jpg"
]


def seed_photos(n):
    for i in range(n):
        entry = Photo(
            postId=i+1, photoKey=photo_keys[i]
        )
        db.session.add(entry)
    db.session.commit()


def undo_photos():
    db.session.execute('TRUNCATE photos CASCADE;')
    db.session.execute("ALTER SEQUENCE photos_id_seq RESTART WITH 1")
    db.session.commit()

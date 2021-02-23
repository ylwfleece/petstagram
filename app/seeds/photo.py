from app.models import db, Photo
from faker import Faker
import random


fake = Faker()


def seed_photos(n):
    for _ in range(n):
        entry = Photo(
            postId=random.randint(1, 20), photoKey='urlstring'
        )
        db.session.add(entry)

    post1 = Photo(postId=1, photoKey="urlstring")

    db.session.add(post1)
    db.session.commit()


def undo_photos():
    db.session.execute('TRUNCATE photos CASCADE;')
    db.session.execute("ALTER SEQUENCE photos_id_seq RESTART WITH 1")
    db.session.commit()

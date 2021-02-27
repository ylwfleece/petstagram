from app.models import db, Comment
from faker import Faker
import random


fake = Faker()

comments = [
    "wow, cool pet!",
    "awww what a cutie",
    "super cool",
    "wow, i wish i had THAT in my pet store",
    "what a fascinating animal",
    "wow, very cool pet!",
    "awww what a super cutie",
    "super super cool",
    "wow, i wish i had THIS AWESOME ANIMALIA in my pet store",
    "what a fascinatingly cool animal",
    "wow, cool pet my friend!",
    "awww what a cute awesome pet",
    "super cool pet, actually",
    "wow, i wish i had this sweet awesomeness in my pet store",
    "what a sweet, cool animal",
    "wow, cool pet mi amigx!",
    "What a cutie-pie",
    "super cool!!!!!!",
    "mindblowingly sweet pet",
    "unbearably cool pet"
]


def seed_comments(n):
    for i in range(n):
        entry = Comment(
            postId=i+1,
            userId=random.randint(1, 20),
            content=comments[i]
        )
        db.session.add(entry)
    db.session.commit()


def undo_comments():
    db.session.execute('TRUNCATE comments CASCADE;')
    db.session.execute("ALTER SEQUENCE comments_id_seq RESTART WITH 1")
    db.session.commit()

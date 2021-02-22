from app.models import db, Post


def seed_posts():

    post1 = Post(userId=1, caption="hello world")

    db.session.add(post1)
    db.session.commit()


def undo_posts():
    db.session.execute('TRUNCATE posts CASCADE;')
    db.session.execute("ALTER SEQUENCE posts_id_seq RESTART WITH 1")
    db.session.commit()

from app.models import db, Like


def seed_likes():

    post1 = Like(userId=1, postId=1, commentId=1)

    db.session.add(post1)
    db.session.commit()


def undo_likes():
    db.session.execute('TRUNCATE likes CASCADE;')
    db.session.execute("ALTER SEQUENCE likes_id_seq RESTART WITH 1")
    db.session.commit()

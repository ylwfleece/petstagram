from app.models import db, Photo


def seed_photos():

    post1 = Photo(postId=1, photoKey="urlstring")

    db.session.add(post1)
    db.session.commit()


def undo_photos():
    db.session.execute('TRUNCATE photos CASCADE;')
    db.session.execute("ALTER SEQUENCE photos_id_seq RESTART WITH 1")
    db.session.commit()

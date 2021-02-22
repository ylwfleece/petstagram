from app.models import db, Comment


def seed_comments():

    post1 = Comment(postId=1, userId=1, content="lorem ipsum")

    db.session.add(post1)
    db.session.commit()


def undo_comments():
    db.session.execute('TRUNCATE comments CASCADE;')
    db.session.execute("ALTER SEQUENCE comments_id_seq RESTART WITH 1")
    db.session.commit()

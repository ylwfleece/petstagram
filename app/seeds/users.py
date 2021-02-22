from werkzeug.security import generate_password_hash
from app.models import db, User
from faker import Faker
# Adds a demo user, you can add other users here if you want

fake = Faker()


def seed_users(n):

    for i in range(1, n):
        entry = User(
            username=fake.user_name(), email=fake.ascii_email(),
            password=f'password{i}', profilePhotoUrl=fake.image_url()
        )
        db.session.add(entry)

    demo = User(username='Demo', email='demo@aa.io',
                password='password', profilePhotoUrl=None)

    db.session.add(demo)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key


def undo_users():
    db.session.execute('TRUNCATE users CASCADE;')
    db.session.execute("ALTER SEQUENCE users_id_seq RESTART WITH 1")
    db.session.commit()

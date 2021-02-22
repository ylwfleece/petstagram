from flask.cli import AppGroup
from .users import seed_users, undo_users
from .post import seed_posts, undo_posts
from .like import seed_likes, undo_likes
from .photo import seed_photos, undo_photos
from .comment import seed_comments, undo_comments
# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')

# Creates the `flask seed all` command


@seed_commands.command('all')
def seed():
    seed_users(5)
    seed_posts()
    seed_photos()
    seed_comments()
    seed_likes()
    # Add other seed functions here

# Creates the `flask seed undo` command


@seed_commands.command('undo')
def undo():
    undo_users()
    undo_posts()
    undo_photos()
    undo_comments()
    undo_likes()
    # Add other undo functions here

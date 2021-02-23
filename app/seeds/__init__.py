from flask.cli import AppGroup
from .users import seed_users, undo_users

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')

# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
<<<<<<< Updated upstream
    seed_users()
=======
    seed_users(20)
    seed_posts(20)
    seed_photos(20)
    seed_comments(20)
    seed_likes(20)
>>>>>>> Stashed changes
    # Add other seed functions here

# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    # Add other undo functions here

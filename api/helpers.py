from flask import session
from functools import wraps

# modified from finace project
def login_required(f):
    """
    Decorate routes to require login.

    https://flask.palletsprojects.com/en/latest/patterns/viewdecorators/
    """

    @wraps(f)
    def decorated_function(*args, **kwargs):
        if session.get("user_id") is None:
            return "error"
        return f(*args, **kwargs)

    return decorated_function

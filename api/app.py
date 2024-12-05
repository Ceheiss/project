from flask import Flask

# Create a Flask app instance
app = Flask(__name__)

# Define a route for the home page
@app.route('/')
def hello_world():
    return 'Hello, World!'

# Run the app on localhost with debugging enabled
if __name__ == '__main__':
    app.run(debug=True)

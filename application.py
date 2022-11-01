from flask import Flask, Response, request
from datetime import datetime
import json
from database_operations import DatabaseOperations, CURRENT_USER_ID
from flask_cors import CORS
import sys

# Create the Flask application object.
app = Flask(__name__)

CORS(app)



@app.get("/api/health")
def get_health():
    t = str(datetime.now())
    msg = {
        "name": "F22-Starter-Microservice",
        "health": "Good",
        "at time": t
    }

    # DFF TODO Explain status codes, content type, ... ...
    result = Response(json.dumps(msg), status=200, content_type="application/json")

    return result


@app.route("/api/user/login", methods=["POST"])
def check_user_login():

    content_type = request.headers.get('Content-Type')
    if content_type == 'application/json':
        user_login_info = request.json
        username = user_login_info['username']
        password = user_login_info['password']
        result = DatabaseOperations.get_by_key(username, password)
        return result

    dictionary = {'status': 'success', 'message': 61}
    jsonString = Response(json.dumps(dictionary), status=200, content_type="application.json")
    return jsonString


@app.route("/api/post/createPost", methods=["POST", "GET"])
def post_blog():
    if CURRENT_USER_ID is not None:
        content_type = request.headers.get('Content-Type')
        if content_type == 'application/json':
            new_blog = request.json
            title = new_blog["title"]
            content = new_blog["description"]
            post_time = str(datetime.now())

            DatabaseOperations.new_blog_post(title, content, post_time)


    dictionary = {'status': 'success', 'data': {'title': 'My first blog', 'description': "Hello World"}}
    jsonString = json.dumps(dictionary, indent=4)
    return jsonString


if __name__ == "__main__":
    app.debug = True
    app.run(host="0.0.0.0", port=5011)
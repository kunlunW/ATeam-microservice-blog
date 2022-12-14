from flask import Flask, Response, request
from datetime import datetime
import json
from database_operations import DatabaseOperations
from flask_cors import CORS
from google.oauth2 import id_token
from google.auth.transport import requests


import sys
CLIENT_ID = "917121905012-jt7do84gpaurpefgsljbme3dqes29gim.apps.googleusercontent.com"

# Create the Flask application object.
app = Flask(__name__)

CORS(app)


@app.route("/createPost", methods=["POST", "GET"])
def post_blog():


    content_type = request.headers.get('Content-Type')
    if content_type == 'application/json':

        new_blog = request.json

        jwt_token = new_blog['jwt_token'] # getting the jwt token

        print("JWT Token is: ", jwt_token)

        try:
            # Specify the CLIENT_ID of the app that accesses the backend:
            idinfo = id_token.verify_oauth2_token(jwt_token, requests.Request(), CLIENT_ID)

            # Or, if multiple clients access the backend server:
            # idinfo = id_token.verify_oauth2_token(token, requests.Request())
            # if idinfo['aud'] not in [CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]:
            #     raise ValueError('Could not verify audience.')

            # If auth request is from a G Suite domain:
            # if idinfo['hd'] != GSUITE_DOMAIN_NAME:
            #     raise ValueError('Wrong hosted domain.')

            # ID token is valid. Get the user's Google Account ID from the decoded token.
            print(idinfo)

            owner_id = idinfo['email'][0: idinfo['email'].index('@')]

            print(owner_id)
            title = new_blog["title"]
            description = new_blog["description"]
            tags = new_blog["tag"].split(" ")
            while ("" in tags):
                tags.remove("")
            post_time = datetime.now().isoformat(sep=" ", timespec="seconds")
            return DatabaseOperations.new_blog_post(owner_id, title, description, post_time, tags)

        except ValueError:
            print("Auth went wrong!")
            pass

        # owner_id = new_blog['username']

    else: 
        failure_message = {'status': 'fail', 'message': 'Log in required'}
        fail_response = Response(json.dumps(failure_message), status=200, content_type="application.json")
        return fail_response


@app.route("/<owner_id>/myposts", methods=["POST", "GET"])
def get_blog(owner_id):
    result = DatabaseOperations.get_own_post(owner_id)
    if result:
        response = Response(json.dumps(result, default=str), status=200, content_type="application/json")
    else:
        response = Response("404 NOT FOUND", status=404, content_type="application/json")
    return response


@app.route("/allposts", methods=["GET"])
def get_all_blogs():
    result = DatabaseOperations.get_all_posts()
    if result:
        response = Response(json.dumps(result, default=str), status=200, content_type="application/json")
    else:
        response = Response("404 NOT FOUND", status=404, content_type="application/json")
    return response


@app.route("/posts/<blog_id>", methods=["GET"])
def get_blog_by_id(blog_id):
    result = DatabaseOperations.get_blog_by_blogid(blog_id)
    if result:
        response = Response(json.dumps(result, default=str), status=200, content_type="application/json")
    else:
        response = Response("404 NOT FOUND", status=404, content_type="application/json")
    return response


@app.route("/deleteblog", methods=["GET"])
def remove_notification():
    blog_id = request.args.get('blog_id')
    result = DatabaseOperations.delete_blog_by_blogid(blog_id)
    return result


@app.route("/posts/<blog_id>/likecount", methods=["GET"])
def get_like_count(blog_id):
    result = DatabaseOperations.get_like_and_dislike_num(blog_id)
    result['likestate'] = 0
    if result:
        response = Response(json.dumps(result, default=str), status=200, content_type="application/json")
    else:
        response = Response("404 NOT FOUND", status=404, content_type="application/json")

    return response


@app.route("/<user_id>/posts/<blog_id>/likestate", methods=["GET"])
def get_like_state(user_id, blog_id):
    result = DatabaseOperations.like_and_dislike_state_check(user_id, blog_id)
    if result:
        response = Response(json.dumps(result, default=str), status=200, content_type="application/json")
    else:
        response = Response("404 NOT FOUND", status=404, content_type="application/json")

    return response

@app.route("/<user_id>/posts/<blog_id>/addlike", methods=["GET"])
def add_like(user_id, blog_id):
    response = DatabaseOperations.add_to_like(user_id, blog_id)
    return response


@app.route("/<user_id>/posts/<blog_id>/adddislike", methods=["GET"])
def add_dislike(user_id, blog_id):
    response = DatabaseOperations.add_to_dislike(user_id, blog_id)
    return response


@app.route("/<user_id>/posts/<blog_id>/removelike", methods=["GET"])
def remove_like(user_id, blog_id):
    response = DatabaseOperations.remove_from_like(user_id, blog_id)
    return response 


@app.route("/<user_id>/posts/<blog_id>/removedislike", methods=["GET"])
def remove_dislike(user_id, blog_id):
    response = DatabaseOperations.remove_from_dislike(user_id, blog_id)
    return response 


@app.route("/blognumber", methods=["GET"])
def get_blog_number_by_username():
    username = request.args.get('username')
    blog_num = str(DatabaseOperations.get_blog_number(username))
    response = Response(blog_num, status=200, content_type="application/json")
    return response


@app.route("/checkbeforelike", methods=["POST"])
def checkbeforelike():
    content_type = request.headers.get('Content-Type')
    if content_type == 'application/json':
        jwt_body = request.json
        jwt_token = jwt_body['token']  # getting the jwt token

        try:
            # Specify the CLIENT_ID of the app that accesses the backend:
            idinfo = id_token.verify_oauth2_token(jwt_token, requests.Request(), CLIENT_ID)
            owner_id = str(idinfo['email'][0: idinfo['email'].index('@')])

            # response = Response(json.dump(owner_id), status=200, content_type="application/txt")
            print("Owner id is: ", owner_id)
            message = {"owner_id": owner_id}
            return Response(json.dumps(message, default=str), status=200, content_type="application/json")

        except ValueError:
            print("Auth went wrong!")
            pass
        

if __name__ == "__main__":
    app.debug = False
    app.run(host="0.0.0.0", port=5012)
    
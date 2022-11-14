from flask import Flask, Response, request
from datetime import datetime
import json
from database_operations import DatabaseOperations
from flask_cors import CORS
import sys
# from flask_restful import Api
# from post import Posts
# Create the Flask application object.
app = Flask(__name__)
owner_id = '7d529dd4-548b-4258-aa8e-23e34dc8d43d'
CORS(app)
# api = Api(app)
# api.add_resource(Posts, '/<string:owner_id>/posts')

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


@app.route("/login", methods=["POST"])
def check_user_login():
    print("signed in")
    content_type = request.headers.get('Content-Type')
    if content_type == 'application/json':
        user_login_info = request.json
        username = user_login_info['username']
        password = user_login_info['password']
        result = DatabaseOperations.get_by_key(username, password)
        return result


@app.route("/<owner_id>/posts", methods=["POST", "GET"])
def get_blog(owner_id):
    result = DatabaseOperations.get_own_post(owner_id)
    if result:
        response = Response(json.dumps(result, default=str), status=200, content_type="application/json")
    else:
        response = Response("404 NOT FOUND", status=404, content_type="application/json")
    return response
       
    # if result['status'] == 'success':
    #     response = Response(json.dumps(result), status=200, content_type="application.json")
    #     return response
    # else:
    #     result = {'status': 'fa', 'message': 'failed'}
    #     msg = Response(json.dumps(result), status=200, content_type="application.json")
    #     return msg
    # else:
    #     # print(result)
    #     result = {'status': 'fail', 'message': 'failed'}
    #     msg = Response(json.dumps(result), status=200, content_type="application.json")
    #     return msg
        

@app.route("/api/post/getAllPost/updatePost", methods=["POST", "GET"])
def update_blog():
    content_type = request.headers.get('Content-Type')
    if content_type == 'application/json':
        update_blog = request.json
        unique_blog_id = update_blog["unique_blog_id"]
        owner_id = CURRENT_USER_ID
        blog_title = update_blog["blog_title"]
        blog_content = update_blog["description"]
        post_time = str(datatime.now())
        res = DatabaseOperations.update_post(unique_blog_id,owner_id,blog_title,blog_content,post_time)
        if res['status']:
            dictionary = {'status': 'success'}
            found_response = Response(json.dumps(dictionary), status=200, content_type="application.json")
            return found_response

    else:
        failure_message = {'status': 'fail', 'message': 'Update Failed'}
        fail_response = Response(json.dumps(failure_message), status=200, content_type="application.json")
        return fail_response

@app.route("/api/post/getAllPost/deletePost", methods=["POST", "GET"])
def delete_blog():
    content_type = request.headers.get('Content-Type')
    if content_type == 'application/json':
        delete_blog = request.json
        unique_blog_id = delete_blog["unique_blog_id"]
        res = DatabaseOperations.delete_post(unique_blog_id)
        if res['status']:
            found_user_message = {'status': 'success', 'message': 'Successfully delete'}
            found_response = Response(json.dumps(found_user_message), status=200, content_type="application.json")
            return found_response
    else:
        failure_message = {'status': 'fail', 'message': 'Delete Failed'}
        fail_response = Response(json.dumps(failure_message), status=200, content_type="application.json")
        return fail_response



if __name__ == "__main__":
    app.debug = True
    app.run(host="0.0.0.0", port=5011)
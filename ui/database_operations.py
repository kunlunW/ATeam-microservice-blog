from optparse import TitledHelpFormatter
#from turtle import title
import pymysql
from flask import Flask, Response, request
import json
# from flask_mysqldb import MySQL
import os

#TODO: INIT TO None
CURRENT_USER_ID = '7d529dd4-548b-4258-aa8e-23e34dc8d43d'


class DatabaseOperations:

    def __int__(self):
        pass

    @staticmethod
    def _get_connection():

        usr = "root"
        pw = "dbuserdbuser"
        h = "localhost"

        conn = pymysql.connect(
            user=usr,
            password=pw,
            host=h,
            cursorclass=pymysql.cursors.DictCursor,
            autocommit=True
        )
        return conn

    @staticmethod
    def get_by_key(first_name, password):

        sql = "SELECT * FROM cs6156_login_microservice.user_info where first_name = %s AND password = %s";
        conn = DatabaseOperations._get_connection()
        cur = conn.cursor()
        res = cur.execute(sql, args=(first_name, password,))
        result = cur.fetchone()
        if result:
            CURRENT_USER_ID = result['unique_user_id']
            found_user_message = {'status': 'success', 'message': 'Successfully found user', 'user_id': CURRENT_USER_ID}
            found_response = Response(json.dumps(found_user_message), status=200, content_type="application.json")
            # if credential validation success, update CURRENT_USER_ID
            return found_response
        else:
            failure_message = {'status': 'fail', 'message': 'Failed finding user'}
            fail_response = Response(json.dumps(failure_message), status=200, content_type="application.json")
            return fail_response


    @staticmethod
    def get_own_post(owner_id):
        sql = "SELECT unique_blog_id as ID, blog_title as title, blog_content as content, post_time AS posttime FROM cs6156_login_microservice.blog_info Where owner_id = %s;"
        conn = DatabaseOperations._get_connection()
        cur = conn.cursor()
        try:
            cur.execute(sql,owner_id)
        except:
            return None
        result = cur.fetchall()
        return result


        # found_user_message = {}
        # if result:
        #     # found_user_message['user_id'] = owner_id
        #     for i in range(len(result)):
        #         found_user_message['ID'+str(i)] = result[i]['ID']
        #         found_user_message['title'+str(i)] = result[i]['title']
        #         found_user_message['content'+str(i)] = result[i]['content']
        #         found_user_message['posttime'+str(i)] = result[i]['posttime']
        #     found_user_message['status'] = 'success'
        #     # found_user_message = {'status': 'success', 'message': 'Successfully'}
        #     # found_response = Response(json.dumps(found_user_message), status=200, content_type="application.json")
        #     return found_user_message
        # if result:
        #     # result['status'] = 'success'
        #     return result
        # else:
        #     failure_message = {'status': 'fail', 'message': 'Find Failed'}
        #     fail_response = Response(json.dumps(failure_message), status=200, content_type="application.json")
        #     return fail_response

    @staticmethod
    def update_post(unique_blog_id,owner_id,blog_title,blog_content,post_time):
        owner_id = CURRENT_USER_ID
        sql = "SELECT unique_blog_id, owner_id FROM cs6156_login_microservice.blog_info where unique_blog_id = %s AND owner_id = %s;"
        conn = DatabaseOperations._get_connection()
        cur = conn.cursor()
        res = cur.execute(sql, args=(unique_blog_id, owner_id))
        result = cur.fetchone()
        if not result:
            failure_message = {'status': 'fail', 'message': 'Failed updated'}
            fail_response = Response(json.dumps(failure_message), status=200, content_type="application.json")
            return fail_response
        
        sql = "UPDATE cs6156_login_microservice.blog_info SET blog_title = %s, blog_content = %s, post_time = %s WHERE unique_blog_id = %s;"
        conn = DatabaseOperations._get_connection()
        cur = conn.cursor()
        res = cur.execute(sql, args=(blog_title,blog_content,post_time))
        # result = cur.fetchone()
        # if result:
        #     found_user_message = {'status': 'success', 'message': 'Successfully updated'}
        #     found_response = Response(json.dumps(found_user_message), status=200, content_type="application.json")
        #     return found_response
        # else:
        #     failure_message = {'status': 'fail', 'message': 'Failed updated'}
        #     fail_response = Response(json.dumps(failure_message), status=200, content_type="application.json")
        #     return fail_response

    @staticmethod
    def delete_post(unique_blog_id,owner_id):
        unique_blog_id = unique_blog_id
        sql = "DELETE From cs6156_login_microservice.blog_info WHERE unique_blog_id = %s AND owner_id = %s;"
        conn = DatabaseOperations._get_connection()
        cur = conn.cursor()
        res = cur.execute(sql, args=(unique_blog_id, owner_id))
        result = cur.fetchone()
        if not result:
            failure_message = {'status': 'fail', 'message': 'Failed updated'}
            fail_response = Response(json.dumps(failure_message), status=200, content_type="application.json")
            return fail_response
        else:
            found_user_message = {'status': 'success', 'message': 'Successfully updated'}
            found_response = Response(json.dumps(found_user_message), status=200, content_type="application.json")
            return found_response
from optparse import TitledHelpFormatter
#from turtle import title
import pymysql
from flask import Flask, Response, request
import json
from flask_mysqldb import MySQL
import os

#TODO: INIT TO None
CURRENT_USER_ID = "7d529dd4-548b-4258-aa8e-23e34dc8d43d"

class DatabaseOperations:

    def __int__(self):
        pass

    @staticmethod
    def _get_connection():

        usr = "root"
        pw = "Wd311714@"
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
            found_user_message = {'status': 'success', 'message': 'Successfully found user'}
            found_response = Response(json.dumps(found_user_message), status=200, content_type="application.json")
            # if credential validation success, update CURRENT_USER_ID
            return found_response
        else:
            failure_message = {'status': 'fail', 'message': 'Failed finding user'}
            fail_response = Response(json.dumps(failure_message), status=200, content_type="application.json")
            return fail_response

    @staticmethod
    def new_blog_post(blog_title, blog_content, post_time):
        #init vars
        new_blog_id = ""
        total_post = 0 

        #create a new blog id
        sql = "SELECT owner_id, MAX(total_post) AS max_count FROM cs6156_login_microservice.blog_info WHERE owner_id = %s GROUP BY owner_id";
        conn = DatabaseOperations._get_connection()
        cur = conn.cursor()
        res = cur.execute(sql, args=(CURRENT_USER_ID))
        result = cur.fetchone()
        
        if result:
            new_blog_id =  result["owner_id"] + "-" + str(int(result["max_count"]) + 1)
            total_post = int(result["max_count"]) + 1
        else:
            new_blog_id = CURRENT_USER_ID + "-" + str(1)
            total_post = 1
        
        #enter new entry into blog_info table
        sql = "INSERT INTO cs6156_login_microservice.blog_info VALUES (%s, %s, %s, %s, %s, %s)";
        conn = DatabaseOperations._get_connection()
        cur = conn.cursor()
        res = cur.execute(sql, args=(new_blog_id, CURRENT_USER_ID, blog_title, blog_content, post_time, str(total_post)))
        if res:
            print("success")
        else:
            print("failed")

   

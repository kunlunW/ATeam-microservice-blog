# from flask_restful import Resource, reqparse
# from models.comment import CommentModel


# class Posts(Resource):
#     parser = reqparse.RequestParser()
#     parser.add_argument('content',
#         type=str,
#         required=True,
#         help='This field cannot be left blank'
#     )
#     # parser.add_argument('blog_id',
#     #     type=int,
#     #     required=True,
#     #     help='Every item needs a blog id.'
#     # )

#     def get(self, owner_id):
#         posts = CommentModel.find_by_blog_id(owner_id)
#         return posts.json()


#     def post(self, blog_id):
#         # if CommentModel.find_by_name(name):
#         #     return {'message': "An comment with name '{}' already exists.".format(name)}, 400

#         data = Comment.parser.parse_args()

#         comment = CommentModel(data['content'], blog_id)

#         try:
#             comment.save_to_db()
#         except:
#             return {'message': 'An error occurred inserting the item.'}, 500  # Internal server error

#         return comment.json(), 201 


#     # def put(self, name):       
#     #     data = Comment.parser.parse_args()
#     #     comment = CommentModel.find_by_name(name)
#     #     # updated_item = ItemModel(name, data['price'])

#     #     if not comment:
#     #         comment = CommentModel(name, data['Blog_id'])
#     #     else:
#     #         comment.content = data['content']
        
#     #     comment.save_to_db()
        
#     #     return comment.json()


# # class CommentList(Resource):
# #     def get(self):
# #         comments = [comment.json() for comment in CommentModel.find_all()]
# #         return {'comment': comments}, 200
        


# # class Delete(Resource):

# #     parser = reqparse.RequestParser()
# #     parser.add_argument('id',
# #         type=int,
# #         required=True,
# #         help='This field cannot be left blank'
# #     )

# #     def delete(self, blog_id):

# #         data = Delete.parser.parse_args()
# #         id = data['id']
# #         print(id)

# #         comment = CommentModel.find_by_id(id)
# #         if comment:
# #             comment.delete_from_db()

# #         return {'message': 'Comment deleted'}
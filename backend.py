import sys 
import json 
from flask import Flask, abort, request,send_file,jsonify 
from flask_restplus import Resource, Api, reqparse, fields 
from flask_cors import CORS

"API"
app = Flask(__name__)
cors = CORS(app,resources ={r"*":{"origins":"*"}})
api = Api(app, title ='Api to predict tic tac toe', description='',default="Actions", default_label=None)


@api.route('/getPrediction')
class getPrediction(Resource):
    @api.doc(body=api.model("payload",{
        "top_left_square":fields.String(description ="Cell01",required=True),
        "top_middle_square":fields.String(description ="Cell02",required=True),
        "top_right_square":fields.String(description ="Cell03",required=True),
        "middle_left_square":fields.String(description ="Cell04",required=True),
        "middle_middle_square":fields.String(description ="Cell05",required=True),
        "middle_right_square":fields.String(description ="Cell06",required=True),
        "bottom_left_square":fields.String(description ="Cell07",required=True),
        "bottom_middle_square":fields.String(description ="Cell08",required=True),
        "bottom_right_square":fields.String(description ="Cell09",required=True),
    }),\
    responses={200:'Success', 400:'Incorrect input '})
    def post(self):
        jsonreq = request.get_json()
        for i in jsonreq:
            print(i)
        return {
            "Post":jsonreq["top_left_square"]
        }

    def get(self):
        return {"hello":"world"}
if __name__ == '__main__':
    app.run(debug=True)
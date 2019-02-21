from flask import Flask, json, request
import firebase_admin
from firebase_admin import credentials, auth
cred = credentials.Certificate("firebase-config.json")
app = Flask(__name__)
firebase_app = firebase_admin.initialize_app(cred)

@app.route('/')
def hello_world():

    return "HELLO ALL!"

@app.route('/login/', methods=["POST"])
def login_page():

    error = ''
    try:
        if request.method == "POST":
		
            attempted_token = request.values['token']

            response = auth.verify_id_token(attempted_token, app=app)
            uid = response["uid"]
            user = auth.get_user(uid, app=app)


            return json.jsonify({'success':1, 'email': user.email, 'name': user.display_name, 'phone': user.phone_number})
        return json.jsonify({'success':0})


    except Exception as e:
        #flash(e)
        return json.jsonify({'success':0})

@app.route('/register/', methods=["POST"])
def register_page():

    error = ''
    try:
        if request.method == "POST":
		
            name = request.values['name']
            email = request.values['email']
            phone = request.values['phone']
            password = request.values['password']

            user = auth.create_user(display_name=name, email=email, phone_number=phone, password=password, app=app)

            token = auth.create_custom_token(user.uid, app=app)



            return json.jsonify({'success':1, 'token': token, 'email': email, 'name': name, 'phone': phone})
        return json.jsonify({'success':0})


    except Exception as e:
        #flash(e)
        return json.jsonify({'success':0})

if __name__ == '__main__':
    app.run()

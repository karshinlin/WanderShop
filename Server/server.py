from flask import Flask
import firebase_admin
from firebase_admin import credentials, auth
cred = credentials.Certificate("firebase-admin.json")
app = Flask(__name__)
firebase_app = firebase_admin.initialize_app(cred)

@app.route('/')
def hello_world():

    user = auth.create_user(display_name='Colby Tobin', password='password',
                            email='tobincolby@gmail.com', app=firebase_app)


    return user.display_name


if __name__ == '__main__':
    app.run()

from flask import Flask, json, request
from flaskext.mysql import MySQL
import firebase_admin
import requests
from firebase_admin import credentials, auth
try: # only import locally
    import private_config
except ImportError:
    pass
import public_config
import sys
import Query
import os 
import requests
import datetime

#print(type(json.loads(public_config.FIREBASE_CONFIG, strict=False).replace('/\\n/g', '\n')) is dict)
#cred = credentials.Certificate(json.loads(public_config.FIREBASE_CONFIG, strict=False))
app = Flask(__name__)
firebase_app = firebase_admin.initialize_app(credential=credentials.Certificate({
    "type": "service_account",
    "private_key": public_config.FIREBASE_CONFIG_PRIVATE_KEY.replace('\\n', '\n'),
    "client_email": public_config.FIREBASE_CONFIG_CLIENT_EMAIL,
    "token_uri": public_config.FIREBASE_CONFIG_TOKEN_URI,
  })
)
# admin.initializeApp({
#   credential: admin.credential.cert({
#     "private_key": process.env.FIREBASE_PRIVATE_KEY,
#     "client_email": process.env.FIREBASE_CLIENT_EMAIL,
#   }),
#   databaseURL: "https://my-firebase-app.firebaseio.com"
# });

# os.environ['FIREBASE_CONFIG_PRIVATE_KEY'] = "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDbG4v6kzhWJNfS\n0J9Y94N/uhjOW55ZBoCfuOEkLzFcBPQjpeHcAH/yN2ziMyQBVrGbcNALbGk1iSfD\nTQzaKKOt0R2ShMv7gswsw3glr+vHnXtztmYoDS5FgVRa/D45A16AfaMKcMdG3ivQ\nUgRKL6GvmIiVBle/GHqG0ElwGKRzmZmsZFmLTqIB19Gy5z6JVm5KbJHtBu6E3phU\nxW+eajU8MkMnDLI1vbYlINETetJCyKZ99sgyv/5CYWsXlT6y2o27uCbAAYOCBPOQ\nO55fuEfbcd1hg1Wsoops7Ny2D5+bjWKLHhWZNIjhBBei0+S+aQVYVyNeijqq8XwA\nScsXVhidAgMBAAECggEABEOrfEN8P7T03F4CE+2xSf2ZuP5wfQQS4cjr3NPsToGs\nLLtwQ2NhGho5DMf5BeulhkRyUB6ah5e1RehMfTx4PwxIWo8qFymLBr4BKx6a5KYs\nfmqI33OuOF0VgrXREjP+FVscnrnmLvto9+N4wObfazb5RYk7kPUNgW0xWLSqErPb\n3vcAKjJ9j3odc9loVvNaIb+iCPEujMaxsAmd0/NUa2yRukmHtszrg+OCErtbqZua\n3eQ/MaKybNBJ7RNu9A0gO3ULbLk9i553uPWdoaNBDm9BwEqU2Ce2w8JvPbpR/onT\n58zrQ4UT8kREub+s/2GmMAU+jWI0vaGzDM5bUnxYsQKBgQD3iGlUMgKMR6EeANl4\nIom5j8J0Lw5LhNLXaxtIb1Dus/K7SXygQ9C/Ox96s5izHR/+PZKVrEhrIgY2W9YC\nAXEn6i+zlQubDqxdIOkcjNS8gCFFXI/9g9i2apdYYVwsMckP9RHyUtVcLgKwC4AZ\nIKMPJoeZnfLV7g24Y6RKaaJfiQKBgQDimjjP6+GowDMadsX8Hmgiy8WOUqaMuvRH\nPRjeg919xpHKIIv0k13MTXM+2AT3HPmL8+ZWeaTSWLYtiP8n7E2LCF7TwPRy9zT+\ng+1VUQ4nxNK20Wcf0F2p93S5/K3jCKk9Fbs9lGCvyouXjmps+N06zUVWckOsn3+T\nV1JI0Eo3dQKBgFI1xfWmnl4EtCgI1DEoF2G/sy9vKWo/dN8CvY7zGYgNz8IQCAoa\nO8wnUK8p0r86HxQLUxHOpEagiDupiIwl+nTtPGaCS9Z1qx1K/uDyjP0F+QbWVSQ3\nk9QR1q4Nt9Udu89G72zxwdbZmR7q0uKFimJPw51rbelLJNdmkHv+VWUxAoGAMOJI\nQ0KFqdvcqmbZCyycFnWTJsLZvx5NuFiL1uTnkUyXAt3Gk3p/D6XdqL79Qzny86go\nFpujXOVaV7RoJvqpN8cUfeXwViTSP93CA1e7EAU718iQ0KIospP5kG3cLVAfAlh/\nzicGPKYbOxS0DNIbF6ZUwPNhegnmgaiizaZxfEkCgYBcVsaz0QlbxSOVoPbywelu\nGn+82BZg4+pNy3L4DviAEIwfShA4Wgupb8NtMEjcF4YkVYa/O7O+2N8U4cCiTWpy\ndByL2vWW2omALlVXt3AakBleKnyqsq3F5ag2yGGcxorBSwld1usitAkWoe7UN4h8\nTDbincUywaTeqOMUgWTwtQ==\n-----END PRIVATE KEY-----\n",
# os.environ['FIREBASE_CONFIG_CLIENT_EMAIL'] = "firebase-adminsdk-0qydc@wandershop-d654b.iam.gserviceaccount.com"


mysql = MySQL()
# MySQL configurations
cleardb_params = public_config.CLEARDB_PARAMETERS.split(":")
app.config['MYSQL_DATABASE_USER'] = cleardb_params[0]
app.config['MYSQL_DATABASE_PASSWORD'] = cleardb_params[1]
app.config['MYSQL_DATABASE_DB'] = cleardb_params[3]
app.config['MYSQL_DATABASE_HOST'] = cleardb_params[2]
mysql.init_app(app)

_verify_password_url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword'


@app.route('/')
def hello_world():

    return "HELLO ALL!"

@app.route('/login/', methods=["POST"])
def login_page():

    error = ''
    try:
        if request.method == "POST":
            jsonReq = request.get_json()
            print (jsonReq)
            email = jsonReq['email']
            password = jsonReq['password']
            body = {'email': email, 'password': password}
            params = {'key' : public_config.FIREBASE_API_KEY}
            
            resp = requests.request('post', _verify_password_url, params=params, json=body)
            if bool(resp.json().get('registered')):
                user = auth.get_user_by_email(email)
                return json.jsonify({'success':1, 'email': user.email, 'name': user.display_name, 'uid': user.uid})
            else:
                return json.jsonify({'success':0})

        return json.jsonify({'success':0})


    except Exception as e:
        #flash(e)
        print (e)
        print ("error ")
        return json.jsonify({'success':0})

@app.route('/register/', methods=["POST"])
def register_page():

    error = ''
    try:
        if request.method == "POST":
            jsonReq = request.get_json()
            name = jsonReq['name']
            email = jsonReq['email']
            phone = jsonReq['phone']
            password = jsonReq['password']

            user = auth.create_user(display_name=name, email=email, phone_number=phone, password=password)
            token = auth.create_custom_token(user.uid)

            return json.jsonify({'success':1, 'token': token.decode('utf-8'), 'email': email, 'name': name, 'phone': phone})
        return json.jsonify({'success':0})


    except Exception as e:
        #flash(e)
        print (e)
        print ("error")
        return json.jsonify({'success':0})


## Flights handling
@app.route('/flights/getByDate/', methods=["GET"])
def flights_handler():
    ## Retrieve data from the request
    jsonReq = request.get_json()
    # TODO: USE ARGUMENTS FROM REQUEST TO CHOOSE DATA
    # departDate = jsonReq['departDate'] # mm/dd/yyyy
    # returnDate = jsonReq['returnDate']
    # origin = jsonReq['origin']
    # destination = jsonReq['destination']
    
    # Query the db with the flight data request
    conn = mysql.connect()	
    cursor = conn.cursor()
    # baseQuery = "SELECT DISTINCT * from Flights WHERE depart_date=%(fDate)s AND origin=%(fOrigin)s AND destination=%(fDestination)s"
    baseQuery = "SELECT DISTINCT * from Flights"
    # params = {'fDate': departDate, 'fOrigin': origin, 'fDestination': destination}
    # cursor.execute(baseQuery, params)
    cursor.execute(baseQuery)
    print("Data queried from the database.")
    flights = []
    for row in cursor:
        print(row)
        print(str(row[4]))
        flight = {  'flightId' : row[0],
	                'origin' : row[1],
	                'destination' : row[2],
                    'departDate' : str(row[3]),
                    'departTime' : str(row[4]),
                    'airline' : row[5],
                    'flightsNumber': row[6],
                    'cost' : row[7]}
        flights.append(flight)
    return json.jsonify({'flights': flights})

# format: /flights?origin=ATL&dest=JFK&departDate=2019-09-23
@app.route('/flights', methods=["GET"])
def flights():
    # return json.jsonify({'flights': 'hello'})
    today = datetime.date.today()  
    origin = request.args.get('origin', default = "ATL", type = str)
    destination = request.args.get('dest', default = "JFK", type = str)
    departDate = request.args.get('departDate', default = str(today), type = str)
    json_response = Query.runFlightsQuery(origin, destination, departDate)
    if len(json_response["tripset"]) > 30:
        return json.jsonify(json_response["tripset"][:30])
    else:
        return json.jsonify(json_response["tripset"])

# format: /hotels?dest=ATL&rooms=1&checkin=2019-09-23&checkout=2019-09-27&adults=2
@app.route('/hotels', methods=["GET"])
def hotels():
    destination = request.args.get('dest', default="JFK", type=str)
    rooms = request.args.get('rooms', default="1", type=int)
    oneWeek = datetime.date.today() + datetime.timedelta(days=7)
    twoWeeks = oneWeek + datetime.timedelta(days=7)  
    checkin = request.args.get('checkin', default=str(oneWeek), type=str)
    checkout = request.args.get('checkout', default=str(twoWeeks), type=str)
    adults = request.args.get('adults', default=2, type=int)
    cityId = Query.runLocationQuery(destination, ["ctid"])
    return json.jsonify(Query.runHotelsQuery(cityId[0], rooms, checkin, checkout, adults))
    

## Hotels handling
@app.route('/hotels/getByCity/', methods=["GET"])
def hotels_handler():
    ## Retrieve data from the request
    jsonReq = request.get_json()
    # city = jsonReq['city'] # mm/dd/yyyy
    
    
    # Query the db with the flight data request
    conn = mysql.connect()	
    cursor = conn.cursor()
    # baseQuery = "SELECT DISTINCT * from Hotels WHERE city=%(hCity)s"
    # params = {'hCity': city}
    baseQuery = "SELECT DISTINCT * from Hotels"
    cursor.execute(baseQuery)
    print("Data queried from the database.")
    hotels = []
    for row in cursor:
        print(row)
        print(str(row[4]))
        hotel = {  'hotelId' : row[0],
	                'hotelName' : row[1],
	                'address' : row[3],
                    'phoneNumber' : row[4],
                    'cost' : row[5],
                    'website' : row[6],
                    'rating': row[7]}
        hotels.append(hotel)
    return json.jsonify({'hotels': hotels})

## Restaurants handling
@app.route('/restaurants/getByCity/', methods=["GET"])
def restaurants_handler():
    ## Retrieve data from the request
    jsonReq = request.get_json()
    # city = jsonReq['city'] # mm/dd/yyyy
    
    return json.jsonify(Query.run_yelp_query(Query.searchQuery())["data"]["search"])
    # Query the db with the flight data request
    # conn = mysql.connect()	
    # cursor = conn.cursor()
    # # baseQuery = "SELECT DISTINCT * from Restaurants WHERE city=%(rCity)s"
    # # params = {'rCity': city}
    # baseQuery = "SELECT DISTINCT * from Restaurants"
    # cursor.execute(baseQuery)
    # print("Data queried from the database.")
    # restaurants = []
    # for row in cursor:
    #     print(row) # We should probably add a cost field $ $$ $$$
    #     restaurant = {  'restaurantId' : row[0],
	#                 'restaurantName' : row[1],
	#                 'address' : row[3],
    #                 'phone' : row[4],
    #                 'website' : row[5],
    #                 'type': row[6],
    #                 'rating': row[7]}
    #     restaurants.append(restaurant)
    # return json.jsonify({'restaurants': restaurants})

## Activities handling
# format: /activities/getByCity?dest=JFK&date=2019-08-23
@app.route('/activities/getByCity/', methods=["GET"])
def activities_handler():
    ## Retrieve data from the request
    jsonReq = request.get_json()
    # city = jsonReq['city'] # mm/dd/yyyy
    
    destination = request.args.get('dest', default="JFK", type=str)
    oneWeek = datetime.date.today() + datetime.timedelta(days=7)
    date = request.args.get('date', default=str(oneWeek), type=str)
    cityInfo = Query.runLocationQuery(destination, ["cityname", "rc"])

    dateObj = datetime.datetime.strptime(date, '%Y-%m-%d')
    date = dateObj.strftime('%Y-%m-%dT%H:%M:%SZ')
    json_response = Query.run_ticketmaster_query(city=cityInfo[0], state_code=cityInfo[1], start_date_time=date)
    return json.jsonify(json_response["_embedded"])
    
    # Query the db with the flight data request
    # conn = mysql.connect()	
    # cursor = conn.cursor()
    # # baseQuery = "SELECT DISTINCT * from Activities WHERE city=%(aCity)s"
    # # params = {'aCity': city}
    # baseQuery = "SELECT DISTINCT * from Activities"
    # cursor.execute(baseQuery)
    # print("Data queried from the database.")
    # activities = []
    # for row in cursor:
    #     print(row)
    #     print(str(row[4]))
    #     activity = {  'activityId' : row[0],
	#                 'activityName' : row[1],
	#                 'description' : row[2],
    #                 'cost' : row[3],
    #                 'address' : row[5],
    #                 'date' : str(row[6])}
    #     activities.append(activity)
    # return json.jsonify({'activities': activities})



if __name__ == '__main__':
    app.run(debug=True)

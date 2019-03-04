# WanderShop

# Run Server
- virtualenv is used to maintain dependencies
- To activate virtualenv, run `source venv/bin/activate` in project root
- run python server.py to run the Server


# Server Requirements in virtualenv
- Python3
- firebase-admin
- Flask


# To start the React Native App
- cd ./WanderShopApp
- npm install
- react-native run-ios

# To set up mySQL server
- install mySQL and have local instance running
- create mySQL user for user: wandershop and password: wandershoppass123
- add permissions for user to access database 
- run db_initialize.sql and db_populate.sql to get dummy data
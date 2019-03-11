# WanderShop

# Run Server
- backend server uses the Flask framework and is run with gunicorn
- virtualenv is used to maintain dependencies
- To activate virtualenv, run `source venv/bin/activate` in project root
- To run the server from project root: `gunicorn --chdir ./Server wsgi:app`

# Continuous Deployment with Heroku
- Heroku-deployment branch serves as continuous deployment branch to Heroku
	- Pushing to this branch will trigger an automatic build and new release on Heroku server
- Heroku config variables are used to supply credentials and keys to the server on Heroku
- private_config.py is used to supply these credentials locally for development (not on Git)
- A cloud ClearDB database is used to house all backend data
- To run the Heroku build locally, download the Heroku CLI and run `heroku local` 

# Server Requirements in virtualenv
- run 'pip freeze > requirements.txt' to refresh requirements file


# To start the React Native App
- `cd ./WanderShopApp`
- `npm install`
- `react-native run-ios`
- in global.js, uncomment the line to point to the appropriate backend
	- localhost:8000 is the local gunicorn instance
	- localhost:5000 is the local heroku instance 
	- https://wandershop-server.herokuapp.com/ is the online Heroku server

# To set up mySQL server
- modify credentials in server.py
- utilize scripts in `$PROJ_ROOT/db` to set up server with data

# Local build requirements
- updated copy of Git repo
- private_config.py
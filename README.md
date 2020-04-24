# authentication-authorization-project-integration

## How to run the application

* Clone this repo to your desired folder;

* Run npm install in the root folder of the project;

* If you choose to use our test database you may skip this step, if not you must run our sql model on your own database.
  The model is available on the path database/reset_database.sql.
  Note that we only have compatibility with mariadb;

* If you choose to use your own database you must configure it on the path server/common/config/production.json or via the configuration endpoints present on our [documentation]() 

* Run npm run start on the root folder of our project and try out the documented endpoints

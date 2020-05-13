# authentication-authorization-project-integration

## Using our module

* Step 1: Clone the repo to your desired folder;

* Step 2: Run ```$ npm install``` on the root folder of the cloned project;

* Step 3: On your express app initialization insert the following line to setup our module. This require line also returns the module's functions. Make sure you insert the express app as a parameter to setup the module.
  ```js 
  var mod = require('root_folder_of_the_cloned_project/authization')(app);
  ```
  
* Step 4: Once you have the module set up you may call it anywhere you desire as you would with normal function libraries.
Just require the module main file using this line ``` const module = require('root_folder_of_the_cloned_project/authization') ```.
Or you can even save the setup line as a variable and it serves the same purpose
Note that this line doesn't require the express app because the setup has been made previously.

# Usage examples

User creation:
```js
const users = require('../../authization-module/authization').user

users.create(req.body.username, req.body.password)
```

User authentication:
```js
const authentication = require('../../authization-module/authization').authenticate

  authenticationRouter.post(
    '/local',
    authentication.usingLocal,
    (req, res) => {
      setResponse(res, { success: "login successful" }, 200)
    }
  
   authenticationRouter.post(
    '/google',
    authentication.usingGoogle,
    (req, res) => {
      setResponse(res, { success: "login successful" }, 200)
    }
    
    authenticationRouter.post(
    '/google',
    authentication.usingOffice365,
    (req, res) => {
      setResponse(res, { success: "login successful" }, 200)
    }
  )
 ```

Note that authentication and authorization functions need to be used as middleware because they require request, response and next parameters. All the other functions can be used wherever
 
More documentation on the specific methods and their requirements will be available on this repo's wiki

List creation:
```js
const lists = require('../../authization-module/authization').list

lists.create(req.body.user_id, req.body.list, req.body.start_date, req.body.end_date, req.body.updater, req.body.active)
```

Permission creation:
```js
const permissions = require('../../authization-module/authization').permission

permissions.create('POST', '/newList', 'gives a user permission to create new Lists')
```

Role creation:
```js
const roles = require('../../authization-module/authization').role

roles.create(req.body.role)
```

User Role assignment:
```js
const userRoles = require('../../authization-module/authization').userRole

userRoles.create(req.body.user, req.body.role, req.body.start_date, req.body.end_date, req.body.updater, req.body.active)
```

Role Permission creation:
```js
const rolePermission = require('../../authization-module/authization').rolePermission

rolePermission.create(req.body.role, req.body.permission)
```

User History consultation:
```js
const userHistory = require('../../authization-module/authization').userHistory

userHistory.getAll()
```

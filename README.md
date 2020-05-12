# authentication-authorization-project-integration

## Using our module

* Step 1: Clone the repo to your desired folder;

* Step 2: Run ```$ npm install``` on the root folder of the cloned project;

* Step 3: On your express app initialization insert the following line to setup our module 
  ```require('root_folder_of_the_cloned_project/setup-module')(app)```;
  
* Step 4: Once you have the module set up you may call it anywhere you desire as you would with normal function libraries.
Just require the module main file using this line ``` const module = require('root_folder_of_the_cloned_project/authization-module/authization') ```.

# Usage examples

User creation:
```js
const data = require('../../authization-module/authization').user

data.createUser(req.body.username, req.body.password)
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
const data = require('../../authization-module/authization').list

data.addList(req.body.user_id, req.body.list, req.body.start_date, req.body.end_date, req.body.updater, req.body.active)
```

Permission creation:
```js
const data = require('../../authization-module/authization').permission

data.addPermission('POST', '/newList', 'gives a user permission to create new Lists')
```

Role creation:
```js
const data = require('../../authization-module/authization').role

data.addRole(req.body.role)
```

User Role assignment:
```js
const data = require('../../authization-module/authization').userRole

data.addUserRole(req.body.user, req.body.role, req.body.start_date, req.body.end_date, req.body.updater, req.body.active)
```

Role Permission creation:
```js
const data = require('../../authization-module/authization').rolePermission

data.addRolePermission(req.body.role, req.body.permission)
```

User History consultation:
```js
const data = require('../../authization-module/authization').userHistory

data.getAllHistories()
```

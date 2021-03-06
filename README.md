# Backend coding test

For the test, I decided to create a microservice equipped with an orchestrator. 

## RESTful Endpoints at orchestrator
- GET /token
- GET /users
- GET /users/account/:accountNumber
- GET /users/identity/:identityNumber
- POST /users
- PUT /users/:id
- DELETE /users/:id

## RESTful Endpoints at safrullauparenta (miroservice's name)
- GET /token
- GET /
- GET /account/:accountNumber
- GET /identity/:identityNumber
- POST /
- PUT /:id
- DELETE /:id

## Authorization method
I used jsonwebtoken to provide an access token. The API will be accessed from the orchestrator and be directed to the services (safrullauparenta). I added a method to decode the token and to allow those who has the token to access the endpoints at orchestrator folder.

## Schema constraints and indexing
The schema constraints that I was using can be found at /config/config.js. I defined the type of each field before creating the collection. If the data inputted violate the constraints, MongoDB will throw a validation error.

As for the indexes, I added two indexes, one that accounts for accountNumber and the other accounts for identityNumber. I put the method in creating those indexes at /models/user.js

## Deploy
I deployed the microservice and the orchestrator on AWS EC2.
Link:
- Orchestrator: http://18.139.209.185:3001/ 

## Suggestion
I suggest you to use Postman, Insomnia, or any apps with similar functionalities. When you go to the orchestrator link above, go to /token first to get an access token otherwise you will not be authorized to access any RESTful endpoints on orchestrator.


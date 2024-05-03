# Django React Blog Post
<img src="images/image-preview.png" alt="image-preview">

The Project is made of a backend Using Django Rest Framework and Frontend using React

## How to run the project backend
On the main folder, change directory to backend
Then you can insatll the requirement on the requirement.txt
Make sure that the server is always running
1. `python install requirement.txt`
2. `python manage.py runserver`, the server opens at `http://127.0.0.1:8000`

## How to run the project frontend
On the main folder, change directory to frontend
Install the dependencies
1. `npm install`
2. `npm install react-router-dom`
3. `npm install axios`
4. `npm install date-fns`
5. `npm start`, the server opens at `localhost:3000`

Now you can access the frontend and interact with the system


## Project Desc : Business Management Web Application 
The project uses Django-Rest_Framework for backend,PostgresSQL 
for database and React Js for frontend. The system will enable users to post
,edit their post,delete, comment on other peoples posta and comments.
It gives users a user freindly system where teh users can interact with the system

## Features
- **User Management**: Easily add, update, and delete user post information.
- **Comments**: Easily add, update and delete user comment information.
- **User Authentication**: Registration, Secure login and authentication for users.
- **Database Integration**: Integrated with PostgreSQL for data storage.
- **Role-Based Access Control**: Define roles and permissions according to logged in user.

## Installation 
1. clone the repository on : $ git clone https://github.com/nzangi/Django-React-BlogPost.git
2. Open the project using your favourite test editor like VS Code or PyCharm.
3. Make sure you are in the BlogPost directory. <br>
4. Configure the PostgreSQL database connection is settings.py (check the Database section for more information). <br>
5. Run the Backend code by cd/backend then
```
python manage.py runserver
```
6. Run the frontend by cd to frontend then
```
npm start
```

## Frontend
### The user can register into the system
<img src="images/register-user.png" alt="image-preview">

### After user logs in, he will be able to see this dashboard
<img src="images/dashbaord.png" alt="image-preview">

### The user can be able to edit only his post
<img src="images/edit-post.png" alt="image-preview">













 
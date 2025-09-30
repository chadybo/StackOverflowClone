[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/9NDadFFr)
Add design docs in *images/*

## Instructions to setup and run project
    The required libraries are listed in client and server package.json. Please install those libraries in their respective filepaths. 

    Start the mongoDB database
    Start mongosh
    Start server
    Start client side webpage
    
    To populate the database with an admin user, run the command:

        node server/init.js mongodb://127.0.0.1:27017/fake_so admin@fake_so.com 123

    The login email will be admin@fake_so.com and the password will be 123

    To populate the database with specific questions, answers, or user go to init.js and input the desired questions, answers, or users
    in the populate() function.

## Team Member 1 Contribution (Aditya Pradeep 114290962)
    Create account
    Sessions/ cookies
    Hashing
    Register user
    Logout of account
    Guest user
    Admin user
    User profile
    User answered questions
    User created tags
    Edit/delete tags, answers, questions, users
    Error when server is down
    Bug testing/ debugging
    
## Team Member 2 Contribution (Anthony Zhu 114504175)
    Page numbers of homepage, comments, anwers
    Login/ register user client side
    Guest user
    Admin user
    User profile
    Question comments
    Answer comments
    Question, answer, comments, votes
    Reputation
    Reputation locking functions/ admin bypass
    Error checking for posting comments, answers, questions, login page, register page
    Webpage CSS
    Bug testing/ debugging
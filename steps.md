# Create a simple nodeJS with MySQL CRUD on a single entity (model / table) books

# Step 1.
# npm install -g express-generator

# Step 2.
# express --view=ejs books-crud

# Step 3.
# change directory: cd books-crud

# Step 4. install dependencies: npm install

# Step 5. run the app: SET DEBUG=books-crud:* & npm start

# Step 6. change the index.ejs???? (NOT) in order the main index page to show "Books CRUD" as title

# Info Step 7.
1. package.json
2. (see npm start), e.g. node ./bin/www
3. require('../app) <--- app.js
4. routing ---> req ----> controllers
5. routes -> controllers -> services -> database <-> service <-> controller -> view

# Step 8.
mkdir ./lib

# Step 9.
create file ./lib/db.js

# Step 10.
npm i mysql2

# Step 11.
create a connection to db and export it 

# Step 12. 
implement the code for ./routes/books.js
where:
a) it captures the /books/ request
b) connects to the database and do A SELECT query
const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  const username = req.body.username
  const password = req.body.password

  if(!username || !password){
    return res.status(404).send("Empty Body")
  }

  for(let user of users){
    if(user.username === username && user.password === password){
      
      let accessToken = jwt.sign({
        data : username
      }, 'access', { expiresIn: 60 * 60})

      req.session.authorization = { accessToken }

      return res.status(200).send(`Welcome Back ${username}!`)
    }
  }

  return res.status(401).send("The username or password are incorrect");
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  const isbn = req.params.isbn
  const username = req.user.data
  const reviewText = req.body.review
  
  if(!reviewText){
    return res.status(404).send("No review appended")
  }

  if(books[isbn]){
    books[isbn].reviews[username] = reviewText
    return res.status(200).send(`The user ${username} has submitted a new review for the book with the ISBN ${isbn}`)
  } else {
    return res.status(404).send(`Book not found with the ISBN: ${isbn}`)
  }

});


regd_users.delete("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn
  const username = req.user.data

  if(!books[isbn]){
    return res.status(404).send(`Book not found with the ISBN: ${isbn}`)
  }

  if (!books[isbn].reviews[username]) {
    return res.status(404).send(`No review found for user ${username} on book with ISBN ${isbn}`);
  }

  delete books[isbn].reviews[username]
  return res.status(200).send(`The review made by the user ${username} for the book with ISBN ${isbn} was deleted`)
})

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;

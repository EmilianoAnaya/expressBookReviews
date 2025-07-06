const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  const username = req.body.username
  const password = req.body.password

  if (!username || !password) {
    return res.status(404).send("The are no username or password parameters")
  }

  for (let user of users) {
    if (user.username === username) {
      return res.status(406).send(`The username ${username} has been already created!`)
    }
  }
  users.push({ "username" : username, "password" : password })
  return res.status(200).send(`The username ${username} has been added!`)
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  res.status(200).send(JSON.stringify({books}, "null", 3))
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn
  if (books[isbn]) {
    res.status(200).send(books[isbn])
  } else {
    res.status(404).send(`The book by the ISBN ${isbn} was not found!`)
  }

});
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const author = req.params.author
  const booksAuthor = []

  for (let id in books) {
    let book = books[id]
    if (book.author === author){
      booksAuthor.push(book)
    }
  }

  if (booksAuthor.length > 0){
    return res.status(200).send(booksAuthor)
  }

  return res.status(404).send(`The book by the author ${author} was not found!`)
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const title = req.params.title
  const booksTitle = []

  for (let id in books) {
    let book = books[id]
    if (book.title === title){
      booksTitle.push(book)
    }
  }

  if (booksTitle.length > 0){
    return res.status(200).send(booksTitle)
  }

  return res.status(404).send(`The book by the title ${title} was not found!`)
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn
  if (books[isbn]) {
    if (Object.keys(books[isbn].reviews).length > 0){
      return res.status(200).send(books[isbn].reviews)
    }
    return res.status(200).send(`The book by the ISBN ${isbn} has no reviews!`)
  }
  return res.status(300).send(`The book by the ISBN ${isbn} was not found!`);
});

module.exports.general = public_users;
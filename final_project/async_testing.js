const axios = require('axios')
const mainRoute = "http://localhost:5000/"

function get_books() {
    axios.get(mainRoute)
    .then((response) => {
        console.log(response.data);
    })
    .catch((error) => {
        console.error("Error fetching books:", error.message);
    });
}


function get_books_by_isbn(isbn) {
    axios.get(mainRoute+"isbn/"+isbn)
    .then((response) => {
        console.log(response.data);
    })
    .catch((error) => {
        console.error("Error fetching books:", error.message);
    });
}

function get_books_by_author(author) {
    axios.get(mainRoute+"author/"+author)
    .then((response) => {
        console.log(response.data);
    })
    .catch((error) => {
        console.error("Error fetching books:", error.message);
    });
}

function get_books_by_title(title) {
    axios.get(mainRoute+"title/"+title)
    .then((response) => {
        console.log(response.data);
    })
    .catch((error) => {
        console.error("Error fetching books:", error.message);
    });
}

// console.log("Getting books:");
// get_books();

// console.log("Getting book details with isbn")
// get_books_by_isbn(2)

// console.log("Getting book details with author")
// get_books_by_author("Dante Alighieri")

console.log("Getting book details with title")
get_books_by_title("The Epic Of Gilgamesh")
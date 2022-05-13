/**
 * Book constructor
 */
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

/**
 * UI constructor
 */
function UI() {}

/**
 * add prtotype of book
 */
UI.prototype.addBookList = function (book) {
  const list = document.getElementById("book-list");

  //create tr element
  const row = document.createElement("tr");

  //insert cols
  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#> class="delete">X</a></td>
  `;
  list.appendChild(row);
};

/**
 * Clear Fields
 */

UI.prototype.clearFields = function () {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("isbn").value = "";
};

/**
 * Show alert
 *
 * */

UI.prototype.showAlert = function (message, className) {
  //create div
  const div = document.createElement("div");
  //add classess
  div.className = `alert ${className}`;
  //add text node
  div.appendChild(document.createTextNode(message));
  //get parent
  const container = document.querySelector(".container");

  //getting form
  const form = document.querySelector("#book-form");

  //inserting alert to the form
  container.insertBefore(div, form);

  //settime out after 3 sec
  setTimeout(function () {
    document.querySelector(".alert").remove();
  }, 3000);
};

/**
 * Delete Book
 */

UI.prototype.deleteBook = function (target) {
  if ((target.className = "delete")) {
    target.parentElement.parentElement.remove();
  }
};

/**
 * Event Listener fro Add Book
 */
document.getElementById("book-form").addEventListener("submit", function (e) {
  //getting form values
  const title = document.getElementById("title").value,
    author = document.getElementById("author").value,
    isbn = document.getElementById("isbn").value;

  //instanstiate book
  const book = new Book(title, author, isbn);

  //instanstiate ui
  const ui = new UI();

  //validate
  if (title === "" || author === "" || isbn === "") {
    //erro alert
    ui.showAlert("Please fill All fields", "error");
  } else {
    //add book to list
    ui.addBookList(book);

    //show alert
    ui.showAlert("Book Added", "success");

    //clear fields
    ui.clearFields();
  }

  e.preventDefault();
});

/**
 * Event Listener for Delete
 */
document.getElementById("book-list").addEventListener("click", function (e) {
  //instanstiate ui
  const ui = new UI();

  ui.deleteBook(e.target);

  //show alert
  ui.showAlert("Book Removed", "success");

  e.preventDefault();
});

/** TODO: added local storage */

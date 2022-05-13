/**
 * Classes Book
 */

class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

/**
 * Class UI
 */
class UI {
  /**
   * add book
   */
  addBookList(book) {
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
  }
  /**
   * Clear Fields
   */
  clearFields() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
  }

  /**
   * Show alert
   *
   * */
  showAlert(message, className) {
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
  }

  /**
   * Delete Book
   */
  deleteBook(target) {
    if ((target.className = "delete")) {
      target.parentElement.parentElement.remove();
    }
  }
}

/**
 * Local Storage Class
 */

class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }
    return books;
  }
  static displayBooks() {
    const books = Store.getBooks();
    books.forEach(function (book) {
      const ui = new UI();
      //add book to ui
      ui.addBookList(book);
    });
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);

    localStorage.setItem("books", JSON.stringify(books));
  }

  static removeBook(isbn, index) {
    const books = Store.getBooks();
    books.forEach(function (book) {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem("books", JSON.stringify(books));
  }
}
/**
 * DOM load Event
 */
document.addEventListener("DOMContentLoaded", Store.displayBooks);

/**
 * Event Listener for Add Book
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

    //add to local storage
    Store.addBook(book);

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

  //ui delete book
  ui.deleteBook(e.target);

  //remove from local storage
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  //show alert
  ui.showAlert("Book Removed", "success");

  e.preventDefault();
});

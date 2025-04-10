const formEl = document.querySelector("form");
let lib = new Library();
// Load the data
window.onload = function () {
  let storedBooks = JSON.parse(localStorage.getItem("library"));
  lib.books = storedBooks.map((book) => {
    let b = new Book(book.title, book.author);
    if (book.read) b.markAsRead();
    return b;
  });
  bookListFun();
};
formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  const bookTitle = document
    .getElementById("bookTitle")
    .value.trim()
    .split(/\s+/)
    .join(" ");
  const bookAuthor = document
    .getElementById("bookAuthor")
    .value.trim()
    .split(/\s+/)
    .join(" ");
  if (bookTitle && bookAuthor) {
    let book = new Book(bookTitle, bookAuthor);

    // Add the book to the library
    lib.addBook(book);

    // Add to the local storage
    updateStorage();
  }
  // Show book in the screen
  bookListFun();
  //   clear the input fields
  document.getElementById("bookTitle").value = ``;
  document.getElementById("bookAuthor").value = ``;
});

function markAsBookRead(index) {
  lib.getBooks()[index].markAsRead();
  updateStorage();
  bookListFun();
}
function markBookAsUnRead(index) {
  lib.getBooks()[index].markAsUnRead();
  updateStorage();
  bookListFun();
}
function removeTheBook(index) {
  lib.removeBook(index);
  bookListFun();
  updateStorage();
}

// Updating the localStorage function
function updateStorage() {
  localStorage.setItem("library", JSON.stringify(lib.getBooks()));
}

// displaying BookList
function bookListFun() {
  let bookListEl = document.querySelector("#bookList");
  document.querySelector("#bookCount").textContent = lib.getBookCount();
  // Resetting the bookList values
  bookListEl.innerHTML = ``;
  lib.getBooks().forEach((book, index) => {
    let li = document.createElement("li");
    li.innerHTML = `
      <div style="text-decoration:${
        book.isRead() ? "line-through" : "none"
      };color:${
      book.isRead() ? "red" : "auto"
    }">${book.getTitle()} by ${book.getAuthor()}</div>
      <div>
        <button class="btn read" onclick="${
          book.isRead()
            ? `markBookAsUnRead(${index})`
            : `markAsBookRead(${index})`
        }">${book.isRead() ? `Mark as UnRead` : `Mark as Read`}</button>
        <button class="btn remove" onclick="removeTheBook(${index})">Remove</button>
      </div>
    `;
    bookListEl.appendChild(li);
  });
}

// book constructor function
function Book(title, author, id) {
  this.title = title;
  this.author = author;
  this.id = id;
}

class BookCollection {
  constructor() {
    this.books = JSON.parse(localStorage.getItem("books")) || [];
    if (this.books.length === 0) {
      this.count = 0;
    } else {
      this.count = this.books.slice(-1)[0].id + 1;
    }
  }

  addBook(title, author, id) {
    const newBook = new Book(title, author, id);

    this.books.push(newBook);
    localStorage.setItem("books", JSON.stringify(this.books)); // save updated collection to localStorage
    this.displayBooks();
    this.count += 1;
  }

  removeBook(id) {
    this.books = this.books.filter((book) => book.id !== parseInt(id, 10));
    localStorage.setItem("books", JSON.stringify(this.books)); // save updated collection to localStorage
    this.displayBooks();
  }

  displayBooks() {
    const bookList = document.querySelector("ul");

    bookList.innerHTML = "";
    this.books.forEach((book) => {
      const contain = document.createElement("li");
      contain.id = book.id;
      contain.innerHTML = `
         <div class='check'>
        <p>"${book.title}" by ${book.author}</p>
        <button class='remove-book-button'>Remove</button>
        </div>
        
        `;

      bookList.appendChild(contain);
    });
  }
}

const bookCollection = new BookCollection();
bookCollection.displayBooks();

const addBookForm = document.getElementById("add-book-form");
addBookForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const titleInput = document.getElementById("title-input");
  const authorInput = document.getElementById("author-input");
  const id = bookCollection.count;
  bookCollection.addBook(titleInput.value, authorInput.value, id);
  titleInput.value = "";
  authorInput.value = "";
});

// event listener for remove book button click
document.addEventListener("click", (e) => {
  const target = e.target.closest(".remove-book-button");
  if (target) {
    const { id } = target.parentNode.parentNode;
    bookCollection.removeBook(id);
  }
});

//SPA

const list = document.querySelector(".list");
const add = document.querySelector(".add");
const contact = document.querySelector(".contact");

const show_book = document.querySelector(".show-book");
const add_book = document.querySelector(".add-book");
const contact_section = document.querySelector("#contact-section");

list.addEventListener("click", (e) => {
  e.preventDefault();
  list.classList.add("active");
  contact.classList.remove("active");
  add.classList.remove("active");
  show_book.style.display = "block";
  add_book.style.display = "none";
  contact_section.style.display = "none";
  console.log("list");
});
add.addEventListener("click", (e) => {
  e.preventDefault();

  add.classList.add("active");
  contact.classList.remove("active");
  list.classList.remove("active");
  show_book.style.display = "none";
  contact_section.style.display = "none";
  add_book.style.display = "block";

  console.log("add");
});
contact.addEventListener("click", (e) => {
  e.preventDefault();
  contact.classList.add("active");
  add.classList.remove("active");
  list.classList.remove("active");
  console.log("hi");

  contact_section.style.display = "block";
  show_book.style.display = "none";
  add_book.style.display = "none";
});

let books = JSON.parse(localStorage.getItem('books')) || [];
let count = 0;

// book constructor function
function Book(title, author, id) {
  this.title = title;
  this.author = author;
  this.id = id;
}

// display books in page
function displayBooks() {
  const bookList = document.querySelector('ul');
  bookList.innerHTML = '';
  books.forEach((book) => {
    const contain = document.createElement('li');
    contain.id = book.id;
    contain.innerHTML = `
    
        <p>${book.title}</p>
        <p>${book.author}</p>
        <button class='remove-book-button'>Remove</button>
        <hr/>
        `;

    bookList.appendChild(contain);
  });
}

// add book to collection
function addBookToCollection(title, author, id) {
  const newBook = new Book(title, author, id);
  books.push(newBook);
  localStorage.setItem('books', JSON.stringify(books)); // save updated collection to localStorage
  displayBooks();
}

// remove book from collection
function removeBookFromCollection(id) {
  books = books.filter((book) => book.id !== parseInt(id, 10));
  localStorage.setItem('books', JSON.stringify(books)); // save updated collection to localStorage
  displayBooks();
}

// event listener for add book form submission
const addBookForm = document.getElementById('add-book-form');
addBookForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const titleInput = document.getElementById('title-input');
  const authorInput = document.getElementById('author-input');
  addBookToCollection(titleInput.value, authorInput.value, count);
  titleInput.value = '';
  authorInput.value = '';
  count += 1;
});

// event listener for remove book button click
document.addEventListener('click', (e) => {
  const target = e.target.closest('.remove-book-button');
  if (target) {
    const { id } = target.parentNode;
    removeBookFromCollection(id);
    target.parentNode.remove();
  }
});

// initial display of books
displayBooks();

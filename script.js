let books = JSON.parse(localStorage.getItem('books')) || [];
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
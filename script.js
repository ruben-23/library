
let myLibrary = [{
    id: crypto.randomUUID(),
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    pages: 295,
    read: true
},];

function Book(title, author, pages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.info = function () {
        return `${this.title} by ${this.author}, ${pages} pages, ${read ? 'read' : 'not read yet'}`;
    }

}

function addBookToLibrary(title, author, pages, read) {
    if(!title || !author || !pages) {
        console.error("Enter all book properties");
        return;
    }

    let newBook = new Book(title, author, pages, read);

    myLibrary.push(newBook);
}

function createBookCard(book) {
    const booksContainer = document.querySelector('.books-container');
    const bookCard = document.createElement('div')
    bookCard.setAttribute('class','book-card');
    bookCard.setAttribute('id', book.id)

    const title = document.createElement('h2');
    title.textContent = book.title;

    const author = document.createElement('h3');
    author.textContent = book.author;

    const pages = document.createElement('p');
    pages.textContent = `${book.pages} pages`;

    const readStatus = document.createElement('p');
    readStatus.textContent = `${book.read ? 'Read' : 'Not Read'}`;

    const cardActions = document.createElement('div')
    cardActions.setAttribute('class','card-actions');

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';

    const toggleReadButton = document.createElement('button');
    toggleReadButton.textContent = "Mark as read";
    
    cardActions.append(deleteButton, toggleReadButton);
    bookCard.append(title, author, pages, readStatus, cardActions);
    booksContainer.appendChild(bookCard);
}


function displayBooks() {
    myLibrary.forEach((book) => {
        createBookCard(book);
    } )
}




displayBooks();
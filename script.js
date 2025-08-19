
let myLibrary = [];

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

Book.prototype.toggleRead = function() {
    console.log('current status', this.read);
    this.read = (this.read === true ? false : true);
    console.log('status after toggle', this.read);
}

function addBookToLibrary(title, author, pages, read) {
    if (!title || !author || !pages) {
        console.error("Enter all book properties");
        alert('Enter all book details')
        return false;
    }

    let newBook = new Book(title, author, pages, read);

    myLibrary.push(newBook);
    displayBooks();
    return true;
}

function submitNewBook(e) {
    e.preventDefault();

    const title = document.getElementById('book-title').value;
    const author = document.getElementById('book-author').value;
    const pages = document.getElementById('book-pages').value;
    const readStatus = document.querySelector('input[name="read"]:checked').value;

    if( addBookToLibrary(title, author, pages, (readStatus === "true"))){
        document.getElementById("bookForm").reset();
        dialog.close();
    }
}

function createBookCard(book) {
    const booksContainer = document.querySelector('.books-container');

    // clear the message displayed if there are no books
    // so it will not be treated as a valid cell in the grid 
    // if(myLibrary.length !== 0) {
    //     booksContainer.innerHTML = '';
    // }

    const bookCard = document.createElement('div')
    bookCard.setAttribute('class', 'book-card');
    bookCard.setAttribute('data-id', book.id)

    const title = document.createElement('h2');
    title.textContent = book.title;

    const author = document.createElement('h3');
    author.textContent = book.author;

    const pages = document.createElement('p');
    pages.textContent = `🕮 ${book.pages} pages`;

    const readStatus = document.createElement('p');
    readStatus.textContent = `${book.read ? '✔️ Read' : '❌ Not Read'}`;

    const cardActions = document.createElement('div')
    cardActions.setAttribute('class', 'card-actions');

    const deleteButton = document.createElement('button');
    deleteButton.textContent = '😨 Delete';

    const toggleReadButton = document.createElement('button');
    toggleReadButton.textContent = `${!book.read ? 'Mark as read' : 'Mark as not read'}`;
    toggleReadButton.setAttribute('class', `${book.read ? 'mark-not-read' : 'mark-read'}`);

    cardActions.append(deleteButton, toggleReadButton);
    bookCard.append(title, author, pages, readStatus, cardActions);
    booksContainer.appendChild(bookCard);

    deleteButton.addEventListener('click',() => deleteBook(book.id));
    toggleReadButton.addEventListener('click', () => toggleReadStatus(book.id));

}

function displayBooks() {
    const booksContainer = document.querySelector('.books-container');
    booksContainer.innerHTML = '';
    
    if(myLibrary.length === 0){
        const message = document.createElement("h1");
        message.textContent = "😿 There are no books! Add some nice ones! 😸"
        booksContainer.appendChild(message);
        return;
    }

    myLibrary.forEach((book) => {
        createBookCard(book);
    })
}

function deleteBook(id) {
   myLibrary.forEach((book) => {
    if(book.id === id){
        const index = myLibrary.indexOf(book);
        console.log(myLibrary.splice(index, 1));
        return;
    }
   })
   console.log('array:', myLibrary)
   displayBooks();
}

function toggleReadStatus(id) {
    console.log(id);
    myLibrary.forEach((book) => {
        console.log(book);
        if(book.id === id){
            book.toggleRead();
            
            const card = document.querySelector(`[data-id="${book.id}"`);
            const readStatus = card.querySelector('p:last-of-type');
            const toggleReadButton = card.querySelector('button:last-of-type');

            readStatus.textContent = `${book.read ? '✔️ Read' : '❌ Not Read'}`;
            toggleReadButton.textContent = `${!book.read ? 'Mark as read' : 'Mark as not read'}`;
            toggleReadButton.setAttribute('class', `${book.read ? 'mark-not-read' : 'mark-read'}`);

            return;
        }
    })

}

const dialog = document.getElementById('addBookDialog');
const addButton = document.getElementById('addBookButton');
const closeButton = document.getElementById('closeButton');

addButton.addEventListener('click', () => { dialog.showModal(); });
closeButton.addEventListener('click', () => { dialog.close(); });

const submitButton = document.getElementById('submitButton');
submitButton.addEventListener('click', submitNewBook);


displayBooks();
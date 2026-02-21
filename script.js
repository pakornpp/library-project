const myLibrary = []; // new array
const container = document.querySelector(".container");

function Book(title)
{
    this.title = title;
    this.id = crypto.randomUUID();
    this.isRead = false;
}

function addBookToLibrary(book)
{
    myLibrary.push(book);
}

function removeBook(event)
{

    // Find the index to remove based on the unique ID
    const index = myLibrary.findIndex(item => item.id === event.target.id);

    if (index !== -1) // If found
        myLibrary.splice(index, 1);

    displayBooks();
}

function toggleRead(event)
{
    // Find the index to toggle based on the unique ID
    const index = myLibrary.findIndex(item => item.id === event.target.id);

    if (index !== -1) // If found
    {
        if (myLibrary[index].isRead)
        {
            event.target.textContent = "Unread";
            myLibrary[index].isRead = false;
        }
        else
        {
            event.target.textContent = "Read";
            myLibrary[index].isRead = true;
        }
    }
}

function createBookCard(book)
{
    const div = document.createElement("div");
    div.className = "card";
    const p = document.createElement("p");
    p.textContent = book.title;
    div.appendChild(p);
    container.appendChild(div);


    const divButtons = document.createElement("div");
    divButtons.className = "buttons";
    div.appendChild(divButtons);

    const btnRemove = document.createElement("button");
    btnRemove.className = "remove card-button";
    btnRemove.textContent = "Remove";
    btnRemove.id = book.id;
    btnRemove.addEventListener("click", removeBook);

    divButtons.appendChild(btnRemove);

    const btnRead = document.createElement("button");
    btnRead.className = "read card-button";
    btnRead.textContent = "Unread";
    btnRead.id = book.id;
    btnRead.addEventListener("click", toggleRead);
    divButtons.appendChild(btnRead);
}

function displayBooks()
{
    container.replaceChildren();
    for (let bookNum in myLibrary)
    {
        createBookCard(myLibrary[bookNum]);
    }
}

function handleSubmit()
{
    const inputElement = document.querySelector("#input-title");
    const title = inputElement.value; // Get the title
    inputElement.value = '';

    const newBook = new Book(title);
    addBookToLibrary(newBook);
    displayBooks();
}

// Initial books
let book1 = new Book("The Lean Startup");
let book2 = new Book("The Let Them Theory");

addBookToLibrary(book1);
addBookToLibrary(book2);

displayBooks();

const btn = document.querySelector(".submit-button");
btn.addEventListener("click", handleSubmit);


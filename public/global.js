// // Open Library Function (not being used)

// const { response } = require("express");

// async function searchBooks(event) {
//     event.preventDefault();

//     const welcomeMessage = document.getElementById('welcomeMessage');
//     welcomeMessage.innerHTML = ''

//     const resultsTable = document.getElementById('resultsTable');
//     resultsTable.innerHTML = '';

//     const bookName = document.getElementById('searchBox').value.trim().replace(/\s+/g, "+");
//     console.log(bookName);
    
    
//     await fetch(`https://openlibrary.org/search.json?title=${bookName}`)
//     .then((result) => result.json())
//     .then((data) => {
//         const firstRow = document.createElement('tr');

//         const coverColumn = document.createElement('th');
//         coverColumn.textContent = 'Cover';
//         firstRow.appendChild(coverColumn);

//         const titleColumn = document.createElement('th');
//         titleColumn.textContent = 'Title';
//         firstRow.appendChild(titleColumn);

//         const authorColumn = document.createElement('th');
//         authorColumn.textContent = 'Author';
//         firstRow.appendChild(authorColumn);

//         resultsTable.append(firstRow);

//         const books = data.docs;
//         books.forEach(book => {
//             const tableRow = document.createElement('tr');

//             const coverCell = document.createElement('td');
//             coverCell.innerHTML = `<img src="https://covers.openlibrary.org/b/id/${book.cover_i}-S.jpg" width="40" height="60">`;
//             tableRow.appendChild(coverCell);

//             const titleCell = document.createElement('td');
//             titleCell.textContent = book.title;
//             titleCell.setAttribute('class', 'titleCell')
//             tableRow.appendChild(titleCell);

//             const authorCell = document.createElement('td');
//             authorCell.textContent = book.author_name;
//             tableRow.appendChild(authorCell);

//             resultsTable.append(tableRow);
//         });

//         // im a genius
//         resultsTable.setAttribute('class', 'styleResultsTable')
//     });
// };


// Google API Function (being used)

async function searchBooksGoogle(event) {
    event.preventDefault();

    const apiKey = 'AIzaSyDfHBexf1SnirVY0BW3XlXhQ-iIVvhlft8'

    const welcomeMessage = document.getElementById('welcomeMessage');
    welcomeMessage.innerHTML = ''

    const resultsTable = document.getElementById('resultsTable');
    resultsTable.innerHTML = '';

    const bookName = document.getElementById('searchBox').value.trim().replace(/\s+/g, "+");
    console.log(bookName);
    
    
    await fetch(`https://www.googleapis.com/books/v1/volumes?q=${bookName}&download=epub&key=${apiKey}`)
    .then((result) => result.json())
    .then((data) => {

        const books = data.items;
        books.forEach(book => {
            const tableRow = document.createElement('tr');

            const coverCell = document.createElement('td');
            coverCell.innerHTML = `<img src="https://books.google.com/books/content?id=${book.id}&printsec=frontcover&img=1&zoom=5&source=gbs_api" 
                                width="40" height="60">`;
            tableRow.appendChild(coverCell);

            const titleAuthorCell = document.createElement('td');
            titleAuthorCell.innerHTML = `<strong><a href="/${book.id}" class="bookLink">
                                        ${book.volumeInfo.title}</a></strong><br>By: ${book.volumeInfo.authors}`
            titleAuthorCell.setAttribute('class', 'titleAuthorCell')
            tableRow.appendChild(titleAuthorCell);

            const authorCell = document.createElement('td');
            authorCell.innerHTML = `<strong>Average Rating:</strong> ${book.volumeInfo.averageRating}<br>
                                    Published: ${book.volumeInfo.publishedDate}`
            tableRow.appendChild(authorCell);


            //Saved Book Button
            const title = book.volumeInfo.title ||  'No title';
            const authorsArray = book.volumeInfo.authors || ['Unknown Author'];
            const authors = authorsArray.join(', ');


            const save = document.createElement('td');
            const saveButton = document.createElement('button');
            saveButton.textContent = 'Save';
            saveButton.addEventListener('click', () => {
                saveBookToBackend(title, authors);
            }); 
            save.appendChild(saveButton);
            tableRow.appendChild(save);



            resultsTable.appendChild(tableRow);
        });

        // im a genius
        resultsTable.setAttribute('class', 'styleResultsTable')
    });
};

// Adding Saved Book to Database Function
async function saveBookToBackend(bookTitle, bookAuthor) {
    try {
        const response = await fetch ('/customer', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify ({bookTitle, bookAuthor})
        });

        const result = await response.json();

        if (response.ok){
            alert (`"${bookTitle}" by ${bookAuthor} saved successfully`);
            console.log('Saved to database:', result);

        } else {
            alert (`Failed to save: ${result.message}`);
            console.error('Error:', result);
        }

    } catch (error) {
        alert ('An error occurred trying to save the book');
        console.error('Error:',error);
    }

};

// Appending the Saved Books onto BookPage
async function loadSavedBooks (){
    try {
        const response = await fetch ('/INST377-Project');
        const books = await response.json();
        const savedBooksTable = document.getElementById('savedBooksTable');

        if (!books || books.length === 0) {
            const row = document.createElement('tr');
            const cell  = document.createElement('td');
            cell.colSpan = 2;
            cell.textContent = 'No Saved Books Yet';

            row.appendChild(cell);
            savedBooksTable.appendChild(row);
            return;
        }

        books.forEach(book => {
            const row = document.createElement('tr');
            const titleCell = document.createElement('td');

            titleCell.textContent = book.book_title;
            row.appendChild(titleCell);

            const authorCell = document.createElement('td');
            authorCell.textContent = book.book_author;

            row.appendChild(authorCell);
            savedBooksTable.appendChild(row);
        });


    } catch (error) {
        console.error('Error:', error);
    }
};


document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('savedBooksTable')) {
        loadSavedBooks();
    }
});


// Simple Slider for Book Covers
async function bookImages() {
    const sliderDiv = document.getElementById("sliderDiv");
    sliderDiv.innerHTML = "";
    const bookSubjects = ["fantasy", "fiction", "mystery", "romance", "science"];


    const imagesLoad = Array.from({length:10}, () => {
        const random = bookSubjects[Math.floor (Math.random() * bookSubjects.length)];
        return fetch (`https://openlibrary.org/subjects/${random}.json?limit=100`)
        .then (response => response.json())
        .then (data => {
            const dataArray = data.works;
            const cover = dataArray.filter(book => book.cover_id);
            if (cover.length === 0) return null;

            const randomBook = cover [Math.floor(Math.random() * cover.length)];
            return `https://covers.openlibrary.org/b/id/${randomBook.cover_id}-L.jpg`;
        });
    });


    try {
        const images = await Promise.all(imagesLoad);
        images.forEach(url => {
            const img = document.createElement("img");
            img.src= url;
            sliderDiv.appendChild(img);
        });
        simpleslider.getSlider();
    }

    catch (error) {
        console.error("Error loading image:", error);
    }


}
bookImages();

// Open Library Function (not being used)

async function searchBooks(event) {
    event.preventDefault();

    const welcomeMessage = document.getElementById('welcomeMessage');
    welcomeMessage.innerHTML = ''

    const resultsTable = document.getElementById('resultsTable');
    resultsTable.innerHTML = '';

    const bookName = document.getElementById('searchBox').value.trim().replace(/\s+/g, "+");
    console.log(bookName);
    
    
    await fetch(`https://openlibrary.org/search.json?title=${bookName}`)
    .then((result) => result.json())
    .then((data) => {
        const firstRow = document.createElement('tr');

        const coverColumn = document.createElement('th');
        coverColumn.textContent = 'Cover';
        firstRow.appendChild(coverColumn);

        const titleColumn = document.createElement('th');
        titleColumn.textContent = 'Title';
        firstRow.appendChild(titleColumn);

        const authorColumn = document.createElement('th');
        authorColumn.textContent = 'Author';
        firstRow.appendChild(authorColumn);

        resultsTable.append(firstRow);

        const books = data.docs;
        books.forEach(book => {
            const tableRow = document.createElement('tr');

            const coverCell = document.createElement('td');
            coverCell.innerHTML = `<img src="https://covers.openlibrary.org/b/id/${book.cover_i}-S.jpg" width="40" height="60">`;
            tableRow.appendChild(coverCell);

            const titleCell = document.createElement('td');
            titleCell.textContent = book.title;
            titleCell.setAttribute('class', 'titleCell')
            tableRow.appendChild(titleCell);

            const authorCell = document.createElement('td');
            authorCell.textContent = book.author_name;
            tableRow.appendChild(authorCell);

            resultsTable.append(tableRow);
        });

        // im a genius
        resultsTable.setAttribute('class', 'styleResultsTable')
    });
}

// Google API Function (being used)

async function searchBooksGoogle(event) {
    event.preventDefault();

    const welcomeMessage = document.getElementById('welcomeMessage');
    welcomeMessage.innerHTML = ''

    const resultsTable = document.getElementById('resultsTable');
    resultsTable.innerHTML = '';

    const bookName = document.getElementById('searchBox').value.trim().replace(/\s+/g, "+");
    console.log(bookName);
    
    
    await fetch(`https://www.googleapis.com/books/v1/volumes?q=${bookName}&download=epub&key=AIzaSyDfHBexf1SnirVY0BW3XlXhQ-iIVvhlft8`)
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
            titleAuthorCell.innerHTML = `<strong><a href="${book.volumeInfo.infoLink}" target="_blank" class="bookLink">${book.volumeInfo.title}</a></strong><br>By: ${book.volumeInfo.authors}`
            titleAuthorCell.setAttribute('class', 'titleAuthorCell')
            tableRow.appendChild(titleAuthorCell);

            const authorCell = document.createElement('td');
            authorCell.innerHTML = `<strong>Average Rating:</strong> ${book.volumeInfo.averageRating}<br>
                                    Published: ${book.volumeInfo.publishedDate}`
            tableRow.appendChild(authorCell);

            resultsTable.append(tableRow);
        });

        // im a genius
        resultsTable.setAttribute('class', 'styleResultsTable')
    });
}
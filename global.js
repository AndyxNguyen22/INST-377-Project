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
            coverCell.innerHTML = `<img src="https://covers.openlibrary.org/b/id/${book.cover_i}-S.jpg" width="80" height="120">`;
            tableRow.appendChild(coverCell);

            const titleCell = document.createElement('td');
            titleCell.textContent = book.title;
            tableRow.appendChild(titleCell);

            const authorCell = document.createElement('td');
            authorCell.textContent = book.author_name;
            tableRow.appendChild(authorCell);

            resultsTable.append(tableRow);
        });

        // im a genius
        resultsTable.setAttribute('class', 'styleResultsTable')
    });

    await fetch(`https://covers.openlibrary.org/b/id/${coverID}-S.jpg`)
    .then((result) => result.json())
    .then((data) => {

    })
    
}
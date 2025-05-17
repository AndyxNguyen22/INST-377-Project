// Node.js

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');

// BodyParser
const bodyParser = require('body-parser');
// SupaBase 
const supabaseClient = require ('@supabase/supabase-js');
// BodyParser
app.use(bodyParser.json());
// dotenv
const dotenv = require('dotenv');
dotenv.config();


app.use(express.static(path.join(__dirname, 'public')));

// SupaBase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = supabaseClient.createClient(supabaseUrl, supabaseKey);

app.get('/INST377-Project', async(req, res) => {
    console.log('Attempting to GET all books!');

    const { data, error } = await supabase.from('customer').select();

    if (error) {
        console.log(`Error: ${error}`);
        res.send(error);
    }

    res.send(data);
});

app.post('/customer', async(req,res) =>{
    console.log('Adding book');

    console.log(req.body);
    const bookAuthor = req.body.bookAuthor;
    const bookTitle = req.body.bookTitle;

    const { data, error } = await supabase
  .from('customer')
  .insert({ 
    book_author: bookAuthor, 
    book_title: bookTitle })
  .select();

if (error) {
        console.log(`Error: ${error}`);
        res.statusCode = 500;
        res.send(error);
    }


    res.send(data);
});

/////// 

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/HomePage.html');
  });  

app.get('/:bookID', async (req, res) => {
    const bookID = req.params.bookID;
    const apiKey = 'AIzaSyDfHBexf1SnirVY0BW3XlXhQ-iIVvhlft8'

    await fetch(`https://www.googleapis.com/books/v1/volumes/${bookID}?key=${apiKey}`)
    .then((result) => result.json())
    .then((data) => {

        const book = data.volumeInfo;
        
        res.send(`
        <html>
            <head>
                <title>Looks Books</title>
                <link rel="stylesheet" href="global.css">
                <script defer src="global.js"></script>
            </head>
            <body>
                <!-- Header -->
                <header id="daHeader">
                    <h1>Looks Books</h1>
                </header>
                <!-- Navigation Bar -->
                <nav>
                    <ul id="navBar">
                        <li><a href = "HomePage.html">Home Page</a></li>
                        <li><a href = "BookPage.html">Book Page</a></li>
                        <li><a href = "AboutPage.html">About Us</a></li>
                        <li>
                            <!-- Search Bar -->
                            <form onsubmit="searchBooksGoogle(event)" id="searchForm">
                                <input type="text" id="searchBox">
                                <button type="submit" id="searchSubmit" class="button-11">Submit</button>
                            </form>
                        </li>
                    </ul>
                </nav>
                <!-- One Book Page -->
                <div id="oneBookLeftSide">
                    <img src="http://books.google.com/books/publisher/content?id=${bookID}&printsec=frontcover&img=1&
                            zoom=1&imgtk=AFLRE72eeeOuMSuFAq092-LhG39YKvUY7kkHzcSZV2scVd0_cL1CrlRHJIBirqdqJQvZfMJr8n73
                            eqbXEL2iTbdukRcn6jNmaG86FPcv2ccHuy1ZRNgJtmoncqEb9crXw2D6d3WZWtUS&source=gbs_api" 
                            width="250" height="380">
                    <div id="oneBookRightSide">
                        <h2>${book.title}</h2>
                        <p style="font-size: 18px;">${book.averageRating ? book.averageRating.toFixed(1) + ' Rating':'No Ratings'}</p>
                        <h4>Description:</h4>
                        <p style="font-size: 12px; font-family: calibri;">${book.description}</p>
                    </div>
                </div>
                
                <!-- Search Results -->
                <div id="searchResultsContainer">
                    <table id="resultsTable"></table>
                </div>
                
            </body>
        </html>
        `)
    });
});

app.listen(port, () => {
    console.log('App is alive on port', port)
});
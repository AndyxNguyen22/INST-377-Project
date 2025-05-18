# INST-377-Project

# Names: Andy Nguyen & Thara Le

# Title: LookBook

Description: Our aim for this project was to create an application that allows users to search up for books. When the user inputs a search, it will return with a table of books best matching the query search. The users can search for books, see the details regarding the books, click on the book, and save the book to a saved list. Right now our target browsers are computer users.




Developer Manual


When you first enter the application, you are on the Home Page. Here you are greeted with instructions with a slider showing book covers. You can also turn on your microphone to use voice commands. The buttons to turn on and off the microphone along with instructions are towards the bottom of the page. The Home Page is the only page you can perform searches. With a search, you will get a table of books with information regarding each book. You can click on the book to see the book description. Users will have to use the browser's go back arrow to go back to the search results after click on a book. You can save books using the save button available at the table. The About Us page is only a page with information regarding us, the creators.

To install our application, access our GitHub and clone the repository. With our application, make sure to have node installed if you wish to work on it locally. You can run the application on our vercel link attached to our GitHub. However, any edits you make will not be shown our vercel link. You can also run and work on it locally but make sure you have node and npm installed on your working terminal. Your edits will be shown if you work on it locally. 

APIs for this application are Open Library, Google Books, and our SupaBase. With Open Library and Google Books, these are GET requests. Open Library and Google Books provide the books covers for the slider, the books from the search query, the author(s), rating, date published, and description for said book. SupaBase uses GET and POST requests. Users can save a book which will PUSH the author and title of said book onto the SupaBase data base. On the Book Page, users can see their saved books which is a result of the GET request. The GET request gets the information from the SupaBase database.

As of right now, there are some bugs to be aware of. Usually the slider will disappear after a search request but sometimes it will not and appear with the search results. Road-map for future development is to expand and make results more accurate to the search query. Along with that, the Saved Books contain all the books on the database rather than be specific to each user. Making it specific to users for future development is in the road-map. Along with this, a <- arrow or button to get back to the results after clicking on a book is in the road-map. Right now you have to click the browsers's go back arrow rather then be provided with a go back option on the page to go back to the search results. 









function run(title) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        // When the request is successful, finished, and response is ready        
        if (this.readyState == 4 && this.status == 200) {
            var obj = JSON.parse(xhttp.responseText);
            var title = obj.items[0].volumeInfo.title;
            if (obj.items[0].volumeInfo.hasOwnProperty('subtitle')) {
                title += ": " + obj.items[0].volumeInfo.subtitle;
            }
            var volumeInfo = obj.items[0].volumeInfo;
            books.push(new Book(title, volumeInfo.authors[0], volumeInfo.averageRating, volumeInfo.imageLinks.thumbnail,
                volumeInfo.ratingsCount, volumeInfo.pageCount, volumeInfo.infoLink, volumeInfo.publishedDate));
        }
    };
    // Send an asynchronous HTTP GET request to the given end point (url)
    xhttp.open("GET", "https://www.googleapis.com/books/v1/volumes?q=" + title + "&key=AIzaSyB_WJVwKPveKKtaNre1qRDqfPseGHZ2HmU", true);
    xhttp.send();
}

function Book(title, author, stars, image, reviews, page, link, date) {
    //Defining the variables
    this.title = title;
    this.author = author;
    this.stars = stars;
    this.image = image;
    this.reviews = reviews;
    this.page = page;
    this.link = link;
    this.date = date;

    //Creating the grids
    createGrids(this.title, this.author, this.stars, this.image, this.reviews, this.page, this.link, this.date);
}
var books = [];
run("Game of thrones a song of ice");
run("How to Lie with Statistics");
run("Types and Programming Languages");
run("Thinking in Java");
run("Winter in Madrid");
run("12 Rules for Life");
run("Little Blue Truck");
run("Learning Python");
run("A wrinkle in time");

var sorts = document.getElementById("sort");
sorts.onchange = function () {
    if (this.value == "page") {
        books.sort(comparePage);
    } else if (this.value == "review") {
        books.sort(compareReviews);
    } else if (this.value == "stars") {
        books.sort(compareStars);
    } else { //Sorting according to date
        books.sort(compareDates)
    }
    updateDOM();
}

function comparePage(a, b) {
    return b.page - a.page;
}

function compareReviews(a, b) {
    return b.reviews - a.reviews;
}

function compareStars(a, b) {
    return b.stars - a.stars;
}

function compareDates(a, b) {
    var d1 = new Date(a.date);
    var d2 = new Date(b.date);
    if (d1 < d2) {
        return 1;
    } else if (d2 > d1) {
        return -1;
    } else {
        return 0;
    }
}

function updateDOM() {
    var allBooks = document.getElementById("grid-container");
    allBooks.innerHTML = ""; //Cheating :D
    var i;
    for (i = 0; i < books.length; i++) {
        createGrids(books[i].title, books[i].author, books[i].stars, books[i].image, books[i].reviews, books[i].page, books[i].link, books[i].date);
    }
}

function createGrids(title, author, stars, image, review, page, link, date) {
    var allBooks = document.getElementById("grid-container");
    var divElem = document.createElement("div");
    allBooks.appendChild(divElem);

    var aElem = document.createElement("a");
    aElem.href = link;
    aElem.target = "_blank";
    divElem.appendChild(aElem);

    var imgElem = document.createElement("img");
    imgElem.src = image;
    imgElem.width = "218";
    imgElem.height = "218";
    aElem.appendChild(imgElem);
    aElem.appendChild(document.createElement("br"));

    var titleSpan = document.createElement("span");
    titleSpan.className = "title";
    titleSpan.appendChild(document.createTextNode(title));
    aElem.appendChild(titleSpan);
    aElem.appendChild(document.createElement("br"));

    var authorSpan = document.createElement("span");
    authorSpan.className = "authors";
    authorSpan.appendChild(document.createTextNode("Author: " + author + "."));
    aElem.appendChild(authorSpan);
    aElem.appendChild(document.createElement("br"));

    var starsSpan = document.createElement("span");
    starsSpan.className = "stars";
    starsSpan.appendChild(document.createTextNode("Stars: " + stars + " / 5.0."));
    aElem.appendChild(starsSpan);
    aElem.appendChild(document.createElement("br"));

    var reviewSpan = document.createElement("span");
    reviewSpan.className = "reviews";
    reviewSpan.appendChild(document.createTextNode("Reviews: " + review + " Customer reviews."));
    aElem.appendChild(reviewSpan);
    aElem.appendChild(document.createElement("br"));

    var pageSpan = document.createElement("span");
    pageSpan.className = "page";
    pageSpan.appendChild(document.createTextNode("Number of pages: " + page + " pages."));
    aElem.appendChild(pageSpan);
    aElem.appendChild(document.createElement("br"));

    var publishSpan = document.createElement("span");
    publishSpan.className = "published";
    publishSpan.appendChild(document.createTextNode("Date Published: " + date));
    aElem.appendChild(publishSpan);
    aElem.appendChild(document.createElement("br"));
    aElem.appendChild(document.createElement("br"));
}

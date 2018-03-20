function Book(title, stars, image, review, pr, link, date) {
    //Defining the variables
    this.tit = title;
    this.star = stars;
    this.imageLink = image;
    this.reviews = review;
    this.pric = pr;
    this.lin = link;
    this.dat = date;

    //Creating the grids
    createGrids(this.tit, this.star, this.imageLink, this.reviews, this.pric, this.lin, this.dat);
}

var books = [];
books.push(new Book("Web Design with HTML, CSS, JavaScript and jQuery Set", 4.7, "https://images-na.ssl-images-amazon.com/images/I/41T53nRtyoL._SX435_BO1,204,203,200_.jpg", 433, 28.38, "https://www.amazon.com/Web-Design-HTML-JavaScript-jQuery/dp/1118907442/", "July 8, 2014"));
books.push(new Book("A Smarter Way to Learn JavaScript. The new tech-assisted approach that requires half the effort", 4.7, "https://images-na.ssl-images-amazon.com/images/I/512KPmZIG7L._SX348_BO1,204,203,200_.jpg", 1497, 15.78, "https://www.amazon.com/Smarter-JavaScript-tech-assisted-approach-requires/dp/1497408180/", "March 20, 2014"));
books.push(new Book("Calculus: Early Transcendentals", 3.9, "https://images-na.ssl-images-amazon.com/images/I/51jitgi3EaL._SX423_BO1,204,203,200_.jpg", 101, 178.46, "https://www.amazon.com/Calculus-Early-Transcendentals-James-Stewart/dp/1285741552", "February 4, 2015"));
books.push(new Book("A Wrinkle in Time Movie Tie-In Edition (A Wrinkle in Time Quintet)", 4.0, "https://images-na.ssl-images-amazon.com/images/I/51dy4WOGbJL._SX338_BO1,204,203,200_.jpg", 2920, 8.99, "https://www.amazon.com/Wrinkle-Time-Movie-Tie-Quintet/dp/1250153271/", "November 7, 2017"));
books.push(new Book("Harry Potter And The Chamber Of Secrets", 4.7, "https://images-na.ssl-images-amazon.com/images/I/51jNORv6nQL._SX340_BO1,204,203,200_.jpg", 60226, 7.39, "https://www.amazon.com/Harry-Potter-Chamber-Secrets-Rowling/dp/0439064872/", "August 15, 2000"));
books.push(new Book("A Game of Thrones (A Song of Ice and Fire, Book 1)", 4.7, "https://images-na.ssl-images-amazon.com/images/I/51fjW-2wOTL._SX328_BO1,204,203,200_.jpg", 20205, 11.29, "https://www.amazon.com/Game-Thrones-Song-Fire-Book/dp/0553386794/", "March 22, 2011"));
books.push(new Book("Elementary Statistics: A Step By Step Approach", 4.0, "https://images-na.ssl-images-amazon.com/images/I/51bS-0oEmSL._SX388_BO1,204,203,200_.jpg", 359, 122.56, "https://www.amazon.com/Elementary-Statistics-Step-Approach/dp/1259755339/", "February 1, 2017"));
books.push(new Book("Technical Communication Fundamentals", 3.8, "https://images-na.ssl-images-amazon.com/images/I/51Dd6K-yL8L._SX395_BO1,204,203,200_.jpg", 18, 100.00, "https://www.amazon.com/Technical-Communication-Fundamentals-William-Pfeiffer/dp/0132374579", "March 7, 2011"));
books.push(new Book("Introduction to Java Programming and Data Structures, Comprehensive Version (11th Edition)", 4.3, "https://images-na.ssl-images-amazon.com/images/I/51rFsKGbyML._SX395_BO1,204,203,200_.jpg", 13, 147.12, "https://www.amazon.com/Introduction-Programming-Structures-Comprehensive-Version/dp/0134670949/", "March 11, 2017"));


var sorts = document.getElementById("sort");
sorts.onchange = function () {
    if (this.value == "price") {
        books.sort(comparePrice);
    } else if (this.value == "review") {
        books.sort(compareReviews);
    } else if (this.value == "stars") {
        books.sort(compareStars);
    } else { //Sorting according to date
        books.sort(compareDates)
    }
    updateDOM();
}

function comparePrice(a, b) {
    return a.pric - b.pric;
}

function compareReviews(a, b) {
    return b.reviews - a.reviews;
}

function compareStars(a, b) {
    return b.star - a.star;
}

function compareDates(a, b) {
    var d1 = new Date(a.dat);
    var d2 = new Date(b.dat);
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
        createGrids(books[i].tit, books[i].star, books[i].imageLink, books[i].reviews, books[i].pric, books[i].lin, books[i].dat);
    }
}

function createGrids(title, stars, image, review, pr, link, date) {
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
    titleSpan = document.createElement("span");
    titleSpan.className = "title";
    titleSpan.appendChild(document.createTextNode(title));
    aElem.appendChild(titleSpan);
    aElem.appendChild(document.createElement("br"));
    starsSpan = document.createElement("span");
    starsSpan.className = "stars";
    starsSpan.appendChild(document.createTextNode("Stars: " + stars + " / 5.0."));
    aElem.appendChild(starsSpan);
    aElem.appendChild(document.createElement("br"));
    reviewSpan = document.createElement("span");
    reviewSpan.className = "reviews";
    reviewSpan.appendChild(document.createTextNode("Reviews: " + review + " Customer reviews"));
    aElem.appendChild(reviewSpan);
    aElem.appendChild(document.createElement("br"));
    priceSpan = document.createElement("span");
    priceSpan.className = "price";
    priceSpan.appendChild(document.createTextNode("Price: " + pr + "$"));
    aElem.appendChild(priceSpan);
    aElem.appendChild(document.createElement("br"));
    publishSpan = document.createElement("span");
    publishSpan.className = "published";
    publishSpan.appendChild(document.createTextNode("Date Published: " + date));
    aElem.appendChild(publishSpan);
    aElem.appendChild(document.createElement("br"));
    aElem.appendChild(document.createElement("br"));
    buttonElem = document.createElement("button");
    buttonElem.onclick = function () { alert('The book has been added to the cart.'); };
    buttonElem.appendChild(document.createTextNode("Add to cart"));
    divElem.appendChild(buttonElem);
}
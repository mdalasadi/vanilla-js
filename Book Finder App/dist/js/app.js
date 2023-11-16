const bookSearchInput = document.getElementById("book-search");
let inputText;
let timeout;

// Fetch the books from API
async function getBooks(bookName) {
  const res = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${bookName}&maxResults=12`
  );
  const books = await res.json();
  return books;
}

function addBookDetailsToDOM(book) {
  document.getElementById("main-search").innerHTML = `
    <section class="container search-d">
      <aside class="book-info">
        <div>
          <h4>${book.title}</h4>
          <div class="fluid-img"><img src="${
            book.hasOwnProperty("imageLinks")
              ? book.imageLinks.thumbnail
              : "assets/images/CoverNotAvailable.jpg"
          }"></div>
        </div>
        <div>
          <ul>
            <li><sapn class="bold-text">Author: </sapn>${book.authors || ""}</li>
            <li><sapn class="bold-text">Publisher: </sapn>${book.publisher || ""}</li>
            <li><sapn class="bold-text">Published Date: </sapn>${book.publishedDate || ""}</li>
            <li><sapn class="bold-text">Number Of pages: ${book.pageCount || ""}</sapn></li>
            <li><sapn class="bold-text">Critics' Opinion: </sapn><i class="fas fa-star"></i> ${
              book.averageRating || ""
            }</li>
          </ul>
        </div>
      </aside>
      <article class="book-desc">
        <h4>Book Description</h4>
        <p>${book.description || ""}</p>
      </article>
    </section>
  `;
}

// Show Book Description
async function getBookDetails(bookID) {
  let books = await getBooks(inputText);
  books.items.forEach((book) => {
    if (book.id === bookID) {
      // Show Descrption on DOM
      addBookDetailsToDOM(book.volumeInfo);
    }
  });
}

// Add Books into DOM
async function addBooksToDOM(BookName) {
  clearTimeout(timeout);
  document.getElementById("loader").classList.add("showLoader");
  books = await getBooks(BookName);

  timeout = setTimeout(() => {
    document.getElementById("loader").classList.remove("showLoader");
    document.getElementById("book-search").value = "";
    document.getElementById(
      "total-books"
    ).innerHTML = `<p>About <span class="bold-text">${books.totalItems}</span> books found</p>`;
    let output = "";
    books.items.forEach((book) => {
      output += `
        <div class="card">
          <div class="row">
            <div class="col-40">
              <img src="${
                book.volumeInfo.hasOwnProperty("imageLinks")
                  ? book.volumeInfo.imageLinks.thumbnail
                  : "assets/images/CoverNotAvailable.jpg"
              }" alt="">
            </div>
          <div class="col-60">
            <p class="book-title"><span class="bold-text">${book.volumeInfo.title || ""}</span></p>
            <p class="book-author"><span class="bold-text">Authors:</span> ${
              book.volumeInfo.authors || ""
            }</p>
            <p class="published-date"><span class="bold-text">Published Date:</span> ${
              book.volumeInfo.publishedDate || ""
            }</p>
            <p class="publisher"><span class="bold-text">Publisher:</span> ${
              book.volumeInfo.publisher || ""
            }</p>
            <a href="#" data-bookid="${
              book.id
            }" id="book-desc" class="btn-primary">More <i class="fas fa-chevron-right" data-bookid="${
        book.id
      }"></i></a>
          </div>
        </div>
        </div>
      `;
    });
    document.getElementById("output-info").innerHTML = output;
  }, 2000);
}

// Submit Event
document.getElementById("book-form").addEventListener("submit", (e) => {
  e.preventDefault();
  inputText = bookSearchInput.value;
  if (inputText.trim() !== "") {
    addBooksToDOM(inputText);
  } else {
    alert("Enter a valid text!");
  }
});

// Click Event
document.addEventListener("click", (e) => {
  if (e.target.id === "book-desc" || e.target.parentElement.id === "book-desc") {
    const bookID = e.target.dataset.bookid;
    getBookDetails(bookID);
    e.preventDefault();
  }
});

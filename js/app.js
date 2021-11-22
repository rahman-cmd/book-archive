const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("search-btn");
const searchResult = document.getElementById("search-result");
const errorDiv = document.getElementById("error");
const spinner = document.getElementById("spinner");
const searchCount = document.getElementById("search-count");


searchBtn.addEventListener('click', function () {
    const searchText = searchInput.value;
    if (searchText === "") {
        errorDiv.innerText = "Search field cannot be empty.";
        return;
    }

    // clear
    searchInput.value = '';
    searchResult.innerText = "";

    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    spinner.classList.remove("d-none");
    fetch(url)
        .then(res => res.json())
        .then(data => {
            // Setting a timer of 1.5s, before removing the spinnner, and showing data
            setTimeout(() => {
                spinner.classList.add("d-none");
                showData(data);

            }, 1500);
        })
        .finally(() => {
            searchInput.value === "";
        });
});

// Book Dtat get
function showData(bookArray) {
    // Error Handeling
    if (bookArray.num_found === 0) {
        errorDiv.innerText = "NO Result Found";
    } else {
        errorDiv.innerText = "";
    }
    // console.log(bookArray.length);
    searchCount.innerText = `(${bookArray.num_found})`;
    // set innerHTML
    bookArray.docs.forEach((doc) => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div class="card h-100">
            <img src="https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title fw-bold">Book Name:<span class="text-primary"> ${doc.title}</span></h5>
              <h6 class="card-text">Publisher Name:<span class="text-success"> ${doc.publisher}</span></h6>
              <h6 class="card-text">First Publish:<span class="text-success"> ${doc.first_publish_year}</span></h6>
              <h6 class="card-text">Author Name:<span class="text-success"> ${doc.author_name}</span></h6>
            </div>
          </div>
            `;

        searchResult.appendChild(div);
    });


}

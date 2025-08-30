let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");

function createAndAppendSearchResult(result) {
  let { link, title, description } = result;

  let resultItemEl = document.createElement("div");
  resultItemEl.classList.add("result-item");

  let titleEl = document.createElement("a");
  titleEl.href = link;
  titleEl.target = "_blank";
  titleEl.textContent = title;
  titleEl.classList.add("result-title");
  resultItemEl.appendChild(titleEl);

  resultItemEl.appendChild(document.createElement("br"));

  let urlEl = document.createElement("a");
  urlEl.classList.add("result-url");
  urlEl.href = link;
  urlEl.target = "_blank";
  urlEl.textContent = link;
  resultItemEl.appendChild(urlEl);

  resultItemEl.appendChild(document.createElement("br"));

  let descriptionEl = document.createElement("p");
  descriptionEl.classList.add("link-description");
  descriptionEl.textContent = description;
  resultItemEl.appendChild(descriptionEl);

  searchResultsEl.appendChild(resultItemEl);
}

function displayResults(searchResults) {
  spinnerEl.classList.add("d-none");
  if (searchResults.length === 0) {
    searchResultsEl.innerHTML =
      "<p class='text-danger'>No results found. Try another keyword.</p>";
    return;
  }
  for (let result of searchResults) {
    createAndAppendSearchResult(result);
  }
}

function searchWikipedia(event) {
  if (event.key === "Enter") {
    let searchInput = searchInputEl.value.trim();
    if (searchInput === "") return;

    spinnerEl.classList.remove("d-none");
    searchResultsEl.textContent = "";

    let url = "https://apis.ccbp.in/wiki-search?search=" + searchInput;
    fetch(url)
      .then(response => response.json())
      .then(jsonData => {
        let { search_results } = jsonData;
        displayResults(search_results);
      })
      .catch(() => {
        spinnerEl.classList.add("d-none");
        searchResultsEl.innerHTML =
          "<p class='text-danger'>Failed to fetch results. Please try again.</p>";
      });
  }
}

searchInputEl.addEventListener("keydown", searchWikipedia);

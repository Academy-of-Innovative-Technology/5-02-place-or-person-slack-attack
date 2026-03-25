let database = [];

function loadData() {

  fetch("src/api/data.json")
    .then(response => response.json())
    .then(data => {

      database = data;

      console.log(database); // check it works

      displayOptions(); // show dropdown

    });

}

loadData();

function displayOptions() {

  let select = document.querySelector("#search");

  database.forEach(function(item) {

    let option = `<option value="${item.name}">${item.name}</option>`;

    select.insertAdjacentHTML("beforeend", option);

  });

}

document.querySelector("#search").addEventListener("change", function() {

  let value = this.value;

  searchData(value);

});

function searchData(name) {

  let result = database.find(function(item) {
    return item.name === name;
  });

  displayData(result);

}
function displayData(item) {

  let container = document.querySelector("#output");

  container.innerHTML = "";

  let html = "";

  // IF COUNTRY
  if (item.type === "location") {

    html = `
      <h2>${item.name}</h2>
      <p>Capital: ${item.capital}</p>
      <p>Population: ${item.population}</p>
      <p>Animal: ${item.animal}</p>
      <p>Languages: ${item.language.join(", ")}</p>

      <img src="${item.images.flag}" width="200">
    `;
  }

  // IF PERSON
  else {

    html = `
      <h2>${item.name}</h2>
      <p>Born: ${item.birth}</p>
      <p>Country: ${item.country}</p>
      <p>Background: ${item.background.join(", ")}</p>
      <p>Parents: ${item.parents.join(", ")}</p>
      <p>Education: ${item.education.join(", ")}</p>

      <img src="${item.images.main}" width="200">
    `;
  }

  container.innerHTML = html;

}


let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let create = document.getElementById("create");
let delet = document.getElementById("delet");
let deletAll = document.getElementById("deletAll");
let mode = "create";
let tmp;

function getTotal() {
  let result = +price.value + +taxes.value + +ads.value - +discount.value;
  if (price.value) {
    total.innerHTML = result;
    total.style.backgroundColor = "#0e8c47";
  } else {
    total.innerHTML = "";
    total.style.backgroundColor = "#a00d02";
  }
  console.log(total.value);
}

// save Data
let allProducts;

if (localStorage.product != null) {
  allProducts = JSON.parse(localStorage.product);
} else {
  allProducts = [];
}

create.onclick = function getData() {
  let newPro = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };

  if (title.value && price.value && category.value && count.value <= 100) {
    if (mode === "create") {
      if (newPro.count > 1) {
        for (let i = 0; i < newPro.count; i++) {
          allProducts.push(newPro);
        }
      } else {
        allProducts.push(newPro);
      }
    } else {
      allProducts[tmp] = newPro;
      mode = "create";
      count.style.display = "block";
      create.innerHTML = "Create";
    }
    clearData();
  }
  localStorage.setItem("product", JSON.stringify(allProducts));

  showData();
};

// Clean All the data
function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
  total.style.backgroundColor = "#a00d02";
}

// Reading Data
function showData() {
  let table = "";
  for (let i = 0; i < allProducts.length; i++) {
    table += `
        <tr>
              <td>${i + 1}</td>
              <td>${allProducts[i].title}</td>
              <td>${allProducts[i].price}</td>
              <td>${allProducts[i].taxes}</td>
              <td>${allProducts[i].ads}</td>
              <td>${allProducts[i].discount}</td>
              <td>${allProducts[i].total}</td>              
              <td>${allProducts[i].category}</td>  
              <td><button id="update" onclick="updateData(${i})">Update</button></td>
              <td><button id="delet" onclick="deletItem(${i})">Delete</button></td>            
            </tr>    
      `;
  }
  document.getElementById("tbody").innerHTML = table;

  if (allProducts.length > 0) {
    deletAll.innerHTML = ` 
        <button  onclick="deletAllItem()">Delete All (${allProducts.length})</button>
        `;
  } else {
    deletAll.innerHTML = "";
  }
}
showData();

// Delet item
function deletItem(i) {
  allProducts.splice(i, 1);
  localStorage.product = JSON.stringify(allProducts);
  showData();
}

function deletAllItem() {
  localStorage.clear();
  allProducts.splice(0);
  showData();
}

// updata data
function updateData(i) {
  title.value = allProducts[i].title;
  price.value = allProducts[i].price;
  taxes.value = allProducts[i].taxes;
  ads.value = allProducts[i].ads;
  discount.value = allProducts[i].discount;
  getTotal();
  category.value = allProducts[i].category;
  count.style.display = "none";
  create.innerHTML = "Update";
  mode = "update";
  tmp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

// Searching
let searchMood = "title";
function getSearchMood(id) {
  let search = document.getElementById("search");
  if (id === "searchByTitle") {
    searchMood = "title";
  } else {
    searchMood = "category";
  }
  search.placeholder = `Search By ${searchMood}`;
  search.focus();
  search.value = "";
  showData();
}

function searchData(value) {
  let table = "";
  for (let i = 0; i < allProducts.length; i++) {
    if (searchMood == "title") {
      if (allProducts[i].title.includes(value.toLowerCase())) {
        table += `
            <tr>
                  <td>${i + 1}</td>
                  <td>${allProducts[i].title}</td>
                  <td>${allProducts[i].price}</td>
                  <td>${allProducts[i].taxes}</td>
                  <td>${allProducts[i].ads}</td>
                  <td>${allProducts[i].discount}</td>
                  <td>${allProducts[i].total}</td>              
                  <td>${allProducts[i].category}</td>  
                  <td><button id="update" onclick="updateData(${i})">Update</button></td>
                  <td><button id="delet" onclick="deletItem(${i})">Delete</button></td>            
                </tr>    
          `;
      } else {
      }
    } else {
      if (allProducts[i].category.includes(value.toLowerCase())) {
        table += `
            <tr>
                  <td>${i + 1}</td>
                  <td>${allProducts[i].title}</td>
                  <td>${allProducts[i].price}</td>
                  <td>${allProducts[i].taxes}</td>
                  <td>${allProducts[i].ads}</td>
                  <td>${allProducts[i].discount}</td>
                  <td>${allProducts[i].total}</td>              
                  <td>${allProducts[i].category}</td>  
                  <td><button id="update" onclick="updateData(${i})">Update</button></td>
                  <td><button id="delet" onclick="deletItem(${i})">Delete</button></td>            
                </tr>    
          `;
      } else {
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
}

var ProductNameInput = document.getElementById("Product_Name");
var ProductPriceInput = document.getElementById("Product_Price");
var ProductCategoryInput = document.getElementById("Product_Category");
var ProductDescriptionInput = document.getElementById("Product_Description");
var searchInput = document.getElementById("searchInput");

var nameError = document.getElementById("nameError");
var priceError = document.getElementById("priceError");
var categoryError = document.getElementById("categoryError");
var descError = document.getElementById("descError");

var AllProducts = [];
var currentIndex = null;

if (localStorage.getItem("products") != null) {
  AllProducts = JSON.parse(localStorage.getItem("products"));
}
displayAllProducts();

function AddNewProduct() {
  if (!isValid()) return;

  var Product = {
    name: ProductNameInput.value.trim(),
    price: ProductPriceInput.value.trim(),
    category: ProductCategoryInput.value.trim(),
    description: ProductDescriptionInput.value.trim(),
  };

  if (currentIndex === null) {
    AllProducts.push(Product);
  } else {
    AllProducts[currentIndex] = Product;
    currentIndex = null;
    document.getElementById("mainBtn").innerText = "ADD PRODUCT";
    document.getElementById("mainBtn").className = "btn btn-outline-info";
  }

  // ❗ الترتيب مهم: حدث localStorage بعد التعديل
  localStorage.setItem("products", JSON.stringify(AllProducts));

  // ثم نظّف وحدث العرض
  CLEARFORM();
  displayAllProducts();
}
  

function CLEARFORM() {
  ProductNameInput.value = "";
  ProductPriceInput.value = "";
  ProductCategoryInput.value = "";
  ProductDescriptionInput.value = "";

  nameError.classList.add("d-none");
  priceError.classList.add("d-none");
  categoryError.classList.add("d-none");
  descError.classList.add("d-none");

  ProductNameInput.classList.remove("is-invalid");
  ProductPriceInput.classList.remove("is-invalid");
  ProductCategoryInput.classList.remove("is-invalid");
  ProductDescriptionInput.classList.remove("is-invalid");
}

function displayAllProducts() {
  var Cartona = "";
  for (var i = 0; i < AllProducts.length; i++) {
    Cartona += `
      <tr>
        <td>${i}</td>
        <td>${AllProducts[i].name}</td>
        <td>${AllProducts[i].price}</td>
        <td>${AllProducts[i].category}</td>
        <td>${AllProducts[i].description}</td>
        <td><button onclick="deleteProduct(${i})" class="btn btn-danger">DELETE</button></td>
        <td><button onclick="updateProduct(${i})" class="btn btn-warning">UPDATE</button></td>
      </tr>
    `;
  }
  document.getElementById("tbody").innerHTML = Cartona;
}

function deleteProduct(i) {
  AllProducts.splice(i, 1);
  localStorage.setItem("products", JSON.stringify(AllProducts));
  displayAllProducts();
}

function updateProduct(i) {
  var product = AllProducts[i];
  ProductNameInput.value = product.name;
  ProductPriceInput.value = product.price;
  ProductCategoryInput.value = product.category;
  ProductDescriptionInput.value = product.description;
  currentIndex = i;
  document.getElementById("mainBtn").innerText = "SAVE UPDATE";
  document.getElementById("mainBtn").className = "btn btn-success";
}

function searchProduct() {
  var term = searchInput.value.toLowerCase();
  var result = AllProducts.filter(function (product) {
    return product.name.toLowerCase().includes(term);
  });
  displaySearchResult(result);
}

function displaySearchResult(list) {
  var Cartona = "";
  for (var i = 0; i < list.length; i++) {
    var index = AllProducts.indexOf(list[i]);
    Cartona += `
      <tr>
        <td>${index}</td>
        <td>${list[i].name}</td>
        <td>${list[i].price}</td>
        <td>${list[i].category}</td>
        <td>${list[i].description}</td>
        <td><button onclick="deleteProduct(${index})" class="btn btn-danger">DELETE</button></td>
        <td><button onclick="updateProduct(${index})" class="btn btn-warning">UPDATE</button></td>
      </tr>`;
  }
  document.getElementById("tbody").innerHTML = Cartona;
}

function isValid() {
  var name = ProductNameInput.value.trim();
  var price = ProductPriceInput.value.trim();
  var category = ProductCategoryInput.value.trim();
  var description = ProductDescriptionInput.value.trim();
  var valid = true;

  if (!/^[A-Za-z ]{3,30}$/.test(name)) {
    nameError.classList.remove("d-none");
    ProductNameInput.classList.add("is-invalid");
    valid = false;
  } else {
    nameError.classList.add("d-none");
    ProductNameInput.classList.remove("is-invalid");
  }

  if (price === "" || isNaN(price) || Number(price) <= 0) {
    priceError.classList.remove("d-none");
    ProductPriceInput.classList.add("is-invalid");
    valid = false;
  } else {
    priceError.classList.add("d-none");
    ProductPriceInput.classList.remove("is-invalid");
  }

  if (category.length < 3) {
    categoryError.classList.remove("d-none");
    ProductCategoryInput.classList.add("is-invalid");
    valid = false;
  } else {
    categoryError.classList.add("d-none");
    ProductCategoryInput.classList.remove("is-invalid");
  }

  if (description.length < 10) {
    descError.classList.remove("d-none");
    ProductDescriptionInput.classList.add("is-invalid");
    valid = false;
  } else {
    descError.classList.add("d-none");
    ProductDescriptionInput.classList.remove("is-invalid");
  }

  return valid;
}

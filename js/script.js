var ProductNameInput = document.getElementById("Product_Name");
var ProductPriceInput = document.getElementById("Product_Price");
var ProductCategoryInput = document.getElementById("Product_Category");
var ProductDescriptionInput = document.getElementById("Product_Description");
var AllProducts = []
function AddNewProduct() {
    // var ProductName = ProductNameInput.value;
    // var ProductPrice = ProductPriceInput.value;
    // var ProductCategory = ProductCategoryInput.value;
    // var ProductDescription = ProductDescriptionInput.value;
    var Product = {
        name: ProductNameInput.value,
        price: ProductPriceInput.value,
        category: Number(ProductCategoryInput.value),
        description: ProductDescriptionInput.value

    }
    AllProducts.push(Product);
    console.log(AllProducts);


    CLEARFORM()
    displayAllProducts()

}


function CLEARFORM() {
    ProductNameInput.value = "";
    ProductPriceInput.value = "";
    ProductCategoryInput.value = "";
    ProductDescriptionInput.value = "";

}
displayAllProducts()
function displayAllProducts() {
    var Cartona = "";
    for (var i = 1; i <= AllProducts.length; i++) {
        Cartona += ` <tr>
        <td>`+ AllProducts[i].name + `</td>
        <td>`+ AllProducts[i].price + `</td>
        <td>`+ AllProducts[i].category + `</td>
        <td>`+ AllProducts[i].description + `</td>
        <td><button class="btn btn-danger">DELETE</button></td>
        <td><button class="btn btn-warning">UPDATE</button></td>
        </tr> `
        document.getElementById("tbody").innerHTML = (Cartona);

    }
}
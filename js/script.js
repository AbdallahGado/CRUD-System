document.addEventListener("DOMContentLoaded", () => {
  const productName = document.getElementById("productName");
  const productPrice = document.getElementById("productPrice");
  const productCat = document.getElementById("productCat");
  const productDesc = document.getElementById("productDesc");
  const productTableBody = document.getElementById("productTableBody");
  const searchProduct = document.getElementById("searchProduct");
  const addBtn = document.getElementById("addBtn");
  let productContainer = JSON.parse(localStorage.getItem("products")) || [];
  let currentIndex = -1;

  addBtn.addEventListener("click", () => {
    if (currentIndex === -1) {
      addProduct();
    } else {
      editProduct();
    }
  });

  function addProduct() {
    const product = {
      name: productName.value,
      price: productPrice.value,
      cat: productCat.value,
      desc: productDesc.value,
    };

    if (!validateProduct(product)) return;

    productContainer.push(product);
    localStorage.setItem("products", JSON.stringify(productContainer));
    clearForm();
    displayProduct();
  }

  function clearForm() {
    productName.value = "";
    productPrice.value = "";
    productCat.value = "";
    productDesc.value = "";
    currentIndex = -1;
    addBtn.textContent = "Add Product";
  }

  function displayProduct() {
    productTableBody.innerHTML = productContainer
      .map(
        (product, i) => `
          <tr>
              <td>${i}</td>
              <td>${product.name}</td>
              <td>${product.price}</td>
              <td>${product.cat}</td>
              <td>${product.desc}</td>
              <td><button class="btn btn-warning" onclick="setForm(${i})">Update</button></td>
              <td><button class="btn btn-danger" onclick="deleteProduct(${i})">Delete</button></td>
          </tr>
      `
      )
      .join("");
  }

  window.deleteProduct = function (index) {
    productContainer.splice(index, 1);
    localStorage.setItem("products", JSON.stringify(productContainer));
    displayProduct();
  };

  window.search = function (term) {
    const filteredProducts = productContainer.filter((product) =>
      product.name.toLowerCase().includes(term.toLowerCase())
    );
    productTableBody.innerHTML = filteredProducts
      .map(
        (product, i) => `
          <tr>
              <td>${i}</td>
              <td>${product.name}</td>
              <td>${product.price}</td>
              <td>${product.cat}</td>
              <td>${product.desc}</td>
              <td><button class="btn btn-warning" onclick="setForm(${i})">Update</button></td>
              <td><button class="btn btn-danger" onclick="deleteProduct(${i})">Delete</button></td>
          </tr>
      `
      )
      .join("");
  };

  window.setForm = function (index) {
    if (index >= 0 && index < productContainer.length) {
      currentIndex = index;
      productName.value = productContainer[index].name;
      productPrice.value = productContainer[index].price;
      productCat.value = productContainer[index].cat;
      productDesc.value = productContainer[index].desc;
      addBtn.textContent = "Update Product";
    } else {
      console.error(`Product not found at index: ${index}`);
    }
  };

  function editProduct() {
    if (currentIndex >= 0 && currentIndex < productContainer.length) {
      const product = {
        name: productName.value,
        price: productPrice.value,
        cat: productCat.value,
        desc: productDesc.value,
      };

      if (!validateProduct(product)) return;

      productContainer[currentIndex] = product;
      localStorage.setItem("products", JSON.stringify(productContainer));
      clearForm();
      displayProduct();
    } else {
      console.error(`Product cannot be updated at index: ${currentIndex}`);
    }
  }

  function validateProduct(product) {
    if (!product.name || !product.price || !product.cat || !product.desc) {
      alert("Please fill in all fields.");
      return false;
    }
    return true;
  }

  displayProduct();
});

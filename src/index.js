// Function to make sure the number of cart still there after refresh the page
function refreshCartNum() {
    let productNum = localStorage.getItem("cartNum");
  
    if (productNum) {
      document.querySelector("li .cart span").textContent = productNum;
    }
  }
  
  refreshCartNum();
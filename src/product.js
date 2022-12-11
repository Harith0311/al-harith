let carts = document.querySelectorAll(".add-cart");
console.log(carts);
// The array of products
let products = [
  {
    name: "Adidas Adistar Men's Running Shoes Grey",
    tag: "adidasadistar",
    size: "",
    price: 389,
    cart: 0,
    id: 1,
    picTop: "adidas-shoe-bg.png",
    picBottom1: "adidas-shoe-a-bg.png",
    picBottom2: "adidas-shoe-b-bg.png",
    picBottom3: "adidas-shoe-c-bg.png",
  },
  {
    name: "Adidas Galaxy 6",
    tag: "adidasgalaxy",
    size: "",
    price: 199,
    cart: 0,
    id: 2,
    picTop: "adidas-shoe-1-bg.png",
    picBottom1: "adidas-galaxy-a-bg.png",
    picBottom2: "adidas-galaxy-b-bg.png",
    picBottom3: "adidas-galaxy-c-bg.png",
  },
  {
    name: "Adidas Adizero Boston 11",
    tag: "adidasadizero",
    size: "",
    price: 629,
    cart: 0,
    id: 3,
    picTop: "adidas-shoe-2-bg.png",
    picBottom1: "adidas-adizero-a-bg.png",
    picBottom2: "adidas-adizero-b-bg.png",
    picBottom3: "adidas-adizero-c-bg.png",
  },
  {
    name: "Adidas Response Super 3.0",
    tag: "adidasresponse",
    size: "",
    price: 379,
    cart: 0,
    id: 4,
    picTop: "adidas-shoe-3-bg.png",
    picBottom1: "adidas-response-a-bg.png",
    picBottom2: "adidas-response-b-bg.png",
    picBottom3: "adidas-response-c-bg.png",
  },
  {
    name: "Adidas Adistar CS",
    tag: "adidasadistarcs",
    size: "",
    price: 649,
    cart: 0,
    id: 5,
    picTop: "adidas-shoe-4-bg.png",
    picBottom1: "adidas-adistar-a-bg.png",
    picBottom2: "adidas-adistar-b-bg.png",
    picBottom3: "adidas-adistar-c-bg.png",
  },
  {
    name: "Adidas Solarglide 5",
    tag: "adidassolar",
    size: "",
    price: 599,
    cart: 0,
    id: 6,
    picTop: "adidas-shoe-5-bg.png",
    picBottom1: "adidas-solar-a-bg.png",
    picBottom2: "adidas-solar-b-bg.png",
    picBottom3: "adidas-solar-c-bg.png",
  },
];

const tag = new URLSearchParams(window.location.search).get("tag");

const theProduct = products.filter((product) => product.tag === tag)[0];

const containerSection = document.querySelector(".product-container");

//Template product page
containerSection.innerHTML = `
<div class="one">
<div class="top">
    <img src="/img/${theProduct.picTop}" alt="">
    <div class="desc">
        <h2>${theProduct.name}</h2>
        <h3><i class="fa-sharp fa-solid fa-box"></i> &nbsp; In stock</h3>
        <h4>MYR ${theProduct.price}</h4>
        <h5>CHOOSE SIZE IN UK (Available size)</h5>
        <div class="size">
            
            <select id="shoesize">
            <option value="6">6 UK</option>
            <option value="7">7 UK</option>
            <option value="8">8 UK</option>
            <option value="9">9 UK</option>
            <option value="10">10 UK</option>
            <option value="11">11 UK</option>
            <option value="12">12 UK</option>
            </select>
        </div>
        <div class="buy">
            <button type="button">Buy Now</button>
            <button type="button" class="add-cart" onclick="cartNum('${theProduct.tag}'),totalCost('${theProduct.price}')">Add to cart</button>
        </div>
        
    </div>
</div>
<div class="bottom">
    <div class="left">
        <img src="/img/${theProduct.picBottom1}" alt="">
    </div>
    <div class="center">
        <img src="/img/${theProduct.picBottom2}" alt="">
    </div>
    <div class="right">
        <img src="/img/${theProduct.picBottom3}" alt="">
    </div>
</div>
</div>
            `;

// Loop to call the cartNum() function after the add to cart button clicked
// for (let i=0; i < carts.length; i++) {
//     carts[i].addEventListener('click', () => {
//         cartNum(products);
//     })
// }

// Function to make sure the number of cart still there after refresh the page
function refreshCartNum() {
  let productNum = localStorage.getItem("cartNum");

  if (productNum) {
    document.querySelector("li .cart span").textContent = productNum;
  }
}

// Function to count the total number of product in the cart
function cartNum(tag) {
  let productNum = localStorage.getItem("cartNum");

  productNum = parseInt(productNum);

  if (productNum) {
    localStorage.setItem("cartNum", productNum + 1);
    document.querySelector("li .cart span").textContent = productNum + 1;
  } else {
    localStorage.setItem("cartNum", 1);
    document.querySelector("li .cart span").textContent = 1;
  }

  setItems(products, tag);
}

function setItems(products, tag) {
  let shoesize = document.querySelector("#shoesize").value;

  let cartItems = JSON.parse(localStorage.getItem("productsInCart"));
  // cartItems = JSON.parse(cartItems);      //Convert JSON format into JavaScript format

  console.log(products);

  if (cartItems) {
    // if(cartItems[products.tag] == undefined) {
    //     cartItems = {
    //         ...cartItems,
    //         [products.tag]: products
    //     }
    // }
    // cartItems[products.tag].cart += 1;

    let isAdded = false;
    cartItems.forEach((item) => {
      if (item.tag === tag && item.size === shoesize) {
        item.cart += 1;
        isAdded = true;
      }
    });

    if (!isAdded) {
      let productItem = products.filter((product) => product.tag === tag)[0];
      productItem.cart = 1;
      productItem.size = shoesize;
      cartItems = [...cartItems, productItem];
    }
  } else {
    // products.cart = 1;
    // cartItems = {
    //     [products.tag]: products
    // }

    let productItem = products.filter((product) => product.tag === tag)[0];
    console.log(productItem);
    productItem.cart = 1;
    productItem.size = shoesize;

    cartItems = [productItem];
  }

  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}


function totalCost(){
    // let cartCost = JSON.parse(localStorage.getItem("totalCost"));
    // cartCost = parseInt(cartCost);

    // if(cartCost) {
    //     cartCost = parseInt(cartCost);
    //     localStorage.setItem("totalCost", cartCost + products.price);
    // } else {
    //     localStorage.setItem("totalCost", products.price);
    // }

    // dapatkan cartItems dari localstorage
    let cartItems = JSON.parse(localStorage.getItem("productsInCart"));

    // create satu variable utk simpan totalcost
    let totalcost = 0;
    if (localStorage.getItem("totalcost")) {
      totalcost = parseInt(localStorage.getItem("totalcost"))
    }

    // guna loop utk dptkan price dri cartItems
    cartItems.forEach(item => {
      totalcost =(item.cart*item.price);
    });

    // simpan totalcost dalam localstorage
    localStorage.setItem("totalcost", totalcost)

}

refreshCartNum();

// Function to make sure the number of cart still there after refresh the page
function refreshCartNum() {
    let productNum = localStorage.getItem("cartNum");

    if (productNum) {
        document.querySelector("li .cart span").textContent = productNum;
    }
}

// Function to count the total number of product in the cart

refreshCartNum();

function displayCart() {
    let cartItems = window.localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);

    let productContainer = document.querySelector(".shop-cart");

    if (cartItems) {
        let subtotal = 0;
        let totalQuantity = 0;

        cartItems.forEach((item) => {
            productContainer.innerHTML += `
            <div class="item">
                
                <img src="/img/${item.picTop}" alt="">
                <div class="item-detail">
                    <p><strong>${item.name}</strong></p>
                    <p><span>In-Stock</span></p>
                    <p>Size: ${item.size}</p>
                    <div class="delete">
                        <a href="#" onclick="delCart(${
                            item.id
                        })"><i class="fa-solid fa-trash"></i>&nbsp;Delete</a>
                    </div>
                </div>
                <div class="price">
                    <p>MYR ${item.price}</p>
                </div>
                <div class="qty">
                    <select id="qty-${item.id}-${
                item.size
            }" onchange="changeSubtotal(${item.id}, ${item.size}, ${
                item.cart
            })">
                        <option value="1"${
                            item.cart === 1 ? "selected" : ""
                        }>1</option>
                        <option value="2"${
                            item.cart === 2 ? "selected" : ""
                        }>2</option>
                        <option value="3"${
                            item.cart === 3 ? "selected" : ""
                        }>3</option>
                        <option value="4"${
                            item.cart === 4 ? "selected" : ""
                        }>4</option>
                        <option value="5"${
                            item.cart === 5 ? "selected" : ""
                        }>5</option>
                        <option value="6"${
                            item.cart === 6 ? "selected" : ""
                        }>6</option>
                        <option value="7"${
                            item.cart === 7 ? "selected" : ""
                        }>7</option>
                        <option value="8"${
                            item.cart === 8 ? "selected" : ""
                        }>8</option>
                        <option value="9"${
                            item.cart === 9 ? "selected" : ""
                        }>9</option>
                        <option value="10"${
                            item.cart === 10 ? "selected" : ""
                        }>10</option>
                    </select>
                </div>
                <div class="subtotal" id="subtotal-${item.id}-${item.size}">
                    <p>MYR ${item.cart * item.price}</p>
                    
                </div>
            </div>

            <div class="line">
                <hr />
            </div>
            `;

            subtotal += parseInt(item.cart) * parseFloat(item.price);
            totalQuantity += parseInt(item.cart);
        });

        //Calculate Discount
        let discount = 0;

        if (totalQuantity >= 5 && totalQuantity <= 10) {
            discount = subtotal * 0.05;
        } else if (totalQuantity > 10) {
            discount = subtotal * 0.15;
        }

        let shipCost = 0;
        if (subtotal < 100) {
            shipCost = 10;
        }

        document.querySelector(".details").innerHTML = `
    <h4>Order Summary</h4>
    <div class="line">
        <hr />
    </div>

    <input type="text" placeholder="Enter discount code"><br>
    <button type="submit">Apply Discount</button>

    <div class="line">
        <hr />
    </div>

    <div class="total">
        <div class="kiri">
            <p>Subtotal</p>
            <p>Shipping Fee</p>
            <p>Discount</p>
        </div>
        <div class="kanan">
            <p class="totalSummary">MYR ${subtotal}</p>
            <p class="ship">MYR ${shipCost}</p>
            <p class="discountVal">MYR ${discount}</p>
        </div>
    </div>
    
    <div class="total-price">
        
        <div class="kiri">
            <p><strong>Estimated Total Price</strong></p>
            
        </div>
        <div class="kanan">
            <p class="totalPrice"><strong>MYR ${
                subtotal - discount + shipCost
            }</strong></p>
        </div>
        
    </div>
    <div class="checkout">
        <a href="#"><strong>Checkout Now</strong></a>
    </div>
    
    `;
    } else {
        productContainer.innerHTML += `
        <h5 class="no_product"> No product in cart!<h5>
       `;
    }
}

displayCart();

function changeSubtotal(productId, productSize, productCart) {
    const product = JSON.parse(
        window.localStorage.getItem("productsInCart")
    ).filter((item) => item.id === productId)[0];

    const quant = document.querySelector(
        "#qty-" + productId + "-" + productSize
    ).value;

    let productNum = parseInt(localStorage.getItem("cartNum"));
    productNum -= productCart;
    productNum += parseInt(quant);
    localStorage.setItem("cartNum", productNum);

    product.cart = parseInt(quant);

    let newProductInCart = JSON.parse(
        window.localStorage.getItem("productsInCart")
    ).filter((item) => item.id !== productId);

    newProductInCart = [...newProductInCart, product];

    let updateTotal = 0;
    newProductInCart.forEach((product) => {
        updateTotal += product.cart * product.price;
    });

    //Calculate Discount
    let discount = 0;
    let subtotalDisc = 0;
    let totalQuantity = 0;

    newProductInCart.forEach((product) => {
        subtotalDisc += product.cart * product.price;
        totalQuantity += product.cart;
    });

    if (totalQuantity >= 5 && totalQuantity <= 10) {
        discount = subtotalDisc * 0.05;
    } else if (totalQuantity > 10) {
        discount = subtotalDisc * 0.15;
    }

    let shipCost = 0;
    if (subtotalDisc < 100) {
        shipCost = 10;
    }

    console.log(discount);
    console.log(subtotalDisc);
    console.log(shipCost);
    document.querySelector(".totalSummary").textContent = "MYR " + subtotalDisc;
    document.querySelector(".discountVal").textContent = "MYR " + discount;
    document.querySelector(".totalPrice").textContent =
        "MYR " + (subtotalDisc - discount + shipCost);

    document.querySelector(".kanan p strong").textContent =
        "MYR " + updateTotal;

    window.localStorage.setItem(
        "productsInCart",
        JSON.stringify(newProductInCart)
    );

    const subtotal = parseInt(quant) * parseFloat(product.price);

    console.log(
        document.querySelector("#subtotal-" + productId + "-" + productSize)
    );

    document.querySelector(
        "#subtotal-" + productId + "-" + productSize + " p"
    ).textContent = "MYR " + subtotal;
}

function delCart(id) {
    let newProductInCart = JSON.parse(
        window.localStorage.getItem("productsInCart")
    ).filter((item) => item.id !== id);

    console.log(newProductInCart);
    window.localStorage.setItem(
        "productsInCart",
        JSON.stringify(newProductInCart)
    );

    window.location.href = "cart.html";
}

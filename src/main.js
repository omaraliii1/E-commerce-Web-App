// start
// after finished loading event of each page loading screen is disappeared and removed
window.onload = ()=>{
    let loadingScreen = document.querySelector(".spinner");
    loadingScreen.style.cssText = `background-color: transparent;`;
    [...loadingScreen.children].forEach((e)=>{
        e.style.cssText = `background-color: transparent;`;
    });
    setTimeout(()=>{
        loadingScreen.remove();
    }, 1000)
}
// end

// start side navbar function (open and close the side navbar on small devices)
function sideNavEvents(){ 
    let openIcon = document.querySelector("header .container .navbar > li:last-child");
    closeIcon = document.querySelector("header .container .navbar > li .pages > li:first-child"),
    sideNav = document.querySelector("header .container .navbar > li .pages");

    // open and close sidenavbar on small devices
    if(sideNav.classList.contains("open")){
        sideNav.style.cssText = `right: 0px;`;
    }else{
        sideNav.style.cssText = `right: ${-parseFloat(getComputedStyle(sideNav).width) + (-parseFloat(getComputedStyle(sideNav).padding) * 2)}px`;
    }
    openIcon.addEventListener("click", ()=>{
        sideNav.classList.add("open");
        sideNavEvents();
    });
    closeIcon.addEventListener("click", ()=>{
        sideNav.classList.remove("open");
        sideNavEvents();
    });
}
sideNavEvents();
// end

// start single product page
/*
1- click on product (event)
2- save product image in local storage
3- determine choosenProdImg and optsProdImg
4- assign imgs to choosenSpace and optsSpace
*/
let prods = [...document.querySelectorAll(".products > .container .product")];
prodEvent();
if(location.href.slice(location.href.lastIndexOf("/")) === "/singleProd.html"){
    findOptsProdImg(JSON.parse(localStorage.getItem("product")).lnk);
}
function prodEvent(){
    prods.forEach((product)=>{
        product.onclick = ()=>{
            localStorage.setItem("product", JSON.stringify({lnk: product.children[0].children[0].getAttribute("src")}));
        }
    });
}
function findOptsProdImg(choosen){
    let prodImgs = ["img/products/f1.jpg", "img/products/f2.jpg", "img/products/f3.jpg", "img/products/f4.jpg", "img/products/f5.jpg", "img/products/f6.jpg", "img/products/f7.jpg", "img/products/f8.jpg", "img/products/n1.jpg", "img/products/n2.jpg", "img/products/n3.jpg", "img/products/n4.jpg", "img/products/n5.jpg", "img/products/n6.jpg", "img/products/n7.jpg", "img/products/n8.jpg"],
        iOfChoosen = prodImgs.indexOf(choosen);
    if(iOfChoosen < 3){
        return assignChoosenAndOptsProds(choosen, prodImgs[iOfChoosen + 1], prodImgs[iOfChoosen + 2], prodImgs[iOfChoosen + 3]);
    } else{
        return assignChoosenAndOptsProds(choosen, prodImgs[iOfChoosen - 1], prodImgs[iOfChoosen - 2], prodImgs[iOfChoosen - 3])
    }
}
function assignChoosenAndOptsProds(choosen, opt1, opt2, opt3){
    let choosenSpace = document.querySelector(".choosenProd > .container > .col:first-child > .choosenSpace > img"),
        optsSpace = document.querySelectorAll(".choosenProd > .container > .col:first-child > .optSpace > img");

        choosenSpace.setAttribute("src", choosen);
        optsSpace[0].setAttribute("src", choosen);
        optsSpace[1].setAttribute("src", opt1);
        optsSpace[2].setAttribute("src", opt2);
        optsSpace[3].setAttribute("src", opt3);

        optsSpace.forEach((opt)=>{
            opt.addEventListener("click", ()=>{
                choosenSpace.setAttribute("src", opt.getAttribute("src"));
                localStorage.setItem("product", JSON.stringify({lnk: opt.getAttribute("src")}));
            })
        });
}
// end



// start shopping cart
/*
this is shopping cart process
- cartEvent()
    - notify()
    - cartArrOperations(1)
        - whichIsDbl()
            - cartLocalStorageUpdate()
    - cartPage()
        - cartTable()
            - trOfTable() 
                - remove event
                    - cartArrOperations(2)
                        - whichIsDbl()
                            - cartLocalStorageUpdate()
                    - receipt()
                - change quantity event
                    - updateQuantity()
                        - cartLocalStorageUpdate()
                    - receipt()
        - receipt()
*/ 

let cart = [];
if(Boolean(localStorage.getItem("cart"))){
    cart = JSON.parse(localStorage.getItem("cart"));
}
class Product{
    constructor(img, q, price){
        this.img = img;
        this.q = q;
        this.price = price;
        this.subTotal = q * price;
    }
}

// calls of 2 main functions cartEvent and cartPage
cartEvent()
if(location.href.slice(location.href.lastIndexOf("/")) === "/cart.html" && cart.length){
    cartPage();
}

// click event on cart icons and add to cart button in home, shop and singleProdPage
function cartEvent(){
    // click event on cart icon that lies in each product card in home and shop pages
    let iconBtn = prods.map((e)=>{
        return e.children[1].children[1];
    });
    iconBtn.forEach((btn, i) => {
        btn.addEventListener("click", ()=>{
            if(btn.children[1].classList.value !== "icon-check"){
                cartArrOperations(1, new Product(btn.parentElement.previousElementSibling.children[0].getAttribute("src"), 1, 139.00));
                notify();
            }
            btn.innerHTML = `<h4>$78</h4> <i class="icon-check"></i>`;
            setTimeout(()=>{
                btn.innerHTML = `<h4>$78</h4> <i class="icon-shopping-cart"></i>`;
            }, 1000);
        })
    });

    // click event on add to cart button in singleProdPage
    if(location.href.slice(location.href.lastIndexOf("/")) === "/singleProd.html"){
        let addToCartBtn = document.querySelector(".choosenProd .container .col:last-child .op");
        addToCartBtn.children[2].addEventListener("click", ()=>{
            cartArrOperations(1, new Product(JSON.parse(localStorage.getItem("product")).lnk, +addToCartBtn.children[1].value, 139.00));
            notify();
        })
    }   
}

function notify(){
    let notification = document.querySelector(".notify");
    notification.style.cssText = `display: flex;`;
    notification.children[1].addEventListener("click", ()=>{
        notification.style.cssText = `display: none;`;
    });
    setTimeout(()=>{
        notification.style.cssText = `display: none;`;
    }, 1000);
}

// this function adds product to cart array operation and removes product from cart array operation depend on value of op variable
function cartArrOperations(op, prod){
    if(op === 1){
        cart.push(prod);

        return whichIsDbl();
    } else{
        cart = cart.filter((e)=>{
            return e.img !== prod;
        });

        return cartLocalStorageUpdate();
    }
}

// this function merges all repeatitive added products and increase their quantities
function whichIsDbl(){
    cart.forEach((e1, i1)=>{
        cart.forEach((e2, i2)=>{
            if(e1.img === e2.img && i1 !== i2 && e1.q !== 0){
                e1.q += +e2.q;
                e1.subTotal = e1.q * e1.price;
                e2.q = 0;
            }
        });
    });
    cart = cart.filter((wantedEle)=>{
        return wantedEle.q !== 0;
    });

    return cartLocalStorageUpdate();
}

// this function keeps localStorage.cart up to date with cart array
function cartLocalStorageUpdate(){
    localStorage.setItem("cart", JSON.stringify(cart));
}

// this function calls two very important functions that put the data in cart.html page. to call this func, u should be in cart.html page and cart.length !== 0 , its condition in line 95.
function cartPage(){
    return table(), receipt();
}

// this function brings the data of each product in cart array and send it to the following function (trOfTable())
function table(){
    let table = document.querySelector(".cart table tbody");
    cart.forEach((e)=>{
        table.append(trOfTable(e));
    });
}

// this function makes the structure of every tr in the tbody of the table of the products in cart.html page
function trOfTable(e){
    let tr = document.createElement("tr"),
        td1 = document.createElement("td"),
        td2 = document.createElement("td"),
        td3 = document.createElement("td"),
        td4 = document.createElement("td"),
        td5 = document.createElement("td"),
        td6 = document.createElement("td");
    
    td1.innerHTML = `<i class="icon-close"></i>`;
    td2.innerHTML = `<img src="${e.img}" alt="product">`;
    td3.innerHTML = `Cartoon Astronaut T-Shirts`;
    td4.innerHTML = `$${e.price}`;
    td5.innerHTML = `<input type="text" value="${e.q}">`;
    td6.innerHTML = `$${e.subTotal}`;

    td1.addEventListener("click", ()=>{
        cartArrOperations(2, e.img);
        td1.parentElement.remove();
        receipt();
    }); 

    td5.addEventListener("change", ()=>{
        updateQuantity(e, +td5.children[0].value);
        td6.innerHTML = `$${e.subTotal}`;
        receipt();
    });
    tr.append(td1, td2, td3, td4, td5, td6)
    return tr;
}

// this function is related to change event of quantity input of tr and it updates quantity of product in cart array, therefore it updates subtotal of same product and call cartLocalStorageUpdate() function 
function updateQuantity(e, newQ){
    e.q = newQ;
    e.subTotal = e.price * e.q;

    return cartLocalStorageUpdate();
}

// this function calculates total price of products in cart array and puts it in the receipt in cart.html page
function receipt(){
    let cartSubTotalTag = document.querySelector(".sale .container .receipt table tr:first-child td:last-child"),
        totalTag = document.querySelector(".sale .container .receipt table tr:last-child td:last-child"),
        finalPrice = 0;
    cart.forEach((e)=>{
        finalPrice += e.subTotal;
    });

    cartSubTotalTag.innerHTML = `$${finalPrice}`;
    totalTag.innerHTML = `$${finalPrice}`;
}
// end




// start emil validation
let emailInputs = [ document.querySelector(".news .container form input:first-child"),
                    document.querySelector(".contact .container form input:nth-of-type(2)") ];

// submit event of submit button in both newsletters form and contact form, but submit event in contact form code should be shown in only contact.html page because of errors 
emailInputs.forEach((e, i)=>{
    if(i === 1 && location.href.slice(location.href.lastIndexOf("/")) === "/contact.html"){
        e.parentElement.addEventListener("submit", (eve)=>{
            eve.preventDefault();
            emailValidation(e, i);
        });
    } else if(i === 0){
        e.parentElement.addEventListener("submit", (eve)=>{
            eve.preventDefault();
            emailValidation(e, i);
        });
    }
    
});

// this function checks email input value 
function emailValidation(e, i){
    let rEx = /\w+@\w+.(com|net|org|edu)/ig;
    if( !( rEx.test(e.value) ) ){
        if( e.value !== "Input is Invalid" ){
            dataCorrection(e, e.value, e.type);
        }
    } else{
        if(i === 1){
            [...e.parentElement.children].forEach((e, index)=>{
                if(index !== 0 && index !== 1 && index !== 6){
                    e.value = "";
                    e.blur();
                }
            });
        } else{
            e.value = "";
            e.blur();
        }
    }
}

// this function to inform u that your email input value is invalid, and if u focus the input the invalid value will show
function dataCorrection(input, inputVal, inputType){
    input.value = "Input is Invalid";
    input.value.cssText = `color: #f00`;
    if(inputType === "password"){
        input.type = "text";
    }
    input.onfocus = () => {
        input.value = inputVal;
        input.type = inputType;
    };
};
// end
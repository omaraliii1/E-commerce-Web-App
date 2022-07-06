function sideNavEvents(){let t=document.querySelector("header .container .navbar > li:last-child");closeIcon=document.querySelector("header .container .navbar > li .pages > li:first-child"),(sideNav=document.querySelector("header .container .navbar > li .pages")).classList.contains("open")?sideNav.style.cssText="right: 0px;":sideNav.style.cssText=`right: ${-parseFloat(getComputedStyle(sideNav).width)+2*-parseFloat(getComputedStyle(sideNav).padding)}px`,t.addEventListener("click",()=>{sideNav.classList.add("open"),sideNavEvents()}),closeIcon.addEventListener("click",()=>{sideNav.classList.remove("open"),sideNavEvents()})}window.onload=()=>{let t=document.querySelector(".spinner");t.style.cssText="background-color: transparent;",[...t.children].forEach(t=>{t.style.cssText="background-color: transparent;"}),setTimeout(()=>{t.remove()},1e3)},sideNavEvents();let prods=[...document.querySelectorAll(".products > .container .product")];function prodEvent(){prods.forEach(t=>{t.onclick=()=>{localStorage.setItem("product",JSON.stringify({lnk:t.children[0].children[0].getAttribute("src")}))}})}function findOptsProdImg(t){let e=["img/products/f1.jpg","img/products/f2.jpg","img/products/f3.jpg","img/products/f4.jpg","img/products/f5.jpg","img/products/f6.jpg","img/products/f7.jpg","img/products/f8.jpg","img/products/n1.jpg","img/products/n2.jpg","img/products/n3.jpg","img/products/n4.jpg","img/products/n5.jpg","img/products/n6.jpg","img/products/n7.jpg","img/products/n8.jpg"],r=e.indexOf(t);return r<3?assignChoosenAndOptsProds(t,e[r+1],e[r+2],e[r+3]):assignChoosenAndOptsProds(t,e[r-1],e[r-2],e[r-3])}function assignChoosenAndOptsProds(t,e,r,n){let c=document.querySelector(".choosenProd > .container > .col:first-child > .choosenSpace > img"),o=document.querySelectorAll(".choosenProd > .container > .col:first-child > .optSpace > img");c.setAttribute("src",t),o[0].setAttribute("src",t),o[1].setAttribute("src",e),o[2].setAttribute("src",r),o[3].setAttribute("src",n),o.forEach(t=>{t.addEventListener("click",()=>{c.setAttribute("src",t.getAttribute("src")),localStorage.setItem("product",JSON.stringify({lnk:t.getAttribute("src")}))})})}prodEvent(),"/singleProd.html"===location.href.slice(location.href.lastIndexOf("/"))&&findOptsProdImg(JSON.parse(localStorage.getItem("product")).lnk);let cart=[];Boolean(localStorage.getItem("cart"))&&(cart=JSON.parse(localStorage.getItem("cart")));class Product{constructor(t,e,r){this.img=t,this.q=e,this.price=r,this.subTotal=e*r}}function cartEvent(){let t=prods.map(t=>t.children[1].children[1]);if(t.forEach((t,e)=>{t.addEventListener("click",()=>{"icon-check"!==t.children[1].classList.value&&(cartArrOperations(1,new Product(t.parentElement.previousElementSibling.children[0].getAttribute("src"),1,139)),notify()),t.innerHTML='<h4>$78</h4> <i class="icon-check"></i>',setTimeout(()=>{t.innerHTML='<h4>$78</h4> <i class="icon-shopping-cart"></i>'},1e3)})}),"/singleProd.html"===location.href.slice(location.href.lastIndexOf("/"))){let t=document.querySelector(".choosenProd .container .col:last-child .op");t.children[2].addEventListener("click",()=>{cartArrOperations(1,new Product(JSON.parse(localStorage.getItem("product")).lnk,+t.children[1].value,139)),notify()})}}function notify(){let t=document.querySelector(".notify");t.style.cssText="display: flex;",t.children[1].addEventListener("click",()=>{t.style.cssText="display: none;"}),setTimeout(()=>{t.style.cssText="display: none;"},1e3)}function cartArrOperations(t,e){return 1===t?(cart.push(e),whichIsDbl()):(cart=cart.filter(t=>t.img!==e),cartLocalStorageUpdate())}function whichIsDbl(){return cart.forEach((r,n)=>{cart.forEach((t,e)=>{r.img===t.img&&n!==e&&0!==r.q&&(r.q+=+t.q,r.subTotal=r.q*r.price,t.q=0)})}),cart=cart.filter(t=>0!==t.q),cartLocalStorageUpdate()}function cartLocalStorageUpdate(){localStorage.setItem("cart",JSON.stringify(cart))}function cartPage(){return table(),receipt()}function table(){let e=document.querySelector(".cart table tbody");cart.forEach(t=>{e.append(trOfTable(t))})}function trOfTable(t){let e=document.createElement("tr"),r=document.createElement("td"),n=document.createElement("td"),c=document.createElement("td"),o=document.createElement("td"),i=document.createElement("td"),a=document.createElement("td");return r.innerHTML='<i class="icon-close"></i>',n.innerHTML=`<img src="${t.img}" alt="product">`,c.innerHTML="Cartoon Astronaut T-Shirts",o.innerHTML="$"+t.price,i.innerHTML=`<input type="text" value="${t.q}">`,a.innerHTML="$"+t.subTotal,r.addEventListener("click",()=>{cartArrOperations(2,t.img),r.parentElement.remove(),receipt()}),i.addEventListener("change",()=>{updateQuantity(t,+i.children[0].value),a.innerHTML="$"+t.subTotal,receipt()}),e.append(r,n,c,o,i,a),e}function updateQuantity(t,e){return t.q=e,t.subTotal=t.price*t.q,cartLocalStorageUpdate()}function receipt(){let t=document.querySelector(".sale .container .receipt table tr:first-child td:last-child"),e=document.querySelector(".sale .container .receipt table tr:last-child td:last-child"),r=0;cart.forEach(t=>{r+=t.subTotal}),t.innerHTML="$"+r,e.innerHTML="$"+r}cartEvent(),"/cart.html"===location.href.slice(location.href.lastIndexOf("/"))&&cart.length&&cartPage();let emailInputs=[document.querySelector(".news .container form input:first-child"),document.querySelector(".contact .container form input:nth-of-type(2)")];function emailValidation(t,e){/\w+@\w+.(com|net|org|edu)/gi.test(t.value)?1===e?[...t.parentElement.children].forEach((t,e)=>{0!==e&&1!==e&&6!==e&&(t.value="",t.blur())}):(t.value="",t.blur()):"Input is Invalid"!==t.value&&dataCorrection(t,t.value,t.type)}function dataCorrection(t,e,r){t.value="Input is Invalid",t.value.cssText="color: #f00","password"===r&&(t.type="text"),t.onfocus=()=>{t.value=e,t.type=r}}emailInputs.forEach((e,r)=>{1===r&&"/contact.html"===location.href.slice(location.href.lastIndexOf("/"))?e.parentElement.addEventListener("submit",t=>{t.preventDefault(),emailValidation(e,r)}):0===r&&e.parentElement.addEventListener("submit",t=>{t.preventDefault(),emailValidation(e,r)})});
//# sourceMappingURL=maps/all.js.map

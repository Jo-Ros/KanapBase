console.log('hello');
const itemContainer = document.querySelector('.item');
const pageTitle = document.querySelector('title');
const currentProductId = location.search.substring(4);
const productUrl = `http://localhost:3000/api/products/${currentProductId}`;
console.log(currentProductId);

// fetch(`http://localhost:3000/api/products/${currentProductId}`)
//     .then((res) => res.json())
//     .then((data) => {
//         // productData = data;
//         console.log(data)
//         pageTitle.innerText = `${data.name}`
//         const productInfos = document.createElement('article');
//         productInfos.innerHTML = `
//             <div class="item__img">
//             <img src="${data.imageUrl}" alt="${data.altTxt}">
//             </div>
//             <div class="item__content">

//             <div class="item__content__titlePrice">
//                 <h1 id="title">${data.name}</h1>
//                 <p>Prix : <span id="price">${data.price}</span>€</p>
//             </div>

//             <div class="item__content__description">
//                 <p class="item__content__description__title">Description :</p>
//                 <p id="description">${data.description}</p>
//             </div>

//             <div class="item__content__settings">
//                 <div class="item__content__settings__color">
//                 <label for="color-select">Choisir une couleur :</label>
//                 <select name="color-select" id="colors">
//                     ${data.colors.map(
//                         (color) => "<option value=" + color + ">" + color + "</option>"
//                     )}
//                 </select>
//                 </div>

//                 <div class="item__content__settings__quantity">
//                 <label for="itemQuantity">Nombre d'article(s) (1-100) :</label>
//                 <input type="number" name="itemQuantity" min="1" max="100" value="1" id="quantity">
//                 </div>
//             </div>

//             <div class="item__content__addButton">
//                 <button id="addToCart">Ajouter au panier</button>
//             </div>

//             </div>`;
            
//             itemContainer.appendChild(productInfos);

//             //=========================================================

//             const addToCartBtn = document.querySelector('#addToCart');
//             const colors = document.querySelector('#colors');
//             const quantity = document.querySelector('#quantity');

//             addToCartBtn.addEventListener('click', (e) => {
//                 e.preventDefault();
//                 let chosenColor = colors.value;
//                 console.log(chosenColor);
//                 let quantityAdded = quantity.value;
//                 console.log(quantityAdded);

//                 let chosenProduct = {
//                     name: `${data.name}`,
//                     id: `${currentProductId}`,
//                     color: chosenColor,
//                     quantity: quantityAdded
//                 }

//                 //=========================================================

//                 let productsInCart =  JSON.parse(localStorage.getItem("products"));
//                 console.log(productsInCart);

//                 if(productsInCart) {
//                     productsInCart.push(chosenProduct);
//                     localStorage.setItem("products", JSON.stringify(productsInCart));
//                 } else {
//                     productsInCart = [];
//                     productsInCart.push(chosenProduct);
//                     localStorage.setItem("products", JSON.stringify(productsInCart));

//                     console.log(productsInCart);
//                 }
//             })


//     }) .catch((err) => alert(err))


apiCall(productUrl);
function apiCall(url) {
    fetch(url)
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        showProduct(data)
        chooseItem(data)
    })
    .catch((err) => alert(err))
}

function showProduct(data) {
        pageTitle.innerText = `${data.name}`
        const productInfos = document.createElement('article');
        productInfos.innerHTML = `
            <div class="item__img">
            <img src="${data.imageUrl}" alt="${data.altTxt}">
            </div>
            <div class="item__content">

            <div class="item__content__titlePrice">
                <h1 id="title">${data.name}</h1>
                <p>Prix : <span id="price">${data.price}</span>€</p>
            </div>

            <div class="item__content__description">
                <p class="item__content__description__title">Description :</p>
                <p id="description">${data.description}</p>
            </div>

            <div class="item__content__settings">
                <div class="item__content__settings__color">
                <label for="color-select">Choisir une couleur :</label>
                <select name="color-select" id="colors">
                    ${data.colors.map(
                        (color) => "<option value=" + color + ">" + color + "</option>"
                    )}
                </select>
                </div>

                <div class="item__content__settings__quantity">
                <label for="itemQuantity">Nombre d'article(s) (1-100) :</label>
                <input type="number" name="itemQuantity" min="1" max="100" value="1" id="quantity">
                </div>
            </div>

            <div class="item__content__addButton">
                <button id="addToCart">Ajouter au panier</button>
            </div>

            </div>`;
            
            itemContainer.appendChild(productInfos);
}

function chooseItem(data) {
    const addToCartBtn = document.querySelector('#addToCart');
    const colors = document.querySelector('#colors');
    const quantity = document.querySelector('#quantity');

    addToCartBtn.addEventListener('click', (e) => {
        e.preventDefault();
        let chosenColor = colors.value;
        console.log(chosenColor);
        let quantityAdded = quantity.value;
        console.log(quantityAdded);

        let chosenProduct = {
            name: `${data.name}`,
            id: `${currentProductId}`,
            color: chosenColor,
            quantity: quantityAdded
        }
        setInCart(chosenProduct);
    })
}

function setInCart(chosenProduct) {
    let productsInCart =  JSON.parse(localStorage.getItem("products"));
    console.log(productsInCart);

    if(productsInCart) {
        productsInCart.push(chosenProduct);
        localStorage.setItem("products", JSON.stringify(productsInCart));
    } else {
        productsInCart = [];
        productsInCart.push(chosenProduct);
        localStorage.setItem("products", JSON.stringify(productsInCart));

        console.log(productsInCart);
    }
}

// const dataProduct = {color, quantity};
// const postOptions = {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(dataProduct)
// }

// fetch('/api', postOptions);
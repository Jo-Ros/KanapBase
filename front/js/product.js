console.log('hello');
const itemContainer = document.querySelector('.item');
let currentId = location.search.substring(4);
console.log(currentId);

fetch(`http://localhost:3000/api/products/${currentId}`)
    .then((res) => res.json())
    .then((data) => {
        // productData = data;
        console.log(data)
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
                    <option value=""> Select a color</option>
                    ${data.colors.map(
                        (color) => "<option value=" + color + ">" + color + "</option>"
                    )}
                </select>
                </div>

                <div class="item__content__settings__quantity">
                <label for="itemQuantity">Nombre d'article(s) (1-100) :</label>
                <input type="number" name="itemQuantity" min="1" max="100" value="0" id="quantity">
                </div>
            </div>

            <div class="item__content__addButton">
                <button id="addToCart">Ajouter au panier</button>
            </div>

            </div>`;

            itemContainer.appendChild(productInfos);
    }) .catch((err) => alert(err))
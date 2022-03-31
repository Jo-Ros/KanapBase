console.log('hello');
let productsInCart =  JSON.parse(localStorage.getItem("products"));
const itemsContainer = document.querySelector('#cart__items');
    console.log(productsInCart);

productsInCart.forEach(object => {
    console.log(object);
    currentId = object.id;
    fetch(`http://localhost:3000/api/products/${currentId}`)
    .then((res) => res.json())
    .then((data) => {
        console.log(data)
        itemPrice = data.price;
        console.log(itemPrice);
        totalItemPrice = itemPrice * object.quantity;
        console.log("Valeur totale = " + totalItemPrice + " id= " + object.id);

        let productRow = document.createElement('article');
        productRow.classList.add('cart__item');
        productRow.innerHTML = `
                <div class="cart__item__img">
                  <img src="${data.imageUrl}" alt="${data.altTxt}">
                </div>
                
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${data.name}</h2>
                    <p>${object.color}</p>
                    <p>Prix total: ${totalItemPrice} €</p>
                </div>
                  
                <div class="cart__item__content__settings">
                    
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${object.quantity}">
                    </div>
                    
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>`;

        itemsContainer.appendChild(productRow);


    }).catch((err) => alert(err))
})
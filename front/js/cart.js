console.log('hello');
let productsInCart =  JSON.parse(localStorage.getItem("products"));
const itemsContainer = document.querySelector('#cart__items');
const title = document.querySelector('h1');
const cartTotalPrice = document.querySelector('.cart__price');
const form = document.querySelector('.cart__order__form');

// ==============================================================
if(productsInCart) {
  productsInCart.forEach(object => {
    fetch(`http://localhost:3000/api/products/${object.id}`)
    .then((res) => res.json())
    .then((data) => {
        showProductRow(data, object)
    })
    .catch((err) => alert(err))
  })
} else {
    title.innerText = 'Votre panier est vide';
    cartTotalPrice.style.display = 'none';
    form.style.display = 'none';
}
console.log(productsInCart);
// ===============================================================
function showProductRow(data, object) {
    let itemPrice = data.price;
    let totalItemPrice = itemPrice * object.quantity;

    let productRow = document.createElement('article');
    productRow.classList.add('cart__item');
    productRow.setAttribute('data-id', `${object.id}`);
    productRow.setAttribute('data-color', `${object.color}`);

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
                  <input type="number" class="itemQuantity" name="itemQuantity" min="1" 
                    max="100" value="${object.quantity}">
                </div>
                            
                <div class="cart__item__content__settings__delete">
                  <p class="deleteItem" data-id="${object.id}" data-color="${object.color}">Supprimer</p>
                </div>

            </div>
          </div>`;

    itemsContainer.appendChild(productRow);
    deleteItem(object);
}

// ===============================================================

function deleteItem (object) {
  const deleteItem = document.querySelectorAll('.deleteItem');
    deleteItem.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopImmediatePropagation();
        
        for(i = 0; i < productsInCart.length; i++) {
          if(productsInCart[i].id === object.id && productsInCart[i].color === object.color) {
            productsInCart.splice(i, 1);
            localStorage.setItem("products", JSON.stringify(productsInCart));
            break;
          }
        }
        localStorage.setItem("products", JSON.stringify(productsInCart));
        window.location.reload();
      })
    })
}
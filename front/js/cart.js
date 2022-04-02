console.log('hello');
let productsInCart =  JSON.parse(localStorage.getItem("products"));
const itemsContainer = document.querySelector('#cart__items');

productsInCart.forEach(object => {
    fetch(`http://localhost:3000/api/products/${object.id}`)
    .then((res) => res.json())
    .then((data) => {
        showProductRow(data, object)
    })
    .catch((err) => alert(err))
})

function showProductRow(data, object) {
  itemPrice = data.price;
  totalItemPrice = itemPrice * object.quantity;

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
              <input type="number" class="itemQuantity" name="itemQuantity" min="1" 
                max="100" value="${object.quantity}">
            </div>
                        
            <div class="cart__item__content__settings__delete">
              <p class="deleteItem">Supprimer</p>
            </div>

        </div>
      </div>`;

      itemsContainer.appendChild(productRow);
}
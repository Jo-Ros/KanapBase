console.log('hello');
let productsInCart =  JSON.parse(localStorage.getItem("products"));

const itemsContainer = document.querySelector('#cart__items');
const title = document.querySelector('h1');
const cartTotalPrice = document.querySelector('#totalPrice');
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
    dynamicQuantity(object);
    computeTotalPrice(totalItemPrice);
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
          }
        }

        localStorage.setItem("products", JSON.stringify(productsInCart));
        window.location.reload();
      })
    })
}

// ===============================================================
function dynamicQuantity(object) {
  const changeQuantity = document.querySelectorAll('.itemQuantity');
  
  changeQuantity.forEach((btn) => {
   
    btn.addEventListener('change', (e) => {
      e.stopImmediatePropagation();
      
      for(i = 0; i < productsInCart.length; i++) {
        if(productsInCart[i].id === object.id && productsInCart[i].color === object.color) {
          
          productsInCart[i].quantity = e.target.value;
          localStorage.setItem("products", JSON.stringify(productsInCart));
          window.location.reload();
        }
      }
    })   
  })
}

// ===============================================================
let priceArray = [];

function computeTotalPrice(totalItemPrice) {

  for(i = 0; i < productsInCart.length; i++) {
    priceArray.push(totalItemPrice);
    break;
  }

  const totalPrice = priceArray.reduce((sum, value) => {
    return sum += value;
  }, 0);

  cartTotalPrice.innerText = totalPrice;
}

// ====================  <CHANTIER :p> =========================================
const submitOrder = document.querySelector('#order');

class Form {
  constructor(firstName, lastName, address, city, email) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.address = address;
    this.city = city;
    this.email = email;
  }
}

// Post object and array API
// change from click to submit when regex is ready
submitOrder.addEventListener('click', (e) => {
  e.preventDefault();
  
  let newOrder = new Form(
    document.querySelector('#firstName').value,
    document.querySelector('#lastName').value,
    document.querySelector('#address').value,
    document.querySelector('#city').value,
    document.querySelector('#email').value
  );
  
  console.log(newOrder);
  console.log(productsInCart);

  //==============================================
  // const options = {
  //   method: 'POST',
  //   headers: {
  //     'Accept': 'application/json',
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify(newOrder)
  // };
  // fetch('http://localhost:3000/api/products/order', options);
  //('/options') ??

  //===============================================

  fetch("http://localhost:3000/api/products/order", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newOrder)
  });

})
// ==============================================================
const productsInCart =  JSON.parse(localStorage.getItem("products"));

const itemsContainer = document.querySelector('#cart__items');
const title = document.querySelector('h1');
const cartTotalPrice = document.querySelector('#totalPrice');
const cartTotalDiv = document.querySelector('.cart__price');
const form = document.querySelector('.cart__order__form');

// ==============================================================
if(productsInCart) {
  productsInCart.forEach(object => {
    fetch(`http://localhost:3000/api/products/${object.id}`)
        .then((res) => res.json())
        .then((data) => showProductRow(data, object))
        .then((object) => deleteProductOnClickEvent (object))
        .then((object) => changeProductQuantityOnChangeEvent(object))
        .catch((err) => alert(err))
  })
} else {
        title.innerText = 'Votre panier est vide';
        cartTotalPrice.style.display = 'none';
        form.style.display = 'none';
        cartTotalDiv.style.display = 'none';
}

// ===============================================================
function showProductRow(data, object) {
    const totalItemPrice = data.price * object.quantity;

    const productRow = document.createElement('article');
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
    
    computeTotalCartPrice(totalItemPrice);
    return object;
}

// ===============================================================

function deleteProductOnClickEvent (object) {
  const deleteItem = document.querySelectorAll('.deleteItem');
    
    deleteItem.forEach((btn) => {
        //console.log(btn); == Problem is here
      
        btn.addEventListener('click', (e) => {
        e.stopImmediatePropagation();
        
        for(const [i, v] of productsInCart.entries()) {
          if(v.id === object.id && v.color === object.color) {
            
            productsInCart.splice(i, 1);
            localStorage.setItem("products", JSON.stringify(productsInCart));
            location.reload();
          }
        }

        // == Reset Local Storage if empty ==
        if(productsInCart === null || productsInCart.length === 0){
            localStorage.clear();
            window.location.reload();
        }
      })
    })

    return object;
}

// ===============================================================
function changeProductQuantityOnChangeEvent(object) {
  const changeQuantity = document.querySelectorAll('.itemQuantity');
  
  changeQuantity.forEach((btn) => {
   
    btn.addEventListener('change', (e) => {
      e.stopImmediatePropagation();
      
      //for (const [index, value] of myArray) {}
      for(const [i, v] of productsInCart.entries()) {
        if(v.id === object.id && v.color === object.color) {
          
          productsInCart[i].quantity = e.target.value;
          localStorage.setItem("products", JSON.stringify(productsInCart));
          window.location.reload();
        }
      }
    })   
  })
  return object;
}

// ===============================================================
let priceArray = [];

function computeTotalCartPrice(totalItemPrice) {

  priceArray.push(totalItemPrice);

  console.log(priceArray);
  console.log(productsInCart.length);

  const totalPrice = priceArray.reduce((sum, value) => {
    return sum += value;
  }, 0);

  cartTotalPrice.innerText = totalPrice;
}

// =============================================================
const submitOrder = document.querySelector('#order');
const nameRegex = /^[a-zA-Z\-çñàéèêëïîôüù]{2,}$/;
const addressRegex = /^[0-9a-zA-Z\s,.'-çñàéèêëïîôüù]{3,}$/;
const emailRegex = /^[A-Za-z0-9\-\.]+@([A-Za-z0-9\-]+\.)+[A-Za-z0-9-]{2,4}$/;

const firstName = document.querySelector('#firstName').value;
const lastName = document.querySelector('#lastName').value;
const address = document.querySelector('#address').value;
const city = document.querySelector('#city').value;
const email = document.querySelector('#email').value;



// Post object and array API
// change from click to submit when regex is ready
submitOrder.addEventListener('click', (e) => {
  e.preventDefault();

  const newOrder = {
    contact: {
      firstName,
      lastName,
      address,
      city,
      email
    },
    products: productsInCart
  }

  console.log(newOrder);

  fetch("http://localhost:3000/api/products/order", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newOrder)
  })
    // .then((res) => {return res.json()})
    // .then((confirm) => {
    //         window.location.href = "./confirmation.html?orderId=" + confirm.orderId;
    //         localStorage.clear();
    // })
    // .catch((err) => console.log(err))

})

// =============================================================

// console.log('hello');
// let productsInCart =  JSON.parse(localStorage.getItem("products"));

// const itemsContainer = document.querySelector('#cart__items');
// const title = document.querySelector('h1');
// const cartTotalPrice = document.querySelector('#totalPrice');
// const form = document.querySelector('.cart__order__form');

//==============================================================
// let productsInCart =  JSON.parse(localStorage.getItem("products"));

// if(productsInCart) {
//     productsInCart.forEach(object => {
//         fetch(`http://localhost:3000/api/products/${object.id}`)
//             .then((res) => res.json())
//             .then((data) => showProductRow(data, object))           
//             .then(({ data, object } ) => computeTotalPrice(data, object))
//             .then((object) => attachDeleteEventToDeleteButton(object))
//             .then((object) => dynamicQuantity(object))
//             .catch((err) => alert(err))
//     })
// } else {
//     title.innerText = 'Votre panier est vide';
//     cartTotalPrice.style.display = 'none';
//     form.style.display = 'none';
// }

// // ===============================================================
// function showProductRow(data, object) {
//     let itemPrice = data.price;
//     let totalItemPrice = itemPrice * object.quantity;

//     let productRow = document.createElement('article');
//     productRow.classList.add('cart__item');
//     productRow.setAttribute('data-id', `${object.id}`);
//     productRow.setAttribute('data-color', `${object.color}`);

//     productRow.innerHTML = `
//           <div class="cart__item__img">
//             <img src="${data.imageUrl}" alt="${data.altTxt}">
//           </div>
                      
//           <div class="cart__item__content">
//             <div class="cart__item__content__description">
//               <h2>${data.name}</h2>
//               <p>${object.color}</p>
//               <p>Prix total: ${totalItemPrice} €</p>
//             </div>
                        
//             <div class="cart__item__content__settings">
                            
//                 <div class="cart__item__content__settings__quantity">
//                   <p>Qté : </p>
//                   <input type="number" class="itemQuantity" name="itemQuantity" min="1" 
//                     max="100" value="${object.quantity}">
//                 </div>
                            
//                 <div class="cart__item__content__settings__delete">
//                   <p class="deleteItem" data-id="${object.id}" data-color="${object.color}">Supprimer</p>
//                 </div>

//             </div>
//           </div>`;

//     itemsContainer.appendChild(productRow);

//     return { data, object };
// }

// // ===============================================================

// function attachDeleteEventToDeleteButton (object) {
//     const deleteItem = document.querySelectorAll('.deleteItem');

//     deleteItem.forEach((btn) => {

//         btn.addEventListener('click', (e) => {
//             e.stopImmediatePropagation();

//             for(let i = 0; i < productsInCart.length; i++) {
//                 if(productsInCart[i].id === object.id && productsInCart[i].color === object.color) {

//                     productsInCart.splice(i, 1);
//                     localStorage.setItem("products", JSON.stringify(productsInCart));
//                 }
//             }

//             localStorage.setItem("products", JSON.stringify(productsInCart));
//             window.location.reload();
//         })
//     })
//     return object;
// }

// //const hasSameIdAndColor = productsInCart[i].id === object.id && productsInCart[i].color === object.color;

// // ===============================================================
// function dynamicQuantity(object) {
//     const changeQuantity = document.querySelectorAll('.itemQuantity');

//     changeQuantity.forEach((btn) => {

//         btn.addEventListener('change', (e) => {
//             e.stopImmediatePropagation();

//             for(let i = 0; i < productsInCart.length; i++) {
//                 if(productsInCart[i].id === object.id && productsInCart[i].color === object.color) {

//                     productsInCart[i].quantity = e.target.value;
//                     localStorage.setItem("products", JSON.stringify(productsInCart));
//                     window.location.reload();
//                 }
//             }
//         })
//     })

//     return object;
// }

// // ===============================================================
// let priceArray = [];

// function computeTotalPrice(data, object) {
//     let itemPrice = data.price;
//     let totalItemPrice = itemPrice * object.quantity;

//     priceArray.push(totalItemPrice);
//     const totalPrice = priceArray.reduce((sum, value) => {
//         return sum += value;
//     }, 0);

//     cartTotalPrice.innerText = totalPrice;
//     return object;
// }


// // =============================================================
// const submitOrder = document.querySelector('#order');

// // Post object and array API
// // change from click to submit when regex is ready
// submitOrder.addEventListener('click', (e) => {
//   e.preventDefault();
  
//   const firstName = document.querySelector('#firstName').value;
//   const lastName = document.querySelector('#lastName').value;
//   const address = document.querySelector('#address').value;
//   const city = document.querySelector('#city').value;
//   const email = document.querySelector('#email').value;

//   const newOrder = {
//     contact: {
//       firstName,
//       lastName,
//       address,
//       city,
//       email
//     },
//     products: productsInCart
//   }

//   console.log(newOrder);

//   fetch("http://localhost:3000/api/products/order", {
//       method: 'POST',
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(newOrder)
//   })

// })
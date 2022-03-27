console.log('hello');
const items = document.querySelector(".items");


// ===================================
fetch("http://localhost:3000/api/products")
    .then((res) => res.json()
    .then((data) => {

        data.forEach(product => {
            
            const {altTxt, description, imageUrl, name, _id} = product;
            let productUrl = `./product.html?id=${_id}`;
            console.log(productUrl);
            const productElement = document.createElement('div');
            productElement.classList.add("item");
            productElement.innerHTML = `
                <a href="${productUrl}">
                    <article>
                        <img src="${imageUrl}" alt="${altTxt}">
                        <h3 class="productName">${name}</h3>
                        <p class="productDescription">${description}</p>
                    </article>
                </a>`;
    
            items.appendChild(productElement);
        })
    })
    )
    .catch((err) => alert(err));

// ===================================

// data.forEach(product => {
            
//     const {altTxt, description, imageUrl, name} = product;
//     let productUrl = `./product.html?id=${}`;
//     const productElement = document.createElement('div');
//     productElement.classList.add("item");
//     productElement.innerHTML = `
//         <a href="product.html">
//             <article>
//                 <img src="${imageUrl}" alt="${altTxt}">
//                 <h3 class="productName">${name}</h3>
//                 <p class="productDescription">${description}</p>
//             </article>
//         </a>`;

//     items.appendChild(productElement);
// })

// _id, altTxt, description, imageUrl, name, colors, price




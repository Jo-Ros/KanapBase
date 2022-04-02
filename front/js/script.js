console.log('hello');
const itemsContainer = document.querySelector(".items");
const API_URL = `http://localhost:3000/api/products`;

// ===================================
apiCall(API_URL);

function apiCall(url) {
    fetch(url)
    .then((res) => res.json())
    .then((data) => {
        showProducts(data)
    })
    .catch((err) => alert(err))
}

function showProducts(data) {
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
    
        itemsContainer.appendChild(productElement);
    })
}
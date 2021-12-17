const divAdmin = document.getElementById("divAdmin");
const btnToggleAdmin = document.getElementById("btnToggleAdmin");
const productContainer = document.getElementById("productContainer");

window.onload = function() {
    showAdmin();
    getProducts();
};

const showAdmin = ()=>{
    const admin = localStorage.getItem(adminSession) || 'false';

    divAdmin.classList.remove("d-none", "d-block")
    if(admin === 'true'){
        divAdmin.classList.add("d-block")
    }else{
        divAdmin.classList.add("d-none")
    }
}

btnToggleAdmin.addEventListener("click", (e)=>{
    localStorage.setItem(adminSession, e.target.checked);
    showAdmin();
});

const getProducts = async()=>{
    try {
        const products = await ajax('products');
        renderProducts(products)
    } catch (error) {
        console.log(error)
    }
}

const renderProducts = (products)=>{
    productContainer.innerHTML = "";
    let items = '';

    products.forEach(product => {
        items += `
        <div class="col">
              <div class="card h-100">
                <img src="..." class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${product.name}</h5>
                  <p class="card-text">${product.description}</p>
                </div>
                <div class="card-footer">
                  <small class="text-muted">Last updated 3 mins ago</small>
                </div>
              </div>
            </div>
        `;

        productContainer.innerHTML = items;
    });
}
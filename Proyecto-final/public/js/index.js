const divAdmin = document.getElementById("divAdmin");
const btnToggleAdmin = document.getElementById("btnToggleAdmin");
const productContainer = document.getElementById("productContainer");
const btnOpenCartModal = document.getElementById("btnOpenCartModal");
const alertNoProductsCart = document.getElementById("alertNoProductsCart");
const tableCart = document.getElementById("tableCart");
const tableCartBody = document.querySelector("#tableCart tbody");
const btnDeleteCart = document.getElementById("btnDeleteCart");
const btnCloseModalCart = document.getElementById("btnCloseModalCart");

window.onload = function() {
    showAdmin();
    getProducts();
};

const showAdmin = ()=>{
    const admin = localStorage.getItem(adminSession) || 'false';

    divAdmin.classList.remove("d-none", "d-block")
    if(admin === 'true'){
        btnToggleAdmin.checked = true;
        divAdmin.classList.add("d-block")
    }else{
        btnToggleAdmin.checked = false;
        divAdmin.classList.add("d-none")
    }
}

const showAlertNoProductsCart = (show)=>{
    alertNoProductsCart.classList.remove("d-none", "d-block")
    btnDeleteCart.classList.remove("d-none", "d-block")
    if(show){
        alertNoProductsCart.classList.add("d-block")
        btnDeleteCart.classList.add("d-none")
    }else{
        alertNoProductsCart.classList.add("d-none")
        btnDeleteCart.classList.add("d-block")
    }
}

const showTableCart = (show)=>{
    tableCart.classList.remove("d-none", "d-block")
    if(show){
        tableCart.classList.add("d-block")
    }else{
        tableCart.classList.add("d-none")
    }
}

btnToggleAdmin.addEventListener("click", (e)=>{
    localStorage.setItem(adminSession, e.target.checked);
    showAdmin();
});

btnOpenCartModal.addEventListener("click", async (e)=>{
    try {
        const idCart = localStorage.getItem(cartSession) || "";
        
        let productsCart = [];
        if(idCart !== ""){
            productsCart = await ajax(`cart/${idCart}/products`);
        }
        
        if(productsCart.length ===0){
            showAlertNoProductsCart(true);
            showTableCart(false);
        }else{
            showAlertNoProductsCart(false);
            showTableCart(true);
            
            if(productsCart){
                renderCartProducts(productsCart);
            }
        }
    } catch (error) {   
        console.error(error);
    }
});

btnDeleteCart.addEventListener("click", async (e)=>{
    try {
        if(!confirm("¿Desea eliminar el carro de la compra?")) return;
        const idCart = localStorage.getItem(cartSession) || null;

        const cartDeleted = await ajax(`cart/${idCart}`, {}, 'DELETE');
        if(cartDeleted){
            btnCloseModalCart.click();
            alert("Carro de la compra eliminado.");
            localStorage.removeItem(cartSession);
        }
    } catch (error) {
        console.error(error)
    }
})

document.body.addEventListener( 'click', async function ( event ) {
    if( event.target.classList.contains("dbtnAddToCart")) {
        event.preventDefault()

        try {
            const idProduct = event.target.dataset.id;      
            const idCart = localStorage.getItem(cartSession) || null;
            if(idCart == null){
                const newIdCart = await ajax('cart', {}, 'POST');
                if(newIdCart){
                    localStorage.setItem(cartSession, newIdCart);
                    const cartProduct = await ajax(`cart/${newIdCart}/products`, {
                        idProduct
                    }, 'POST')

                    if(cartProduct){
                        alert("Producto agregado al carrito");
                    }
                }
            }else{
                const cartProduct = await ajax(`cart/${idCart}/products`, {
                    idProduct
                }, 'POST')

                if(cartProduct){
                    alert("Producto agregado al carrito");
                }
            }
        } catch (error) {
            console.error(error)
        }
    };

    if(event.target.classList.contains("dbtnDeleteProductOfCart")){
        try {
            if(!confirm("¿Desea eliminar el producto?")) return;
            
            const idProduct = event.target.dataset.id;      
            const idCart = localStorage.getItem(cartSession) || null;
            const cartDeleted = await ajax(`cart/${idCart}/products/${idProduct}`, {}, 'DELETE');
            if(cartDeleted){
                alert("Producto eliminado del carro de la compra.");
                const cartProducts = await ajax(`cart/${idCart}/products`);
                if(cartProducts.length ===0){
                    showAlertNoProductsCart(true);
                    showTableCart(false);
                }else{
                    showAlertNoProductsCart(false);
                    showTableCart(true);
                    
                    if(cartProducts){
                        renderCartProducts(cartProducts);
                    }
                }
            }
        } catch (error) {
            console.error(error)
        }
    }
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
                <img src="${product.image}" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${product.code} ${product.name}</h5>
                  <p class="card-text">${product.description}</p>
                  <p class="card-text">Precio: ${product.price}</p>
                </div>
                <div class="card-footer">
                  <a href='#' data-id='${product.id}' class='dbtnAddToCart'>Añadir al carrito</a>
                </div>
              </div>
            </div>
        `;

        productContainer.innerHTML = items;
    });
}

const renderCartProducts = (products)=>{
    tableCartBody.innerHTML = "";
    let items = '';

    products.forEach(product => {
        items += `
        <tr class='cursor productToEdit' data-id='${product.id}'>
            <td>${product.code}</td> 
            <td>${product.name}</td> 
            <td>${product.price}</td> 
            <td><img src='${product.image}' class='image'/></td> 
            <td><button type='button' class='btn btn-danger dbtnDeleteProductOfCart' data-id='${product.id}'>X</button></td>
        </tr>
        `;

        tableCartBody.innerHTML = items;
    });
}
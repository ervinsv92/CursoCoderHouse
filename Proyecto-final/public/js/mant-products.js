const divAdmin = document.getElementById("divAdmin");
const btnToggleAdmin = document.getElementById("btnToggleAdmin");

const txtCode = document.getElementById("txtCode");
const txtName = document.getElementById("txtName");
const txtDescription = document.getElementById("txtDescription");
const txtPrice = document.getElementById("txtPrice");
const txtStock = document.getElementById("txtStock");
const txtUrlImage = document.getElementById("txtUrlImage");
const btnSave = document.getElementById("btnSave");
const btnDelete = document.getElementById("btnDelete");
const btnCancel = document.getElementById("btnCancel");

const bodyTableProducts = document.querySelector("#tableProducts tbody");

let _idProduct = '';

window.onload = function() {
    showAdmin();
    getProducts();
};

btnToggleAdmin.addEventListener("click", (e)=>{
    localStorage.setItem(adminSession, e.target.checked);
    showAdmin();
});

btnSave.addEventListener("click", async (e)=>{
    let product = {};
    product.name = txtName.value;
    product.code = txtCode.value;
    product.description = txtDescription.value;
    product.price = txtPrice.value;
    product.stock = txtStock.value;
    product.image = txtUrlImage.value;

    if(_idProduct===''){//Insert
        try {
            const saved = await ajax('products', product, 'POST');
            if(saved){
                limpiarForm();
                alert("Producto creado.")
                getProducts();
            }
        } catch (error) {
            console.error(error)
            alert("Ups, pasó un error")
        }
    }else{//Update
        try {
            const saved = await ajax(`products/${_idProduct}`, product, 'PUT');
            if(saved){
                limpiarForm();
                alert("Producto actualizado.")
                getProducts();
            }
        } catch (error) {
            console.error(error)
            alert("Ups, pasó un error")
        }
    }
});

btnDelete.addEventListener("click", async (e)=>{
    if(_idProduct === ""){
        alert("Debe seleccionar un producto para eliminar");
        return;
    }

    if(!confirm("¿Seguro que desea eliminar el producto?")){
        return;
    }

    try {
        const deleted = await ajax(`products/${_idProduct}`, {}, 'DELETE');
        if(deleted){
            getProducts();
            limpiarForm()
        }else{
            alert("Ups, algo pasó.")
        }
    } catch (error) {
        console.error(error);
    }
});

btnCancel.addEventListener("click", (e)=>{
    limpiarForm();
});

document.body.addEventListener( 'click', function ( event ) {
    if( event.target.parentElement.classList.contains("productToEdit")) {
        try {
            const id = event.target.parentElement.dataset.id;   
            getProductById(id);
            markSelectedproduct(id);
        } catch (error) {
            console.error(error)
        }
    };
});

const markSelectedproduct = (id)=>{
    desmarkSelectedProduct();
    const tr = document.querySelector(`#tableProducts tbody [data-id='${id}']`);
    tr.classList.add("selected")
}

const desmarkSelectedProduct = ()=>{
    const trs = document.querySelectorAll("#tableProducts tbody tr");
    trs.forEach(function(tr){
        tr.classList.remove("selected")
    })
}

const showAdmin = ()=>{
    const admin = localStorage.getItem(adminSession) || 'false';

    divAdmin.classList.remove("d-none", "d-block")
    if(admin === 'true'){
        divAdmin.classList.add("d-block")
    }else{
        divAdmin.classList.add("d-none")
    }
}

const limpiarForm = ()=>{
    _idProduct = "";
    txtName.value = "";
    txtDescription.value = "";
    txtCode.value = "";
    txtPrice.value = "";
    txtStock.value = "";
    txtUrlImage.value = "";
    desmarkSelectedProduct();
}

const getProducts = async()=>{
    try {
        const products = await ajax('products');
        renderProducts(products)
    } catch (error) {
        console.log(error)
    }
}

const getProductById = async (id)=>{
    try {
        const product = await ajax(`products/${id}`);
        _idProduct = product.id;
        txtName.value = product.name;
        txtDescription.value = product.description;
        txtCode.value = product.code;
        txtPrice.value = product.price;
        txtStock.value = product.stock;
        txtUrlImage.value = product.image;
    } catch (error) {
        console.error(error)
        alert("Ups, algo pasó.")
    }
}

const renderProducts = (products)=>{
    bodyTableProducts.innerHTML = "";
    let items = '';

    products.forEach(product => {
        items += `
        <tr class='cursor productToEdit' data-id='${product.id}'>
            <td>${product.code}</td> 
            <td>${product.name}</td> 
            <td>${product.price}</td> 
            <td>${product.stock}</td> 
            <td><img src='${product.image}' class='image'/></td> 
        </tr>
        `;

        bodyTableProducts.innerHTML = items;
    });
}
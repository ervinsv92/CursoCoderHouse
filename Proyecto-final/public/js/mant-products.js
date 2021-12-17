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

let _idProduct = '';

window.onload = function() {
    showAdmin();
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

    console.log(product)

    if(_idProduct===''){//Insert
        try {
            const saved = await ajax('products', product, 'POST');
            if(saved){
                console.log(saved)
            }
        } catch (error) {
            console.error(error)
        }
    }else{//Update

    }
});

btnDelete.addEventListener("click", (e)=>{

});

btnCancel.addEventListener("click", (e)=>{

});

const showAdmin = ()=>{
    const admin = localStorage.getItem(adminSession) || 'false';

    divAdmin.classList.remove("d-none", "d-block")
    if(admin === 'true'){
        divAdmin.classList.add("d-block")
    }else{
        divAdmin.classList.add("d-none")
    }
}
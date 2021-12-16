const adminSession = "adminSession";
const cartSession = "cartSession";
let divAdmin = document.getElementById("divAdmin");
let btnToggleAdmin = document.getElementById("btnToggleAdmin");

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
    showAdmin()
    console.log(e.target.checked)
})
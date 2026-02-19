appendProducts()
let data = null
let counter = 0;
let add_btn = document.querySelector(".products__add>img")
let form__fields = document.querySelector(".form__fields")
let form__button = document.querySelector(".form__button")
let add__form = document.querySelector(".add__form")
let btn_card__delete = document.querySelectorAll(".card__delete")
let modal = document.querySelector(".modal")
let btn_yes = document.getElementById("yes")
let btn_no = document.getElementById("no")

if(localStorage.getItem("counter")) {
    counter = parseInt(localStorage.getItem("counter"));
}

function createProduct(product){
    counter += 1
    localStorage.setItem("counter", counter)
    localStorage.setItem(`card${counter}`,JSON.stringify({
    'image': product.image,
    'rating':product.rating,      
    'value': product.value,
    'name': product.name,
    'cost': product.cost,
    'data': counter
  }));
}

function appendProducts(){
    let products = document.querySelector('.products')
    let keys = Object.keys(localStorage);
    keys = keys.sort()
    keys = keys.reverse()
    for(let key of keys){
        if(key != "counter"){
            let card = JSON.parse(localStorage.getItem(key))
            let newProduct = document.createElement('div')
            newProduct.className = 'products__card'
            newProduct.innerHTML =  `
            <img data ="${card.data}" src="images/delete.svg" class="card__delete">
            <div class="card__image-block">
            <img class="card__image" src="${card.image}" alt="">
            </div>
            <div class="card__description">
            <div class="card__meta">
                <div class="card__rating">${card.rating}</div>
                <div class="card__value">${card.value}</div>
            </div>
            <div class="card__name">${card.name}</div>
            <div class="card__cost">${card.cost}</div>
            </div>
            `
            products.append(newProduct)
        }
    }
}

add_btn.addEventListener("click", ()=> {
    add_btn.classList.toggle("hide")
    form__fields.classList.toggle("show")
})

form__button.addEventListener("click", (event)=> {
    event.preventDefault();
    if (add__form.checkValidity()) {
        let image = document.getElementById("image-path").value
        let rating = document.getElementById("rating").value
        let value = document.getElementById("value").value
        let name = document.getElementById("name").value
        let cost = document.getElementById("cost").value
        createProduct({image, rating, value, name, cost})
        location.reload()
    }
})

btn_card__delete.forEach(btn => {
    btn.addEventListener("click", (event) => {
        data = event.target.getAttribute("data");
        modal.classList.remove("closed");
        modal.classList.add("active");
    });
});

btn_no.addEventListener("click", ()=>{
    modal.classList.remove("active")
    modal.classList.add("closed")
})

btn_yes.addEventListener("click", ()=> {
    modal.classList.remove("active")
    modal.classList.add("closed")
    localStorage.removeItem(`card${data}`)
    setTimeout(() => {
        location.reload()
    }, 600)
})
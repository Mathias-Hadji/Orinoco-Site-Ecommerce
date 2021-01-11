/* La page panier :

1. Affiche à l'utilisateur un résumé des produits qu'il a selectionné
2. Affiche le prix total des produits du panier
3. Contient formulaire permettant de passer une commande

*/



// ***** Converti le prix des produits en Euro le prix affiché en brut dans l'API *****//
const priceProductInEuro = (priceProduct) => {
    return priceProduct / 100
}

// Récupère le contenu du Local Storage
let tabPanier = JSON.parse(localStorage.getItem('panier'))

// Initialisation du tableau de produits qui sera envoyé au serveur
const tabIdProducts = []

// Initialisation de la variable qui stockera le prix total de la commande
let totalPrice = 0

// ***** Affiche à l'utilisateur un résumé des produits qu'il a selectionné ***** //
const displayProductInPanier = function(){
    for (let i = 0; i < tabPanier.length; i++){

        tabIdProducts.push(tabPanier[i]._id)
    
        const product = document.getElementById('product')
        const eltArticle = document.createElement('article')
        eltArticle.className = 'card card-body mb-3 shadow-sm bg-white rounded'
        eltArticle.innerHTML = `
        <div class="row align-items-center" id="product-bloc">
            <div class="col-9">
                <figure>
                    <div>
                        <img src="${tabPanier[i].imageUrl}" width="25%" class="mx-3 shadow p-1 bg-white rounded">
                        <a href="#">${tabPanier[i].name}</a>
                    </div>
                </figure>
            </div>
            <div class="col-3">
                <div class="price h5">
                    ${priceProductInEuro(tabPanier[i].price)} €
                </div>
            </div>
        </div>
        `
        product.appendChild(eltArticle)
    
        totalPrice = totalPrice + priceProductInEuro(tabPanier[i].price)
    }
}

// ***** Affiche le prix total des produits du panier ***** //
const displayTotalPriceOfPanier = function(){
    let priceOrder = document.getElementById('price-order');
    priceOrder.innerHTML = `${totalPrice} €`
}

// ***** Lorsque le panier est vide, affiche un message et retire le formulaire de commande ***** //
const displayPanierVide = function(){
    const product = document.getElementById('panier-vide')
    product.innerHTML = `Votre panier est vide.`
    
    const blocContent = document.getElementById('bloc-content')
    blocContent.classList.add('d-none')
}


// ***** Affiche le panier de l'utilisateur ***** //
const ifPanierExist = function(){
    if (!tabPanier){
        displayPanierVide()
    } else {
        displayProductInPanier()
        displayTotalPriceOfPanier()
    }
}


// Selection du formulaire
const formOrder = document.getElementById('form-order')


// Validation regex First Name
const validFirstName = function(inputFirstName) {
    const firstNameRegExp = new RegExp('^[a-z éèêëàâîïôöûü-]+$', 'i')

    const small = inputFirstName.nextElementSibling

    if (firstNameRegExp.test(inputFirstName.value)){
        small.innerHTML = 'Valide'
        small.classList.remove('text-danger')
        small.classList.add('text-success')
        inputFirstName.style.borderColor = "green"
        return true
    } else {
        small.innerHTML = 'Invalide'
        small.classList.remove('text-success')
        small.classList.add('text-danger')
        inputFirstName.style.borderColor = "red"
        return false
    }
}


// Validation regex Last Name
const validLastName = function(inputLastName){
    const lastNameRegExp = new RegExp('^[a-z éèêëàâîïôöûü-]+$','i')

    const small = inputLastName.nextElementSibling

    if (lastNameRegExp.test(inputLastName.value)){
        small.innerHTML = 'Valide'
        small.classList.remove('text-danger')
        small.classList.add('text-success')
        inputLastName.style.borderColor = "green"
        return true
    } else {
        small.innerHTML = 'Invalide'
        small.classList.remove('text-success')
        small.classList.add('text-danger')
        inputLastName.style.borderColor = "red"
        return false
    }
}


// Validation regex adresse
const validAddress = function(inputAddress){
    const addressRegExp = new RegExp('^[1-9]+[a-z éèêëàâîïôöûü-]+$', 'i')

    const small = inputAddress.nextElementSibling

    if(addressRegExp.test(inputAddress.value)){
        small.innerHTML = 'Valide'
        small.classList.remove('text-danger')
        small.classList.add('text-success')
        inputAddress.style.borderColor = "green"
        return true
    } else {
        small.innerHTML = 'Invalide'
        small.classList.remove('text-success')
        small.classList.add('text-danger')
        inputAddress.style.borderColor = "red"
        return false
    }
}


// Validation regex ville
const validCity = function(inputCity) {
    const cityRegExp = new RegExp('^[a-z éèêëàâîïôöûü-]+$', 'i')

    const small = inputCity.nextElementSibling

    if (cityRegExp.test(inputCity.value)){
        small.innerHTML = 'Valide'
        small.classList.remove('text-danger')
        small.classList.add('text-success')
        inputCity.style.borderColor = "green"
        return true
    } else {
        small.innerHTML = 'Invalide'
        small.classList.remove('text-success')
        small.classList.add('text-danger')
        inputCity.style.borderColor = "red"
        return false
    }
}


// Validation regex email
const validEmail = function(inputEmail){
    const emailRegExp = new RegExp('^[a-z0-9._-]+[@]{1}[a-z]+[.]{1}[a-z]{2,3}$','i')

    const small = inputEmail.nextElementSibling

    if (emailRegExp.test(inputEmail.value)){
        small.innerHTML = 'Valide'
        small.classList.remove('text-danger')
        small.classList.add('text-success')
        inputEmail.style.borderColor = "green"
        return true
    } else {
        small.innerHTML = 'Invalide'
        small.classList.remove('text-success')
        small.classList.add('text-danger')
        inputEmail.style.borderColor = "red"
        return false
    }
}


// Envoi du formulaire au serveur
const sendForm = function() {
    if (validEmail(formOrder.email) && validCity(formOrder.city) && validAddress(formOrder.address) && validLastName(formOrder.lastName) && validFirstName(formOrder.firstName)) {
        const formContact = {
            firstName: formOrder.firstName.value.trim(),
            lastName: formOrder.lastName.value.trim(),
            address: formOrder.address.value.trim(),
            city: formOrder.city.value.trim(),
            email: formOrder.email.value.trim()
        }
        fetch('http://localhost:3000/api/cameras/order', {
            method: 'POST',
            body: JSON.stringify({contact:formContact,products:tabIdProducts}),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then(response => response.json())
        .then(data => {
            window.location.href = 'order_confirmation.html?orderId=' + data.orderId + '&totalPrice=' + totalPrice
        })
        // Affichage des eventuelles erreurs dans la console
        .catch(err => console.log('erreur'))
    }
}


formOrder.addEventListener('submit', function(e){
    e.preventDefault()
    sendForm()
})

ifPanierExist()

formOrder.firstName.addEventListener('change', function(){
    validFirstName(this)
})

formOrder.lastName.addEventListener('change', function(){
    validLastName(this)
})

formOrder.address.addEventListener('change', function(){
    validAddress(this)
})

formOrder.city.addEventListener('change', function(){
    validCity(this)
})

formOrder.email.addEventListener('change', function(){
    validEmail(this)
})














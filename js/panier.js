/* La page panier :

1. Affiche à l'utilisateur un résumé des produits qu'il a selectionné
2. Affiche le prix total des produits du panier
3. Contient formulaire permettant de passer une commande.

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
        product.appendChild(eltArticle);
    
        totalPrice = totalPrice + priceProductInEuro(tabPanier[i].price)
    }
}

// ***** Affiche le prix total des produits du panier ***** //
const displayTotalPriceOfPanier = function(){
    let priceOrder = document.getElementById('price-order');
    priceOrder.innerHTML = `${totalPrice} €`
}

if (!tabPanier){
    const product = document.getElementById('panier-vide')
    product.innerHTML = `Votre panier est vide.`
    
    const blocContent = document.getElementById('bloc-content')
    blocContent.classList.add('d-none')

} else {
    displayProductInPanier()
    displayTotalPriceOfPanier()
}





// Selection du formulaire
const formOrder = document.getElementById('form-order')


// Validation regex First Name

formOrder.firstName.addEventListener('change', function(){
    validFirstName(this)
})

const validFirstName = function(inputFirstName) {
    const firstNameRegExp = new RegExp('^[a-zA-Z éèêëàâîïôöûü-]+$', 'g', 'i')

    const small = inputFirstName.nextElementSibling

    if (firstNameRegExp.test(inputFirstName.value)){
        small.innerHTML = 'Valide'
        small.classList.remove('text-danger')
        small.classList.add('text-success')
        return true
    } else {
        small.innerHTML = 'Invalide'
        small.classList.remove('text-success')
        small.classList.add('text-danger')
        return false
    }
}


// Validation regex Last Name

formOrder.lastName.addEventListener('change', function(){
    validLastName(this)
})

const validLastName = function(inputLastName){
    const lastNameRegExp = new RegExp('^[a-zA-Z éèêëàâîïôöûü-]+$', 'g', 'i')

    const small = inputLastName.nextElementSibling

    if (lastNameRegExp.test(inputLastName.value)){
        small.innerHTML = 'Valide'
        small.classList.remove('text-danger')
        small.classList.add('text-success')
        return true
    } else {
        small.innerHTML = 'Invalide'
        small.classList.remove('text-success')
        small.classList.add('text-danger')
        return false
    }
}


// Validation regex adresse

formOrder.address.addEventListener('change', function(){
    validAddress(this)
})

const validAddress = function(inputAddress){
    const addressRegExp = new RegExp('^[1-9]+[a-zA-Z éèêëàâîïôöûü-]+$', 'g', 'i')

    const small = inputAddress.nextElementSibling

    if(addressRegExp.test(inputAddress.value)){
        small.innerHTML = 'Valide'
        small.classList.remove('text-danger')
        small.classList.add('text-success')
        return true
    } else {
        small.innerHTML = 'Invalide'
        small.classList.remove('text-success')
        small.classList.add('text-danger')
        return false
    }
}


// Validation regex ville

formOrder.city.addEventListener('change', function(){
    validCity(this)
})

const validCity = function(inputCity) {
    const cityRegExp = new RegExp('^[a-zA-Z éèêëàâîïôöûü-]+$', 'g', 'i')

    const small = inputCity.nextElementSibling

    if (cityRegExp.test(inputCity.value)){
        small.innerHTML = 'Valide'
        small.classList.remove('text-danger')
        small.classList.add('text-success')
        return true
    } else {
        small.innerHTML = 'Invalide'
        small.classList.remove('text-success')
        small.classList.add('text-danger')
        return false
    }
}


// Validation regex email

formOrder.email.addEventListener('change', function(){
    validEmail(this)
})

const validEmail = function(inputEmail){
    const emailRegExp = new RegExp('^[a-zA-Z0-9._-]+[@]{1}[a-zA-Z0-9._-]+[.]{1}[a-z]{2,10}$', 'g')

    const small = inputEmail.nextElementSibling

    if (emailRegExp.test(inputEmail.value)){
        small.innerHTML = 'Valide'
        small.classList.remove('text-danger')
        small.classList.add('text-success')
        return true
    } else {
        small.innerHTML = 'Invalide'
        small.classList.remove('text-success')
        small.classList.add('text-danger')
        return false
    }
}



// Validation globale formulaire

formOrder.addEventListener('submit', function(e){
    e.preventDefault()
    sendForm()
})


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
    } else {
        console.log('erreur de saisie dans le formulaire')
    }
}

















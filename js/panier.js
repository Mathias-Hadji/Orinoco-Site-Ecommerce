/* La page panier contient un résumé des produits dans le panier, le prix total,
et un formulaire permettant de passer une commande. */



//-------- Fonction qui permet de convertir en Euro le prix affiché en brut dans l'API --------//
const priceProductInEuro = (priceProduct) => {
    return priceProduct / 100;
}


// Création du tableau qui sera envoyé au serveur
const tabIdProducts = []

// Récupère le contenu du Local Storage pour afficher les produits du panier
let tabPanier = JSON.parse(localStorage.getItem('panier'))

let totalPrice = 0

for (let i = 0; i < tabPanier.length; i++){

    // Recupère les ID des produits et les stock dans le tableau tabIdProducts
    tabIdProducts.push(tabPanier[i]._id)

    // Selection de l'ID product
    const product = document.getElementById('product')

    // Création des balises <article> enfant de l'ID product
    const eltArticle = document.createElement('article')

    // Ajout de classes aux élements <article>
    eltArticle.className = 'card card-body mb-3 shadow-sm bg-white rounded'

    // Ajout du code HTML aux élements <article>
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
    // Ajout des balises <article> enfants de la <div id ='product'>
    product.appendChild(eltArticle);

    // Calcul du prix total de la commande
    totalPrice = totalPrice + priceProductInEuro(tabPanier[i].price)
}


// Affichage du prix total de la commande
let priceOrder = document.getElementById('price-order');
priceOrder.innerHTML = `${totalPrice} €`







// ***************** PARTIE REGEX ***************** //

// Selection du formulaire
const formOrder = document.getElementById('form-order')


// Validation regex First Name

formOrder.firstName.addEventListener('change', function(){
    validFirstName(this)
})

const validFirstName = function(inputFirstName) {
    const firstNameRegExp = new RegExp('^[a-zA-Zéèêëàâîïôöûü-]+$', 'g')

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
    const lastNameRegExp = new RegExp('^[a-zA-Zéèêëàâîïôöûü-]+$', 'g')

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
    const addressRegExp = new RegExp('^[1-9]+[a-zA-Zéèêëàâîïôöûü-]+$', 'g')

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
    const cityRegExp = new RegExp('^[a-zA-Zéèêëàâîïôöûü-]+$', 'g')

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




//-------- PARTIE ENVOI DU FORMULAIRE AU SERVEUR -------- //

formOrder.addEventListener('submit', function(e){
    e.preventDefault()
 
    if (validEmail(formOrder.email) && validCity(formOrder.city) && validAddress(formOrder.address) && validLastName(formOrder.lastName) && validFirstName(formOrder.firstName)) {
        const formContact = {
            firstName: formOrder.firstName.value,
            lastName: formOrder.lastName.value,
            address: formOrder.address.value,
            city: formOrder.city.value,
            email: formOrder.email.value
        }
        fetch('http://localhost:3000/api/cameras/order', {
            method: 'POST',
            body: JSON.stringify({contact:formContact,products:tabIdProducts}),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then(response => response.json())
        .then(data => {
        console.log(data)

        //--------Redirection vers page de confirmation--------

        // Construction de l'URL avec orderID + Prix total
        // Simule un clique 
        window.location.href = 'order_confirmation.html?orderId=' + data.orderId + '&totalPrice=' + totalPrice

        // Simule une redirection HTTP:
        //window.location.replace('order_confirmation.html')
    
        })
        // Affichage des eventuelles erreurs dans la console
        .catch(err => console.log('erreur'))
    } else {
        console.log('erreur de saisie dans le formulaire')
    }
})














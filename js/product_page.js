/* La page produit :

1. affiche de manière dynamique le produit séléctionné par l'utilisateur
2. permet de personnaliser le produit
3. permet d'ajouter le produit à son panier

*/


// ***** Converti le prix des produits en Euro le prix affiché en brut dans l'API *****//
const priceProductInEuro = (priceProduct) => {
    return priceProduct / 100;
}


// ***** Récupération de l'ID du produit dans l'URL de la page ***** //
const collectIdProductInUrl = function(){
    const params = new URLSearchParams(window.location.search)
    return params.get('id')
}


// ***** Affichage des caractéristiques de la caméra (nom, prix, description) ***** //
const displayCameraDetails = function(data){
    const product = document.getElementById('product')
    const eltArticle = document.createElement('article')
    eltArticle.className = 'card'
    eltArticle.innerHTML = 
    `
    <div class="row">
        <div class="col-md-6 shadow p-1 bg-white rounded">
            <div>
                <img src="${data.imageUrl}" width="100%">
            </div>
        </div>
        <div class="col-md-6">
            <div class="my-3 mx-3">
                <h2>${data.name}</h2>
                <p>${data.description}</p>
                <div class="form-group">
                    <label for="inputLenses">Lentilles :</label>
                    <select id="inputLenses" class="form-control">
                    <option selected>Choisir...</option>
                    </select>
                </div>
                <h4 class="my-3">${priceProductInEuro(data.price)} €</h4>
                <button type="button" id="add-panier" class="btn btn-primary">Ajouter au panier</button>
            </div>
        </div>
    </div>
    `
    product.appendChild(eltArticle)
}


// ***** Affichage dynamique du titre h1 en fonction du produit selectionné par l'utilisateur ***** //
const displayTitleProduct = function(data){
    let titleProduct = document.getElementById('title-product')
    titleProduct.innerHTML =`${data.name}`
}


// ***** Affichage du menu déroulant choix du type de lentille de la caméra ***** //
const displayTabLenses = function(data){
    let tabLenses = data.lenses
    for (let i = 0; i < tabLenses.length; i++){
        let inputLenses = document.getElementById('inputLenses')
        const eltOption = document.createElement('option')
        eltOption.innerHTML = `${tabLenses[i]}`
        inputLenses.appendChild(eltOption)
    }
}


/* Création d'un tableau contenant les produits selectionnés par l'utilisateur.
Ce tableau est associé à une clé et transformé en chaîne de caractère pour être
envoyé dans le local storage */
const panierUserInLocalStorage = function(data){
    let addPanier = document.getElementById('add-panier')
    addPanier.addEventListener('click', function(){
        if (!localStorage.getItem('panier')){
            // Si la clé panier n'existe pas dans le local storage
            // On peut aussi dire si il n'y a aucun produit dans le panier
            // ALORS on créé un tableau vide
            // Puis on push l'objet qui contient les data du produit ajouté au panier dedans
            // Puis on converti le tableau contenant l'objet (produit ajouté au panier) en chaîne de caractère pour être interpreté par le local storage
            // Puis on envoi le tableau panier dans le local storage
            const panier = []
            panier.push(data)
            localStorage.setItem('panier', JSON.stringify(panier))
        } else {
            // Sinon si la clé panier existe déjà
            // On peut aussi dire si il y a déjà au moins 1 produit dans le panier
            // ALORS on récupère le tableau du local storage et on remet le tableau au format JSON (objet) pour pouvoir le manipuler. Ce qui nous donne un tableau d'objet.
            // Ensuite on push l'objet contenant le produit ajouté au panier dans le tableau d'objet
            // Ensuite on reconverti le tableau d'objet en chaîne de caractère pour être interprété par le local storage
            // Puis on renvoi le tableau panier contenant les nouvelles données dans le local storage
            panier = JSON.parse(localStorage.getItem('panier'))
            panier.push(data)
            localStorage.setItem('panier', JSON.stringify(panier))
        }
    })
}


// ***** Appel API en ciblant un produit précis grâce à son à l'ID ***** //
fetch('http://localhost:3000/api/cameras/' + collectIdProductInUrl())
.then(response => response.json())
.then(data => {
    displayCameraDetails(data)
    displayTitleProduct(data)
    displayTabLenses(data)
    panierUserInLocalStorage(data)
})
.catch(error => console.log(error))
/* La page d'accueil :

1. affiche tous les produits disponibles à la vente 

*/


// ***** Converti le prix des produits en Euro le prix affiché en brut dans l'API *****//
const priceProductInEuro = (priceProduct) => {
    return priceProduct / 100;
}

// ***** Affichage des produits sur la page HTML ***** //
const displayProduct = function(data){
    for (let i = 0; i < data.length; i++) {
        const product = document.getElementById('product')
        const eltArticle = document.createElement('article')
        eltArticle.className = 'col-md-4 my-3'
        eltArticle.innerHTML = 
        `<div class="card">
            <div>
                <a href="product_page.html?id=${data[i]._id}"><img src="${data[i].imageUrl}" class="shadow bg-white rounded" width="100%"></a>
            </div>
            <div class="py-3 px-3 border-top">
                <h5>${data[i].name}</h5>
            <div class="mt-2 border-top py-3 fw-bold">
                ${priceProductInEuro(data[i].price)} €
            </div>
            <div>
                <a class="btn btn-outline-primary" href="product_page.html?id=${data[i]._id}" role="button">Voir le produit</a>
            </div>
        </div>`
        product.appendChild(eltArticle);
    }
}

// ***** Récupération des données de l'API ***** //
fetch("http://localhost:3000/api/cameras")
.then(response => response.json())
.then(data => {
    displayProduct(data)
})
.catch(error => console.log(error))

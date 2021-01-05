/* La page d'accueil affiche tous les produits disponibles à la vente */


//-------- Fonction qui permet de convertir en Euro le prix affiché en brut dans l'API --------//

const priceProductInEuro = (priceProduct) => {
    return priceProduct / 100;
}



//-------- Récupération des données de l'API --------//

// Appel de l'API
fetch("http://localhost:3000/api/cameras")

// Les données renvoyés par le serveur sont au format texte. Il faut alors les convertir au format JSON (objet) pour pouvoir les manipulées en JS
.then(response => response.json())

// Récupération d'une nouvelle réponse contenant les données au format JSON (tableau d'objets)
// Traitement des données
.then(data => {

    // La boucle for parcour chaque objet du tableau jusqu'à la fin de celui ci
    for (let i = 0; i < data.length; i++) {

        // Selection de id='product' dans la page HTML
        const product = document.getElementById('product')

        // Création des balises <article> (futur enfant de l'ID product)
        const eltArticle = document.createElement('article')

        // Attribution de classe(s) à la balise <article>
        eltArticle.className = 'col-md-4 my-3'

        // Injection du code HTML dans la balise <article>
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
        
        // Ajout de la balise <article> en tant qu'enfant de id ='product'
        product.appendChild(eltArticle);
    }
})
// Affichage des eventuelles erreurs dans la console
.catch(error => console.log(error))






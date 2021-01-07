/* La page de confirmation de commande :

1. Affiche le prix total de la commande
2. Affiche l'identifiant de commande généré par le serveur

*/



// ***** Récupération du paramètre id dans l'URL ***** //
const collectIdOfUrl = function(){
    const params = new URLSearchParams(window.location.search)
    return params.get('orderId')
}

// ***** Récupération du paramètre totalPrice dans l'URL ***** //
const collectTotalPriceOfUrl = function(){
    const params = new URLSearchParams(window.location.search)
    return params.get('totalPrice')
}


// ***** Affichage des informations de confirmations (prix total de la commande et identifiant de commande généré par le serveur) ***** //
const displayConfirmationOrderInfos = function(){
    // Affichage du numéro de commande en HTML
    const userOrderId = document.getElementById('user-order-id')
    userOrderId.innerHTML =`<h5>Numéro de commande: ${collectIdOfUrl()}</h5>`
    // Affichage du prix total de la commande en HTML
    const userOrderPrice = document.getElementById('user-order-price')
    userOrderPrice.innerHTML =`<h5>Prix total : ${collectTotalPriceOfUrl()} €</h5>`
}


displayConfirmationOrderInfos()

/* La page de confirmation de commande indique le prix total et l'identifiant 
de commande */


// Récupération de l'URL de la page
const params = new URLSearchParams(window.location.search)
// Récupération uniquement de la partie ID de commande de l'URL
const orderId = params.get('orderId')
// Récupération uniquement de la partie totalPrice de l'URL
const totalPrice = params.get('totalPrice')

// Affichage du numéro de commande en HTML
const userOrderId = document.getElementById('user-order-id')
userOrderId.innerHTML =`<h5>Numéro de commande: ${orderId}</h5>`
// Affichage du prix total de la commande en HTML
const userOrderPrice = document.getElementById('user-order-price')
userOrderPrice.innerHTML =`<h5>Prix total : ${totalPrice} €</h5>`
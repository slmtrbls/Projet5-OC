let order = JSON.parse(localStorage.getItem('order')); // On récupère les informations de la commande à partir du local Storage
//console.log(JSON.stringify(order));

fillOrderId();

async function getOrderInfo() { // cette fonction envoie les informations de la commande à l'API via une requête POST 
    
    var options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body : JSON.stringify(order)
      }; 
       
    const response = await fetch('http://localhost:3000/api/products/order', options)

    return await response.json(); // et retourne la réponse au format json
}

async function fillOrderId() { // cette fonction va récupérer l'orderId à partir de la réponse de la requête post
    var response = await getOrderInfo()
    .then((data) => {
        var orderIdValue = data.orderId;
        let orderId = document.getElementById('orderId');
        orderId.innerHTML = orderIdValue; // elle affiche l'orderId à l'écran
        localStorage.clear(); // puis supprime les infos du localStorage
    })
    .catch(function(error) {
        console.log('Il y a eu un problème avec la requête POST' );
    });
}
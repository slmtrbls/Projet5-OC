let order = JSON.parse(localStorage.getItem('order'));
console.log(JSON.stringify(order));


fillOrderId();

async function getOrderId() {
    var options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body : JSON.stringify(order)
      }; 

   var orderInfo = fetch('http://localhost:3000/api/products/order', options)
   return await orderInfo.json() 
};

async function fillOrderId() {
    var result = await getOrderId()
    .then(function(data) {
    console.log(data);
    })
    
   
    .catch(function(err) {
        console.log('erreur de transmission')
      });

};


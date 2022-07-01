let produitLocalStorage = JSON.parse(localStorage.getItem("produit")); // on récupère les informations du localStorage
let totalQuantity = 0 ;
let totalPrice = 0;

async function getProductPrice(produit) {
    await fetch("http://localhost:3000/api/products/"+produit.idProduct)
        .then((response) => response.json())
        .then((productInfo) => prixProduit = productInfo.price)
        .catch((error) => {
            console.log("Erreur de la requête API");
        })
};

fillCartInfo();

async function fillCartInfo() { // cette fonction va remplir la page html avec les informations du panier

    if (produitLocalStorage.length === 0) {
        alert('Votre panier est vide, vous allez être redirigé vers la page d\'accueil') // si le panier est vide on redirige le client vers la page d'accueil
        window.location.href = "index.html";
    } else {
            
        for (let produit of produitLocalStorage) { // pour chaque produit on construit l'architecture html
            await getProductPrice(produit);

            let cartArticle = document.createElement('article');
            document.querySelector('#cart__items').appendChild(cartArticle);
            cartArticle.className = 'cart__item';
            cartArticle.dataset.id = produit.idProduct; // on crée un attribut data-id avec l'id du produit
            cartArticle.dataset.color = produit.couleurProduit;  // on crée un attribut data-color avec la couleur du produit

            let divCartArticleImg = document.createElement('div');
            cartArticle.appendChild(divCartArticleImg);
            divCartArticleImg.className = 'cart__item__img' ;

            let cartArticleImg = document.createElement('img');
            divCartArticleImg.appendChild(cartArticleImg);
            cartArticleImg.src = produit.imgProduit;    // on ajoute l'image du produit
            cartArticleImg.alt = 'photo d\'un '+ produit.nomProduit;

            let divCartArticleContent = document.createElement('div');
            cartArticle.appendChild(divCartArticleContent);
            divCartArticleContent.className = 'cart__item__content';

            let divCartArticleContentDescription = document.createElement('div');
            divCartArticleContent.appendChild(divCartArticleContentDescription);
            divCartArticleContentDescription.className = 'cart__item__content__description';

            let cartArticleContentDescriptionName = document.createElement('h2');
            divCartArticleContentDescription.appendChild(cartArticleContentDescriptionName);
            cartArticleContentDescriptionName.innerHTML = produit.nomProduit; // on ajoute le nom du produit

            let cartArticleContentDescriptionColor = document.createElement('p');
            divCartArticleContentDescription.appendChild(cartArticleContentDescriptionColor);
            cartArticleContentDescriptionColor.innerHTML = produit.couleurProduit; // la couleur du produit

            let cartArticleContentDescriptionPrice = document.createElement('p');
            divCartArticleContentDescription.appendChild(cartArticleContentDescriptionPrice);
            cartArticleContentDescriptionPrice.innerHTML = prixProduit + ' €'; // le prix du produit

            let divCartArticleContentSettings = document.createElement('div');
            divCartArticleContent.appendChild(divCartArticleContentSettings);
            divCartArticleContentSettings.className = 'cart__item__content__settings';

            let divCartArticleContentSettingsQuantity = document.createElement('div');
            divCartArticleContentSettings.appendChild(divCartArticleContentSettingsQuantity);
            divCartArticleContentSettingsQuantity.className = 'cart__item__content__settings__quantity';

            let cartArticleContentSettingsQuantityText = document.createElement('p');
            divCartArticleContentSettingsQuantity.appendChild(cartArticleContentSettingsQuantityText);
            cartArticleContentSettingsQuantityText.innerHTML = 'Qté : '; // la quantité avec d'abord le texte 

            let cartArticleContentSettingsQuantityInput = document.createElement('input'); // puis un input modifiable qui affiche la quantité choisie à la page précédente
            divCartArticleContentSettingsQuantity.appendChild(cartArticleContentSettingsQuantityInput);
            cartArticleContentSettingsQuantityInput.type = 'number';
            cartArticleContentSettingsQuantityInput.className = 'itemQuantity';
            cartArticleContentSettingsQuantityInput.name = 'itemQuantity';
            cartArticleContentSettingsQuantityInput.min = 1;
            cartArticleContentSettingsQuantityInput.max = 100;
            cartArticleContentSettingsQuantityInput.value = produit.quantityProduit;

            let divCartArticleContentSettingsDelete = document.createElement('div');
            divCartArticleContentSettings.appendChild(divCartArticleContentSettingsDelete);
            divCartArticleContentSettingsDelete.className = 'cart__item__content__settings__delete';

            let cartArticleContentSettingsDeleteText = document.createElement('p');
            divCartArticleContentSettingsDelete.appendChild(cartArticleContentSettingsDeleteText);
            cartArticleContentSettingsDeleteText.className = 'deleteItem';
            cartArticleContentSettingsDeleteText.innerHTML = 'Supprimer'; // on ajoute un bouton supprimer


            totalQuantity += parseInt(produit.quantityProduit); // on définit ici la façon dont la quantité totale s'incrémente à l'ajout de chaque produit

            totalPrice += parseInt(prixProduit) * parseInt(produit.quantityProduit) ; // on définit ici la façon dont le prix total s'incrémente à l'ajout de chaque produit

            let cartTotalQuantity = document.querySelector('#totalQuantity');
            cartTotalQuantity.innerHTML = totalQuantity; // on affiche la quantité totale à l'écran

            let cartTotalPrice = document.querySelector('#totalPrice');
            cartTotalPrice.innerHTML = totalPrice; // on affiche le prix total à l'écran

        }
        deleteProduct();
        modifyQuantity();
    }
}



function deleteProduct() { // cette fonction permet d'activer le bouton 'supprimer' associé à chaque produit du panier
    let buttonDelete = document.querySelectorAll('.deleteItem'); // on sélectionne tous les boutons supprimer
    //console.log(buttonDelete);

    for (let j = 0; j< buttonDelete.length; j++) { // pour chaque bouton supprimer
        buttonDelete[j].addEventListener('click', function(e) {
            e.preventDefault();
            let idDelete = produitLocalStorage[j].idProduct;
            let colorDelete = produitLocalStorage[j].couleurProduit;

            produitLocalStorage = produitLocalStorage.filter( el => el.idProduct !== idDelete || el.couleurProduit !== colorDelete ); // au click on supprime du localStorage le produit avec l'Id et la Couleur correspondante
            
            localStorage.setItem("produit", JSON.stringify(produitLocalStorage)); // on réinitialise le localStorage

            //Alerte produit supprimé et refresh
            alert("Ce produit a bien été supprimé du panier");
            location.reload(); // on rafraîchit la page pour réinitialiser le panier sans le produit supprimé
        } )
    }
}



function modifyQuantity() { // cette fonction permet de suivre les modifications des quantités

    let quantityInput = document.querySelectorAll('.itemQuantity'); // on s'assure d'étendre la fonction à tous les champs quantité de la page
    
    for(let i = 0; i < quantityInput.length; i++) {
        quantityInput[i].addEventListener('change', function(e) { // à chaque changement
            e.preventDefault();
            let newQuantity = quantityInput[i].value;
            let idProduct = produitLocalStorage[i].idProduct;
            let color = produitLocalStorage[i].couleurProduit;

            const resultfind2 = produitLocalStorage.find(
                (el) => el.idProduct === idProduct && el.couleurProduit === color
            );
            
            if(resultfind2) {
                produitLocalStorage[i].quantityProduit = newQuantity ; // on modifie la quantité du produit avec l'Id et la couleur souhaités dans le localStorage
                localStorage.setItem("produit", JSON.stringify(produitLocalStorage)); // on réinitialise le localStorage
                location.reload(); // on rafraîchit la page pour que les changements soient prix en compte 
            }
        })
    }
}

const firstNameInput = document.getElementById('firstName'); // on établit ici des règles pour le champ Prénom
const firstNameErrorMsg = document.getElementById('firstNameErrorMsg');

firstNameInput.addEventListener('change', function() {
    let regexFirstName = new RegExp('^[a-zA-Z ,.\'-]+$'); // la règle indique quels caractères peuvent être utilisés
    let firstName = firstNameInput.value;
    if (!regexFirstName.test(firstName)) {        
        firstNameErrorMsg.innerHTML = 'Veuillez saisir un Prénom valide'; // si la règle n'est pas respectée un message d'erreur s'affiche en dessous du champ
    } else {
        firstNameErrorMsg.innerHTML = '';
    }
});

const lastNameInput = document.getElementById('lastName'); // on établit ici les règles pour le champ Nom
const lastNameErrorMsg = document.getElementById('lastNameErrorMsg');

lastNameInput.addEventListener('change', function() {
    let regexLastName = new RegExp('^[a-zA-Z ,.\'-]+$');
    let lastName = lastNameInput.value;
    if (!regexLastName.test(lastName)) {        
        lastNameErrorMsg.innerHTML = 'Veuillez saisir un Nom valide';
    } else {
        lastNameErrorMsg.innerHTML = '';
    }
});

const addressInput = document.getElementById('address'); // on établit ici les règles pour le champ Adresse
const addressErrorMsg = document.getElementById('addressErrorMsg');

addressInput.addEventListener('change', function() {
    let regexAdress = new RegExp('[0-9]{1,4}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+'); // l'adresse doit commencer par des numéros suivis par du texte
    let address= addressInput.value;
    if (!regexAdress.test(address)) {
        addressErrorMsg.innerHTML = 'Veuillez saisir une adresse valide';
    } else {
        addressErrorMsg.innerHTML = '';
    }
});

const cityInput = document.getElementById('city'); // on établit ici la règle pour le champ Ville
const cityErrorMsg = document.getElementById('cityErrorMsg');

cityInput.addEventListener('change', function() {
    let regexCity = new RegExp('^[a-zA-Z ,.\'-]+$');
    let city = cityInput.value;
    if (!regexCity.test(city)) {        
        cityErrorMsg.innerHTML = 'Veuillez saisir un nom de Ville valide';
    } else {
        cityErrorMsg.innerHTML = '';
    }
});

const emailInput = document.getElementById('email'); // on établit ici la règle pour le champ Email
const emailErrorMsg = document.getElementById('emailErrorMsg');

emailInput.addEventListener('change', function() {    
    let regexEmail = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$'); // l'email doit être composé de la façon suivante ***@***.***
    let email = emailInput.value
    if (!regexEmail.test(email)) {        
        emailErrorMsg.innerHTML = 'Veuillez saisir une adresse Email valide';
    } else {
        emailErrorMsg.innerHTML = '';
    }
});

let productIds = []

for (let produit of produitLocalStorage) { // ici on extraie les ids produit en préparation de l'envoi de la commande
    productIds.push(produit.idProduct);
}

makeAnOrder();

function makeAnOrder() { // cette fonction permet d'envoyer les informations liées à la commande dans le localStorage

    const orderButton = document.getElementById('order');

    orderButton.addEventListener('click', function(e) { // en cliquant sur le bouton 'Commander !'
        e.preventDefault();
        if (firstNameErrorMsg.textContent !== '' || lastNameErrorMsg.textContent !== '' || addressErrorMsg.textContent !== '' || cityErrorMsg.textContent !== '' || emailErrorMsg.textContent !== '') {
            alert('Une erreur s\'est produite, veuillez corriger le formulaire') // si l'un des champs au moins affiche un msg d'erreur on demande à l'utilisateur de corriger son formulaire
        } else if (firstNameInput.value === '' || lastNameInput.value === '' || addressInput.value === '' || cityInput.value === '' || emailInput.value === '') {
            alert('Veuillez remplir tous les champs du formulaire'); // si l'un des champs au moins est vide on demande à l'utilisateur de remplir tous les champs
        } else { // autrement on sauvegarde les informations liées à la commande dans le localStorage
            let order = {
                contact : {
                    firstName : firstNameInput.value,
                    lastName : lastNameInput.value,
                    address : addressInput.value,
                    city : cityInput.value,
                    email : emailInput.value,},

                products : productIds
            }

            localStorage.setItem("order", JSON.stringify(order)); 
            alert('Vous allez être redirigé vers la page Confirmation');
            window.location.href = "confirmation.html"; // on redirige le client vers la page confirmation


        }
    })
}





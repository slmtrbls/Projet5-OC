let produitLocalStorage = JSON.parse(localStorage.getItem("produit"));
let totalQuantity = 0 ;
let totalPrice = 0;

fillCartInfo();

function fillCartInfo() {


    
    for (let produit of produitLocalStorage) {

        let cartArticle = document.createElement('article');
        document.querySelector('#cart__items').appendChild(cartArticle);
        cartArticle.className = 'cart__item';
        cartArticle.dataset.id = produit.idProduct;
        cartArticle.dataset.color = produit.couleurProduit;

        let divCartArticleImg = document.createElement('div');
        cartArticle.appendChild(divCartArticleImg);
        divCartArticleImg.className = 'cart__item__img' ;

        let cartArticleImg = document.createElement('img');
        divCartArticleImg.appendChild(cartArticleImg);
        cartArticleImg.src = produit.imgProduit;
        cartArticleImg.alt = 'photo d\'un '+ produit.nomProduit;

        let divCartArticleContent = document.createElement('div');
        cartArticle.appendChild(divCartArticleContent);
        divCartArticleContent.className = 'cart__item__content';

        let divCartArticleContentDescription = document.createElement('div');
        divCartArticleContent.appendChild(divCartArticleContentDescription);
        divCartArticleContentDescription.className = 'cart__item__content__description';

        let cartArticleContentDescriptionName = document.createElement('h2');
        divCartArticleContentDescription.appendChild(cartArticleContentDescriptionName);
        cartArticleContentDescriptionName.innerHTML = produit.nomProduit;

        let cartArticleContentDescriptionColor = document.createElement('p');
        divCartArticleContentDescription.appendChild(cartArticleContentDescriptionColor);
        cartArticleContentDescriptionColor.innerHTML = produit.couleurProduit;

        let cartArticleContentDescriptionPrice = document.createElement('p');
        divCartArticleContentDescription.appendChild(cartArticleContentDescriptionPrice);
        cartArticleContentDescriptionPrice.innerHTML = produit.prixProduit + ' €';

        let divCartArticleContentSettings = document.createElement('div');
        divCartArticleContent.appendChild(divCartArticleContentSettings);
        divCartArticleContentSettings.className = 'cart__item__content__settings';

        let divCartArticleContentSettingsQuantity = document.createElement('div');
        divCartArticleContentSettings.appendChild(divCartArticleContentSettingsQuantity);
        divCartArticleContentSettingsQuantity.className = 'cart__item__content__settings__quantity';

        let cartArticleContentSettingsQuantityText = document.createElement('p');
        divCartArticleContentSettingsQuantity.appendChild(cartArticleContentSettingsQuantityText);
        cartArticleContentSettingsQuantityText.innerHTML = 'Qté : ';

        let cartArticleContentSettingsQuantityInput = document.createElement('input');
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
        cartArticleContentSettingsDeleteText.innerHTML = 'Supprimer';


        totalQuantity += parseInt(produit.quantityProduit);

        totalPrice += parseInt(produit.prixProduit) * parseInt(produit.quantityProduit) ;

        let cartTotalQuantity = document.querySelector('#totalQuantity');
        cartTotalQuantity.innerHTML = totalQuantity;

        let cartTotalPrice = document.querySelector('#totalPrice');
        cartTotalPrice.innerHTML = totalPrice;

    }
}

deleteProduct();

function deleteProduct() {
    let buttonDelete = document.querySelectorAll('.deleteItem');
    //console.log(buttonDelete);

    for (let j = 0; j< buttonDelete.length; j++) {
        buttonDelete[j].addEventListener('click', function(e) {
            e.preventDefault();
            let idDelete = produitLocalStorage[j].idProduct;
            let colorDelete = produitLocalStorage[j].couleurProduit;

            /*console.log(idDelete);
            console.log(colorDelete);*/

            produitLocalStorage = produitLocalStorage.filter( el => el.idProduct !== idDelete || el.couleurProduit !== colorDelete );
            
            localStorage.setItem("produit", JSON.stringify(produitLocalStorage));

            //Alerte produit supprimé et refresh
            alert("Ce produit a bien été supprimé du panier");
            location.reload();
        } )
    }
}

modifyQuantity();

function modifyQuantity() {
    let quantityInput = document.querySelectorAll('.itemQuantity');
    //console.log(quantityInput);
    for(let i = 0; i < quantityInput.length; i++) {
        quantityInput[i].addEventListener('change', function(e) {
            e.preventDefault();
            let newQuantity = quantityInput[i].value;
            let idProduct = produitLocalStorage[i].idProduct;
            let color = produitLocalStorage[i].couleurProduit;

            //console.log(newQuantity);

            const resultfind2 = produitLocalStorage.find(
                (el) => el.idProduct === idProduct && el.couleurProduit === color
            );
            
            if(resultfind2) {
                produitLocalStorage[i].quantityProduit = newQuantity ;
                localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
                //console.log(produitLocalStorage[i].quantityProduit);
                //location.reload();
            }
        })
    }
}

const firstNameInput = document.getElementById('firstName');
const firstNameErrorMsg = document.getElementById('firstNameErrorMsg');

firstNameInput.addEventListener('change', function() {
    let regexFirstName = new RegExp('^$|[-a-zA-Zàâäéèêëïîôöùûüç]');
    let firstName = firstNameInput.value;
    if (!regexFirstName.test(firstName)) {        
        firstNameErrorMsg.innerHTML = 'Veuillez saisir un Prénom valide';
    } else {
        firstNameErrorMsg.innerHTML = '';
    }
});

const lastNameInput = document.getElementById('lastName');
const lastNameErrorMsg = document.getElementById('lastNameErrorMsg');

lastNameInput.addEventListener('change', function() {
    let regexLastName = new RegExp('^$|[-a-zA-Zàâäéèêëïîôöùûüç]');
    let lastName = lastNameInput.value;
    if (!regexLastName.test(lastName)) {        
        lastNameErrorMsg.innerHTML = 'Veuillez saisir un Nom valide';
    } else {
        lastNameErrorMsg.innerHTML = '';
    }
});

const addressInput = document.getElementById('address');
const addressErrorMsg = document.getElementById('addressErrorMsg');

addressInput.addEventListener('change', function() {
    let regexAdress = new RegExp('^$|[0-9]{1,4}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+');
    let address= addressInput.value;
    if (!regexAdress.test(address)) {
        addressErrorMsg.innerHTML = 'Veuillez saisir une adresse valide';
    } else {
        addressErrorMsg.innerHTML = '';
    }
});

const cityInput = document.getElementById('city');
const cityErrorMsg = document.getElementById('cityErrorMsg');

cityInput.addEventListener('change', function() {
    let regexCity = new RegExp('^$|[-a-zA-Zàâäéèêëïîôöùûüç,.\'-]');
    let city = cityInput.value;
    if (!regexCity.test(city)) {        
        cityErrorMsg.innerHTML = 'Veuillez saisir un nom de Ville valide';
    } else {
        cityErrorMsg.innerHTML = '';
    }
});

const emailInput = document.getElementById('email');
const emailErrorMsg = document.getElementById('emailErrorMsg');

emailInput.addEventListener('change', function() {    
    let regexEmail = new RegExp('^$|[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
    let email = emailInput.value
    if (!regexEmail.test(email)) {        
        emailErrorMsg.innerHTML = 'Veuillez saisir une adresse Email valide';
    } else {
        emailErrorMsg.innerHTML = '';
    }
});

makeAnOrder();

function makeAnOrder() {

    const orderButton = document.getElementById('order');

    orderButton.addEventListener('click', function(e) {
        e.preventDefault();
        if (firstNameErrorMsg.textContent !== '' || lastNameErrorMsg.textContent !== '' || addressErrorMsg.textContent !== '' || cityErrorMsg.textContent !== '' || emailErrorMsg.textContent !== '') {
            alert('Une erreur s\'est produite, veuillez corriger le formulaire')
        } else if (firstNameInput.value === '' || lastNameInput.value === '' || addressInput.value === '' || cityInput.value === '' || emailInput.value === '') {
            alert('Veuillez remplir tous les champs du formulaire');
        } else {
            let order = {
                contact : {
                    firstName : firstNameInput.value,
                    lastName : lastNameInput.value,
                    address : addressInput.value,
                    city : cityInput.value,
                    email : emailInput.value,},

                products : produitLocalStorage
            }

            localStorage.setItem("order", JSON.stringify(order));
            alert('Vous allez être redirigé vers la page Confirmation');
            window.location.href = "confirmation.html";


        }
    })
}





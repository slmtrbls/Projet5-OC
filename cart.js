let totalQuantity = 0 ;
let totalPrice = 0;

fillCartInfo();

function fillCartInfo() {
    
    let produitLocalStorage = JSON.parse(localStorage.getItem("produit"));
    
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



        totalQuantity += produit.quantityProduit;

        totalPrice += produit.prixProduit * produit.quantityProduit ;

        let cartTotalQuantity = document.querySelector('#totalQuantity');
        cartTotalQuantity.innerHTML = totalQuantity;

        let cartTotalPrice = document.querySelector('#totalPrice');
        cartTotalPrice.innerHTML = totalPrice;

    }
}






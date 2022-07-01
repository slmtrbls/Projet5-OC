var str = window.location.href ; // on récupère l'url de la page
var url = new URL(str);
var idProduct = url.searchParams.get('id'); // on isole l'id du produit à partir de l'url


const colorselect = document.querySelector("#colors");
const quantityselect = document.querySelector("#quantity");

getKanap();
function getKanap () {
    fetch("http://localhost:3000/api/products/"+idProduct) // on récupère les informations du produit grâce à son id
        .then((res) => {
            return res.json();
        })
        .then(async function (resultatAPI) {
            article = await resultatAPI;
            
            fillKanapInfoById(article);  // on utilise les informations du produit pour compléter la page
        })
        .catch((error) => {
            console.log("Erreur de la requête API");
        })
}



function fillKanapInfoById(kanap) { 

    //remplacement du titre de la page
    let itemPageTitle = document.querySelector('title');
    itemPageTitle.innerHTML = kanap.name;
    //création html de l'image
    let itemImg = document.createElement("img");
    document.querySelector(".item__img").appendChild(itemImg);
    itemImg.src = kanap.imageUrl;
    itemImg.alt = kanap.altTxt;

    //création html du titre
    let itemTitle = document.getElementById("title");
    itemTitle.innerHTML = kanap.name;

    //création html du prix
    let itemPrice = document.getElementById("price");
    itemPrice.innerHTML = kanap.price;
    productPrice = kanap.price;

    //création html de la description
    let itemDescription = document.getElementById("description");
    itemDescription.innerHTML = kanap.description;

    //création html des options couleurs
    for (let colors of article.colors) {
        let productColors = document.createElement("option");
        document.querySelector("#colors").appendChild(productColors);
        productColors.value = colors;
        productColors.innerHTML = colors;
    }
    addToCart(kanap);

}


function addToCart(kanap){

    const cartButton = document.getElementById("addToCart");

    cartButton.addEventListener('click', function(e) {

        if (!colorselect.value && parseInt(quantityselect.value) === 0) {
            alert('Veuillez sélectionner une couleur puis modifier la quantité')
        } else if (!colorselect.value) {
            alert('Veuillez sélectionner une couleur')
        } else if (parseInt(quantityselect.value) === 0) {
            alert('Veuillez modifier la quantité')
        }

        else if(quantityselect.value > 0 && quantityselect.value <=100 && quantityselect.value!=0){
            //recuperation de la couleur et de la quantité
            let choixCouleur = colorselect.value;
            let choixQuantite = quantityselect.value;

            let optionsProduit = {
                idProduct : idProduct,
                couleurProduit: choixCouleur,
                quantityProduit : Number(choixQuantite),
                nomProduit: kanap.name,
                descriptionProduit : kanap.description,
                imgProduit : kanap.imageUrl
            }
            //fonction popup de redirection vers la page panier
            const  popupConfirmationPanier = () =>{
                if(window.confirm(`vous avez ajouté ${choixQuantite} kanap de couleur ${choixCouleur} dans le panier`)){
                    window.location.href = "cart.html";
                }
            }

            // init du local storage
            let produitLocalStorage = JSON.parse(localStorage.getItem("produit"));

            // use cases
            //panier contenant 1 kanap minimum
            if(produitLocalStorage){
                const resultfind = produitLocalStorage.find(
                    (el) => el.idProduct === idProduct && el.couleurProduit === choixCouleur
                );
                // si l'id et la couleur sont les mêmes on modifie uniquement la quantité
                if(resultfind){
                    let newQuantity = parseInt(optionsProduit.quantityProduit) + parseInt(resultfind.quantityProduit);
                    resultfind.quantityProduit = newQuantity;
                    localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
                    popupConfirmationPanier();
                }
                // si l'id et/ou la couleur sont différents on ajoute un nouveau produit
                else {
                    produitLocalStorage.push(optionsProduit);
                    localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
                    popupConfirmationPanier();
                }
            }
            // si le panier est vide on ajoute le produit
            else {
                produitLocalStorage = [];
                produitLocalStorage.push(optionsProduit);
                localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
                popupConfirmationPanier();
            }
        }

    });
}
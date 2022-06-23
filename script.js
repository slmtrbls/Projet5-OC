fillSectionHtml();

async function getKanapsInfo(){
    var kanapsCatch = await fetch("http://localhost:3000/api/products") //va chercher les infos de l'API
    return await kanapsCatch.json(); //retourne les infos au format .json
 }

async function fillSectionHtml(){
    var result = await getKanapsInfo()
        .then( function (retourAPI){
            const kanaps = retourAPI;
            for(let kanap in kanaps){
                //test1 // 
                console.log(retourAPI[kanap]);
                //test1//

                //création html du lien pour chaque produit
                let productLink = document.createElement("a");
                document.querySelector(".items").appendChild(productLink);
                productLink.href = './product.html?id='+ retourAPI[kanap]._id ; // attribution d'un id pour chaque produit

                //creation html de la balise <article>
                let productArticle = document.createElement("article");
                productLink.appendChild(productArticle);

                // creation html de l'image
                let productImg = document.createElement("img");
                productArticle.appendChild(productImg);
                productImg.src = retourAPI[kanap].imageUrl; // attribution de l'image à partir de l'API
                productImg.alt = retourAPI[kanap].altTxt; // attribution du texte alternatif à partir de l'API

                //creation html tu titre
                let productTitle = document.createElement("h3");
                productArticle.appendChild(productTitle);
                productTitle.classList.add("productName");
                productTitle.innerHTML = retourAPI[kanap].name; // attribution du Nom à partir de l'API

                //création html de la description
                let productDescription = document.createElement("p");
                productArticle.appendChild(productDescription);
                productDescription.classList.add("productDescription");
                productDescription.innerHTML = retourAPI[kanap].description; // attribution de la description à partir de l'API

            }
            })
        .catch(function(error) {
            console.log('Il y a eu un problème avec l\'opération fetch: ' );
        });
}

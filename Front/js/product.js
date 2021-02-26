// Selectionne l'Url de l'utilisateur
const urlParam = new URLSearchParams(window.location.search);
// Extrait l'ID de l'URL
const urlId = urlParam.get("id");

const getCam = async function (url) {
  // Données de la caméra séléctionnée par son ID
  try {
    let response = await fetch(url);
    if (response.ok) {
      let camera = await response.json();

      // Création des éléments dans le DOM
      const mainDiv = document.getElementById("main-product");
      const productDiv = createElement("div", "product", null, mainDiv, null);
      const imgProduct = createElement("img", null, null, productDiv, {
        src: camera.imageUrl,
        alt: camera.name,
      });
      const nameProduct = createElement(
        "h2",
        "product__name",
        camera.name,
        productDiv,
        null
      );
      const descProduct = createElement(
        "p",
        "product__desc",
        camera.description,
        productDiv,
        null
      );
      const priceProduct = createElement(
        "p",
        "product__price",
        (camera.price / 100).toFixed(2) + " €",
        productDiv,
        null
      );

      // Creation choix objectif
      const objDiv = createElement(
        "div",
        "product__choice",
        null,
        productDiv,
        null
      );
      const labelChoice = createElement(
        "p",
        "label",
        "Choisissez le type d'objectif",
        objDiv,
        null
      );
      const selectChoice = createElement(
        "select",
        "product__lens",
        null,
        objDiv,
        {
          name: "Choix de l'objectif pour " + camera.name,
        }
      );

      // Recupération des objectifs
      let lenses = camera.lenses;
      for (let lens of lenses) {
        let selectLenses = createElement("option", null, lens, selectChoice, {
          value: lens,
        });
      }

      const formProduct = createElement("form", null, null, productDiv, {
        action: "./basket.html",
        method: "get",
      });

      const buttonProduct = createElement(
        "button",
        "product__cart",
        "Ajouter au panier",
        formProduct,
        null
      );

      // PARTIE CART IN PROGRESS
      let cart = document.querySelector(".product__cart");

      cart.addEventListener("click", (e) => {
        e.preventDefault();
        cartNumbers();
      });

      function cartNumbers() {
        let productNumbers = localStorage.getItem("cartNumbers");
        let displayCartNumbers = document.querySelector(
          ".header-cart__cart span"
        );

        productNumbers = parseInt(productNumbers);

        if (productNumbers) {
          localStorage.setItem("cartNumbers", productNumbers + 1);
          displayCartNumbers.textContent = productNumbers + 1;
        } else {
          localStorage.setItem("cartNumbers", 1);
          displayCartNumbers.textContent = 1;
        }
      }
    }
  } catch (error) {
    console.log("Erreur : " + error);
  }
};

getCam(apiUrl + urlId);

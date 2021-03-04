// Récupération des données du localStorage (items ajoutes)
function getStoredCameras() {
  let storedCameras = JSON.parse(localStorage.getItem("addCamera"));
  if (storedCameras == null || storedCameras == undefined) {
    storedCameras = [];
  }
  return storedCameras;
}
// Récupération des données du localStorage (prix total)
function getStoredPrice() {
  let storedPrice = JSON.parse(localStorage.getItem("totalCost"));
  if (storedPrice == null || storedPrice == undefined) {
    storedPrice = 0;
  }
  return storedPrice;
}

// Récupération des données du localStorage (prix total)
function getStoredCart() {
  let storedCart = JSON.parse(localStorage.getItem("cartNumbers"));
  if (storedCart == null || storedCart == undefined) {
    storedCart = 0;
  }
  return storedCart;
}

let storedCameras = getStoredCameras();
let storedPrice = getStoredPrice();
let storedCart = getStoredCart();

if (storedCameras === null || storedCameras.length === 0) {
  // Creation du panier vide dans le cas où le panier est vide
  const mainDiv = document.getElementsByClassName("main")[0];
  const emptyDiv = createElement("div", "main-empty", null, mainDiv, null);
  const emptyTitle = createElement(
    "h2",
    "main-empty__title",
    "Votre panier est vide",
    emptyDiv,
    null
  );
  const emptyAnchor = createElement("a", null, null, emptyDiv, {
    href: "./index.html",
  });
  const emptyHome = createElement(
    "p",
    "main-empty__text",
    "Retour à l'accueil",
    emptyAnchor,
    null
  );
} else {
  //  Création du panier
  const mainDiv = document.getElementsByClassName("main")[0];
  const mainCart = createElement("div", "main-cart", null, mainDiv, null);
  const mainCartHeader = createElement(
    "div",
    "main-cart-header",
    null,
    mainCart,
    null
  );
  const headerTitle = createElement(
    "h2",
    "main-cart-header__title",
    "Votre panier",
    mainCartHeader,
    null
  );
  //  Création de chaque items dans le panier
  for (let storedCamera of storedCameras) {
    const cartList = createElement("div", "cart-list", null, mainCart, null);
    const cartListImg = createElement("img", null, null, cartList, {
      src: storedCamera.cameraImage,
      alt: storedCamera.cameraName,
      width: 100,
      height: 100,
    });
    const cartListName = createElement(
      "p",
      "cart-list__name",
      storedCamera.cameraName + " " + storedCamera.cameraLens,
      cartList,
      null
    );
    const cartListQuantity = createElement(
      "div",
      "cart-list__quantity",
      null,
      cartList,
      null
    );
    const quantityDiv = createElement(
      "div",
      "cart-list__qt",
      null,
      cartListQuantity,
      null
    );
    // Création du bouton moins
    const btnMinus = createElement("button", null, null, quantityDiv, {
      "data-id": storedCamera.cameraID,
      lens: storedCamera.cameraLens,
    });
    const btnMinusIcon = createElement("i", "fas fa-minus", null, btnMinus, {
      "data-id": storedCamera.cameraID,
      lens: storedCamera.cameraLens,
    });
    // Fonction permettant de diminuer la quantité de l'objet
    function quantityMinus(e) {
      e.preventDefault();
      const item = document.querySelectorAll(".btn-delete");
      let cartHeader = document.querySelector(".header-cart__cart span");
      let totalPrice = document.querySelector(".total");
      let quantityDisplay = document.querySelectorAll(".cart-list__qt span");
      let priceItem = document.querySelectorAll(".cart-list__price p");
      // On identifie si l'objet a les meme caracteristique que celui
      // dont le bouton supprimé a été cliqué
      const storedCamera = storedCameras.filter(
        (camera) =>
          camera.cameraID == e.target.getAttribute("data-id") &&
          camera.cameraLens == e.target.getAttribute("lens")
      )[0];
      //On prend l'index de la camera
      const index = storedCameras.indexOf(storedCamera);
      if (storedCamera.quantity === 0 || storedCamera.quantity < 1) {
      } else if (storedCamera.quantity > 1) {
        // Mise a jour du nombre d'item dans le panier (header)
        storedCart -= 1;
        // Diminution du la quantité
        storedCamera.quantity -= 1;
        // Calcul du prix sur le totalCost
        storedPrice = storedPrice - storedCamera.cameraPrice;
        // Mise a jour de l'affichage
        cartHeader.textContent = storedCart;
        totalPrice.textContent = "Prix total : " + storedPrice + " €";
        quantityDisplay[index].textContent =
          "Quantité : " + storedCamera.quantity;
        priceItem[index].textContent =
          "Prix : " + storedCamera.cameraPrice * storedCamera.quantity + " €";
        // Mise a jour du localStorage
        localStorage.setItem("addCamera", JSON.stringify(storedCameras));
        localStorage.setItem("totalCost", JSON.stringify(storedPrice));
        localStorage.setItem("cartNumbers", JSON.stringify(storedCart));
        // window.location.href = "./basket.html";
      }
    }
    // Ajout de l'event Listener sur le BTN moins
    btnMinus.addEventListener("click", quantityMinus);

    const quantityText = createElement(
      "span",
      null,
      "Quantité : " + storedCamera.quantity,
      quantityDiv,
      null
    );
    // Création du bouton plus
    const btnPlus = createElement("button", null, null, quantityDiv, {
      "data-id": storedCamera.cameraID,
      lens: storedCamera.cameraLens,
    });
    const btnPlusIcon = createElement("i", "fas fa-plus", null, btnPlus, {
      "data-id": storedCamera.cameraID,
      lens: storedCamera.cameraLens,
    });
    // Fonction permettant d'augmenter la quantité de l'objet
    function quantityPlus(e) {
      e.preventDefault();
      const item = document.querySelectorAll(".btn-delete");
      let cartHeader = document.querySelector(".header-cart__cart span");
      let totalPrice = document.querySelector(".total");
      let quantityDisplay = document.querySelectorAll(".cart-list__qt span");
      let priceItem = document.querySelectorAll(".cart-list__price p");

      // On identifie si l'objet a les meme caracteristique que celui
      // dont le bouton supprimé a été cliqué
      const storedCamera = storedCameras.filter(
        (camera) =>
          camera.cameraID == e.target.getAttribute("data-id") &&
          camera.cameraLens == e.target.getAttribute("lens")
      )[0];
      //On prend l'index de la camera
      const index = storedCameras.indexOf(storedCamera);
      // Augmentation du la quantité
      storedCamera.quantity += 1;
      // Mise a jour du nombre d'item dans le panier (header)
      storedCart += 1;
      // Calcul du prix sur le totalCost
      storedPrice = storedPrice + storedCamera.cameraPrice;
      // Mise a jour de l'affichage
      cartHeader.textContent = storedCart;
      totalPrice.textContent = "Prix total : " + storedPrice + " €";
      quantityDisplay[index].textContent =
        "Quantité : " + storedCamera.quantity;
      priceItem[index].textContent =
        "Prix : " + storedCamera.cameraPrice * storedCamera.quantity + " €";
      // Mise a jour du localStorage
      localStorage.setItem("addCamera", JSON.stringify(storedCameras));
      localStorage.setItem("totalCost", JSON.stringify(storedPrice));
      localStorage.setItem("cartNumbers", JSON.stringify(storedCart));
      // window.location.href = "./basket.html";
    }
    // Ajout de l'event Listener sur le BTN plus
    btnPlus.addEventListener("click", quantityPlus);

    const cartListPrice = createElement(
      "div",
      "cart-list__price",
      null,
      cartListQuantity,
      null
    );
    const priceText = createElement(
      "p",
      null,
      "Prix : " + storedCamera.cameraPrice * storedCamera.quantity + " €",
      cartListPrice,
      null
    );
    const cartListDelete = createElement(
      "div",
      "cart-list__delete",
      null,
      cartList,
      null
    );
    // Bouton supprimer
    const btnDelete = createElement(
      "button",
      "btn-delete",
      null,
      cartListDelete,
      {
        "data-id": storedCamera.cameraID,
        lens: storedCamera.cameraLens,
      }
    );
    const btnDeleteText = createElement("span", null, "Supprimer ", btnDelete, {
      "data-id": storedCamera.cameraID,
      lens: storedCamera.cameraLens,
    });
    const btnDeleteIcon = createElement(
      "i",
      "fas fa-trash-alt",
      null,
      btnDelete,
      {
        "data-id": storedCamera.cameraID,
        lens: storedCamera.cameraLens,
      }
    );
    // Fonction pour le bouton supprimer sur un item
    function deleteItem(e) {
      e.preventDefault();
      const item = document.querySelectorAll(".btn-delete");
      let cartHeader = document.querySelector(".header-cart__cart span");
      let totalPrice = document.querySelector(".total");

      // On identifie si l'objet a les meme caracteristique que celui
      // dont le bouton supprimé a été cliqué
      const storedCamera = storedCameras.filter(
        (camera) =>
          camera.cameraID == e.target.getAttribute("data-id") &&
          camera.cameraLens == e.target.getAttribute("lens")
      )[0];
      //On prend l'index de la camera
      const index = storedCameras.indexOf(storedCamera);
      storedCameras.splice(index, 1);
      // Calcul du prix sur le totalCost
      storedPrice =
        storedPrice - storedCamera.cameraPrice * storedCamera.quantity;
      // Mise a jour du nombre d'item dans le panier (header)
      storedCart = storedCart - storedCamera.quantity;
      // Mise a jour de l'affichage
      item[index].parentElement.parentElement.remove();
      cartHeader.textContent = storedCart;
      totalPrice.textContent = "Prix total : " + storedPrice + " €";

      // Mise a jour du localStorage
      localStorage.setItem("addCamera", JSON.stringify(storedCameras));
      localStorage.setItem("totalCost", JSON.stringify(storedPrice));
      localStorage.setItem("cartNumbers", JSON.stringify(storedCart));
      if (storedCameras.length === 0) {
        window.location.href = "./basket.html";
      }
    }
    // Ajout d'un listener pour la suppression d'un article
    btnDelete.addEventListener("click", deleteItem);
  }
  const totalPrice = createElement(
    "div",
    "total",
    "Prix total : " + storedPrice + " €",
    mainCart,
    null
  );
  // Création du formulaire de validation
  const mainForm = createElement("form", "main-form", null, mainDiv, null);
  const mainFormHeader = createElement(
    "h3",
    null,
    "Validez votre commande",
    mainForm,
    null
  );
  // Création fonction validité prénom, nom
  function validName(value) {
    // ^[A-Za-zéèàùôêïî_-] == Contient des lettres, caracteres speciaux et -_
    // {3,15}$ == Doit contenir entre 3 et 15 caracteres
    return /^[A-Za-zéèàùôêïî_-]{3,15}$/.test(value);
  }

  // Création fonction validité adresse
  function validAdresse(value) {
    // ^[A-Za-zéèàùôêïî_-] == Contient des lettres, caracteres speciaux et -_
    // {3,15}$ == Doit contenir entre 5 et 80 caracteres
    return /^[A-Za-z0-9éèàùôêïî\s-]{5,80}$/.test(value);
  }

  // Création fonction validité code postal
  function validPostal(value) {
    // ^[0-9] == Commence par et doit contenir que des chiffres
    // {5}$ == Doit finir avec 5 caracteres
    return /^[0-9]{5}$/.test(value);
  }

  // Création fonction validité email
  function validEmail(value) {
    // +@ == séparation avec un @
    // +\. == séparation avec un .
    return /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/.test(value);
  }

  // Création fonction validité ville
  function validVille(value) {
    return /^[A-Za-zéèàùôêïî_-\s]{3,35}$/.test(value);
  }

  // Prenom
  const formPrenom = createElement(
    "div",
    "main-form__form",
    null,
    mainForm,
    null
  );
  const prenomLabel = createElement("label", null, "Prénom", formPrenom, {
    for: "prenom",
  });
  const prenomInput = createElement("input", null, null, formPrenom, {
    type: "text",
    name: "prenom",
    required: "true",
    placeholder: "Jean",
  });
  // Check prenom
  prenomInput.addEventListener("change", function (event) {
    if (validName(prenomInput.value) == false) {
      alert("Aucun chiffre ou symbole n'est autorisé.");
      event.preventDefault();
    }
  });

  // Nom
  const formNom = createElement("div", "main-form__form", null, mainForm, null);
  const NomLabel = createElement("label", null, "Nom", formNom, {
    for: "nom",
  });
  const nomInput = createElement("input", null, null, formNom, {
    type: "text",
    name: "nom",
    required: "true",
    placeholder: "Delarue",
  });

  // Check nom
  nomInput.addEventListener("change", function (event) {
    if (validName(nomInput.value) == false) {
      alert("Aucun chiffre ou symbole n'est autorisé.");
      event.preventDefault();
    }
  });

  // Adresse
  const formAdresse = createElement(
    "div",
    "main-form__form",
    null,
    mainForm,
    null
  );
  const adresseLabel = createElement("label", null, "Adresse", formAdresse, {
    for: "adresse",
  });
  const adresseInput = createElement("textarea", null, null, formAdresse, {
    type: "text",
    name: "adresse",
    required: "true",
    placeholder: "30 rue de Napoléon",
  });

  // Check adresse
  adresseInput.addEventListener("change", function (event) {
    if (validAdresse(adresseInput.value) == false) {
      alert("Aucun symbole n'est autorisé.");
      event.preventDefault();
    }
  });

  // Code postal
  const formPostal = createElement(
    "div",
    "main-form__form",
    null,
    mainForm,
    null
  );
  const postalLabel = createElement("label", null, "Code postal", formPostal, {
    for: "postal",
  });
  const postalInput = createElement("input", null, null, formPostal, {
    type: "text",
    name: "postal",
    required: "true",
    placeholder: "72000",
  });

  // Check code postal
  postalInput.addEventListener("change", function (event) {
    if (validPostal(postalInput.value) == false) {
      alert("Aucun symbole ou lettre n'est autorisé.");
      event.preventDefault();
    }
  });

  // Ville
  const formVille = createElement(
    "div",
    "main-form__form",
    null,
    mainForm,
    null
  );
  const villeLabel = createElement("label", null, "Ville", formVille, {
    for: "ville",
  });
  const villeInput = createElement("input", null, null, formVille, {
    type: "text",
    name: "ville",
    required: "true",
    placeholder: "Paris",
  });

  // Check ville
  villeInput.addEventListener("change", function (event) {
    if (validVille(villeInput.value) == false) {
      alert("Aucun symbole ou chiffre n'est autorisé.");
      event.preventDefault();
    }
  });

  // E-mail
  const formEmail = createElement(
    "div",
    "main-form__form",
    null,
    mainForm,
    null
  );
  const emailLabel = createElement("label", null, "E-mail", formEmail, {
    for: "email",
  });
  const emailInput = createElement("input", null, null, formEmail, {
    type: "text",
    name: "email",
    required: "true",
    placeholder: "Jean.Delarue@gmail.com",
  });

  // Check email
  emailInput.addEventListener("change", function (event) {
    if (validEmail(emailInput.value) == false) {
      alert(
        "L'adresse mail entrée est incorrecte. Voici un exemple : jean.Delarue@gmail.com"
      );
      event.preventDefault();
    }
  });

  // Submit button
  const submitBtn = createElement(
    "button",
    "main-form__btn",
    "Commander",
    mainForm,
    {
      type: "submit",
    }
  );

  function confirmation(e) {
    if (
      validName(prenomInput.value) &&
      validName(nomInput.value) &&
      validAdresse(adresseInput.value) &&
      validVille(villeInput.value) &&
      validEmail(emailInput.value)
    ) {
      e.preventDefault();

      // Création de l'objet contact
      let contact = {
        firstName: prenomInput.value,
        lastName: nomInput,
        address: adresseInput,
        postal: postalInput,
        city: villeInput,
        email: emailInput,
      };

      // Création du tableau produit
      let products = [];
      for (storedCamera of storedCameras) {
        let productsId = storedCamera.cameraID;
        products.push(productsId);
      }

      // Création d'un objet regroupant les contacts et les produits
      let send = {
        contact,
        products,
      };

      // Envoi des données au serveur
      const post = async function (data) {
        try {
          let response = await fetch(apiUrl + "order", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (response.ok) {
            let data = await response.json();
            localStorage.setItem("Order", data.orderId);
            window.location = "confirm.html";
            localStorage.removeItem("addCamera");
            // localStorage.removeItem("totalCost");
            localStorage.removeItem("cartNumbers");
          } else {
            e.preventDefault();
            console.error("Réponse du serveur : ", response.status);
            alert("Erreur : " + response.status);
          }
        } catch (error) {
          alert("Erreur : " + error);
        }
      };
      post(send);
    } else {
      e.preventDefault();
      alert("Un des champs ci-dessus n'est pas au bon format.");
    }
  }
  submitBtn.addEventListener("click", confirmation);
}

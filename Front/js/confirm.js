// Récupération de l'id de la commande
let orderId = localStorage.getItem("Order");

// Récupération du prix total de la commande
let totalPrice = localStorage.getItem("totalCost");

// Récap de commande
const mainConfirm = document.querySelector(".main-confirm");
let orderIdMessage = createElement(
  "p",
  "main-confirm__orderId",
  "Votre numéro de commande est : " + orderId,
  mainConfirm,
  null
);

let orderPrice = createElement(
  "p",
  "main-confirm__orderPrice",
  "Le prix total de votre commande est de : " + totalPrice + " €",
  mainConfirm,
  null
);

let thanks = createElement(
  "p",
  "main-confirm__thanks",
  "Votre commande sera bientôt expédiée ! Merci d'avoir commandé chez OriCam !",
  mainConfirm,
  null
);

// Efface le localStorage
localStorage.clear();

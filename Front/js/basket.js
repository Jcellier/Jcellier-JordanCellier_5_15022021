// Récupération des données du localStorage
function getStoredCameras() {
  let storedCameras = JSON.parse(localStorage.getItem("addCamera"));
  if (storedCameras == null || storedCameras == undefined) {
    storedCameras = [];
  }
  return storedCameras;
}

let storedCameras = getStoredCameras();

if (storedCameras === null || storedCameras.length === 0) {
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
}

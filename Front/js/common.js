// Fonction qui va créer les éléments dynamique de la page
// tag => nom du tag que l'on va créer
// className => classe que l'on ajoute à l'élément
// content => le contenu de l'élément
// parent => le parent de l'élément
// attribute => pour definir les attributs. e.g. les src et alt des imgs
function createElement(tag, className, content, parent, attribute) {
  const element = document.createElement(tag);
  element.className = className;
  element.innerHTML = content;

  for (let key in attribute) {
    element.setAttribute(key, attribute[key]);
  }

  parent.appendChild(element);
  return element;
}

// Fonction qui va afficher sur toutes les pages
// le nombre d'objets dans le panier
function onLoadCartNumbers() {
  let productNumbers = localStorage.getItem("cartNumbers");
  let displayCartNumbers = document.querySelector(".header-cart__cart span");
  if (productNumbers) {
    displayCartNumbers.textContent = productNumbers;
  }
}

onLoadCartNumbers();

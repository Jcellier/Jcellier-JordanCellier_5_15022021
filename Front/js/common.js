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

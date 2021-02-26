const getCameras = async function (url) {
  // On récupère les données de l'API fournie
  try {
    let response = await fetch(url);
    // On vérifie qu'on reçoit un code 200
    if (response.ok) {
      let cameras = await response.json();

      // Création des éléments dans le DOM
      for (let camera of cameras) {
        const mainDiv = document.getElementById("main-category");
        const cardDiv = createElement("div", "main-item", null, mainDiv, null);
        const imageProduct = createElement("img", null, null, cardDiv, {
          src: camera.imageUrl,
          alt: camera.name,
        });
        const nameProduct = createElement(
          "p",
          "main-item__name",
          camera.name,
          cardDiv,
          null
        );
        const priceProduct = createElement(
          "p",
          "main-item__price",
          (camera.price / 100).toFixed(2) + " €",
          cardDiv,
          null
        );
        const linkProduct = createElement("a", null, null, cardDiv, {
          href: "./product.html?id=" + camera._id,
        });
        const textLink = createElement(
          "p",
          "main-item__product",
          "+ d'infos",
          linkProduct,
          null
        );
      }
    } else {
      console.error("Erreur : " + response.statusText);
    }
  } catch (error) {
    console.log("Erreur : " + error);
  }
};

getCameras(apiUrl);

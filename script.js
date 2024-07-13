////////////////////////////////////////////////////////////
// Initialise et retourne les éléments du DOM nécessaires //
// Input pour la première couleur                         //
// Input pour la deuxième couleur                         //
// Input pour l'orientation du gradient                   //
// L'élément body du document                             //
////////////////////////////////////////////////////////////

function initDOMElements() {
  return {
    color1Input: document.getElementById('color-1'),
    color2Input: document.getElementById('color-2'),
    orientationInput: document.getElementById('orientation'),
    body: document.body,
  };
}

///////////////////////////////////////////////////////////////////
// Met à jour le gradient en fonction des valeurs des inputs     //
// Crée la valeur du gradient en fonction des valeurs des inputs //
// Applique le gradient au background dans le body               //
// Met à jour les textes descriptifs avec les valeurs actuelles  //
///////////////////////////////////////////////////////////////////

function updateGradient({ color1Input, color2Input, orientationInput, body }) {
  const gradient = `linear-gradient(${orientationInput.value}deg, ${color1Input.value}, ${color2Input.value})`;
  body.style.background = gradient;
  document.getElementById(
    'orientation-desc'
  ).textContent = `${orientationInput.value}°`;
  document.getElementById('color-1-hex').textContent = color1Input.value;
  document.getElementById('color-2-hex').textContent = color2Input.value;
}

///////////////////////////////////////////////////////////
// Copie le gradient actuel dans le presse-papiers       //
// Copie le style de fond actuel dans le presse-papiers  //
// Crée un toast pour notifier l'utilisateur de la copie //
// Supprime le toast après 3 secondes                    //
///////////////////////////////////////////////////////////

function copyGradientToClipboard(body) {
  navigator.clipboard
    .writeText(body.style.background)
    .then(() => {
      const toast = document.createElement('div');
      toast.className = 'toast';
      toast.textContent = 'Gradient copié dans le presse-papiers !';
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 3000);
    })
    .catch((error) => {
      const toast = document.createElement('div');
      toast.className = 'toast';
      toast.textContent = `Erreur lors de la copie du gradient' : ${error}`;
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 3000);
    });
}

/////////////////////////////////////////////////
// Génère une couleur aléatoire en hexadécimal //
/////////////////////////////////////////////////

function getRandomColor() {
  return `#${Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .padStart(6, '0')}`;
}

////////////////////////////////////////////////////////////////////////////
// Génère un gradient aléatoire et met à jour les inputs et le background //
// Définit une première couleur aléatoire                                 //
// Définit une deuxième couleur aléatoire                                 //
// Définit une orientation aléatoire entre 0 et 360 degrés                //
// Met à jour le gradient avec les nouvelles valeurs                      //
////////////////////////////////////////////////////////////////////////////

function generateRandomGradient(elements) {
  const { color1Input, color2Input, orientationInput } = elements;
  color1Input.value = getRandomColor();
  color2Input.value = getRandomColor();
  orientationInput.value = Math.floor(Math.random() * 361);
  updateGradient(elements);
}

//////////////////////////////////////////////////////////////////////////////////////////////////////
// Ajoute les écouteurs d'événements aux éléments nécessaires                                       //
// Ajoute un écouteur d'événement pour mettre à jour le gradient lors de la modification des inputs //
// Ajoute des écouteurs pour les boutons de copie et de génération aléatoire                        //
//////////////////////////////////////////////////////////////////////////////////////////////////////

function addEventListeners(elements) {
  const { color1Input, color2Input, orientationInput, body } = elements;
  ['input'].forEach((event) => {
    color1Input.addEventListener(event, () => updateGradient(elements));
    color2Input.addEventListener(event, () => updateGradient(elements));
    orientationInput.addEventListener(event, () => updateGradient(elements));
  });

  document
    .querySelector('.gradient-creator__button--copy')
    .addEventListener('click', () => copyGradientToClipboard(body));
  document
    .querySelector('.gradient-creator__button--random')
    .addEventListener('click', () => generateRandomGradient(elements));
}

//////////////////////////////////////
// Fonction principale du script    //
// Exécute le code principal du DOM //
// Initialise les éléments du DOM   //
// Définit les valeurs par défaut   //
// Met à jour le gradient           //
//////////////////////////////////////

function main() {
  document.addEventListener('DOMContentLoaded', () => {
    const elements = initDOMElements();
    elements.color1Input.value = '#ffc53d';
    elements.color2Input.value = '#f76b15';
    elements.orientationInput.value = 145;
    updateGradient(elements);
    addEventListeners(elements);
  });
}

////////////////////////////////////
// Exécute la fonction principale //
////////////////////////////////////

main();

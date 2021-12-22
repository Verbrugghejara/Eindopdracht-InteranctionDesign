// een nummer input toevoegen wanneer het verhhoogd wordt komt eer een munt bij
let redbutton = document.querySelector('.js-button');
redbutton.addEventListener('click', function () {
  let tl = gsap.timeline();
  tl.fromTo(
    '#Push',
    {
      y: 20,
    },
    {
      duration: 0.5,
      y: 0,
    }
  );
  getRandom();
});

const get = (url) => fetch(url).then((r) => r.json());
const getRandom = async () => {
  // Opslaan van queryselectors -------------------------------------------------------
  const activity = document.querySelector('.js-output_activity');
  const participants = document.querySelector('.js-output_parts');
  const loaderclass = document.querySelector('.js-dots');
  const coins = document.querySelector('.js-output_coins');
  const type = document.querySelector('.js-output_type');
  const output = document.querySelector('.js-output');
  // u-muted -------------------------------------------------------
  output.classList.add('u-muted');
  //participants.classList.add('u-muted');
  loaderclass.classList.remove('u-muted');
  endPoint = 'https://www.boredapi.com/api/activity';

  // Eerst bouwen we onze url op -------------------------------------------------------
  if (topic == 'price') {
    updateNumberOfCoins();
    amount = amount / 10;
    endPoint = `${endPoint}?price=${amount}`;
    console.log(endPoint);
  }
  if (topic == 'type') {
    isSelected();
    endPoint = `${endPoint}?type=${amount.toLowerCase()}`;
    console.log(endPoint);
  }
  if (topic == 'participants') {
    updateNumberOfParts();
    endPoint = `${endPoint}?participants=${amount}`;
    console.log(endPoint);
  }
  if (topic == 'random') {
    endPoint = endPoint;
    console.log(endPoint);
  }
  // Met de fetch API proberen we de data op te halen.
  const random = await get(endPoint);
  activity.innerText = random.activity;
  participants.innerText = random.participants;

  const str = random.type;
  if (typeof str == 'string') {
    const str2 = str.charAt(0).toUpperCase() + str.slice(1);
    type.innerText = str2;
  }

  showParts(random.participants);
  showCoins(random.price);
  console.log(random)
  if (activity != null) {
    loaderclass.classList.add('u-muted');
    output.classList.remove('u-muted');
    //participants.classList.remove('u-muted');
  }
  // numberOfCoins();
  // numberOfParts();
};

const isSelected = async () => {
  for (const btn of checkboxBtns) {
    btn.addEventListener('change', function () {
      
      const label = this.parentElement.children[1];
      console.log(label)
      for (let i = 0; i < 4; i++) {
        checkboxBtns[i].parentElement.children[1].classList.remove('c-select');
        price.classList.add('u-muted');
        listType.classList.add('u-muted');
        checkboxPersons.classList.add('u-muted');
        random.classList.add('u-muted');
      }
      label.classList.add('c-select');
      if (label.innerText == 'Price') {
        topic = 'price';
        price.classList.remove('u-muted');
      }
      if (label.innerText == 'Type') {
        listType.classList.remove('u-muted');
        topic = 'type';
      }
      if (label.innerText == 'Participants') {
        checkboxPersons.classList.remove('u-muted');
        topic = 'participants';
      }
      if (label.innerText == 'Random') {
        random.classList.remove('u-muted');
        topic = 'random';
      }
    });
  }
  for (const btnT of checkboxType) {
    btnT.addEventListener('change', function () {
      console.log('change');
      const label = this.parentElement.children[1];
      console.log(label);
      for (let i = 0; i < 9; i++) {
        checkboxType[i].parentElement.children[1].classList.remove('c-select');
      }
      label.classList.add('c-select');
      amount = label.innerText;
    });
  }
};
const showParts = function (number) {
  const participants = document.querySelector('.js-output_parts');
  let htmlString = ``;
  for (let i = 0; i < number; i++) {
    htmlString += `<svg class=" c-person" id="Person" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 98.44 85.57">
    <circle id="Head" class="cls-1" cx="52.13" cy="28.59" r="18.97" transform="translate(-5.56 3.12) rotate(-13.28)"/>
    <path id="Body" class="cls-1" d="M96.94,31.06a10.85,10.85,0,0,0-3.15-2.89,5.57,5.57,0,0,0-4.18-.44l-.45.06a2.74,2.74,0,0,0-.65.29,2.28,2.28,0,0,0-.9.37,3.86,3.86,0,0,0-.57.3,1.76,1.76,0,0,0-.34.25A8.46,8.46,0,0,0,85,30.13a3.79,3.79,0,0,0-.34.2,4.28,4.28,0,0,1-.81.78,3.56,3.56,0,0,1-.76.74L82.19,33c-.11.13-.2.26-.31.38-3.41,3.22-6.14,7-9.49,10.34A48.47,48.47,0,0,1,66,49c-.32.22-.69.5-1.08.79l-.49.22c-2.39,1.18-4.49,2.37-7.1,2.81-1.51.26-3,.49-4.42.66h-.23a23.43,23.43,0,0,1-15-5,5.31,5.31,0,0,0-.95-.57l-.21-.19a6.34,6.34,0,0,1-.79-.57c.84.71-.09,0-.3-.2s-.68-.47-1-.71L34,45.83c-.16-.11-.33-.23-.49-.36-.8-.65-1.58-1.33-2.34-2a4.37,4.37,0,0,1-1.07-1.16h0a15.59,15.59,0,0,0-1.87-2.1c-.89-.93-1.77-1.86-2.64-2.8-.7-.76-1.37-1.54-2.05-2.31A22.94,22.94,0,0,0,22,33.3c-.43-.47-.9-.9-1.3-1.39,0-.05-.09-.12-.14-.18s0,0-.1-.12l.06.07a.52.52,0,0,0-.1-.11l0,0,0,0L20,31c-.17-.23-.34-.45-.52-.66a2.64,2.64,0,0,1-.57-.53c-.31-.38-.65-.74-1-1.11l-.31-.25a.71.71,0,0,0-.08-.15c-.33-.34-.66-.68-1-1l0,0c-.31-.37-.62-.75-.94-1.11-.86-.66-1.7-1.34-2.55-2a2.78,2.78,0,0,1-.43-.41,11.7,11.7,0,0,0-4.14-2A8.69,8.69,0,0,0,1.14,26a6.45,6.45,0,0,0,.37,6.65,4.75,4.75,0,0,1,.78,1.06l.2.17.2.16.43.54.09.13.1.1c1.65,2,3.3,4.06,5,6C9.27,41.94,10.26,43,11.19,44c.21.24.4.48.61.71l0,0,.06.09.27.38q.26.38.48.78h0a4.52,4.52,0,0,1,1,1.37,4.93,4.93,0,0,1,.69.89l0,0a51.18,51.18,0,0,1,4.17,6.19,4.71,4.71,0,0,1,.89,1.61,4.73,4.73,0,0,1,.64,1,3.35,3.35,0,0,1,.51.95c.08.12.15.25.22.38a14.48,14.48,0,0,1,.9,1.31c.66,1.15,1.21,2.28,1.94,3.39a23.69,23.69,0,0,1,2.67,5c.22.4.43.8.62,1.22a94.93,94.93,0,0,1,3.8,9.66,11.83,11.83,0,0,1,.87,4.27,9.33,9.33,0,0,1,.09,2.11c0,.34-.08.67-.14,1s0,.52,0,.79c-.18,1.54-.53,3-.79,4.58l0,.18v0a2.51,2.51,0,0,0,0,.55h-.07c-.13.79-.26,1.59-.43,2.37h2.41a2,2,0,0,0,.5.07q15.47.33,30.93,0l.34,0,.49,0a10.33,10.33,0,0,1,1.67,0l.16,0H69.5V92.6h0a2,2,0,0,0,.05-.34c-.07-.46-.12-.92-.16-1.39a4.22,4.22,0,0,1-.07-.61l0-.56a5.35,5.35,0,0,1-.07-.7c0-.24,0-.48,0-.72v-.13a4,4,0,0,1,0-.5,18.82,18.82,0,0,1,0-2.13c0-.47.07-.93.13-1.38A18.11,18.11,0,0,1,71,76.94a34.63,34.63,0,0,1,3.47-6.5,76.91,76.91,0,0,1,6-9,41,41,0,0,1,5.75-7,6,6,0,0,1,.88-1.23c.54-.57,1.21-1.06,1.8-1.58l.32-.27a3.22,3.22,0,0,1,.28-.24c.12-.17.24-.33.37-.49A22.32,22.32,0,0,1,92,48.42a32.59,32.59,0,0,1,2.47-2.92c.85-.88,1.68-1.83,2.53-2.75.08-.17.14-.34.23-.5.2-.34.38-.68.56-1v0c0-.11.07-.22.11-.33l0,0a9.1,9.1,0,0,0,.42-1,7.85,7.85,0,0,0,.26-1,10,10,0,0,0,.17-1.22c0-.07,0-.15,0-.22s0-.06,0-.1a.27.27,0,0,0,0-.09,8.59,8.59,0,0,0,.08-1.13A8.24,8.24,0,0,0,96.94,31.06Z" transform="translate(-0.39 -9.63)"/>
  </svg>`;
  }
  participants.innerHTML = htmlString;
};
const showCoins = function (number) {
  const coins = document.querySelector('.js-output_coins');
  let htmlString = ``;
  for (let i = 0; i < number * 10; i++) {
    htmlString += `<svg class="c-coin" id="Coin" data-name="Coin" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 197.59 197.59">
    <circle class="c-coin-rand" id="Rand"  cx="98.8" cy="98.8" r="98.8"/>
    <circle class="c-coin-background" id="background"  cx="99" cy="99.01" r="76.61"/>
    <path class="c-coin-euro" id="euro" d="M127.89,133.64a3.43,3.43,0,0,0-.51-.87,3,3,0,0,0-1-.72,9,9,0,0,0-4.83-.87,20.53,20.53,0,0,0-3.26.84c-1.55.4-3.12.75-4.7,1a46.56,46.56,0,0,1-12.25.59,32,32,0,0,1-13.14-4A31.42,31.42,0,0,1,76.9,118v-.54s26.33,0,26.33,0h2.43a6.26,6.26,0,0,0,0-12.52h-2.43v-.11H72V94.22q16.89.11,33.92.12c.46-.09.92-.17,1.38-.28l.42-.08a2.14,2.14,0,0,1,.35-.19l.78-.41A12,12,0,0,0,110,92.07a6.23,6.23,0,0,0,.11-8.91l-.3-.21a6.7,6.7,0,0,0-2.26-1.4,12.43,12.43,0,0,0-1.93-.49H77.16c11.13-17.62,28.31-17.13,37.92-15.13a4.06,4.06,0,0,1,1.14.19c.75.25,1.52.43,2.27.69a12.54,12.54,0,0,1,2.21,1L121,68a4.47,4.47,0,0,0,3.54-.18,8.2,8.2,0,0,0,3.72-3,6.15,6.15,0,0,0,.91-4.64,8.36,8.36,0,0,0-1.71-3.27,4.3,4.3,0,0,0-1.2-1.13,8.86,8.86,0,0,1-1-.54L125,55a14.7,14.7,0,0,1-1.68-.73c-.71-.24-1.43-.48-2.17-.69a52.45,52.45,0,0,0-13.72-1.81C86.54,51.77,68.65,64,61.11,81.3h-6a6.26,6.26,0,1,0,0,12.51h2.59a46.92,46.92,0,0,0-.38,5.83,45.89,45.89,0,0,0,.31,5.27H55.08a6.26,6.26,0,1,0,0,12.52h5.8c7.4,17.63,25.44,30.08,46.54,30.08a53,53,0,0,0,9.57-.87c1.51-.28,3-.63,4.51-1,.73-.2,1.48-.4,2.19-.67a13.24,13.24,0,0,0,2-1.08,7.27,7.27,0,0,0,1.65-1.2,7.11,7.11,0,0,0,1.43-3.82,8.37,8.37,0,0,0,.18-2.11A8.88,8.88,0,0,0,127.89,133.64Z" transform="translate(-1.08 -0.85)"/>
  </svg>`;
  }
  if (number == 0) {
    coins.innerText = 'Free';
  } else {
    coins.innerHTML = htmlString;
  }
};

const numberOfCoins = function () {
  // priceInput.addEventListener('click', updateNumberOfCoins);
  priceInput.addEventListener('change', updateNumberOfCoins);
};

function updateNumberOfCoins() {
  let htmlString = ``;
  const priceValue = priceInput.value;

  for (let i = 0; i < priceValue; i++) {
    htmlString += ` <svg class="c-coin" id="Coin" data-name="Coin" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 197.59 197.59">
    <circle class="c-coin-rand" id="Rand"  cx="98.8" cy="98.8" r="98.8"/>
    <circle class="c-coin-background" id="background"  cx="99" cy="99.01" r="76.61"/>
    <path class="c-coin-euro" id="euro" d="M127.89,133.64a3.43,3.43,0,0,0-.51-.87,3,3,0,0,0-1-.72,9,9,0,0,0-4.83-.87,20.53,20.53,0,0,0-3.26.84c-1.55.4-3.12.75-4.7,1a46.56,46.56,0,0,1-12.25.59,32,32,0,0,1-13.14-4A31.42,31.42,0,0,1,76.9,118v-.54s26.33,0,26.33,0h2.43a6.26,6.26,0,0,0,0-12.52h-2.43v-.11H72V94.22q16.89.11,33.92.12c.46-.09.92-.17,1.38-.28l.42-.08a2.14,2.14,0,0,1,.35-.19l.78-.41A12,12,0,0,0,110,92.07a6.23,6.23,0,0,0,.11-8.91l-.3-.21a6.7,6.7,0,0,0-2.26-1.4,12.43,12.43,0,0,0-1.93-.49H77.16c11.13-17.62,28.31-17.13,37.92-15.13a4.06,4.06,0,0,1,1.14.19c.75.25,1.52.43,2.27.69a12.54,12.54,0,0,1,2.21,1L121,68a4.47,4.47,0,0,0,3.54-.18,8.2,8.2,0,0,0,3.72-3,6.15,6.15,0,0,0,.91-4.64,8.36,8.36,0,0,0-1.71-3.27,4.3,4.3,0,0,0-1.2-1.13,8.86,8.86,0,0,1-1-.54L125,55a14.7,14.7,0,0,1-1.68-.73c-.71-.24-1.43-.48-2.17-.69a52.45,52.45,0,0,0-13.72-1.81C86.54,51.77,68.65,64,61.11,81.3h-6a6.26,6.26,0,1,0,0,12.51h2.59a46.92,46.92,0,0,0-.38,5.83,45.89,45.89,0,0,0,.31,5.27H55.08a6.26,6.26,0,1,0,0,12.52h5.8c7.4,17.63,25.44,30.08,46.54,30.08a53,53,0,0,0,9.57-.87c1.51-.28,3-.63,4.51-1,.73-.2,1.48-.4,2.19-.67a13.24,13.24,0,0,0,2-1.08,7.27,7.27,0,0,0,1.65-1.2,7.11,7.11,0,0,0,1.43-3.82,8.37,8.37,0,0,0,.18-2.11A8.88,8.88,0,0,0,127.89,133.64Z" transform="translate(-1.08 -0.85)"/>
  </svg>`;
  }
  if (priceValue == '0') {
    htmlString = ` <svg class=" o-hide-accessible c-coin" id="Coin" data-name="Coin" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 197.59 197.59">
    <circle class="c-coin-rand" id="Rand"  cx="98.8" cy="98.8" r="98.8"/>
    <circle class="c-coin-background" id="background"  cx="99" cy="99.01" r="76.61"/>
    <path class="c-coin-euro" id="euro" d="M127.89,133.64a3.43,3.43,0,0,0-.51-.87,3,3,0,0,0-1-.72,9,9,0,0,0-4.83-.87,20.53,20.53,0,0,0-3.26.84c-1.55.4-3.12.75-4.7,1a46.56,46.56,0,0,1-12.25.59,32,32,0,0,1-13.14-4A31.42,31.42,0,0,1,76.9,118v-.54s26.33,0,26.33,0h2.43a6.26,6.26,0,0,0,0-12.52h-2.43v-.11H72V94.22q16.89.11,33.92.12c.46-.09.92-.17,1.38-.28l.42-.08a2.14,2.14,0,0,1,.35-.19l.78-.41A12,12,0,0,0,110,92.07a6.23,6.23,0,0,0,.11-8.91l-.3-.21a6.7,6.7,0,0,0-2.26-1.4,12.43,12.43,0,0,0-1.93-.49H77.16c11.13-17.62,28.31-17.13,37.92-15.13a4.06,4.06,0,0,1,1.14.19c.75.25,1.52.43,2.27.69a12.54,12.54,0,0,1,2.21,1L121,68a4.47,4.47,0,0,0,3.54-.18,8.2,8.2,0,0,0,3.72-3,6.15,6.15,0,0,0,.91-4.64,8.36,8.36,0,0,0-1.71-3.27,4.3,4.3,0,0,0-1.2-1.13,8.86,8.86,0,0,1-1-.54L125,55a14.7,14.7,0,0,1-1.68-.73c-.71-.24-1.43-.48-2.17-.69a52.45,52.45,0,0,0-13.72-1.81C86.54,51.77,68.65,64,61.11,81.3h-6a6.26,6.26,0,1,0,0,12.51h2.59a46.92,46.92,0,0,0-.38,5.83,45.89,45.89,0,0,0,.31,5.27H55.08a6.26,6.26,0,1,0,0,12.52h5.8c7.4,17.63,25.44,30.08,46.54,30.08a53,53,0,0,0,9.57-.87c1.51-.28,3-.63,4.51-1,.73-.2,1.48-.4,2.19-.67a13.24,13.24,0,0,0,2-1.08,7.27,7.27,0,0,0,1.65-1.2,7.11,7.11,0,0,0,1.43-3.82,8.37,8.37,0,0,0,.18-2.11A8.88,8.88,0,0,0,127.89,133.64Z" transform="translate(-1.08 -0.85)"/>
  </svg>
  <p  class="o-free">Free</p>`;
  }
  amount = priceValue;
  checkboxCoins.innerHTML = htmlString;
}
const numberOfParts = function () {
  // priceInput.addEventListener('click', updateNumberOfCoins);
  partsInput.addEventListener('change', updateNumberOfParts);
};
function updateNumberOfParts() {
  let htmlString = ``;
  const partsValue = partsInput.value;
  for (let i = 0; i < partsValue; i++) {
    htmlString += `<svg class=" c-person" id="Person" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 98.44 85.57">
      <circle id="Head" class="cls-1" cx="52.13" cy="28.59" r="18.97" transform="translate(-5.56 3.12) rotate(-13.28)"/>
      <path id="Body" class="cls-1" d="M96.94,31.06a10.85,10.85,0,0,0-3.15-2.89,5.57,5.57,0,0,0-4.18-.44l-.45.06a2.74,2.74,0,0,0-.65.29,2.28,2.28,0,0,0-.9.37,3.86,3.86,0,0,0-.57.3,1.76,1.76,0,0,0-.34.25A8.46,8.46,0,0,0,85,30.13a3.79,3.79,0,0,0-.34.2,4.28,4.28,0,0,1-.81.78,3.56,3.56,0,0,1-.76.74L82.19,33c-.11.13-.2.26-.31.38-3.41,3.22-6.14,7-9.49,10.34A48.47,48.47,0,0,1,66,49c-.32.22-.69.5-1.08.79l-.49.22c-2.39,1.18-4.49,2.37-7.1,2.81-1.51.26-3,.49-4.42.66h-.23a23.43,23.43,0,0,1-15-5,5.31,5.31,0,0,0-.95-.57l-.21-.19a6.34,6.34,0,0,1-.79-.57c.84.71-.09,0-.3-.2s-.68-.47-1-.71L34,45.83c-.16-.11-.33-.23-.49-.36-.8-.65-1.58-1.33-2.34-2a4.37,4.37,0,0,1-1.07-1.16h0a15.59,15.59,0,0,0-1.87-2.1c-.89-.93-1.77-1.86-2.64-2.8-.7-.76-1.37-1.54-2.05-2.31A22.94,22.94,0,0,0,22,33.3c-.43-.47-.9-.9-1.3-1.39,0-.05-.09-.12-.14-.18s0,0-.1-.12l.06.07a.52.52,0,0,0-.1-.11l0,0,0,0L20,31c-.17-.23-.34-.45-.52-.66a2.64,2.64,0,0,1-.57-.53c-.31-.38-.65-.74-1-1.11l-.31-.25a.71.71,0,0,0-.08-.15c-.33-.34-.66-.68-1-1l0,0c-.31-.37-.62-.75-.94-1.11-.86-.66-1.7-1.34-2.55-2a2.78,2.78,0,0,1-.43-.41,11.7,11.7,0,0,0-4.14-2A8.69,8.69,0,0,0,1.14,26a6.45,6.45,0,0,0,.37,6.65,4.75,4.75,0,0,1,.78,1.06l.2.17.2.16.43.54.09.13.1.1c1.65,2,3.3,4.06,5,6C9.27,41.94,10.26,43,11.19,44c.21.24.4.48.61.71l0,0,.06.09.27.38q.26.38.48.78h0a4.52,4.52,0,0,1,1,1.37,4.93,4.93,0,0,1,.69.89l0,0a51.18,51.18,0,0,1,4.17,6.19,4.71,4.71,0,0,1,.89,1.61,4.73,4.73,0,0,1,.64,1,3.35,3.35,0,0,1,.51.95c.08.12.15.25.22.38a14.48,14.48,0,0,1,.9,1.31c.66,1.15,1.21,2.28,1.94,3.39a23.69,23.69,0,0,1,2.67,5c.22.4.43.8.62,1.22a94.93,94.93,0,0,1,3.8,9.66,11.83,11.83,0,0,1,.87,4.27,9.33,9.33,0,0,1,.09,2.11c0,.34-.08.67-.14,1s0,.52,0,.79c-.18,1.54-.53,3-.79,4.58l0,.18v0a2.51,2.51,0,0,0,0,.55h-.07c-.13.79-.26,1.59-.43,2.37h2.41a2,2,0,0,0,.5.07q15.47.33,30.93,0l.34,0,.49,0a10.33,10.33,0,0,1,1.67,0l.16,0H69.5V92.6h0a2,2,0,0,0,.05-.34c-.07-.46-.12-.92-.16-1.39a4.22,4.22,0,0,1-.07-.61l0-.56a5.35,5.35,0,0,1-.07-.7c0-.24,0-.48,0-.72v-.13a4,4,0,0,1,0-.5,18.82,18.82,0,0,1,0-2.13c0-.47.07-.93.13-1.38A18.11,18.11,0,0,1,71,76.94a34.63,34.63,0,0,1,3.47-6.5,76.91,76.91,0,0,1,6-9,41,41,0,0,1,5.75-7,6,6,0,0,1,.88-1.23c.54-.57,1.21-1.06,1.8-1.58l.32-.27a3.22,3.22,0,0,1,.28-.24c.12-.17.24-.33.37-.49A22.32,22.32,0,0,1,92,48.42a32.59,32.59,0,0,1,2.47-2.92c.85-.88,1.68-1.83,2.53-2.75.08-.17.14-.34.23-.5.2-.34.38-.68.56-1v0c0-.11.07-.22.11-.33l0,0a9.1,9.1,0,0,0,.42-1,7.85,7.85,0,0,0,.26-1,10,10,0,0,0,.17-1.22c0-.07,0-.15,0-.22s0-.06,0-.1a.27.27,0,0,0,0-.09,8.59,8.59,0,0,0,.08-1.13A8.24,8.24,0,0,0,96.94,31.06Z" transform="translate(-0.39 -9.63)"/>
    </svg>`;
  }
  amount = partsValue;
  console.log(partsValue);
  person.innerHTML = htmlString;
}

let dotsload = document.querySelectorAll('.dots-load');
let delay = 0.1;
let tl = gsap.timeline({});
const jump = (el) => {
  tl.from(
    el,
    {
      repeat: -1,
      yoyo: true,
      duration: 0.5,
      ease: 'power1.in',
      translateY: -15,
      delay: delay,
    },
    '<'
  );
};
document.addEventListener('DOMContentLoaded', function () {
  // 1 We will query the API with longitude and latitude.
  // getRandom()
  dotsload.forEach((dots) => {
    jump(dots, delay);
    //   delay -= 0.3;
  });
  topic = 'random';
  amount = '0';
  endPoint = 'http://www.boredapi.com/api/activity';
  checkboxBtns = document.querySelectorAll('.js-checkbox');
  checkboxCoins = document.querySelector('.js-coin');
  checkboxPersons = document.querySelector('.js-parts');
  priceInput = document.querySelector('.js-price-input');
  partsInput = document.querySelector('.js-parts-input');
  price = document.querySelector('.js-price');
  person = document.querySelector('.js-person');
  random = document.querySelector('.js-random');
  checkboxType = document.querySelectorAll('.js-checkbox-type');
  listType = document.querySelector('.js-type-list');
  label = document.qs;
  getRandom();
  isSelected();
  numberOfCoins();
  numberOfParts();
  updateNumberOfCoins();
  updateNumberOfParts();
});

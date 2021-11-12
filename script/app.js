// een nummer input toevoegen wanneer het verhhoogd wordt komt eer een munt bij
let redbutton = document.querySelector('.js-button');
redbutton.addEventListener('click', function () {
  console.log('veranert');
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
  const activity = document.querySelector('.js-activity');
  const loaderclass = document.querySelector('.js-dots');
  activity.classList.add('u-muted');
  loaderclass.classList.remove('u-muted');
  // Eerst bouwen we onze url op
  const endPoint = `http://www.boredapi.com/api/activity/`;
  // Met de fetch API proberen we de data op te halen.
  const random = await get(endPoint);
  activity.innerText = random.activity;
  if (activity != null) {
    loaderclass.classList.add('u-muted');
    activity.classList.remove('u-muted');
  }
};

const isSelected = async () => {
  for (const btn of radioBtns) {
    btn.addEventListener('click', function () {
      for (let i = 0; i < 3; i++) {
        radioBtns[i].classList.remove('c-select');
      }
      this.classList.add('c-select');
      console.log(btn.innerText);
    });
  }
};

const numberOfCoins = function (){
  const priceInput = document.querySelector('.js-price-input')
  priceInput.addEventListener('click', function(){
    console.log('click')
  })
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
  radioBtns = document.querySelectorAll('.js-radio');
  radioCoins = document.querySelectorAll('.js-coin');
  getRandom();
  isSelected();
});

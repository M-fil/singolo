/*Navigation*/
function selectSingleElementFromList(element) {
    let selected = element.closest('ul').querySelectorAll('.selected');
    for (const item of selected) {
        item.classList.remove('selected');
    }
    element.classList.add('selected');
}

const anchors = document.querySelectorAll('.header-navigation-item a');
let headerNavigationList = document.querySelector('.header-navigation');

headerNavigationList.addEventListener('click', (event) => {
    if (event.target.parentElement.tagName !== 'LI') return;

    selectSingleElementFromList(event.target.parentElement);

    const blockId = document.querySelector(`[data-scrollid=${event.target.getAttribute('href').slice(1)}]`);
    blockId.scrollIntoView({block: 'center', behavior: 'smooth'});
});

/*Slider*/

const sliderBlock = document.querySelector('.slider');
const slidesContainer = document.querySelector('.slider-content');

const prevButton = sliderBlock.querySelector('.prev');
const nextButton = sliderBlock.querySelector('.next');

const firstSlide = `
<div class="first-slide">
    <img src="assets/phone1.png" alt="" class="slider-content-item">
    <img src="assets/phone2.png" alt="" class="slider-content-item">
</div>`;

const secondSlide = `
<div class="second-slide">
    <img src="assets/slider-content-center.png" alt="">
    <img src="assets/slider-content-left.png" alt="">
    <img src="assets/slider-content-right.png" alt="">
</div>`;

const list = [firstSlide, secondSlide];
let current = 0;
let length = list.length - 1;

nextButton.parentElement.addEventListener('click', () => {
    current = current < length ? current + 1 : 0;
    slidesContainer.innerHTML = list[current]

    /*if (current === 1) {
        sliderBlock.classList.add('second-slide')
        sliderBlock.style.backgroundColor = '#648BF0';
    } else {
        sliderBlock.classList.remove('second-slide')
        sliderBlock.style.backgroundColor = '#ea676b';
    }*/
});

prevButton.parentElement.addEventListener('click', () => {
    current = current > 0 ? current - 1 : length;
    slidesContainer.innerHTML = list[current];

    /*if (current === 1) {
        sliderBlock.classList.add('second-slide')
        sliderBlock.style.backgroundColor = '#648BF0';
    } else {
        sliderBlock.classList.remove('second-slide')
        sliderBlock.style.backgroundColor = '#ea676b';
    }*/
});

//const firstSlide = slidesContainer.querySelector('.first-slide');
//const secondSlide = slidesContainer.querySelector('.second-slide');

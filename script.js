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
    <img class="slider-content-item" src="assets/phone1.png" alt="">
    <img class="slider-content-item" src="assets/phone2.png" alt="">
</div>`;

const secondSlide = `
<div class="second-slide">
    <img class="slider-content-item" src="assets/slider-content-center.png" alt="">
    <img class="slider-content-item" src="assets/slider-content-side.png" alt="">
    <img class="slider-content-item" src="assets/slider-content-side.png" alt="">
</div>`;

const list = [firstSlide, secondSlide];
let current = 0;
let length = list.length - 1;

nextButton.parentElement.addEventListener('click', () => {
    current = current < length ? current + 1 : 0;
    slidesContainer.innerHTML = list[current];
});

prevButton.parentElement.addEventListener('click', () => {
    current = current > 0 ? current - 1 : length;
    slidesContainer.innerHTML = list[current];
});

const firstSlideElement = slidesContainer.querySelector('.first-slide');
const secondSlideElement = slidesContainer.querySelector('.second-slide');

function getPhoneImage(elem) {
    let noScreenScr = elem.getAttribute('src').replace(/.png/g, '-no-screen.png');
    let withScreenSrc = elem.getAttribute('src').replace(/-no-screen.png/g, '.png');

    if (elem.classList.contains('no-screen')) {
        elem.setAttribute('src', withScreenSrc);
    } else {
        elem.setAttribute('src', noScreenScr);
    }
}

if (document.body.contains(firstSlideElement)) {
    document.addEventListener('click', (event) => {
        if (event.target.tagName !== "IMG") return;
    
        getPhoneImage(event.target)
    
        event.target.classList.toggle('no-screen');
    })    
}


/*Portfolio Tabs*/
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let swap = array[i];
        array[i] = array[j];
        array[j] = swap;
    }

    return array;
}

const portfolioBlock = document.querySelector('.portfolio');

const badgesContainer = portfolioBlock.querySelector('.badges');
const badges = badgesContainer.querySelectorAll('.item');

const portfolioImagesContainer = portfolioBlock.querySelector('.images')
const portfolioImages = portfolioImagesContainer.querySelectorAll('.image-item');


const fullArray = (array) => {
    for (let i = 0; i < 12; i++) {
        array.push(i);
    }

    return array;
};
const imagesArray = fullArray([]);

const getItemImageTemplate = (n) => {
    return `
    <div class="image-item">
        <img src="assets/portfolio-image-${n + 1}.png" alt="" data-number=${n + 1}>
    </div>`;
}


badgesContainer.addEventListener('click', (event) => {
    if (event.target.className !== 'item') return;

    portfolioImagesContainer.innerHTML = '';

    selectSingleElementFromList(event.target);
    shuffle(imagesArray);

    for (let i = 0; i < imagesArray.length; i++) {
        portfolioImagesContainer.innerHTML += getItemImageTemplate(imagesArray[i]);
    }
});



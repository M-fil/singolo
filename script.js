window.onload = () => {
    console.log('Singolo. DOM & Responsive');

    activateNavigation('header__navigation');
    activateBurgerNavigation();
    activateSlider();
    activatePhonesScreens();
    activatePortfolioTabs();
    activateModalWindow();
}

/*Navigation*/
const activateNavigation = (type) => {
    let headerNavigationList = document.querySelector(`.${type} .navigation`);
    
    document.addEventListener('scroll', () => {
        changeSelectedLinkByScrollPosition();
    })
    
    headerNavigationList.addEventListener('click', (event) => {
        if (event.target.parentElement.tagName !== 'LI') return;
        
        const blockId = document.querySelector(`[data-scrollid=${event.target.getAttribute('href').slice(1)}]`);
        blockId.scrollIntoView({block: 'start', behavior: 'smooth'});
    });
}

function selectSingleElementFromList(element, html, selectedClass) {
    let selected = element.closest(html).querySelectorAll(`.${selectedClass}`);
    for (const item of selected) {
        item.classList.remove(selectedClass);
    }
    element.classList.add(selectedClass);
}

const changeSelectedLinkByScrollPosition = () => {
    const navLinks = document.querySelectorAll('.navigation__link');

    const currentPositionY = window.scrollY;
    const pageSectionsOfNavigation = document.querySelectorAll('[data-scrollid]');

    pageSectionsOfNavigation.forEach(section => {
        if ((section.offsetTop - 150) <= currentPositionY) {
            navLinks.forEach(link => {
                link.classList.remove('link_selected')
                if (section.dataset.scrollid === link.firstElementChild.getAttribute('href').slice(1)) {
                    link.classList.add('link_selected');
                }
            })
        }
    });
}

/*Burger Navigation*/
const activateBurgerNavigation = () => {
    activateNavigation('burger__navigation');

    const burgerButton = document.querySelector('.header__burger');
    const burgerNavigation = document.querySelector('.burger__navigation');
    const headerTitle = document.querySelector('.header__title');
    const overlay = document.querySelector('.overlay');

    burgerButton.addEventListener('click', () => {
        burgerNavigation.classList.toggle('open_navigation');
        burgerButton.classList.toggle('rotated');
        headerTitle.classList.toggle('moved');
        overlay.classList.toggle('show-overlay');
    });
}

/*Slider*/
const sliderBlock = document.querySelector('.slider');
const slidesContainer = document.querySelector('.slider__content');

const activateSlider = () => {
    const prevButton = sliderBlock.querySelector('.prev-button_container');
    const nextButton = sliderBlock.querySelector('.next-button_container');
    
    let current = 0;
    let length = slidesContainer.childElementCount - 1;
    let offset = 0;
    const calculatedOffest = 100 / slidesContainer.children.length;

    nextButton.addEventListener('click', () => {
        if (current === length) {
            offset = 0;
            current = 0;
        }
        else {
            offset += calculatedOffest;
            current++;
        }
        slidesContainer.style.transform = `translate(-${offset}%)`
    });
    
    prevButton.addEventListener('click', () => {
        if (current === 0) {
            offset = -length * calculatedOffest;
            current = length;
        }
        else {
            offset += calculatedOffest; 
            current--;
        }
        slidesContainer.style.transform = `translate(${offset}%)`
    });
}

const setSliderStyles = () => {
    switch(slidesContainer.firstElementChild.className) {
        case 'first_slide': setColors('#f06c64', '#ea676b');
        break;
        case 'second_slide': setColors('#648bf0');
        break;
        default: setColors('#f06c64', '#ea676b');
    }
}

const setColors = (backgroundColor, borderColor) => {
    sliderBlock.style.backgroundColor = backgroundColor;
    sliderBlock.style.borderColor = borderColor ? borderColor : backgroundColor;
}

/*Screens of Smartphones*/
const activatePhonesScreens = () => {
    sliderBlock.addEventListener('click', (event) => {
        if (event.target.tagName !== "IMG") return;

        getPhoneImage(event.target);

        event.target.classList.toggle('no-screen');
    });
}

function getPhoneImage(elem) {
    let noScreenScr = elem.getAttribute('src').replace(/.png/g, '-no-screen.png');
    let withScreenSrc = elem.getAttribute('src').replace(/-no-screen.png/g, '.png');

    if (elem.classList.contains('no-screen')) {
        elem.setAttribute('src', withScreenSrc);
    } else {
        elem.setAttribute('src', noScreenScr);
    }
}

/*Portfolio Tabs*/
const portfolioBlock = document.querySelector('.portfolio');
const portfolioImagesContainer = portfolioBlock.querySelector('.portfolio__images')

const activatePortfolioTabs = () => {
    const tabsContainer = portfolioBlock.querySelector('.portfolio__tabs');
        
    const imagesArray = fullArrayWithNumbers();
    
    tabsContainer.addEventListener('click', (event) => {
        if (event.target.className !== 'tab') return;
    
        portfolioImagesContainer.innerHTML = '';
    
        selectSingleElementFromList(event.target, 'ul', 'tab_selected');
        shuffle(imagesArray);
    
        imagesArray.forEach(image => {
            portfolioImagesContainer.innerHTML += getItemImageTemplate(image)
        });
    });
    
    portfolioImagesContainer.addEventListener('click', (event) => {
        if (event.target.tagName !== "IMG") return;
    
        selectSingleElementFromList(event.target, '.portfolio__images', 'image_selected');  
    });
}

const getItemImageTemplate = (n) => {
    return `
    <div class="image">
        <img src="assets/portfolio-image-${n + 1}.png" alt="" data-number=${n + 1}>
    </div>`;
}

function fullArrayWithNumbers() {
    const array = [];
    for (let i = 0; i < portfolioImagesContainer.childElementCount; i++) {
        array.push(i);
    }
    return array;
};

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let swap = array[i];
        array[i] = array[j];
        array[j] = swap;
    }

    return array;
}

/*Form*/
const activateModalWindow = () => {
    const modal = document.querySelector('.modal');
    const modalContainer = document.querySelector('.modal__container');
    const themeContent = modalContainer.querySelector('.message_theme .content');
    const descriptionContent = modalContainer.querySelector('.message_description .content');
    const confirmButton = modal.querySelector('.message__button');
    
    const formContainer = document.querySelector('.get-quote__form form');
    const nameField = formContainer.querySelector('.name_field');
    const emailField = formContainer.querySelector('.email_field');
    const subjectField = formContainer.querySelector('.subject_field');
    const commentField = formContainer.querySelector('.comment_field');
    
    formContainer.addEventListener('submit', (event) => {
        event.preventDefault();
    
        modal.classList.remove('hidden');
        themeContent.textContent = subjectField.value.trim() !== '' ? subjectField.value : 'Без темы';
        descriptionContent.textContent = commentField.value.trim() !== '' ? commentField.value : 'Без описания';
    
        document.body.style.overflow = 'hidden';
    });
    
    confirmButton.addEventListener('click', () => {
        modal.classList.add('hidden');
        document.body.style.overflow = 'initial';
    
        nameField.value = '';
        emailField.value = '';
        subjectField.value = '';
        commentField.value = '';
    });
    
}
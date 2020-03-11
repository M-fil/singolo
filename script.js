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

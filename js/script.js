'use strict';

function titleClickHandler(event) {
    event.preventDefault();
    console.log(event);
    const clickedElement = this;
    const activeLinks = document.querySelectorAll('.titles a.active'); /* [Done] remove class 'active' from all article links  */
    for (let activeLink of activeLinks) {
        activeLink.classList.remove('active');
    }
    clickedElement.classList.add('active'); /* [Done] add class 'active' to the clicked link */
    const activeArticles = document.querySelectorAll('article.active'); /* [Done] remove class 'active' from all articles */
    for (let activeArticle of activeArticles) {
        activeArticle.classList.remove('active');
    }
    const articleSelector = clickedElement.getAttribute("href"); /* [Done] get 'href' attribute from the clicked link */
    const targetArticle = document.querySelector(articleSelector); /* [Done] find the correct article using the selector (value of 'href' attribute) */
    targetArticle.classList.add('active') /* [Done] add class 'active' to the correct article */
}
const links = document.querySelectorAll('.titles a');
for (let link of links) {
    link.addEventListener('click', titleClickHandler);
}

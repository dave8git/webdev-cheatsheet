'use strict';

function titleClickHandler(event){
  console.log(event);
  const clickedElement = this;
 const activeLinks = document.querySelectorAll('.titles a.active'); /* [Done] remove class 'active' from all article links  */
 for(let activeLink of activeLinks) {
     activeLink.classList.remove('active'); 
 }

 console.log(clickedElement);
 clickedElement.classList.add('active'); /* [Done] add class 'active' to the clicked link */
 

  const activeArticles = document.querySelectorAll('article.active'); /* [Done] remove class 'active' from all articles */
  for(let activeArticle of activeArticles) {
      activeArticle.classList.remove('active');
  }
  /* get 'href' attribute from the clicked link */

  /* find the correct article using the selector (value of 'href' attribute) */

  /* add class 'active' to the correct article */
}

const links = document.querySelectorAll('.titles a');

for(let link of links){
  link.addEventListener('click', titleClickHandler);
}

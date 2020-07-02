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
  const articleSelector = clickedElement.getAttribute('href'); /* [Done] get 'href' attribute from the clicked link */
  const targetArticle = document.querySelector(articleSelector); /* [Done] find the correct article using the selector (value of 'href' attribute) */
  targetArticle.classList.add('active'); /* [Done] add class 'active' to the correct article */
}


const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author';

function generateTitleLinks(customSelector = '') {
  console.log('custom selector', customSelector);
  document.querySelector(optTitleListSelector).innerHTML = ''; /* remove contents of titleList */
  console.log('optArticleSelector', optArticleSelector);
  
  const articles = document.querySelectorAll(optArticleSelector + customSelector); /* for each article */
  
  for (let article of articles) {
    
    const articleId = article.getAttribute('id'); /* get the article id */
    
    const articleTitle = article.querySelector(optTitleSelector).innerHTML; /* find the title element */ /* get the title from the title element */
    
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>'; /* create HTML of the link */

    const titleList = document.querySelector(optTitleListSelector); /* insert link into titleList */

    titleList.insertAdjacentHTML('beforeend', linkHTML);
    
  }
  const links = document.querySelectorAll('.titles a');
  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  } 

}
generateTitleLinks();

function generateTags(){
  const articles = document.querySelectorAll(optArticleSelector); /* find all articles */
  
  for (let article of articles) {/* START LOOP: for every article: */
  
    const tagsWrapper = article.querySelector(optArticleTagsSelector); /* find tags wrapper */
  
    let linkHTML =  ''; /* make html variable with empty string */
  
    const tags = article.getAttribute('data-tags'); /* get tags from data-tags attribute */
  
    const articleTagsArray = tags.split(' '); /* split tags into array */
  
    for (let tag of articleTagsArray) {/* START LOOP: for each tag */
  
      const linkTagHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li> '; /* generate HTML of the link */
  
      linkHTML += linkTagHTML;/* add generated code to html variable */
      console.log('linkHTML', linkHTML);
  
    }/* END LOOP: for each tag */
  
    tagsWrapper.insertAdjacentHTML('beforeend', linkHTML);/* insert HTML of all the links into the tags wrapper */
  
  }/* END LOOP: for every article: */
}
  
generateTags();

function tagClickHandler(event){
  event.preventDefault(); /* prevent default action for this event */
  
  const clickedElement = this; /* make new constant named "clickedElement" and give it the value of "this" */
  
  const href = clickedElement.getAttribute('href'); /* make a new constant "href" and read the attribute "href" of the clicked element */
  
  const tag = href.replace('#tag-', '');/* make a new constant "tag" and extract tag from the "href" constant */
  
  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');/* find all tag links with class active */
  
  for (let activeTag of activeTags) {/* START LOOP: for each active tag link */
  
    activeTag.classList.remove('active'); /* remove class active */
  
  }/* END LOOP: for each active tag link */
  
  const foundTagLinks = document.querySelectorAll('a[href="' + href + '"]');/* find all tag links with "href" attribute equal to the "href" constant */
 
  for (let foundTagLink of foundTagLinks) {  /* START LOOP: for each found tag link */
  
    foundTagLink.classList.add('active');/* add class active */
  
  }/* END LOOP: for each found tag link */

  generateTitleLinks('[data-tags~="' + tag + '"]'); /* execute function "generateTitleLinks" with article selector as argument */
}


function addClickListenersToTags(){
  const tagLinks = document.querySelectorAll('.post-tags .list a'); /* find all links to tags */
  
  for (let tag of tagLinks) {  /* START LOOP: for each link */
  
    tag.addEventListener('click', tagClickHandler); /* add tagClickHandler as event listener for that link */
  
  }/* END LOOP: for each link */
}
  
addClickListenersToTags();


function generateAuthors() {
  const articles = document.querySelectorAll(optArticleSelector); /* find all articles */
  for (let article of articles) {
    const authorWrapper = article.querySelector(optArticleAuthorSelector);
    let linkHTML = '';
    const author = article.getAttribute('data-author');
    linkHTML = '<a href="#author-' + author + '">' + author + '</a>';
    authorWrapper.insertAdjacentHTML('beforeend', linkHTML);
  }
}
generateAuthors(); 

function authorClickHandler(event) {
  event.preventDefault(); 
  const clickedElement = this;
  console.log(clickedElement);
  const href = clickedElement.getAttribute('href');
  console.log(href);
  const activeAuthors = document.querySelectorAll('a.active[href="#author-"]'); 
  const author = href.replace('#author-', '');/* make a new constant "tag" and extract tag from the "href" constant */
  for (let activeAuthor of activeAuthors) {
    activeAuthor.classList.remove('active');
  }
  const foundAuthorLinks = document.querySelectorAll('a[href="' + href + '"]'); 
  for (let foundAuthorLink of foundAuthorLinks) {
    foundAuthorLink.classList.add('active');
  }
  generateTitleLinks('[data-author="' + author + '"]');
}

function addClickListenersToAuthors() {
  const authorLinks = document.querySelectorAll('.post-author a'); 
  for (let authorLink of authorLinks) {
    authorLink.addEventListener('click', authorClickHandler);
  }
}

addClickListenersToAuthors();
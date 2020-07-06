'use strict';

const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  tagCloudAuthors: Handlebars.compile(document.querySelector('#template-author-cloud-link').innerHTML)
};

const opts = {
  tagSizes: {
    count: 5,
    classPrefix: 'tag-size-'
  },
  articleSelector: {
    article: '.post',
    tag: '.post-tags .list',
    author: '.post-author',
  },
  titleSelector: {
    post: '.post-title',
  },
  listSelector: {
    title: '.titles',
    tags: '.tags.list',
    authors: '.authors'
  }
};

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

function generateTitleLinks(customSelector = '') {
  console.log('custom selector', customSelector);
  document.querySelector(opts.listSelector.title).innerHTML = ''; /* remove contents of titleList */
  
  const articles = document.querySelectorAll(opts.articleSelector.article + customSelector); /* for each article */
  
  for (let article of articles) {
    
    const articleId = article.getAttribute('id'); /* get the article id */
    
    const articleTitle = article.querySelector(opts.titleSelector.post).innerHTML; /* find the title element */ /* get the title from the title element */
    
    // const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>'; /* create HTML of the link */
    const linkHTMLData = {id: articleId, title: articleTitle};
    const linkHTML = templates.articleLink(linkHTMLData); 


    const titleList = document.querySelector(opts.listSelector.title); /* insert link into titleList */

    titleList.insertAdjacentHTML('beforeend', linkHTML);
    
  }
  const links = document.querySelectorAll('.titles a');
  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  } 

}
generateTitleLinks();

function calculateTagsParams(tags) {
  const params = {
    max: 0,
    min: 999999
  };
  for (let tag in tags){
    if (tags[tag] > params.max) {
      params.max = tags[tag];
    }
    if (tags[tag] < params.min) {
      params.min = tags[tag];
    }
    console.log(tag + ' is used ' + tags[tag] + ' times');
  }
  return params;
}

function calculateTagClass(count, params) {
  const classNumber = Math.floor( ( (count - params.min) / (params.max - params.min) ) * opts.tagSizes.count + 1 );
  return classNumber;
}

function generateTags(){
  let allTags = {}; /* [NEW] create a new variable allTags with an empty object */

  const articles = document.querySelectorAll(opts.articleSelector.article); /* find all articles */
  
  for (let article of articles) {/* START LOOP: for every article: */
  
    const tagsWrapper = article.querySelector(opts.articleSelector.tag); /* find tags wrapper */
  
    let linkHTML =  ''; /* make html variable with empty string */
  
    const tags = article.getAttribute('data-tags'); /* get tags from data-tags attribute */
  
    const articleTagsArray = tags.split(' '); /* split tags into array */
  
    for (let tag of articleTagsArray) {/* START LOOP: for each tag */
  
      // const linkTagHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li> '; /* generate HTML of the link */
      const linkTagData = {id: tag, title: tag};
      const linkTagHTML = templates.tagLink(linkTagData); 
  
      linkHTML += linkTagHTML;/* add generated code to html variable */
      console.log('linkHTML', linkHTML); // eslint-disable-next-line
      if(!allTags.hasOwnProperty(tag)) { /* [NEW] check if this link is NOT already in allTags */
        allTags[tag] = 1; /* [NEW] add generated code to allTags array */
      } else {
        allTags[tag]++;
      }
    }/* END LOOP: for each tag */
  
    tagsWrapper.insertAdjacentHTML('beforeend', linkHTML);/* insert HTML of all the links into the tags wrapper */
  
  }/* END LOOP: for every article: */
  const tagList = document.querySelector('.tags'); /* [NEW] find list of tags in right column */

  //tagList.innerHTML = allTags.join(' '); /* [NEW] add html from allTags to tagList */
  console.log(allTags);
  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams:', tagsParams);

  // let allTagsHTML = ''; /* [NEW] create variable for all linksHTML code */
  const allTagsData = {tags: []};
  for (let tag in allTags) { /* [NEW] START LOOP: for each tag in allTags: */
    // allTagsHTML += '<li><a class="' + opts.tagSizes.classPrefix + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag + '">'  + tag +  /*' (' + allTags[tag] + ')'  + */ '</a></li> ';  
    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: opts.tagSizes.classPrefix + calculateTagClass(allTags[tag], tagsParams),
    });
  } /* [NEW] END LOOP: for each tag in allTags: */
  tagList.innerHTML = templates.tagCloudLink(allTagsData); /* [NEW] add html from allTagsHTML to tagList */
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
  const tagLinks = document.querySelectorAll('a[href^="#tag-"]'); /* find all links to tags */
  
  for (let tag of tagLinks) {  /* START LOOP: for each link */
  
    tag.addEventListener('click', tagClickHandler); /* add tagClickHandler as event listener for that link */
  
  }/* END LOOP: for each link */
}
  
addClickListenersToTags();


function generateAuthors() {
  let allAuthors = {};
  const articles = document.querySelectorAll(opts.articleSelector.article); /* find all articles */
  for (let article of articles) {
    const authorWrapper = article.querySelector(opts.articleSelector.author);
    // let linkHTML = '';
    const author = article.getAttribute('data-author');
    // linkHTML = '<a href="#author-' + author + '">' + author + '</a>';
    const authorHTMLData = {id: author, title: author};
    const authorHTML = templates.authorLink(authorHTMLData);
    // eslint-disable-next-line
    if(!allAuthors.hasOwnProperty(author)) { /* [NEW] check if this link is NOT already in allTags */
      allAuthors[author] = 1; /* [NEW] add generated code to allTags array */
    } else {
      allAuthors[author]++;
    }
    console.log(allAuthors);
    authorWrapper.insertAdjacentHTML('beforeend', authorHTML);
  }
  const authorList = document.querySelector(opts.listSelector.authors);

  let allAuthorsData = {authors: []};

  for (let author in allAuthors) {
    // allAuthorsHTML += '<a href="#author-' + author + '">' + author + ' ' + '(' + allAuthors[author] + ')'  + '</a>';
    allAuthorsData.authors.push({
      author: author,
      count: allAuthors[author],
    });

    //<a href="#author-' + author + '">' + author + ' ' + '(' + allAuthors[author] + ')'  + '</a>'
  }

  authorList.innerHTML = templates.tagCloudAuthors(allAuthorsData);
  

}
generateAuthors(); 

function authorClickHandler(event) {
  event.preventDefault(); 
  const clickedElement = this;
  console.log(clickedElement);
  const href = clickedElement.getAttribute('href');
  console.log(href);
  const author = href.replace('#author-', '');
  const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]'); 
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
  const authorLinks = document.querySelectorAll('a[href^="#author-"]'); 
  for (let authorLink of authorLinks) {
    authorLink.addEventListener('click', authorClickHandler);
  }
}

addClickListenersToAuthors();
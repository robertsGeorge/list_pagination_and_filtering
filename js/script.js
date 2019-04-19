/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

"use strict";

// select all student list items and store them in global variable
const list = document.querySelectorAll('.student-item');
// max number of students to display per page
const perPage = 10;

// From the list, only display those students on the pageNumber passed in
function showPage(list, pageNumber) {
    //page numbers start from 1 (not 0), so need to subtract perPage to get correct startIndex
    const startIndex = perPage * pageNumber - perPage; 
    const endIndex = perPage * pageNumber;
    // for each student list item, if their index position falls within the start/end range, display it
    for (let i = 0; i < list.length; i++) {
        if (i >= startIndex && i < endIndex) {
            list[i].style.display = '';
        } else {
            list[i].style.display = 'none';
        }
    }
}

// Dynamically create and append appropriate number of page links, attaching click event handler to each
function appendPageLinks(list) {
    // Create and append containers for page links (div and ul)
    const page = document.querySelector('.page');
    const div = document.createElement('div');
    const ul = document.createElement('ul');
    div.className = 'pagination'; // apply css to links
    div.appendChild(ul);
    page.appendChild(div);

    // Establish number of page links to generate. If 54 students in list, then 6 pages are needed, hence Math.ceil    
    const numOfPages = Math.ceil(list.length / perPage); 
    // for each page, generate and append a page link (li + nested a).
    for (let i = 1; i <= numOfPages; i++) {
        const li = document.createElement('li');
        const a = document.createElement('a');
        // give each link a number starting from 1, using variable i
        a.textContent = i;
        // take user to top of new page shown when they click a page link
        a.href = '#';
        li.appendChild(a);
        ul.appendChild(li);
    }

    // apply class 'active' and its styling to first page link, when appendPageLinks() is called
    const firstLink = ul.querySelector('a');
    firstLink.className = 'active';
    // show the first 10 students when appendPageLinks() is called, by passing 1 as pageNumber to showPage
    showPage(list, 1);
    
    // event listener added to parent ul, using event bubbling and event object to target link clicked
    // the event-handler/callback-function calls showPage() passing it the page number of link that was clicked, and resets/sets 'active' styling
    ul.addEventListener('click', (e) => {
        // select all page links as an iterable nodeList
        const links = ul.querySelectorAll('a');
        // when a link is clicked, remove className 'active' from previous active link
        links.forEach((link) => link.className = '');
        // make the clicked link the 'active' link
        e.target.className = 'active';
        // get pageNumber from clicked link to pass to showPage()
        const pageNumber = parseInt(e.target.textContent);
        // call showPage() to display the page corresponding to the link clicked
        showPage(list, pageNumber);
    });
}

appendPageLinks(list); 



function appendSearchComponent() {
    const pageHeader = document.querySelector('.page-header');
    const searchDiv = document.createElement('div');
    const searchInput = document.createElement('input');
    const searchButton = document.createElement('button');
    searchDiv.className = 'student-search';
    searchInput.placeholder = 'Search for students...';
    searchButton.textContent = 'Search';
    searchDiv.appendChild(searchInput);
    searchDiv.appendChild(searchButton);
    pageHeader.appendChild(searchDiv);
}
appendSearchComponent();

/* 
When the "Search" button is clicked, the list is filtered by student name 
for those that include the search value. 
For example, if the name Phillip is typed into the box, 
list all items with a name that includes Phillip. 
If the letter S is typed in, all items with an S in the name will show.
*/

// event listener listening for 'submit' button
// when search button is clicked, grab input.value - will be a string.
// make the string toLowerCase (all student names are in lower case)
// search through the list HTMLCollection for the input.value string
// IF the string is present in a list element's inner h3's textContent (li.querySelector..), set display to '';
    // -- how to search a string for a pattern? REGEX? ; 
               // str.match('searchstring') - When the parameter is a string or a number, it is implicitly converted to a RegExp by using new RegExp(obj).
// ELSE set display to 'none'.

const searchDiv = document.querySelector('.student-search');


searchDiv.addEventListener('click', (e) => {
    // const list_NodeList = document.querySelectorAll('.student-item')
    if (e.target.tagName === 'BUTTON') {
        const inputField = searchDiv.firstElementChild;
        const searchTerm = inputField.value.toLowerCase();
        // search each element's h3 textContent in list for searchTerm
        list.forEach((student) => {
            const studentName = student.querySelector('h3').textContent;
            if ( studentName.match(searchTerm) !== null ) {
                student.style.display = '';
            } else {
                student.style.display = 'none';
            }
        });
        // studentName = list[i].querySelector('h3').textContent
    }

});





// random testing
// const input = document.querySelector('input');
// console.log(input.value);
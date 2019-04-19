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



function appendSearchForm() {
    const pageHeader = document.querySelector('.page-header');
    const searchForm = document.createElement('form');
    const searchInput = document.createElement('input');
    const searchButton = document.createElement('button');
    searchForm.className = 'student-search';
    searchInput.type = 'text';
    searchInput.name = 'search-term';
    searchInput.placeholder = 'Search for students...';
    searchButton.type = 'submit';
    searchButton.name = 'submit';
    searchButton.value = 'submit';
    searchButton.textContent = 'Search';
    searchForm.appendChild(searchInput);
    searchForm.appendChild(searchButton);
    pageHeader.appendChild(searchForm);
}
appendSearchForm();



const searchForm = document.querySelector('.student-search');
const inputField = searchForm.firstElementChild;


function findMatchingStudents(list, searchTerm) {
    const listOfMatches = [];
    list.forEach((student) => {
        const studentName = student.querySelector('h3').textContent;
        if ( studentName.match(searchTerm) === null ) {
            student.style.display = 'none'; // eventually use showPage to set display?
        } else {
            student.style.display = '';  // eventually use showPage to set display?
            listOfMatches.push(student);
        }
    });
    return listOfMatches;
}

function removeCurrentPageLinks() {
    const page = document.querySelector('.page');
    const paginationDiv = document.querySelector('.pagination');
    page.removeChild(paginationDiv);
}


// listening for submit event on the form element means it can respond to button (see attributes) OR the input element (i.e. when user presses 'enter' on keyboard).
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchTerm = inputField.value.toLowerCase();
    const listOfMatches = findMatchingStudents(list, searchTerm);
    removeCurrentPageLinks();
    appendPageLinks(listOfMatches);
});

inputField.addEventListener('keyup', () => {
    const searchTerm = inputField.value.toLowerCase();
    const listOfMatches = findMatchingStudents(list, searchTerm);
    removeCurrentPageLinks();
    appendPageLinks(listOfMatches);
});


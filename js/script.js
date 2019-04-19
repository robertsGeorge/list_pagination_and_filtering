/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/



/***

 Dear Reviewer,

 Just to let you know I am trying for an 'Exceeds Expectations' grade (but happy to pass with a 'Meets Expectations' grade if my code falls short).

 Thanks in advance for your review!
 George

***/



"use strict";

// select all student list items and store them in global variable
const list = document.querySelectorAll('.student-item');
// max number of students to display per page
const perPage = 10;

// create and append h4 with no results message for if a search term returns no students
const listContainer = document.querySelector('.student-list');
const message = document.createElement('h4');
message.textContent = 'No matching students. Please try another search term.';
message.className = 'message'; // for styling the message
message.style.display = 'none'; // Not displayed unless turned on in findMatchingStudents()
listContainer.appendChild(message);


// From the list passed to it, only display those students on the pageNumber passed in
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
    // only create pagination links if there is more than 10 items to display
    if (numOfPages > 1) {
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
}

// used in search component EventHandlers, to avoid multiple sets of pagination links building up on the page
function removeCurrentPageLinks() {
    const page = document.querySelector('.page');
    const paginationDiv = document.querySelector('.pagination');
    page.removeChild(paginationDiv);
}

// dynamically build search component HTML: form element with input and button children
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

// take value user enters in search input, and find matches in list. 
// display matches, hide non-matches.
// if no matches, display the HTML message 'No matching students...' (see variables at top of script) 
function findMatchingStudents(list, searchTerm) {
    const listOfMatches = [];
    
    list.forEach((student) => {
        const studentName = student.querySelector('h3').textContent;
        
        if ( studentName.match(searchTerm) === null ) {
            student.style.display = 'none'; 
        } else {
            student.style.display = ''; 
            listOfMatches.push(student);
        }
    });
    if (listOfMatches.length === 0) {
        message.style.display = '';
    } else message.style.display = 'none';
    
    return listOfMatches;
}

// show the first 10 students when page initially loads, by passing 1 as pageNumber to showPage
showPage(list, 1);
appendPageLinks(list); 
appendSearchForm();

// The following two variables declared at this point, because selection is based off dynamically created elements generated by calling appendSearchForm()
// EventListeners are subsequently applied to these const variables.
const searchForm = document.querySelector('.student-search');
const inputField = searchForm.firstElementChild;

function filterAndPaginateViaSearch(list) {
    const searchTerm = inputField.value.toLowerCase();
    const listOfMatches = findMatchingStudents(list, searchTerm); 
    removeCurrentPageLinks();
    showPage(listOfMatches, 1); // start by showing the first page
    appendPageLinks(listOfMatches); // if there are more than 10 results
}

// filter the list as the user types in the search input field, and paginate the results 
inputField.addEventListener('keyup', () => { 
    // Even clearing search field by pressing delete key triggers a keyup event, so this callback runs again. In this case searchTerm will be an empty string. passing an empty string to findMatchingStudents() as its searchTerm parameter results in listOfMatches containing all students in the global 'list'. To then call showPage and appendPageLinks passing in listOfMatches is like running these functions on the global 'list' variable. So, when the user deletes their search entries, it's like reloading the program.
    filterAndPaginateViaSearch(list);
});
// Have kept 'submit' eventListener in addition to 'keyup' in case user pastes text in with mouse-clicks (no keyup event)
// Listening for submit event on the parent form element means it can respond to button or input element (i.e. when user presses 'enter' on keyboard).
searchForm.addEventListener('submit', (e) => {
    e.preventDefault(); // prevent form being submitted in normal way, causing page reload
    filterAndPaginateViaSearch(list);
});



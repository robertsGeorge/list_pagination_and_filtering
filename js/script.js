/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// select all student list items and store them in global variable
const list = document.querySelector('.student-list').children;
// max number of students to display per page
const perPage = 10;

// From the list, only display those students on the pageNumber passed in
function showPage(list, pageNumber) {
  
    //page numbers start from 1 (not 0), so need to subtract perPage to get correct startIndex
    const startIndex = perPage * pageNumber - perPage; 
    // because array-like-objects index from 0, need to subtract 1 to get correct endIndex
    const endIndex = perPage * pageNumber - 1;

    // for each student list item, if their index position falls within the start/end range, display it
    for (let i = 0; i < list.length; i++) {
        if (i >= startIndex && i <= endIndex) {
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
        li.appendChild(a);
        ul.appendChild(li);
    }

    // select all page links as an iterable nodeList
    const links = ul.querySelectorAll('a');
    // apply class 'active' and its styling to first page link on call to appendPageLinks()
    links[0].className = 'active';
    // add an event listener to each page link
    for (let i = 0; i < links.length; i++) {
        // for each individual link in the links nodeList, add an event listener/handler
        const link = ul.querySelectorAll('a')[i] 
        
        link.addEventListener('click', (e) => {
            // remove className 'active' from any link that has it
            for (let i = 0; i < links.length; i++) {
                links[i].className = '';
            }
            // add className 'active' to the link that is clicked
            e.target.className = 'active'; 
            // get pageNumber (i.e. link number) to pass to showPage()'s pageNumber parameter
            const pageNumber = parseInt(e.target.textContent);
            // call showPage() to display the pageNumber that the user clicked
            showPage(list, pageNumber);
        });
    }


}

// show the first 10 students on initial page load by passing 1 to showPage 2nd param
showPage(list, 1); // move this call inside appendPageLinks()
appendPageLinks(list); 




/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   

const list = document.querySelector('.student-list').children;
const perPage = 10;


/*** 
   Create the `showPage` function to hide all of the items in the 
   list except for the ten you want to show.
***/
function showPage(list, section) { // do I need to pass in list, if it's a globally declared const?
  
    const startIndex = perPage * section - perPage;
    const endIndex = perPage * section - 1;

    for (let i = 0; i < list.length; i++) {
        if (i >= startIndex && i <= endIndex) {
            list[i].style.display = '';
        } else {
            list[i].style.display = 'none';
        }
    }
}

showPage(list, 1);


/*** 
   Create the `appendPageLinks function` to generate, append, and add 
   functionality to the pagination buttons.
***/

function appendPageLinks(list, ) {
    const sections = Math.ceil(list.length / perPage); // find out number of sections, = number of buttons
    
    const div = document.createElement('div');
    const ul = document.createElement('ul');
    const page = document.querySelector('.page');
    div.appendChild(ul);
    page.appendChild(div);

    for () {
        // while i <= sections create buttons
        // each iteration, generate and append the button to the paginationUL
    }
    // generate buttons
    // append buttons
    // add functionality
}
appendPageLinks(list);




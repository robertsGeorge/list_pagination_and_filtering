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

function appendPageLinks(list) {
    const sections = Math.ceil(list.length / perPage); // find out number of sections, = number of buttons
    
    const div = document.createElement('div');
    const ul = document.createElement('ul');
    const page = document.querySelector('.page');
    div.appendChild(ul);
    page.appendChild(div);

    for (let i = 1; i <= sections; i++) { // for each section...
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.textContent = i; // apply number to the 'button'
        li.appendChild(a);
        ul.appendChild(li);
    }
    // generate buttons
    // append buttons
    // add functionality
}
appendPageLinks(list);




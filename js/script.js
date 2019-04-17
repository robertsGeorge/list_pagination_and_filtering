/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
/* TODO:
    - add eventListeners to each link    
    - apply className 'active' to current pagination link that is displayed
    - apply className 'active' to first page on page initial load
*/


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
    // apply className 'active' to current page?
}

showPage(list, 1);


/*** 
   Create the `appendPageLinks function` to generate, append, and add 
   functionality to the pagination buttons.
***/

function appendPageLinks(list) {

    // create and append container div/ul to hold pagination links
    const page = document.querySelector('.page');
    const div = document.createElement('div');
    const ul = document.createElement('ul');
    
    div.className = 'pagination'; // apply css to links
    div.appendChild(ul);
    page.appendChild(div);

    /* establish number of pagination links (sections) to generate. 
    - If 54 students in list, then 6 sections are needed, hence Math.ceil */    
    const sections = Math.ceil(list.length / perPage); 

    // for each section, generate and append a pagination link (li + nested a).
    for (let i = 1; i <= sections; i++) {
        const li = document.createElement('li');
        // li.className = 'pagination';
        const a = document.createElement('a');
        // a.className = 'pagination';
        a.textContent = i;
        li.appendChild(a);
        ul.appendChild(li);
    }

    // select all pagination links as an iterable 
    const links = ul.querySelectorAll('a');

    for (let i = 0; i < links.length; i++) {
        
        let a = ul.querySelectorAll('a')[i] // for each 'a' element in links
        
        a.addEventListener('click', (e) => {
            e.target.className = 'active'; // make the clicked link turn blue
            // showPage();
        });
    }

}

appendPageLinks(list);




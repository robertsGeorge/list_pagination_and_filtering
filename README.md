# List Pagination and Filtering

  
<br>   

## Description
- Use progressive enhancement / unobtrusive JavaScript to:
    - dynamically paginate a static HTML list of students
    - Dynamically add a HTML search form that responds live to 'keyup' events, and paginates the search results as necessary

<br> 


## Skills, techniques and processes used
- Vanilla JavaScript; no libraries or third-party code-snippets have been used
- "use strict";
- function declarations, function parameters, arrow functions
- Awareness of scope: declaring as few global variables as possible, keeping functions self-contained/modular where possible
- array iteration using for loops and the forEach method
- searching for a string inside an array using .match()
    - passing in a string to auto-generate the REGEX used to find matches
- DOM manipulation
    - dynamically generating HTML components, as follows:
        - pagination links
        - search form
- Event Handling / Event Bubbling / use of The Event Object
- CSS (styling of 'no matching students' message)
- Refactoring to apply principle of DRY, replacing repeated patterns with a functions, with parameters to account for any variables within the pattern

<br> 

## Extra credit features added
- Dynamically generate and append search form component
- search results are updated live using 'keyup' event listener
- EventHandler also set up to handle a submit event on the form (if case of user pasting in search term using a mouse)
- pagination of search results
- Handle no results from search with a dynamically created and displayed (in page) HTML message
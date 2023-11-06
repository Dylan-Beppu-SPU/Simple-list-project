const http = new coreHTTP;

// Block Variables
let URL = "http://localhost:5000/api"
let theList = [];
// let testJson = ['Miku', 'Rin', 'Len', 'Luka', 'Kaito', 'Mako'];

// setup selectors
const result = document.querySelector(".result");
const input =  document.querySelector("#listitem");
const addButton =  document.querySelector(".add-btn");
const delButton =  document.querySelector(".del-btn");

// Listeners
addButton.addEventListener("click", httpPost);
delButton.addEventListener("click", httpDelete);

/* Helper Functions */

/**
 * Removes html injection from string
 * @param {string} str The value to check
 * @returns String
 */
function HtmlToString(str){
  // test case: <a href="https://www.google.com">Google</a>
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Replaces the list item at the given index with an input field, allowing the user to edit the item.
 * When the input field loses focus, the new value is saved and the list is updated.
 * @param {*} index
 */
function editItem(index) {
  //Get the item from result
  let li = result.getElementsByTagName('li')[index];
  let oldValue = li.textContent;
  li.innerHTML = `<input type="text" id="input${index}" value="${oldValue}">`;
  let input = document.getElementById(`input${index}`);
  input.focus();

  //When user clicks out of the element
  input.onblur = async () => {
    let newValue = input.value;
    theList[index] = newValue;
    
    await WriteList();
    GetList();
  };
}


/**
 * Displays theList and create the list to edit
 */
function ShowList() {
  let output = "<ul>";

  //Change the loop so that indexes can be assigned to each element for editing
  for (let i = 0; i < theList.length; i++) {
    output += `<li ondblclick="editItem(${i})">${HtmlToString(theList[i])}</li>`;
  }
  output += "</ul>";
  result.innerHTML = output;
}

/**
 * Gets the list from the server
 * @returns promise
 */
async function GetList() {
  return http.get(URL)
    .then(response => {
      theList = response;
      ShowList();
    })
    .catch(error => {
      console.error(`Error: ${error}`)
    });
}

/**
 * Writes theList to the server
 * @returns promise
 */
async function WriteList() {
  return http.post(URL, theList)
  .then(response => {
    console.log(response)
  })
  .catch(error => {
    console.error(`Error: ${error}`)
  });
}

/* Listener Functions */

/**
 * Posts theList to server
 * @param {*} e Ignore
 * @returns Promise
 */
async function httpPost(e) {
  //Add the thing to the thing
  theList.push(input.value);

  //Now post it
  return http.post(URL, theList)
  .then(response => {
    console.log(response)
  })
  .catch(error => {
    console.error(`Error: ${error}`)
  });

}

/**
 * Deletes the text in input from the list
 * @param {*} e Ignore
 */
function httpDelete(e) {
  //Find the object
  let index = theList.indexOf(input.value);

  if(index !== -1){
    theList.splice(index, 1);
    WriteList();
  } else {
    console.log(`${input.value} is not in the list`)
  }
  
}

// Loading functions
function showLoading() {
  result.innerHTML = "Loading...";
}

async function main() {
  addButton.disabled = true;
  delButton.disabled = true;
  showLoading();

  await GetList();

  addButton.disabled = false;
  delButton.disabled = false;
}

main();
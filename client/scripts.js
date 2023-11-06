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
function ShowList() {
  let output = "<ul>";
  for (const itm of theList) {
    output += `<li>${itm}</li>`;
  }
  output += "</ul>";
  result.innerHTML = output;
}

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

function httpDelete(e) {
  // console.log(e)
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
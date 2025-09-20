// FRONT-END (CLIENT) JAVASCRIPT HERE

let currentlyEditingOldData = null;

const submit = async function( event ) {
  clearEditing()

  event.preventDefault()

  const name = document.querySelector( "#name" ),
        year = document.querySelector( "#year" ),
        plotRating = document.querySelector( "#plotRating" ),
        actingRating = document.querySelector( "#actingRating" ),
        musicRating = document.querySelector( "#musicRating" ),
        json = { name: name.value, 
          year: parseInt(year.value), 
          plotRating: parseInt(plotRating.value), 
          actingRating: parseInt(actingRating.value), 
          musicRating: parseInt(musicRating.value) },
        body = JSON.stringify( json )

  const response = await fetch( "/add", {
    method:"POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: body 
  })

  const data = await response.json()

  console.log( "text:", data )

  //clear inputs
  name.value = ''
  year.value = ''
  plotRating.value = ''
  actingRating.value = ''
  musicRating.value = ''

  seeResults()
}

const deleteRow = async function( rowId ) {
  clearEditing()

  const row = document.getElementById(rowId)

  const cells = row.querySelectorAll("td");

  const json = {
    _id: rowId
  };
  
  const body = JSON.stringify( json )

  console.log("deleting: ", body)

  const response = await fetch( "/remove", {
    method:"POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: body 
  })

  const data = await response.json()

  console.log( "text:", data )

  seeResults()
}

const editRow = function( rowId ) {
  //show edit section 
  const editSection = document.getElementById('tracker-edit');
  const entrySection = document.getElementById('tracker-entry');

  entrySection.style.display = 'none';
  editSection.style.display = 'block';

  const row = document.getElementById(rowId)

  const cells = row.querySelectorAll("td");

  const name = cells[0].textContent,
        year = parseInt(cells[1].textContent),
        plotRating = parseInt(cells[2].textContent),
        actingRating = parseInt(cells[3].textContent),
        musicRating = parseInt(cells[4].textContent)

  //populate edit fields
  let editName = document.getElementById('edit-name');
  editName.textContent = name

  let editYear = document.getElementById('edit-year');
  editYear.textContent = year

  let plotInputField = document.getElementById('edit-plot');
  plotInputField.value = plotRating;

  let actingInputField = document.getElementById('edit-acting');
  actingInputField.value = actingRating;

  let musicInputField = document.getElementById('edit-music');
  musicInputField.value = musicRating;

  //change edit section border color and submit button 

  let trackerEditButton = document.getElementById('edit-submit')
  trackerEditButton.className = "button is-link"

  let trackerEditCancelButton = document.getElementById('edit-cancel')
  trackerEditCancelButton.className = "button is-link"

  //store data
  currentlyEditingOldData = {
    id: rowId
  };

}

const clearEditing = function () {
  //hide edit section 
  const editSection = document.getElementById('tracker-edit');
  const entrySection = document.getElementById('tracker-entry');

  entrySection.style.display = 'block';
  editSection.style.display = 'none';

  //reset edit fields
  let editName = document.getElementById('edit-name');
  editName.textContent = 'Movie Name'

  let editYear = document.getElementById('edit-year');
  editYear.textContent = 'Movie Year'

  let plotInputField = document.getElementById('edit-plot');
  plotInputField.value = ''

  let actingInputField = document.getElementById('edit-acting');
  actingInputField.value = ''

  let musicInputField = document.getElementById('edit-music');
  musicInputField.value =''

  //change edit section border color and submit button 

  let trackerEditButton = document.getElementById('edit-submit')
  trackerEditButton.className = "button is-primary"

  let trackerEditCancelButton = document.getElementById('edit-cancel')
  trackerEditCancelButton.className = "button is-primary"

  currentlyEditingOldData = null; 
}

const submitEdits = async function ( ) {

  const plotRating = document.getElementById( "edit-plot" ),
        actingRating = document.getElementById( "edit-acting" ),
        musicRating = document.getElementById( "edit-music" )
  
  if (currentlyEditingOldData) {
    newData = {
          plotRating: parseInt(plotRating.value), 
          actingRating: parseInt(actingRating.value), 
          musicRating: parseInt(musicRating.value),
          _id: currentlyEditingOldData["id"]
    }
    body = JSON.stringify( newData )
  }
  else {
    console.log("no previous data found")
    return;
  }
        
  console.log("updating: ", body)

  const response = await fetch( "/update", {
    method:"POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: body 
  })

  const data = await response.json()

  console.log( "text:", data )

  clearEditing()

  seeResults()
}
      
const seeResults = async function ( event ) {
  if (event) {
    event.preventDefault()
  }

  clearEditing()

  const response = await fetch( "/results", {
    method:'GET', 
  })

  const data = await response.json()

  console.log( "text2:", data )

  if(data.length === 0) {
    const tableBody = document.getElementById("movie-table-body");
    tableBody.innerHTML = '';
    const row = document.createElement("tr");
    row.innerHTML = '<td colspan="8" style="text-align:center;">No Data Found</td>';
    tableBody.appendChild(row);
  }
  else {
    populateTable(data)
  }
}

const populateTable = function (data) {
  const tableBody = document.getElementById("movie-table-body");

  //clear the table
  tableBody.innerHTML = '';

  data.forEach((movie) => {
    const row = document.createElement("tr");
    row.id = movie["_id"]
    row.innerHTML = `
      <td>${movie['name']}</td>
      <td class="number-cell">${movie['year']}</td>
      <td class="number-cell">${movie['plotRating']}</td>
      <td class="number-cell">${movie['actingRating']}</td>
      <td class="number-cell">${movie['musicRating']}</td>
      <td class="number-cell">${movie['overallRating']}</td>
      <td><button class="button is-danger" onclick="deleteRow('${row.id}')">Delete</button></td>
      <td><button class="button is-link" onclick="editRow('${row.id}')">Edit</button></td>
    `;
    tableBody.appendChild(row);
  });
}

const getSessionData = async function () {
  try {
    const response = await fetch( "/userDetails", {
    method:'GET', 
    })

    const data = await response.json()

    console.log("data: ", data)

    if(data.isNewUser === true) {
      const newUserMessage = document.getElementById("new-user-message")
      newUserMessage.textContent = "New account created!"
      newUserMessage.style.display = 'block';
    }

    const welcomeMessage = document.getElementById("welcome-message")
    welcomeMessage.textContent = "Welcome, " + data.username
    welcomeMessage.style.display = 'block';
  }
  catch (e) {
    console.error(e)
    const message = document.getElementById("error-message")
    message.textContent = "Login Error."
    message.style.display = 'block';
  }
}

window.onload = async function() {

  getSessionData()

  const form = document.querySelector("#inputForm");
  const SeeResultsButton = document.querySelector("#results-request");
  const SubmitEditsButton = document.getElementById('edit-submit')
  const editCancelButton = document.getElementById('edit-cancel')

  form.addEventListener("submit", submit); 
  SeeResultsButton.addEventListener("click", seeResults);
  SubmitEditsButton.addEventListener("click", submitEdits);
  editCancelButton.addEventListener("click", clearEditing)
  
}
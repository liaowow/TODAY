    /***** FETCH CONSTANTS *****/

const baseURL = "http://localhost:3000";
const defaultHeaders = {
    "Content-Type": "application/json",
    "Accepts": "application/json"
}

    /***** USER FETCHES *****/

// READ - fetches the user object when someone logs in
function getLoggedInUserFetch(username) {
    fetch(`${baseURL}/users`)
    .then( response => response.json() )
    .then( users => {
        localStorage.currentUser = JSON.stringify(users.find( user => user.username === username ))
        if (localStorage.currentUser === "undefined") {
            localStorage.currentUser = "";
            alert("Try again!");
        } else {
            getAllEntriesToUserArray()
            renderSidebar();
            renderEntryForm();
        };
    });
};

// CREATE - posts a new user after they're created
function postNewUserFetch(newUserObj) {
    fetch(`${baseURL}/users`, {
        method: "POST",
        headers: defaultHeaders,
        body: JSON.stringify(newUserObj)
    })
    .then( response => response.json() )
    .then( response => {
        if (response.username) {
            localStorage.currentUser = JSON.stringify(response);
            renderSidebar();
            renderEntryForm();
        } else {
            alert("Try again!")
        }
    })
};

// UPDATE - patches an update to a user
function patchUpdatedUserInfo(updatedUserObj) {
    currentUser = JSON.parse(localStorage.currentUser);
    const currentUserID = currentUser.id;

    fetch(`${baseURL}/users/${currentUserID}`, {
        method: "PATCH",
        headers: defaultHeaders,
        body: JSON.stringify(updatedUserObj)
    })
    .then( response => response.json() )
    .then( updatedUser => {
        localStorage.currentUser = JSON.stringify(updatedUser);
        renderAccountInfo();
    })
};

// DELETE - deletes a user account
function deleteUserAccountFetch() {
    currentUser = JSON.parse(localStorage.currentUser);
    const currentUserID = currentUser.id;

    fetch(`${baseURL}/users/${currentUserID}`, {
        method: "DELETE"
    })
};

    /***** ENTRY FETCHES *****/
  // READ - gets all entries for logged-in user AND renders them
function getAllEntriesForUser() {
currentUser = JSON.parse(localStorage.currentUser);
const currentUserID = currentUser.id;

fetch(`${baseURL}/users/${currentUserID}/entries`)
.then(r => r.json())
.then(userEntries => {
    allUserEntries = userEntries.reverse();
    renderAllEntriesForUser(userEntries);
})
}

// READ - gets all entries for logged-in user and adds them to global
function getAllEntriesToUserArray() {
    currentUser = JSON.parse(localStorage.currentUser);
    const currentUserID = currentUser.id;
    
    fetch(`${baseURL}/users/${currentUserID}/entries`)
    .then(r => r.json())
    .then(userEntries => {
        allUserEntries = userEntries.reverse();
    })
    }

// CREATE - creates a new entry for the logged in user
function postNewEntryFetch(newEntryObj) {
    fetch(`${baseURL}/entries`, {
        method: "POST",
        headers: defaultHeaders,
        body: JSON.stringify(newEntryObj)
    })
    .then( r => r.json() )
    .then( newEntry => {
        getAllEntriesForUser();
    })
};

  // UPDATE - updates entry
function patchUpdatedEntryFetch(updatedEntryObj, clickedEntry) {

fetch(`${baseURL}/entries/${clickedEntry.id}`, {
    method: "PATCH",
    headers: defaultHeaders,
    body: JSON.stringify(updatedEntryObj)
})
.then(r => r.json())
.then(updatedEntry => {
    allUserEntries[allUserEntries.findIndex(el => el.id === updatedEntry.id)] = updatedEntry;
    renderAllEntriesForUser(allUserEntries);
    
    modalContainer.innerHTML = `
    <div class="modal-header">
    <h5 class="modal-title" id="exampleModalLongTitle">${updatedEntry.title}</h5>
    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span>
    </button>
    </div>
    <div class="modal-body">
        <img class="card-img-top" src=${updatedEntry.image}>
        <br><br>
        <h5>Mood: <strong>${updatedEntry.current_mood}</strong></h5>
        <p>${updatedEntry.content}</p>
        <a href="${updatedEntry.song}" target=_blank>Song of My Day</a>
    </div>
    <div class="modal-footer">
        <div id="${updatedEntry.id}" style="display: none;"></div>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" id="edit-entry-btn" class="btn btn-primary">Edit Entry</button>
        <button type="button" class="btn btn-danger" data-dismiss="modal">Delete Entry</button>
    </div>
    `
})
}

// DELETE - deletes an entry when the delete button is clicked
function deleteEntryFetch(clickedEntry) {
    fetch(`${baseURL}/entries/${clickedEntry.id}`, {
        method: "DELETE"
    })
    .then( () => {
        getAllEntriesForUser();
    })
};

    /***** MOOD FETCHES *****/
  // READ - gets all moods
function getAllMoodsFetch() {
    fetch(`${baseURL}/moods`)
    .then(r => r.json())
    .then(moods => {
        allMoods = moods
    })
}


    /***** QUOTE FETCHES *****/


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



    /***** MOOD FETCHES *****/



    /***** QUOTE FETCHES *****/



















// /*** TESTING FETCH ***/
// const postFetch = function() {
//   fetch("http://localhost:3000/entries", {
//       method: "POST",
//       headers: {
//           "Content-Type": "application/json",
//           "Accept": "application/json"
//       },
//       body: JSON.stringify({
//           title: "today I...",
//           content: "ars;ghuareig",
//           current_mood: "happy",
//           mood_id: 1,
//           image: "url",
//           song: "url",
//           quote_id: 20,
//           user_id: 2
//       })
//   })
// }

// const patchFetch = function() {
//   fetch("http://localhost:3000/entries/131", {
//       method: "PATCH",
//       headers: {
//           "Content-Type": "application/json",
//           "Accept": "application/json"
//       },
//       body: JSON.stringify({
//           title: "yesterday I...",
//           content: "oops I did that again...",
//           current_mood: "sad",
//           mood_id: 2,
//           image: "urlurl",
//           song: "urlurl",
//           quote_id: 19
//       })
//   })
// }

// const deleteFetch = function() {
//   fetch("http://localhost:3000/entries/131", {
//       method: "DELETE",
//   })
// }
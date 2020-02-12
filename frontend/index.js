    /***** GLOBAL VARIABLES *****/

// const currentUser = [];
let currentUser;
let allMoods;
let allQuotes;


let allUsers = [];

    /***** DOM ELEMENTS *****/

const sidebarDiv = document.querySelector("#sidebar-wrapper");
const mainPageDiv = document.querySelector(".container-fluid");

    /***** EVENT LISTENERS *****/

sidebarDiv.addEventListener("click", handleSidebarClick)


    /***** EVENT HANDLERS *****/

// handles clicking a link in the sidebar
function handleSidebarClick(event) {
    switch(event.target.id) {
        case "create-entry":
            renderEntryForm();
            break;
        case "entries":
            getAllEntriesForUser();
            break;
        case "moods":
            console.log(event.target.id)
            break;
        case "my-account":
            renderAccountInfo();
            break;
        case "log-out":
            localStorage.currentUser = "";
            renderSidebar();
            checkLoggedInUser();
            break;
    };
};

// handles submitting the log in form
function handleLogInFormSubmit(event) {
    event.preventDefault();

    loggedInUsername = event.target["username"].value;
    getLoggedInUserFetch(loggedInUsername)
};

// handles submitting the form to create a user
function handleCreateUserformSubmit(event) {
    event.preventDefault();

    const newUserUsername = event.target["username"].value
    const newUserFirstName = event.target["firstName"].value
    const newUserLocation = event.target["location"].value
    const newUserProfilePic = event.target["profilePic"].value

    const newUserObj = {
        username: newUserUsername,
        first_name: newUserFirstName,
        location: newUserLocation,
        profile_pic: newUserProfilePic
    }

    postNewUserFetch(newUserObj);
};

// handles clicking the edit account button
function handleEditAccountBtn(event) {
    renderEditAccountForm();
};

// handles submitting the edit account form
function handleEditAccountFormSubmit(event) {
    event.preventDefault();

    const updateUserUsername = (event.target["username"].value === "" ? event.target["username"].placeholder : event.target["username"].value);
    const updateUserFirstName = (event.target["firstName"].value === "" ? event.target["firstName"].placeholder : event.target["firstName"].value);
    const updateUserLocation = (event.target["location"].value === "" ? event.target["location"].placeholder : event.target["location"].value);
    const updateUserProfilePic = (event.target["profilePic"].value === "" ? event.target["profilePic"].placeholder : event.target["profilePic"].value);
    const updatedUserObj = {
        username: updateUserUsername,
        first_name: updateUserFirstName,
        location: updateUserLocation,
        profile_pic: updateUserProfilePic
    };
    patchUpdatedUserInfo(updatedUserObj);
};

// handles clicking the delete account button
function handleDeleteAccountBtn(event) {
    deleteUserAccountFetch();
    localStorage.currentUser = "";
    renderSidebar();
    checkLoggedInUser();
};

    /***** RENDER FUNCTIONS *****/

// renders sidebar dynamically based on if a user is logged in
function renderSidebar() {
    if (localStorage.currentUser === "") {
    sidebarDiv.innerHTML = `
    <div class="sidebar-heading">Date (placeholder)</div>
    <div class="list-group list-group-flush">
            <a href="#" class="list-group-item list-group-item-action bg-light">Welcome Message</a>
            
    </div>` 
    } else {
        sidebarDiv.innerHTML = `
        <div class="sidebar-heading">Date (placeholder)</div>
        <div class="list-group list-group-flush">
            <a href="#" class="list-group-item list-group-item-action bg-light" id="create-entry">Create Entry</a>
            <a href="#" class="list-group-item list-group-item-action bg-light" id="entries">Entries</a>
            <a href="#" class="list-group-item list-group-item-action bg-light" id="moods">Moods</a>
            <a href="#" class="list-group-item list-group-item-action bg-light" id="my-account">My Account</a>
            <a href="#" class="list-group-item list-group-item-action bg-light" id="log-out">Log Out</a>
        </div>`
    };
};

// renders the log-in page
function renderLogIn() {
    mainPageDiv.innerHTML = `
    <h1>Log In</h1>
    <br>
    <form id="log-in-form">
        <label for="username">Enter Username:</label><br>
        <input type="text" id="log-in-username" name="username"><br><br>
        <input type="submit" value="Log In">
    </form>
    <br>
    <h4>Don't have an account? <a href="javascript:;" onclick="renderCreateAccount();">Click here</a> to create one!</h4>
    `
    const logInForm = document.querySelector("#log-in-form");
    logInForm.addEventListener("submit", handleLogInFormSubmit);
};

// renders the create account page
function renderCreateAccount() {
    mainPageDiv.innerHTML = `
    <h1>Create Account</h1>
    <br>
    <form id="create-account-form">
        <label for="username">Username:</label><br>
        <input type="text" name="username"><br>
        <label for="firstName">First Name:</label><br>
        <input type="text" name="firstName"><br>
        <label for="location">Location (city):</label><br>
        <input type="text" name="location"><br>
        <label for="profilePic">Profile Picture (url):</label><br>
        <input type="text" name="profilePic" placeholder="Optional..."><br><br>
        <input type="submit" value="Create Account">
    </form>
    <br>
    <h4>Already have an account? <a href="javascript:;" onclick="renderLogIn();">Click here</a> to log in!</h4>
    `
    const createUserForm = document.querySelector("#create-account-form");
    createUserForm.addEventListener("submit", handleCreateUserformSubmit);
};



// renders the currentUser's account information
function renderAccountInfo() {
    currentUser = JSON.parse(localStorage.currentUser);

    mainPageDiv.innerHTML = `
    <h1>Account Information</h1>
    <img src="${currentUser.profile_pic}">
    <br><br>
    <h5><em>First Name:</em></h5>
    <h4>${currentUser.first_name}</h4>
    <br>
    <h5><em>Username:</em></h5>
    <h4>${currentUser.username}</h4>
    <br>
    <h5><em>Location:</em></h5>
    <h4>${currentUser.location}</h4>
    <br>
    <button type="button" id="edit-user-btn">Edit Account Info</button>
    <br><br>
    <button type="button" id="delete-user-btn">Delete Account</button>
    <br><br>
    `

    const editAccountButton = document.querySelector("#edit-user-btn");
    editAccountButton.addEventListener("click", handleEditAccountBtn);

    const deleteAccountButton = document.querySelector("#delete-user-btn");
    deleteAccountButton.addEventListener("click", handleDeleteAccountBtn);
};

// renders the edit account info form
function renderEditAccountForm() {
    currentUser = JSON.parse(localStorage.currentUser);

    mainPageDiv.innerHTML = `
    <h1>Edit Account Info</h1>
    <br>
    <form id="edit-account-form">
        <label for="username">Username:</label><br>
        <input type="text" name="username" placeholder="${currentUser.username}"><br>
        <label for="firstName">First Name:</label><br>
        <input type="text" name="firstName" placeholder="${currentUser.first_name}"><br>
        <label for="location">Location (city):</label><br>
        <input type="text" name="location" placeholder="${currentUser.location}"><br>
        <label for="profilePic">Profile Picture (url):</label><br>
        <input type="text" name="profilePic" placeholder="${currentUser.profile_pic}"><br><br>
        <input type="submit" value="Edit Account">
    </form>
    `

    const editAccountForm = document.querySelector("#edit-account-form");
    editAccountForm.addEventListener("submit", handleEditAccountFormSubmit);
};

    /***** MISC. FUNCTIONS *****/

// render the time in the header of the sidebar
let update = function() {
    document.querySelector(".sidebar-heading").innerHTML = moment().format('MMMM Do YYYY, h:mm:ss a');
};

// checks if someone is currently logged in on initialize
function checkLoggedInUser() {
    if (localStorage.currentUser === "") {
        renderLogIn();
    } else if (localStorage.currentUser === undefined) {
        localStorage.currentUser = ""
        renderLogIn();
    } else {
        renderEntryForm();
    }
}

    /***** INITIAL RUNNER FUNCTIONS *****/

// renders sidebar
renderSidebar();
checkLoggedInUser();
// adds time to sidebar
update();
setInterval(update, 1000);
// get all moods
getAllMoodsFetch();
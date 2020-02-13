    /***** GLOBAL VARIABLES *****/

let currentUser;
let allMoods;

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
            renderMoodData();
            break;
        case "my-account":
            renderAccountInfo();
            break;
        case "log-out":
            localStorage.currentUser = "";
            allUserEntries = [];
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

    const updateUserUsername = event.target["username"].value;
    const updateUserFirstName = event.target["firstName"].value;
    const updateUserLocation = event.target["location"].value;
    const updateUserProfilePic = event.target["profilePic"].value;

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
    <div class="sidebar-heading">
        Date (placeholder)
    </div>
    <div class="list-group list-group-flush">
            <p class="list-group-item list-group-item-action bg-light">Welcome to <strong>TODAY</strong>, an intimate daily journal app.<br><br>
            Here you can track your daily thoughts, moods, and so much more!</p>
            
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
    <h3>Enter Username:</h3>
    <form id="log-in-form">
        
        <input type="text" id="log-in-username" name="username"><br><br>
        <input type="submit" class="btn btn-primary" value="Log In">
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
        <input type="submit" class="btn btn-primary" value="Create Account">
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
    <br>
    <img class="profile-picture" src="${currentUser.profile_pic}">
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
    <button type="button" class="btn btn-primary" id="edit-user-btn">Edit Account Info</button>
    <br><br>
    <button type="button" class="btn btn-danger" id="delete-user-btn">Delete Account</button>
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
        <input type="text" name="username" value="${currentUser.username}"><br>
        <label for="firstName">First Name:</label><br>
        <input type="text" name="firstName" value="${currentUser.first_name}"><br>
        <label for="location">Location (city):</label><br>
        <input type="text" name="location" value="${currentUser.location}"><br>
        <label for="profilePic">Profile Picture (url):</label><br>
        <input type="text" name="profilePic" value="${currentUser.profile_pic}"><br><br>
        <input type="submit" value="Edit Account">
    </form>
    `

    const editAccountForm = document.querySelector("#edit-account-form");
    editAccountForm.addEventListener("submit", handleEditAccountFormSubmit);
};

// render a user's average mood data
function renderMoodData() {
    currentUser = JSON.parse(localStorage.currentUser);
    let entryCount = allUserEntries.length;

    let happyCount = (allUserEntries.filter( entry => entry.mood_id === 1 )).length;
    let sadCount = (allUserEntries.filter( entry => entry.mood_id === 2 )).length;
    let angryCount = (allUserEntries.filter( entry => entry.mood_id === 3 )).length;
    let calmCount = (allUserEntries.filter( entry => entry.mood_id === 4 )).length;

    let averageMoodCounts = [];
    //happy [0] in array
    averageMoodCounts.push(happyCount / entryCount);
    //sad [1] in array
    averageMoodCounts.push(sadCount / entryCount);
    //angry [2] in array
    averageMoodCounts.push(angryCount / entryCount);
    //calm [3] in array
    averageMoodCounts.push(calmCount / entryCount);

    let maxNumber = Math.max(...averageMoodCounts);
    let maxIndex = averageMoodCounts.findIndex( index => index === maxNumber );


    if (entryCount === 0) {
        mainPageDiv.innerHTML = `
        <h1>Hi ${currentUser.first_name ? currentUser.first_name : "there"}.</h1>
        <br>
        <p>You don't have any entries yet. Go create some!</p>`
    } else if (entryCount === 1) {
        mainPageDiv.innerHTML = `
        <h1>Hi ${currentUser.first_name}.</h1>
        <br>
        <p>You only have one entry. Go create some more!</p>`
    } else {
        mainPageDiv.innerHTML = `
        <h1>Hi ${currentUser.first_name}.</h1>
        <br>
        <h5>Based on your past ${entryCount} entries, your average mood is:</h5>
        <div id="emoji-display"></div>
        <h5>Entry Mood Counts:</h5>
        <br>
        <div id="mood-count-div" class="card-deck"></div>
        `
        const emojiDisplayDiv = mainPageDiv.querySelector("#emoji-display");
        switch(maxIndex) {
            case 0:
                emojiDisplayDiv.innerHTML = `<img class="emoji-display" src="../frontend//img/emoji-happy.png">
                <h6 style="color: grey">(Happy)</h6>
                <br>`
                break;
            case 1:
                emojiDisplayDiv.innerHTML = `<img class="emoji-display" src="../frontend//img/emoji-sad.png">
                <h6>(Sad)</h6>
                <br>`
                break;
            case 2:
                emojiDisplayDiv.innerHTML = `<img class="emoji-display" src="../frontend//img/emoji-angry.png">
                <h6>(Angry)</h6>
                <br>`
                break;
            case 3:
                emojiDisplayDiv.innerHTML = `<img class="emoji-display" src="../frontend/img/emoji-calm.png">
                <h6 style="color: grey">(Calm)</h6>
                <br>`
                break;
        };
        const moodCountDiv = mainPageDiv.querySelector("#mood-count-div");
        moodCountDiv.innerHTML = `
        <div class="card bg-light mb-3" style="max-width: 100px;">
        <div class="card-header"><strong>Happy</strong></div>
        <div class="card-body">
            <h3>${happyCount}</h3>
        </div>
        </div>
        <div class="card bg-light mb-3" style="max-width: 100px;">
        <div class="card-header"><strong>Sad</strong></div>
        <div class="card-body">
            <h3>${sadCount}</h3>
        </div>
        </div>
        <div class="card bg-light mb-3" style="max-width: 100px;">
        <div class="card-header"><strong>Angry</strong></div>
        <div class="card-body">
            <h3>${angryCount}</h3>
        </div>
        </div>
        <div class="card bg-light mb-3" style="max-width: 100px;">
        <div class="card-header"><strong>Calm</strong></div>
        <div class="card-body">
            <h3>${calmCount}</h3>
        </div>
        </div>`
    };
};

    /***** MISC. FUNCTIONS *****/

// render the time in the header of the sidebar
let update = function() {
    document.querySelector(".sidebar-heading").innerHTML = 
    `
    <h1 style="color:#0C60FF;"><strong>TODAY</strong></h1>
    ${moment().format('MMMM Do YYYY, h:mm:ss a')}
    `;
};

// checks if someone is currently logged in on initialize
function checkLoggedInUser() {
    if (localStorage.currentUser === "") {
        renderLogIn();
    } else if (localStorage.currentUser === undefined) {
        localStorage.currentUser = ""
        renderLogIn();
    } else {
        getAllEntriesToUserArray()
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
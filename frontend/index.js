    /***** GLOBAL VARIABLES *****/

const currentUser = [{}];

const allMoods = [];
const allUserEntries = [];
const allQuotes = [];

    /***** DOM ELEMENTS *****/

const sidebarDiv = document.querySelector("#sidebar-wrapper");

    /***** EVENT LISTENERS *****/

sidebarDiv.addEventListener("click", handleSidebarClick)

    /***** EVENT HANDLERS *****/

function handleSidebarClick(event) {
    switch(event.target.id) {
        case "create-entry":
            console.log(event.target.id)
            break;
        case "entries":
            console.log(event.target.id)
            break;
        case "moods":
            console.log(event.target.id)
            break;
        case "my-account":
            console.log(event.target.id)
            break;
        case "log-out":
            console.log(event.target.id)
            break;
    };
};

    /***** RENDER FUNCTIONS *****/

function renderSidebar() {
    if (currentUser.length === 0) {
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

    /***** MISC. FUNCTIONS *****/

function displayTime() {
    var d = new Date(),
        minutes = d.getMinutes().toString().length == 1 ? '0'+d.getMinutes() : d.getMinutes(),
        hours = d.getHours().toString().length == 1 ? '0'+d.getHours() : d.getHours(),
        ampm = d.getHours() >= 12 ? 'pm' : 'am',
        months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
        days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    return days[d.getDay()]+', '+months[d.getMonth()]+' '+d.getDate()+', '+d.getFullYear()+' '+hours+':'+minutes+ampm;
};

    /***** INITIAL RUNNER FUNCTIONS *****/

// renders sidebar
renderSidebar();
// adds time to sidebar
document.querySelector(".sidebar-heading").innerHTML = displayTime(); 
    /***** GLOBAL VARIABLES *****/
    let allUserEntries;

    /***** DOM ELEMENTS *****/
const modalContainer = document.querySelector(".modal-content")
const mainPageDiv2 = document.querySelector(".container-fluid");


    
    /***** EVENT LISTENERS *****/
mainPageDiv2.addEventListener("click", handleEntryCard)
modalContainer.addEventListener("click", handleEditEntry)
// modalContainer.addEventListener("click", handleDeleteEntry)

    /***** EVENT HANDLERS *****/
function handleEntryCard(event) {
    if (event.target.id === "view-entry-btn") {
        let clickedEntryCard = event.target.closest("div");
        let clickedEntryID = parseInt(clickedEntryCard.id);
        let clickedEntry = allUserEntries.find( entry => entry.id === clickedEntryID );

        modalContainer.innerHTML = `
        <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">${clickedEntry.title}</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
        </div>
        <div class="modal-body">
            <img src=${clickedEntry.image}>
            <h5>Mood: <strong>${clickedEntry.current_mood}</strong></h5>
            <p>${clickedEntry.content}</p>
            <a href="${clickedEntry.song}" target=_blank>Song of My Day</a>
        </div>
        <div class="modal-footer">
            <div id="${clickedEntry.id}" style="display: none;"></div>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" id="edit-entry-btn" class="btn btn-primary">Edit Entry</button>
            <button type="button" class="btn btn-danger" data-dismiss="modal">Delete Entry</button>
        </div>
        `


    }
}

function handleEditEntry(event) {

    if (event.target.id === "edit-entry-btn") {
        let clickedEntryID = parseInt(event.target.closest("div").querySelector("div").id);
        let clickedEntry = allUserEntries.find( entry => entry.id === clickedEntryID );
    
        modalContainer.innerHTML = `
        <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Edit Entry</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
        </div>
        <div class="modal-body">
            <form id="edit-entry-form">
                <label for="title">Title:</label><br>
                <input type="text" name="title" value="${clickedEntry.title}"><br>
                <label for="image">Image:</label><br>
                <input type="text" name="image" value="${clickedEntry.image}"><br>
                <label for="mood">Mood:</label><br>
                <input type="text" name="mood" value="${clickedEntry.current_mood}"><br><br>
                <label for="content">Content:</label><br>
                <textarea name="content" cols="50" rows="10">${clickedEntry.content}</textarea><br>
                <label for="song">Song:</label><br>
                <input type="text" name="song" value="${clickedEntry.song}"><br><br>
                <input type="submit" class="btn btn-primary" value="Save Entry">
            </form>
        </div>
        <div class="modal-footer">
        <div id="${clickedEntry.id}" style="display: none;"></div>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>

        </div>
        `

        const editEntryForm = document.querySelector("#edit-entry-form")
        editEntryForm.addEventListener("submit", (e) => handleEditFormSubmit(e, clickedEntry))
    }
}

function handleEditFormSubmit(e, clickedEntry) {
    e.preventDefault();

    const updatedTitle = e.target["title"].value;
    const updatedImage = e.target["image"].value;
    const updatedContent = e.target["content"].value;
    const updatedSong = e.target["song"].value;
    const updatedMood = e.target["mood"].value;

    const updatedEntryObj = {
        title: updatedTitle,
        image: updatedImage,
        content: updatedContent,
        current_mood: updatedMood,
        song: updatedSong,
        mood_id: 3
    }

    patchUpdatedEntryFetch(updatedEntryObj, clickedEntry);

}

// function handleDeleteEntry(event) {
//     if (event.target.id === "delete-entry-btn") {
//         console.log("You hit delete btn!")
//     }
// }

    /***** RENDER FUNCTIONS *****/
// renders the form to create a new entry
function renderEntryForm() {
    currentUser = JSON.parse(localStorage.currentUser);

    mainPageDiv.innerHTML = `
    <h1>Create an Entry, ${currentUser.first_name}</h1>
    `
}

// render all user entries
function renderAllEntriesForUser(allUserEntries) {
    mainPageDiv.innerHTML = `
    <h1>${currentUser.first_name}'s Entries</h1>
    <div class="card-columns"></div>
    `
    allUserEntries.forEach(entry => renderOneEntry(entry))
}

// render one entry
function renderOneEntry(entry) {
    // let currentEntry = entry;
    const entryCard = document.createElement("div")
    entryCard.className = "card"
    entryCard.style = "width: 18rem;"
    entryCard.innerHTML = `
    <img src="${entry.image}" class="card-img-top" alt="...">
    <div class="card-body" id=${entry.id}>
        <h5 class="card-title">${entry.title}</h5>
        <p class="card-text">${entry.content.substring(0, 150)}</p>
        <!-- Button trigger modal -->
        <button type="button" id="view-entry-btn" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalLong">
        View Full Entry
        </button>
    </div>
    `

    const cardColumns = document.querySelector(".card-columns")
    cardColumns.append(entryCard)

    // const viewEntryBtn = document.querySelector("#view-entry-btn")
    // viewEntryBtn.addEventListener("click", (event) => {
    //         let clickedEntryCard = event.target.closest("div");
    //         clickedEntryID = parseInt(clickedEntryCard.id);
    //         clickedEntry = allUserEntries.find( entry => entry.id === clickedEntryID );

    //         modalContainer.innerHTML = `
    //         <div class="modal-header">
    //         <h5 class="modal-title" id="exampleModalLongTitle">${clickedEntry.title}</h5>
    //         <button type="button" class="close" data-dismiss="modal" aria-label="Close">
    //           <span aria-hidden="true">&times;</span>
    //         </button>
    //         </div>
    //         <div class="modal-body">
    //             <img src=${clickedEntry.image}>
    //             <h5>Mood: <strong>${clickedEntry.current_mood}</strong></h5>
    //             <p>${clickedEntry.content}</p>
    //             <a href="${clickedEntry.song}" target=_blank>Song of My Day</a>
    //         </div>
    //         <div class="modal-footer">
    //             <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
    //             <button type="button" class="btn btn-primary">Edit Entry</button>
    //             <button type="button" class="btn btn-danger" data-dismiss="modal">Delete Entry</button>
    //         </div>
    //         `
    // })

}


    /***** MISC. FUNCTIONS *****/

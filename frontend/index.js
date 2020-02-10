






/*** TESTING FETCH ***/
const postFetch = function() {
    fetch("http://localhost:3000/entries", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            title: "today I...",
            content: "ars;ghuareig",
            current_mood: "happy",
            mood_id: 1,
            image: "url",
            song: "url",
            quote_id: 20,
            user_id: 2
        })
    })
}

const patchFetch = function() {
    fetch("http://localhost:3000/entries/131", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            title: "yesterday I...",
            content: "oops I did that again...",
            current_mood: "sad",
            mood_id: 2,
            image: "urlurl",
            song: "urlurl",
            quote_id: 19
        })
    })
}

const deleteFetch = function() {
    fetch("http://localhost:3000/entries/131", {
        method: "DELETE",
    })
}


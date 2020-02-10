






/*** TESTING FETCH ***/
const postFetch = function() {
    fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            username: "someone",
            location: "somewhere",
            first_name: "some",
            profile_pic: "url"
        })
    })
}

const patchFetch = function() {
    fetch("http://localhost:3000/users/6", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            username: "this one",
            location: "here",
            first_name: "blah",
            profile_pic: "urlurl"
        })
    })
}

const deleteFetch = function() {
    fetch("http://localhost:3000/users/6", {
        method: "DELETE",
    })
}


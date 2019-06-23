$(document).ready(function() {

//On click function that retrieves the values from the user and calls a function for the json data
$("#survey-submit").on("click", function(e) {
    e.preventDefault();

    var userData = [
        {
            name: $(".userName").val().trim(),
            photo: $(".userPhoto").val().trim(),
            scores: [
                $(".answer-1").val().trim(),
                $(".answer-2").val().trim(),
                $(".answer-3").val().trim(),
                $(".answer-4").val().trim(),
                $(".answer-5").val().trim(),
                $(".answer-6").val().trim(),
                $(".answer-7").val().trim(),
                $(".answer-8").val().trim(),
                $(".answer-9").val().trim(),
                $(".answer-10").val().trim()
            ]
        }
    ];
    // if (userData[0].name === "" && userData[0].photo === "") {
    //     alert("invalid input");
    // }
    // else {
    //     var scoreArray = userData[0].scores;
    //     for (var i = 0; i < scoreArray.length; i++) {
    //         if (scoreArray[i] === "Select") {
    //             alert("invalid input");
    //         }
    //         else {
    //             getAllFriends(userData);
    //         }
    //     }
    // }
    getAllFriends(userData);
});

//retrieves the json data and passes the json and user info into a comparison function
function getAllFriends(userData) {
    $.ajax({
        url: "api/friends",
        method:"GET"
    }).then(function(data) {
        compareFriends(userData, data);
        postNewUser(userData)
    });
}

function postNewUser(userData) {
    $.post("api/friends", userData[0], function(data) {
        console.log(data);
    });
}

function compareFriends(userData, storedData) {
    console.log(storedData);

    var newUser = userData[0];
    var userScores = userData[0].scores;

    console.log(userScores);

    for (var i = 0; i < userScores.length; i++) {
        
    }
}
});
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
    });
}

//Pushes new user to the json object
function postNewUser(userData) {
    $.post("api/friends", userData[0], function(data) {
    });
}

//this algorithm performs a search through all of the stored friends and compares the new user scores and finds the best match
function compareFriends(userData, storedData) {
    var valueDiff = [];

    var userScores = userData[0].scores;

    for (var i = 0; i < storedData.length; i++) {
        let dataScores = storedData[i].scores;

        var scoreDiff = [];

        for (var j = 0; j < userScores.length; j++) {
            let newScores = userScores[j];
            let oldScores = dataScores[j];

            let scoreComp = newScores - oldScores;
            let score = Math.abs(scoreComp);

            scoreDiff.push(score);
        }
        let totalScore = scoreDiff.reduce((a, b) => a + b, 0);

        valueDiff.push(totalScore);
    }
    findMatch(valueDiff, storedData, userData);
}

//this function finds the index number of the lowest value and then makes the selection on your match
function findMatch(array, data, userData) {

    var lowestVal = Math.min(...array);

    for (var i = 0; i < array.length; i++) {
        if (lowestVal === array[i]) {
            generateMatch(data[i], userData);
        }
    }
}

// this function generates the closest match to the html for the user
function generateMatch(matchData, userData) {

    var modal = document.getElementById("myModal");

    var span = document.getElementsByClassName("close")[0];

    modal.style.display = "block";

    var modalDiv = $("<div>");

    var matchName = $("<h1>");
    matchName.html(matchData.name);
    matchName.addClass("modal-div");
    matchName.addClass("text-center");
    modalDiv.append(matchName);

    var modalBr1 = $("<br>");
    modalDiv.append(modalBr1);

    var matchImg = $("<img>");
    matchImg.attr("src", matchData.photo);
    matchImg.addClass("modal-img");
    matchImg.addClass("rounded mx-auto d-block");
    modalDiv.append(matchImg);

    $(".modal-match").append(modalDiv);

    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
        modal.style.display = "none";
        }
    }
    postNewUser(userData);
    console.log(userData);
}
});
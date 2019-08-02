# friend-finder

## About

Friend Finder is a server based heroku deployed application that takes in user information and generates a profile match. 

## How It Works

After visiting the landing page the user will have the option to click on the survey button. Once you have been routed to the survey page, you will be required to fill in designated fields.

![Page use gif](https://github.com/jvalentine1/friend-finder/blob/master/app/images/ff-page-use-gif.gif)

Once the user has filled in all of the search fields, they will be required to click the submit button to generate results. Friend Finder will then review the answer submitted by the user, and compare them to the answers of existing friends stored in the friends.js folder.

![match find gif](https://github.com/jvalentine1/friend-finder/blob/master/app/images/ff-match-gif.gif)


Friend finder accomplishes the matching process by adding all of the scores taken in by the user together and then comparing them to an array of the total scores of existing friends. Whichever friend has the lowest difference in score will be the match generated. 

```javascript
function compareFriends(userData, storedData) {
    var valueDiff = [];

    var userScores = userData[0].scores;

    for (let i = 0; i < storedData.length; i++) {
        let dataScores = storedData[i].scores;

        var scoreDiff = [];

        for (let j = 0; j < userScores.length; j++) {
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

    for (let i = 0; i < array.length; i++) {
        if (lowestVal === array[i]) {
            generateMatch(data[i], userData);
        }
    }
}
```

 There is also validation on Friend Finder. If the user has not filled out all required fields than the will be notified of an incomplete submission. 

 ![validation gif](https://github.com/jvalentine1/friend-finder/blob/master/app/images/ff-validation-gif.gif)

 Friend Finder will also store the user's newly added information in the friends JSON object for the remainder of the session.

 ![json add gif](https://github.com/jvalentine1/friend-finder/blob/master/app/images/ff-json-add-gif.gif)

 ## Setting Up Your Machine

 To run Friend Finder on your local machine, you will need to install the following npm packages. 

    * npm install express
    * npm install path
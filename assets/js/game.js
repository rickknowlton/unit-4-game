
$(document).ready(function () {


    //------------------------------------------//
    //              Game Variables              //
    //------------------------------------------//
    // Global variables are defined, including  //
    // an empty array to store crystal values   //
    // and our game preset status values.       //
    //------------------------------------------//


    var randomNumber;
    var crystalNumbers = [];

    var crystalOne;
    var crystalTwo;
    var crystalThree;
    var crystalFour;

    var totalScore = 0;
    var wins = 0;
    var losses = 0;
    var gameOn;
    var winning = false;
    var losing = false;


    //------------------------------------------//
    //              Number Arrays               //
    //------------------------------------------//
    // Here we create two arrays: one that      //
    // holds our number to match, and another   //
    // that stores the value of each crystal    //
    //------------------------------------------//

    var random = [];
    for (var r = 21; r < 121; r++) {
        random.push(r);
    }

    var crystals = [];
    for (var c = 1; c < 15; c++) {
        crystals.push(c);
    }


    //------------------------------------------//
    //               Load Welcome               //
    //------------------------------------------//
    // This simply hides our "game" window from //
    // the user as they come to our page. It    //
    // also hides our win/loss alert windows    //
    // after they've been deployed.             //
    //------------------------------------------//

    $('#game').hide();
    $('#winner').hide();
    $('#loser').hide();

    //------------------------------------------//
    //             Win/Loss Actions             //
    //------------------------------------------//
    // When a win or loss is triggered, these   //
    // functions are designed to display an     //
    // alert message in the form of a slider.   //
    // It also updates the user's win/loss      //
    // record.                                  //
    //------------------------------------------//

    function gameWin() {
        gameOn = false;
        winning = true;
        wins += 1;
        console.log(totalScore);
        $("#totalNumber").html(totalScore);
        $("#wins").html(wins);
        $('#game').show();
        $('#winner').html("<div class='col-lg-12 col-md-12 mx-0 mb-4'> <div class='card' id='win-card'> <div class='card-body'> <h3 class='text-center' id='win-message'>You Won! Gimlet fixed his wand! Press any key to continue!</h3> </div> </div> </div>");
        $('#winner').slideDown("slow");

    }

    function gameOver() {
        gameOn = false;
        losing = true;
        losses += 1;
        $("#totalNumber").html(totalScore);
        $("#losses").html(losses);
        $('#loser').html("<div class='col-lg-12 col-md-12 mx-0 mb-4'> <div class='card' id='loss-card'> <div class='card-body'> <h3 class='text-center' id='loss-message'>Oh no! You lost! Press any key to continue!</h3> </div> </div> </div>");
        $('#loser').slideDown("slow");
    }


    //------------------------------------------//
    //             Initialize Game              //
    //------------------------------------------//
    // In this section, we'll begin our game.   //
    // We set some initial values as the game   //
    // starts up.                               //
    //------------------------------------------//

    function gameInit() {
        gameOn = true;
        winning = false;
        losing = false;
        pickRandomNumber(random); // random number to match
        pickRandomCrystals(crystals); // array of random crystal values
        crystalValues(crystalNumbers);
    };


    //------------------------------------------//
    //                Game Reset                //
    //------------------------------------------//

    function gameReset() {
        crystalNumbers = []; // clears crystal number values
        pickRandomNumber(random);
        pickRandomCrystals(crystals);
        crystalValues(crystalNumbers);
        totalScore = 0;
        $('#game').show();
        $("#totalNumber").html(totalScore);
        gameInit();

    }


    //------------------------------------------//
    //              Game Mechanics              //
    //------------------------------------------//
    // Here we define our game mechanics; how a //
    // a number is generated, how a crystal     //
    // value is generated, what happens with a  //
    // button "click," and of course how the    //
    // user wins or loses.                      //
    //------------------------------------------//

    function pickRandomNumber(array) {
        var x = array[Math.floor(Math.random() * array.length)];
        randomNumber = x;
        $("#randomNumber").html(randomNumber);

    }

    function pickRandomCrystals(array) {
        for (var y = 0; y < 4; y++) {
            var a = array[Math.floor(Math.random() * array.length)];
            crystalNumbers.push(a);
        }
    }

    function crystalValues(array) {

        for (i = 0; i < array.length; i++) {
            $("#button-" + (i + 1)).attr("value", array[i]);
        }

        crystalOne = array[0];
        crystalTwo = array[1];
        crystalThree = array[2];
        crystalFour = array[3];
    }

    $("#button-1").on("click", function () {
        totalScore += crystalOne;
        $("#totalNumber").html(totalScore);
    });

    $("#button-2").on("click", function () {
        totalScore += crystalTwo;
        $("#totalNumber").html(totalScore);
    });

    $("#button-3").on("click", function () {
        totalScore += crystalThree;
        $("#totalNumber").html(totalScore);
    });

    $("#button-4").on("click", function () {
        totalScore += crystalFour;
        $("#totalNumber").html(totalScore);
    });

    $("button").on("click", function () {
        if (totalScore == randomNumber) {
            gameWin();
        } else if (totalScore > randomNumber) {
            gameOver();
        }
    });


    //------------------------------------------//
    //          Key Capture Function            //
    //------------------------------------------//

    document.onkeyup = function (event) {
        if (!gameOn) {
            if (winning) {
                gameReset();
                $('#winner').slideUp("slow");
            } else if (losing) {
                gameReset();
                $('#loser').slideUp("slow");
            } else if (!winning) {
                $('#sprite').fadeOut("slow");
                $('#welcome').slideUp("slow", gameReset());
            }

        }
    }
});
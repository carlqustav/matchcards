//global variables
var selected = 0;
var selectedCard;

class Table {
    constructor() {
        this.remainingTry = 13;
        this.totalMatch = 0;
        this.grid = new Array(5);
        for (var i = 0; i < this.grid.length; i++) {
            this.grid[i] = new Array(5);
        }
        this.imgInfo = shuffle();

        console.log(this.imgInfo);
        for (var i = 0; i < 5; i++) {
            var tr = $("<tr class='cardrow'></tr>").appendTo($("#game"));
            for (var j = 0; j < 5; j++) {
                this.grid[i][j] = $(`<td class="card" id="${i * 5 + j}"></td>`).css({ backgroundImage: `url(images/qm.png)` });
                tr.append(this.grid[i][j]);
            }
        }
    }
}

//shuffling an array of image ids into a 2d array to create the random order
function shuffle() {
    //var randoms = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13];
    var randoms = [1, 1, 1, 1, 2, 2, 4, 4, 4, 5, 6, 6, 6, 6, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13];
    for (let i = randoms.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [randoms[i], randoms[j]] = [randoms[j], randoms[i]];
    }
    return randoms;
}

function showCard(card, imgs) {

    card.animate({ opacity: "0" }, 500, function () {
        card
            .css({ backgroundImage: `url(images/${imgs[card.attr("id")]}.jpg)` })
            .animate({ opacity: "1" }, 500);
    });
}

function hideCards(card1, card2, imgs) {
    setTimeout(function () {
        card1.animate({ opacity: "0" }, 500, function () {
            card1
                .css({ backgroundImage: `url(images/qm.png)` })
                .animate({ opacity: "1" }, 500);
        });

        card2.animate({ opacity: "0" }, 500, function () {
            card2
                .css({ backgroundImage: `url(images/qm.png)` })
                .animate({ opacity: "1" }, 500, function () {
                    //re enabling card selection at the end of the animations 
                    selected = 0;
                });
        });
    }, 1500);
}

$(function () {
    var game = new Table();
    $("#remaining").html("" + game.remainingTry);
    $("#remaining").css({ color: "green" });
    $(".card").on("click", function () {
        console.log(selected, selectedCard);
        //if the card is already selected or mathced or it is finished, nothing happens
        if ($(this).css("background-image").includes("qm.png") && game.remainingTry > 0) {
            //if nothing is selected
            if (selected === 0) {
                selectedCard = $(this);
                showCard($(this), game.imgInfo);
                selected++;
            }
            //if one card is already selected
            else if (selected === 1 && selectedCard.attr("id") !== $(this).attr("id")) {

                selected = -1; // temporary disabling card picking in case someone clicks on another card

                //checking the match
                showCard($(this), game.imgInfo);
                if (game.imgInfo[selectedCard.attr("id")] == game.imgInfo[$(this).attr("id")]) {
                    selected = 0;
                    game.totalMatch++;
                } else {
                    hideCards($(this), selectedCard, game.imgInfo);
                    selectedCard = undefined;
                }

                game.remainingTry -= 1;
                $("#remaining").html("" + game.remainingTry);
            }

            if (game.remainingTry === 0) {

                if (game.totalMatch < 2) {
                    $("#message").css({ color: "darkred" });
                }
                else if (game.totalMatch < 5) {
                    $("#message").css({ color: "red" });
                }
                else if (game.totalMatch < 8) {
                    $("#message").css({ color: "yellow" });
                }
                else if (game.totalMatch < 11) {
                    $("#message").css({ color: "green" });
                }
                else {
                    $("#message").css({ color: "darkgreen" });
                }
                $("#retry-button").fadeIn(1000);
                $("#message").animate({ opacity: 0 }, 1000);
                $("#message").animate({ opacity: 1 }, 1000);
                setTimeout(function () {
                    $("#message").html("You had a total of " + game.totalMatch + " matches.");
                }, 1001);
            }
            else {
                if (game.remainingTry <= 2) {
                    $("#remaining").css({ color: "darkred" });
                }
                else if (game.remainingTry < 5) {
                    $("#remaining").css({ color: "red" });
                }
                else if (game.remainingTry < 8) {
                    $("#remaining").css({ color: "yellow" });
                }
                else if (game.remainingTry < 11) {
                    $("#remaining").css({ color: "green" });
                }
                else {
                    $("#remaining").css({ color: "darkgreen" });
                }
            }
        }

        console.log(selected, selectedCard);
    });
});
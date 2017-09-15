
//......................................... details to the chess object

$("div > div > div > div > div > div > div").click(function () {

    var chessman = $(this).attr("id");
    var chessmanParent = $(this).parent().attr("id");
    var team = checkTeam(chessman);

    if (!checkMateStatus) {
        if ((checkAnyCrossing().length > 0) && (team !== ChessObject.team)) {

            var selectedDivsParent = $(this).parent().attr("id");
            var selectedDiv = $(this).attr("id");
            var team = checkTeam(selectedDiv);

            //...............(cmnt)chessman movement place one
            if ($("#" + selectedDivsParent).hasClass("cross") && (!selectedDiv.includes("king"))) {
                moveToCrossQueue(chessman, team);
                findCrossedChessman(selectedDiv);
                $("#" + ChessObject.chessmanId).appendTo("#" + selectedDivsParent);
                moveToCrossQueue(chessman, team);
                removeAllCross();
                removeAllPath();
                findTurn();
                checkMate();
                turnChessBoard();
            }
        } else {
            removeAllCross();
            removeAllPath();
            ChessObject.chessmanId = chessman;
            ChessObject.chessmanParentId = chessmanParent;
            ChessObject.team = checkTeam(ChessObject.chessmanId);
            findName(ChessObject.chessmanId);
        }
    } else {
        alert("Game Over");
    }
});

$(document).ready(function () {
    var count=0;
    for(var i =0;i< col.length;i++){
        for(var j =0;j< col.length;j++){
            var temId=col[i]+row[j];
            DIV_IDS[count]=temId;
            count++;
        }
    }
});

//...........................................checkmate status
var checkMateStatus=false;

//................................chess object

var ChessObject={
    team:"",
    chessmanId:"",
    chessmanParentId:""
};

//................................find the crossing chessman index from Chessmans divs id aray

function findCrossedChessman(id) {
    for(var i=0;i<CHESSMANS_IDS.length;i++){
        if(id==CHESSMANS_IDS[i]){
            CHESSMANS_IDS.splice(i,1);
            if(CHESSMANS_IDS[i].includes("w")){
                $("#"+id).toggleClass('rotate');
            }
            break;
        }
    }
}

//.................................add cross chessmans to cross queue
function moveToCrossQueue(id, team) {
    if(team==="b"){
        for(var i=0; i<15;i++){
            if($("#"+CROSS_DIV_IDS[i]).children().length===0){
                $("#"+id).appendTo($("#"+CROSS_DIV_IDS[i]));
                break;
            }
}

    } else if (team === "w") {
        for (var i = 15; i < CROSS_DIV_IDS.length; i++) {
            if ($("#" + CROSS_DIV_IDS[i]).children().length === 0) {
                $("#" + id).appendTo($("#" + CROSS_DIV_IDS[i]));
                break;
            }
        }
    }
}

//..................................move a chessman to a selected path
$("div > div > div > div > div > div").click(function () {

    var selectedDiv = $(this).attr("id");
    if (($("#" + selectedDiv).hasClass("path")) && (!selectedDiv.includes("king"))) {
        $("#" + ChessObject.chessmanId).appendTo("#" + selectedDiv);
        removeAllCross();
        removeAllPath();
        findTurn();
        checkMate();
        turnChessBoard();

    }

});
//.............................find the pawn path to move
function findPawnPath(currentPos, team, from) {
    if (from !== "check") {
        removeAllCross();
        removeAllPath();
    }
    var count = 0;
    if ((currentPos !== null) && (currentPos !== undefined)) {

        //.......................the position with X and Y
        var x = currentPos.substr(0, 1);
        var y = currentPos.substr(1, 1);

        var xIndex = getXIndex(x);
        var yIndex = getYIndex(y);

        //...........................check movement divs for white pawns
        if (team === "w") {
            for (var j = 0; j < row.length; j++) {
                //..............................check it is the first movement for a pawn
                //......................if it is the first select first two divs
                if ((y === "2")) {
                    if ($("#" + x + "3").children().length === 0) {
                        $("#" + x + "3").addClass("path");
                        if ($("#" + x + "4").children().length === 0) {
                            $("#" + x + "4").addClass("path");
                            //removeAllCross();
                        }
                    }

                    //......................if it is not the first movement looking for a div to move
                } else {
                    var content = $("div > div > div > div > div > div > div").attr("id");

                    if ((content !== null) && (content !== undefined)) {
                        if ((count < 1) && ($("#" + x + (row[yIndex + 1])).children().length === 0)) {
                            $("#" + x + (row[yIndex + 1])).addClass("path");
                            //removeAllCross();
                            count++;
                        }
                    }
                }

                if ($("#" + col[xIndex + 1] + row[yIndex + 1]).children().length > 0) {
                    var id = $("#" + col[xIndex + 1] + row[yIndex + 1]).children().attr("id");
                    var team = checkTeam(id);
                    if (team === "b") {
                        $("#" + col[xIndex + 1] + row[yIndex + 1]).addClass("cross");
                        //....removeAllPath();
                    }
                }
                if ($("#" + col[xIndex - 1] + row[yIndex + 1]).children().length > 0) {
                    var id = $("#" + col[xIndex - 1] + row[yIndex + 1]).children().attr("id");
                    var team = checkTeam(id);
                    if (team === "b") {
                        $("#" + col[xIndex - 1] + row[yIndex + 1]).addClass("cross");
                    }
                }
            }

            //.................check movement divs for black pawns
        } else {
            for (var j = row.length; j > 0; j--) {
                if (y === "7") {
                    if ($("#" + x + "6").children().length === 0) {
                        $("#" + x + "6").addClass("path");
                        if ($("#" + x + "5").children().length === 0) {
                            $("#" + x + "5").addClass("path");

                        }
                    }
                } else {
                    var content = $("div > div > div > div > div > div > div").attr("id");
                    if ((content !== null) && (content !== undefined)) {
                        if ((count < 1) && ($("#" + x + (row[yIndex - 1])).children().length === 0)) {
                            $("#" + x + (row[yIndex - 1])).addClass("path");

                            count++;
                        }
                    }
                }
                if ($("#" + col[xIndex + 1] + row[yIndex - 1]).children().length > 0) {
                    var id = $("#" + col[xIndex + 1] + row[yIndex - 1]).children().attr("id");
                    var team = checkTeam(id);
                    if (team === "w") {
                        $("#" + col[xIndex + 1] + row[yIndex - 1]).addClass("cross");
                        //................removeAllPath();
                    }
                }
                if ($("#" + col[xIndex - 1] + row[yIndex - 1]).children().length > 0) {
                    var id = $("#" + col[xIndex - 1] + row[yIndex - 1]).children().attr("id");
                    var team = checkTeam(id);
                    if (team === "w") {
                        $("#" + col[xIndex - 1] + row[yIndex - 1]).addClass("cross");
                        //..................removeAllPath();
                    }
                }
            }
        }

    }
}

var DIV_IDS=[];

// ..........................................> side

var col=["a","b","c","d","e","f","g","h"]
//........................................up side

var row=["1","2","3","4","5","6","7","8"];

//...................chessmens's div ids

var CHESSMANS_IDS=[
    "black-r-rook","black-r-knight","black-r-bishop","black-a-queen","black-a-king","black-r-bishop","black-r-knight","black-r-rook","black-1-pown","black-2-pown","black-3-pown","black-4-pown","black-5-pown","black-6-pown",
    "black-7-pown","black-8-pown","white-1-pown","white-2-pown","white-3-pown","white-4-pown","white-5-pown","white-6-pown","white-7-pown","white-8-pown","white-r-rook","white-r-knight","white-r-bishop","white-a-king",
    "white-a-queen","white-l-bishop","white-l-knight","white-l-rook"];

//...............................chessman cross divs ids

var CROSS_DIV_IDS=["cross1","cross2","cross3","cross4","cross5","cross7","cross8","cross9","cross10","cross11","cross12","cross13","cross14","cross15","cross16","cross17",
    "cross18","cross19","cross20","cross21","cross22","cross23","cross24","cross25","cross26","cross27","cross28","cross29","cross30","cross31","cross32"]
//...............................path for a chessman

var path=[];

var turn="w";
//.............................find chessman team
function checkTeam(id) {
    playSound();
    var details = id.split("-");

    //................................this find the chessman team
    switch (details[0]) {
        case "black":
            return "b";
        case "white":
            return "w";
    }
}
//.......................................this fid out the chessman name
function findName(id) {

    var details = id.split("-");

    if (turn === ChessObject.team) {

        switch (details[2]) {
            case "pown":
                ChessObject.chessman = "pawn";
                findPawnPath(ChessObject.chessmanParentId, ChessObject.team);
                break;
            case "rook" :
                ChessObject.chessman = "ruk";
                findRukPath(ChessObject.chessmanParentId, ChessObject.team);
                break;
            case "bishop":
                ChessObject.chessman = "bishop";
                findBishopPath(ChessObject.chessmanParentId, ChessObject.team);
                break;
            case "knight":
                ChessObject.chessman = "knight";
                findknightPath(ChessObject.chessmanParentId, ChessObject.team);
                break;
            case "king":
                ChessObject.chessman = "king";
                findKingPath(ChessObject.chessmanParentId, ChessObject.team);
                break;
            case "queen":
                ChessObject.chessman = "queen";
                findQueenPath(ChessObject.chessmanParentId, ChessObject.team, "queen");
                break;
        }

    } else {
        if ((turn === "w") && (checkAnyCrossing().length === 0) && (checkAnyPath().length === 0)) {
            alert("This is white team turn");
        } else if ((turn === "b") && (checkAnyCrossing().length === 0) && (checkAnyPath().length === 0)) {
            alert("This is black team turn");
        }
    }
}


//................................this method use ruks and bishops method to find the path
function findQueenPath(currentPos, team, from) {
    findBishopPath(ChessObject.chessmanParentId, ChessObject.team, from);
}


//........................this method use for finding king path
function findKingPath(currentPos, team, from) {

    removeAllCross();
    removeAllPath();

    var pathArray = [];
    var crossArray = [];
    var check = [];

    var content = $("div > div > div > div > div > div > div").attr("id");

    if ((content !== null) && (content !== undefined)) {
        if ((currentPos !== null) && (currentPos !== undefined)) {
            //the position with X and Y
            var x = currentPos.substr(0, 1);
            var y = currentPos.substr(1, 1);

            var xIndex = getXIndex(x);
            var yIndex = getYIndex(y);

            for (var i = 0; i < DIV_IDS.length; i++) {

                var tempX = DIV_IDS[i].substr(0, 1);
                var tempY = DIV_IDS[i].substr(1, 1);

                var newX = getXIndex(tempX);
                var newY = getYIndex(tempY);

                if ((Math.abs(newX - xIndex) <= 1) && (Math.abs(newY - yIndex) <= 1)) {
                    if ($("#" + DIV_IDS[i]).children().length > 0) {
                        if (checkTeam($("#" + DIV_IDS[i]).children().attr("id")) !== team) {
                            if (from !== "check") {
                                crossArray.push($("#" + DIV_IDS[i]).attr("id"));

                            } else {
                                if ($("#" + DIV_IDS[i]).children().attr("id").includes("king")) {
                                    check.push($("#" + DIV_IDS[i]).attr("id"));
                                    break;
                                }
                            }
                        }
                    }
                    if ($("#" + DIV_IDS[i]).children().length === 0) {
                        pathArray.push($("#" + DIV_IDS[i]).attr("id"));
                    }
                }
            }


            if (from !== "check") {
                colorCrossPath(crossArray);
                colorPath(pathArray);
            } else {
                return check;
            }

        }
    }
}

//.......................................this method use find knight path
function findknightPath(currentPos, team, from) {
    removeAllCross();
    removeAllPath();

    var pathArray = [];
    var crossArray = [];
    var check = [];

    var content = $("div > div > div > div > div > div > div").attr("id");

    if ((content !== null) && (content !== undefined)) {
        if ((currentPos !== null) && (currentPos !== undefined)) {
            var x = currentPos.substr(0, 1);
            var y = currentPos.substr(1, 1);

            var xIndex = getXIndex(x);
            var yIndex = getYIndex(y);

            for (var i = 0; i < DIV_IDS.length; i++) {
                var tempX = DIV_IDS[i].substr(0, 1);
                var tempY = DIV_IDS[i].substr(1, 1);

                var newX = getXIndex(tempX);
                var newY = getYIndex(tempY);

                if (((Math.abs(xIndex - newX) === 1) && ((Math.abs(yIndex - newY)) === 2)) | (((Math.abs(xIndex - newX)) === 2) && ((Math.abs(yIndex - newY)) === 1))) {
                    if ($("#" + DIV_IDS[i]).children().length > 0) {
                        if (checkTeam($("#" + DIV_IDS[i]).children().attr("id")) !== team) {
                            if (from !== "check") {
                                crossArray.push($("#" + DIV_IDS[i]).attr("id"));

                            } else {
                                if ($("#" + DIV_IDS[i]).children().attr("id").includes("king")) {
                                    check.push($("#" + DIV_IDS[i]).attr("id"));
                                    break;
                                }
                            }
                        }
                    }
                    if ($("#" + DIV_IDS[i]).children().length === 0) {
                        pathArray.push($("#" + DIV_IDS[i]).attr("id"));
                    }
                }
            }
        }
        if (from !== "check") {
            colorCrossPath(crossArray);
            colorPath(pathArray);
        } else {
            return check;
        }

    }
}

//.............................color the path
function colorPath(path) {
    for (var i = 0; i < path.length; i++) {
        $("#" + path[i]).addClass("path");
    }
}

//........................color the cross path
function colorCrossPath(cross) {
    for (var i = 0; i < cross.length; i++) {
        $("#" + cross[i]).addClass("cross");
    }
}

function getXIndex(x) {
    for (var i = 0; i < col.length; i++) {
        if (x === col[i]) {
            return i;
        }
    }
}

function getYIndex(y) {
    for (var i = 0; i < row.length; i++) {
        if (y === row[i]) {
            return i;
        }
    }
}

function removeAllPath() {
    for (var i = 0; i < DIV_IDS.length; i++) {
        $("#" + DIV_IDS[i]).removeClass("path");
    }
}


function removeAllCross() {
    for (var i = 0; i < DIV_IDS.length; i++) {
        $("#" + DIV_IDS[i]).removeClass("cross");
    }
}

//........................if any cross path selected get all cross paths
function checkAnyCrossing() {

    var count = 0;
    var crossArray = new Array();
    for (var i = 0; i < DIV_IDS.length; i++) {
        if ($("#" + DIV_IDS[i]).hasClass("cross")) {
            crossArray.push(DIV_IDS[i]);
            count++;
        }
    }
    return crossArray;
}

//..................if any path selected get all selected paths
function checkAnyPath() {

    var count = 0;
    var pathArray = new Array();
    for (var i = 0; i < DIV_IDS.length; i++) {
        if ($("#" + DIV_IDS[i]).hasClass("cross")) {
            pathArray.push(DIV_IDS[i]);
            count++;
        }
    }

    return pathArray;
}

//........................find the team turn it is
function findTurn() {
    if (turn === "w") {
        turn = "b";
    } else {
        turn = "w";
    }
}

function playSound() {
   function play() {
       var audio=document.getElementById("audio");
       audio.play();
   }

}
//...................find the ruk path to move
function findRukPath(currentPos, team, from) {

    if (from !== "queen") {
        removeAllCross();
        removeAllPath();
    }

    var pathArray = [];
    var crossArray = [];
    var check = [];
    var content = $("div > div > div > div > div > div > div").attr("id");

    if ((content !== null) && (content !== undefined)) {
        if ((currentPos !== null) && (currentPos !== undefined)) {

            //...................................the position with X and Y
            var x = currentPos.substr(0, 1);
            var y = currentPos.substr(1, 1);

            var xIndex = getXIndex(x);
            var yIndex = getYIndex(y);

            //........................check movement divs for white ruks
            //................if (team === "w") {

            //....................look path or cross for =====> side
            for (var i = xIndex + 1; i < row.length; i++) {

                if ($("#" + col[i] + row[yIndex]).children().length === 0) {
                    pathArray.push($("#" + col[i] + row[yIndex]).attr("id"));
                }
                if ($("#" + col[i] + row[yIndex]).children().length > 0) {
                    if (checkTeam($("#" + col[i] + row[yIndex]).children().attr("id")) !== team) {

                        if (from !== "check") {
                            crossArray.push($("#" + col[i] + row[yIndex]).attr("id"));
                            break;
                        } else {
                            if ($("#" + col[i] + row[yIndex]).children().attr("id").includes("king")) {
                                check.push($("#" + col[i] + row[yIndex]).attr("id"));
                                break;
                            }
                        }
                    } else {
                        break;
                    }
                }
            }

            //...................find path or cross for <===== side
            for (var i = xIndex - 1; i > -1; i--) {

                if ($("#" + col[i] + row[yIndex]).children().length === 0) {
                    pathArray.push($("#" + col[i] + row[yIndex]).attr("id"));
                }
                if ($("#" + col[i] + row[yIndex]).children().length > 0) {
                    if (checkTeam($("#" + col[i] + row[yIndex]).children().attr("id")) !== team) {

                        if (from !== "check") {
                            crossArray.push($("#" + col[i] + row[yIndex]).attr("id"));
                            break;
                        } else {
                            if ($("#" + col[i] + row[yIndex]).children().attr("id").includes("king")) {
                                check.push($("#" + col[i] + row[yIndex]).attr("id"));
                                break;
                            }
                        }
                    } else {
                        break;
                    }
                }
            }

            //.............................look path or cross for up side
            for (var i = yIndex + 1; i < col.length; i++) {

                if ($("#" + col[xIndex] + row[i]).children().length === 0) {
                    pathArray.push($("#" + col[xIndex] + row[i]).attr("id"));
                }
                if ($("#" + col[xIndex] + row[i]).children().length > 0) {

                    if (checkTeam($("#" + col[xIndex] + row[i]).children().attr("id")) !== team) {

                        if (from !== "check") {
                            crossArray.push($("#" + col[xIndex] + row[i]).attr("id"));
                            break;
                        } else {
                            if ($("#" + col[xIndex] + row[i]).children().attr("id").includes("king")) {
                                check.push($("#" + col[xIndex] + row[i]).attr("id"));
                                break;
                            }
                        }
                    } else {
                        break;
                    }
                }
            }

            //..................look path or cross for down side
            for (var i = yIndex - 1; i > -1; i--) {
                if ($("#" + col[xIndex] + row[i]).children().length === 0) {
                    pathArray.push($("#" + col[xIndex] + row[i]).attr("id"));
                }
                if ($("#" + col[xIndex] + row[i]).children().length > 0) {
                    if (checkTeam($("#" + col[xIndex] + row[i]).children().attr("id")) !== team) {

                        if (from !== "check") {
                            crossArray.push($("#" + col[xIndex] + row[i]).attr("id"));
                            break;
                        } else {
                            if ($("#" + col[xIndex] + row[i]).children().attr("id").includes("king")) {
                                check.push($("#" + col[xIndex] + row[i]).attr("id"));
                                break;
                            }
                        }
                    } else {
                        break;
                    }
                }

            }
        }
        if (from !== "check") {
            colorCrossPath(crossArray);
            colorPath(pathArray);
        } else {
            return check;
        }
    }
}

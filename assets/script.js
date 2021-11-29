var getCurrentDate = function() {
    var currentDateTime = new Date();
    var formattedDate = moment(currentDateTime).format("dddd, MMMM Do");
    return formattedDate;
}

var setCurrentDate = function(){
    $(".jumbotron #currentDay").text(getCurrentDate());
}

setCurrentDate();
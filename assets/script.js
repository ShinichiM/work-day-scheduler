var tasks =[];

// Gets current date and formats to DayOfWeek, Month Date(#th) 
var getCurrentDate = function () {
    var currentDateTime = new Date();
    var formattedDate = moment(currentDateTime).format("dddd, MMMM Do");
    return formattedDate;
}

// sets current date to jumbotron
var setCurrentDate = function () {
    $(".jumbotron #currentDay").text(getCurrentDate());
}

// retrieves and returns current hour and if current hour has passed
var getCurrentHour = function () {
    var hour = moment().format('HH');
    return (hour);
}

// parse the schedule time, converting schedule time to military
var formatAmPm = function(string) {
    // variable to hold formatted string to return
    var formattedTime = "";

    // initial character
    var firstChar = string[0];
    // next character
    var nextChar = string[1];

    // first check if double digit or single digit
    if (isNaN(parseInt(nextChar))) {
        // single digit
        if (nextChar === "A") {
            firstChar = parseInt(firstChar) - 12;
        }
        formattedTime = formattedTime.concat(firstChar);
    } else {
        // double digit
        var thirdChar = string[2];
        if (thirdChar === "A") {
            var hold = firstChar.concat(nextChar)
            formattedTime = formattedTime.concat(parseInt(hold)-12);
        } else {
            var hold = firstChar.concat(nextChar);
            formattedTime = formattedTime.concat(parseInt(hold)-12);
        }
    }   
    var time = String(parseInt(formattedTime)+12);

    return time;
};

// Compare schedule time with current local time
var scheduleTimeCompare = function () {
    // get the current hour of day 
    var currentHour = getCurrentHour();

    // get all time elements within the scheduler
    var scheduleTimeArr = $(".container > .row > #time");
     
    // loop through each time slot in the schedule and set the background colors of each task box
    scheduleTimeArr.each(function(){
        var timeOfDay = formatAmPm($(this).text());
        if(parseInt(currentHour) > parseInt(timeOfDay)) {
            $(this).siblings("#task").addClass("past")
        }  else if (parseInt(currentHour) === parseInt(timeOfDay)) {
            $(this).siblings("#task").addClass("present");
        }
        else {
            $(this).siblings("#task").addClass("future");
        }
    });
};

// save tasks to local storage
var saveTask = function() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

// Load previous stored tasks from local storage, if no storage available
// load default values in tasks array.
var loadTask = function() {
    // get task items from local storage
    parsedTask = JSON.parse(localStorage.getItem("tasks"));

    if (!parsedTask) {
        $('*textarea').each(function() {
            tasks.push(
            $(this).val().trim()
            );
        });
        saveTask(tasks);
    } else {
        // update tasks array to hold stored tasks
        for (let i = 0; i < parsedTask.length; i++) {
            const element = parsedTask[i];
            tasks.push(element);

            $("*textarea").each(function(){
                console.log($(this).closest(".row").index())
                if($(this).closest(".row").index() === i) {
                    $(this).val(element);
                }
            });  
        }
    }
};

// get eventlistener for text area
$("textarea").on("click", function() {
    $(this).trigger("focus");
    console.log("task update");
});

// listen to off click on text area then update tasks array
$("textarea").on("blur", function() {
    console.log("is this even working");
    var text = $(this)
    .val();
    
    var index = $(this)
    .closest(".row")
    .index();

    tasks[index] = text;
});

// listen to save clicks from user, then save new task array
$("button").on("click", function(){
    console.log("Clicked Save")
    saveTask(tasks);
});

// get eventlistener for save button
// save text area task to local storage


loadTask();
setCurrentDate();
getCurrentHour();
scheduleTimeCompare();
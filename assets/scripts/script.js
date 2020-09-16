document.getElementById("addBtn").addEventListener("click", addTask);
document.getElementById("showAllBtn").addEventListener("click", showAllTask);
document.getElementById("showActiveBtn").addEventListener("click", showActiveTask);
document.getElementById("showCompleteBtn").addEventListener("click", showCompleteTask);
document.getElementById("sortTimeBtn").addEventListener("click", sortTaskTime);
document.getElementById("sortLexicoBtn").addEventListener("click", sortTaskLexico);

var tasks = [];

function Task() {
    this.taskName;
    this.done = 0; //t-f
    this.time;
}

//Add
function addTask() {
    var temp = document.getElementById("text");

    if (temp.value != "") {
        var dt = new Date();

        var t1 = new Task();
        t1.taskName = temp.value;
        t1.time = dt.getTime(); //this.time ->freeze  in constructor, modules

        tasks.push(t1);
        temp.value = null;
    }
    showAllTask();

}

//Display Function
function display(arr, temp) {
    var list = "<ul>";
    for (var i = 0; i < arr.length; i++) {
        { list += "<li>" + arr[i].taskName + "</li>" }
    }
    list += "</ul>";
    document.getElementById("result").innerHTML = temp + list;
}

//Show All
function showAllTask() {
    var temp = "<h2> All Tasks</h2><br>";
    var list = "<ul>";

    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].done == 0) {
            list += "<li>" + "<input type=\"checkbox\"  class=\"check\" id=\"" + i + "\">" + tasks[i].taskName + "<button type = \"button\"" + "class=\"btns\" id=" + i + ">Delete</button></li>";
            //console.log("done = 0");
        } else {
            list += "<li>" + "<input type=\"checkbox\"  class=\"check\" id=\"" + i + "\"checked>" + tasks[i].taskName + "<button type = \"button\"" + "class=\"btns\" id=" + i + ">Delete</button></li>";
            //console.log("done = 1");
        }
    }

    list += "</ul>";
    document.getElementById("result").innerHTML = temp + list;

    addEvents();
}


function addEvents() {
    //Checkbox Events

    var ele1 = document.getElementsByClassName("check");
    for (var i = 0; i < ele1.length; i++) {
        ele1[i].addEventListener('click', handleCheckBox);
    }
    //Button Events
    var ele2 = document.getElementsByClassName("btns");
    for (var i = 0; i < ele2.length; i++) {
        ele2[i].addEventListener('click', handleButtons);
        //console.log("adding Events : " + i);
    }
}


function handleCheckBox(e) {
    var index = e.target.getAttribute("id");
    //console.log(index);
    if (tasks[index].done == 0) { tasks[index].done = 1; } else { tasks[index].done = 0; }

}

function handleButtons(e) {

    var index = e.target.getAttribute("id");
    //console.log(index);
    tasks.splice(index, 1);
    showAllTask();
}

//Active Tasks
function showActiveTask() {
    var res = tasks.filter(task => task.done == 0);
    var temp = "<h2>" + res.length + " Tasks Still On Progress</h2><br>";
    display(res, temp);
}


function showCompleteTask() {
    var res = tasks.filter(task => task.done == 1);
    var temp = "<h2>" + res.length + " Tasks Completed</h2><br>";
    display(res, temp);
}


//Sorting
function sortTaskLexico() {
    tasks.sort((a, b) => { if (a.taskName < b.taskName) { return 1; } else { return -1; } });
    var temp = "<h2>Sorted Tasks Lexicographically</h2><br>";
    display(tasks, temp);
}

function sortTaskTime() {
    tasks.sort((a, b) => { return b.time - a.time; });
    var temp = "<h2>Sorted Tasks Time Based</h2><br>";
    display(tasks, temp);
}

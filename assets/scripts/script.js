document.getElementById("showAllBtn").addEventListener("click", showAllTask);
document.getElementById("showActiveBtn").addEventListener("click", showActiveTask);
document.getElementById("showCompleteBtn").addEventListener("click", showCompleteTask);
document.getElementById("sortTimeBtn").addEventListener("click", sortTaskTime);
document.getElementById("sortLexicoBtn").addEventListener("click", sortTaskLexico);
document.getElementById("sortLexicoBtn").addEventListener("click", sortTaskLexico);
document.getElementById("form").addEventListener("submit", formSubmit);

var res = document.getElementById("result");
var tasks = [];


function formSubmit(e) {
    e.preventDefault();

    var check_ele = e.target.elements;

    //Recording text input
    var inputText1 = check_ele[0].value;

    //Recording state of checkbox
    var inputCheck1 = check_ele[1].checked;

    if (inputText1.trim()) { //Check for space string
        var t1 = createObj(inputText1, inputCheck1, +new Date());
        addTask(t1);
    }

    e.target.reset();
}


function Task(name, done, time) { //Encapsulation
    this.taskName = name;
    this.time = time;
    this.done = done; //t-f
}

function createObj(name, done, time) {
    var obj = new Task(name, done, time);
    Object.defineProperties(obj, {
        property1: {
            configurable: false
        },
        property2: {
            configurable: false
        }
    });
    return obj;
}

//Add
function addTask(obj) {
    tasks.push(obj);
    showAllTask();
}

//Display Function
function display(arr, temp) {
    var list = "<ul>";
    for (var i = 0; i < arr.length; i++) {
        { list += "<li>" + arr[i].taskName + "</li>" }
    }
    list += "</ul>";
    res.innerHTML = temp + list;
}

//Show All

function showAllTask(e) {
    var temp = "<h3> All Tasks</h3>";
    var list = "<ul>";

    for (var i = 0; i < tasks.length; i++) { //List into single line
        list += "<li><input type=\"checkbox\"  class=\"check\" id=\"" + i + ((tasks[i].done == false) ? "\">" : "\"checked>") + "  " + tasks[i].taskName + "  <button type = \"button\"" + "class=\"btns\" id=" + i + ">Delete</button></li>";
    }

    list += "</ul";
    res.innerHTML = temp + list;

    addEvents();
}

//Cant be applied simultaneously as DOM painting is dynamic
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
    }
}


function handleCheckBox(e) {
    var index = e.target.getAttribute("id");
    //console.log(index);
    if (tasks[index].done == 0) { tasks[index].done = 1; } else { tasks[index].done = 0; }

}

function handleButtons(e) {

    var index = e.target.getAttribute("id");
    //console.log(status.checked);
    //console.log(index);
    tasks.splice(index, 1);
    showAllTask();
}

//Active Tasks
function showActiveTask() {
    var res = tasks.filter(task => task.done == false);
    var temp = "<h3>" + res.length + " Tasks Still On Progress</h3>";
    display(res, temp);
}


function showCompleteTask() {
    var res = tasks.filter(task => task.done == true);
    var temp = "<h3>" + res.length + " Tasks Completed</h3>";
    display(res, temp);
}


//Sorting
function sortTaskLexico() {
    tasks.sort((a, b) => { if (a.taskName < b.taskName) { return -1; } else { return 1; } });
    var temp = "<h3>Sorted Tasks Lexicographically</h3>";
    display(tasks, temp);
}

function sortTaskTime() {
    tasks.sort((a, b) => { return b.time - a.time; });
    var temp = "<h3>Sorted Tasks Time Based</h3>";
    display(tasks, temp);
}

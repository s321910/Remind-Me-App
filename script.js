var addToReminderList = document.querySelector('#add-reminder');
var form = document.getElementById("add-reminder");
var reminderTitle = document.querySelector('#reminder-title');
var reminderDate = document.querySelector('#reminder-date');
var reminderTime = document.querySelector('#reminder-time');
var reminder = document.querySelector('#remind');
var ul = document.querySelector("ul");
var container = document.querySelector("div");
var lists = document.querySelectorAll("li");
var spans = document.getElementsByTagName("span");
var pencil = document.querySelector("#pencil");
var saveBtn = document.querySelector(".save");
var clearBtn = document.querySelector(".clear");
var tipsBtn = document.querySelector(".tipBtn");
var closeBtn = document.querySelector(".closeBtn");
var overlay = document.getElementById("overlay")

//function to delete reminder if delete span is clicked.
function deletereminder(){
  for(let span of spans){
    span.addEventListener ("click",function (){
      span.parentElement.remove();
      event.stopPropagation();
    });
  }
}

//function to load reminder if list is found in local storage.
function loadreminder(){
  if(localStorage.getItem('reminderList')){
    ul.innerHTML = localStorage.getItem('reminderList');
    deletereminder();
  }
  console.log(today,reminderDate.value,"**");
if(!window.Notification) {
	console.log('Browser does not support notifications.');
} else {
  console.log('We in', reminderDate.value);
  if (Notification.permission === 'granted') {
        // show notification here
        var notify = new Notification('Notification!', {
          body: 'You have a new notification!',
        });
    } else {
        // request permission from user
        Notification.requestPermission().then(function(p) {
           if(p === 'granted') {
               // show notification here
           } else {
               console.log('User blocked notifications.');
           }
        }).catch(function(err) {
            console.error(err);
        });
    }

}
}

addToReminderList.addEventListener('submit', function (event) {
	if (reminderTitle.value.length < 1) return;
  reminder.innerHTML+='<li><span><i class="fas fa-trash-alt"></i></span><i class="fa fa-bell"></i><div style="padding-left:8px;" Reminder Title:</div>' +
  reminderTitle.value +'<p style="margin-top:-7px;padding-left:25px"><i class="fa fa-calender"></i> Date:'+
  reminderDate.value +'<i class="fa fa-clock"></i>Time:'+reminderTime.value+'</li></p>';

  form.reset();
  deletereminder();
});
date = new Date().getDate();
month = new Date().getMonth() + 1;
year = new Date().getFullYear();
today = year + '-' + month + '-' + date;


addToReminderList.addEventListener('submit', function (event) {
	event.preventDefault();
	if (reminderTitle.value.length < 1) return;


	// Save the list to localStorage
  localStorage.setItem('reminderlistItems', reminder.innerHTML);

}, false);

// Check for saved wishlist items
var saved = localStorage.getItem('reminderlistItems');

// If there are any saved items, update our list
if (saved) {
	reminder.innerHTML = saved;
}

// event listener to linethrough list if clicked
ul.addEventListener('click', function(ev) {
    if (ev.target.tagName === 'LI') {
      ev.target.classList.toggle('checked');
    }
  },false
);

//hide input box,when pencil icon is clicked
pencil.addEventListener('click', function(){
  input.classList.toggle('display');
});


//save reminderlist state so user can access it later
saveBtn.addEventListener('click',function(){
  localStorage.setItem('reminderList',ul.innerHTML );
});

//clear all reminder when clear button is clicked
clearBtn.addEventListener('click', function(){
  ul.innerHTML= "";
  localStorage.removeItem('reminderList',ul.innerHTML );
});

//display overlay when tips btn is clicked
tipsBtn.addEventListener("click",function(){
   overlay.style.height = "100%";
});

//close overlay when close btn is clicked
closeBtn.addEventListener("click",function(e){
  e.preventDefault;
  overlay.style.height = "0";

})

//delete reminder
deletereminder();

//load reminder
loadreminder();

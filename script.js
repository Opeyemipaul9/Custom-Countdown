const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownform');
const dateEl = document.getElementById('date-picker');
const countdownEl = document.getElementById('countdown');
const countdownElTitle = document.getElementById('countdown-title');
const timeElements = document.querySelectorAll('span');
const countdownBtn = document.getElementById('countdown-button');
const completeEl = document.getElementById('complete');
const completeElInfo = document.getElementById('complete-info');
const completeBtn =  document.getElementById('complete-button');

let countdownTitle = '';
let countdownDate = '';
let countdownValue = new  Date();
const second  = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;
let countdownActive;
let savedCountdown;

// set Date Input Min with todays date

const today = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min', today);

// pOPULATE cOUNTDOWN / COMPLETE UI
function updateDOM(){
    countdownActive = setInterval(()=>{

        const now = new Date().getTime();
        const distance = countdownValue - now;
        const days = Math.floor(distance / day);
        const hours = Math.floor((distance % day) / hour);
        const minutes = Math.floor((distance % hour) / minute);
        const seconds = Math.floor((distance % minute) / second);
    
        // Populating countdown
        countdownElTitle.textContent = `${countdownTitle}`;
        timeElements[0].textContent = `${days}`;
        timeElements[1].textContent = `${hours}`;
        timeElements[2].textContent = `${minutes}`;
        timeElements[3].textContent = `${seconds}`;
        console.log('james');
    
        // Hide input
        inputContainer.hidden = true;
    
        // Show Countdown 
    
        countdownEl.hidden = false;
        
    }, second);
}
  

// Take VALUES FROM form input

function updateCountdown(e){
    e.preventDefault();
    countdownTitle = e.srcElement[0].value;
    countdownDate = e.srcElement[1].value;
    savedCountdown = {
        title:countdownTitle,
        date:countdownDate,
    };
    // Converting oject to strings in Local Storage
    localStorage.setItem('countdown', JSON.stringify(savedCountdown));
    
    // check for valid dates
    if(countdownDate === ''){
        alert('please select a date for the countdown.')
    }
    else{
        countdownValue = new Date(countdownDate).getTime();
        updateDOM();
   
    }
}

// Reset All VALUES
function reset(){
    // hide Countdown , show input
    countdownEl.hidden= true;
    inputContainer.hidden = false;
    // Stop the Countdown
    clearInterval(countdownActive);
    // Reset Values
    countdownTitle = '';
    countdownDate = '';
    localStorage.removeItem('countdown');
}

function restorePreviousCountdown(){
    // Get countdown from localstorage if availbale
    if(localStorage.getItem('countdown')){
        inputContainer.hidden = true;
        savedCountdown =JSON.parse(localStorage.getItem('countdown'));
        countdownTitle =  savedCountdown.title;
        countdownDate = savedCountdown.date
        countdownValue = new Date(countdownDate).getTime();
        updateDOM();
    }
}


// Event Listener
countdownForm.addEventListener('submit',updateCountdown);
countdownBtn.addEventListener('click', reset);
completeBtn.addEventListener('click', reset);

// On load , check localstorage

restorePreviousCountdown();
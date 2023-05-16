const inputContainer = document.getElementById('input-container')
const countdownForm = document.getElementById('countdownForm')
const dateEl = document.getElementById('date-picker')

const countdownEl = document.getElementById('countdown');
const countdownElTitle = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span');

let countdownTitle = '';
let countdownDate = '';
let countdownValue = Date;

// Basic Math Section in Milliseconds

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// Set Date Input Minimum with Today's Date

const today = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min', today);

// Populate Countdown / Complete UI

function updateDOM() {
    // How far it is in milliseconds from Jan 1 1970
    const now = new Date().getTime();
    const distance = countdownValue - now;
    console.log('distance', distance);

    // Math floor returns largest whole number. 1.8 would be 1, not 2
    const days = Math.floor(distance / day);
    // % refers to remainder operator
    // If 1.8 days returns a whole number of 1, the remainder operator
    // divides the .8 by hour constant to get the number of hours
    const hours = Math.floor((distance % day) / hour );
    const minutes = Math.floor((distance % hour) / minute );
    const seconds = Math.floor((distance % minute) / second );
    console.log(days, hours, minutes, seconds);

    // Populate Countdown with Values
    // textContent is a secure way to change a text value of an HTML eleemnt
    countdownElTitle.textContent = `${countdownTitle}`;
    timeElements[0].textContent = `${days}`;
    timeElements[1].textContent = `${hours}`;
    timeElements[2].textContent = `${minutes}`;
    timeElements[3].textContent = `${seconds}`;

    // Hide Input
    inputContainer.hidden = true;
    // Show Countdown
    countdownEl.hidden = false;
}

// Take Values from Form Input

function updateCountdown(e){
    e.preventDefault();
    // srcElement is going in order of form elements. 
    // countdownTitle is the first element so it has 0 value,
    // followed by countdownDate as 1. If there was another element
    // in the form it would have the value of 2
    countdownTitle = e.srcElement[0].value;
    countdownDate = e.srcElement[1].value;
    console.log(countdownTitle, countdownDate);
    // Get number version of current date, update DOM
    countdownValue = new Date(countdownDate).getTime();
    console.log('countdown value:', countdownValue);
    updateDOM();
}

// Event Listeners

countdownForm.addEventListener('submit', updateCountdown)

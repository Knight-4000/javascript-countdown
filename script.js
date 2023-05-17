const inputContainer = document.getElementById('input-container')
const countdownForm = document.getElementById('countdownForm')
const dateEl = document.getElementById('date-picker')

const countdownEl = document.getElementById('countdown');
const countdownElTitle = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span');

const completeEl = document.getElementById('complete');
const completeElInfo = document.getElementById('complete-info');
const completeBtn = document.getElementById('complete-button');

let countdownTitle = '';
let countdownDate = '';
let countdownValue = Date;
let countdownActive;

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
    countdownActive = setInterval(() => {
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

    // Hide Input
    inputContainer.hidden = true;

    // If the countdown has ended, show complete message

    if(distance < 0 ) {
        countdownEl.hidden = true;
        clearInterval(countdownActive);
        completeElInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
        completeEl.hidden = false;
    } else {
        // Else show countdown in progress
        // textContent is a secure way to change a text value of an HTML element
        countdownElTitle.textContent = `${countdownTitle}`;
        timeElements[0].textContent = `${days}`;
        timeElements[1].textContent = `${hours}`;
        timeElements[2].textContent = `${minutes}`;
        timeElements[3].textContent = `${seconds}`;
        completeEl.hidden = true;
        countdownEl.hidden = false;
    }
    }, second);
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
    // Check for valid date
    // === means checking the value of something
    if (countdownDate === '') {
        alert('Please select date')
    } else {
    // Get number version of current date, update DOM
        countdownValue = new Date(countdownDate).getTime();
        console.log('countdown value:', countdownValue);
        updateDOM();
    }
}

// Reset all values

function reset() {
    // Hide Countdowns, show input
    countdownEl.hidden = true;
    // Allows the new countdown button to work
    completeEl.hidden = true;
    inputContainer.hidden = false;
    // Stop the countdown
    clearInterval(countdownActive);
    //Reset values
    countdownTitle = '';
    countdownDate = '';

}


// Event Listeners

countdownForm.addEventListener('submit', updateCountdown)
countdownBtn.addEventListener('click', reset);
completeBtn.addEventListener('click', reset);

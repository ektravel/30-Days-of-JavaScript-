let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds){
    //clear any existing timers
    clearInterval(countdown);

    //timestamp when the timer started (in milliseconds)
    const now = Date.now();
    const then = now + seconds * 1000; //seconds is how long you want to run the timer for. We need to multiply the total by 1000 because now is in milliseconds.
    displayTimeLeft(seconds);
    displayEndTime(then);

    //Note: setInterval() does not run immediately. It waits for the first seconds to collapse. 
    countdown = setInterval(() => {
        //figure out how many seconds are left on the timer
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        //check if we should stop the timer
        if(secondsLeft < 0){
            clearInterval(countdown);
            return;
        }
        //display time left
        displayTimeLeft(secondsLeft);
    }, 1000);
}

function displayTimeLeft(seconds){
    //get whole minutes
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes} : ${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
    //change the tab title
    document.title = display;
    timerDisplay.textContent = display;
}

function displayEndTime(timestamp){
    const end = new Date(timestamp);
    const hour = end.getHours();
    const minutes = end.getMinutes();
    endTime.textContent = `Be Back At ${hour > 12 ? hour - 12 : hour}:${minutes < 10 ? '0' : ''}${minutes}`;
}

function startTimer(){
    const seconds = parseInt(this.dataset.time);
    timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function(e){
    e.preventDefault();
    const mins = this.minutes.value;
    timer(mins * 60);
    this.reset();
})

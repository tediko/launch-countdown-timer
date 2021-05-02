export default class Timer {
    constructor(time, element) {
        this.time = time;
        this.element = element;
        if (!this.vars()) return false;
        this.setupEvents();
    }
    
    vars() {
        this.selectors = {
            card: this.element,
            timerFront: 'data-timer-front',
            timerBack: 'data-timer-back',
            screenReaderEl: 'data-sr',
            activeClass: 'running'
        }
        
        this.card = document.querySelector(`[${this.selectors.card}]`);
        this.timerFront = this.card.querySelector(`[${this.selectors.timerFront}]`);
        this.timerBack = this.card.querySelector(`[${this.selectors.timerBack}]`);
        this.screenReaderEl = document.querySelector(`[${this.selectors.screenReaderEl}]`);
        if (!this.card || !this.timerFront || !this.timerBack) return false;
        
        this.cardDataset = this.card.dataset.timerCard;
        this.isFlipping = false;
        this.duration = 500;
        this.currentTime = 0;
        this.nextTime = 0;
        this.countdown;
        this.firstAnimation = false;
        this.initialTime = 0;
        return true;
    }

    setupEvents() {
        this.timer(this.time);
    }

    timer(seconds) {
        this.now = Date.now();
        this.then = this.now + (seconds * 1000);
        this.displayTimeLeft(seconds);

        this.firstAnimation = true;
        this.countdown = setInterval(() => {
            this.secondsLeft = Math.round((this.then - Date.now()) / 1000);

            // clearInterval when countdown is over.
            if (this.secondsLeft < 0) {
                clearInterval(this.countdown);
                return;
            }

            this.displayTimeLeft(this.secondsLeft);
        }, 1000)
    }

    displayTimeLeft(seconds) {
        this.days = Math.floor(seconds / 86400);
        this.reminderHours = Math.floor(seconds % 86400)
        this.hours = Math.floor(this.reminderHours / 3600);
        this.reminderMinutes = seconds % 3600;
        this.minutes = Math.floor(this.reminderMinutes / 60);
        this.reminderSeconds = seconds % 60;   
        
        if (!this.firstAnimation) return;
        
        if (this.cardDataset == 'days') {
            this.currentTime = `${this.days + 1}`;
            
            if (this.initialTime != this.currentTime) {
                this.nextTime = `${this.days}`;
                this.flipDown(this.currentTime, this.nextTime);
            }
        } else if (this.cardDataset == 'hours') {
            this.currentTime = `${this.hours + 1}`;
            
            if (this.initialTime != this.currentTime) {
                this.nextTime = `${this.hours}`;
                this.flipDown(this.currentTime, this.nextTime);
            }
        } else if (this.cardDataset == 'minutes') {
            this.currentTime = `${this.minutes + 1}`;
            
            if (this.initialTime != this.currentTime) {
                this.screenReaderUpdateTime();
                this.nextTime = `${this.minutes}`;
                this.flipDown(this.currentTime, this.nextTime);
            }
        } else {
            this.currentTime = `${this.reminderSeconds + 1}`;
            this.nextTime = `${this.reminderSeconds}`;
            this.flipDown(this.currentTime, this.nextTime);
        }
    }

    flipDown(currentTime, nextTime) {
        if (this.isFlipping) return false;
    
        this.isFlipping = true;
        this.setFrontTime(currentTime);
        this.setBackTime(nextTime);
        this.card.classList.add(`${this.selectors.activeClass}`);
    
        setTimeout(() => {
            this.card.classList.remove(`${this.selectors.activeClass}`);
            this.isFlipping = false;
            this.setFrontTime(nextTime);
        }, this.duration)
    }

    setFrontTime(time) {
        this.initialTime = parseInt(time) + 1;

        if (this.cardDataset == 'days') {
            if (time > 8) {
                this.timerFront.dataset.timerFront = '00';
            } else if (time >= 7) {
                this.timerFront.dataset.timerFront = `0${time}`;
            } else if (time < 7 && time > 0) {
                this.timerFront.dataset.timerFront = `0${time}`;
            } else if (time == 0) {
                this.timerFront.dataset.timerFront = '00';
            }
        } else if (this.cardDataset == 'hours') {
            if (time > 23) {
                this.timerFront.dataset.timerFront = '00';
            } else if (time >= 10) {
                this.timerFront.dataset.timerFront = time;
            } else if (time < 10 && time > 0) {
                this.timerFront.dataset.timerFront = `0${time}`;
            } else if (time == 0) {
                this.timerFront.dataset.timerFront = '00';
            }
        } else {
            if (time > 59) {
                this.timerFront.dataset.timerFront = '00';
            } else if (time >= 10) {
                this.timerFront.dataset.timerFront = time;
            } else if (time < 10 && time > 0) {
                this.timerFront.dataset.timerFront = `0${time}`;
            } else if (time == 0) {
                this.timerFront.dataset.timerFront = '00';
            }
        }
        
    }
    
    setBackTime(time) {
        if (time >= 59) {
            this.timerBack.dataset.timerBack = '59';
        } else if (time >= 10) {
            this.timerBack.dataset.timerBack = time;
        } else if (time < 10 && time > 0) {
            this.timerBack.dataset.timerBack = `0${time}`;
        } else if (time == 0) {
            this.timerBack.dataset.timerBack = `00`;
        }
    }

    // Update countdown time for screen readers
    screenReaderUpdateTime() {
        this.screenReaderEl.innerHTML = `Time to launch: ${this.days} days ${this.hours} hours ${this.minutes} minutes`
    }
}
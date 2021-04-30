export default class Timer {
    constructor(time, card) {
        this.time = time;
        this.card = card;
        if (!this.vars()) return false;
        this.setupEvents();
    }

    vars() {
        this.selectors = {
            cards: this.card,
            timerFront: 'data-timer-front',
            timerBack: 'data-timer-back',
            activeClass: 'running'
        }

        this.cards = document.querySelector(`[${this.selectors.cards}]`);
        this.timerFront = this.cards.querySelector(`[${this.selectors.timerFront}]`);
        this.timerBack = this.cards.querySelector(`[${this.selectors.timerBack}]`);
        if (!this.cards || !this.timerFront || !this.timerBack) return false;
        
        this.isFlipping = false;
        this.duration = 500;
        this.currentTime = 0;
        this.nextTime = 0;
        this.countdown;
        this.firstAnimation = false;
        return true;
    }

    setupEvents() {
        this.timer(this.time);
    }

    timer(seconds) {
        this.now = Date.now();
        this.then = this.now + (seconds * 1000);
        this.displayTimeLeft(seconds);

        this.countdown = setInterval(() => {
            this.secondsLeft = Math.round((this.then - Date.now()) / 1000);

            if (this.secondsLeft < 0) {
                clearInterval(this.countdown);
                return;
            }

            this.firstAnimation = true;
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

        if (this.cards.dataset.timerCard == 'days') {
            if (!this.firstAnimation) return;
            this.clockNumber = this.timerFront.dataset.clockNum;
            this.currentTime = `${this.days + 1}`;

            if (this.clockNumber != this.currentTime) {
                this.nextTime = `${this.days}`;
                this.flipDown(this.currentTime, this.nextTime);
            }
        } else if (this.cards.dataset.timerCard == 'hours') {
            if (!this.firstAnimation) return;
            this.clockNumber = this.timerFront.dataset.clockNum;
            this.currentTime = `${this.hours + 1}`;

            if (this.clockNumber != this.currentTime) {
                this.nextTime = `${this.hours}`;
                this.flipDown(this.currentTime, this.nextTime);
            }
        } else if (this.cards.dataset.timerCard == 'minutes') {
            if (!this.firstAnimation) return;
            this.clockNumber = this.timerFront.dataset.clockNum;
            this.currentTime = `${this.minutes + 1}`;

            if (this.clockNumber != this.currentTime) {
                this.nextTime = `${this.minutes}`;
                this.flipDown(this.currentTime, this.nextTime);
            }
        } else {
            if (!this.firstAnimation) return;
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
        this.cards.classList.add('running');
    
        setTimeout(() => {
            this.cards.classList.remove('running');
            this.isFlipping = false;
            this.setFrontTime(nextTime);
        }, this.duration)
    }

    setFrontTime(time) {
        this.timerFront.dataset.clockNum = parseInt(time) + 1;
        if (time >= 59) {
            this.timerFront.dataset.timerTime = '59';
        } else if (time >= 10) {
            this.timerFront.dataset.timerTime = time;
        } else if (time < 10 && time > 0) {
            this.timerFront.dataset.timerTime = `0${time}`;
        } else if (time == 0) {
            this.timerFront.dataset.timerTime = `00`;
        }
    }
    
    setBackTime(time) {
        if (time >= 59) {
            this.timerBack.dataset.timerTime = '59';
        } else if (time >= 10) {
            this.timerBack.dataset.timerTime = time;
        } else if (time < 10 && time > 0) {
            this.timerBack.dataset.timerTime = `0${time}`;
        } else if (time == 0) {
            this.timerBack.dataset.timerTime = `00`;
        }
    }
}
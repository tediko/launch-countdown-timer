# Frontend Mentor - Launch countdown timer

![Design preview for the Launch countdown timer coding challenge](./design/desktop-preview.jpg)

## Table of contents

- [Overview](#overview)
  - [Intro](#intro)
  - [The challenge](#the-challenge)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [Features](#features)
  - [Useful resources](#useful-resources)

## Overview

### Intro
Hello! This is my solution to [Launch countdown timer - Frontend Mentor](https://www.frontendmentor.io/challenges/launch-countdown-timer-N0XkGfyz-) challenge. It was really tough challenge. This was my second time i tried to finish it, this time successfully.

### The challenge

>Your challenge is to build out this countdown timer and get it looking as close to the design as possible.
>
>You can use any tools you like to help you complete the challenge. So if you've got something you'd like to practice, feel free to give it a go.
>
>Your users should be able to:
>
>- See hover states for all interactive elements on the page
>- See a live countdown timer that ticks down every second
>- Bonus: When a number changes, make the card flip from the middle

### Links

[LIVE PREVIEW](https://launch-countdown-tediko.netlify.app/)

[Frontend Mentor](https://www.frontendmentor.io) challenges allow you to improve your skills in a real-life workflow.

## My process

### Built with

 - Flexbox
 - SCSS
 - Javascript
 - Mobile first
 - Semantic HTML5 markup

### Features

- Implement `prefers-reduced-motion` CSS media feature which is used to detect if the user has requested that the system minimize the amount of non-essential motion it uses. Prevent animations in brief.
- Used `backface-visibility` property. This property defines whether or not the back face of an element should be visible when facing the user. So when I rotate my cards, back of them isn't visible to the user so I can create this nice flip animation.
- Added `.sr-only` element to announce countdown time to screen readers. Also used `aria-live="polite"` attribute to expose dynamic content changes in a way that can be announced by assistive technologies after every minute of countdown.
- For interactive elements like socials icons i used `:focus-visible` pseudo class. This selector indicate focus when it is helpful to the user - such as in cases where the user interacts with the page via a keyboard or some other non-pointing device.
- Hats off to Wes Bos, I found his countdown timer tutorial and it was really helpfull to understand how countdown should work. Even tho it was just tip of the iceberg when it comes to JS in this project i think it was very helpful to understand how countdown timer should work. 

### Useful resources
 
- [Video](https://youtu.be/LAaf7-WuJJQ) - Wes Bos countdown timer tutorial and it was really helpfull to understand how countdown should work. Even tho it was just tip of the iceberg when it comes to JS in this project i think it was very helpful to understand basics of countdown timer.
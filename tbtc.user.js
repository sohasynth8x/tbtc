// ==UserScript==
// @name         Tbtc new
// @version      1.0
// @namespace    Violentmonkey Scripts
// @description  Tbtc
// @author       sohasynth8x
// @match        https://miner-tap2earn.vercel.app/*
// @grant        none
// ==/UserScript==

console.log('AutoClicker: Скрипт запущен');

function simulateTouchClick(element, x, y) {
    const touch = new Touch({
        identifier: Date.now(),
        target: element,
        clientX: x,
        clientY: y,
        screenX: x + window.screenX,
        screenY: y + window.screenY,
        radiusX: 5,
        radiusY: 5,
        rotationAngle: 0,
        force: 0.5
    });
    const touchEvent = new TouchEvent('touchstart', {
        touches: [touch],
        targetTouches: [touch],
        changedTouches: [touch],
        bubbles: true,
        cancelable: true
    });
    element.dispatchEvent(touchEvent);

    setTimeout(() => {
        const touchEndEvent = new TouchEvent('touchend', {
            touches: [],
            targetTouches: [],
            changedTouches: [touch],
            bubbles: true,
            cancelable: true
        });
        element.dispatchEvent(touchEndEvent);
    }, 100); // Ensure touchend is sent a little later
}

function getRandomCoordinates(element) {
    const rect = element.getBoundingClientRect();
    const x = Math.random() * rect.width + rect.left;
    const y = Math.random() * rect.height + rect.top;
    return { x, y };
}

function startClicking() {
    const element = document.querySelector('div._img_85vwo_22');
    if (element) {
        let clickCount = 0;
        const maxClicks = 1000;

        const clickInterval = setInterval(() => {
            if (clickCount >= maxClicks) {
                clearInterval(clickInterval);
                console.log('AutoClicker: Достигнуто максимальное количество кликов.');
                return;
            }

            const { x, y } = getRandomCoordinates(element);
            simulateTouchClick(element, x, y);
            console.log(`AutoClicker: Клик на (${x}, ${y})`);
            clickCount++;
        }, 20); // Interval for clicks

    } else {
        console.log('AutoClicker: Элемент не найден.');
        setTimeout(startClicking, 1000); // Retry after 1 second
    }
}

setTimeout(startClicking, 2000); // Initial delay before starting

/**
 * created by lvfan
 * 2018-09-04
 *
 * Refactored for readability, performance, and modern best practices.
 */
(function () {
    'use strict';

    // --- Configuration Constants ---
    const STAR_DENSITY = 0.216;
    const SPEED_COEFF = 0.05;
    const GIANT_PROBABILITY_PERCENT = 3;
    const COMET_PROBABILITY_PERCENT = 10;
    const GIANT_COLOR = '180,184,240';
    const STAR_COLOR = '226,225,142';
    const COMET_COLOR = '226,225,224';

    // --- DOM and Canvas Setup ---
    const canvas = document.getElementById('universe');
    if (!canvas) {
        console.error('Canvas element with id "universe" not found.');
        return;
    }
    const ctx = canvas.getContext('2d');

    // --- State Variables ---
    let width, height, starCount;
    let stars = [];
    let isFirstRun = true;
    let animationFrameId;

    // --- Utility Functions ---
    const getProbability = (percents) => Math.random() * 100 < percents;
    const getRandInterval = (min, max) => Math.random() * (max - min) + min;

    // --- Star Class ---
    class Star {
        constructor() {
            this.reset();
        }

        reset() {
            this.giant = getProbability(GIANT_PROBABILITY_PERCENT);
            this.comet = !this.giant && !isFirstRun && getProbability(COMET_PROBABILITY_PERCENT);
            this.x = getRandInterval(0, width);
            this.y = getRandInterval(0, height);
            this.r = getRandInterval(1.1, 2.6);

            const cometSpeedBoost = this.comet ? getRandInterval(50, 120) : 0;
            this.dx = getRandInterval(SPEED_COEFF, 6 * SPEED_COEFF) + cometSpeedBoost * SPEED_COEFF + SPEED_COEFF * 2;
            this.dy = -getRandInterval(SPEED_COEFF, 6 * SPEED_COEFF) - cometSpeedBoost * SPEED_COEFF;

            this.fadingOut = false;
            this.fadingIn = true;
            this.opacity = 0;
            this.opacityTresh = getRandInterval(0.2, 1 - (this.comet ? 0.4 : 0));
            this.do = getRandInterval(0.0005, 0.002) + (this.comet ? 0.001 : 0);
        }

        update() {
            // Move
            this.x += this.dx;
            this.y += this.dy;

            if (this.fadingOut === false && (this.x > width - width / 4 || this.y < 0)) {
                this.fadingOut = true;
            }

            if (this.x > width || this.y < 0) {
                this.reset();
            }

            // Fade In
            if (this.fadingIn) {
                this.opacity += this.do;
                if (this.opacity >= this.opacityTresh) {
                    this.fadingIn = false;
                }
            }

            // Fade Out
            if (this.fadingOut) {
                this.opacity -= this.do / 2;
                if (this.opacity <= 0) {
                    this.fadingOut = false;
                    this.reset();
                }
            }
        }

        draw() {
            ctx.beginPath();
            let color;
            if (this.giant) {
                color = GIANT_COLOR;
                ctx.fillStyle = `rgba(${color},${this.opacity})`;
                ctx.arc(this.x, this.y, 2, 0, 2 * Math.PI, false);
            } else if (this.comet) {
                color = COMET_COLOR;
                ctx.fillStyle = `rgba(${color},${this.opacity})`;
                ctx.arc(this.x, this.y, 1.5, 0, 2 * Math.PI, false);
                // Comet tail
                for (let i = 0; i < 30; i++) {
                    ctx.fillStyle = `rgba(${color},${this.opacity - (this.opacity / 20) * i})`;
                    ctx.rect(this.x - this.dx / 4 * i, this.y - this.dy / 4 * i - 2, 2, 2);
                    ctx.fill();
                }
            } else {
                color = STAR_COLOR;
                ctx.fillStyle = `rgba(${color},${this.opacity})`;
                ctx.rect(this.x, this.y, this.r, this.r);
            }
            ctx.closePath();
            ctx.fill();
        }
    }

    // --- Main Functions ---
    function setup() {
        width = window.innerWidth;
        height = window.innerHeight;
        starCount = Math.floor(width * STAR_DENSITY);

        canvas.setAttribute('width', width);
        canvas.setAttribute('height', height);

        stars = [];
        for (let i = 0; i < starCount; i++) {
            stars.push(new Star());
        }

        // A short delay to ensure the first batch of stars aren't comets
        setTimeout(() => {
            isFirstRun = false;
        }, 50);
    }

    function drawLoop() {
        if (document.documentElement.classList.contains('night')) {
            ctx.clearRect(0, 0, width, height);
            stars.forEach(star => {
                star.update();
                star.draw();
            });
        }
        animationFrameId = window.requestAnimationFrame(drawLoop);
    }

    // --- Event Listeners and Initialization ---
    function handleResize() {
        // Cancel the old animation frame to prevent multiple loops on resize
        window.cancelAnimationFrame(animationFrameId);
        setup();
        drawLoop();
    }

    window.addEventListener('resize', handleResize, false);

    setup();
    drawLoop();
}());

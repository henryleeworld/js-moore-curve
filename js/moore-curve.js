"use strict";

window.addEventListener("load", function() {

    let canv, ctx; // canvas and context
    let maxx, maxy; // canvas size
    let c;
    let turtle; // tortue
    let minSegLength; // minimum length for drawing

    let animState = 0;

    // Shortcuts for Math
    const mrandom = Math.random;
    const mfloor = Math.floor;
    const mround = Math.round;
    const mabs = Math.abs;
    const mmin = Math.min;
    const mmax = Math.max;

    const mPI = Math.PI;
    const mPIS2 = Math.PI / 2;
    const m2PI = Math.PI * 2;
    const msin = Math.sin;
    const mcos = Math.cos;
    const matan2 = Math.atan2;

    const mhypot = Math.hypot;
    const msqrt = Math.sqrt;

    function startOver(c) {

        let dc = c;

        while (dc >= minSegLength) {
            dc /= 2;
        }

        ctx.fillStyle = 'rgba(0,0,0,0.4)';
        ctx.fillRect(0, 0, maxx, maxy);
        ctx.strokeStyle = '#fc0';
        turtle.setXY(maxx / 2 - dc, maxy - 5);
        turtle.setDir(2);

        f1(f5(f6(f1(fend, c), c), c), c)();

    }

    function Turtle(ctx) {
        this.ctx = ctx;
        this.ctx.strokeStyle = '#FFF';
        this.ctx.lineWidth = 2;
        this.x = maxx / 2;
        this.y = maxy / 2;
        this.dir = 0; // upwards
    } //

    Turtle.prototype.setXY = function(x, y) {
        this.x = x;
        this.y = y;
    } // Turtle.prototype.setXY

    Turtle.prototype.setDir = function(dir) {
        this.dir = dir;
    } // Turtle.prototype.setXY

    Turtle.prototype.tr = function() { // turn right
        this.dir++;
        this.dir &= 3;
    } // Turtle.prototype.tr

    Turtle.prototype.tl = function() { // turn left
        this.dir--;
        this.dir &= 3;
    } // Turtle.prototype.tl

    Turtle.prototype.fwd = (function() { // forward
        const tbdx = [0, -1, 0, 1];
        const tbdy = [1, 0, -1, 0];
        return function(distance) {
            this.ctx.beginPath();
            this.ctx.moveTo(this.x, this.y);
            this.x += tbdx[this.dir] * distance;
            this.y += tbdy[this.dir] * distance;
            this.ctx.lineTo(this.x, this.y);
            this.ctx.stroke();
        }
    })();



    function fend() {
        animState = 1;
        window.requestAnimationFrame(animate);
    }


    function f1(fNext, d) {
        return function() {

            if (d <= minSegLength) {
                turtle.fwd(d);
                window.requestAnimationFrame(fNext);
                return;
            }
            f3(f6(f5(f4(fNext, d / 2), d / 2), d / 2), d / 2)();
        }
    } // f1

    function f2(fNext, d) {
        return function() {

            if (d <= minSegLength) {
                turtle.fwd(d);
                window.requestAnimationFrame(fNext);
                return;
            }
            f6(f3(f4(f5(fNext, d / 2), d / 2), d / 2), d / 2)();
        }
    } // f2

    function f3(fNext, d) {
        return function() {

            if (d <= minSegLength) {
                turtle.fwd(d / 2);
                turtle.tl();
                turtle.fwd(d / 2);
                window.requestAnimationFrame(fNext);
                return;
            }
            f1(f3(f4(f5(fNext, d / 2), d / 2), d / 2), d / 2)();
        }
    } // f3

    function f4(fNext, d) {
        return function() {

            if (d <= minSegLength) {
                turtle.fwd(d / 2);
                turtle.tl();
                turtle.fwd(d / 2);
                window.requestAnimationFrame(fNext);
                return;
            }
            f6(f3(f4(f1(fNext, d / 2), d / 2), d / 2), d / 2)();
        }
    } // f4

    function f5(fNext, d) {
        return function() {

            if (d <= minSegLength) {
                turtle.fwd(d / 2);
                turtle.tr();
                turtle.fwd(d / 2);
                window.requestAnimationFrame(fNext);
                return;
            }
            f3(f6(f5(f2(fNext, d / 2), d / 2), d / 2), d / 2)();
        }
    } // f5

    function f6(fNext, d) {
        return function() {

            if (d <= minSegLength) {
                turtle.fwd(d / 2);
                turtle.tr();
                turtle.fwd(d / 2);
                window.requestAnimationFrame(fNext);
                return;
            }
            f2(f6(f5(f4(fNext, d / 2), d / 2), d / 2), d / 2)();
        }
    } // f5

    function animate(tStamp) {


        switch (animState) {
            case 0:
                maxx = window.innerWidth - 8; // keep a 4px margin
                maxy = window.innerHeight - 8;
                if (maxx < 100 || maxy < 100) {
                    window.requestAnimationFrame(animate);
                    return; // too little
                }
                c = mmin((maxx - 10) / 2, (maxy - 10) / 2);
                minSegLength = c;
                canv.width = maxx;
                canv.height = maxy;
                turtle = new Turtle(ctx);
                startOver(c);
                break;

            case 1:
                if (minSegLength < 10) return; // last level
                minSegLength = minSegLength / 2;
                startOver(c);
                break;
        } // switch


    } // animate

    {
        canv = document.createElement('canvas');
        canv.style.position = "absolute";
        canv.style.top = "4px";
        canv.style.left = "4px";
        document.body.appendChild(canv);
        ctx = canv.getContext('2d');
    }

    animate();

});
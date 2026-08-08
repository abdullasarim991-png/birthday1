
"use strict";

/*==========================
ELEMENTS
==========================*/

const screens =
document.querySelectorAll(".screen");

const bgMusic =
document.getElementById("bgMusic");

const loaderScreen =
document.getElementById("loaderScreen");

const curtainLeft =
document.querySelector(".curtainLeft");

const curtainRight =
document.querySelector(".curtainRight");

const startJourney =
document.getElementById("startJourney");


const liveTime =
document.getElementById("liveTime");

const liveDate =
document.getElementById("liveDate");

let musicStarted=false;

/*==========================
SCREEN CHANGE
==========================*/

function showScreen(id){

screens.forEach(screen=>{

screen.classList.remove("active");

});

document
.getElementById(id)
.classList.add("active");

}

/*==========================
BACKGROUND MUSIC
==========================*/

function startMusic(){

if(musicStarted) return;

musicStarted=true;

bgMusic.volume=.75;

bgMusic.currentTime=1.9;

bgMusic.loop=true;

bgMusic.play().catch(()=>{});

}

/*==========================
LOADER
==========================*/

window.addEventListener("load",()=>{

setTimeout(()=>{

loaderScreen.style.opacity="0";

setTimeout(()=>{

loaderScreen.style.display="none";

showScreen("curtainScreen");

},900);

},2600);

});

/*==========================
CURTAIN
==========================*/

startJourney.onclick=()=>{

startMusic();

curtainLeft.classList.add("open");

curtainRight.classList.add("open");

setTimeout(()=>{

showScreen("giftScreen");

},1700);

};

/*==================================
PREMIUM SVG GIFT
PART 3
==================================*/

const giftBox = document.getElementById("giftBox");

giftBox.onclick = () => {

    if (giftBox.classList.contains("open")) return;

    giftBox.classList.add("open");

    createGiftHearts();

    createGiftSparkles();

    setTimeout(() => {

        showScreen("lockScreen");

    }, 2000);

};

function createGiftSparkles(){

    for(let i=0;i<25;i++){

        const sparkle = document.createElement("div");

        sparkle.innerHTML = Math.random() > .5 ? "✨" : "💖";

        sparkle.style.position = "fixed";
        sparkle.style.left = (window.innerWidth/2 - 20 + (Math.random()*180-90)) + "px";
        sparkle.style.top = (window.innerHeight/2 + (Math.random()*180-90)) + "px";

        sparkle.style.fontSize = (16 + Math.random()*18) + "px";
        sparkle.style.pointerEvents = "none";
        sparkle.style.zIndex = "99999";

        sparkle.animate([

            {
                transform:"translate(0,0) scale(1)",
                opacity:1
            },

            {
                transform:`translate(${Math.random()*300-150}px,${-150-Math.random()*120}px) scale(.3)`,
                opacity:0
            }

        ],{

            duration:1400,
            easing:"ease-out",
            fill:"forwards"

        });

        document.body.appendChild(sparkle);

        setTimeout(()=>{

            sparkle.remove();

        },1500);

    }

}
/*==========================
FLOATING HEARTS
==========================*/

function createGiftHearts(){

const layer=

document.getElementById("heartLayer");

for(let i=0;i<22;i++){

const heart=

document.createElement("div");

heart.className="heart";

const emojis = ["❤️","💖","✨","🎉","🌸"];

heart.innerHTML =
emojis[Math.floor(Math.random()*emojis.length)];

heart.style.left=

Math.random()*100+"vw";

heart.style.fontSize=

16+Math.random()*22+"px";

heart.style.animationDuration=

2+Math.random()*2+"s";

layer.appendChild(heart);

setTimeout(()=>{

heart.remove();

},4000);

}

}

/*==========================
CLOCK
==========================*/

function updateClock(){

const now=new Date();

liveTime.innerHTML=

now.toLocaleTimeString([],{

hour:"2-digit",

minute:"2-digit"

});

liveDate.innerHTML=

now.toLocaleDateString([],{

weekday:"long",

day:"numeric",

month:"long"

});

}

updateClock();

setInterval(updateClock,1000);

/*==========================
BIRTHDAY COUNTER
==========================*/

function updateBirthdayCounter() {

    const birthday = new Date("2006-08-26T00:00:00");
    const now = new Date();

    const diff = now - birthday;

    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    const years = now.getFullYear() - 2006;

    document.getElementById("years").textContent = years;
    document.getElementById("days").textContent = days.toLocaleString();
    document.getElementById("hours").textContent = hours.toLocaleString();
    document.getElementById("minutes").textContent = minutes.toLocaleString();

    document.getElementById("cakeYears").textContent = years;
    document.getElementById("cakeDays").textContent = days.toLocaleString();
    document.getElementById("cakeHours").textContent = hours.toLocaleString();
    document.getElementById("cakeMinutes").textContent = minutes.toLocaleString();

}

updateBirthdayCounter();
setInterval(updateBirthdayCounter, 60000);

/*==========================
PIN
==========================*/

const pinDisplay=

document.getElementById("pinDisplay");

const pinDots=

document.querySelectorAll(".pinDots span");

const keys=

document.querySelectorAll(".key");

const pinError=

document.getElementById("pinError");

let enteredPin="";

const correctPin="2608";
/*==========================
PIN KEYPAD
==========================*/

keys.forEach(button=>{

button.addEventListener("click",()=>{

startMusic();

const value=button.dataset.key;

if(!value) return;

if(enteredPin.length>=4) return;

enteredPin+=value;

updatePinDots();

});

});

document
.getElementById("clearPin")
.onclick=()=>{

enteredPin=

enteredPin.slice(0,-1);

updatePinDots();

};

document
.getElementById("submitPin")
.onclick=checkPin;

function updatePinDots(){

pinDots.forEach((dot,index)=>{

if(index<enteredPin.length){

dot.classList.add("active");

}else{

dot.classList.remove("active");

}

});

pinDisplay.innerHTML=

enteredPin.replace(/./g,"•");

}

function checkPin(){

if(enteredPin.length!==4){

shakeLock();

pinError.innerHTML=

"Enter 4 Digit PIN ❤️";

return;

}

if(enteredPin===correctPin){

pinError.innerHTML=

"Unlocked ❤️";

setTimeout(()=>{

showScreen("welcomeScreen");

},700);

}else{

enteredPin="";

updatePinDots();

shakeLock();

pinError.innerHTML=

"Wrong PIN";

}

}

function shakeLock(){

document
.querySelector(".lockGlass")
.animate([

{
transform:"translateX(0)"
},

{
transform:"translateX(-12px)"
},

{
transform:"translateX(12px)"
},

{
transform:"translateX(-8px)"
},

{
transform:"translateX(8px)"
},

{
transform:"translateX(0)"
}

],{

duration:420

});

}

/*==========================
WELCOME
==========================*/

document
.getElementById("continueJourney")
.onclick=()=>{

showScreen("galleryScreen");

};

/*==========================
FLOATING HEARTS
==========================*/

const heartLayer=

document.getElementById("heartLayer");

function spawnHeart(){

    if(document.hidden) return;

const heart=

document.createElement("div");

heart.className="heart";

heart.innerHTML=

Math.random()>.5
?
"❤️"
:
"💖";

heart.style.left=

Math.random()*100+"vw";

heart.style.fontSize=

15+Math.random()*18+"px";

heart.style.animationDuration=

6+Math.random()*5+"s";

heartLayer.appendChild(heart);

setTimeout(()=>{

heart.remove();

},12000);

}

const isMobile =
window.matchMedia("(max-width:768px)").matches;

setInterval(
    spawnHeart,
    isMobile ? 1600 : 700
);
/*==========================
GALLERY
==========================*/

const galleryTrack =
document.querySelector(".galleryTrack");

const galleryNext =
document.getElementById("galleryNext");

const dots =
document.querySelectorAll(".galleryIndicator span");

let currentSlide=0;

function updateGallery(){

const card = galleryTrack.querySelector(".photoCard");

if(card){
    galleryTrack.scrollTo({
        left: card.offsetWidth * currentSlide + (16 * currentSlide),
        behavior: "smooth"
    });
}

dots.forEach(dot=>{

dot.classList.remove("active");

});

if(dots[currentSlide]){

dots[currentSlide]
.classList.add("active");

}

}

const card = galleryTrack.querySelector(".photoCard");


galleryTrack.addEventListener("scroll", ()=>{

    let galleryTimer;
    
if(!card)

return;

const index = Math.round(
    galleryTrack.scrollLeft /
    (card.offsetWidth + 16)
);

currentSlide = index;

dots.forEach(dot=>dot.classList.remove("active"));

if(dots[index]){
    dots[index].classList.add("active");
}

});

let galleryStartX=0;

galleryTrack.addEventListener(

"touchstart",

e=>{

galleryStartX=e.touches[0].clientX;

}

);

galleryTrack.addEventListener(

"touchend",

e=>{

const endX=e.changedTouches[0].clientX;

if(galleryStartX-endX>60){

if(currentSlide<5){

currentSlide++;

updateGallery();

}

}

if(endX-galleryStartX>60){

if(currentSlide>0){

currentSlide--;

updateGallery();

}

}

}

);

galleryNext.onclick=()=>{

showScreen("balloonScreen");

};
/*==========================
BALLOON GAME
==========================*/

const balloons = document.querySelectorAll(".balloon");

const wishPopup = document.getElementById("wishPopup");
const wishText = document.getElementById("wishText");


const balloonCount = document.getElementById("balloonCount");
const balloonNext = document.getElementById("balloonNext");

let poppedCount = 0;

balloons.forEach(balloon => {

    balloon.onclick = () => {

        if (balloon.classList.contains("pop")) return;

        balloon.classList.add("pop");

        popBurst(balloon);

        poppedCount++;

        balloonCount.innerHTML =
        `Popped ${poppedCount} / ${balloons.length}`;

        wishText.innerHTML =
        balloon.dataset.message;

       wishPopup.classList.remove("show");

setTimeout(() => {

    wishPopup.classList.add("show");

},20);

setTimeout(() => {

    wishPopup.classList.remove("show");

},2000);
        // Sab balloon phoot gaye to next button dikhana
        if (poppedCount === balloons.length) {

            setTimeout(() => {

                balloonNext.style.display = "inline-flex";

            },2300);

        }

    };

});

balloonNext.onclick = () => {

    showScreen("puzzleScreen");

};

/*==========================
POP EFFECT
==========================*/

function popBurst(target){

for(let i=0;i<14;i++){

const heart=

document.createElement("div");

heart.className="heart";

heart.innerHTML=

Math.random()>.5
?
"❤️"
:
"✨";

heart.style.position="fixed";

heart.style.left=

target.getBoundingClientRect().left+

40+"px";

heart.style.top=

target.getBoundingClientRect().top+

40+"px";

heart.style.fontSize=

12+Math.random()*14+"px";

heart.style.animationDuration=

1.6+Math.random()+"s";

document.body.appendChild(heart);

setTimeout(()=>{

heart.remove();

},2200);

}

}
/*==========================
PUZZLE GAME
==========================*/

const puzzleBoard =
document.getElementById("puzzleBoard");

const shufflePuzzle =
document.getElementById("shufflePuzzle");

const solvePuzzle =
document.getElementById("solvePuzzle");

const puzzleStatus =
document.getElementById("puzzleStatus");

const puzzleNext =
document.getElementById("puzzleNext");

let pieces=[1,2,3,4,5,6,7,8,9];

shufflePieces();

function shufflePieces(){

pieces.sort(()=>Math.random()-.5);

buildPuzzle();

}

function buildPuzzle(){

puzzleBoard.innerHTML="";

pieces.forEach(piece=>{

const div=

document.createElement("div");

div.className="puzzlePiece";

div.dataset.value=piece;

div.style.backgroundImage=

'url("photos/puzzle.jpg")';

div.style.backgroundSize=

"300% 300%";

const row=

Math.floor((piece-1)/3);

const col=

(piece-1)%3;

div.style.backgroundPosition=

`${col*50}% ${row*50}%`;

div.onclick=()=>swapPiece(div);

puzzleBoard.appendChild(div);

});

}

let selectedPiece=null;

function swapPiece(piece){

if(!selectedPiece){

selectedPiece=piece;

piece.style.outline=

"4px solid #ffd76a";

return;

}

const a=

Number(selectedPiece.dataset.value);

const b=

Number(piece.dataset.value);

const ia=

pieces.indexOf(a);

const ib=

pieces.indexOf(b);

[pieces[ia],pieces[ib]]=

[pieces[ib],pieces[ia]];

selectedPiece=null;

buildPuzzle();

checkPuzzle();

}

function checkPuzzle(){

    const solved = pieces.every((v,i)=>v===i+1);

    if(solved){

    puzzleStatus.innerHTML = "Puzzle Solved ❤️";

    puzzleNext.style.display = "inline-flex";

    puzzleNext.style.opacity = "1";
    puzzleNext.style.visibility = "visible";

}else{

    puzzleStatus.innerHTML = "Keep Going... ❤️";

    puzzleNext.style.display = "none";

}

shufflePuzzle.onclick = ()=>{

    shufflePieces();

    puzzleStatus.innerHTML = "Puzzle Shuffled ✨";

    puzzleNext.style.display = "none";

}

};

solvePuzzle.onclick = ()=>{

    pieces = [1,2,3,4,5,6,7,8,9];

    buildPuzzle();

    checkPuzzle();

};

puzzleNext.onclick = ()=>{

    showScreen("cakeScreen");

};
/*==========================
PREMIUM CAKE
==========================*/

const blowBtn =
document.getElementById("blowBtn");

const skipCake =
document.getElementById("skipCake");

const flames =
document.querySelectorAll(".flame");

blowBtn.onclick=startBlow;

skipCake.onclick=()=>{

finishCake();

};

async function startBlow(){

try{

const stream=

await navigator.mediaDevices.getUserMedia({

audio:true

});

const audioContext=

new AudioContext();

const analyser=

audioContext.createAnalyser();

const microphone=

audioContext.createMediaStreamSource(stream);

microphone.connect(analyser);

analyser.fftSize=512;

const data=

new Uint8Array(

analyser.frequencyBinCount

);

detectBlow();

function detectBlow(){

analyser.getByteFrequencyData(data);

let volume=0;

for(let i=0;i<data.length;i++){

volume+=data[i];

}

volume/=data.length;

if(volume>20){

finishCake();

stream.getTracks().forEach(track=>track.stop());

return;

}

requestAnimationFrame(detectBlow);

}

}catch{

finishCake();

}

}

function finishCake(){

flames.forEach((flame,index)=>{

setTimeout(()=>{

flame.animate([

{

opacity:1,

transform:"translateX(-50%) scale(1)"

},

{

opacity:0,

transform:"translateX(-50%) scale(0)"

}

],{

duration:500,

fill:"forwards"

});

},index*250);

});

setTimeout(()=>{

    window.scrollTo({
    top:0,
    behavior:"instant"
});

showScreen("scratchScreen");

},1400);

}
/*==========================
SCRATCH CARD
==========================*/

const scratchCanvas =
document.getElementById("scratchCanvas");

const scratchContainer =
document.querySelector(".scratchContainer");

const letterOpenBtn =
document.getElementById("letterOpenBtn");

const ctx =
scratchCanvas.getContext("2d");

let scratching=false;

function resizeScratch(){

scratchCanvas.width=

scratchContainer.offsetWidth;

scratchCanvas.height=

scratchContainer.offsetHeight;

ctx.globalCompositeOperation="source-over";

ctx.fillStyle="#c9a227";

ctx.fillRect(

0,
0,
scratchCanvas.width,
scratchCanvas.height

);

ctx.fillStyle="#d9b84c";

for(let i=0;i<450;i++){

ctx.beginPath();

ctx.arc(

Math.random()*scratchCanvas.width,

Math.random()*scratchCanvas.height,

Math.random()*2,

0,

Math.PI*2

);

ctx.fill();

}

ctx.globalCompositeOperation=

"destination-out";

}

resizeScratch();

window.addEventListener(

"resize",

resizeScratch

);

scratchCanvas.addEventListener(

"pointerdown",

()=>{

scratching=true;

}

);

window.addEventListener(

"pointerup",

()=>{

scratching=false;

checkScratch();

}

);

scratchCanvas.addEventListener("pointermove",(e)=>{

    if(!scratching) return;

    e.preventDefault();

    const rect = scratchCanvas.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    28,
    ctx.beginPath();
    ctx.arc(x, y, 40, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(x, y, 28, 0, Math.PI * 2);
    ctx.fill();

});

function checkScratch(){

const pixels=

ctx.getImageData(

0,
0,
scratchCanvas.width,
scratchCanvas.height

).data;

let transparent=0;

for(

let i=3;

i<pixels.length;

i+=4

){

if(pixels[i]===0){

transparent++;

}

}

const percent=

transparent/

(pixels.length/4);

if(percent>.50){

scratchCanvas.style.pointerEvents=

"none";

letterOpenBtn.style.display=

"inline-flex";

letterOpenBtn.animate([

{

opacity:0,

transform:"translateY(25px)"

},

{

opacity:1,

transform:"translateY(0)"

}

],{

duration:600,

fill:"forwards"

});

}

}

letterOpenBtn.onclick=()=>{

showScreen("letterScreen");

};
/*==========================
LETTER
==========================*/

const envelope = document.getElementById("envelope");
const envLetter = document.querySelector(".envLetter");
const typedLetter = document.getElementById("typedLetter");
const celebrateBtn = document.getElementById("celebrateBtn");
const skipTyping = document.getElementById("skipTyping");

const message = `Dear Momo ❤️

Happy 20th Birthday

Sach kahau mujhe kabhi words itne achhe se use karna nahi aaya
Isliye jo likh raha hoon woh sirf kidney se likh raha hoon 😭

Allah kare tumhari zindagi hamesha khushiyon se bhari rahe
Har dua qubool ho har sapna poora ho
aur tum hamesha isi tarah haste muskuraate raho

Thank you mere saath itni pyari memories banane ke liye
Chahe woh chhoti si baatein ho
hasi mazaak ho
ya sirf ek normal sa din
mere liye woh sab hamesha special rahenge

Aur ek baat
Tumhari brown eyes ki tareef shayad words mein kabhi poori nahi ho sakti
Jab un par dhoop padti hai
toh woh aur bhi khoobsurat lagti hain
Sach mein woh tumhari sabse pyari cheezon mein se ek hain

Aur haan Rabbit ji 🐰
Apne woh cute se teeth ki wajah se jo naam mila hai na woh bhi kabhi mat badalna 😂
Waise bhi Rabbit ji wali smile tum par hi suit karti hai

Bas ek hi dua hai
Allah tumhe hamesha apni hifazat mein rakhe
tumhari har muskurahat hamesha salamat rahe
aur tumhari zindagi mein kabhi kisi cheez ki kami na ho

Thank you sirf memories ke liye nahi
balki woh insaan hone ke liye jo tum ho

Once again

Happy 20th Birthday Momo ❤️
May Allah always keep you smiling`;

let opened = false;
let reading = false;
let typingIndex = 0;
let typingTimer = null;

envelope.onclick = () => {

    if (reading) return;

    if (!opened) {

        opened = true;
        envelope.classList.add("open");

        setTimeout(() => {

            reading = true;

            typedLetter.innerHTML = "";
            typingIndex = 0;

            celebrateBtn.style.display = "none";
            skipTyping.style.display = "inline-flex";

envLetter.style.transition = "all .6s ease";

envLetter.style.width = "90vw";
envLetter.style.maxWidth = "650px";
envLetter.style.height = "80vh";

envLetter.style.left = "50%";
envLetter.style.top = "50%";
envLetter.style.bottom = "auto";

envLetter.style.transform =
"translate(-50%,-50%) scale(1)";

envLetter.style.zIndex = "9999";

setTimeout(() => {

    typeLetter();

}, 600);

        }, 700);

    }

};;

function typeLetter() {

    if (typingIndex >= message.length) {

        skipTyping.style.display = "none";

        celebrateBtn.style.display = "inline-flex";

        return;

    }

    typedLetter.innerHTML += message.charAt(typingIndex);

    typingIndex++;

    typingTimer = setTimeout(typeLetter,30);

}

skipTyping.onclick = () => {

    clearTimeout(typingTimer);

    typedLetter.innerHTML = message;

    skipTyping.style.display = "none";

    celebrateBtn.style.display = "inline-flex";

};

celebrateBtn.onclick = () => {

    showScreen("cakeScreen");

};

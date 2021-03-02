let $container = document.getElementById('container');
let $dino = document.getElementById('dino');
let $block = document.getElementById('block');
let $road = document.getElementById('road');
let $cloud = document.getElementById('cloud');
let $score = document.getElementById('score');
let $gameOver = document.getElementById('gameOver');

//declaring variable for score 

let interval = null;
let playerScore = 0;

//function for score
let scoreCounter = () => {
    playerScore++;
    $score.innerHTML = `Puntaje <b>${playerScore}</b>`;
}

//start game

window.addEventListener('keydown', (start) => {
    if(start.code === "Space") {
        $gameOver.style.display = 'none';
        $block.classList.add("blockActive");
        $road.firstElementChild.style.animation = "animateRoad 1.5s linear infinite";
        $cloud.firstElementChild.style.animation = "animateCloud 50s linear infinite";

        //score
        playerScore = 0;
        interval = setInterval(scoreCounter, 200);
    }
})


//jump your character

window.addEventListener("keydown", (e) => {
    if(e.key === 'ArrowUp') {
        if($dino.classList !== 'dinoActive') {
            $dino.classList.add("dinoActive");

            //remove class after 0.5 seconds
            setTimeout(() => {
                $dino.classList.remove('dinoActive');
            }, 500)
        }
    }
})

//game over if character hit the block

let result = setInterval(() => {
    let dinoBottom = parseInt(getComputedStyle($dino).getPropertyValue("bottom"));
    
    let blockLeft = parseInt(getComputedStyle($block).getPropertyValue("left"));

    if(dinoBottom <= 90 && blockLeft >= 20 && blockLeft <= 100) {
        $gameOver.style.display = "block";
        $block.classList.remove('blockActive');
        $road.firstElementChild.style.animation = "none";
        $cloud.firstElementChild.style.animation = "none";
        clearInterval(interval);
        playerScore = 0;
    }
}, 10);
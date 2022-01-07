document.addEventListener('DOMContentLoaded',() => {
     const bird = document.querySelector('.bird');
     const gameContainer = document.querySelector('.game-container');
     const groundMoving = document.querySelector('.ground-moving');
     let birdLeft = 220;
     let birdBottom = 100;
     let gravity = 1;
     let gap = 500;
     let isGameOver = false;
     function startGame(){
          birdBottom -= gravity;
          bird.style.left = birdLeft + 'px';
          bird.style.bottom = birdBottom + 'px';
     }
     let gameTimerID = setInterval(startGame,20);
     function jump(){
          if(birdBottom < 500){
               birdBottom += 48;
          }
          bird.style.bottom = birdBottom + 'px';
     }
     function control(event){
          if(event.keyCode === 32) jump();
     }
     document.addEventListener('keyup',control);
     function gameOver(){
          clearInterval(gameTimerID);
          isGameOver = true;
          document.removeEventListener('keyup',control);
          groundMoving.classList.add('ground');
          groundMoving.classList.remove('ground-moving');
     }
     function generateObstacle(){
          let obstacleLeft = 500;
          let randomHeight = Math.random() * 60;
          let obstacleBottom = randomHeight;
          const div1 = document.createElement('div');
          const div2 = document.createElement('div');
          if(!isGameOver){
               div1.classList.add('obstacle');
               div2.classList.add('topObstacle');
          }
          gameContainer.appendChild(div1);
          gameContainer.appendChild(div2);
          div1.style.left = obstacleLeft + 'px';
          div1.style.bottom = obstacleBottom + 'px';
          div2.style.left = obstacleLeft + 'px';
          div2.style.bottom = obstacleBottom + gap + 'px';
          function moveObstacle(){
               obstacleLeft -= 2;
               div1.style.left = obstacleLeft + 'px';
               div2.style.left = obstacleLeft + 'px';
               if(obstacleLeft === -60){
                    clearInterval(timerID);
                    gameContainer.removeChild(div1);
                    gameContainer.removeChild(div2);
               }
               if(obstacleLeft > 200 && obstacleLeft < 280 && birdLeft === 220 && (birdBottom < obstacleBottom + 153 || birdBottom > obstacleBottom + gap -200) || birdBottom === 0){
                    gameOver();
                    clearInterval(timerID);
               }
          }
          let timerID = setInterval(moveObstacle,20);
          if(!isGameOver){
               setTimeout(generateObstacle,3000);
          }
     }
     generateObstacle();
});
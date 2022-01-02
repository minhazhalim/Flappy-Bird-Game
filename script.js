import {updateBird,setupBird,getBirdRect} from './bird.js';
import {updatePipes,setupPipes,getPassedPipesCount,getPipeRects} from './pipe.js';
document.addEventListener('keypress',handleStart,{once: true});
const dataTitle = document.querySelector('[data-title]');
const dataSubtitle = document.querySelector('[data-subtitle]');
let lastTime;
function isCollision(rectangle1,rectangle2){
     return (rectangle1.left < rectangle2.right && rectangle1.top < rectangle2.bottom && rectangle1.right > rectangle2.left && rectangle1.bottom > rectangle2.top);
}
function checkLose(){
     const birdRect = getBirdRect();
     const insidePipe = getPipeRects().some(rect => isCollision(birdRect,rect));
     const outsideWorld = birdRect.top < 0 || birdRect.bottom > window.innerHeight;
     return outsideWorld || insidePipe;
}
function handleStart(){
     dataTitle.classList.add('hide');
     setupBird();
     setupPipes();
     lastTime = null;
     window.requestAnimationFrame(updateLoop);
}
function handleLose(){
     setTimeout(() => {
          dataTitle.classList.remove('hide');
          dataSubtitle.classList.remove('hide');
          dataSubtitle.textContent = `${getPassedPipesCount()} Pipes`;
          document.addEventListener('keypress',handleStart,{once: true});
     },100);
}
function updateLoop(time){
     if(lastTime == null){
          lastTime = time;
          window.requestAnimationFrame(updateLoop);
          return;
     }
     const delta = time - lastTime;
     updateBird(delta);
     updatePipes(delta);
     if(checkLose()) return handleLose();
     lastTime = time;
     window.requestAnimationFrame(updateLoop);
}
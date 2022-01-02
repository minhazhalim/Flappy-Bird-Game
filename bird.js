const dataBird = document.querySelector('[data-bird]');
const bird_speed = 0.12;
const jump_duration = 200;
let timeSinceLastJump = Number.POSITIVE_INFINITY;
function setTop(top){
     dataBird.style.setProperty('--bird-top',top);
}
function getTop(){
     return parseFloat(getComputedStyle(dataBird).getPropertyValue('--bird-top'));
}
function handleJump(event){
     if(event.code !== 'Space') return;
     timeSinceLastJump = 0;
}
export function getBirdRect(){
     return dataBird.getBoundingClientRect();
}
export function setupBird(){
     setTop(window.innerHeight / 2);
     document.removeEventListener('keydown',handleJump);
     document.addEventListener('keydown',handleJump);
}
export function updateBird(delta){
     if(timeSinceLastJump < jump_duration){
          setTop(getTop() - bird_speed * delta);
     }else{
          setTop(getTop() + bird_speed * delta);
     }
     timeSinceLastJump += delta;
}
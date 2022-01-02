const hole_height = 200;
const pipe_width = 120;
const pipe_interval = 1500;
const pipe_speed = 0.75;
let pipes = [];
let timeSinceLastPipe;
let passedPipeCount;
function createPipeSegment(position){
     const div = document.createElement('div');
     div.classList.add('segment',position);
     return div;
}
function randomNumberBetween(minimum,maximum){
     return Math.floor(Math.random() * (maximum - minimum + 1) + minimum);
}
function createPipe(){
     const div = document.createElement('div');
     const top = createPipeSegment('top');
     const bottom = createPipeSegment('bottom');
     div.append(top);
     div.append(bottom);
     div.classList.add('pipe');
     div.style.setProperty('--hole-top',randomNumberBetween(hole_height * 1.5,window.innerHeight - hole_height * 0.5));
     const pipe = {
          get left(){
               return parseFloat(getComputedStyle(div).getPropertyValue('--pipe-left'));
          },
          set left(value){
               div.style.setProperty('--pipe-left',value);
          },
          remove(){
               pipes = pipes.filter(p => p !== pipe);
               div.remove();
          },
          rects(){
               return [
                    top.getBoundingClientRect(),
                    bottom.getBoundingClientRect(),
               ]
          },
     }
     pipe.left = window.innerWidth;
     document.body.append(div);
     pipes.push(pipe);
}
export function getPassedPipesCount(){
     return passedPipeCount;
}
export function getPipeRects(){
     return pipes.flatMap(pipe => pipe.rects());
}
export function setupPipes(){
     document.documentElement.style.setProperty('--pipe-width',pipe_width);
     document.documentElement.style.setProperty('--hole-height',hole_height);
     pipes.forEach(pipe => pipe.remove());
     timeSinceLastPipe = pipe_interval;
     passedPipeCount = 0;
}
export function updatePipes(delta){
     timeSinceLastPipe += delta;
     if(timeSinceLastPipe > pipe_interval){
          timeSinceLastPipe -= pipe_interval;
          createPipe();
     }
     pipes.forEach(pipe => {
          if(pipe.left + pipe_width < 0){
               passedPipeCount++;
               return pipe.remove();
          }
          pipe.left = pipe.left - delta * pipe_speed;
     });
}
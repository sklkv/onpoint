let container = document.querySelector('.container'),
    thirdSlide = document.querySelector('.slider-item-different');
    n = container.children.length,
    startY = null,
    endY = null,
    distance = 70,
    count = 0,
    vSwipe = 768,
    track = document.querySelector("#track"),
    startX = null,
    endX = null,
    presentX = null,
    xCount = 0,
    leftPosition = 0,
    currentPosition = null,
    gSwipe = 1024;


function onDown(event){
    startY = event.changedTouches[0].clientY;
    event.preventDefault();
}

function move(event){
    endY = event.changedTouches[0].clientY;
    let distanceY = startY - endY;
    //up
    if ((Math.abs(distanceY) > distance) && (distanceY < 0) && (count > 0)){
        count--;
        container.style.setProperty('--vSwipe', count*(-vSwipe) + 'px');
    //down
    } else if ((Math.abs(distanceY) > distance) && (distanceY > 0) && (count < n - 1)){
        count++;
        container.style.setProperty('--vSwipe', count*(-vSwipe) + 'px');
    }
    event.preventDefault();
}

function grabTrack(event){
    startX = event.changedTouches[0].clientX;
    if (xCount < 1) leftPosition = startX;
    event.preventDefault();
}

function moveTrack(event){
    presentX = event.changedTouches[0].clientX;
    if (xCount < 1){ track.style.setProperty('--track', presentX - startX + 'px');
    } else {
        track.style.setProperty('--track', presentX - leftPosition + 'px');
    }
    currentPosition = presentX - leftPosition;
    if (currentPosition <= 95){
        thirdSlide.style.setProperty('--gSwipe', '0px');
    } else if ((currentPosition >= 190) || (currentPosition <= 410)){
        thirdSlide.style.setProperty('--gSwipe', -gSwipe + 'px');
    } else if (currentPosition >= 520){
        thirdSlide.style.setProperty('--gSwipe', 2*(-gSwipe) + 'px');
    }
    console.log('current position: ' + (currentPosition));
    event.preventDefault();
}

function endTrack(event){
    endX = event.changedTouches[0].clientX;
    track.style.setProperty('--track', endX - leftPosition + 'px');
    xCount++;
    event.preventDefault();
}

//vSwipe
container.addEventListener('touchstart', onDown, false);
container.addEventListener('touchend', move, false);
//track
track.addEventListener('touchstart', grabTrack, false);
track.addEventListener('touchmove', moveTrack, false);
track.addEventListener('touchend', endTrack, false);
//gSwipe

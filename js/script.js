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
    gSwipe = 1024,
    minX = 190,
    maxX = 838,
    minY = 645,
    maxY = 730,
    presentY = null,
    startPos = 209,
    prevEnd = null,
    prevPresent = null,
    count = 0,
    startTrack = 0,
    middleTrack = 313,
    endTrack = 619,
    back = null;

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
    } else if ((Math.abs(distanceY) > distance) && (distanceY > 0) && (count < n - 1 )){
        count++;
        container.style.setProperty('--vSwipe', count*(-vSwipe) + 'px');
    }
    event.preventDefault();
}

function grabTrack(event){
    startX = event.changedTouches[0].clientX;
    startY = event.changedTouches[0].clientY;
    if (!((startX >= minX) && (startX <= maxX) && (startY >= minY) && (startY <= maxY))){startX = null}
    startX -= (startPos - back);
    if (startX < 0) startX = null;
    console.log('start ' + startX);
    event.preventDefault();
}

function moveTrack(event){
        presentX = event.changedTouches[0].clientX;
        presentY = event.changedTouches[0].clientY;
        if (!((presentX >= minX) && (presentX <= maxX) && (presentY >= minY) && (presentY <= maxY))){presentX = null}
        presentX -= (startPos - back);
        if (presentX < 0) presentX = null;
        if (presentX != null){
            prevPresent = presentX;
        } else {
            presentX = prevPresent;
        }
        track.style.setProperty('--track', presentX + 'px');
        if (presentX <= 150 + back){
            thirdSlide.style.setProperty('--gSwipe', 0*gSwipe + 'px');
        } else if (presentX >= 155 + back && presentX <= 450 + back){
            thirdSlide.style.setProperty('--gSwipe', -gSwipe + 'px');
        } else if (presentX >= 455 + back){
            thirdSlide.style.setProperty('--gSwipe', 2*-gSwipe + 'px');
        }


    event.preventDefault();
}

function releaseTrack(event){
    endX = event.changedTouches[0].clientX;
    endY = event.changedTouches[0].clientY;
    if (!((endX >= minX) && (endX <= maxX) && (endY >= minY) && (endY <= maxY))){endX = null}
    endX -= (startPos - back);
    if (endX < 0) endX = null;
    if (endX != null){
        prevEnd = endX;
    } else {
        endX = prevEnd;
    }
    track.style.setProperty('--track', endX + 'px');
    let lengths = [endX - startTrack, endX - middleTrack, endX - endTrack],
        k = 0,
        min = Math.abs(lengths[0]);
    for (let i = 0; i < lengths.length; i++){
        if (Math.abs(lengths[i]) < min){
            min = Math.abs(lengths[i]);
            k = i;
        }
    }
    switch(k){
        case 0: track.style.setProperty('--back', -lengths[k] + 'px');
        break;
        case 1: track.style.setProperty('--back', -lengths[k] + 'px');
        break;
        case 2: track.style.setProperty('--back', -lengths[k] + 'px');
        break;
    }
    back = lengths[k];
    console.log('end ' + endX);
    event.preventDefault();
}

//vSwipe
container.addEventListener('touchstart', onDown, false);
container.addEventListener('touchend', move, false);
//track
track.addEventListener('touchstart', grabTrack, false);
track.addEventListener('touchmove', moveTrack, false);
track.addEventListener('touchend', releaseTrack, false);
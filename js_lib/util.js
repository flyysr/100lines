//javascript 阻塞延时
function sleep(milliSeconds){
    var startTime = new Date().getTime(); // get the current time    
    while (new Date().getTime() < startTime + milliSeconds);
}

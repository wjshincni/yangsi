function loop(){
    const btns = document.getElementsByClassName('openSelect');
    const btn1 = document.getElementById('no_1');
    if(btn1.clicked){
        console.log('sb');
        document.querySelectorAll('.preSelect .turn1').style.display = 'block';
    }
}

loop();
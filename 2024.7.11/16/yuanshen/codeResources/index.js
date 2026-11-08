function startPage(){
	var pg1 = document.getElementById('pg1');
	var startBtn = document.getElementById('startBtn');
	var htmlBG = document.getElementById('htmlBG');
	var bodyBG = document.getElementById('bodyBG');
	startBtn.style.transition = "2s";
	startBtn.classList.add("hidden");
	setTimeout(function(){
		startBtn.style.display = "none";
	},2000)
	pg1.classList.add("hidden");
	htmlBG.style.backgroundColor = "white";
	bodyBG.style.backgroundColor = "white";
	setTimeout(loadPg2(),2000);
}

function loadPg1(){
	var htmlBG = document.getElementById('htmlBG');
	var bodyBG = document.getElementById('bodyBG');
	var pg1 = document.getElementById('pg1');
	var startBtn = document.getElementById('startBtn');
	htmlBG.style.backgroundColor = "black";
	bodyBG.style.backgroundColor = "black";
	startBtn.style.transition = "10s";
	pg1.classList.remove("hidden");
	startBtn.style.display = "block";
	setTimeout(function(){
		startBtn.classList.remove("hidden");
	},2000)
}

function loadPg2(){
	var pg2 = document.getElementById('pg2');
	var mihoyo = document.getElementById('mihoyo');
	pg2.classList.remove("hidden");
	setTimeout(function(){
		mihoyo.classList.remove("hidden");
	},3000)
	setTimeout(function(){
		pg2.classList.add("hidden");
		mihoyo.classList.add("hidden");
		loadPg3();
	},8000)
}

function loadPg3(){
	var pg3 = document.getElementById('pg3');
	var Genshin = document.getElementById('Genshin');
	var bottomContent = document.getElementById('bottomContent');
	pg3.classList.remove("hidden");
	setTimeout(function(){
		Genshin.classList.remove("hidden");
		bottomContent.classList.remove("hidden");
	},3000);
	setTimeout(function(){
		pg3.classList.add("hidden");
		Genshin.classList.add("hidden");
		setTimeout(function(){
			bottomContent.classList.add("hidden");
		},2000)
		setTimeout(loadPg4(),8000)
	},8000)

}

function loadPg4(){
	var pg4 = document.getElementById('pg4');
	setTimeout(function(){
		var intoDoor = document.getElementById('intoDoor');
	},2000)
	pg4.classList.remove("hidden");
	const time = new Date().getHours();
	if(time < 10 && time > 5){
		intoDoor.src = "videos/MorningDoor.mp4";
	}
	else if(time < 16 && time >= 10){
		intoDoor.src = "videos/MidnoonDoor.mp4";
	}
	else if(time < 20 && time >= 16){
		intoDoor.src = "videos/EveningDoor.mp4";
	}
	else{
		intoDoor.src = "videos/MidnightDoor.mp4";
	}
	setTimeout(function(){
		intoDoor.classList.remove("hidden");
		intoDoor.addEventListener('ended' , function(){
			window.open('../client.html','_self');
		})
	},3000)
}
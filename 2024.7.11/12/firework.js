		var clickAbility = true;

		// 烟花特效
        (function () {
			var btn = document.getElementById('hideBtn');
			var msg = document.getElementById('settings');
			setInterval(function(){//隐藏框
				if(btn.checked){
					msg.style.display = "block";
					clickAbility = true;
				}
				else{
					msg.style.display = "none";
					clickAbility = false;
				}
			},1000)
            var canvas = document.getElementById('fireworks'),
                ctx = canvas.getContext('2d'),
                settings,
                fireworks = [],
                particles = [],
                hue = 10,
                limiterTotal = 1,
                limiterTick = 0,
                timerTotal = 300,
                timerTick = 0,
                mousedown = false,
                particle,
                size,
                P,
                S,
                mx,
                my;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            function random(min, max) {
                return Math.random() * (max - min) + min;
            }
            function calculateDistance(p1x, p1y, p2x, p2y) {
                var xDistance = p1x - p2x,
                    yDistance = p1y - p2y;
                return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 1));
            }
            function Firework(sx, sy, tx, ty) {
                this.x = sx;
                this.y = sy;
                this.sx = sx;
                this.sy = sy;
                this.tx = tx;
                this.ty = ty;
                this.distanceToTarget = calculateDistance(sx, sy, tx, ty);
                this.distanceTraveled = 0;
                this.coordinates = [];
                this.coordinateCount = 3;
                while (this.coordinateCount--) {
                    this.coordinates.push([this.x, this.y]);
                }
                this.angle = Math.atan2(ty - sy, tx - sx);
                this.speed = 0.2;
                this.acceleration = 1.05;
                this.brightness = random(50, 70);
                this.targetRadius = 1;
            }
            Firework.prototype.update = function (index) {
                this.coordinates.pop();
                this.coordinates.unshift([this.x, this.y]);
                if (this.targetRadius < 8) {
                    this.targetRadius += 0.1;
                } else {
                    this.targetRadius = 1;
                }
                this.speed *= this.acceleration;
                var vx = Math.cos(this.angle) * this.speed,
                    vy = Math.sin(this.angle) * this.speed;
                this.distanceTraveled = calculateDistance(this.sx, this.sy, this.x + vx, this.y + vy);
                if (this.distanceTraveled >= this.distanceToTarget) {
                    createParticles(this.tx, this.ty);
                    fireworks.splice(index, 1);
                } else {
                    this.x += vx;
                    this.y += vy;
                }
            }
            Firework.prototype.draw = function () {
                ctx.beginPath();
                ctx.moveTo(this.coordinates[this.coordinates.length - 1][0], this.coordinates[this.coordinates.length - 1][1]);
                ctx.lineTo(this.x, this.y);
                ctx.strokeStyle = 'hsl(' + hue + ', 100%, ' + this.brightness + '%)';
                ctx.stroke();
                ctx.beginPath();
                ctx.arc(this.tx, this.ty, this.targetRadius, 0, Math.PI * 2);
                ctx.stroke();
            }
            function createParticles(x, y) {
                var particleCount = P;
                while (particleCount--) {
                    particles.push(new Particle(x, y));
                }
            }
            function Particle(x, y) {
                this.x = x;
                this.y = y;
                this.coordinates = [];
                this.coordinateCount = 10;
                while (this.coordinateCount--) {
                    this.coordinates.push([this.x, this.y]);
                }
                this.angle = random(0, Math.PI * 2);
                this.speed = random(1,S);
                this.friction = 0.95;
                this.gravity = 1;
                this.hue = random(hue - 20, hue + 20);
                this.brightness = random(50, 80);
                this.alpha = 1;
                this.decay = random(0.015, 0.03);
            }
            Particle.prototype.update = function (index) {
                this.coordinates.pop();
                this.coordinates.unshift([this.x, this.y]);
                this.speed *= this.friction;
                this.x += Math.cos(this.angle) * this.speed;
                this.y += Math.sin(this.angle) * this.speed + this.gravity;
                this.alpha -= this.decay;
                if (this.alpha <= this.decay) {
                    particles.splice(index, 1);
                }
            }
            Particle.prototype.draw = function () {
                ctx.beginPath();
                ctx.moveTo(this.coordinates[this.coordinates.length - 1][0], this.coordinates[this.coordinates.length - 1][1]);
                ctx.lineTo(this.x, this.y);
                ctx.strokeStyle = 'hsla(' + this.hue + ', 100%, ' + this.brightness + '%, ' + this.alpha + ')';
                ctx.stroke();
            }
			
            function loop() {
                settings = document.getElementById('settings');
                particle = document.getElementById('particle');
                size = document.getElementById('size');
                P = particle.value;
                S = size.value;
                if(P >= 99999){
                    alert("条数已达上限(99999条),太多了会爆炸的哦,ttx帮你强制退回默认值");
                    particle.value = 256;
                }else
                if(P >= 128 && P < 256){
                    document.getElementById('message').value = "入门级";
                }else
                if(P >= 256 && P < 512){
                    document.getElementById('message').value = "低端鸡";
                }else
                if(P >= 512 && P < 1024){
                    document.getElementById('message').value = "中高端鸡";
                }else
                if(P >= 1024 && P < 2048){
                    document.getElementById('message').value = "高端鸡";
                }else
                if(P >= 2048 && P < 4096){
                    document.getElementById('message').value = "火鸡";
                }else
                if(P >= 4096 && P < 8192){
                    document.getElementById('message').value = "你看到的是烟花还是核弹";
                }else
                if(P >= 8192 && P < 99999){
                    document.getElementById('message').value = "你看到的是宇宙大爆炸";
                }
                hue = random(1,2048);
                ctx.globalCompositeOperation = 'destination-out';
                ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.globalCompositeOperation = 'lighter';
                var i = fireworks.length;
                while (i--) {
                    fireworks[i].draw();
                    fireworks[i].update(i);
                }
                var i = particles.length;
                while (i--) {
                    particles[i].draw();
                    particles[i].update(i);
                }
                if (timerTick >= timerTotal) {
                    if (!mousedown) {
                        fireworks.push(new Firework(canvas.width / 2, canvas.height, random(0, canvas.width), random(0, canvas.height / 2)));
                        timerTick = 0;
						if(clickAbility){
							settings.style.display = 'block';
						}
					}
                } else {
                    timerTick+=20;
                }
                if (limiterTick >= limiterTotal) {
                    if (mousedown) {
						if(clickAbility){
							fireworks.push(new Firework(canvas.width / 2, canvas.height, mx, my));
							settings.style.display = 'none';
						}
                        limiterTick = 0;
                        
                    }
                } else {
                    limiterTick++;
                }
                requestAnimationFrame(loop);
            }
            window.onload = function () {
                canvas.addEventListener('touchstart', function (e) {
                    e.preventDefault();
                    mx = e.targetTouches[0].pageX;
                    my = e.targetTouches[0].pageY;
                    mousedown = true;
                });
                canvas.addEventListener('touchmove', function(e){
                    mx = e.targetTouches[0].pageX;
                    my = e.targetTouches[0].pageY;
                });
                canvas.addEventListener('touchend', function (e){
                    e.preventDefault();
                    mousedown = false;
                });
                canvas.addEventListener('mousemove', function (e) {
                    mx = e.pageX - canvas.offsetLeft;
                    my = e.pageY - canvas.offsetTop;
                });
                canvas.addEventListener('mousedown', function (e) {
                    e.preventDefault();
                    mousedown = true;
                });
                canvas.addEventListener('mouseup', function (e) {
                    e.preventDefault();
                    mousedown = false;
                });
                loop();
            };
        })();
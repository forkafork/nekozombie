
            let score = 0;

            let player = {
                x: 3, //left -1 and right +1
                y: 3, //up -1 and down +1
            };

            let cat = {
                x: 1,
                y: 1,
            };

            let zombie = {
                x: 3,
                y: 0,
            };

            catHide();
            zombieHide(); 
            
            document.getElementById("scoreNumber").innerHTML = "Cats found: " + score; //this is the score shown on the app

            function chase() { //this generates a number between 0-10, if higher than 5, zombie will move towards player. If lower it will remain stationary.
                rng = Math.floor(Math.random()*10)
                if(rng > 5){
                    if (zombie.x < player.x) {
                        zombie.x++;
                    }
                    if (zombie.x > player.x){
                        zombie.x--;
                    }
                    if (zombie.y < player.y){
                        zombie.y++;
                    }
                    if (zombie.y > player.y){
                        zombie.y--;
                    }
                }
            }
            
            function radar() { //changes the color of movement arrows if you hear a zombie or a cat nearby.
                if(player.x+1 == cat.x && player.y == cat.y){
                    document.getElementById("RIGHT").src="pics/rightC.png";
                } else if(player.x+1 == zombie.x && player.y == zombie.y) {
                    document.getElementById("RIGHT").src="pics/rightZ.png";
                }
                else{
                    document.getElementById("RIGHT").src="pics/right.png";
                }

                if(player.x-1 == cat.x && player.y == cat.y){
                    document.getElementById("LEFT").src="pics/leftC.png";
                }else if(player.x-1 == zombie.x && player.y == zombie.y){
                    document.getElementById("LEFT").src="pics/leftZ.png";
                }
                else{
                    document.getElementById("LEFT").src="pics/left.png";
                }

                if(player.x == cat.x && player.y+1 == cat.y){
                    document.getElementById("DOWN").src="pics/downC.png";
                }else if(player.x == zombie.x && player.y+1 == zombie.y){
                    document.getElementById("DOWN").src="pics/downZ.png";
                }
                else{
                    document.getElementById("DOWN").src="pics/down.png";
                }

                if(player.x == cat.x && player.y-1 == cat.y){
                    document.getElementById("UP").src="pics/upC.png";
                }else if(player.x == zombie.x && player.y-1 == zombie.y){
                    document.getElementById("UP").src="pics/upZ.png";
                }
                else{
                    document.getElementById("UP").src="pics/up.png";
                }
            }
            
            function relocateCat() { //cat changes place after you find it
                cat.x = Math.floor(Math.random()*6);
                cat.y = Math.floor(Math.random()*6);
                if (cat.x == player.x && cat.y == player.y){
                    relocateCat();
                }
                if (cat.x == zombie.x && cat.y == zombie.y){
                    relocateCat();
                }
            }

            function findCats() { //finding a cat gives you +1 score
                if (player.x == cat.x && player.y == cat.y) {
                    score++;
                    document.getElementById("scoreNumber").innerHTML = "Cats found: " + score;
                }               
            }

            function winGame(){ //finding 3 cats wins the game
                if(score == 3){
                    window.alert("Congratulations you found all the cats and won the game!");
                    window.location.replace("index.html");
                }
            }

            function findZombie() { //finding a zombie gives a shitty alert(temporary)
                if (player.x == zombie.x && player.y == zombie.y) {
                    window.alert("Zombie caught you! You found " + score + " cats before you died!");
                    window.location.replace("zombie.html");
                }
            }

            function catHide() { //the picture of the cat will only appear when user finds them
                    if (player.x === cat.x && player.y === cat.y) {
                        document.getElementById("catPic").classList.remove("hideC");
                        relocateCat();
                    }
                    else {
                        document.getElementById("catPic").classList.add("hideC");
                    }
                }

            function zombieHide() { //same as catHide
                    if (player.x === zombie.x && player.y === zombie.y) {
                        document.getElementById("zombiePic").classList.remove("hideZ");
                    }
                    else {
                        document.getElementById("zombiePic").classList.add("hideZ");
                    }
                }

            function moveFunction(direction) { //the movement system that stops player from leaving 7x7 area

                if (direction === "up") {
                    if (player.y === 0) {
                        return;
                    } else {
                        player.y--;
                    }
                }

                if (direction === "down") {
                    if (player.y === 6) {
                        return;
                    } else {
                        player.y++;
                    }
                }

                if (direction === "left") {
                    if (player.x === 0) {
                        return;
                    } else {
                        player.x--;
                    }
                }

                if (direction === "right") {
                    if (player.x === 6) {
                        return;
                    } else {
                        player.x++;
                    }
                }
                //here we place all of the outside functions so they are called as user moves
                background();
                findCats();
                winGame();
                findZombie();
                arrowHide();
                catHide();
                zombieHide();
                radar();
                chase();
            }

                function arrowHide() { //this hides the arrows when the user reaches the borders
                    if (player.y === 0) {
                        document.getElementById("goUp").classList.add("hide");
                    }
                    else {
                        document.getElementById("goUp").classList.remove("hide");
                    }
                    if (player.y === 6) {
                        document.getElementById("goDown").classList.add("hide");
                    }
                    else {
                        document.getElementById("goDown").classList.remove("hide");
                    }
                    if (player.x === 0) {
                        document.getElementById("goLeft").classList.add("hide");
                    }
                    else {
                        document.getElementById("goLeft").classList.remove("hide");
                    }
                    if (player.x === 6) {
                        document.getElementById("goRight").classList.add("hide");
                    }
                    else {
                        document.getElementById("goRight").classList.remove("hide");
                    }
                }

                function background() { //This changes the background based on player coordinates
                    let bgPic = "pics/" + player.x.toString() + player.y.toString() + ".jpeg"; //this types up pics/33.jpeg
                    document.getElementById('container').style.backgroundImage = "url(" + bgPic + ")"; //this types up url(pics/33.jpeg)
                }

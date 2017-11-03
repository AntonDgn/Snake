
function snake(){

	var positionX = 60,
		positionY = 10,
		snakeLength = 5,
		elements = null,
		intervalId = null,
		foodPositionX = null,
		foodPositionY = null,
		snakeWidth = 10;
		food = null,
		map = 400,
		level = 1,
		live = 3,
		total = 0,
		speed = 300;


	function addItem(positionX, positionY, isAppend, isFood = false) {
		var span = document.createElement('span');
		if(isFood){
			span.className = 'snake-item_food';
		}
		else
		{
			span.className = 'snake-item';
		}
		span.style.top = positionY + 'px';
		span.style.left = positionX + 'px';
		if(isAppend)
		{
			return document.getElementById('game-field').appendChild(span);	
		}
		else
		{
			return document.getElementById('game-field').insertBefore(span, elements[0]);
		}
		
	};

	function clearItem(elem){
		elem.parentNode.removeChild(elem);
	};

	function viewSnake(positionX, positionY){
		for (var i = 0; i < snakeLength; i++) {
			addItem(positionX, positionY, true);
			positionX = positionX - snakeWidth;
		}
		foodGeneration();
		return elements = document.getElementsByClassName('snake-item');
	};

	function isGame(position) {
		statisticSnake();
		if(position > map || position < 0)
		{
			clearInterval(intervalId);
			alert('Game Over!!!');
		}
	};

	function isEat(positionX, positionY) {
		if(positionX === foodPositionX && positionY === foodPositionY)
		{
			snakeLength++;
			addItem(positionX, positionY, false);
			clearItem(food);
			foodGeneration();
			total = total + 5;
			isLevel();
			statisticSnake();
		}
		else
		{
			for (var i = 0; i < elements.length; i++) {
				console.log(elements[i].style.top);
				if(elements[i].style.top === (positionY + 'px') && elements[i].style.left === (positionX + 'px'))
				{
					
					clearInterval(intervalId);
					alert('Game Over!!!');
					break;
				}
			};
			clearItem(elements[snakeLength - 1]);
			addItem(positionX, positionY, false);
		}
	}

	function leftSnake(){
		positionX = positionX + snakeWidth;
		isGame(positionX);
		isEat(positionX, positionY);
	};

	function rightSnake(){
		positionX = positionX - snakeWidth;
		isGame(positionX);
		isEat(positionX, positionY);
	};

	function upSnake(){
		positionY = positionY - snakeWidth;
		isGame(positionY);
		isEat(positionX, positionY);
	};

	function downSnake(){
		positionY = positionY + snakeWidth;
		isGame(positionY);
		isEat(positionX, positionY);
	};

	function goSnake(route){
		var routeFunction = route + 'Snake';
		clearInterval(intervalId);intervalId = setInterval(eval(routeFunction), speed);
		
	};

	function generationNumber(){
		var number = Math.round(Math.random() * map);
		if(number % snakeWidth === 0)
		{
			return number;
		}
		else
		{
			return generationNumber();
		}
	}

	function isLevel() {
		if(total % 50 === 0)
		{
			level++;
			speed = speed - 30;
		}
	}

	function foodGeneration(){

		foodPositionX = generationNumber();
		foodPositionY = generationNumber();
		food = addItem(foodPositionX, foodPositionY, true, true);
	}

	viewSnake(positionX, positionY);
	document.onkeydown = function(elem){
		if(elem.keyCode === 37)
		{
			goSnake('right');
		}
		else
		{
			if(elem.keyCode === 38)
			{
				goSnake('up');
			}
			else
			{
				if(elem.keyCode === 39)
				{
					goSnake('left');
				}
				else
				{
					if(elem.keyCode === 40)
					{
						goSnake('down');
					}
					else
					{
						return null;
					}
				}
			}
		}
	};

	function statisticSnake(){
		document.getElementsByClassName('level')[0].innerText = level + ' Уровень';
		document.getElementsByClassName('live')[0].innerText = live + ' Жизни';
		document.getElementsByClassName('total')[0].innerText = total + ' Очков';
	}

	document.getElementById('start').onclick = function(){ goSnake('left') };
/*	document.getElementById('left').onclick = function(){ goSnake('left') };
	document.getElementById('right').onclick = function(){  };
	document.getElementById('up').onclick = function(){ goSnake('up') };
	document.getElementById('down').onclick = function(){ goSnake('down') };*/
}

snake();





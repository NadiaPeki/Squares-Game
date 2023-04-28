const $start = document.querySelector('#start')
const $game = document.querySelector('#game')
const $time = document.querySelector('#time')
const $result = document.querySelector('#result')
const $timeHeader = document.querySelector('#time-header')
const $resultHeader = document.querySelector('#result-header')
const $gameTime = document.querySelector('#game-time')
const colors = ['#42b0da', '#0d8968', '#d3e23d', '#b00678', '#0c6d2c', '#bdd46b', '#bd651d', '#784782', '#5b1624', '#0c325e']

let score = 0
let isGameStarted = false

$start.addEventListener('click', startGame)
$game.addEventListener('click', handleBoxClick)
$gameTime.addEventListener('input', setGameTime)

function show($el) {
$el.classList.remove('hide')
}

function hide($el) {
$el.classList.add('hide')
}

function startGame() {
    score = 0
    setGameTime()
    $gameTime.setAttribute('disabled', true)
    
    isGameStarted = true
    $game.style.backgroundColor = '#fff'
    $start.classList.add('hide') //скрываем кнопку с помощью класса hide
    const interval = setInterval(function(){    //делаем таймер
    const time = parseFloat($time.textContent) //получаем число из строки
    
    if (time <= 0) {
        clearInterval(interval) // останавливаем интервал таймер
        endGame()
    }   else {
        $time.textContent = (time - 0.1).toFixed(1) // округляем таймер
    }

    }, 100)

    renderBox()
}

function setGameScore() {
    $result.textContent = score.toString()
}

function setGameTime() {
    let time = +$gameTime.value
    $time.textContent = time.toFixed(1)
    show($timeHeader) 
    hide($resultHeader)
}

function endGame() {
isGameStarted = false
setGameScore()
$gameTime.removeAttribute('disabled')
show($start)
$game.innerHTML = ''
$game.style.backgroundColor = '#ccc'
hide($timeHeader)
show($resultHeader)
}

function handleBoxClick(event) {
   if(!isGameStarted) {
    return
   }

   if (event.target.dataset.box) { //проверяем был ли клик по квадрату
    score++
    renderBox()
   }
}

function renderBox() {
    
    $game.innerHTML = '' //удаляем старые квадраты после нажатия
    const box = document.createElement('div') // создаем элемент див - это наш квадрат
    const boxSize = getRandom(30, 100)
    const gameSize = $game.getBoundingClientRect() // вычисляем размер поля game
    const maxTop = gameSize.height - boxSize  
    const maxLeft = gameSize.width - boxSize
    const randomColorIndex = getRandom(0, colors.length)

    box.style.height = box.style.width = boxSize + 'px'
    box.style.position = 'absolute' // наш квадрат будет располагаться относительно квадрата в котором находится
    box.style.backgroundColor = colors[randomColorIndex]
    box.style.top = getRandom(0, maxTop) + 'px'
    box.style.left = getRandom(0, maxLeft) + 'px'
    box.style.cursor = 'pointer'
    box.setAttribute('data-box', 'true') // добавили атрибут квадрату

    $game.insertAdjacentElement('afterbegin', box) //добавляем бокс после начала игры
    
}

function getRandom(min, max) {
return Math.floor(Math.random() * (max - min) + min) // получить рандомное число в заданном диапазоне и округ в меньшую сторону
}

/*function getRandomColor() {
    const index = Math.floor(Math.random() * colors.length)
    return colors[index]
}
*/
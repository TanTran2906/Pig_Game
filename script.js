'use strict';
//Nhìn vào sơ đồ chức năng, luồng sự kiện


const score01El = document.querySelector('#score--0');
const score02El = document.querySelector('#score--1');
const dice = document.querySelector('.dice');
const coating01El = document.querySelector('.player--0')
const coating02El = document.querySelector('.player--1')
const btnNew = document.querySelector('.btn--new')
const btnRoll = document.querySelector('.btn--roll')
const btnHold = document.querySelector('.btn--hold')

//Start
score01El.textContent = 0;
score02El.textContent = 0;
dice.classList.add('hidden');

//Lưu điểm của player khi nhấn hold-btn 
let score = [0,0];

let coreCurrent = 0;
//Xác định player nào đang chơi : 0 là player 1, 1 là player 2
let activePlayer = 0;
//Trạng thái chiến thắng, với false là thắng
let isWin = true;

//Switch to next player
let switchPlayer = function(){
    //Đặt lại core-current
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    coreCurrent = 0;

    //Chuyển player - Chuyển lớp phủ
    activePlayer = activePlayer === 0 ? 1 : 0
    coating01El.classList.toggle('player--active')
    coating02El.classList.toggle('player--active')
}


//Use roll btn
btnRoll.addEventListener('click',function(){
    if(isWin){
        //randol roll
        const rollRandom = Math.trunc(Math.random()*6)+1;

        //display dice
        dice.classList.remove('hidden');
        dice.src = `dice-${rollRandom}.png`;

        //check dice
        if(rollRandom !== 1){
            coreCurrent += rollRandom
            document.getElementById(`current--${activePlayer}`).textContent = coreCurrent
        }
        else{
            switchPlayer();
        }
    }
    
})


//Use hold btn
btnHold.addEventListener('click',function(){
    if(isWin){
        score[activePlayer] += coreCurrent;
        document.getElementById(`score--${activePlayer}`).textContent = score[activePlayer];
        document.getElementById(`current--${activePlayer}`).textContent = 0;
        coreCurrent = 0;
    }

    if(score[activePlayer] >= 20){
        isWin = false
        dice.classList.add('hidden');
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
    }
    else switchPlayer();
})

//Use new ganme btn
btnNew.addEventListener('click',function(){
    dice.classList.add('hidden');
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--winner');
    document.querySelector(`.player--${activePlayer}`).classList.add('player--active');
    document.getElementById(`current--0`).textContent = 0;
    document.getElementById(`current--1`).textContent = 0;
    document.getElementById(`score--0`).textContent = 0;
    document.getElementById(`score--1`).textContent = 0;
    score[0] = score[1] = 0;
    coreCurrent = 0;
    isWin = true;
    if(activePlayer === 1)
        switchPlayer();
})
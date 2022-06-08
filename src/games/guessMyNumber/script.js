let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 10;
let highScore = 0;

const displayMessage = function(message) {
    document.querySelector('.message').textContent = message;
}



document.querySelector('.check').addEventListener('click', function(){
    const guess = Number(document.querySelector('.guess').value);
    // console.log(guess); 
    
    if(!guess){
        displayMessage('⛔️ No Number!');
    }else if(guess === secretNumber){
        displayMessage('🎉 Correct Number!');
        document.querySelector('body').style.backgroundColor = '#60b347';
        document.querySelector('.number').style.width = '30rem';
        document.querySelector('.number').textContent = secretNumber;

        if(score > highScore){
            highScore = score;
            document.querySelector('.highscore').textContent = highScore;
        }
    }else if(guess !== secretNumber){
        if (score > 1) {
            // document.querySelector('.message').textContent = guess > secretNumber ? '📈 Too high!' : '📉 Too low!';
            displayMessage(guess > secretNumber ? '📈 Too high!' : '📉 Too low!');
            score--;
            document.querySelector('.score').textContent = score;
        } else {
            displayMessage('💥 You lost the game!');

            document.querySelector('.score').textContent = 0;
        }
    }
});

document.querySelector('.again').addEventListener('click', function(){
    score = 10;
    secretNumber = Math.trunc(Math.random() * 20) + 1;
    console.log(secretNumber);
    displayMessage( 'Start guessing...');
    document.querySelector('.score').textContent = score;
    document.querySelector('.number').textContent = '?';
    document.querySelector('body').style.backgroundColor = '#222';
    document.querySelector('.number').style.width = '15rem';
    document.querySelector('.guess').value = '';

})



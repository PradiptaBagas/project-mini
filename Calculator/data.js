let playTotal = 0 
let buffer = "0"
let previousOperator

const screen = document.querySelector('.screen')

function buttonClick (value) {
    if(isNaN(value)){ 
        handleSymbol(value)
    }else{ 
        handleNumber(value)
    }
    screen.innerText = buffer
}

function handleSymbol(symbol) {
    switch(symbol){
        case 'C':
            buffer = '0'
            playTotal = 0
            break
        case '=':
            if(previousOperator === null){
                return
            }
            flushOperation(parseInt(buffer))
            previousOperator = null
            buffer = playTotal
            playTotal = 0
            break
        case '←':
            if(buffer.length ===1){
                buffer = '0'
            }else{
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break
        case '+':
        case '-':
        case '×':
        case '÷':
            handelMath(symbol)
            break
    }
}

function handelMath(symbol) {
    if(buffer === '0'){
        return
    }
    const intBuffer = parseInt(buffer)

    if(playTotal === 0){
        playTotal = intBuffer 
    }else{
        flushOperation(intBuffer)
    }
    previousOperator = symbol
    buffer = '0'
}

function flushOperation (intBuffer){
    if(previousOperator === '+'){
        playTotal += intBuffer 
    }else if(previousOperator === '-'){
        playTotal -= intBuffer
    }else if(previousOperator === '×'){
        playTotal *= intBuffer
    }else if(previousOperator === '÷'){
        playTotal /= intBuffer      
    }
}

function handleNumber (numberString){
    if(buffer === "0"){
        buffer = numberString
    }else{
        buffer += numberString
    }
}

function init(){
    document.querySelector('.calc-buttons').addEventListener('click', function(event){
        buttonClick(event.target.innerText);
    })
}

init()
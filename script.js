let register = null
let operatorRegister = null
let operatorElementSelected = null
let isNextNum = false

$(document).ready(function() {
    reset()
    $("#ac").click(function(){
        reset()
    })
    $(".digit").click(function(e){
        selectDigit(getDigit(e))
    })
    $(".operator").click(function(e){
        setOperator(e)
    })
    $(".equal").click(function(){
        calculateResult()
    })
})

function display(n) {
    $(".calc-display-content:nth-child(1)").html(n)
}

function reset() {
    display(0)
    register = null
    unselectOperator()
    operatorElementSelected = null
    operatorRegister = null
}

function getDisplay() {
    return parseInt($(".calc-display-content:nth-child(1)").html())
}

function selectDigit(n) {
    let currentNum
    if (!isNextNum){
        currentNum = getDisplay()
        currentNum *= 10
        currentNum += n
    }else {
        display(n)
        isNextNum = false
    }
    display(currentNum)
    unselectOperator()
}

function getOperator(e) {
    return String(e.currentTarget.lastElementChild.textContent)
}

function getDigit(e) {
    return parseInt(e.currentTarget.lastElementChild.textContent)
}

function setOperator(e) {
    if (register == null) {
        register = getDisplay()
    }else if (register != null && operatorElementSelected == null){
        calculateResult()
    }
    operatorRegister = getOperator(e)
    unselectOperator()
    element = e.currentTarget.lastElementChild.parentElement
    selectOperator(element)
    isNextNum = true
}

function selectOperator(element) {
    $(element).css("background", "white")
    $(element).css("color", "#ff9500")
    operatorElementSelected = element
}

function unselectOperator() {
    $(operatorElementSelected).css("background", "#ff9500")
    $(operatorElementSelected).css("color", "white")
    operatorElementSelected = null
}

function calculateResult(){
    if (operatorRegister == "+") {
        register += getDisplay()
    }else if (operatorRegister == "-") {
        register -= getDisplay()
    }else if (operatorRegister == "x") {
        register *= getDisplay()
    }else if (operatorRegister == "/") {
        register /= getDisplay()
    }
    display(register)
}
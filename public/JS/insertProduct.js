function checkPrice(){
    var x =  document.getElementById('price').value;
    // nếu là chữ
    if(isNaN(x))
    {
        document.getElementById('checkprice').innerHTML = "Vui lòng chỉ nhập số !";
        document.getElementById('price').style.borderColor = "red";
    }
    else
    {
        document.getElementById('checkprice').innerHTML = "";
        document.getElementById('price').style.borderColor = "";
    }
}   

function checkNumber(){
    var y =  document.getElementById('number').value;
    if(isNaN(y)){
        document.getElementById('checknumber').innerHTML = "Vui lòng chỉ nhập số !";
        document.getElementById('number').style.borderColor = "red";
    }
    else 
    {
        document.getElementById('checknumber').innerHTML = "";
        document.getElementById('number').style.borderColor = "";
    }
}
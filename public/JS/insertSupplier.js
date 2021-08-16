function checkPhone()
{
    var x = document.getElementById('phone').value;
    if(isNaN(x))
    {
        document.getElementById('checkphone').innerHTML = "Vui lòng chỉ nhập số";
        document.getElementById('phone').style.borderColor = "red";
    }     
    else
    {
        document.getElementById('checkphone').innerHTML = "";
        document.getElementById('phone').style.borderColor = "";
    }         
}
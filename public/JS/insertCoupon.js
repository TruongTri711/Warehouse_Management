let selectText = (ele) => {
    let selectNumber = document.getElementById('selectNumber');
    let selectPrice = document.getElementById('selectPrice');

    let frm = document.forms['frm'];
    selectNumber.value = ele.options[ele.selectedIndex].text;
    selectPrice.value = ele.options[ele.selectedIndex].text;

    frm.action="/warehouse/insertCoupon/" 
                + ele.options[ele.selectedIndex].text + "/" 
                + ele.value + "/" 
                + selectNumber.options[selectNumber.selectedIndex].text 
                + "/" + selectPrice.options[selectPrice.selectedIndex].text;
}
function checkPrice(){
    var x = document.getElementById('price').value;
    if(isNaN(x)){
        document.getElementById('price').style.borderColor= "red";
        document.getElementById('checkprice').innerHTML= "Vui lòng chỉ nhập số !";
    }
    else 
    {
        document.getElementById('price').style.borderColor= "";
        document.getElementById('checkprice').innerHTML= "";
    }
}
var ID;

let selectText = (ele) => {
    let frm = document.forms['frm'];
    let getPrice = document.getElementById('getPrice_current');
    let numberExport = document.getElementById('numberExport');
    let priceExport = document.getElementById('priceExport');
    let allProfit = document.getElementById('allProfit');

    getPrice.value = ele.options[ele.selectedIndex].text;  
    numberExport.value = ele.options[ele.selectedIndex].text;  
    priceExport.value = ele.options[ele.selectedIndex].text; 
    allProfit.value = ele.options[ele.selectedIndex].text; 

    frm.action = "/export/insertExport/" 
                + ele.options[ele.selectedIndex].text 
                + "/" + ele.value 
                + "/" + getPrice.options[getPrice.selectedIndex].text
                + "/" + numberExport.options[numberExport.selectedIndex].text
                + "/" + priceExport.options[priceExport.selectedIndex].text
                + "/" + allProfit.options[allProfit.selectedIndex].text; ;
    ID = ele.value;
}  
function checkSubmit(){
    if(number.value > ID)
    {
        alert('Số lượng vật tư xuất vượt quá số vật tư hiện tại trong kho.');
    }
    else 
    {
        let btn = document.getElementById('btn');
        btn.type = "submit";
    }
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

const BASE_URL= "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const msg=document.querySelector(".msg");
const btn=document.querySelector("form button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
//populate the dropdown options
const dropdowns= document.querySelectorAll(".dropdown select");

for(let select of dropdowns){
    for(currCode in countryList){
        let newOption= document.createElement("option");
        newOption.innerText=currCode;
        select.append(newOption);

        if (select.name==="from"  && currCode==="USD"){
            newOption.selected="selected";
        }

        if (select.name==="to"  && currCode==="INR"){
            newOption.selected="selected";
        }
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    });
}

const updateFlag = (element)=>{
    //finding the currCode from the change
    let currCode=element.value;
    let countryCode=countryList[currCode];
    let newSrc= `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;
};

btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    updateExchangeRate();
});

const updateExchangeRate = async() => {
    let amount=document.querySelector(".amount input");
    let amtVal=amount.value;

    if(amtVal==="" || amtVal<1){
        amtVal=1;
        amount.value="1";
    }

    //we will receive the exchange rate from this
    const URL=`${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;

    let response = await fetch(URL);
    let data=await response.json();
    let rate=data[toCurr.value.toLowerCase()];
    let finalAmount=parseFloat((amtVal*rate).toFixed(4));

    // toFixed(2) rounds the number to 2 decimal places. You can replace 2 with any other number to round to a different number of decimal places. Note that toFixed() returns a string representation of the rounded number, not a numeric value. If you need to use the result in further calculations, you may need to convert it back to a number using parseFloat() or Number()

    msg.innerText=`${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
};

window.addEventListener("load",()=>{
    updateExchangeRate();
});
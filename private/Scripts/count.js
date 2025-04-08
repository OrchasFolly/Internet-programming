const value = document.getElementById("value");
const total = document.getElementById("money");
const qtd = parseFloat(document.getElementById("money").innerHTML);
const btnUp = document.getElementById("up");
const btnDown = document.getElementById("down");

let updateValue = () =>{
    if(places < 1){
        value.innerHTML = 1;
    }
    else if(places > 30){
        value.innerHTML = 30;
    }
    else{
        value.innerHTML = places;
        total.innerHTML = qtd * places;
    }
};

let places = 1;
let price = 0;
let interval = 0;

btnUp.addEventListener("mousedown", () =>{
    interval = setInterval(() =>{
        places += 1;
        price += 1;
        updateValue();
    }, 100);
});

btnDown.addEventListener("mousedown", () =>{
    interval = setInterval(() =>{
        places -= 1;
        price -= 1;
        updateValue();
    }, 100);
});


document.addEventListener("mouseup", () => clearInterval(interval))



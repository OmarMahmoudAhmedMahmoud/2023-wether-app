let wetherBoxes = [];
let api = `https://api.weatherapi.com/v1/current.json?key=47eba1ef49f24412bc0200435231602&q=`

    //rest-api http :
    //https://api.weatherapi.com/v1/current.json?key=47eba1ef49f24412bc0200435231602&q=


class AddWether {   
    time = 100;
    box = document.querySelector("#box")
    constructor(name, temp, time){
        let div = document.createElement("div");
        div.setAttribute("id",`wetherBox${wetherBoxes.length-1}`)
        div.innerHTML=  `
                            <section>${name}</section>
                            <section>${temp}</section>
                            <section>${time}</section>
                        `;

        box.appendChild(div);
        let ele = document.getElementById(`wetherBox${wetherBoxes.length-1}`)
        setTimeout(
            function () {
                ele.style.opacity="1";
            },
            time
        ) 
    }
}


const input = {
    inputFeld : document.getElementById("inputText"),
    match : document.getElementById("match"),
    addbtn : document.getElementById("addbtn"),

    s : (function(){
            this.match.style="display: none;"
        })(),

    add:function(){
        this.match.style="display: none;";
        if(!countryList.includes(this.inputFeld.value.toUpperCase())){
            console.log("not-found");
            return;
        }
        getWether(api+this.inputFeld.value);
        this.inputFeld.value="";
    },

    check:function(){
        this.match.style.display ="block;";
        if (countryList.includes(this.inputFeld.value.toUpperCase())) {
            this.match.style="color:rgb(43, 226, 55,.7);"
            this.match.textContent="match"
        }else{
            this.match.style="color:rgba(226, 43, 43, 0.7);"
            this.match.textContent="not match"
        }
    },

    render:function(){
        input.inputFeld.addEventListener("input",function () {
            input.check()
        });

        input.inputFeld.addEventListener("blur",function () {
            input.check()
            input.match.style="display: none;"
        });

        this.addbtn.addEventListener("click",function () {
            input.add()
        });
    }
}





async function getWether(area) {
    let data = await fetch(area);
    if (data.status != 200) {
        console.log(data.status);
        alert("error")
        return;
    }
    data = await data.json();
    wetherBoxes.push(
        new AddWether(
            data.location.country,
            data.current.temp_c,
            data.location.localtime.split(" ")[1]
        )
    )

}

function addOptions() {
    for (let i = 0; i < countryList.length; i++) {
        countryList[i]=countryList[i].toUpperCase()
        list.innerHTML+=`
                            <option value="${countryList[i]}">
                                ${countryList[i]}
                            </option>
                        `
    }
}



function render(){
    addOptions() 
    input.render()
}

render()
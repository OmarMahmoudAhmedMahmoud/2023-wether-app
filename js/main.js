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
        this.inputFeld.value = this.inputFeld.value.trim();
        if(!countryList.includes(this.inputFeld.value.toUpperCase())){
            console.log("not-found");
            return;
        }
        getWether(api+this.inputFeld.value);
        this.inputFeld.value="";
    },

    check:function(){
        this.match.style.display ="block;";
        if (countryList.includes(this.inputFeld.value.toUpperCase().trim())) {
            this.match.style="color:rgb(43, 226, 55,.7);"
            this.match.textContent="match"
            return true
        }else{
            this.match.style="color:rgba(226, 43, 43, 0.7);"
            this.match.textContent="not match"
            return false
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

        input.inputFeld.addEventListener("keydown",function (e) {
            if (e.keyCode == 13 ) {
                input.check()
                if (input.check()) {
                    input.add()
                    
                }
                input.match.style="display: none;"
            }
        
        });


        this.addbtn.addEventListener("click",function () {
            input.add()
        });
    }
}





async function getWether(area) {
    loading()
    let data

    try {
        data = await fetch(area);
    } catch (error) {
        
    }   
    loading()
    if (data == undefined) {
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

let loading = (
    function () {
        let box = document.getElementById("loading")
        let ele = document.getElementById("loadingEle")
        let bool = false;
        let deg = 7 ;
        let anime;
        return function() {
            bool?bool=false:bool=true;

            if (bool) {
                box.style.display="grid"
                anime = setInterval(function() {
                    deg+=7;
                    ele.style.transform=`rotate(${deg}deg)`;
                })
            } else {
                box.style.display="none"
                clearInterval(anime)
                deg=0;
            }
        }
    }
)();


function render(){
    addOptions() 
    input.render()
}

document.body.onload=function(){
    render()
};

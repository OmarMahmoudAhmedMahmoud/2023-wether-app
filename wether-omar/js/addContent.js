const box = document.querySelector("#box")

async function getWether(area) {
  let x = await fetch(area);
  if (x.status != 200) {
    console.log(x.status);
    alert("error")
    return;
  }
  x = await x.json();

  box.innerHTML+=
  `
  <div>
    <section>${x.location.country}</section>
    <section>${x.current.temp_c}</section>
    <section>${x.location.localtime.split(" ")[1]}</section>
  </div>
  `


}
let api = `https://api.weatherapi.com/v1/current.json?key=47eba1ef49f24412bc0200435231602&q=`
const list =document.querySelector("#list")
for (let i = 0; i < countryList.length; i++) {
  list.innerHTML+=`
  <option value="${countryList[i]}">${countryList[i]}</option>
  `
  countryList[i]=countryList[i].toUpperCase()
 

  
}
const input = document.querySelector("#inputText");
const match = document.querySelector("#match")
match.style="display: none;";

function check() {
  match.style.display ="block;";
  if (countryList.includes(input.value.toUpperCase())) {

    match.style="color:rgb(43, 226, 55,.7);"
    match.textContent="match"
  }else{
    match.style="color:rgba(226, 43, 43, 0.7);"
    match.textContent="not match"
  }
  
}








function add(){
 match.style="display: none;";
 if(!countryList.includes(input.value.toUpperCase())){
  console.log("not-found");
  alert("not-found")
  return 0 ;
 }

  getWether(api+input.value);
  input.value="";


}



import coun from './db/coun.json' assert { type: 'json' };

 function addd(){
let boxCoun = document.getElementById("input");
for(i=0;i<Object.keys(coun).length;i++){

boxCoun.innerHTML+=`
 <option value="${coun[i].name}">
   ${coun[i].name}
 </option>`
 ;

}


}

window.onload=function(){
addd();
}

//"use strict"
let lowerDisplay = document.querySelector(".exp");
let upperDisplay = document.querySelector(".result");
let expression = "";
let toScreen =  "";

 document.querySelectorAll(".digits").forEach((digit)=>{
 	digit.addEventListener("click",()=>{
 		expression += digit.dataset.number;
 		toScreen += digit.dataset.number;
     lowerDisplay.textContent = toScreen;
     
 	})
 })

document.querySelectorAll(".operators").forEach(_operator=>{
	_operator.addEventListener("click",()=>{
		if(_operator.dataset.operator !== undefined){
			let array = Array.from(_operator.dataset.operator);
		      array.pop();
		       let checkMultiple = array.join("")
			if(expression[expression.length-1]!== _operator.dataset.operator && expression[expression.length-1] !== checkMultiple){
		      
			expression += _operator.dataset.operator;
		toScreen += _operator.dataset.operate;
			}
			lowerDisplay.textContent = toScreen;
		}
	})
})
//The trigonometric functions and constants
let π= Math.PI;
function sin(num){
	return Math.sin(num);
}
function cos(num){
	return Math.cos(num);
}
function tan(num){
	let a; let b;
	if(num %(Math.PI/2) == 0){
	 a= Math.round(Math.sin(num));
	 b = Math.round(Math.cos(num));
	console.log(`a:${a},b:${b}`)
	return (a/b);
	}
	return Math.tan(num);
}


document.querySelector(".cancel").addEventListener("click",()=>{
	expression = "";
	result="";
	toScreen = ""
	lowerDisplay.textContent =toScreen;
	upperDisplay.textContent=toScreen;
});
document.querySelector(".delete").addEventListener("click",()=>{
	 let popped;
	 let pruneArray = Array.from(expression);
	 let truncatedArray = Array.from(toScreen);
     if(pruneArray[pruneArray.length-1]=="(" &&( pruneArray[pruneArray.length-2] == "s" || pruneArray[pruneArray.length-2] == "n")){
     	 pruneArray.splice(-4,4);
     	 truncatedArray.splice(-4,4);
     }else {
     	popped =  pruneArray.pop();
	 truncatedArray.pop();
     }
	  if(popped == "*"){
	  	if(pruneArray[pruneArray.length - 1]=="*" ){
	  		pruneArray.pop();
	  	};
	  }
   expression  = pruneArray.join("")
	 toScreen = truncatedArray.join("");
	lowerDisplay.textContent = toScreen;
})
 
 

 
document.querySelector(".equal").addEventListener("click",()=>{
	let value = eval(expression);
	if(parseInt(value) !== value){
		 value = +value.toFixed(10);
	}
	
	upperDisplay.textContent =/*`${toScreen} =   */`${value}`;
	expression = value;
	toScreen = value;
	lowerDisplay.textContent="";
})

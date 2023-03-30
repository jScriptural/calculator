//"use strict"
if(!String.prototype.at){
	Object.defineProperty(String.prototype,"at",{
		value(i){
			let len = this.length;
			return i < 0? this[len+i]:this[len];
	},
		enumerable: false,
		writable: true,
		configurable: true
	});
	Object.defineProperty(Array.prototype,"at",{
		value(i){
			let len = this.length;
			return i < 0? this[len+i]:this[len]
		},
		enumerable:false,
		writable:true,
		configurable: true
	});
}
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
			if(expression.at(-1) !== _operator.dataset.operator && expression.at(-1) !== checkMultiple){
			expression += _operator.dataset.operator;
		toScreen += _operator.dataset.operate;
			}else if(expression.at(-1) == "(" || expression.at(-1) == ')'){
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
document.querySelector(".delete").addEventListener("click",(evt)=>{
	 evt.preventDefault();
	 let popped;
	 let pruneArray = Array.from(expression);
	 let truncatedArray = Array.from(toScreen);
     if(pruneArray.at(-1) =="(" &&( pruneArray.at(-2) == "s" || pruneArray.at(-2) == "n")){
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
	//let value = eval(expression);
	let f = new Function(`return ${expression}`);
	let value = f();
	if(parseInt(value) !== value){
		 value = +value.toFixed(10);
	}
	
	upperDisplay.textContent =/*`${toScreen} =   */`${value}`;
	expression = value.toString();
	toScreen = value.toString();
	lowerDisplay.textContent="";
})

function focus(){
	let prevElem;
	document.addEventListener("click",evt=>{
		let currentElem = evt.target;
		//console.log(currentElem.classList)
		//if(!currentElem.classList.contains("digits"))return;
		highlight(currentElem)
		let timer = setTimeout(()=>{
			if(currentElem.classList.contains("highlight-for-digits")){
				currentElem.classList.remove("highlight-for-digits")
				
			}else {
				currentElem.classList.remove("highlight-for-operators")
			}
		},400)
	})
	function highlight(elem){
		if(prevElem){
			prevElem.classList.contains("highlight-for-digits")?prevElem.classList.remove("highlight-for-digits"):prevElem.classList.remove("highlight-for-operators");
		}
		if(elem.classList.contains("digits")){
			elem.classList.add("highlight-for-digits");
			prevElem = elem;
		}else if(elem.classList.contains("operators")) {
			prevElem = elem;
			elem.classList.add("highlight-for-operators")
		}
	}
}
focus();
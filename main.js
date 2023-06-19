//"use strict"

const menuBtn = document.querySelector(".material-icons");

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
		},100)
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







function menu(){
	let menuPage = document.createElement("div");
	menuPage.className="menu-page";
	const aboutPage = document.createElement("div");
	const navBar = document.querySelector("nav");
	aboutPage.classList.add("about");
	aboutPage.innerHTML = `
	<figure>
	<img src="assets/jscriptural.jpg" width="40%" alt="image of jscriptural">
	<figcaption>Jscriptural</figcaption>
	</figure>
	<div class="biography">
	<p>
John Sunday(<b>Jscriptural</b>) is a passionate <b>FrontEnd Developer</b> with comprehensive understanding of modern web development principles and practices. He focuses on creating <b>dynamic and visually appealing user interfaces</b>.
	</p>
	</div>
	<footer>
	<h1>Let's Connect</h1>
	<div>
	<ul>
				<li><a href="https://github.com/jScriptural" target="_blank" title="connect on github"><i class="fa fa-github-square fa-fw"></i></a></li>
				<li><a href="https://www.facebook.com/de-mathematical" target="_blank" title="connect on facebook"><i class="fa fa-facebook-square fa-fw"></i></a></li>
				<li><a href="https://www.twitter.com/kelmathic" target="_blank" title="connect on twitter"><i class="fa fa-twitter-square fa-fw"></i></a></li>
			</ul>
	</div>
	`;
menuPage.insertAdjacentHTML("afterbegin",`<div class="menuItem">&#10146; About Developer</div>`);
	menuBtn.addEventListener("click",evt=>{
		if(menuBtn.textContent == "menu"){
			navBar.after(menuPage);
			menuBtn.textContent = `cancel`;
			menuBtn.style.color = "red";
		}else {
			menuPage.style.height= "";
			setTimeout(()=>menuPage.remove(),101);
			if(menuPage.querySelector(".about"))menuItem.dispatchEvent(new MouseEvent("click"));
			menuBtn.textContent = 'menu';
			menuBtn.style.color = "";
		}

	});

	let menuItem = menuPage.querySelector(".menuItem");
	menuItem.addEventListener("click",evt=>{ 

		if(menuPage.querySelector(".about")){
			setTimeout(()=>aboutPage.remove(),150);
			menuPage.style.height="";
		}else {
			menuItem.after(aboutPage);
		let aboutHeight = aboutPage.offsetHeight;
		let height = aboutHeight + menuPage.offsetHeight;
		console.log(height);
			menuPage.style.height = height +150+"px";
				}
	});
	/*
menuPage.ontransitionend = event =>{
	console.log(event);
	if(menuPage.querySelector(".about")){
		aboutPage.remove();
		return;
	}
//	menuItem.after(aboutPage)
}
*/
}
menu();


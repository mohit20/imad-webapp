console.log('Loaded!');

/*//Change text of an element

var button = document.getElementById('counter');
button.onclick = function(){
	//Create a request to the endpoint
	var request = new XMLHttpRequest();
	//Capture the respo nseand store it in a variable
	request.onreadystatechange = function(){
		if(request.readyState = XMLHttpRequest.DONE){
			if(request.status === 200){
				var counter = request.responseText;
				//counter = counter + 1;
				var span = document.getElementById('count');
				//Render thr variable in the correct span
				span.innerHTML = counter.toString();
			}
		}
	}
	//Make the request
	request.open('GET', 'http://127.0.0.1/counter', true);
	request.send(null);
};

*/

var submit = document.getElementById("submit_btn");
submit.onclick = function(){
	//Make a request to the server and send the name
	//Capture a list of names and render it as a list

	var request = new XMLHttpRequest();
	//Capture the respo nseand store it in a variable
	request.onreadystatechange = function(){
		if(request.readyState === XMLHttpRequest.DONE){
			if(request.status === 200){
				alert('user logged in succesfully');
			} else if(request.status === 403){
				//console.log('Username/Password is incorrect');
				alert('Username/Password is incorrect');
			}
			else if(request.status === 500){
				alert('Internal Server error');
			}
		}
	};
	var username = document.getElementById("username").value;
	var password = document.getElementById("password").value;
	console.log(username);
	console.log(password);
	request.open('POST', 'http://127.0.0.1:8080/login', true);
	request.setRequestHeader('Content-Type', 'application/json');
	request.send(JSON.stringify({"username":username,"password":password}));	
};




/*//Submit name

var submit = document.getElementById("submit_btn");
submit.onclick = function(){
	//Make a request to the server and send the name
	//Capture a list of names and render it as a list

	var request = new XMLHttpRequest();
	//Capture the respo nseand store it in a variable
	request.onreadystatechange = function(){
		if(request.readyState === XMLHttpRequest.DONE){
			if(request.status === 200){
				var names = request.responseText;
				names = JSON.parse(names);
				var list = "";
				for(var i=0;i<names.length;i++){
					list += '<li>' + names[i] + '</li>';
				}
				var ul = document.getElementById("namelist");
				ul.innerHTML = list;
			}
		}
	}
	var nameInput = document.getElementById("name");
	var name = nameInput.value;
	request.open('GET', 'http://127.0.0.1/submit-name?name=' + name, true);
	request.send(null);	
};

*/



//move the image
/*var img = document.getElementById("madi");

img.onclick = function(){
	var interval = setInterval(moveRight, 50);
}

var marginLeft=0;
function moveRight()
{
	marginLeft = marginLeft + 5;
	img.style.marginLeft = marginLeft + "px";
}*/


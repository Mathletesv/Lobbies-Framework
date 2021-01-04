const room = document.getElementById("room");
let name = "";
let roomtemplate = `<div id=[roomid] class="room">
						<span class="roomname">[game name]</span>
						<button class="roomjoin>Join Room</button>
					</div>`
let roompasstemplate = `<div id=[roomid] class="room">
							<span class="roomname">[game name]</span>
							<input type="text" id=roomid + "pass" class="roompass" placeholder="Enter pass...">
							<button class="roomjoin>Join Room</button>
						</div>`

console.log(localStorage["name"]);
if (localStorage["name"] in [undefined, "undefined", "null"]) {
	name = prompt("What would you like to be your username?");
	while (name == null) {
		name = prompt("Please enter a username.");
	}
	localStorage["name"] = name;
}
else {
	name = localStorage["name"];
}
document.getElementById("hello").textContent = "Hello, " + name + "!";

document.getElementById("namechange").onclick = function () {
	name = prompt("What would you like to be your username?");
	while (name == null) {
		name = prompt("Please enter a username.");
	}
	localStorage["name"] = name;
	document.getElementById("hello").textContent = "Hello, " + name + "!";
}

function draw(x, y, name, id, msg) {

}
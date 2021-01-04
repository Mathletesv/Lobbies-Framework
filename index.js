const app = require('http').createServer(response);
const fs = require('fs');
const io = require('socket.io')(app);
const { v4: uuidv4 } = require('uuid');
let rooms = {};

app.listen(8000);

function response(req, res) {
	let file = "";
	if (req.url == "/") {
		file = __dirname + '/client/index.html';
	} else {
		file = __dirname + req.url;
	}
	fs.readFile(file, function(err, data) {
		if (err) {
			res.writeHead(500);
			return res.end('Failed to load this file');
		}
		res.writeHead(200);
		res.end(data);
	})
};

io.on("connection", function(socket) {
	socket.on("joinRoom", function(room, password, setplayer, wrongpass) {
		if (!(room in rooms)) {
			return;
		}
		if (password != rooms[room]["data"]["password"]) {
			wrongpass();
			return;
		}
		id = uuidv4();
		rooms[room][id] = [250, 250];
		setplayer(room, id);
	});
	
	socket.on("tick", function(room, id, callback) {
		if (!(room in rooms)) return;
	});

	socket.on("msg", function(room, id, msg) {
		if (!(room in rooms)) return;
	});

	socket.on("createRoom", function(name, password, max, callback, setplayer) {
		roomid = uuidv4();
		id = uuidv4();
		data = {"id": roomid, "name": name, "password": password}
		rooms[roomid] = {id: [250, 250], "data": data};
		socket.join(roomid);
		io.to(roomid).emit('playerJoined');
		io.sockets.emit("roomCreated", data);
		callback(rooms[roomid]);
		setplayer(roomid, id);
	})
})
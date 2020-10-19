const WebSocket = require('ws');
const wss = new WebSocket.Server({port:7891});

wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(data) {
        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
              client.send(data);
            }
        });
    });

    ws.send('你好！欢迎登录聊天系统')
});



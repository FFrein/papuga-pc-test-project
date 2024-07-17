const cookieParser = require('cookie-parser');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const fs = require('fs');
// Загрузите ваш закрытый ключ и сертификат
const privateKey = fs.readFileSync('./src/https/RS.key', 'utf8').toString();
const certificate = fs.readFileSync('./src/https/RS.crt', 'utf8').toString();
const credentials = { key: privateKey, cert: certificate, passphrase: "PAPUGAPC" };

//webSocket
const http = require('https');
const WebSocket = require('ws');

const routerPublic = require('./src/routes/publicRoutes');
const routerAuth = require('./src/routes/authRoutes');
const errorMiddleware = require('./src/middlewares/error-middleware');
const authMiddleware = require('./src/middlewares/auth-middlewate')
const roleMiddleware = require('./src/middlewares/role-middleware')
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3002;
const app = express();
//webSocket
const server = http.createServer(credentials, app);
const wss = new WebSocket.Server({ server });

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}));

app.use('/api', routerPublic);
app.use(authMiddleware);
app.use(roleMiddleware);
app.use('/api', routerAuth);
// Middleware для обработки ошибок (должен быть последним)
app.use(errorMiddleware);

// Обработка 404 ошибки
app.use('*', (req, res) => {
    res.status(404).send('NOT FOUND');
});

//Данные для веб сокета
const jsonData = require('./testData/HELP_Chat.json');
const json_service = require('./src/service/json-servce');
// WebSocket сервер
wss.on('connection', (ws) => {
    console.log('WebSocket client connected');

    ws.on('message', (message) => {
        //console.log(`Received message: ${message}`);

        try {
            const data = JSON.parse(message);
            let response = {};

            if (data.type === 'supportRequest') {
                switch(data.message){
                    case "Компьютер":
                        response = {message: jsonData["Компьютер"]}
                        break;
                    case "Видеокарта":
                        response = {message: jsonData["Видеокарта"]}
                        break;
                    case "Процессор":
                        response = {message: jsonData["Процессор"]}
                        break; 
                    case "Оперативная память":
                        response = {message: jsonData["Оперативная память"]}
                        break;
                    case "Материнская плата":
                        response = {message: jsonData["Материнская плата"]}
                        break;
                    case "/Help":
                        response = {message: jsonData["/Help"]}
                        break;
                    default:
                        response = {message: "Неизвестная комманда"}
                }
                ws.send(JSON.stringify(response));
            }
            if (data.type === '/bug') {
                json_service.appendToJsonFile('./testData/ChatBugMessage.json', data.message);
                response = {message: "Спасибо за помощь"}
                ws.send(JSON.stringify(response));
            }
        } catch (error) {
            console.error('Error parsing message:', error);
        }
    });

    ws.on('close', () => {
        console.log('WebSocket client disconnected');
    });
});

const start = async () => {
    try {
        await mongoose.connect(process.env.MDB_CONNECT_URL);
        console.log('Connected to MongoDB');

        server.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
        });
    } catch (e) {
        console.error('Failed to start server:', e.message);
    }
};

start();

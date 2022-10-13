import express  from "express";
import http from 'http'
import router from "./routes/routes.js";

const app = express();
const server = http.createServer(app);

app.use(express.static('public'))


app.use('/', router)


server.listen(3000, () => {
    console.log(`> Server  listening on port: 3000`)
})


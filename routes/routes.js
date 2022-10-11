import express  from "express";
import {globoServe} from "../services/globoServe.js"
import { cnnServe } from "../services/cnnServe.js";

const router = express.Router();
 router.get('/search/:s',async (req, res, next) => { 
    const newsCnn = await cnnServe(req)
    const newsGlobo = await globoServe(req)
    const newsPack = {cnn:newsCnn, globo:newsGlobo}
    res.send(newsPack)
})



export default router;
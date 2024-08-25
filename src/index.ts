import express from "express"
import { requestCount } from "./monitoring/requestcount";
import client from "prom-client";
const app = express();
app.use(requestCount);
//@ts-ignore
function middleware(req,res,next){
    const startTime = Date.now();
    next();
    const endTime = Date.now();
    console.log('it took ',endTime-startTime,'ms')
}
app.use(middleware);
app.get("/user",(req,res)=>{
    let user ={
        name: "abres",
        age:239
    }
    res.json({
        name:"abres"
    })
})
app.post("/user",(req,res)=>{
    res.json({
        name:"abres"
    })
})
app.get("/metrics", async (req, res) => {
    const metrics = await client.register.metrics();
    res.set('Content-Type', client.register.contentType);
    res.end(metrics);
})
app.listen(3000)
import client from "prom-client";
const httpRequestdurationmicrosecond = new client.Histogram({
    name:"http_request_duraiton_ms",
    help:"duration of http reques in ms",
    labelNames:["method","route","code"],
    buckets:[0.1,5,15,50,100,300,500,1000,3000,5000]
});
// @ts-ignore
export function requestCount (req,res,next){
    const startTime= Date.now();
    res.on("finish",()=>{
        const endTime =Date.now();
        httpRequestdurationmicrosecond.observe({
            method:req.method,
            route:req.route ? req.route.path :  req.path,
            code : res.statusCode
        }, endTime-startTime);
    })
    next();
}
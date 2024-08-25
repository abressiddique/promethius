"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const requestcount_1 = require("./monitoring/requestcount");
const prom_client_1 = __importDefault(require("prom-client"));
const app = (0, express_1.default)();
app.use(requestcount_1.requestCount);
//@ts-ignore
function middleware(req, res, next) {
    const startTime = Date.now();
    next();
    const endTime = Date.now();
    console.log('it took ', endTime - startTime, 'ms');
}
app.use(middleware);
app.get("/user", (req, res) => {
    let user = {
        name: "abres",
        age: 239
    };
    res.json({
        name: "abres"
    });
});
app.post("/user", (req, res) => {
    res.json({
        name: "abres"
    });
});
app.get("/metrics", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const metrics = yield prom_client_1.default.register.metrics();
    res.set('Content-Type', prom_client_1.default.register.contentType);
    res.end(metrics);
}));
app.listen(3000);

import express, {Application,Request,Response,NextFunction} from 'express';
import {TCPServer} from './Server/TCPServer';
import {HttpRouter} from './Server/HttpRouter';

/*Ports*/
const tcpServerPort:number=9000;
const httpServerPort:number=9001;
/*Http*/
const httpServer:Application = express();
const httpRouter:HttpRouter = new HttpRouter();

//httpServer.get('/',httpRouter.login);
httpServer.get('/login',httpRouter.login);

httpServer.listen(httpServerPort,()=>{ console.log("Http Server Started on port:%s",httpServerPort); });

/*Sockets*/
const server:TCPServer = new TCPServer(tcpServerPort);
server.Start();
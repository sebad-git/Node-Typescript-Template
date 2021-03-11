import { strict } from 'assert';
import { TIMEOUT } from 'dns';
import net,{Socket,Server} from 'net';
import { TCPMessage } from './TCPMessage';

export class TCPServer {

    server: Server; port:number; timeout:number; 

    constructor(port:number) {
        this.server = net.createServer(); 
        this.timeout = 5 * 60 * 1000;
        this.port = port;
    }

    Start() {
        this.server.on("connection",(connection:Socket)=>{
            connection.setTimeout(this.timeout);
            //socket.write( new TCPMessage(TCPMessage.CONNECTED,"").ToJson());
            console.log("Client connected at %s",connection.remoteAddress);

            connection.on("error",(err:Error)=>{
                connection.write("Error:"+err.message);
                console.log("Server Error: %s",err.message);
            });

            connection.on('timeout',()=> { console.log('socket timeout'); connection.end(); });

            
            connection.once("close",()=>{
                console.log("Connection Closed at: %s.",connection.remoteAddress);
            });
    
            connection.on("data",(data:any)=>{
                console.log("[Recieved]: %s",data);
            });

        });
        
        this.server.listen(this.port,()=>{ console.log("TCP Server Started on port:%s",this.port); });
    }
    
  }

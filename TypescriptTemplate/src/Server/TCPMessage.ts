import { json } from "express";

export class TCPMessage {
    
public static CONNECTED:number = 0;
public static DISCONNECTED:number = 1;
public static DATA:number = 2;

type: number; message:string;

constructor(type: number, message: string) { this.type = type; this.message = message; }

 ToJson():string { return JSON.stringify(this); }

}

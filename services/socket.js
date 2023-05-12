import { io } from "socket.io-client";
const socket = io.connect("http://192.168.1.110:3005");
export default socket;

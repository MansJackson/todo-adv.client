import { Socket } from 'socket.io-client';

export default (socket: Socket, cb: (data: any) => void) => (
  socket.on('notification', (message: string): void => {
    console.log(message);
  })
);

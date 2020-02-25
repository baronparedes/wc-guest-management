import * as http from 'http';
import app from './app';

const PORT = 3001;
const server = http.createServer(app);
server.listen(PORT);
server.on('listening', () => {
    console.log(`Server started on port ${PORT}`);
});

import express from 'express';
// import config from './config/config';

class App {
    public app: express.Application;

    constructor() {
        this.app = express();
    }

    public listen(): void {
        this.app.listen(3000, () => {
            console.log('App Listening on localhost 3000');
        })
    }
}

export default App;
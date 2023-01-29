import express from 'express';
import config from './config/config';

class App {
    public app: express.Application;
    private port: string | number;

    constructor() {
        this.app = express();
        this.port = config.PORT;
    }

    public listen(): void {
        this.app.listen(this.port, () => {
            console.log(`App is listening on the PORT: ${this.port}`);
        })
    }
}

export default App;
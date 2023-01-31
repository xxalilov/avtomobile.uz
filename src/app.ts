import express, { json } from 'express';
import config from './config/config';

class App {
    public app: express.Application;
    private port: string | number;

    constructor() {
        this.app = express();
        this.port = config.PORT;
        this.initializeMiddleware();
    }

    private initializeMiddleware(): void {
        this.app.use(json());
    }

    public listen(): void {
        this.app.listen(this.port, () => {
            console.log(`App is listening on the PORT: ${this.port}`);
        })
    }
}

export default App;
import express, { json } from 'express';
import cookieParser from 'cookie-parser';
import './controllers/auth.controller';
import { router as controllerRouter } from './decorators/controller.decorator'
import config from './config/config';

class App {
    public app: express.Application;
    private port: string | number;

    constructor() {
        this.app = express();
        this.port = config.PORT;
        this.initializeMiddleware();
        this.initializeRoutes();
    }

    private initializeMiddleware(): void {
        this.app.use(json());
        this.app.use(cookieParser());
    }

    private initializeRoutes(): void {
        this.app.use(controllerRouter)
    }

    public listen(): void {
        this.app.listen(this.port, () => {
            console.log(`App is listening on the PORT: ${this.port}`);
        })
    }
}

export default App;
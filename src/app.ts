import express, { json } from 'express';
import cookieParser from 'cookie-parser';
import config from './config/config';
import errorMiddleware from './middlewares/error-handler.middleware';
import { HttpException } from './exeptions/HttpException'
import database from './utils/database';

import { AppRouter } from './routes/app.router';
import './routes/index';

class App {
    public app: express.Application;
    private port: string | number;

    constructor() {
        this.app = express();
        this.port = config.PORT;
        this.initializeMiddleware();
        this.connectDatabase();
        this.initializeRoutes();
        this.initializeErrorHandler();
    }

    private initializeMiddleware(): void {
        this.app.use(json());
        this.app.use(cookieParser());
        this.app.use(errorMiddleware)
    }

    private connectDatabase(): void {
        database();
    }

    private initializeRoutes(): void {
        this.app.use('/api/v1', AppRouter.getInstance());
        this.app.all('*', () => {
            throw new HttpException(400, "Route Not Found")
        })
    }

    private initializeErrorHandler(): void {
        this.app.use(errorMiddleware)
    }

    public listen(): void {
        this.app.listen(this.port, () => {
            console.log("================================================")
            console.log(`🚀 App is listening on the PORT: ${this.port}`);
            console.log("================================================")
        })
    }
}

export default App;
import express, { json } from 'express';
import cookieParser from 'cookie-parser';
import config from './config/config';
import { errorHandler } from './middlewares/error-handler.middleware';
import { NotFoundError } from './errors/not-found.error';
import { asyncHandler } from './middlewares/async.middleware';

import { AppRouter } from './routes/app.router';
import './controllers/auth.controller';

class App {
    public app: express.Application;
    private port: string | number;

    constructor() {
        this.app = express();
        this.port = config.PORT;
        this.initializeMiddleware();
        this.initializeRoutes();
        this.initializeErrorHandler();
    }

    private initializeMiddleware(): void {
        this.app.use(json());
        this.app.use(cookieParser());
    }

    private initializeRoutes(): void {
        this.app.use('/api/v1', AppRouter.getInstance());
        this.app.all('*', asyncHandler(async () => {
            throw new NotFoundError("Route Not Found.")
        }))
    }

    private initializeErrorHandler(): void {
        this.app.use(errorHandler)
    }

    public listen(): void {
        this.app.listen(this.port, () => {
            console.log(`App is listening on the PORT: ${this.port}`);
        })
    }
}

export default App;
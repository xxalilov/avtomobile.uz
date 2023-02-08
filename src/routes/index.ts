import express from "express";
import AuthRoutes from "./auth.route";

class IndexRouter {
    public app: express.Application;
    constructor () {
        this.app = express();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.app.use('/auth', (new AuthRoutes()).router)
    }

}

export default IndexRouter;
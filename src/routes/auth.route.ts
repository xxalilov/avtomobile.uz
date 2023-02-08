import Route from "./route";
import AuthController from "../controllers/auth.controller";

class AuthRoutes extends Route {
    private authController: AuthController;
    constructor() {
        super();
        this.authController = new AuthController();
        this.initializeRoutes();
    }
    public initializeRoutes(): void {
        this.router.post('/signup', this.authController.signup)
    }
}

export default AuthRoutes;
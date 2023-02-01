import { Request, Response } from "express";
import { get } from "../decorators/routes.decorator";
import { controller } from "../decorators/controller.decorator";

@controller('/auth')
class Auth {
    @get('/signup')
    private signup(req: Request, res: Response): void {
        res.send('Hello')
    }
}

// export default Auth;
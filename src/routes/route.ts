import { Router } from 'express';
import { Routes } from '../interfaces/routes.interface';

 class Route implements Routes {
    public router: Router;
    constructor() {
        this.router = Router()
    }
}

export default Route;
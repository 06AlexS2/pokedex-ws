import express, { Express, Router } from 'express';

class ExpressRouter {
    private router: Router;

    constructor() {
        this.router = express.Router();
    }

    public getRouter(): Router {
        return this.router;
    }

    public useMiddleware(middleware: any): void {
        this.router.use(middleware);
    }

    public get(path: string, handler: any): void {
        this.router.get(path, handler);
    }

    public post(path: string, handler: any): void {
        this.router.post(path, handler);
    }

    // Agrega otros métodos HTTP según sea necesario

    public mountSubRouter(path: string, subRouter: Router): void {
        this.router.use(path, subRouter);
    }
}

export default ExpressRouter;
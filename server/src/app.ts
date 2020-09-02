import cors from 'cors';
import express, { json, urlencoded } from 'express';
import { connectLogger } from 'log4js';
import { ROUTES } from './routes';
import logService from "./services/log.service";

const PORT = 8000;

interface App {
    run(): Promise<void>;
}

class AppClass implements App {
    logger = logService.getLogger();

    handleError(err: Error, _1: any, _2: any, next: (err: Error) => void) {
        this.logger.error(JSON.stringify(err, undefined, 2));
        next(err);
    }

    async run() {
        this.logger.info(`Starting Server on ${PORT}`);

        const app = express()
            .use(connectLogger(this.logger, { level: 'auto' }))
            .use(cors())
            .use(json())
            .use(urlencoded({ extended: true }));

        for (let route of ROUTES) {
            app.use(route.path, route.router);
        }

        app.use(this.handleError.bind(this));

        app.listen(PORT);

        this.logger.info(`Listening on ${PORT}`);
    }
}

export default <App>new AppClass();
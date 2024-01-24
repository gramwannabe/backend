import path from 'path';
import { appHost, appPort, appEnv } from './configs/common.config.js';
import { fileURLToPath } from 'url';

import Server from 'fastify';
const app = new Server({ logger: appEnv === 'development' ? true : false });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// register cors plugin
import cors from '@fastify/cors';
app.register(cors);
// TODO list url & method yg di allow

// autoload all custom plugins
import autoLoad from '@fastify/autoload';
app.register(autoLoad, {
    dir: path.join(__dirname, 'plugins')
});

// autoload all routes
app.register(autoLoad, {
    dir: path.join(__dirname, 'routes')
});

app.listen({ host: appHost, port: appPort }, (err, _) => {
    if (err) {
        console.error(err);
    }
});
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({path: path.resolve(__dirname, "../config/config.env")});

interface ENV {
    NODE_ENV: string | undefined;
    PORT: string | undefined;
}

interface Config {
    NODE_ENV: string;
    PORT: string;
}

const getConfig = (): ENV => {
    return {
        NODE_ENV: process.env.NODE_ENV,
        PORT: process.env.PORT
    }
}

const getSanitzedConfig = (config: ENV): Config => {
    for (const [key, value] of Object.entries(config)) {
        if (value === undefined) {
            throw new Error(`Missing key ${key} in config.env`);
        }
    }
    return config as Config;
};

const config = getConfig();

const sanitizedConfig = getSanitzedConfig(config);

const PORT = 3000;

export { PORT };

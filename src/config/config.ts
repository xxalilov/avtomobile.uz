import path from 'path';
import dotenv from 'dotenv';

dotenv.config({path: path.resolve(__dirname, "../config/config.env")});

interface ENV {
    NODE_ENV: string | undefined;
    PORT: string | undefined;
    DB_USER: string | undefined;
    DB_DATABASE: string | undefined;
    DB_PASSWORD: string | undefined;
    DB_PORT: string | undefined;
    DB_HOST: string | undefined;
}

interface ConfigInterface {
    NODE_ENV: string;
    PORT: string;
    DB_USER: string;
    DB_DATABASE: string;
    DB_PASSWORD: string;
    DB_PORT: string;
    DB_HOST: string;
}

class Config {
    private getConfig (): ENV {
        return {
            NODE_ENV: process.env.NODE_ENV,
            PORT: process.env.PORT,
            DB_USER: process.env.DB_USER,
            DB_DATABASE: process.env.DB_DATABASE,
            DB_PASSWORD: process.env.DB_PASSWORD,
            DB_PORT: process.env.DB_PORT,
            DB_HOST: process.env.DB_HOST,
        }
    }

    private getSanitzedConfig(config: ENV): ConfigInterface {
        for (const [key, value] of Object.entries(config)) {
            if (value === undefined) {
                throw new Error(`Missing key ${key} in config.env`);
            }
        }

        return config as ConfigInterface;
    }

    public sanitizedConfig(): ConfigInterface {
        return this.getSanitzedConfig(this.getConfig());
    }
}

const config = new Config();

export default config.sanitizedConfig();
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({path: path.resolve(__dirname, "../config/config.env")});

interface ENV {
    NODE_ENV: string | undefined;
    PORT: string | undefined;
}

interface ConfigInterface {
    NODE_ENV: string;
    PORT: string;
}

class Config {
    private getConfig (): ENV {
        return {
            NODE_ENV: process.env.NODE_ENV,
            PORT: process.env.PORT
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
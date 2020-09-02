import { getLogger, Logger } from 'log4js';
import { basename, dirname, extname } from 'path';
import { get } from 'stack-trace';

interface LogService {
    getLogger(category?: string): Logger;
}

class LogServiceClass implements LogService {
    getLogger(category?: string) {
        if (!category) {
            const callingFileName = get()[1].getFileName();
            category = `${basename(dirname(callingFileName))}:${basename(callingFileName, extname(callingFileName)).replace(/\./g, '_')}`;
        }
        const logger = getLogger(category);
        logger.level = process.env.LOG_LEVEL || 'DEBUG';
        return logger;
    }
}

export default <LogService>new LogServiceClass();
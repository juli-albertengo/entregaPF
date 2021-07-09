import log4js from 'log4js';

log4js.configure({
    appenders: {
      consoleLoggerConfig: {type: "console"},
      fileErrorLoggerConfig: {type: 'file', filename: 'error.log'},
      fileEtherealInfoLoggerConfig: {type: 'file', filename: 'ethereal.log'}
    },
    categories: {
      default: {appenders: ["consoleLoggerConfig"], level: "trace"},
      consoleLogger: { appenders: ["consoleLoggerConfig"], level: "debug"},
      fileLogger: { appenders: ["fileErrorLoggerConfig"], level: "error"},
      etherealLogger: { appenders: ["fileEtherealInfoLoggerConfig"], level: "trace"}
    }
});

class consoleLoggerDebug {
    public logger: any;
    public instance: number;

    constructor(){
        this.logger = null;
        this.instance = 0;
    }

    static generateLogger(){
        return log4js.getLogger('consoleLogger');
    }

    GetLogger(){
        this.instance++;

        if(this.logger !=null){
            return this.logger
        } else {
            this.logger = consoleLoggerDebug.generateLogger();
            return this.logger
        }
    }
}

class fileLoggerError {
    public logger: any;
    public instance: number;

    constructor(){
        this.logger = null;
        this.instance = 0;
    }

    static generateLogger(){
        return log4js.getLogger('fileLogger');
    }

    GetLogger(){
        this.instance++;

        if(this.logger !=null){
            return this.logger
        } else {
            this.logger = fileLoggerError.generateLogger();
            return this.logger
        }
    }
}

class etherealInfoLogger {
    public logger: any;
    public instance: number;

    constructor(){
        this.logger = null;
        this.instance = 0;
    }

    static generateLogger(){
        return log4js.getLogger('etherealLogger');
    }

    GetLogger(){
        this.instance++;

        if(this.logger !=null){
            return this.logger
        } else {
            this.logger = etherealInfoLogger.generateLogger();
            return this.logger
        }
    }
}

export const loggerConsole = new consoleLoggerDebug();
export const loggerFile = new fileLoggerError();
export const loggerEthereal = new etherealInfoLogger();

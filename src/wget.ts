import { exec } from "child_process";
import path from "path";
import { Parser } from "./parser";

export class Wget {
    private _command = path.join(__dirname, '..', 'bin', 'wget') ;
    private _params: Record<string, string | number> = {};
    private _flags: string[] = [];
    private _url: string = '';


    public constructor(url: string, options?: any) {
        this._url = url
        if(options) {

        }
    }

    url(url: string) { this._url = url; return this; }
  
    addParam(flag: string, value: string | number): Wget {
        this._params[flag] = value;
        return this;
    }

    addFlag(flag: string): Wget {
        this._flags.push(flag);
        return this;
    }

    
    
    continue = (flag: string) => this.addFlag(flag);
    tries = (num: number) => this.addParam('--tries', num);
    user =  (user: string = '') => this.addParam('--user', `"${user}"`);
    password =  (password: string = '') => this.addParam('--password', `"${password}"`);
    output =  (outputPath: string = '') => {
        const fileName = path.basename(this._url);
        const output = path.join(outputPath, fileName);
        return this.addParam('--output-document', `"${output}"`);
    }
 
    async execute(cb: any) {
        return new Promise((res, rej) => {
            const command = this.createCommand()
            console.log('command: ', command);
            const proc = exec(command, (err, stdout, stderr) => {
                if(err) {
                    rej(err)
                } 
                res(true);
            });
            new Parser(proc.stderr).addListener('progress', m => cb(m))
        })
    }

    private createCommand(): string {
        const flags = this._flags.join(' ');
        const params = Object.keys(this._params).reduce((acc,c) => acc + c + ' ' + this._params[c] + ' ' , '');
        return [this._command, flags , params, this._url].join(' ');

    }

}


export const wget = (url: string, options?: any) => new Wget(url, options)

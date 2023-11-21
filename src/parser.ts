import EventEmitter from "events";



const expressions = {
    connected: /HTTP request sent, awaiting response/,
    savingTo: /Saving to: '(.*)'/,
    skipping: /\[ skipping (\d*K) \]/,
    progres: /(\d*%) (\d.?\d{0,2}[M|G]) (\dh?\d*[m|s|h]\d*s)/
}

export class Parser extends EventEmitter {

    constructor(private stdout: any) {
        super();
        this.startParsing(stdout);
     }

     startParsing(stream: any) {
        stream.on('data', (chunk: Buffer) => {
            const c = chunk.toString();
            const progress = c.match(expressions.progres);
            if(progress && progress.length > 2) {
                const result = {
                    progress: progress[1],
                    speed: progress[2],
                    eta: progress[3],
                }

                this.emit('progress', result)
            }
        })
     }



}
import { writeFileSync } from 'fs';
import { join } from 'path';

export class Helpers {

    constructor() {  }

    extract(text: any, regExp: RegExp) {
        var arr = regExp.exec(text);
        return arr;
    }

    writePlaces(filename: string, data: any) {
        writeFileSync(join(__dirname, filename), data, { flag: 'a+', });
    }
}
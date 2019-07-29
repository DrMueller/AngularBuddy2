import * as fs from 'fs';
import { injectable } from 'inversify';

import { IFileRepository } from '../file-repository.interface';

@injectable()
export class FileRepository implements IFileRepository {
    public deleteFiles(...filePaths: string[]): void {
        filePaths.forEach(fp => {
            if (fs.existsSync(fp)) {
                fs.unlinkSync(fp);
            }
        });
    }
}

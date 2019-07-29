import { injectable } from 'inversify';

import { ISpecDeletionService } from '../spec-deletion-service.interface';

@injectable()
export class SpecDeletionService implements ISpecDeletionService {
    public deleAllSpecFiles(): void {
        // 1. Get All files to delete
        // 2. Prompt if sure with amount of files to be deleted
        // 3. If yes, delete files
    }
}

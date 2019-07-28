import { injectable } from 'inversify';

import { ISpecDeletionService } from '../spec-deletion-service.interface';

@injectable()
export class SpecDeletionService implements ISpecDeletionService {
    public deleAllSpecFiles(): void {
    }
}

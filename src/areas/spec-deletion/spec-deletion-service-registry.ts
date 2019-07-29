import { Container } from 'inversify';

import { ISpecDeletionService, SpecDeletionServiceName } from './services';
import { SpecDeletionService } from './services/implementation';

export class SpecDeletionServiceRegistry {
    public static register(container: Container): void {
        container.bind<ISpecDeletionService>(SpecDeletionServiceName).to(SpecDeletionService);
    }
}

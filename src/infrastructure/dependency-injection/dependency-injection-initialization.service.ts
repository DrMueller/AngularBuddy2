import { Container } from 'inversify';
import 'reflect-metadata';

import { ISpecDeletionService, SpecDeletionServiceName } from '../../areas/spec-deletion/services';
import { SpecDeletionService } from '../../areas/spec-deletion/services/implementation';

import { ServiceLocatorService } from './service-locator.service';

export class DependencyInjectionInitializationService {
  public static initialize(): void {
    const container = new Container();
    this.applyMappings(container);
    ServiceLocatorService.initialize(container);
  }

  private static applyMappings(container: Container): void {
    container.bind<ISpecDeletionService>(SpecDeletionServiceName).to(SpecDeletionService);

  }
}

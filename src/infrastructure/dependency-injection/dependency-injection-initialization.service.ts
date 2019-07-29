import { Container } from 'inversify';
import 'reflect-metadata';

import { SpecDeletionServiceRegistry } from '../../areas/spec-deletion/spec-deletion-service-registry';
import { InfrastructureServiceRegistry } from '../infrastructure-service-registry';

import { ServiceLocatorService } from './service-locator.service';

export class DependencyInjectionInitializationService {
  public static initialize(): void {
    const container = new Container();
    this.applyMappings(container);
    ServiceLocatorService.initialize(container);
  }

  private static applyMappings(container: Container): void {
    // Areas
    SpecDeletionServiceRegistry.register(container);

    // Infrastructure
    InfrastructureServiceRegistry.register(container);
  }
}

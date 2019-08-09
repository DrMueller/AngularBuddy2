import { Container } from 'inversify';
import 'reflect-metadata';

import { SpecDeletionModule } from '../../areas/spec-deletion/spec-deletion.module';
import { StructAlignModule } from '../../areas/struct-align';
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
    SpecDeletionModule.registerServices(container);
    StructAlignModule.registerServices(container);

    // Infrastructure
    InfrastructureServiceRegistry.register(container);
  }
}

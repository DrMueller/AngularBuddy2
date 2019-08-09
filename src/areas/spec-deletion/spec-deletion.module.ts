import { Container } from 'inversify';
import { commands, ExtensionContext } from 'vscode';

import { ServiceLocatorService } from '../../infrastructure/dependency-injection';
import { ErrorHandlerService } from '../../infrastructure/error-handling/services';

import { ISpecDeletionService, SpecDeletionServiceName } from './services';
import { SpecDeletionService } from './services/implementation';

export class SpecDeletionModule {
  public static registerServices(container: Container): void {
    container.bind<ISpecDeletionService>(SpecDeletionServiceName).to(SpecDeletionService);
  }

  public static registerHooks(context: ExtensionContext): void {
    const cmd = commands.registerCommand('extension.deleteAllSpecFiles', () => {
      ErrorHandlerService.handledAction(() => {
        const specDeletionService = ServiceLocatorService.resolveService<ISpecDeletionService>(SpecDeletionServiceName);
        specDeletionService.deleAllSpecFilesAsync();
      });
    });

    context.subscriptions.push(cmd);
  }
}

import * as vscode from 'vscode';

import { ISpecDeletionService, SpecDeletionServiceName } from '../../../areas/spec-deletion/services/spec-deletion-service.interface';
import { ServiceLocatorService } from '../../dependency-injection';
import { ErrorHandlerService } from '../../error-handling/services';

export class CommandRegistrationServant {
  public static registerCommands(context: vscode.ExtensionContext): void {
    CommandRegistrationServant.registerDeleteAllSpecFiles(context);
  }

  private static registerDeleteAllSpecFiles(context: vscode.ExtensionContext): void {
    const cmd = vscode.commands.registerCommand('extension.deleteAllSpecFiles', () => {
      ErrorHandlerService.handledAction(() => {
        const specDeletionService = ServiceLocatorService.resolveService<ISpecDeletionService>(SpecDeletionServiceName);
        specDeletionService.deleAllSpecFilesAsync();
      });
    });

    context.subscriptions.push(cmd);
  }
}

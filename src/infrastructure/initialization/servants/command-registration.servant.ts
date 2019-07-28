import * as vscode from 'vscode';

import { ISpecDeletionService, SpecDeletionServiceName } from '../../../areas/spec-deletion/services/spec-deletion-service.interface';
import { ServiceLocatorService } from '../../dependency-injection';

export class CommandRegistrationServant {
  public static registerCommands(context: vscode.ExtensionContext): void {
    CommandRegistrationServant.registerAlignBarrelInSelectedDirectory(context);
  }

  private static registerAlignBarrelInSelectedDirectory(context: vscode.ExtensionContext): void {
    const arrangeFileCommand = vscode.commands.registerCommand('extension.deleteAllSpecFiles', () => {
      const specDeletionService = ServiceLocatorService.resolveService<ISpecDeletionService>(SpecDeletionServiceName);
      specDeletionService.deleAllSpecFiles();
    });

    context.subscriptions.push(arrangeFileCommand);
  }
}

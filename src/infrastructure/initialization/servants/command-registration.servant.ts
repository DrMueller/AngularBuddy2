import * as vscode from 'vscode';

import { ISpecDeletionService, SpecDeletionServiceName } from '../../../areas/spec-deletion/services/spec-deletion-service.interface';
import { SpecDeletionModule } from '../../../areas/spec-deletion/spec-deletion.module';
import { StructAlignModule } from '../../../areas/struct-align';
import { ServiceLocatorService } from '../../dependency-injection';
import { ErrorHandlerService } from '../../error-handling/services';

export class CommandRegistrationServant {
  public static registerCommands(context: vscode.ExtensionContext): void {
    CommandRegistrationServant.registerDeleteAllSpecFiles(context);
  }

  private static registerDeleteAllSpecFiles(context: vscode.ExtensionContext): void {
    SpecDeletionModule.registerHooks(context);
    StructAlignModule.registerHooks(context);

  }
}

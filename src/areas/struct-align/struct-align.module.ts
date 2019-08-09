import { Container } from 'inversify';
import { commands, ExtensionContext, Selection, TextEditor, TextEditorEdit } from 'vscode';

import { ServiceLocatorService } from '../../infrastructure/dependency-injection';
import { ErrorHandlerService } from '../../infrastructure/error-handling/services';

import { IStructAlignService, StructAlignServiceName } from './services';
import { StructAlignService } from './services/implementation/struct-align.service';

export class StructAlignModule {
  public static registerServices(container: Container): void {
    container.bind<IStructAlignService>(StructAlignServiceName).to(StructAlignService);
  }

  public static registerHooks(context: ExtensionContext): void {
    const cmd = commands.registerTextEditorCommand('extension.alignToFolderStructure',
    (textEditor: TextEditor, edit: TextEditorEdit) => {
      ErrorHandlerService.handledAction(() => {
        const structAlignService = ServiceLocatorService.resolveService<IStructAlignService>(StructAlignServiceName);
        structAlignService.alignTextMarks(textEditor, edit);
      });
    });

    context.subscriptions.push(cmd);
  }
}

import { Container } from 'inversify';
import { commands, ExtensionContext, Selection, TextEditor, TextEditorEdit } from 'vscode';

import { ServiceLocatorService } from '../../infrastructure/dependency-injection';
import { ErrorHandlerService } from '../../infrastructure/error-handling/services';

import { IStructAlignService, StructAlignServiceName } from './services';
import { StructAlignService } from './services/implementation/struct-align.service';
import { ITextMarkReplacingServant, TextMarkReplacingServantName } from './services/servants';
import { TextMarkReplacingServant } from './services/servants/implementaation';

export class StructAlignModule {
  public static registerServices(container: Container): void {
    container.bind<IStructAlignService>(StructAlignServiceName).to(StructAlignService);
    container.bind<ITextMarkReplacingServant>(TextMarkReplacingServantName).to(TextMarkReplacingServant);
  }

  public static registerHooks(context: ExtensionContext): void {
    context.subscriptions.push(commands.registerTextEditorCommand('extension.alignDocumentToFolderStructure',
      (textEditor: TextEditor, _: TextEditorEdit) => {
        ErrorHandlerService.handledAction(() => {
          const structAlignService = ServiceLocatorService.resolveService<IStructAlignService>(StructAlignServiceName);
          structAlignService.alignTextMarksInDocument(textEditor);
        });
      }));

    context.subscriptions.push(commands.registerCommand('extension.alignAllDocumentsToFolderStructure',
      () => {
        ErrorHandlerService.handledActionAsync(async () => {
          const structAlignService = ServiceLocatorService.resolveService<IStructAlignService>(StructAlignServiceName);
          await structAlignService.alignTextMarksInAllDocumentsAsync();
        });
      }));
  }
}

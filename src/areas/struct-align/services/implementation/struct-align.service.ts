import { inject, injectable } from 'inversify';
import { Range, TextDocument, TextEditor, TextEditorEdit, workspace } from 'vscode';

import { IInformationService, InformationServiceName } from '../../../../infrastructure/vscode-api/informations/services';
import { IStructAlignService } from '../struct-align-service.interface';

@injectable()
export class StructAlignService implements IStructAlignService {

  public constructor(@inject(InformationServiceName) private infoService: IInformationService) {
  }

  public alignTextMarks(textEditor: TextEditor, edit: TextEditorEdit): void {
    const placeHolder = '%.';

    const namespace = this.getSeparatedRelativeNamespace(textEditor.document);

    const fullText = textEditor.document.getText();
    const replaceOccurences = fullText.split(placeHolder).length - 1;
    this.infoService.showInfo(`Replacing ${ replaceOccurences } entries..`);

    const replacedText = fullText.split(placeHolder).join(namespace);
    const allTextRange = new Range(0, 0, textEditor.document.lineCount, fullText.length);
    edit.replace(allTextRange, replacedText);

    this.infoService.showInfo(`Replaced ${ replaceOccurences } entries!`);
  }

  private getSeparatedRelativeNamespace(textDocument: TextDocument): string {
    let relativePath = workspace.asRelativePath(textDocument.uri.fsPath);
    const fileName = relativePath.split('/').pop()!;
    relativePath = relativePath.replace(fileName, '');

    if (relativePath.startsWith('app/')) {
      relativePath = relativePath.substring(4);
    }

    const pointSeparatedPath = relativePath.split('/').join('.');
    return pointSeparatedPath;
  }
}

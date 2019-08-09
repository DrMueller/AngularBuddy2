import { inject, injectable } from 'inversify';
import { Range, TextDocument, TextEditor, TextEditorEdit, workspace } from 'vscode';

import { IInformationService, InformationServiceName } from '../../../../infrastructure/vscode-api/informations/services';
import { IStructAlignService } from '../struct-align-service.interface';

@injectable()
export class StructAlignService implements IStructAlignService {

  public constructor(@inject(InformationServiceName) private infoService: IInformationService) {
  }

  public alignTextMarks(textEditor: TextEditor, edit: TextEditorEdit): void {
    const placeHolder = '%%';

    const namespace = this.getSeparatedRelativeNamespace(textEditor.document);

    const fullText = textEditor.document.getText();
    const replaceOccurences = fullText.split(placeHolder).length - 1;
    this.infoService.showInfo(`Replacing ${replaceOccurences} entries..`);

    const replacedText = fullText.split(placeHolder).join(namespace);
    const allTextRange = new Range(0, 0, textEditor.document.lineCount, fullText.length);
    edit.replace(allTextRange, replacedText);

    this.infoService.showInfo(`Replaced ${replaceOccurences} entries!`);
  }

  private getSeparatedRelativeNamespace(textDocument: TextDocument): string {
    // We can't use the workspace path, as we don't know, from which folder the user opens
    // we search therefore for src/app/ and take this one as starting point
    let relativePath = textDocument.uri.fsPath;
    const pathSeparator = relativePath.indexOf('/') > -1 ? '/' : '\\';

    const startIndex = relativePath.indexOf(`src${pathSeparator}app${pathSeparator}`);
    if (startIndex > -1) {
      relativePath = relativePath.substring(startIndex + 8);
    }

    const fileName = relativePath.split(pathSeparator).pop()!;
    relativePath = relativePath.replace(fileName, '');

    const pointSeparatedPath = relativePath.split(pathSeparator).join('.');
    return pointSeparatedPath;
  }
}

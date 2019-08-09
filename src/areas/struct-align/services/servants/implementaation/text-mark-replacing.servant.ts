import * as fs from 'fs';
import { inject, injectable } from 'inversify';
import { Range, TextDocument, TextEditor, TextEditorEdit } from 'vscode';

import { ITextMarkReplacingServant } from '../text-mark-replacing-servant.interface';

@injectable()
export class TextMarkReplacingServant implements ITextMarkReplacingServant {
  private readonly Placeholder = '%%';

  public replaceTextMarksInDocument(document: TextDocument): number {
    const namespace = this.getSeparatedRelativeNamespace(document);

    const fullText = document.getText();
    const replacedText = fullText.split(this.Placeholder).join(namespace);

    fs.writeFileSync(document.fileName, replacedText);

    const replaceOccurences = fullText.split(this.Placeholder).length - 1;
    return replaceOccurences;
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


import { TextDocument, TextEditorEdit } from 'vscode';

export const TextMarkReplacingServantName = 'ITextMarkReplacingServant';

export interface ITextMarkReplacingServant {
  replaceTextMarksInDocument(document: TextDocument): number;
}

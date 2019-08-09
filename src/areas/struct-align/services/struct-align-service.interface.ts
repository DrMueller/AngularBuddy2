import { TextEditor, TextEditorEdit } from 'vscode';

export const StructAlignServiceName = 'IStructAlignService';

export interface IStructAlignService {
  alignTextMarksInDocument(absoluteFilePath: TextEditor): void;

  alignTextMarksInAllDocumentsAsync(): Promise<void>;
}

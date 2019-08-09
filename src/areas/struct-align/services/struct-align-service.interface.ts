import { TextEdit, TextEditor, TextEditorEdit } from 'vscode';

export const StructAlignServiceName = 'IStructAlignService';

export interface IStructAlignService {
  alignTextMarks(absoluteFilePath: TextEditor, edit: TextEditorEdit): void;
}

import { inject, injectable } from 'inversify';
import { Range, TextDocument, TextEditor, TextEditorEdit, workspace } from 'vscode';

import { DialogServiceName, IDialogService } from '../../../../infrastructure/vscode-api/dialogs/services';
import { IInformationService, InformationServiceName } from '../../../../infrastructure/vscode-api/informations/services';
import { IWorkspaceFilesFetcher, WorkspaceFilesFetcherName } from '../../../../infrastructure/vscode-api/workspace/services';
import { ITextMarkReplacingServant, TextMarkReplacingServantName } from '../servants';
import { IStructAlignService } from '../struct-align-service.interface';

@injectable()
export class StructAlignService implements IStructAlignService {
  public constructor(
    @inject(InformationServiceName) private infoService: IInformationService,
    @inject(TextMarkReplacingServantName) private textMarkReplacer: ITextMarkReplacingServant,
    @inject(DialogServiceName) private dialogService: IDialogService,
    @inject(WorkspaceFilesFetcherName) private workspaceFilesFetcher: IWorkspaceFilesFetcher) {
  }

  public alignTextMarksInDocument(textEditor: TextEditor): void {
    const replacedEntries = this.textMarkReplacer.replaceTextMarksInDocument(textEditor.document);
    this.propagateEntries(replacedEntries);
  }

  public async alignTextMarksInAllDocumentsAsync(): Promise<void> {
    const files = await this.fetchHtmlAndTsFilesAsync();
    const enquiry = `You are about to check ${files.length} files. Enter \'y\' to continue`;
    const enquiryResult = await this.dialogService.showDialogAsync(enquiry);

    if (enquiryResult === 'y') {
      await this.replaceTextMarksInDocumentsAsync(files);
    } else {
      this.infoService.showInfo(`Cancelled replacing.`);
    }
  }

  private async fetchHtmlAndTsFilesAsync(): Promise<string[]> {
    const tsFilesPromise = this.workspaceFilesFetcher.fetchWorkspaceFilesAsync('**/*.ts', false);
    const htmlFilesPromise = this.workspaceFilesFetcher.fetchWorkspaceFilesAsync('**/*.html', false);
    const files = await Promise.all([tsFilesPromise, htmlFilesPromise]);
    const flatFiles = files.reduce((a, b) => a.concat(b));
    return flatFiles;
  }

  private async replaceTextMarksInDocumentsAsync(files: string[]): Promise<void> {
    const replacePromises = files.map(async filePath => {
      const document = await workspace.openTextDocument(filePath);
      return this.textMarkReplacer.replaceTextMarksInDocument(document);
    });

    const replacedEntries = await Promise.all(replacePromises);
    const amountOfReplacesEntries = replacedEntries.reduce((prev, current) => prev + current);
    this.propagateEntries(amountOfReplacesEntries);
  }

  private propagateEntries(amount: number) {
    this.infoService.showInfo(`Replaced ${amount} entries!`);
  }
}

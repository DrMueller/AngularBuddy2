import { inject, injectable } from 'inversify';

import { FileRepositoryName, IFileRepository } from '../../../../infrastructure/ts-api/services';
import { DialogServiceName, IDialogService } from '../../../../infrastructure/vscode-api/dialogs/services';
import { IInformationService, InformationServiceName } from '../../../../infrastructure/vscode-api/informations/services';
import { IWorkspaceFilesFetcher, WorkspaceFilesFetcherName } from '../../../../infrastructure/vscode-api/workspace/services';
import { ISpecDeletionService } from '../spec-deletion-service.interface';

@injectable()
export class SpecDeletionService implements ISpecDeletionService {

    public constructor(
        @inject(WorkspaceFilesFetcherName) private workspaceFilesFetcher: IWorkspaceFilesFetcher,
        @inject(DialogServiceName) private dialogService: IDialogService,
        @inject(FileRepositoryName) private fileRepo: IFileRepository,
        @inject(InformationServiceName) private infoService: IInformationService
    ) { }

    public async deleAllSpecFilesAsync(): Promise<void> {
        const specFiles = await this.workspaceFilesFetcher.fetchWorkspaceFilesAsync('**/*.spec.ts', false);
        const enquiry = `You are about to delete ${specFiles.length} spec files. Enter \'y\' to continue`;
        const enquiryResult = await this.dialogService.showDialogAsync(enquiry);

        if (enquiryResult === 'y') {
            this.fileRepo.deleteFiles(...specFiles);
            this.infoService.showInfo(`Deleted ${specFiles.length} files.`);
        } else {
            this.infoService.showInfo(`Cancelled deletion.`);
        }
    }
}

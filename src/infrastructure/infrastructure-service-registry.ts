import { Container } from 'inversify';

import {  FileRepositoryName, IFileRepository, ISourceFileFactory, SourceFileFactoryName } from './ts-api/services';
import { SourceFileFactory } from './ts-api/services/implementation';
import { FileRepository } from './ts-api/services/implementation/file.repository';
import { DialogServiceName, IDialogService } from './vscode-api/dialogs/services';
import { DialogService } from './vscode-api/dialogs/services/implementation';
import { IInformationService, InformationServiceName } from './vscode-api/informations/services';
import { InformationService } from './vscode-api/informations/services/implementation';
import {
    IWorkspaceFilesFetcher, IWorkspaceFoldersFetcher,
    WorkspaceFilesFetcherName, WorkspaceFoldersFetcherName
} from './vscode-api/workspace/services';
import { WorkspaceFilesFetcher, WorkspaceFoldersFetcher } from './vscode-api/workspace/services/implementation';

export class InfrastructureServiceRegistry {
    public static register(container: Container): void {
        // ts-api
        container.bind<IFileRepository>(FileRepositoryName).to(FileRepository);
        container.bind<ISourceFileFactory>(SourceFileFactoryName).to(SourceFileFactory);

        // vscode-api
        container.bind<IDialogService>(DialogServiceName).to(DialogService);
        container.bind<IInformationService>(InformationServiceName).to(InformationService);
        container.bind<IWorkspaceFilesFetcher>(WorkspaceFilesFetcherName).to(WorkspaceFilesFetcher);
        container.bind<IWorkspaceFoldersFetcher>(WorkspaceFoldersFetcherName).to(WorkspaceFoldersFetcher);
    }
}

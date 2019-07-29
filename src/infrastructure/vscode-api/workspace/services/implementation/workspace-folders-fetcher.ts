import { readdirSync, statSync } from 'fs';
import { injectable } from 'inversify';
import * as path from 'path';
import { workspace } from 'vscode';

import { IWorkspaceFoldersFetcher } from '../workspace-folders-fetcher.interface';

@injectable()
export class WorkspaceFoldersFetcher implements IWorkspaceFoldersFetcher {
    public fetchWorkspaceFolders(foldersToIgnore: string[]): string[] {
        const subFolders: string[] = [];

        if (workspace.workspaceFolders) {
            workspace.workspaceFolders.forEach(folder => {
                this.getAllSubFolders(folder.uri.fsPath, foldersToIgnore, subFolders);
            });
        }

        return subFolders;
    }

    private checkIfFolderIsIgnored(foldersToIgnore: string[], folder: string): boolean {
        if (foldersToIgnore.indexOf(folder) > -1) {
            return true;
        }

        if (folder.startsWith('.')) {
            return true;
        }

        return false;
    }

    private getAllSubFolders(baseFolder: string, foldersToIgnore: string[], folderList: string[]): void {
        const folders: string[] = readdirSync(baseFolder).filter(file => statSync(path.join(baseFolder, file)).isDirectory());

        folders.forEach(folder => {
            if (this.checkIfFolderIsIgnored(foldersToIgnore, folder)) {
                return;
            }

            folderList.push(path.join(baseFolder, folder));
            this.getAllSubFolders(path.join(baseFolder, folder), foldersToIgnore, folderList);
        });
    }
}

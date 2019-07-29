import { injectable } from 'inversify';
import { Uri, workspace } from 'vscode';

import { IWorkspaceFilesFetcher } from '..';

@injectable()
export class WorkspaceFilesFetcher implements IWorkspaceFilesFetcher {
    public async fetchWorkspaceFilesAsync(glob: string, includeNodeModuleFolders: boolean): Promise<string[]> {
        let foundFiles: Uri[];

        if (includeNodeModuleFolders) {
            foundFiles = await workspace.findFiles(glob);
        } else {
            foundFiles = await workspace.findFiles(glob, '**/node_modules/**');
        }

        const result = foundFiles.map(file => file.fsPath);
        return result;
    }
}

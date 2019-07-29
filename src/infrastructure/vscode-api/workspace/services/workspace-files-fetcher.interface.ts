export const WorkspaceFilesFetcherName = 'IWorkspaceFilesFetcher';

export interface IWorkspaceFilesFetcher {
    fetchWorkspaceFilesAsync(glob: string, includeNodeModuleFolders: boolean): Promise<string[]>;
}

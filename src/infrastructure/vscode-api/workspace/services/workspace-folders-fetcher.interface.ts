export const WorkspaceFoldersFetcherName = 'IWorkspaceFoldersFetcher';

export interface IWorkspaceFoldersFetcher {
    fetchWorkspaceFolders(foldersToIgnore: string[]): string[];
}

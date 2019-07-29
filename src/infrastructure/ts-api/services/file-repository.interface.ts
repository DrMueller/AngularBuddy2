export const FileRepositoryName = 'IFileRepository';

export interface IFileRepository {
    deleteFiles(...filePaths: string[]): void;
}

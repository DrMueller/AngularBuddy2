export const SpecDeletionServiceName = 'ISpecDeletionService';

export interface ISpecDeletionService {
    deleAllSpecFilesAsync(): Promise<void>;
}

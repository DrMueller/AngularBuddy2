export const DialogServiceName = 'IDialogService';

export interface IDialogService {
    showDialogAsync(prompt: string, placeholder?: string): Promise<string | undefined>;
}

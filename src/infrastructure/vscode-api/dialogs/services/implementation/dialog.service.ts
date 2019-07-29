import { injectable } from 'inversify';
import { InputBoxOptions, window } from 'vscode';

import { IDialogService } from '../dialog-service.interface';

@injectable()
export class DialogService implements IDialogService {
    public async showDialogAsync(prompt: string, placeholder?: string): Promise<string | undefined> {
        const options: InputBoxOptions = {
            prompt: prompt,
            placeHolder: placeholder
        };

        const dialogResult = await window.showInputBox(options);
        return dialogResult;
    }
}

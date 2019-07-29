import { Func } from '@drmueller/language-extensions';
import * as vscode from 'vscode';

export class ErrorHandlerService {
  public static async handledActionAsync(callback: Func<Promise<void>>): Promise<void> {
    try {
      await callback();
    } catch (err) {
      await vscode.window.showErrorMessage(err.message);
    }
  }

  public static handledAction(callback: Func<void>): void {
    try {
      callback();
    } catch (err) {
      vscode.window.showErrorMessage(err.message);
    }
  }
}

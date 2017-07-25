import { ConvertPxRem } from './covertPxRem';
import * as vscode from 'vscode';

export class css {
  convertPxRem() {
    // pxtorem remtopx
    let editor = vscode.window.activeTextEditor;
    if (!editor) {
      return true;
    }
    let convertPxRem: any = new ConvertPxRem();
    let editor_doc = editor.document;
    let selections = editor.selections.reverse();

    editor.edit(function (edit) {
      for (let i = 0; i < selections.length; i++) {
        let cursor_pos = selections[i].active;
        let range = editor_doc.getWordRangeAtPosition(cursor_pos);
        let cursor_text = editor_doc.getText(range);

        let num = convertPxRem.run(cursor_text);
        if (!num) {
          continue;
        }
        edit.replace(range, num);
      }
    });
  }
}


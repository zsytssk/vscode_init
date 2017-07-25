import * as vscode from 'vscode';
import * as os from 'os';

type t_pos = 'bol' | 'eol';

/**常用的插入字符串 */
let str_list: string[] = ['##', '#', '*', '1.', '>>', '>', ';']

export type t_insert_text_pos = t_pos;

export class InsertText {
  constructor() {
  }
  public insert(str: string, pos: t_pos, space: number = 0) {
    let editor = vscode.window.activeTextEditor;
    if (!editor) {
      return; // No open text editor
    }
    let edit = editor.edit;
    let doc = editor.document;
    let selections = editor.selections;
    let space_str = this.generateSpace(space);
    let insert_str = '';
    if (pos == 'eol') {
      insert_str = space_str + str;
    } else {
      insert_str = str + space_str;
    }

    editor.edit((edit) => {
      for (let i = 0; i < selections.length; i++) {
        let selection = selections[i];
        this.findWhiteRange(editor, selection.start);
        let line = selection.active.line;
        let doc_line = doc.lineAt(line);
        let text_pos = this.getLinePos(editor, line, pos);
        let inserted_text_info = this.isInsertedText(editor, line, pos);
        if (!inserted_text_info || !pos) {
          edit.insert(text_pos, insert_str);
          return;
        }
        let insert_text = inserted_text_info.insert_text;
        let insert_range = inserted_text_info.range;
        /**如何已经插入的字符串和将要插入的字符串不一样, 替换 */
        if (insert_text != str) {
          edit.replace(insert_range, insert_str);
          return;
        }
        /**如何已经插入的字符串和将要插入的字符串一样, 另起一行插入 */
        edit.insert(new vscode.Position(line, doc_line.text.length), os.EOL + insert_str)
        let position = new vscode.Position(line, doc_line.text.length);
        editor.selection = new vscode.Selection(position, position);
      }
    });
  }
  private getLinePos(editor: vscode.TextEditor, line: number, pos: string): vscode.Position {
    if (pos == 'bol') {
      return new vscode.Position(line, 0);
    } else if (pos == 'eol') {
      let text_doc = editor.document;
      let text_line = text_doc.lineAt(line);
      let eol = text_line.text.length;
      return new vscode.Position(line, eol);
    }
  }
  private generateSpace(space_number: number) {
    let space_str = ' ';
    let result_str = '';
    for (let i = 0; i < space_number; i++) {
      result_str += space_str;
    }
    return result_str;
  }
  /**是否已经插入相同类型的字符串, */
  private isInsertedText(editor: vscode.TextEditor, line: number, pos: string): { insert_text: string, range: vscode.Range } {
    let _doc = editor.document;
    let _line = _doc.lineAt(line);
    let line_text = _line.text;

    if (pos = 'bol') {
      for (let i = 0; i < str_list.length; i++) {
        let str_item = str_list[i];
        let indexof_text = line_text.indexOf(str_item);

        if (indexof_text == 0) {
          return {
            insert_text: str_item,
            range: new vscode.Range(new vscode.Position(line, 0), new vscode.Position(line, str_item.length))
          };
        }
      }
    }
    if (pos = 'eol') {
      for (let i = 0; i < str_list.length; i++) {
        let str_item = str_list[i];
        let indexof_text = line_text.indexOf(str_item);

        if (indexof_text == line_text.length - 1 - str_item.length) {
          return {
            insert_text: str_item,
            range: new vscode.Range(new vscode.Position(line, indexof_text), new vscode.Position(line, line_text.length - 1))
          };
        }
      }
    }
    return null;
  }
  private findWhiteRange(editor: vscode.TextEditor, pos: vscode.Position) {
    let after_character = this.getAfterPosCharacter(editor, pos);
    console.log(after_character);
  }
  private getAfterPosCharacter(editor: vscode.TextEditor, pos: vscode.Position) {
    let doc = editor.document;
    let next_pos = this.getAfterPos(editor, pos);
    doc.getText(new vscode.Range(pos, next_pos));
  }
  public getBeforePosCharacter(editor: vscode.TextEditor, pos: vscode.Position) {

  }
  /** */
  private getAfterPos(editor: vscode.TextEditor, pos: vscode.Position) {
    let doc = editor.document;
    let cur_offset = doc.offsetAt(pos);
    let next_offset = cur_offset + 1;
    return doc.positionAt(next_offset);
  }
  private getBeforePos(editor: vscode.TextEditor, pos: vscode.Position) {
    let doc = editor.document;
    let line = pos.line;
    let before_character = pos.character - 1;
    if (before_character < 0) {
      line = line - 1;
      let line_text_len = doc.lineAt(pos.line).text.length;
      before_character = line_text_len;
    }
    return new vscode.Position(line, before_character);
  }
}
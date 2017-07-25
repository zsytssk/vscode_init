import * as vscode from 'vscode';
import { InsertText, t_insert_text_pos } from './insertText';

export function insertText(str: string, pos: t_insert_text_pos, space = 0) {
  (new InsertText()).insert(str, pos, space);
}
export type t_insert_text_pos = t_insert_text_pos;
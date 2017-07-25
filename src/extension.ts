'use strict';

import * as vscode from 'vscode';
import { insertText, t_insert_text_pos } from './insertText/main';
import { test } from './test';

type t_insert_text_args = {
  str: string,
  pos: t_insert_text_pos,
  space: number
}

export function activate(context: vscode.ExtensionContext) {
  // test comment
  let commands = vscode.commands;
  context.subscriptions.push(
    commands.registerCommand("extension.zsyInit.insertText", (args: t_insert_text_args) => {
      if (!args || !args.str) {
        vscode.window.showErrorMessage(`Please make sure your 'args' str is not empty`);
        return;
      }
      insertText(args.str, args.pos, args.space);
    }),
    commands.registerCommand("extension.zsyInit.insertText(*,bol)", () => {
      insertText('*', 'bol', 1);
    }),
    commands.registerCommand("extension.zsyInit.insertText(1.,bol)", () => {
      insertText('1.', 'bol', 1);
    }),
    commands.registerCommand("extension.zsyInit.insertText(##,bol)", () => {
      insertText('##', 'bol', 1);
    }),
    commands.registerCommand("extension.zsyInit.insertText(>,bol)", () => {
      insertText('>', 'bol', 1);
    }),
    commands.registerCommand("extension.zsyInit.insertText(>>,bol)", () => {
      insertText('>>', 'bol', 1);
    }),
    commands.registerCommand("extension.zsyInit.insertText(;,eol)", () => {
      insertText(';', 'eol');
    }),
    commands.registerCommand("extension.sayHello.test", (args) => {
      if (!args || !args.str) {
        vscode.window.showErrorMessage(`Please make sure your 'args' str is not empty`);
        return;
      }
      insertText(args.str, args.pos, args.space);
    })
  );
}

// this method is called when your extension is deactivated
export function deactivate() {
}


'use strict';

import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

const FOLDER = 'D:\\zsytssk\\test\\codePlugin\\src'

export function test() {
  test1();
}

async function test1() {
  var data = await readFiles(FOLDER);
  var list = createList(data);
  console.log('test2', data);
  vscode.window.showQuickPick(list).then(cmd => {
    if (!cmd) {
      return;
    }
    console.log(cmd);

  })
}

function readFiles(folder: string): Promise<string[]> {
  return new Promise((resolve, reject) => {
    fs.readdir(folder, function (err, data) {
      if (err) {
        throw err;
      }
      console.log('test1', data);
      resolve(data);
    });
  })
}

function createList(data) {
  let reuslt: vscode.QuickPickItem[] = [];
  for (let i = 0; i < data.length; i++) {
    let item = {
      label: data[i],
      description: data[i],
      data: data[i],
      isLast: i === data.length - 1
    }
    reuslt.push(item);
  }
  return reuslt;
}
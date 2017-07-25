'use strict';

import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import { insertText } from './insertText/main';

const FOLDER = 'D:\\zsytssk\\test\\codePlugin\\src'

export function test(args) {
    console.log(args);
}
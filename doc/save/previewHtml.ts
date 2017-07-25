'use strict';

import * as vscode from 'vscode';
import * as path from 'path';

const test_view_schema = 'test-view';
let previewUri = vscode.Uri.parse(test_view_schema + '://authority/test');


export async function test() {
  let provider = new TextDocumentContentProvider();
  let registration = vscode.workspace.registerTextDocumentContentProvider(test_view_schema, provider);

  console.log(previewUri);
  let success = await vscode.commands.executeCommand('vscode.previewHtml', previewUri, vscode.ViewColumn.One, '合并字体');
  console.log(success);
}

class TextDocumentContentProvider implements vscode.TextDocumentContentProvider {
  public provideTextDocumentContent(uri: vscode.Uri, token: vscode.CancellationToken): string {
    let html = this.generateHtml();
    console.log(html);
    return html;
  }
  private generateHtml(): string {
    return `
            <head>
                <link rel="stylesheet" href="${this.getStyleSheetPath('style.css')}" >
                <script src="${this.getScriptFilePath(path.join('lib', 'jquery.js'))}" async></script>
                <script src="${this.getScriptFilePath('app.js')}" async></script>
            </head>

            <body>
                <section class="container">
                  <div class="uploader">
                      <p>将一个或多个文件拖拽至此</p>
                  </div>
                  <div class="font-list scrollbar">
                      <ul>
                          <!--<li>
                              <i class="img" style="background-image:url(../demo/font_number/,.png);"></i>
                              <i class="letter">0</i>
                              <i class="btn del"></i>
                          </li>-->
                      </ul>
                  </div>
              </section>
              <footer class="footer">
                  <p class="info">字号：--</p>
                  <div class="btn deleteall">删除全部</div>
                  <div class="btn publish">生成字体</div>
              </footer>
            </body>
        `;
  }

  private getStyleSheetPath(resourceName: string): string {
    return vscode.Uri.file(path.join(__dirname, '..', '..', 'res/css', resourceName)).toString();
  }
  private getImagestPath(resourceName: string): string {
    return vscode.Uri.file(path.join(__dirname, '..', '..', 'res/images', resourceName)).toString();
  }
  private getScriptFilePath(resourceName: string): string {
    return vscode.Uri.file(path.join(__dirname, '..', '..', 'res/js', resourceName)).toString();
  }
  private getNodeModulesPath(resourceName: string): string {
    return vscode.Uri.file(path.join(__dirname, '..', '..', 'node_modules', resourceName)).toString();
  }
}
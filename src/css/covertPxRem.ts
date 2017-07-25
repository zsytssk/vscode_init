export class ConvertPxRem {
  pxToRem_rate: number
  public constructor() {
    this.pxToRem_rate = 100;
  }
  public run(text: string): string {
    var text_obj = this.detectPxOrRem(text);

    if (!text_obj) {
      return;
    }
    if (text_obj.type == 'px') {
      return this.getPxToRem(text_obj.value).toFixed(2) + 'rem';
    }
    return this.getRemToPx(text_obj.value) + 'px';
  }
  private getRemToPx(rem: number): number {
    return (rem * this.pxToRem_rate);
  }
  private getPxToRem(px: number): number {
    return (px / this.pxToRem_rate);
  }
  private detectPxOrRem(text: string): i_text_obj | undefined {
    let num = parseFloat(text);
    let type: i_unit = 'px';
    if (!num) {
      return;
    }
    if (text.indexOf('rem') != -1 &&
      text.indexOf('rem') == text.length - 3 ||
      text.indexOf('.') != -1
    ) {
      type = 'rem';
    }
    return {
      type: type,
      value: num
    }
  }
}
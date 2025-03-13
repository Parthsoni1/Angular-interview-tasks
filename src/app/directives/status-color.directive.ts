import { Directive, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appStatusColor]',
  standalone: true
})
export class StatusColorDirective implements OnChanges {
  @Input() appStatusColor!: string;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(): void {
    this.updateColor();
  }

  private updateColor(): void {
    this.renderer.removeClass(this.el.nativeElement, 'bg-success');
    this.renderer.removeClass(this.el.nativeElement, 'bg-danger');

    if (this.appStatusColor === 'active') {
      this.renderer.addClass(this.el.nativeElement, 'bg-success');
    } else if (this.appStatusColor === 'inactive') {
      this.renderer.addClass(this.el.nativeElement, 'bg-danger');
    }
  }
}

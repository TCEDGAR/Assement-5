import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nameTitleCase',
  standalone: true // important for standalone components
})
export class NameTitleCasePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';

    return value
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.substring(1).toLowerCase())
      .join(' ');
  }
}

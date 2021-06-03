import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Pipe({
    name: 'striphtml'
})
export class MainContent implements PipeTransform{
    transform(value: string): any {
        return value.replace(/(<([^>]+)>)/gi, '');
      }
}

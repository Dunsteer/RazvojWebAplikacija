import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'delivered'})
export class Delivered implements PipeTransform {
  transform(delivered: boolean): string {
    if(delivered){
      return "Delivered";
    }
    else{
      return "Waiting for delivery";
    }
  }
}

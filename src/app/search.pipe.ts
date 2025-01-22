import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any, ...args: any): any {
    if(!value) return null;
    if(!args) return null;
    args=args.toString().toLowerCase();
    return value.filter(function(item:any){
      return JSON.stringify(item).toLowerCase().includes(args);
    })
  }

}

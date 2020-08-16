import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  pure: false
})
export class SearchPipe implements PipeTransform {

  transform(value: any, arg: any): any {

    const resultProduct = [];
    for (const product of value) {
      if (product.name.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultProduct.push(product);
      }
    }
    return resultProduct;
  }

}

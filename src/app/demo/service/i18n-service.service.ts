import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class I18nServiceService {

  localeEvent = new Subject<string>();
  locale: string = 'fr'

  constructor(private translate: TranslateService) { }

  changeLocale(locale: string){
    this.translate.use(locale);
    this.localeEvent.next(locale);
  }

}

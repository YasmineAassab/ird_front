import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {I18nServiceService} from './demo/service/i18n-service.service';

@Component({
  selector: 'app-footer',
  templateUrl: './app.footer.component.html',
  styleUrls: ['./app.footer.component.css'],
})
export class AppFooterComponent implements OnInit {


    constructor(private translate: TranslateService, private i18nService: I18nServiceService) {
        //translate.setDefaultLang('fr');
        //translate.use('en');
    }

    changeLocale(locale: string){
        this.i18nService.changeLocale(locale);
        this.i18nService.locale = locale;
    }

    ngOnInit() {
        this.loadScripts()
        this.i18nService.localeEvent.subscribe(locale => this.translate.use(locale));
    }

    loadScripts() {
        var speedDialContainer = document.querySelector(".speed-dial");
        var primaryButton = speedDialContainer.querySelector(".speed-dial__button--primary");

        document.addEventListener("click", function(e) {
            var classList = "speed-dial";
            var primaryButtonClicked =
                e.target === primaryButton || primaryButton.contains(e.target as Node);
            var speedDialIsActive = speedDialContainer.getAttribute("class").indexOf("speed-dial--active") !== -1;

            if (primaryButtonClicked && !speedDialIsActive) {
                classList += " speed-dial--active";
            }

            speedDialContainer.setAttribute("class", classList);
        });
    };
}

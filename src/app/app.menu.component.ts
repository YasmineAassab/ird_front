import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from './controller/service/Auth.service';

import {animate, state, style, transition, trigger,} from '@angular/animations';
import {AppComponent} from './app.component';
import {AppMainComponent} from './app.main.component';
import {RoleService} from './controller/service/role.service';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {Observable} from 'rxjs';
import {I18nServiceService} from './demo/service/i18n-service.service';
import {waitForAsync} from '@angular/core/testing';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
    //providers: [TranslatePipe],
    animations: [
        trigger('inline', [
            state(
                'hidden',
                style({
                    height: '0px',
                    overflow: 'hidden',
                })
            ),
            state(
                'visible',
                style({
                    height: '*',
                })
            ),
            state(
                'hiddenAnimated',
                style({
                    height: '0px',
                    overflow: 'hidden',
                })
            ),
            state(
                'visibleAnimated',
                style({
                    height: '*',
                })
            ),
            transition(
                'visibleAnimated => hiddenAnimated',
                animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')
            ),
            transition(
                'hiddenAnimated => visibleAnimated',
                animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')
            ),
        ]),
    ],
})
export class AppMenuComponent implements OnInit {
    model: any[];
    en_model: any[];
    modelsuperadmin: any[];
    modelanonymous: any[];
    modelchercheur: any[];
    modeladmin: any[];
    en_modeladmin: any[];
    en_modelchercheur: any[];
    public translatedValueUsingGet: string;
    locale: string;

    constructor(public app: AppComponent,
                public appMain: AppMainComponent,
                private roleService: RoleService,
                private authService: AuthService,
                private router: Router,
                public translate: TranslateService,
                private i18nService: I18nServiceService) {
    }

    async ngOnInit() {

        this.locale = this.i18nService.locale;

        this.i18nService.localeEvent.subscribe((locale: string) => {
            this.locale = locale
            console.log(this.locale);
        });

        //await this.translate.use(this.locale);

        this.modelchercheur =
            [
                {
                    label: 'Configuration',
                    icon: 'pi pi-wallet',
                    items: [
                        {
                            label: 'Liste template email report',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/chercheur/kosc/template-email-report/list']
                        },
                        {
                            label: 'Liste template suivi',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/chercheur/kosc/template-suivi/list']
                        },
                        {
                            label: 'Liste template email client injoinable',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/chercheur/kosc/template-email-client-injoinable/list']
                        },
                        {
                            label: 'Liste template email kosc',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/chercheur/kosc/template-email-kosc/list']
                        },
                        {
                            label: 'Liste template email replanification',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/chercheur/kosc/template-email-replanification/list']
                        },
                        {
                            label: 'Liste template email cloture',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/chercheur/kosc/template-email-cloture/list']
                        },
                        {
                            label: 'Liste template email planification',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/chercheur/kosc/template-email-planification/list']
                        },
                    ]
                },
                {
                    label: 'Gestion Technicien',
                    icon: 'pi pi-wallet',
                    items: [
                        {
                            label: 'Liste des raison arret travails',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/chercheur/kosc/raison-arret-travail/list']
                        },
                        {
                            label: 'Liste departement technicien',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/chercheur/kosc/departement-technicien/list']
                        },
                        {
                            label: 'Liste chercheur',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/chercheur/kosc/chercheur/list']
                        },
                        {
                            label: 'Liste region',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/chercheur/kosc/region/list']
                        },
                        {
                            label: 'Liste technicien',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/chercheur/kosc/technicien/list']
                        },
                        {
                            label: 'Liste entreprise',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/chercheur/kosc/entreprise/list']
                        },
                        {
                            label: 'Liste arret travail',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/chercheur/kosc/arret-travail/list']
                        },
                        {
                            label: 'Liste departement',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/chercheur/kosc/departement/list']
                        },
                    ]
                },
                {
                    label: 'Kosc Order',
                    icon: 'pi pi-wallet',
                    items: [
                        {
                            label: 'Liste ordre kosc',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/chercheur/kosc/ordre-kosc/list']
                        },
                    ]
                },
                {
                    label: 'Referentiel',
                    icon: 'pi pi-wallet',
                    items: [
                        {
                            label: 'Liste etat demande kosc',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/chercheur/kosc/etat-demande-kosc/list']
                        },
                        {
                            label: 'Liste kosc employee',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/chercheur/kosc/kosc-employee/list']
                        },
                        {
                            label: 'Liste client',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/chercheur/kosc/client/list']
                        },
                        {
                            label: 'Liste operator',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/chercheur/kosc/operator/list']
                        },
                    ]
                },
            ];
        this.modeladmin =
            [
                {
                    label: 'Kosc Order',
                    icon: 'pi pi-wallet',
                    items: [
                        {
                            label: 'Liste kosc ordre ',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/admin/kosc/ordre-kosc/list']
                        },
                        {
                            label: 'Prise Rdv kosc ordre',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/admin/kosc/ordre-kosc-prise-rdv/list']
                        },
                        // {
                        //     label: 'Affectation technicien kosc ordre',
                        //     icon: 'pi pi-fw pi-plus-circle',
                        //     routerLink: ['/app/admin/kosc/ordre-kosc-affectation-technicien/list']
                        // },
                        {
                            label: 'Suivi kosc ordre',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/admin/kosc/ordre-kosc-suivi/list']
                        },
                        // {
                        //     label: 'Historique suivi kosc ordre',
                        //     icon: 'pi pi-fw pi-plus-circle',
                        //     routerLink: ['/app/admin/kosc/ordre-kosc-suivi-historique/list']
                        // },
                    ]
                },
                {
                    label: 'Gestion Technicien',
                    icon: 'pi pi-wallet',
                    items: [
                        {
                            label: 'Liste raison arret travail',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/admin/kosc/raison-arret-travail/list']
                        },
                        {
                            label: 'Liste departement technicien',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/admin/kosc/departement-technicien/list']
                        },
                        {
                            label: 'Liste chercheur',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/admin/kosc/chercheur/list']
                        },
                        {
                            label: 'Liste region',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/admin/kosc/region/list']
                        },
                        {
                            label: 'Liste technicien',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/admin/kosc/technicien/list']
                        },
                        {
                            label: 'Liste entreprise',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/admin/kosc/entreprise/list']
                        },
                        {
                            label: 'Liste arret travail',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/admin/kosc/arret-travail/list']
                        },
                        {
                            label: 'Liste departement',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/admin/kosc/departement/list']
                        },
                    ]
                },
                {
                    label: 'Configuration',
                    icon: 'pi pi-wallet',
                    items: [
                        {
                            label: 'Liste template email report',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/admin/kosc/template-email-report/list']
                        },
                        {
                            label: 'Liste template suivi',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/admin/kosc/template-suivi/list']
                        },
                        {
                            label: 'Liste template email client injoinable',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/admin/kosc/template-email-client-injoinable/list']
                        },
                        {
                            label: 'Liste template email kosc',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/admin/kosc/template-email-kosc/list']
                        },
                        {
                            label: 'Liste template email replanification',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/admin/kosc/template-email-replanification/list']
                        },
                        {
                            label: 'Liste template email cloture',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/admin/kosc/template-email-cloture/list']
                        },
                        {
                            label: 'Liste template email planification',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/admin/kosc/template-email-planification/list']
                        },
                    ]
                },
                {
                    label: 'Referentiel',
                    icon: 'pi pi-wallet',
                    items: [
                        {
                            label: 'Liste etat demande kosc',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/admin/kosc/etat-demande-kosc/list']
                        },
                        {
                            label: 'Liste kosc employee',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/admin/kosc/kosc-employee/list']
                        },
                        {
                            label: 'Liste client',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/admin/kosc/client/list']
                        },
                        {
                            label: 'Liste operator',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/admin/kosc/operator/list']
                        },
                    ]
                },
            ];

        this.en_modelchercheur =
            [
                {
                    label: 'Configuration',
                    icon: 'pi pi-wallet',
                    items: [
                        {
                            label: 'List template email report',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/chercheur/kosc/template-email-report/list']
                        },
                        {
                            label: 'Tracking template list',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/chercheur/kosc/template-suivi/list']
                        },
                        {
                            label: 'List of unreachable customer email templates',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/chercheur/kosc/template-email-client-injoinable/list']
                        },
                        {
                            label: 'List template email kosc',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/chercheur/kosc/template-email-kosc/list']
                        },
                        {
                            label: 'List template email rescheduling',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/chercheur/kosc/template-email-replanification/list']
                        },
                        {
                            label: 'Closing email template list',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/chercheur/kosc/template-email-cloture/list']
                        },
                        {
                            label: 'List template email planning',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/chercheur/kosc/template-email-planification/list']
                        },
                    ]
                },
                {
                    label: 'Technician Management',
                    icon: 'pi pi-wallet',
                    items: [
                        {
                            label: 'List of work stoppage reasons',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/chercheur/kosc/raison-arret-travail/list']
                        },
                        {
                            label: 'List of technicians departments',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/chercheur/kosc/departement-technicien/list']
                        },
                        {
                            label: 'List of researchers',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/chercheur/kosc/chercheur/list']
                        },
                        {
                            label: 'List of regions',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/chercheur/kosc/region/list']
                        },
                        {
                            label: 'List of technicians',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/chercheur/kosc/technicien/list']
                        },
                        {
                            label: 'List of companies',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/chercheur/kosc/entreprise/list']
                        },
                        {
                            label: 'List of work stoppages',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/chercheur/kosc/arret-travail/list']
                        },
                        {
                            label: 'List of departements',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/chercheur/kosc/departement/list']
                        },
                    ]
                },
                {
                    label: 'Kosc Order',
                    icon: 'pi pi-wallet',
                    items: [
                        {
                            label: 'List of kosc orders',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/chercheur/kosc/ordre-kosc/list']
                        },
                    ]
                },
                {
                    label: 'Referencial',
                    icon: 'pi pi-wallet',
                    items: [
                        {
                            label: 'kosc request status list',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/chercheur/kosc/etat-demande-kosc/list']
                        },
                        {
                            label: 'Employee kosc list',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/chercheur/kosc/kosc-employee/list']
                        },
                        {
                            label: 'Customers list',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/chercheur/kosc/client/list']
                        },
                        {
                            label: 'Operators List',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/chercheur/kosc/operator/list']
                        },
                    ]
                },
            ];
        this.en_modeladmin =
            [
                {
                    label: 'Kosc Order',
                    icon: 'pi pi-wallet',
                    items: [
                        {
                            label: 'List of kosc orders',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/admin/kosc/ordre-kosc/list']
                        },
                        {
                            label: 'Take appointment kosc order',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/admin/kosc/ordre-kosc-prise-rdv/list']
                        },
                        // {
                        //     label: 'Assignment technician kosc order',
                        //     icon: 'pi pi-fw pi-plus-circle',
                        //     routerLink: ['/app/admin/kosc/ordre-kosc-affectation-technicien/list']
                        // },
                        {
                            label: 'Tracking kosc order',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/admin/kosc/ordre-kosc-suivi/list']
                        },
                        // {
                        //     label: 'Historique suivi kosc ordre',
                        //     icon: 'pi pi-fw pi-plus-circle',
                        //     routerLink: ['/app/admin/kosc/ordre-kosc-suivi-historique/list']
                        // },
                    ]
                },
                {
                    label: 'Technician Management',
                    icon: 'pi pi-wallet',
                    items: [
                        {
                            label: 'List of work stoppage reasons',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/admin/kosc/raison-arret-travail/list']
                        },
                        {
                            label: 'List of technicians departments',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/admin/kosc/departement-technicien/list']
                        },
                        {
                            label: 'List of researchers',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/admin/kosc/chercheur/list']
                        },
                        {
                            label: 'List of regions',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/admin/kosc/region/list']
                        },
                        {
                            label: 'List of technicians',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/admin/kosc/technicien/list']
                        },
                        {
                            label: 'List of companies',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/admin/kosc/entreprise/list']
                        },
                        {
                            label: 'List of work stoppages',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/admin/kosc/arret-travail/list']
                        },
                        {
                            label: 'List departements',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/admin/kosc/departement/list']
                        },
                    ]
                },
                {
                    label: 'Configuration',
                    icon: 'pi pi-wallet',
                    items: [
                        {
                            label: 'List template email report',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/admin/kosc/template-email-report/list']
                        },
                        {
                            label: 'Tracking template list',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/admin/kosc/template-suivi/list']
                        },
                        {
                            label: 'List of unreachable customer email templates',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/admin/kosc/template-email-client-injoinable/list']
                        },
                        {
                            label: 'List template email kosc',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/admin/kosc/template-email-kosc/list']
                        },
                        {
                            label: 'List template email rescheduling',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/admin/kosc/template-email-replanification/list']
                        },
                        {
                            label: 'Closing email template list',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/admin/kosc/template-email-cloture/list']
                        },
                        {
                            label: 'List template email planning',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/admin/kosc/template-email-planification/list']
                        },
                    ]
                },
                {
                    label: 'Referencial',
                    icon: 'pi pi-wallet',
                    items: [
                        {
                            label: 'kosc request status list',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/admin/kosc/etat-demande-kosc/list']
                        },
                        {
                            label: 'Employee kosc list',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/admin/kosc/kosc-employee/list']
                        },
                        {
                            label: 'Customers list',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/admin/kosc/client/list']
                        },
                        {
                            label: 'Operators List',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/admin/kosc/operator/list']
                        },
                    ]
                },
            ];

        if (this.authService.authenticated) {
            if (this.authService.authenticatedUser.roles) {

                this.authService.authenticatedUser.roles.forEach(role => {
                    const roleName: string = this.getRole(role);
                    this.roleService._role.next(roleName.toUpperCase());
                    eval('this.model = this.model' + this.getRole(role));
                    eval('this.en_model = this.en_model' + this.getRole(role));
                });
            }

        }
    }

    getRole(text) {
        const [role, ...rest] = text.split('_');
        return rest.join('').toLowerCase();
    }

    onMenuClick(event) {
        this.appMain.onMenuClick(event);
    }
}

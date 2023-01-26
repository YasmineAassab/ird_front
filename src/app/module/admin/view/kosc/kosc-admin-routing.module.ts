// const root = environment.rootAppUrl;

import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AuthGuard} from 'src/app/controller/guards/auth.guard';


import {RaisonArretTravailAdminComponent} from './raison-arret-travail-admin/raison-arret-travail-admin.component';


import {EtatDemandeKoscAdminComponent} from './etat-demande-kosc-admin/etat-demande-kosc-admin.component';


import {TemplateEmailReportAdminComponent} from './template-email-report-admin/template-email-report-admin.component';


import {KoscEmployeeAdminComponent} from './kosc-employee-admin/kosc-employee-admin.component';


import {TemplateSuiviAdminComponent} from './template-suivi-admin/template-suivi-admin.component';


import {DepartementTechnicienAdminComponent} from './departement-technicien-admin/departement-technicien-admin.component';


import {ClientAdminComponent} from './client-admin/client-admin.component';


import {ChercheurAdminComponent} from './chercheur-admin/chercheur-admin.component';


import {
    TemplateEmailClientInjoinableAdminComponent
} from './template-email-client-injoinable-admin/template-email-client-injoinable-admin.component';


import {RegionAdminComponent} from './region-admin/region-admin.component';


import {TemplateEmailKoscAdminComponent} from './template-email-kosc-admin/template-email-kosc-admin.component';


import {TechnicienAdminComponent} from './technicien-admin/technicien-admin.component';


import {OperatorAdminComponent} from './operator-admin/operator-admin.component';


import {
    TemplateEmailReplanificationAdminComponent
} from './template-email-replanification-admin/template-email-replanification-admin.component';


import {TemplateEmailClotureAdminComponent} from './template-email-cloture-admin/template-email-cloture-admin.component';


import {EntrepriseAdminComponent} from './entreprise-admin/entreprise-admin.component';


import {OrdreKoscAdminComponent} from './ordre-kosc-admin/ordre-kosc-admin.component';


import {TemplateEmailPlanificationAdminComponent} from './template-email-planification-admin/template-email-planification-admin.component';


import {ArretTravailAdminComponent} from './arret-travail-admin/arret-travail-admin.component';


import {DepartementAdminComponent} from './departement-admin/departement-admin.component';
import {OrdreKoscPriseRdvAdminComponent} from './ordre-kosc-prise-rdv-admin/ordre-kosc-prise-rdv-admin.component';
import {OrdreKoscSuiviAdminComponent} from './ordre-kosc-suivi-admin/ordre-kosc-suivi-admin.component';
import {
    OrdreKoscAffectationTechnicienAdminComponent
} from './ordre-kosc-affectation-technicien-admin/ordre-kosc-affectation-technicien-admin.component';
import {OrdreKoscSuiviHistoriqueAdminComponent} from './ordre-kosc-suivi-historique-admin/ordre-kosc-suivi-historique-admin.component';


@NgModule({
    imports: [
        RouterModule.forChild(
            [
                {
                    path: '',
                    children: [


                        {

                            path: 'raison-arret-travail',
                            children: [
                                {
                                    path: 'list',
                                    component: RaisonArretTravailAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'etat-demande-kosc',
                            children: [
                                {
                                    path: 'list',
                                    component: EtatDemandeKoscAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'template-email-report',
                            children: [
                                {
                                    path: 'list',
                                    component: TemplateEmailReportAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'kosc-employee',
                            children: [
                                {
                                    path: 'list',
                                    component: KoscEmployeeAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'template-suivi',
                            children: [
                                {
                                    path: 'list',
                                    component: TemplateSuiviAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'departement-technicien',
                            children: [
                                {
                                    path: 'list',
                                    component: DepartementTechnicienAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'client',
                            children: [
                                {
                                    path: 'list',
                                    component: ClientAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'chercheur',
                            children: [
                                {
                                    path: 'list',
                                    component: ChercheurAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'template-email-client-injoinable',
                            children: [
                                {
                                    path: 'list',
                                    component: TemplateEmailClientInjoinableAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'region',
                            children: [
                                {
                                    path: 'list',
                                    component: RegionAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'template-email-kosc',
                            children: [
                                {
                                    path: 'list',
                                    component: TemplateEmailKoscAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'technicien',
                            children: [
                                {
                                    path: 'list',
                                    component: TechnicienAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'operator',
                            children: [
                                {
                                    path: 'list',
                                    component: OperatorAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'template-email-replanification',
                            children: [
                                {
                                    path: 'list',
                                    component: TemplateEmailReplanificationAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'template-email-cloture',
                            children: [
                                {
                                    path: 'list',
                                    component: TemplateEmailClotureAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'entreprise',
                            children: [
                                {
                                    path: 'list',
                                    component: EntrepriseAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'ordre-kosc',
                            children: [
                                {
                                    path: 'list',
                                    component: OrdreKoscAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'ordre-kosc-prise-rdv',
                            children: [
                                {
                                    path: 'list',
                                    component: OrdreKoscPriseRdvAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'ordre-kosc-affectation-technicien',
                            children: [
                                {
                                    path: 'list',
                                    component: OrdreKoscAffectationTechnicienAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {
                            path: 'ordre-kosc-suivi',
                            children: [
                                {
                                    path: 'list',
                                    component: OrdreKoscSuiviAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {
                            path: 'ordre-kosc-suivi-historique',
                            children: [
                                {
                                    path: 'list',
                                    component: OrdreKoscSuiviHistoriqueAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'template-email-planification',
                            children: [
                                {
                                    path: 'list',
                                    component: TemplateEmailPlanificationAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'arret-travail',
                            children: [
                                {
                                    path: 'list',
                                    component: ArretTravailAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'departement',
                            children: [
                                {
                                    path: 'list',
                                    component: DepartementAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                    ]
                },
            ]
        ),
    ],
    exports: [RouterModule],
})
export class KoscAdminRoutingModule {
}

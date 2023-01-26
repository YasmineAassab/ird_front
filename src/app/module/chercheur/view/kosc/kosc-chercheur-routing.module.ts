
// const root = environment.rootAppUrl;

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/controller/guards/auth.guard';



    import { RaisonArretTravailChercheurComponent } from './raison-arret-travail-chercheur/raison-arret-travail-chercheur.component';



    import { EtatDemandeKoscChercheurComponent } from './etat-demande-kosc-chercheur/etat-demande-kosc-chercheur.component';



    import { TemplateEmailReportChercheurComponent } from './template-email-report-chercheur/template-email-report-chercheur.component';



    import { KoscEmployeeChercheurComponent } from './kosc-employee-chercheur/kosc-employee-chercheur.component';



    import { TemplateSuiviChercheurComponent } from './template-suivi-chercheur/template-suivi-chercheur.component';



    import { DepartementTechnicienChercheurComponent } from './departement-technicien-chercheur/departement-technicien-chercheur.component';



    import { ClientChercheurComponent } from './client-chercheur/client-chercheur.component';



    import { ChercheurChercheurComponent } from './chercheur-chercheur/chercheur-chercheur.component';



    import { TemplateEmailClientInjoinableChercheurComponent } from './template-email-client-injoinable-chercheur/template-email-client-injoinable-chercheur.component';



    import { RegionChercheurComponent } from './region-chercheur/region-chercheur.component';



    import { TemplateEmailKoscChercheurComponent } from './template-email-kosc-chercheur/template-email-kosc-chercheur.component';



    import { TechnicienChercheurComponent } from './technicien-chercheur/technicien-chercheur.component';



    import { OperatorChercheurComponent } from './operator-chercheur/operator-chercheur.component';



    import { TemplateEmailReplanificationChercheurComponent } from './template-email-replanification-chercheur/template-email-replanification-chercheur.component';



    import { TemplateEmailClotureChercheurComponent } from './template-email-cloture-chercheur/template-email-cloture-chercheur.component';



    import { EntrepriseChercheurComponent } from './entreprise-chercheur/entreprise-chercheur.component';



    import { OrdreKoscChercheurComponent } from './ordre-kosc-chercheur/ordre-kosc-chercheur.component';



    import { TemplateEmailPlanificationChercheurComponent } from './template-email-planification-chercheur/template-email-planification-chercheur.component';



    import { ArretTravailChercheurComponent } from './arret-travail-chercheur/arret-travail-chercheur.component';



    import { DepartementChercheurComponent } from './departement-chercheur/departement-chercheur.component';


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
                                    component: RaisonArretTravailChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'etat-demande-kosc',
                            children: [
                                {
                                    path: 'list',
                                    component: EtatDemandeKoscChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'template-email-report',
                            children: [
                                {
                                    path: 'list',
                                    component: TemplateEmailReportChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'kosc-employee',
                            children: [
                                {
                                    path: 'list',
                                    component: KoscEmployeeChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'template-suivi',
                            children: [
                                {
                                    path: 'list',
                                    component: TemplateSuiviChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'departement-technicien',
                            children: [
                                {
                                    path: 'list',
                                    component: DepartementTechnicienChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'client',
                            children: [
                                {
                                    path: 'list',
                                    component: ClientChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'chercheur',
                            children: [
                                {
                                    path: 'list',
                                    component: ChercheurChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'template-email-client-injoinable',
                            children: [
                                {
                                    path: 'list',
                                    component: TemplateEmailClientInjoinableChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'region',
                            children: [
                                {
                                    path: 'list',
                                    component: RegionChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'template-email-kosc',
                            children: [
                                {
                                    path: 'list',
                                    component: TemplateEmailKoscChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'technicien',
                            children: [
                                {
                                    path: 'list',
                                    component: TechnicienChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'operator',
                            children: [
                                {
                                    path: 'list',
                                    component: OperatorChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'template-email-replanification',
                            children: [
                                {
                                    path: 'list',
                                    component: TemplateEmailReplanificationChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'template-email-cloture',
                            children: [
                                {
                                    path: 'list',
                                    component: TemplateEmailClotureChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'entreprise',
                            children: [
                                {
                                    path: 'list',
                                    component: EntrepriseChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'ordre-kosc',
                            children: [
                                {
                                    path: 'list',
                                    component: OrdreKoscChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'template-email-planification',
                            children: [
                                {
                                    path: 'list',
                                    component: TemplateEmailPlanificationChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'arret-travail',
                            children: [
                                {
                                    path: 'list',
                                    component: ArretTravailChercheurComponent ,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'departement',
                            children: [
                                {
                                    path: 'list',
                                    component: DepartementChercheurComponent ,
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
export class KoscChercheurRoutingModule { }

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ToastModule} from 'primeng/toast';
import {ToolbarModule} from 'primeng/toolbar';
import {TableModule} from 'primeng/table';
import {DropdownModule} from 'primeng/dropdown';
import {InputSwitchModule} from 'primeng/inputswitch';
import {InputTextareaModule} from 'primeng/inputtextarea';

import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {DialogModule} from 'primeng/dialog';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CalendarModule} from 'primeng/calendar';
import {PanelModule} from 'primeng/panel';
import {InputNumberModule} from 'primeng/inputnumber';
import {BadgeModule} from 'primeng/badge';
import {MultiSelectModule} from 'primeng/multiselect';

import {
    RaisonArretTravailCreateAdminComponent
} from './raison-arret-travail-admin/create-admin/raison-arret-travail-create-admin.component';
import {RaisonArretTravailEditAdminComponent} from './raison-arret-travail-admin/edit-admin/raison-arret-travail-edit-admin.component';
import {RaisonArretTravailViewAdminComponent} from './raison-arret-travail-admin/view-admin/raison-arret-travail-view-admin.component';
import {RaisonArretTravailListAdminComponent} from './raison-arret-travail-admin/list-admin/raison-arret-travail-list-admin.component';
import {RaisonArretTravailAdminComponent} from './raison-arret-travail-admin/raison-arret-travail-admin.component';
import {EtatDemandeKoscCreateAdminComponent} from './etat-demande-kosc-admin/create-admin/etat-demande-kosc-create-admin.component';
import {EtatDemandeKoscEditAdminComponent} from './etat-demande-kosc-admin/edit-admin/etat-demande-kosc-edit-admin.component';
import {EtatDemandeKoscViewAdminComponent} from './etat-demande-kosc-admin/view-admin/etat-demande-kosc-view-admin.component';
import {EtatDemandeKoscListAdminComponent} from './etat-demande-kosc-admin/list-admin/etat-demande-kosc-list-admin.component';
import {EtatDemandeKoscAdminComponent} from './etat-demande-kosc-admin/etat-demande-kosc-admin.component';
import {
    TemplateEmailReportCreateAdminComponent
} from './template-email-report-admin/create-admin/template-email-report-create-admin.component';
import {TemplateEmailReportEditAdminComponent} from './template-email-report-admin/edit-admin/template-email-report-edit-admin.component';
import {TemplateEmailReportViewAdminComponent} from './template-email-report-admin/view-admin/template-email-report-view-admin.component';
import {TemplateEmailReportListAdminComponent} from './template-email-report-admin/list-admin/template-email-report-list-admin.component';
import {TemplateEmailReportAdminComponent} from './template-email-report-admin/template-email-report-admin.component';
import {KoscEmployeeCreateAdminComponent} from './kosc-employee-admin/create-admin/kosc-employee-create-admin.component';
import {KoscEmployeeEditAdminComponent} from './kosc-employee-admin/edit-admin/kosc-employee-edit-admin.component';
import {KoscEmployeeViewAdminComponent} from './kosc-employee-admin/view-admin/kosc-employee-view-admin.component';
import {KoscEmployeeListAdminComponent} from './kosc-employee-admin/list-admin/kosc-employee-list-admin.component';
import {KoscEmployeeAdminComponent} from './kosc-employee-admin/kosc-employee-admin.component';
import {TemplateSuiviCreateAdminComponent} from './template-suivi-admin/create-admin/template-suivi-create-admin.component';
import {TemplateSuiviEditAdminComponent} from './template-suivi-admin/edit-admin/template-suivi-edit-admin.component';
import {TemplateSuiviViewAdminComponent} from './template-suivi-admin/view-admin/template-suivi-view-admin.component';
import {TemplateSuiviListAdminComponent} from './template-suivi-admin/list-admin/template-suivi-list-admin.component';
import {TemplateSuiviAdminComponent} from './template-suivi-admin/template-suivi-admin.component';
import {
    DepartementTechnicienCreateAdminComponent
} from './departement-technicien-admin/create-admin/departement-technicien-create-admin.component';
import {
    DepartementTechnicienEditAdminComponent
} from './departement-technicien-admin/edit-admin/departement-technicien-edit-admin.component';
import {
    DepartementTechnicienViewAdminComponent
} from './departement-technicien-admin/view-admin/departement-technicien-view-admin.component';
import {
    DepartementTechnicienListAdminComponent
} from './departement-technicien-admin/list-admin/departement-technicien-list-admin.component';
import {DepartementTechnicienAdminComponent} from './departement-technicien-admin/departement-technicien-admin.component';
import {ClientCreateAdminComponent} from './client-admin/create-admin/client-create-admin.component';
import {ClientEditAdminComponent} from './client-admin/edit-admin/client-edit-admin.component';
import {ClientViewAdminComponent} from './client-admin/view-admin/client-view-admin.component';
import {ClientListAdminComponent} from './client-admin/list-admin/client-list-admin.component';
import {ClientAdminComponent} from './client-admin/client-admin.component';
import {ChercheurCreateAdminComponent} from './chercheur-admin/create-admin/chercheur-create-admin.component';
import {ChercheurEditAdminComponent} from './chercheur-admin/edit-admin/chercheur-edit-admin.component';
import {ChercheurViewAdminComponent} from './chercheur-admin/view-admin/chercheur-view-admin.component';
import {ChercheurListAdminComponent} from './chercheur-admin/list-admin/chercheur-list-admin.component';
import {ChercheurAdminComponent} from './chercheur-admin/chercheur-admin.component';
import {
    TemplateEmailClientInjoinableCreateAdminComponent
} from './template-email-client-injoinable-admin/create-admin/template-email-client-injoinable-create-admin.component';
import {
    TemplateEmailClientInjoinableEditAdminComponent
} from './template-email-client-injoinable-admin/edit-admin/template-email-client-injoinable-edit-admin.component';
import {
    TemplateEmailClientInjoinableViewAdminComponent
} from './template-email-client-injoinable-admin/view-admin/template-email-client-injoinable-view-admin.component';
import {
    TemplateEmailClientInjoinableListAdminComponent
} from './template-email-client-injoinable-admin/list-admin/template-email-client-injoinable-list-admin.component';
import {
    TemplateEmailClientInjoinableAdminComponent
} from './template-email-client-injoinable-admin/template-email-client-injoinable-admin.component';
import {RegionCreateAdminComponent} from './region-admin/create-admin/region-create-admin.component';
import {RegionEditAdminComponent} from './region-admin/edit-admin/region-edit-admin.component';
import {RegionViewAdminComponent} from './region-admin/view-admin/region-view-admin.component';
import {RegionListAdminComponent} from './region-admin/list-admin/region-list-admin.component';
import {RegionAdminComponent} from './region-admin/region-admin.component';
import {TemplateEmailKoscCreateAdminComponent} from './template-email-kosc-admin/create-admin/template-email-kosc-create-admin.component';
import {TemplateEmailKoscEditAdminComponent} from './template-email-kosc-admin/edit-admin/template-email-kosc-edit-admin.component';
import {TemplateEmailKoscViewAdminComponent} from './template-email-kosc-admin/view-admin/template-email-kosc-view-admin.component';
import {TemplateEmailKoscListAdminComponent} from './template-email-kosc-admin/list-admin/template-email-kosc-list-admin.component';
import {TemplateEmailKoscAdminComponent} from './template-email-kosc-admin/template-email-kosc-admin.component';
import {TechnicienCreateAdminComponent} from './technicien-admin/create-admin/technicien-create-admin.component';
import {TechnicienEditAdminComponent} from './technicien-admin/edit-admin/technicien-edit-admin.component';
import {TechnicienViewAdminComponent} from './technicien-admin/view-admin/technicien-view-admin.component';
import {TechnicienListAdminComponent} from './technicien-admin/list-admin/technicien-list-admin.component';
import {TechnicienAdminComponent} from './technicien-admin/technicien-admin.component';
import {OperatorCreateAdminComponent} from './operator-admin/create-admin/operator-create-admin.component';
import {OperatorEditAdminComponent} from './operator-admin/edit-admin/operator-edit-admin.component';
import {OperatorViewAdminComponent} from './operator-admin/view-admin/operator-view-admin.component';
import {OperatorListAdminComponent} from './operator-admin/list-admin/operator-list-admin.component';
import {OperatorAdminComponent} from './operator-admin/operator-admin.component';
import {
    TemplateEmailReplanificationCreateAdminComponent
} from './template-email-replanification-admin/create-admin/template-email-replanification-create-admin.component';
import {
    TemplateEmailReplanificationEditAdminComponent
} from './template-email-replanification-admin/edit-admin/template-email-replanification-edit-admin.component';
import {
    TemplateEmailReplanificationViewAdminComponent
} from './template-email-replanification-admin/view-admin/template-email-replanification-view-admin.component';
import {
    TemplateEmailReplanificationListAdminComponent
} from './template-email-replanification-admin/list-admin/template-email-replanification-list-admin.component';
import {
    TemplateEmailReplanificationAdminComponent
} from './template-email-replanification-admin/template-email-replanification-admin.component';
import {
    TemplateEmailClotureCreateAdminComponent
} from './template-email-cloture-admin/create-admin/template-email-cloture-create-admin.component';
import {
    TemplateEmailClotureEditAdminComponent
} from './template-email-cloture-admin/edit-admin/template-email-cloture-edit-admin.component';
import {
    TemplateEmailClotureViewAdminComponent
} from './template-email-cloture-admin/view-admin/template-email-cloture-view-admin.component';
import {
    TemplateEmailClotureListAdminComponent
} from './template-email-cloture-admin/list-admin/template-email-cloture-list-admin.component';
import {TemplateEmailClotureAdminComponent} from './template-email-cloture-admin/template-email-cloture-admin.component';
import {EntrepriseCreateAdminComponent} from './entreprise-admin/create-admin/entreprise-create-admin.component';
import {EntrepriseEditAdminComponent} from './entreprise-admin/edit-admin/entreprise-edit-admin.component';
import {EntrepriseViewAdminComponent} from './entreprise-admin/view-admin/entreprise-view-admin.component';
import {EntrepriseListAdminComponent} from './entreprise-admin/list-admin/entreprise-list-admin.component';
import {EntrepriseAdminComponent} from './entreprise-admin/entreprise-admin.component';
import {OrdreKoscCreateAdminComponent} from './ordre-kosc-admin/create-admin/ordre-kosc-create-admin.component';
import {OrdreKoscEditAdminComponent} from './ordre-kosc-admin/edit-admin/ordre-kosc-edit-admin.component';
import {OrdreKoscViewAdminComponent} from './ordre-kosc-admin/view-admin/ordre-kosc-view-admin.component';
import {OrdreKoscListAdminComponent} from './ordre-kosc-admin/list-admin/ordre-kosc-list-admin.component';
import {OrdreKoscAdminComponent} from './ordre-kosc-admin/ordre-kosc-admin.component';
import {
    TemplateEmailPlanificationCreateAdminComponent
} from './template-email-planification-admin/create-admin/template-email-planification-create-admin.component';
import {
    TemplateEmailPlanificationEditAdminComponent
} from './template-email-planification-admin/edit-admin/template-email-planification-edit-admin.component';
import {
    TemplateEmailPlanificationViewAdminComponent
} from './template-email-planification-admin/view-admin/template-email-planification-view-admin.component';
import {
    TemplateEmailPlanificationListAdminComponent
} from './template-email-planification-admin/list-admin/template-email-planification-list-admin.component';
import {TemplateEmailPlanificationAdminComponent} from './template-email-planification-admin/template-email-planification-admin.component';
import {ArretTravailCreateAdminComponent} from './arret-travail-admin/create-admin/arret-travail-create-admin.component';
import {ArretTravailEditAdminComponent} from './arret-travail-admin/edit-admin/arret-travail-edit-admin.component';
import {ArretTravailViewAdminComponent} from './arret-travail-admin/view-admin/arret-travail-view-admin.component';
import {ArretTravailListAdminComponent} from './arret-travail-admin/list-admin/arret-travail-list-admin.component';
import {ArretTravailAdminComponent} from './arret-travail-admin/arret-travail-admin.component';
import {DepartementCreateAdminComponent} from './departement-admin/create-admin/departement-create-admin.component';
import {DepartementEditAdminComponent} from './departement-admin/edit-admin/departement-edit-admin.component';
import {DepartementViewAdminComponent} from './departement-admin/view-admin/departement-view-admin.component';
import {DepartementListAdminComponent} from './departement-admin/list-admin/departement-list-admin.component';
import {DepartementAdminComponent} from './departement-admin/departement-admin.component';

import {PasswordModule} from 'primeng/password';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {TabViewModule} from 'primeng/tabview';
import {SplitButtonModule} from 'primeng/splitbutton';
import {MessageModule} from 'primeng/message';
import {MessagesModule} from 'primeng/messages';
import {OrdreKoscPriseRdvAdminComponent} from './ordre-kosc-prise-rdv-admin/ordre-kosc-prise-rdv-admin.component';
import {OrdreKoscPriseRdvListAdminComponent} from './ordre-kosc-prise-rdv-admin/list-admin/ordre-kosc-prise-rdv-list-admin.component';
import {OrdreKoscPriseRdvViewAdminComponent} from './ordre-kosc-prise-rdv-admin/view-admin/ordre-kosc-prise-rdv-view-admin.component';
import {OrdreKoscPriseRdvEditAdminComponent} from './ordre-kosc-prise-rdv-admin/edit-admin/ordre-kosc-prise-rdv-edit-admin.component';
import {OrdreKoscSuiviAdminComponent} from './ordre-kosc-suivi-admin/ordre-kosc-suivi-admin.component';
import {OrdreKoscSuiviListAdminComponent} from './ordre-kosc-suivi-admin/list-admin/ordre-kosc-suivi-list-admin.component';
import {OrdreKoscSuiviViewAdminComponent} from './ordre-kosc-suivi-admin/view-admin/ordre-kosc-suivi-view-admin.component';
import {OrdreKoscSuiviEditAdminComponent} from './ordre-kosc-suivi-admin/edit-admin/ordre-kosc-suivi-edit-admin.component';
import {
    OrdreKoscAffectationTechnicienListAdminComponent
} from './ordre-kosc-affectation-technicien-admin/list-admin/ordre-kosc-affectation-technicien-list-admin.component';
import {
    OrdreKoscAffectationTechnicienAdminComponent
} from './ordre-kosc-affectation-technicien-admin/ordre-kosc-affectation-technicien-admin.component';
import {
    OrdreKoscAffectationTechnicienViewAdminComponent
} from './ordre-kosc-affectation-technicien-admin/view-admin/ordre-kosc-affectation-technicien-view-admin.component';
import {
    OrdreKoscAffectationTechnicienEditAdminComponent
} from './ordre-kosc-affectation-technicien-admin/edit-admin/ordre-kosc-affectation-technicien-edit-admin.component';
import {OrdreKoscSuiviHistoriqueAdminComponent} from './ordre-kosc-suivi-historique-admin/ordre-kosc-suivi-historique-admin.component';
import {
    OrdreKoscSuiviHistoriqueViewAdminComponent
} from './ordre-kosc-suivi-historique-admin/view-admin/ordre-kosc-suivi-historique-view-admin.component';
import {
    OrdreKoscSuiviHistoriqueEditAdminComponent
} from './ordre-kosc-suivi-historique-admin/edit-admin/ordre-kosc-suivi-historique-edit-admin.component';
import {
    OrdreKoscSuiviHistoriqueListAdminComponent
} from './ordre-kosc-suivi-historique-admin/list-admin/ordre-kosc-suivi-historique-list-admin.component';
import {FileUploadModule} from 'primeng/fileupload';
import {TranslateModule} from '@ngx-translate/core';


@NgModule({
    declarations: [
        RaisonArretTravailCreateAdminComponent,
        RaisonArretTravailListAdminComponent,
        RaisonArretTravailViewAdminComponent,
        RaisonArretTravailEditAdminComponent,
        RaisonArretTravailAdminComponent,
        EtatDemandeKoscCreateAdminComponent,
        EtatDemandeKoscListAdminComponent,
        EtatDemandeKoscViewAdminComponent,
        EtatDemandeKoscEditAdminComponent,
        EtatDemandeKoscAdminComponent,
        TemplateEmailReportCreateAdminComponent,
        TemplateEmailReportListAdminComponent,
        TemplateEmailReportViewAdminComponent,
        TemplateEmailReportEditAdminComponent,
        TemplateEmailReportAdminComponent,
        KoscEmployeeCreateAdminComponent,
        KoscEmployeeListAdminComponent,
        KoscEmployeeViewAdminComponent,
        KoscEmployeeEditAdminComponent,
        KoscEmployeeAdminComponent,
        TemplateSuiviCreateAdminComponent,
        TemplateSuiviListAdminComponent,
        TemplateSuiviViewAdminComponent,
        TemplateSuiviEditAdminComponent,
        TemplateSuiviAdminComponent,
        DepartementTechnicienCreateAdminComponent,
        DepartementTechnicienListAdminComponent,
        DepartementTechnicienViewAdminComponent,
        DepartementTechnicienEditAdminComponent,
        DepartementTechnicienAdminComponent,
        ClientCreateAdminComponent,
        ClientListAdminComponent,
        ClientViewAdminComponent,
        ClientEditAdminComponent,
        ClientAdminComponent,
        ChercheurCreateAdminComponent,
        ChercheurListAdminComponent,
        ChercheurViewAdminComponent,
        ChercheurEditAdminComponent,
        ChercheurAdminComponent,
        TemplateEmailClientInjoinableCreateAdminComponent,
        TemplateEmailClientInjoinableListAdminComponent,
        TemplateEmailClientInjoinableViewAdminComponent,
        TemplateEmailClientInjoinableEditAdminComponent,
        TemplateEmailClientInjoinableAdminComponent,
        RegionCreateAdminComponent,
        RegionListAdminComponent,
        RegionViewAdminComponent,
        RegionEditAdminComponent,
        RegionAdminComponent,
        TemplateEmailKoscCreateAdminComponent,
        TemplateEmailKoscListAdminComponent,
        TemplateEmailKoscViewAdminComponent,
        TemplateEmailKoscEditAdminComponent,
        TemplateEmailKoscAdminComponent,
        TechnicienCreateAdminComponent,
        TechnicienListAdminComponent,
        TechnicienViewAdminComponent,
        TechnicienEditAdminComponent,
        TechnicienAdminComponent,
        OperatorCreateAdminComponent,
        OperatorListAdminComponent,
        OperatorViewAdminComponent,
        OperatorEditAdminComponent,
        OperatorAdminComponent,
        TemplateEmailReplanificationCreateAdminComponent,
        TemplateEmailReplanificationListAdminComponent,
        TemplateEmailReplanificationViewAdminComponent,
        TemplateEmailReplanificationEditAdminComponent,
        TemplateEmailReplanificationAdminComponent,
        TemplateEmailClotureCreateAdminComponent,
        TemplateEmailClotureListAdminComponent,
        TemplateEmailClotureViewAdminComponent,
        TemplateEmailClotureEditAdminComponent,
        TemplateEmailClotureAdminComponent,
        EntrepriseCreateAdminComponent,
        EntrepriseListAdminComponent,
        EntrepriseViewAdminComponent,
        EntrepriseEditAdminComponent,
        EntrepriseAdminComponent,
        OrdreKoscCreateAdminComponent,
        OrdreKoscListAdminComponent,
        OrdreKoscViewAdminComponent,
        OrdreKoscEditAdminComponent,
        OrdreKoscAdminComponent,
        OrdreKoscPriseRdvListAdminComponent,
        OrdreKoscPriseRdvViewAdminComponent,
        OrdreKoscPriseRdvEditAdminComponent,
        OrdreKoscPriseRdvAdminComponent,
        OrdreKoscSuiviListAdminComponent,
        OrdreKoscSuiviViewAdminComponent,
        OrdreKoscSuiviEditAdminComponent,
        OrdreKoscSuiviAdminComponent,
        OrdreKoscSuiviHistoriqueListAdminComponent,
        OrdreKoscSuiviHistoriqueViewAdminComponent,
        OrdreKoscSuiviHistoriqueEditAdminComponent,
        OrdreKoscSuiviHistoriqueAdminComponent,
        OrdreKoscAffectationTechnicienListAdminComponent,
        OrdreKoscAffectationTechnicienViewAdminComponent,
        OrdreKoscAffectationTechnicienEditAdminComponent,
        OrdreKoscAffectationTechnicienAdminComponent,
        TemplateEmailPlanificationCreateAdminComponent,
        TemplateEmailPlanificationListAdminComponent,
        TemplateEmailPlanificationViewAdminComponent,
        TemplateEmailPlanificationEditAdminComponent,
        TemplateEmailPlanificationAdminComponent,
        ArretTravailCreateAdminComponent,
        ArretTravailListAdminComponent,
        ArretTravailViewAdminComponent,
        ArretTravailEditAdminComponent,
        ArretTravailAdminComponent,
        DepartementCreateAdminComponent,
        DepartementListAdminComponent,
        DepartementViewAdminComponent,
        DepartementEditAdminComponent,
        DepartementAdminComponent,
    ],
    imports: [
        CommonModule,
        ToastModule,
        ToolbarModule,
        TableModule,
        ConfirmDialogModule,
        DialogModule,
        PasswordModule,
        InputTextModule,
        ButtonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        SplitButtonModule,
        BrowserAnimationsModule,
        DropdownModule,
        TabViewModule,
        InputSwitchModule,
        InputTextareaModule,
        CalendarModule,
        PanelModule,
        MessageModule,
        MessagesModule,
        InputNumberModule,
        BadgeModule,
        MultiSelectModule,
        FileUploadModule,
        TranslateModule,
    ],
    exports: [
        RaisonArretTravailCreateAdminComponent,
        RaisonArretTravailListAdminComponent,
        RaisonArretTravailViewAdminComponent,
        RaisonArretTravailEditAdminComponent,
        RaisonArretTravailAdminComponent,
        EtatDemandeKoscCreateAdminComponent,
        EtatDemandeKoscListAdminComponent,
        EtatDemandeKoscViewAdminComponent,
        EtatDemandeKoscEditAdminComponent,
        EtatDemandeKoscAdminComponent,
        TemplateEmailReportCreateAdminComponent,
        TemplateEmailReportListAdminComponent,
        TemplateEmailReportViewAdminComponent,
        TemplateEmailReportEditAdminComponent,
        TemplateEmailReportAdminComponent,
        KoscEmployeeCreateAdminComponent,
        KoscEmployeeListAdminComponent,
        KoscEmployeeViewAdminComponent,
        KoscEmployeeEditAdminComponent,
        KoscEmployeeAdminComponent,
        TemplateSuiviCreateAdminComponent,
        TemplateSuiviListAdminComponent,
        TemplateSuiviViewAdminComponent,
        TemplateSuiviEditAdminComponent,
        TemplateSuiviAdminComponent,
        DepartementTechnicienCreateAdminComponent,
        DepartementTechnicienListAdminComponent,
        DepartementTechnicienViewAdminComponent,
        DepartementTechnicienEditAdminComponent,
        DepartementTechnicienAdminComponent,
        ClientCreateAdminComponent,
        ClientListAdminComponent,
        ClientViewAdminComponent,
        ClientEditAdminComponent,
        ClientAdminComponent,
        ChercheurCreateAdminComponent,
        ChercheurListAdminComponent,
        ChercheurViewAdminComponent,
        ChercheurEditAdminComponent,
        ChercheurAdminComponent,
        TemplateEmailClientInjoinableCreateAdminComponent,
        TemplateEmailClientInjoinableListAdminComponent,
        TemplateEmailClientInjoinableViewAdminComponent,
        TemplateEmailClientInjoinableEditAdminComponent,
        TemplateEmailClientInjoinableAdminComponent,
        RegionCreateAdminComponent,
        RegionListAdminComponent,
        RegionViewAdminComponent,
        RegionEditAdminComponent,
        RegionAdminComponent,
        TemplateEmailKoscCreateAdminComponent,
        TemplateEmailKoscListAdminComponent,
        TemplateEmailKoscViewAdminComponent,
        TemplateEmailKoscEditAdminComponent,
        TemplateEmailKoscAdminComponent,
        TechnicienCreateAdminComponent,
        TechnicienListAdminComponent,
        TechnicienViewAdminComponent,
        TechnicienEditAdminComponent,
        TechnicienAdminComponent,
        OperatorCreateAdminComponent,
        OperatorListAdminComponent,
        OperatorViewAdminComponent,
        OperatorEditAdminComponent,
        OperatorAdminComponent,
        TemplateEmailReplanificationCreateAdminComponent,
        TemplateEmailReplanificationListAdminComponent,
        TemplateEmailReplanificationViewAdminComponent,
        TemplateEmailReplanificationEditAdminComponent,
        TemplateEmailReplanificationAdminComponent,
        TemplateEmailClotureCreateAdminComponent,
        TemplateEmailClotureListAdminComponent,
        TemplateEmailClotureViewAdminComponent,
        TemplateEmailClotureEditAdminComponent,
        TemplateEmailClotureAdminComponent,
        EntrepriseCreateAdminComponent,
        EntrepriseListAdminComponent,
        EntrepriseViewAdminComponent,
        EntrepriseEditAdminComponent,
        EntrepriseAdminComponent,
        OrdreKoscCreateAdminComponent,
        OrdreKoscListAdminComponent,
        OrdreKoscViewAdminComponent,
        OrdreKoscEditAdminComponent,
        OrdreKoscAdminComponent,
        OrdreKoscPriseRdvListAdminComponent,
        OrdreKoscPriseRdvViewAdminComponent,
        OrdreKoscPriseRdvEditAdminComponent,
        OrdreKoscPriseRdvAdminComponent,
        OrdreKoscSuiviListAdminComponent,
        OrdreKoscSuiviViewAdminComponent,
        OrdreKoscSuiviEditAdminComponent,
        OrdreKoscSuiviAdminComponent,
        OrdreKoscSuiviHistoriqueListAdminComponent,
        OrdreKoscSuiviHistoriqueViewAdminComponent,
        OrdreKoscSuiviHistoriqueEditAdminComponent,
        OrdreKoscSuiviHistoriqueAdminComponent,
        OrdreKoscAffectationTechnicienListAdminComponent,
        OrdreKoscAffectationTechnicienViewAdminComponent,
        OrdreKoscAffectationTechnicienEditAdminComponent,
        OrdreKoscAffectationTechnicienAdminComponent,
        TemplateEmailPlanificationCreateAdminComponent,
        TemplateEmailPlanificationListAdminComponent,
        TemplateEmailPlanificationViewAdminComponent,
        TemplateEmailPlanificationEditAdminComponent,
        TemplateEmailPlanificationAdminComponent,
        ArretTravailCreateAdminComponent,
        ArretTravailListAdminComponent,
        ArretTravailViewAdminComponent,
        ArretTravailEditAdminComponent,
        ArretTravailAdminComponent,
        DepartementCreateAdminComponent,
        DepartementListAdminComponent,
        DepartementViewAdminComponent,
        DepartementEditAdminComponent,
        DepartementAdminComponent,
    ]
})
export class KoscAdminModule {
}

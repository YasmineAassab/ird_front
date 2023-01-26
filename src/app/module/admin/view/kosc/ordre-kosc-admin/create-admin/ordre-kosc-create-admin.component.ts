import {Component, OnInit, Input} from '@angular/core';
import {OrdreKoscService} from 'src/app/controller/service/OrdreKosc.service';
import {OrdreKoscVo} from 'src/app/controller/model/OrdreKosc.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from 'src/app/controller/service/StringUtil.service';


import {TemplateEmailClotureVo} from 'src/app/controller/model/TemplateEmailCloture.model';
import {TemplateEmailClotureService} from 'src/app/controller/service/TemplateEmailCloture.service';
import {TemplateEmailReportVo} from 'src/app/controller/model/TemplateEmailReport.model';
import {TemplateEmailReportService} from 'src/app/controller/service/TemplateEmailReport.service';
import {EtatDemandeKoscVo} from 'src/app/controller/model/EtatDemandeKosc.model';
import {EtatDemandeKoscService} from 'src/app/controller/service/EtatDemandeKosc.service';
import {TemplateEmailClientInjoinableVo} from 'src/app/controller/model/TemplateEmailClientInjoinable.model';
import {TemplateEmailClientInjoinableService} from 'src/app/controller/service/TemplateEmailClientInjoinable.service';
import {TechnicienVo} from 'src/app/controller/model/Technicien.model';
import {TechnicienService} from 'src/app/controller/service/Technicien.service';
import {TemplateEmailReplanificationVo} from 'src/app/controller/model/TemplateEmailReplanification.model';
import {TemplateEmailReplanificationService} from 'src/app/controller/service/TemplateEmailReplanification.service';
import {TemplateSuiviVo} from 'src/app/controller/model/TemplateSuivi.model';
import {TemplateSuiviService} from 'src/app/controller/service/TemplateSuivi.service';
import {OperatorVo} from 'src/app/controller/model/Operator.model';
import {OperatorService} from 'src/app/controller/service/Operator.service';
import {DepartementVo} from 'src/app/controller/model/Departement.model';
import {DepartementService} from 'src/app/controller/service/Departement.service';
import {TemplateEmailKoscVo} from 'src/app/controller/model/TemplateEmailKosc.model';
import {TemplateEmailKoscService} from 'src/app/controller/service/TemplateEmailKosc.service';
import {ClientVo} from 'src/app/controller/model/Client.model';
import {ClientService} from 'src/app/controller/service/Client.service';
import {TemplateEmailPlanificationVo} from 'src/app/controller/model/TemplateEmailPlanification.model';
import {TemplateEmailPlanificationService} from 'src/app/controller/service/TemplateEmailPlanification.service';
@Component({
  selector: 'app-ordre-kosc-create-admin',
  templateUrl: './ordre-kosc-create-admin.component.html',
  styleUrls: ['./ordre-kosc-create-admin.component.css']
})
export class OrdreKoscCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validOrdreKoscReferenceWorkOrder = true;

    _validOperatorReference = true;
    _validOperatorLibelle = true;
    _validDepartementLibelle = true;
    _validDepartementCode = true;
    _validDepartementRegion = true;
    _validTechnicienIdentifiant = true;
    _validTemplateEmailClientInjoinableCode = true;
    _validTemplateEmailClientInjoinableLibelle = true;
    _validTemplateEmailKoscCode = true;
    _validTemplateEmailKoscLibelle = true;
    _validTemplateEmailPlanificationCode = true;
    _validTemplateEmailPlanificationLibelle = true;
    _validTemplateEmailReplanificationCode = true;
    _validTemplateEmailReplanificationLibelle = true;
    _validTemplateEmailReportCode = true;
    _validTemplateEmailReportLibelle = true;
    _validEtatDemandeKoscCode = true;
    _validEtatDemandeKoscLibelle = true;
    _validTemplateEmailClotureCode = true;
    _validTemplateEmailClotureLibelle = true;
    _validTemplateSuiviCode = true;
    _validTemplateSuiviLibelle = true;



constructor(private datePipe: DatePipe, private ordreKoscService: OrdreKoscService
 ,       private stringUtilService: StringUtilService
 ,       private roleService: RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private templateEmailClotureService: TemplateEmailClotureService
,       private templateEmailReportService: TemplateEmailReportService
,       private etatDemandeKoscService: EtatDemandeKoscService
,       private templateEmailClientInjoinableService: TemplateEmailClientInjoinableService
,       private technicienService: TechnicienService
,       private templateEmailReplanificationService: TemplateEmailReplanificationService
,       private templateSuiviService: TemplateSuiviService
,       private operatorService: OperatorService
,       private departementService: DepartementService
,       private templateEmailKoscService: TemplateEmailKoscService
,       private clientService: ClientService
,       private templateEmailPlanificationService: TemplateEmailPlanificationService
) {

}



ngOnInit(): void {

    this.selectedOperator = new OperatorVo();
    this.operatorService.findAll().subscribe((data) => this.operators = data);
    this.selectedDepartement = new DepartementVo();
    this.departementService.findAll().subscribe((data) => this.departements = data);
    this.selectedTechnicien = new TechnicienVo();
    this.technicienService.findAll().subscribe((data) => this.techniciens = data);
    this.selectedClient = new ClientVo();
    this.clientService.findAll().subscribe((data) => this.clients = data);
    this.selectedTemplateEmailClientInjoinable = new TemplateEmailClientInjoinableVo();
    this.templateEmailClientInjoinableService.findAll().subscribe((data) => this.templateEmailClientInjoinables = data);
    this.selectedTemplateEmailKosc = new TemplateEmailKoscVo();
    this.templateEmailKoscService.findAll().subscribe((data) => this.templateEmailKoscs = data);
    this.selectedTemplateEmailPlanification = new TemplateEmailPlanificationVo();
    this.templateEmailPlanificationService.findAll().subscribe((data) => this.templateEmailPlanifications = data);
    this.selectedTemplateEmailReplanification = new TemplateEmailReplanificationVo();
    this.templateEmailReplanificationService.findAll().subscribe((data) => this.templateEmailReplanifications = data);
    this.selectedTemplateEmailReport = new TemplateEmailReportVo();
    this.templateEmailReportService.findAll().subscribe((data) => this.templateEmailReports = data);
    this.selectedEtatDemandeKosc = new EtatDemandeKoscVo();
    this.etatDemandeKoscService.findAll().subscribe((data) => this.etatDemandeKoscs = data);
    this.selectedTemplateEmailCloture = new TemplateEmailClotureVo();
    this.templateEmailClotureService.findAll().subscribe((data) => this.templateEmailClotures = data);
    this.selectedTemplateSuivi = new TemplateSuiviVo();
    this.templateSuiviService.findAll().subscribe((data) => this.templateSuivis = data);
}




private setValidation(value: boolean){
    this.validOrdreKoscReferenceWorkOrder = value;
    }


public save(){
  this.submitted = true;
  this.validateForm();
  if (this.errorMessages.length === 0) {
        this.saveWithShowOption(false);
  } else {
        this.messageService.add({severity: 'error', summary: 'Erreurs', detail: 'Merci de corrigé les erreurs sur le formulaire'});
  }
}

public saveWithShowOption(showList: boolean){
     this.ordreKoscService.save().subscribe(ordreKosc=>{
      if(ordreKosc != null){
       this.ordreKoscs.push({...ordreKosc});
       this.createOrdreKoscDialog = false;
       this.submitted = false;
       this.selectedOrdreKosc = new OrdreKoscVo();

    }else{
    this.messageService.add({severity: 'error', summary: 'Erreurs',detail: 'Ordre kosc existe déjà' });
    }

    } , error =>{
        console.log(error);
    });
}

private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateOrdreKoscReferenceWorkOrder();

    }

private validateOrdreKoscReferenceWorkOrder(){
        if (this.stringUtilService.isEmpty(this.selectedOrdreKosc.referenceWorkOrder)) {
            this.errorMessages.push('Reference work order non valide');
            this.validOrdreKoscReferenceWorkOrder = false;
        } else {
            this.validOrdreKoscReferenceWorkOrder = true;
        }
    }































































































































































       public async openCreateTemplateEmailPlanification(templateEmailPlanification: string) {
          const isPermistted = await this.roleService.isPermitted('TemplateEmailPlanification', 'add');
         if(isPermistted) {
         this.selectedTemplateEmailPlanification = new TemplateEmailPlanificationVo();
         this.createTemplateEmailPlanificationDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
       public async openCreateClient(client: string) {
          const isPermistted = await this.roleService.isPermitted('Client', 'add');
         if(isPermistted) {
         this.selectedClient = new ClientVo();
         this.createClientDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
       public async openCreateTemplateEmailClientInjoinable(templateEmailClientInjoinable: string) {
          const isPermistted = await this.roleService.isPermitted('TemplateEmailClientInjoinable', 'add');
         if(isPermistted) {
         this.selectedTemplateEmailClientInjoinable = new TemplateEmailClientInjoinableVo();
         this.createTemplateEmailClientInjoinableDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
       public async openCreateTemplateEmailCloture(templateEmailCloture: string) {
          const isPermistted = await this.roleService.isPermitted('TemplateEmailCloture', 'add');
         if(isPermistted) {
         this.selectedTemplateEmailCloture = new TemplateEmailClotureVo();
         this.createTemplateEmailClotureDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
       public async openCreateTemplateEmailReport(templateEmailReport: string) {
          const isPermistted = await this.roleService.isPermitted('TemplateEmailReport', 'add');
         if(isPermistted) {
         this.selectedTemplateEmailReport = new TemplateEmailReportVo();
         this.createTemplateEmailReportDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
       public async openCreateDepartement(departement: string) {
          const isPermistted = await this.roleService.isPermitted('Departement', 'add');
         if(isPermistted) {
         this.selectedDepartement = new DepartementVo();
         this.createDepartementDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
       public async openCreateTemplateEmailReplanification(templateEmailReplanification: string) {
          const isPermistted = await this.roleService.isPermitted('TemplateEmailReplanification', 'add');
         if(isPermistted) {
         this.selectedTemplateEmailReplanification = new TemplateEmailReplanificationVo();
         this.createTemplateEmailReplanificationDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
       public async openCreateTemplateEmailKosc(templateEmailKosc: string) {
          const isPermistted = await this.roleService.isPermitted('TemplateEmailKosc', 'add');
         if(isPermistted) {
         this.selectedTemplateEmailKosc = new TemplateEmailKoscVo();
         this.createTemplateEmailKoscDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
       public async openCreateEtatDemandeKosc(etatDemandeKosc: string) {
          const isPermistted = await this.roleService.isPermitted('EtatDemandeKosc', 'add');
         if(isPermistted) {
         this.selectedEtatDemandeKosc = new EtatDemandeKoscVo();
         this.createEtatDemandeKoscDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
       public async openCreateTemplateSuivi(templateSuivi: string) {
          const isPermistted = await this.roleService.isPermitted('TemplateSuivi', 'add');
         if(isPermistted) {
         this.selectedTemplateSuivi = new TemplateSuiviVo();
         this.createTemplateSuiviDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
       public async openCreateTechnicien(technicien: string) {
          const isPermistted = await this.roleService.isPermitted('Technicien', 'add');
         if(isPermistted) {
         this.selectedTechnicien = new TechnicienVo();
         this.createTechnicienDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
       public async openCreateOperator(operator: string) {
          const isPermistted = await this.roleService.isPermitted('Operator', 'add');
         if(isPermistted) {
         this.selectedOperator = new OperatorVo();
         this.createOperatorDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}

hideCreateDialog(){
    this.createOrdreKoscDialog  = false;
    this.setValidation(true);
}

get ordreKoscs(): Array<OrdreKoscVo> {
    return this.ordreKoscService.ordreKoscs;
       }
set ordreKoscs(value: Array<OrdreKoscVo>) {
        this.ordreKoscService.ordreKoscs = value;
       }

 get selectedOrdreKosc(): OrdreKoscVo {
           return this.ordreKoscService.selectedOrdreKosc;
       }
    set selectedOrdreKosc(value: OrdreKoscVo) {
        this.ordreKoscService.selectedOrdreKosc = value;
       }

   get createOrdreKoscDialog(): boolean {
           return this.ordreKoscService.createOrdreKoscDialog;

       }
    set createOrdreKoscDialog(value: boolean) {
        this.ordreKoscService.createOrdreKoscDialog= value;
       }

       get selectedTemplateEmailPlanification(): TemplateEmailPlanificationVo {
           return this.templateEmailPlanificationService.selectedTemplateEmailPlanification;
       }
      set selectedTemplateEmailPlanification(value: TemplateEmailPlanificationVo) {
        this.templateEmailPlanificationService.selectedTemplateEmailPlanification = value;
       }
       get templateEmailPlanifications(): Array<TemplateEmailPlanificationVo> {
           return this.templateEmailPlanificationService.templateEmailPlanifications;
       }
       set templateEmailPlanifications(value: Array<TemplateEmailPlanificationVo>) {
        this.templateEmailPlanificationService.templateEmailPlanifications = value;
       }
       get createTemplateEmailPlanificationDialog(): boolean {
           return this.templateEmailPlanificationService.createTemplateEmailPlanificationDialog;
       }
      set createTemplateEmailPlanificationDialog(value: boolean) {
        this.templateEmailPlanificationService.createTemplateEmailPlanificationDialog= value;
       }
       get selectedClient(): ClientVo {
           return this.clientService.selectedClient;
       }
      set selectedClient(value: ClientVo) {
        this.clientService.selectedClient = value;
       }
       get clients(): Array<ClientVo> {
           return this.clientService.clients;
       }
       set clients(value: Array<ClientVo>) {
        this.clientService.clients = value;
       }
       get createClientDialog(): boolean {
           return this.clientService.createClientDialog;
       }
      set createClientDialog(value: boolean) {
        this.clientService.createClientDialog= value;
       }
       get selectedTemplateEmailClientInjoinable(): TemplateEmailClientInjoinableVo {
           return this.templateEmailClientInjoinableService.selectedTemplateEmailClientInjoinable;
       }
      set selectedTemplateEmailClientInjoinable(value: TemplateEmailClientInjoinableVo) {
        this.templateEmailClientInjoinableService.selectedTemplateEmailClientInjoinable = value;
       }
       get templateEmailClientInjoinables(): Array<TemplateEmailClientInjoinableVo> {
           return this.templateEmailClientInjoinableService.templateEmailClientInjoinables;
       }
       set templateEmailClientInjoinables(value: Array<TemplateEmailClientInjoinableVo>) {
        this.templateEmailClientInjoinableService.templateEmailClientInjoinables = value;
       }
       get createTemplateEmailClientInjoinableDialog(): boolean {
           return this.templateEmailClientInjoinableService.createTemplateEmailClientInjoinableDialog;
       }
      set createTemplateEmailClientInjoinableDialog(value: boolean) {
        this.templateEmailClientInjoinableService.createTemplateEmailClientInjoinableDialog= value;
       }
       get selectedTemplateEmailCloture(): TemplateEmailClotureVo {
           return this.templateEmailClotureService.selectedTemplateEmailCloture;
       }
      set selectedTemplateEmailCloture(value: TemplateEmailClotureVo) {
        this.templateEmailClotureService.selectedTemplateEmailCloture = value;
       }
       get templateEmailClotures(): Array<TemplateEmailClotureVo> {
           return this.templateEmailClotureService.templateEmailClotures;
       }
       set templateEmailClotures(value: Array<TemplateEmailClotureVo>) {
        this.templateEmailClotureService.templateEmailClotures = value;
       }
       get createTemplateEmailClotureDialog(): boolean {
           return this.templateEmailClotureService.createTemplateEmailClotureDialog;
       }
      set createTemplateEmailClotureDialog(value: boolean) {
        this.templateEmailClotureService.createTemplateEmailClotureDialog= value;
       }
       get selectedTemplateEmailReport(): TemplateEmailReportVo {
           return this.templateEmailReportService.selectedTemplateEmailReport;
       }
      set selectedTemplateEmailReport(value: TemplateEmailReportVo) {
        this.templateEmailReportService.selectedTemplateEmailReport = value;
       }
       get templateEmailReports(): Array<TemplateEmailReportVo> {
           return this.templateEmailReportService.templateEmailReports;
       }
       set templateEmailReports(value: Array<TemplateEmailReportVo>) {
        this.templateEmailReportService.templateEmailReports = value;
       }
       get createTemplateEmailReportDialog(): boolean {
           return this.templateEmailReportService.createTemplateEmailReportDialog;
       }
      set createTemplateEmailReportDialog(value: boolean) {
        this.templateEmailReportService.createTemplateEmailReportDialog= value;
       }
       get selectedDepartement(): DepartementVo {
           return this.departementService.selectedDepartement;
       }
      set selectedDepartement(value: DepartementVo) {
        this.departementService.selectedDepartement = value;
       }
       get departements(): Array<DepartementVo> {
           return this.departementService.departements;
       }
       set departements(value: Array<DepartementVo>) {
        this.departementService.departements = value;
       }
       get createDepartementDialog(): boolean {
           return this.departementService.createDepartementDialog;
       }
      set createDepartementDialog(value: boolean) {
        this.departementService.createDepartementDialog= value;
       }
       get selectedTemplateEmailReplanification(): TemplateEmailReplanificationVo {
           return this.templateEmailReplanificationService.selectedTemplateEmailReplanification;
       }
      set selectedTemplateEmailReplanification(value: TemplateEmailReplanificationVo) {
        this.templateEmailReplanificationService.selectedTemplateEmailReplanification = value;
       }
       get templateEmailReplanifications(): Array<TemplateEmailReplanificationVo> {
           return this.templateEmailReplanificationService.templateEmailReplanifications;
       }
       set templateEmailReplanifications(value: Array<TemplateEmailReplanificationVo>) {
        this.templateEmailReplanificationService.templateEmailReplanifications = value;
       }
       get createTemplateEmailReplanificationDialog(): boolean {
           return this.templateEmailReplanificationService.createTemplateEmailReplanificationDialog;
       }
      set createTemplateEmailReplanificationDialog(value: boolean) {
        this.templateEmailReplanificationService.createTemplateEmailReplanificationDialog= value;
       }
       get selectedTemplateEmailKosc(): TemplateEmailKoscVo {
           return this.templateEmailKoscService.selectedTemplateEmailKosc;
       }
      set selectedTemplateEmailKosc(value: TemplateEmailKoscVo) {
        this.templateEmailKoscService.selectedTemplateEmailKosc = value;
       }
       get templateEmailKoscs(): Array<TemplateEmailKoscVo> {
           return this.templateEmailKoscService.templateEmailKoscs;
       }
       set templateEmailKoscs(value: Array<TemplateEmailKoscVo>) {
        this.templateEmailKoscService.templateEmailKoscs = value;
       }
       get createTemplateEmailKoscDialog(): boolean {
           return this.templateEmailKoscService.createTemplateEmailKoscDialog;
       }
      set createTemplateEmailKoscDialog(value: boolean) {
        this.templateEmailKoscService.createTemplateEmailKoscDialog= value;
       }
       get selectedEtatDemandeKosc(): EtatDemandeKoscVo {
           return this.etatDemandeKoscService.selectedEtatDemandeKosc;
       }
      set selectedEtatDemandeKosc(value: EtatDemandeKoscVo) {
        this.etatDemandeKoscService.selectedEtatDemandeKosc = value;
       }
       get etatDemandeKoscs(): Array<EtatDemandeKoscVo> {
           return this.etatDemandeKoscService.etatDemandeKoscs;
       }
       set etatDemandeKoscs(value: Array<EtatDemandeKoscVo>) {
        this.etatDemandeKoscService.etatDemandeKoscs = value;
       }
       get createEtatDemandeKoscDialog(): boolean {
           return this.etatDemandeKoscService.createEtatDemandeKoscDialog;
       }
      set createEtatDemandeKoscDialog(value: boolean) {
        this.etatDemandeKoscService.createEtatDemandeKoscDialog= value;
       }
       get selectedTemplateSuivi(): TemplateSuiviVo {
           return this.templateSuiviService.selectedTemplateSuivi;
       }
      set selectedTemplateSuivi(value: TemplateSuiviVo) {
        this.templateSuiviService.selectedTemplateSuivi = value;
       }
       get templateSuivis(): Array<TemplateSuiviVo> {
           return this.templateSuiviService.templateSuivis;
       }
       set templateSuivis(value: Array<TemplateSuiviVo>) {
        this.templateSuiviService.templateSuivis = value;
       }
       get createTemplateSuiviDialog(): boolean {
           return this.templateSuiviService.createTemplateSuiviDialog;
       }
      set createTemplateSuiviDialog(value: boolean) {
        this.templateSuiviService.createTemplateSuiviDialog= value;
       }
       get selectedTechnicien(): TechnicienVo {
           return this.technicienService.selectedTechnicien;
       }
      set selectedTechnicien(value: TechnicienVo) {
        this.technicienService.selectedTechnicien = value;
       }
       get techniciens(): Array<TechnicienVo> {
           return this.technicienService.techniciens;
       }
       set techniciens(value: Array<TechnicienVo>) {
        this.technicienService.techniciens = value;
       }
       get createTechnicienDialog(): boolean {
           return this.technicienService.createTechnicienDialog;
       }
      set createTechnicienDialog(value: boolean) {
        this.technicienService.createTechnicienDialog= value;
       }
       get selectedOperator(): OperatorVo {
           return this.operatorService.selectedOperator;
       }
      set selectedOperator(value: OperatorVo) {
        this.operatorService.selectedOperator = value;
       }
       get operators(): Array<OperatorVo> {
           return this.operatorService.operators;
       }
       set operators(value: Array<OperatorVo>) {
        this.operatorService.operators = value;
       }
       get createOperatorDialog(): boolean {
           return this.operatorService.createOperatorDialog;
       }
      set createOperatorDialog(value: boolean) {
        this.operatorService.createOperatorDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatCreate;
    }

    get dateFormatColumn(){
            return environment.dateFormatCreate;
     }

     get submitted(): boolean {
        return this._submitted;
    }

    set submitted(value: boolean) {
        this._submitted = value;
    }




    get errorMessages(): string[] {
    return this._errorMessages;
    }

    set errorMessages(value: string[]) {
    this._errorMessages = value;
    }

    get validOrdreKoscReferenceWorkOrder(): boolean {
    return this._validOrdreKoscReferenceWorkOrder;
    }

    set validOrdreKoscReferenceWorkOrder(value: boolean) {
    this._validOrdreKoscReferenceWorkOrder = value;
    }

    get validOperatorReference(): boolean {
    return this._validOperatorReference;
    }

    set validOperatorReference(value: boolean) {
    this._validOperatorReference = value;
    }
    get validOperatorLibelle(): boolean {
    return this._validOperatorLibelle;
    }

    set validOperatorLibelle(value: boolean) {
    this._validOperatorLibelle = value;
    }
    get validDepartementLibelle(): boolean {
    return this._validDepartementLibelle;
    }

    set validDepartementLibelle(value: boolean) {
    this._validDepartementLibelle = value;
    }
    get validDepartementCode(): boolean {
    return this._validDepartementCode;
    }

    set validDepartementCode(value: boolean) {
    this._validDepartementCode = value;
    }
    get validDepartementRegion(): boolean {
    return this._validDepartementRegion;
    }

    set validDepartementRegion(value: boolean) {
    this._validDepartementRegion = value;
    }
    get validTechnicienIdentifiant(): boolean {
    return this._validTechnicienIdentifiant;
    }

    set validTechnicienIdentifiant(value: boolean) {
    this._validTechnicienIdentifiant = value;
    }
    get validTemplateEmailClientInjoinableCode(): boolean {
    return this._validTemplateEmailClientInjoinableCode;
    }

    set validTemplateEmailClientInjoinableCode(value: boolean) {
    this._validTemplateEmailClientInjoinableCode = value;
    }
    get validTemplateEmailClientInjoinableLibelle(): boolean {
    return this._validTemplateEmailClientInjoinableLibelle;
    }

    set validTemplateEmailClientInjoinableLibelle(value: boolean) {
    this._validTemplateEmailClientInjoinableLibelle = value;
    }
    get validTemplateEmailKoscCode(): boolean {
    return this._validTemplateEmailKoscCode;
    }

    set validTemplateEmailKoscCode(value: boolean) {
    this._validTemplateEmailKoscCode = value;
    }
    get validTemplateEmailKoscLibelle(): boolean {
    return this._validTemplateEmailKoscLibelle;
    }

    set validTemplateEmailKoscLibelle(value: boolean) {
    this._validTemplateEmailKoscLibelle = value;
    }
    get validTemplateEmailPlanificationCode(): boolean {
    return this._validTemplateEmailPlanificationCode;
    }

    set validTemplateEmailPlanificationCode(value: boolean) {
    this._validTemplateEmailPlanificationCode = value;
    }
    get validTemplateEmailPlanificationLibelle(): boolean {
    return this._validTemplateEmailPlanificationLibelle;
    }

    set validTemplateEmailPlanificationLibelle(value: boolean) {
    this._validTemplateEmailPlanificationLibelle = value;
    }
    get validTemplateEmailReplanificationCode(): boolean {
    return this._validTemplateEmailReplanificationCode;
    }

    set validTemplateEmailReplanificationCode(value: boolean) {
    this._validTemplateEmailReplanificationCode = value;
    }
    get validTemplateEmailReplanificationLibelle(): boolean {
    return this._validTemplateEmailReplanificationLibelle;
    }

    set validTemplateEmailReplanificationLibelle(value: boolean) {
    this._validTemplateEmailReplanificationLibelle = value;
    }
    get validTemplateEmailReportCode(): boolean {
    return this._validTemplateEmailReportCode;
    }

    set validTemplateEmailReportCode(value: boolean) {
    this._validTemplateEmailReportCode = value;
    }
    get validTemplateEmailReportLibelle(): boolean {
    return this._validTemplateEmailReportLibelle;
    }

    set validTemplateEmailReportLibelle(value: boolean) {
    this._validTemplateEmailReportLibelle = value;
    }
    get validEtatDemandeKoscCode(): boolean {
    return this._validEtatDemandeKoscCode;
    }

    set validEtatDemandeKoscCode(value: boolean) {
    this._validEtatDemandeKoscCode = value;
    }
    get validEtatDemandeKoscLibelle(): boolean {
    return this._validEtatDemandeKoscLibelle;
    }

    set validEtatDemandeKoscLibelle(value: boolean) {
    this._validEtatDemandeKoscLibelle = value;
    }
    get validTemplateEmailClotureCode(): boolean {
    return this._validTemplateEmailClotureCode;
    }

    set validTemplateEmailClotureCode(value: boolean) {
    this._validTemplateEmailClotureCode = value;
    }
    get validTemplateEmailClotureLibelle(): boolean {
    return this._validTemplateEmailClotureLibelle;
    }

    set validTemplateEmailClotureLibelle(value: boolean) {
    this._validTemplateEmailClotureLibelle = value;
    }
    get validTemplateSuiviCode(): boolean {
    return this._validTemplateSuiviCode;
    }

    set validTemplateSuiviCode(value: boolean) {
    this._validTemplateSuiviCode = value;
    }
    get validTemplateSuiviLibelle(): boolean {
    return this._validTemplateSuiviLibelle;
    }

    set validTemplateSuiviLibelle(value: boolean) {
    this._validTemplateSuiviLibelle = value;
    }

}

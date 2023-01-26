import {Component, OnInit, Input} from '@angular/core';
import {TemplateEmailReportService} from 'src/app/controller/service/TemplateEmailReport.service';
import {TemplateEmailReportVo} from 'src/app/controller/model/TemplateEmailReport.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from 'src/app/controller/service/StringUtil.service';


@Component({
  selector: 'app-template-email-report-create-chercheur',
  templateUrl: './template-email-report-create-chercheur.component.html',
  styleUrls: ['./template-email-report-create-chercheur.component.css']
})
export class TemplateEmailReportCreateChercheurComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validTemplateEmailReportCode = true;
   _validTemplateEmailReportLibelle = true;




constructor(private datePipe: DatePipe, private templateEmailReportService: TemplateEmailReportService
 ,       private stringUtilService: StringUtilService
 ,       private roleService: RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
) {

}



ngOnInit(): void {

}




private setValidation(value: boolean){
    this.validTemplateEmailReportCode = value;
    this.validTemplateEmailReportLibelle = value;
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
     this.templateEmailReportService.save().subscribe(templateEmailReport=>{
      if(templateEmailReport != null){
       this.templateEmailReports.push({...templateEmailReport});
       this.createTemplateEmailReportDialog = false;
       this.submitted = false;
       this.selectedTemplateEmailReport = new TemplateEmailReportVo();

    }else{
    this.messageService.add({severity: 'error', summary: 'Erreurs',detail: 'Template email report existe déjà' });
    }

    } , error =>{
        console.log(error);
    });
}

private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateTemplateEmailReportCode();
this.validateTemplateEmailReportLibelle();

    }

private validateTemplateEmailReportCode(){
        if (this.stringUtilService.isEmpty(this.selectedTemplateEmailReport.code)) {
            this.errorMessages.push('Code non valide');
            this.validTemplateEmailReportCode = false;
        } else {
            this.validTemplateEmailReportCode = true;
        }
    }
private validateTemplateEmailReportLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedTemplateEmailReport.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validTemplateEmailReportLibelle = false;
        } else {
            this.validTemplateEmailReportLibelle = true;
        }
    }









hideCreateDialog(){
    this.createTemplateEmailReportDialog  = false;
    this.setValidation(true);
}

get templateEmailReports(): Array<TemplateEmailReportVo> {
    return this.templateEmailReportService.templateEmailReports;
       }
set templateEmailReports(value: Array<TemplateEmailReportVo>) {
        this.templateEmailReportService.templateEmailReports = value;
       }

 get selectedTemplateEmailReport(): TemplateEmailReportVo {
           return this.templateEmailReportService.selectedTemplateEmailReport;
       }
    set selectedTemplateEmailReport(value: TemplateEmailReportVo) {
        this.templateEmailReportService.selectedTemplateEmailReport = value;
       }

   get createTemplateEmailReportDialog(): boolean {
           return this.templateEmailReportService.createTemplateEmailReportDialog;

       }
    set createTemplateEmailReportDialog(value: boolean) {
        this.templateEmailReportService.createTemplateEmailReportDialog= value;
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


}

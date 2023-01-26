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
  selector: 'app-template-email-report-edit-admin',
  templateUrl: './template-email-report-edit-admin.component.html',
  styleUrls: ['./template-email-report-edit-admin.component.css']
})
export class TemplateEmailReportEditAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validTemplateEmailReportCode = true;
   _validTemplateEmailReportLibelle = true;




constructor(private datePipe: DatePipe, private templateEmailReportService: TemplateEmailReportService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
) {

}


// methods
ngOnInit(): void {

}




private setValidation(value : boolean){
    this.validTemplateEmailReportCode = value;
    this.validTemplateEmailReportLibelle = value;
    }


public edit(){
  this.submitted = true;
  this.validateForm();
  if (this.errorMessages.length === 0) {
        this.editWithShowOption(false);
  } else {
        this.messageService.add({severity: 'error', summary: 'Erreurs', detail: 'Merci de corrigé les erreurs sur le formulaire'});
  }
}

public editWithShowOption(showList: boolean){
     this.templateEmailReportService.edit().subscribe(templateEmailReport=>{
     const myIndex = this.templateEmailReports.findIndex(e => e.id === this.selectedTemplateEmailReport.id);
     this.templateEmailReports[myIndex] = templateEmailReport;
     this.editTemplateEmailReportDialog = false;
     this.submitted = false;
     this.selectedTemplateEmailReport = new TemplateEmailReportVo();



    } , error =>{
        console.log(error);
    });

}
//validation methods
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








//openPopup
// methods

hideEditDialog(){
    this.editTemplateEmailReportDialog  = false;
    this.setValidation(true);
}

// getters and setters

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

   get editTemplateEmailReportDialog(): boolean {
           return this.templateEmailReportService.editTemplateEmailReportDialog;

       }
    set editTemplateEmailReportDialog(value: boolean) {
        this.templateEmailReportService.editTemplateEmailReportDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatEdit;
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

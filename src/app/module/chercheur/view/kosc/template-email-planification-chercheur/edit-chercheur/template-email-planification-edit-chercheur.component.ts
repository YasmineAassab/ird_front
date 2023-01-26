import {Component, OnInit, Input} from '@angular/core';
import {TemplateEmailPlanificationService} from 'src/app/controller/service/TemplateEmailPlanification.service';
import {TemplateEmailPlanificationVo} from 'src/app/controller/model/TemplateEmailPlanification.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from 'src/app/controller/service/StringUtil.service';


@Component({
  selector: 'app-template-email-planification-edit-chercheur',
  templateUrl: './template-email-planification-edit-chercheur.component.html',
  styleUrls: ['./template-email-planification-edit-chercheur.component.css']
})
export class TemplateEmailPlanificationEditChercheurComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validTemplateEmailPlanificationCode = true;
   _validTemplateEmailPlanificationLibelle = true;




constructor(private datePipe: DatePipe, private templateEmailPlanificationService: TemplateEmailPlanificationService
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
    this.validTemplateEmailPlanificationCode = value;
    this.validTemplateEmailPlanificationLibelle = value;
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
     this.templateEmailPlanificationService.edit().subscribe(templateEmailPlanification=>{
     const myIndex = this.templateEmailPlanifications.findIndex(e => e.id === this.selectedTemplateEmailPlanification.id);
     this.templateEmailPlanifications[myIndex] = templateEmailPlanification;
     this.editTemplateEmailPlanificationDialog = false;
     this.submitted = false;
     this.selectedTemplateEmailPlanification = new TemplateEmailPlanificationVo();



    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateTemplateEmailPlanificationCode();
this.validateTemplateEmailPlanificationLibelle();

    }

private validateTemplateEmailPlanificationCode(){
        if (this.stringUtilService.isEmpty(this.selectedTemplateEmailPlanification.code)) {
            this.errorMessages.push('Code non valide');
            this.validTemplateEmailPlanificationCode = false;
        } else {
            this.validTemplateEmailPlanificationCode = true;
        }
    }
private validateTemplateEmailPlanificationLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedTemplateEmailPlanification.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validTemplateEmailPlanificationLibelle = false;
        } else {
            this.validTemplateEmailPlanificationLibelle = true;
        }
    }








//openPopup
// methods

hideEditDialog(){
    this.editTemplateEmailPlanificationDialog  = false;
    this.setValidation(true);
}

// getters and setters

get templateEmailPlanifications(): Array<TemplateEmailPlanificationVo> {
    return this.templateEmailPlanificationService.templateEmailPlanifications;
       }
set templateEmailPlanifications(value: Array<TemplateEmailPlanificationVo>) {
        this.templateEmailPlanificationService.templateEmailPlanifications = value;
       }

 get selectedTemplateEmailPlanification(): TemplateEmailPlanificationVo {
           return this.templateEmailPlanificationService.selectedTemplateEmailPlanification;
       }
    set selectedTemplateEmailPlanification(value: TemplateEmailPlanificationVo) {
        this.templateEmailPlanificationService.selectedTemplateEmailPlanification = value;
       }

   get editTemplateEmailPlanificationDialog(): boolean {
           return this.templateEmailPlanificationService.editTemplateEmailPlanificationDialog;

       }
    set editTemplateEmailPlanificationDialog(value: boolean) {
        this.templateEmailPlanificationService.editTemplateEmailPlanificationDialog= value;
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

}

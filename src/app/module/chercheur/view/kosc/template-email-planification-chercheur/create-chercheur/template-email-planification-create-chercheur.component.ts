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
  selector: 'app-template-email-planification-create-chercheur',
  templateUrl: './template-email-planification-create-chercheur.component.html',
  styleUrls: ['./template-email-planification-create-chercheur.component.css']
})
export class TemplateEmailPlanificationCreateChercheurComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validTemplateEmailPlanificationCode = true;
   _validTemplateEmailPlanificationLibelle = true;




constructor(private datePipe: DatePipe, private templateEmailPlanificationService: TemplateEmailPlanificationService
 ,       private stringUtilService: StringUtilService
 ,       private roleService: RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
) {

}



ngOnInit(): void {

}




private setValidation(value: boolean){
    this.validTemplateEmailPlanificationCode = value;
    this.validTemplateEmailPlanificationLibelle = value;
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
     this.templateEmailPlanificationService.save().subscribe(templateEmailPlanification=>{
      if(templateEmailPlanification != null){
       this.templateEmailPlanifications.push({...templateEmailPlanification});
       this.createTemplateEmailPlanificationDialog = false;
       this.submitted = false;
       this.selectedTemplateEmailPlanification = new TemplateEmailPlanificationVo();

    }else{
    this.messageService.add({severity: 'error', summary: 'Erreurs',detail: 'Template email planification existe déjà' });
    }

    } , error =>{
        console.log(error);
    });
}

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









hideCreateDialog(){
    this.createTemplateEmailPlanificationDialog  = false;
    this.setValidation(true);
}

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

   get createTemplateEmailPlanificationDialog(): boolean {
           return this.templateEmailPlanificationService.createTemplateEmailPlanificationDialog;

       }
    set createTemplateEmailPlanificationDialog(value: boolean) {
        this.templateEmailPlanificationService.createTemplateEmailPlanificationDialog= value;
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

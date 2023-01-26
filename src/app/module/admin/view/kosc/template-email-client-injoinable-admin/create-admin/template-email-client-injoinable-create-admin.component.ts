import {Component, OnInit, Input} from '@angular/core';
import {TemplateEmailClientInjoinableService} from 'src/app/controller/service/TemplateEmailClientInjoinable.service';
import {TemplateEmailClientInjoinableVo} from 'src/app/controller/model/TemplateEmailClientInjoinable.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from 'src/app/controller/service/StringUtil.service';


@Component({
  selector: 'app-template-email-client-injoinable-create-admin',
  templateUrl: './template-email-client-injoinable-create-admin.component.html',
  styleUrls: ['./template-email-client-injoinable-create-admin.component.css']
})
export class TemplateEmailClientInjoinableCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validTemplateEmailClientInjoinableCode = true;
   _validTemplateEmailClientInjoinableLibelle = true;




constructor(private datePipe: DatePipe, private templateEmailClientInjoinableService: TemplateEmailClientInjoinableService
 ,       private stringUtilService: StringUtilService
 ,       private roleService: RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
) {

}



ngOnInit(): void {

}




private setValidation(value: boolean){
    this.validTemplateEmailClientInjoinableCode = value;
    this.validTemplateEmailClientInjoinableLibelle = value;
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
     this.templateEmailClientInjoinableService.save().subscribe(templateEmailClientInjoinable=>{
      if(templateEmailClientInjoinable != null){
       this.templateEmailClientInjoinables.push({...templateEmailClientInjoinable});
       this.createTemplateEmailClientInjoinableDialog = false;
       this.submitted = false;
       this.selectedTemplateEmailClientInjoinable = new TemplateEmailClientInjoinableVo();

    }else{
    this.messageService.add({severity: 'error', summary: 'Erreurs',detail: 'Template email client injoinable existe déjà' });
    }

    } , error =>{
        console.log(error);
    });
}

private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateTemplateEmailClientInjoinableCode();
this.validateTemplateEmailClientInjoinableLibelle();

    }

private validateTemplateEmailClientInjoinableCode(){
        if (this.stringUtilService.isEmpty(this.selectedTemplateEmailClientInjoinable.code)) {
            this.errorMessages.push('Code non valide');
            this.validTemplateEmailClientInjoinableCode = false;
        } else {
            this.validTemplateEmailClientInjoinableCode = true;
        }
    }
private validateTemplateEmailClientInjoinableLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedTemplateEmailClientInjoinable.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validTemplateEmailClientInjoinableLibelle = false;
        } else {
            this.validTemplateEmailClientInjoinableLibelle = true;
        }
    }









hideCreateDialog(){
    this.createTemplateEmailClientInjoinableDialog  = false;
    this.setValidation(true);
}

get templateEmailClientInjoinables(): Array<TemplateEmailClientInjoinableVo> {
    return this.templateEmailClientInjoinableService.templateEmailClientInjoinables;
       }
set templateEmailClientInjoinables(value: Array<TemplateEmailClientInjoinableVo>) {
        this.templateEmailClientInjoinableService.templateEmailClientInjoinables = value;
       }

 get selectedTemplateEmailClientInjoinable(): TemplateEmailClientInjoinableVo {
           return this.templateEmailClientInjoinableService.selectedTemplateEmailClientInjoinable;
       }
    set selectedTemplateEmailClientInjoinable(value: TemplateEmailClientInjoinableVo) {
        this.templateEmailClientInjoinableService.selectedTemplateEmailClientInjoinable = value;
       }

   get createTemplateEmailClientInjoinableDialog(): boolean {
           return this.templateEmailClientInjoinableService.createTemplateEmailClientInjoinableDialog;

       }
    set createTemplateEmailClientInjoinableDialog(value: boolean) {
        this.templateEmailClientInjoinableService.createTemplateEmailClientInjoinableDialog= value;
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


}

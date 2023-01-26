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
  selector: 'app-template-email-client-injoinable-edit-admin',
  templateUrl: './template-email-client-injoinable-edit-admin.component.html',
  styleUrls: ['./template-email-client-injoinable-edit-admin.component.css']
})
export class TemplateEmailClientInjoinableEditAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validTemplateEmailClientInjoinableCode = true;
   _validTemplateEmailClientInjoinableLibelle = true;




constructor(private datePipe: DatePipe, private templateEmailClientInjoinableService: TemplateEmailClientInjoinableService
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
    this.validTemplateEmailClientInjoinableCode = value;
    this.validTemplateEmailClientInjoinableLibelle = value;
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
     this.templateEmailClientInjoinableService.edit().subscribe(templateEmailClientInjoinable=>{
     const myIndex = this.templateEmailClientInjoinables.findIndex(e => e.id === this.selectedTemplateEmailClientInjoinable.id);
     this.templateEmailClientInjoinables[myIndex] = templateEmailClientInjoinable;
     this.editTemplateEmailClientInjoinableDialog = false;
     this.submitted = false;
     this.selectedTemplateEmailClientInjoinable = new TemplateEmailClientInjoinableVo();



    } , error =>{
        console.log(error);
    });

}
//validation methods
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








//openPopup
// methods

hideEditDialog(){
    this.editTemplateEmailClientInjoinableDialog  = false;
    this.setValidation(true);
}

// getters and setters

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

   get editTemplateEmailClientInjoinableDialog(): boolean {
           return this.templateEmailClientInjoinableService.editTemplateEmailClientInjoinableDialog;

       }
    set editTemplateEmailClientInjoinableDialog(value: boolean) {
        this.templateEmailClientInjoinableService.editTemplateEmailClientInjoinableDialog= value;
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

import {Component, OnInit, Input} from '@angular/core';
import {TemplateEmailReplanificationService} from 'src/app/controller/service/TemplateEmailReplanification.service';
import {TemplateEmailReplanificationVo} from 'src/app/controller/model/TemplateEmailReplanification.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from 'src/app/controller/service/StringUtil.service';


@Component({
  selector: 'app-template-email-replanification-edit-chercheur',
  templateUrl: './template-email-replanification-edit-chercheur.component.html',
  styleUrls: ['./template-email-replanification-edit-chercheur.component.css']
})
export class TemplateEmailReplanificationEditChercheurComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validTemplateEmailReplanificationCode = true;
   _validTemplateEmailReplanificationLibelle = true;




constructor(private datePipe: DatePipe, private templateEmailReplanificationService: TemplateEmailReplanificationService
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
    this.validTemplateEmailReplanificationCode = value;
    this.validTemplateEmailReplanificationLibelle = value;
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
     this.templateEmailReplanificationService.edit().subscribe(templateEmailReplanification=>{
     const myIndex = this.templateEmailReplanifications.findIndex(e => e.id === this.selectedTemplateEmailReplanification.id);
     this.templateEmailReplanifications[myIndex] = templateEmailReplanification;
     this.editTemplateEmailReplanificationDialog = false;
     this.submitted = false;
     this.selectedTemplateEmailReplanification = new TemplateEmailReplanificationVo();



    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateTemplateEmailReplanificationCode();
this.validateTemplateEmailReplanificationLibelle();

    }

private validateTemplateEmailReplanificationCode(){
        if (this.stringUtilService.isEmpty(this.selectedTemplateEmailReplanification.code)) {
            this.errorMessages.push('Code non valide');
            this.validTemplateEmailReplanificationCode = false;
        } else {
            this.validTemplateEmailReplanificationCode = true;
        }
    }
private validateTemplateEmailReplanificationLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedTemplateEmailReplanification.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validTemplateEmailReplanificationLibelle = false;
        } else {
            this.validTemplateEmailReplanificationLibelle = true;
        }
    }








//openPopup
// methods

hideEditDialog(){
    this.editTemplateEmailReplanificationDialog  = false;
    this.setValidation(true);
}

// getters and setters

get templateEmailReplanifications(): Array<TemplateEmailReplanificationVo> {
    return this.templateEmailReplanificationService.templateEmailReplanifications;
       }
set templateEmailReplanifications(value: Array<TemplateEmailReplanificationVo>) {
        this.templateEmailReplanificationService.templateEmailReplanifications = value;
       }

 get selectedTemplateEmailReplanification(): TemplateEmailReplanificationVo {
           return this.templateEmailReplanificationService.selectedTemplateEmailReplanification;
       }
    set selectedTemplateEmailReplanification(value: TemplateEmailReplanificationVo) {
        this.templateEmailReplanificationService.selectedTemplateEmailReplanification = value;
       }

   get editTemplateEmailReplanificationDialog(): boolean {
           return this.templateEmailReplanificationService.editTemplateEmailReplanificationDialog;

       }
    set editTemplateEmailReplanificationDialog(value: boolean) {
        this.templateEmailReplanificationService.editTemplateEmailReplanificationDialog= value;
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

}

import {Component, OnInit, Input} from '@angular/core';
import {TemplateEmailClotureService} from 'src/app/controller/service/TemplateEmailCloture.service';
import {TemplateEmailClotureVo} from 'src/app/controller/model/TemplateEmailCloture.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from 'src/app/controller/service/StringUtil.service';


@Component({
  selector: 'app-template-email-cloture-edit-chercheur',
  templateUrl: './template-email-cloture-edit-chercheur.component.html',
  styleUrls: ['./template-email-cloture-edit-chercheur.component.css']
})
export class TemplateEmailClotureEditChercheurComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validTemplateEmailClotureCode = true;
   _validTemplateEmailClotureLibelle = true;




constructor(private datePipe: DatePipe, private templateEmailClotureService: TemplateEmailClotureService
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
    this.validTemplateEmailClotureCode = value;
    this.validTemplateEmailClotureLibelle = value;
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
     this.templateEmailClotureService.edit().subscribe(templateEmailCloture=>{
     const myIndex = this.templateEmailClotures.findIndex(e => e.id === this.selectedTemplateEmailCloture.id);
     this.templateEmailClotures[myIndex] = templateEmailCloture;
     this.editTemplateEmailClotureDialog = false;
     this.submitted = false;
     this.selectedTemplateEmailCloture = new TemplateEmailClotureVo();



    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateTemplateEmailClotureCode();
this.validateTemplateEmailClotureLibelle();

    }

private validateTemplateEmailClotureCode(){
        if (this.stringUtilService.isEmpty(this.selectedTemplateEmailCloture.code)) {
            this.errorMessages.push('Code non valide');
            this.validTemplateEmailClotureCode = false;
        } else {
            this.validTemplateEmailClotureCode = true;
        }
    }
private validateTemplateEmailClotureLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedTemplateEmailCloture.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validTemplateEmailClotureLibelle = false;
        } else {
            this.validTemplateEmailClotureLibelle = true;
        }
    }








//openPopup
// methods

hideEditDialog(){
    this.editTemplateEmailClotureDialog  = false;
    this.setValidation(true);
}

// getters and setters

get templateEmailClotures(): Array<TemplateEmailClotureVo> {
    return this.templateEmailClotureService.templateEmailClotures;
       }
set templateEmailClotures(value: Array<TemplateEmailClotureVo>) {
        this.templateEmailClotureService.templateEmailClotures = value;
       }

 get selectedTemplateEmailCloture(): TemplateEmailClotureVo {
           return this.templateEmailClotureService.selectedTemplateEmailCloture;
       }
    set selectedTemplateEmailCloture(value: TemplateEmailClotureVo) {
        this.templateEmailClotureService.selectedTemplateEmailCloture = value;
       }

   get editTemplateEmailClotureDialog(): boolean {
           return this.templateEmailClotureService.editTemplateEmailClotureDialog;

       }
    set editTemplateEmailClotureDialog(value: boolean) {
        this.templateEmailClotureService.editTemplateEmailClotureDialog= value;
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

}

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
  selector: 'app-template-email-cloture-create-chercheur',
  templateUrl: './template-email-cloture-create-chercheur.component.html',
  styleUrls: ['./template-email-cloture-create-chercheur.component.css']
})
export class TemplateEmailClotureCreateChercheurComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validTemplateEmailClotureCode = true;
   _validTemplateEmailClotureLibelle = true;




constructor(private datePipe: DatePipe, private templateEmailClotureService: TemplateEmailClotureService
 ,       private stringUtilService: StringUtilService
 ,       private roleService: RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
) {

}



ngOnInit(): void {

}




private setValidation(value: boolean){
    this.validTemplateEmailClotureCode = value;
    this.validTemplateEmailClotureLibelle = value;
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
     this.templateEmailClotureService.save().subscribe(templateEmailCloture=>{
      if(templateEmailCloture != null){
       this.templateEmailClotures.push({...templateEmailCloture});
       this.createTemplateEmailClotureDialog = false;
       this.submitted = false;
       this.selectedTemplateEmailCloture = new TemplateEmailClotureVo();

    }else{
    this.messageService.add({severity: 'error', summary: 'Erreurs',detail: 'Template email cloture existe déjà' });
    }

    } , error =>{
        console.log(error);
    });
}

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









hideCreateDialog(){
    this.createTemplateEmailClotureDialog  = false;
    this.setValidation(true);
}

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

   get createTemplateEmailClotureDialog(): boolean {
           return this.templateEmailClotureService.createTemplateEmailClotureDialog;

       }
    set createTemplateEmailClotureDialog(value: boolean) {
        this.templateEmailClotureService.createTemplateEmailClotureDialog= value;
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

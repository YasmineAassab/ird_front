import {Component, OnInit, Input} from '@angular/core';
import {TemplateSuiviService} from 'src/app/controller/service/TemplateSuivi.service';
import {TemplateSuiviVo} from 'src/app/controller/model/TemplateSuivi.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from 'src/app/controller/service/StringUtil.service';


@Component({
  selector: 'app-template-suivi-create-admin',
  templateUrl: './template-suivi-create-admin.component.html',
  styleUrls: ['./template-suivi-create-admin.component.css']
})
export class TemplateSuiviCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validTemplateSuiviCode = true;
   _validTemplateSuiviLibelle = true;




constructor(private datePipe: DatePipe, private templateSuiviService: TemplateSuiviService
 ,       private stringUtilService: StringUtilService
 ,       private roleService: RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
) {

}



ngOnInit(): void {

}




private setValidation(value: boolean){
    this.validTemplateSuiviCode = value;
    this.validTemplateSuiviLibelle = value;
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
     this.templateSuiviService.save().subscribe(templateSuivi=>{
      if(templateSuivi != null){
       this.templateSuivis.push({...templateSuivi});
       this.createTemplateSuiviDialog = false;
       this.submitted = false;
       this.selectedTemplateSuivi = new TemplateSuiviVo();

    }else{
    this.messageService.add({severity: 'error', summary: 'Erreurs',detail: 'Template suivi existe déjà' });
    }

    } , error =>{
        console.log(error);
    });
}

private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateTemplateSuiviCode();
this.validateTemplateSuiviLibelle();

    }

private validateTemplateSuiviCode(){
        if (this.stringUtilService.isEmpty(this.selectedTemplateSuivi.code)) {
            this.errorMessages.push('Code non valide');
            this.validTemplateSuiviCode = false;
        } else {
            this.validTemplateSuiviCode = true;
        }
    }
private validateTemplateSuiviLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedTemplateSuivi.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validTemplateSuiviLibelle = false;
        } else {
            this.validTemplateSuiviLibelle = true;
        }
    }









hideCreateDialog(){
    this.createTemplateSuiviDialog  = false;
    this.setValidation(true);
}

get templateSuivis(): Array<TemplateSuiviVo> {
    return this.templateSuiviService.templateSuivis;
       }
set templateSuivis(value: Array<TemplateSuiviVo>) {
        this.templateSuiviService.templateSuivis = value;
       }

 get selectedTemplateSuivi(): TemplateSuiviVo {
           return this.templateSuiviService.selectedTemplateSuivi;
       }
    set selectedTemplateSuivi(value: TemplateSuiviVo) {
        this.templateSuiviService.selectedTemplateSuivi = value;
       }

   get createTemplateSuiviDialog(): boolean {
           return this.templateSuiviService.createTemplateSuiviDialog;

       }
    set createTemplateSuiviDialog(value: boolean) {
        this.templateSuiviService.createTemplateSuiviDialog= value;
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

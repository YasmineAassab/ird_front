import {Component, OnInit, Input} from '@angular/core';
import {TemplateEmailKoscService} from 'src/app/controller/service/TemplateEmailKosc.service';
import {TemplateEmailKoscVo} from 'src/app/controller/model/TemplateEmailKosc.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from 'src/app/controller/service/StringUtil.service';


@Component({
  selector: 'app-template-email-kosc-create-chercheur',
  templateUrl: './template-email-kosc-create-chercheur.component.html',
  styleUrls: ['./template-email-kosc-create-chercheur.component.css']
})
export class TemplateEmailKoscCreateChercheurComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validTemplateEmailKoscCode = true;
   _validTemplateEmailKoscLibelle = true;




constructor(private datePipe: DatePipe, private templateEmailKoscService: TemplateEmailKoscService
 ,       private stringUtilService: StringUtilService
 ,       private roleService: RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
) {

}



ngOnInit(): void {

}




private setValidation(value: boolean){
    this.validTemplateEmailKoscCode = value;
    this.validTemplateEmailKoscLibelle = value;
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
     this.templateEmailKoscService.save().subscribe(templateEmailKosc=>{
      if(templateEmailKosc != null){
       this.templateEmailKoscs.push({...templateEmailKosc});
       this.createTemplateEmailKoscDialog = false;
       this.submitted = false;
       this.selectedTemplateEmailKosc = new TemplateEmailKoscVo();

    }else{
    this.messageService.add({severity: 'error', summary: 'Erreurs',detail: 'Template email kosc existe déjà' });
    }

    } , error =>{
        console.log(error);
    });
}

private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateTemplateEmailKoscCode();
this.validateTemplateEmailKoscLibelle();

    }

private validateTemplateEmailKoscCode(){
        if (this.stringUtilService.isEmpty(this.selectedTemplateEmailKosc.code)) {
            this.errorMessages.push('Code non valide');
            this.validTemplateEmailKoscCode = false;
        } else {
            this.validTemplateEmailKoscCode = true;
        }
    }
private validateTemplateEmailKoscLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedTemplateEmailKosc.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validTemplateEmailKoscLibelle = false;
        } else {
            this.validTemplateEmailKoscLibelle = true;
        }
    }









hideCreateDialog(){
    this.createTemplateEmailKoscDialog  = false;
    this.setValidation(true);
}

get templateEmailKoscs(): Array<TemplateEmailKoscVo> {
    return this.templateEmailKoscService.templateEmailKoscs;
       }
set templateEmailKoscs(value: Array<TemplateEmailKoscVo>) {
        this.templateEmailKoscService.templateEmailKoscs = value;
       }

 get selectedTemplateEmailKosc(): TemplateEmailKoscVo {
           return this.templateEmailKoscService.selectedTemplateEmailKosc;
       }
    set selectedTemplateEmailKosc(value: TemplateEmailKoscVo) {
        this.templateEmailKoscService.selectedTemplateEmailKosc = value;
       }

   get createTemplateEmailKoscDialog(): boolean {
           return this.templateEmailKoscService.createTemplateEmailKoscDialog;

       }
    set createTemplateEmailKoscDialog(value: boolean) {
        this.templateEmailKoscService.createTemplateEmailKoscDialog= value;
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

    get validTemplateEmailKoscCode(): boolean {
    return this._validTemplateEmailKoscCode;
    }

    set validTemplateEmailKoscCode(value: boolean) {
    this._validTemplateEmailKoscCode = value;
    }
    get validTemplateEmailKoscLibelle(): boolean {
    return this._validTemplateEmailKoscLibelle;
    }

    set validTemplateEmailKoscLibelle(value: boolean) {
    this._validTemplateEmailKoscLibelle = value;
    }


}

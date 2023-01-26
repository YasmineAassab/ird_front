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
  selector: 'app-template-email-kosc-edit-chercheur',
  templateUrl: './template-email-kosc-edit-chercheur.component.html',
  styleUrls: ['./template-email-kosc-edit-chercheur.component.css']
})
export class TemplateEmailKoscEditChercheurComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validTemplateEmailKoscCode = true;
   _validTemplateEmailKoscLibelle = true;




constructor(private datePipe: DatePipe, private templateEmailKoscService: TemplateEmailKoscService
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
    this.validTemplateEmailKoscCode = value;
    this.validTemplateEmailKoscLibelle = value;
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
     this.templateEmailKoscService.edit().subscribe(templateEmailKosc=>{
     const myIndex = this.templateEmailKoscs.findIndex(e => e.id === this.selectedTemplateEmailKosc.id);
     this.templateEmailKoscs[myIndex] = templateEmailKosc;
     this.editTemplateEmailKoscDialog = false;
     this.submitted = false;
     this.selectedTemplateEmailKosc = new TemplateEmailKoscVo();



    } , error =>{
        console.log(error);
    });

}
//validation methods
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








//openPopup
// methods

hideEditDialog(){
    this.editTemplateEmailKoscDialog  = false;
    this.setValidation(true);
}

// getters and setters

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

   get editTemplateEmailKoscDialog(): boolean {
           return this.templateEmailKoscService.editTemplateEmailKoscDialog;

       }
    set editTemplateEmailKoscDialog(value: boolean) {
        this.templateEmailKoscService.editTemplateEmailKoscDialog= value;
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

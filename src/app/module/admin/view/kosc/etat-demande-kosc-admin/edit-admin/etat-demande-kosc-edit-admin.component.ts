import {Component, OnInit, Input} from '@angular/core';
import {EtatDemandeKoscService} from 'src/app/controller/service/EtatDemandeKosc.service';
import {EtatDemandeKoscVo} from 'src/app/controller/model/EtatDemandeKosc.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from 'src/app/controller/service/StringUtil.service';


@Component({
  selector: 'app-etat-demande-kosc-edit-admin',
  templateUrl: './etat-demande-kosc-edit-admin.component.html',
  styleUrls: ['./etat-demande-kosc-edit-admin.component.css']
})
export class EtatDemandeKoscEditAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validEtatDemandeKoscCode = true;
   _validEtatDemandeKoscLibelle = true;




constructor(private datePipe: DatePipe, private etatDemandeKoscService: EtatDemandeKoscService
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
    this.validEtatDemandeKoscCode = value;
    this.validEtatDemandeKoscLibelle = value;
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
     this.etatDemandeKoscService.edit().subscribe(etatDemandeKosc=>{
     const myIndex = this.etatDemandeKoscs.findIndex(e => e.id === this.selectedEtatDemandeKosc.id);
     this.etatDemandeKoscs[myIndex] = etatDemandeKosc;
     this.editEtatDemandeKoscDialog = false;
     this.submitted = false;
     this.selectedEtatDemandeKosc = new EtatDemandeKoscVo();



    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateEtatDemandeKoscCode();
this.validateEtatDemandeKoscLibelle();

    }

private validateEtatDemandeKoscCode(){
        if (this.stringUtilService.isEmpty(this.selectedEtatDemandeKosc.code)) {
            this.errorMessages.push('Code non valide');
            this.validEtatDemandeKoscCode = false;
        } else {
            this.validEtatDemandeKoscCode = true;
        }
    }
private validateEtatDemandeKoscLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedEtatDemandeKosc.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validEtatDemandeKoscLibelle = false;
        } else {
            this.validEtatDemandeKoscLibelle = true;
        }
    }






//openPopup
// methods

hideEditDialog(){
    this.editEtatDemandeKoscDialog  = false;
    this.setValidation(true);
}

// getters and setters

get etatDemandeKoscs(): Array<EtatDemandeKoscVo> {
    return this.etatDemandeKoscService.etatDemandeKoscs;
       }
set etatDemandeKoscs(value: Array<EtatDemandeKoscVo>) {
        this.etatDemandeKoscService.etatDemandeKoscs = value;
       }

 get selectedEtatDemandeKosc(): EtatDemandeKoscVo {
           return this.etatDemandeKoscService.selectedEtatDemandeKosc;
       }
    set selectedEtatDemandeKosc(value: EtatDemandeKoscVo) {
        this.etatDemandeKoscService.selectedEtatDemandeKosc = value;
       }

   get editEtatDemandeKoscDialog(): boolean {
           return this.etatDemandeKoscService.editEtatDemandeKoscDialog;

       }
    set editEtatDemandeKoscDialog(value: boolean) {
        this.etatDemandeKoscService.editEtatDemandeKoscDialog= value;
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

    get validEtatDemandeKoscCode(): boolean {
    return this._validEtatDemandeKoscCode;
    }

    set validEtatDemandeKoscCode(value: boolean) {
    this._validEtatDemandeKoscCode = value;
    }
    get validEtatDemandeKoscLibelle(): boolean {
    return this._validEtatDemandeKoscLibelle;
    }

    set validEtatDemandeKoscLibelle(value: boolean) {
    this._validEtatDemandeKoscLibelle = value;
    }

}

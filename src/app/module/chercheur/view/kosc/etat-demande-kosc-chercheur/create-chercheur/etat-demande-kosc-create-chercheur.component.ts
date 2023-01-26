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
  selector: 'app-etat-demande-kosc-create-chercheur',
  templateUrl: './etat-demande-kosc-create-chercheur.component.html',
  styleUrls: ['./etat-demande-kosc-create-chercheur.component.css']
})
export class EtatDemandeKoscCreateChercheurComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validEtatDemandeKoscCode = true;
   _validEtatDemandeKoscLibelle = true;




constructor(private datePipe: DatePipe, private etatDemandeKoscService: EtatDemandeKoscService
 ,       private stringUtilService: StringUtilService
 ,       private roleService: RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
) {

}



ngOnInit(): void {

}




private setValidation(value: boolean){
    this.validEtatDemandeKoscCode = value;
    this.validEtatDemandeKoscLibelle = value;
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
     this.etatDemandeKoscService.save().subscribe(etatDemandeKosc=>{
      if(etatDemandeKosc != null){
       this.etatDemandeKoscs.push({...etatDemandeKosc});
       this.createEtatDemandeKoscDialog = false;
       this.submitted = false;
       this.selectedEtatDemandeKosc = new EtatDemandeKoscVo();

    }else{
    this.messageService.add({severity: 'error', summary: 'Erreurs',detail: 'Etat demande kosc existe déjà' });
    }

    } , error =>{
        console.log(error);
    });
}

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







hideCreateDialog(){
    this.createEtatDemandeKoscDialog  = false;
    this.setValidation(true);
}

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

   get createEtatDemandeKoscDialog(): boolean {
           return this.etatDemandeKoscService.createEtatDemandeKoscDialog;

       }
    set createEtatDemandeKoscDialog(value: boolean) {
        this.etatDemandeKoscService.createEtatDemandeKoscDialog= value;
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

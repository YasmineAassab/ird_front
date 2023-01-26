import {Component, OnInit, Input} from '@angular/core';
import {EntrepriseService} from 'src/app/controller/service/Entreprise.service';
import {EntrepriseVo} from 'src/app/controller/model/Entreprise.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from 'src/app/controller/service/StringUtil.service';


@Component({
  selector: 'app-entreprise-create-chercheur',
  templateUrl: './entreprise-create-chercheur.component.html',
  styleUrls: ['./entreprise-create-chercheur.component.css']
})
export class EntrepriseCreateChercheurComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validEntrepriseLibelle = true;
   _validEntrepriseCode = true;




constructor(private datePipe: DatePipe, private entrepriseService: EntrepriseService
 ,       private stringUtilService: StringUtilService
 ,       private roleService: RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
) {

}



ngOnInit(): void {

}




private setValidation(value: boolean){
    this.validEntrepriseLibelle = value;
    this.validEntrepriseCode = value;
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
     this.entrepriseService.save().subscribe(entreprise=>{
      if(entreprise != null){
       this.entreprises.push({...entreprise});
       this.createEntrepriseDialog = false;
       this.submitted = false;
       this.selectedEntreprise = new EntrepriseVo();

    }else{
    this.messageService.add({severity: 'error', summary: 'Erreurs',detail: 'Entreprise existe déjà' });
    }

    } , error =>{
        console.log(error);
    });
}

private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateEntrepriseLibelle();
this.validateEntrepriseCode();

    }

private validateEntrepriseLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedEntreprise.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validEntrepriseLibelle = false;
        } else {
            this.validEntrepriseLibelle = true;
        }
    }
private validateEntrepriseCode(){
        if (this.stringUtilService.isEmpty(this.selectedEntreprise.code)) {
            this.errorMessages.push('Code non valide');
            this.validEntrepriseCode = false;
        } else {
            this.validEntrepriseCode = true;
        }
    }







hideCreateDialog(){
    this.createEntrepriseDialog  = false;
    this.setValidation(true);
}

get entreprises(): Array<EntrepriseVo> {
    return this.entrepriseService.entreprises;
       }
set entreprises(value: Array<EntrepriseVo>) {
        this.entrepriseService.entreprises = value;
       }

 get selectedEntreprise(): EntrepriseVo {
           return this.entrepriseService.selectedEntreprise;
       }
    set selectedEntreprise(value: EntrepriseVo) {
        this.entrepriseService.selectedEntreprise = value;
       }

   get createEntrepriseDialog(): boolean {
           return this.entrepriseService.createEntrepriseDialog;

       }
    set createEntrepriseDialog(value: boolean) {
        this.entrepriseService.createEntrepriseDialog= value;
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

    get validEntrepriseLibelle(): boolean {
    return this._validEntrepriseLibelle;
    }

    set validEntrepriseLibelle(value: boolean) {
    this._validEntrepriseLibelle = value;
    }
    get validEntrepriseCode(): boolean {
    return this._validEntrepriseCode;
    }

    set validEntrepriseCode(value: boolean) {
    this._validEntrepriseCode = value;
    }


}

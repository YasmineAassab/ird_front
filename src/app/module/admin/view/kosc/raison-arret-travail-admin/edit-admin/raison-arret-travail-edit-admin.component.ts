import {Component, OnInit, Input} from '@angular/core';
import {RaisonArretTravailService} from 'src/app/controller/service/RaisonArretTravail.service';
import {RaisonArretTravailVo} from 'src/app/controller/model/RaisonArretTravail.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from 'src/app/controller/service/StringUtil.service';


@Component({
  selector: 'app-raison-arret-travail-edit-admin',
  templateUrl: './raison-arret-travail-edit-admin.component.html',
  styleUrls: ['./raison-arret-travail-edit-admin.component.css']
})
export class RaisonArretTravailEditAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validRaisonArretTravailLibelle = true;
   _validRaisonArretTravailCode = true;




constructor(private datePipe: DatePipe, private raisonArretTravailService: RaisonArretTravailService
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
    this.validRaisonArretTravailLibelle = value;
    this.validRaisonArretTravailCode = value;
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
     this.raisonArretTravailService.edit().subscribe(raisonArretTravail=>{
     const myIndex = this.raisonArretTravails.findIndex(e => e.id === this.selectedRaisonArretTravail.id);
     this.raisonArretTravails[myIndex] = raisonArretTravail;
     this.editRaisonArretTravailDialog = false;
     this.submitted = false;
     this.selectedRaisonArretTravail = new RaisonArretTravailVo();



    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateRaisonArretTravailLibelle();
this.validateRaisonArretTravailCode();

    }

private validateRaisonArretTravailLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedRaisonArretTravail.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validRaisonArretTravailLibelle = false;
        } else {
            this.validRaisonArretTravailLibelle = true;
        }
    }
private validateRaisonArretTravailCode(){
        if (this.stringUtilService.isEmpty(this.selectedRaisonArretTravail.code)) {
            this.errorMessages.push('Code non valide');
            this.validRaisonArretTravailCode = false;
        } else {
            this.validRaisonArretTravailCode = true;
        }
    }






//openPopup
// methods

hideEditDialog(){
    this.editRaisonArretTravailDialog  = false;
    this.setValidation(true);
}

// getters and setters

get raisonArretTravails(): Array<RaisonArretTravailVo> {
    return this.raisonArretTravailService.raisonArretTravails;
       }
set raisonArretTravails(value: Array<RaisonArretTravailVo>) {
        this.raisonArretTravailService.raisonArretTravails = value;
       }

 get selectedRaisonArretTravail(): RaisonArretTravailVo {
           return this.raisonArretTravailService.selectedRaisonArretTravail;
       }
    set selectedRaisonArretTravail(value: RaisonArretTravailVo) {
        this.raisonArretTravailService.selectedRaisonArretTravail = value;
       }

   get editRaisonArretTravailDialog(): boolean {
           return this.raisonArretTravailService.editRaisonArretTravailDialog;

       }
    set editRaisonArretTravailDialog(value: boolean) {
        this.raisonArretTravailService.editRaisonArretTravailDialog= value;
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

    get validRaisonArretTravailLibelle(): boolean {
    return this._validRaisonArretTravailLibelle;
    }

    set validRaisonArretTravailLibelle(value: boolean) {
    this._validRaisonArretTravailLibelle = value;
    }
    get validRaisonArretTravailCode(): boolean {
    return this._validRaisonArretTravailCode;
    }

    set validRaisonArretTravailCode(value: boolean) {
    this._validRaisonArretTravailCode = value;
    }

}

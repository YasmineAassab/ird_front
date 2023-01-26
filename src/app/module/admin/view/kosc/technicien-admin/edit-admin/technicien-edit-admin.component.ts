import {Component, OnInit, Input} from '@angular/core';
import {TechnicienService} from 'src/app/controller/service/Technicien.service';
import {TechnicienVo} from 'src/app/controller/model/Technicien.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from 'src/app/controller/service/StringUtil.service';


import {EntrepriseVo} from 'src/app/controller/model/Entreprise.model';
import {EntrepriseService} from 'src/app/controller/service/Entreprise.service';
@Component({
  selector: 'app-technicien-edit-admin',
  templateUrl: './technicien-edit-admin.component.html',
  styleUrls: ['./technicien-edit-admin.component.css']
})
export class TechnicienEditAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validTechnicienIdentifiant = true;

    _validEntrepriseLibelle = true;
    _validEntrepriseCode = true;



constructor(private datePipe: DatePipe, private technicienService: TechnicienService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private entrepriseService: EntrepriseService
) {

}


// methods
ngOnInit(): void {

    this.selectedEntreprise = new EntrepriseVo();
    this.entrepriseService.findAll().subscribe((data) => this.entreprises = data);
}




private setValidation(value : boolean){
    this.validTechnicienIdentifiant = value;
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
     this.technicienService.edit().subscribe(technicien=>{
     const myIndex = this.techniciens.findIndex(e => e.id === this.selectedTechnicien.id);
     this.techniciens[myIndex] = technicien;
     this.editTechnicienDialog = false;
     this.submitted = false;
     this.selectedTechnicien = new TechnicienVo();



    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateTechnicienIdentifiant();

    }

private validateTechnicienIdentifiant(){
        if (this.stringUtilService.isEmpty(this.selectedTechnicien.identifiant)) {
            this.errorMessages.push('Identifiant non valide');
            this.validTechnicienIdentifiant = false;
        } else {
            this.validTechnicienIdentifiant = true;
        }
    }













//openPopup
      public async openCreateEntreprise(entreprise: string) {
        const isPermistted = await this.roleService.isPermitted('Entreprise', 'edit');
        if(isPermistted) {
         this.selectedEntreprise = new EntrepriseVo();
         this.createEntrepriseDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideEditDialog(){
    this.editTechnicienDialog  = false;
    this.setValidation(true);
}

// getters and setters

get techniciens(): Array<TechnicienVo> {
    return this.technicienService.techniciens;
       }
set techniciens(value: Array<TechnicienVo>) {
        this.technicienService.techniciens = value;
       }

 get selectedTechnicien(): TechnicienVo {
           return this.technicienService.selectedTechnicien;
       }
    set selectedTechnicien(value: TechnicienVo) {
        this.technicienService.selectedTechnicien = value;
       }

   get editTechnicienDialog(): boolean {
           return this.technicienService.editTechnicienDialog;

       }
    set editTechnicienDialog(value: boolean) {
        this.technicienService.editTechnicienDialog= value;
       }

       get selectedEntreprise(): EntrepriseVo {
           return this.entrepriseService.selectedEntreprise;
       }
      set selectedEntreprise(value: EntrepriseVo) {
        this.entrepriseService.selectedEntreprise = value;
       }
       get entreprises(): Array<EntrepriseVo> {
           return this.entrepriseService.entreprises;
       }
       set entreprises(value: Array<EntrepriseVo>) {
        this.entrepriseService.entreprises = value;
       }
       get createEntrepriseDialog(): boolean {
           return this.entrepriseService.createEntrepriseDialog;
       }
      set createEntrepriseDialog(value: boolean) {
        this.entrepriseService.createEntrepriseDialog= value;
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

    get validTechnicienIdentifiant(): boolean {
    return this._validTechnicienIdentifiant;
    }

    set validTechnicienIdentifiant(value: boolean) {
    this._validTechnicienIdentifiant = value;
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

import {Component, OnInit, Input} from '@angular/core';
import {ArretTravailService} from 'src/app/controller/service/ArretTravail.service';
import {ArretTravailVo} from 'src/app/controller/model/ArretTravail.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from 'src/app/controller/service/StringUtil.service';


import {TechnicienVo} from 'src/app/controller/model/Technicien.model';
import {TechnicienService} from 'src/app/controller/service/Technicien.service';
import {RaisonArretTravailVo} from 'src/app/controller/model/RaisonArretTravail.model';
import {RaisonArretTravailService} from 'src/app/controller/service/RaisonArretTravail.service';
@Component({
  selector: 'app-arret-travail-edit-chercheur',
  templateUrl: './arret-travail-edit-chercheur.component.html',
  styleUrls: ['./arret-travail-edit-chercheur.component.css']
})
export class ArretTravailEditChercheurComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validArretTravailTechnicien = true;
   _validArretTravailDateDebut = true;
   _validArretTravailDateFin = true;
   _validArretTravailRaisonArretTravail = true;

    _validTechnicienIdentifiant = true;
    _validRaisonArretTravailLibelle = true;
    _validRaisonArretTravailCode = true;



constructor(private datePipe: DatePipe, private arretTravailService: ArretTravailService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private technicienService: TechnicienService
,       private raisonArretTravailService: RaisonArretTravailService
) {

}


// methods
ngOnInit(): void {

    this.selectedTechnicien = new TechnicienVo();
    this.technicienService.findAll().subscribe((data) => this.techniciens = data);
    this.selectedRaisonArretTravail = new RaisonArretTravailVo();
    this.raisonArretTravailService.findAll().subscribe((data) => this.raisonArretTravails = data);
}




private setValidation(value : boolean){
    this.validArretTravailTechnicien = value;
    this.validArretTravailDateDebut = value;
    this.validArretTravailDateFin = value;
    this.validArretTravailRaisonArretTravail = value;
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
     this.arretTravailService.edit().subscribe(arretTravail=>{
     const myIndex = this.arretTravails.findIndex(e => e.id === this.selectedArretTravail.id);
     this.arretTravails[myIndex] = arretTravail;
     this.editArretTravailDialog = false;
     this.submitted = false;
     this.selectedArretTravail = new ArretTravailVo();



    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateArretTravailTechnicien();
this.validateArretTravailDateDebut();
this.validateArretTravailDateFin();
this.validateArretTravailRaisonArretTravail();

    }

private validateArretTravailTechnicien(){
        if (this.stringUtilService.isEmpty(this.selectedArretTravail.technicienVo)) {
            this.errorMessages.push('Technicien non valide');
            this.validArretTravailTechnicien = false;
        } else {
            this.validArretTravailTechnicien = true;
        }
    }
private validateArretTravailDateDebut(){
        if (this.stringUtilService.isEmpty(this.selectedArretTravail.dateDebut)) {
            this.errorMessages.push('Date debut non valide');
            this.validArretTravailDateDebut = false;
        } else {
            this.validArretTravailDateDebut = true;
        }
    }
private validateArretTravailDateFin(){
        if (this.stringUtilService.isEmpty(this.selectedArretTravail.dateFin)) {
            this.errorMessages.push('Date fin non valide');
            this.validArretTravailDateFin = false;
        } else {
            this.validArretTravailDateFin = true;
        }
    }
private validateArretTravailRaisonArretTravail(){
        if (this.stringUtilService.isEmpty(this.selectedArretTravail.raisonArretTravailVo)) {
            this.errorMessages.push('Raison arret travail non valide');
            this.validArretTravailRaisonArretTravail = false;
        } else {
            this.validArretTravailRaisonArretTravail = true;
        }
    }









//openPopup
      public async openCreateTechnicien(technicien: string) {
        const isPermistted = await this.roleService.isPermitted('Technicien', 'edit');
        if(isPermistted) {
         this.selectedTechnicien = new TechnicienVo();
         this.createTechnicienDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
      public async openCreateRaisonArretTravail(raisonArretTravail: string) {
        const isPermistted = await this.roleService.isPermitted('RaisonArretTravail', 'edit');
        if(isPermistted) {
         this.selectedRaisonArretTravail = new RaisonArretTravailVo();
         this.createRaisonArretTravailDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideEditDialog(){
    this.editArretTravailDialog  = false;
    this.setValidation(true);
}

// getters and setters

get arretTravails(): Array<ArretTravailVo> {
    return this.arretTravailService.arretTravails;
       }
set arretTravails(value: Array<ArretTravailVo>) {
        this.arretTravailService.arretTravails = value;
       }

 get selectedArretTravail(): ArretTravailVo {
           return this.arretTravailService.selectedArretTravail;
       }
    set selectedArretTravail(value: ArretTravailVo) {
        this.arretTravailService.selectedArretTravail = value;
       }

   get editArretTravailDialog(): boolean {
           return this.arretTravailService.editArretTravailDialog;

       }
    set editArretTravailDialog(value: boolean) {
        this.arretTravailService.editArretTravailDialog= value;
       }

       get selectedTechnicien(): TechnicienVo {
           return this.technicienService.selectedTechnicien;
       }
      set selectedTechnicien(value: TechnicienVo) {
        this.technicienService.selectedTechnicien = value;
       }
       get techniciens(): Array<TechnicienVo> {
           return this.technicienService.techniciens;
       }
       set techniciens(value: Array<TechnicienVo>) {
        this.technicienService.techniciens = value;
       }
       get createTechnicienDialog(): boolean {
           return this.technicienService.createTechnicienDialog;
       }
      set createTechnicienDialog(value: boolean) {
        this.technicienService.createTechnicienDialog= value;
       }
       get selectedRaisonArretTravail(): RaisonArretTravailVo {
           return this.raisonArretTravailService.selectedRaisonArretTravail;
       }
      set selectedRaisonArretTravail(value: RaisonArretTravailVo) {
        this.raisonArretTravailService.selectedRaisonArretTravail = value;
       }
       get raisonArretTravails(): Array<RaisonArretTravailVo> {
           return this.raisonArretTravailService.raisonArretTravails;
       }
       set raisonArretTravails(value: Array<RaisonArretTravailVo>) {
        this.raisonArretTravailService.raisonArretTravails = value;
       }
       get createRaisonArretTravailDialog(): boolean {
           return this.raisonArretTravailService.createRaisonArretTravailDialog;
       }
      set createRaisonArretTravailDialog(value: boolean) {
        this.raisonArretTravailService.createRaisonArretTravailDialog= value;
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

    get validArretTravailTechnicien(): boolean {
    return this._validArretTravailTechnicien;
    }

    set validArretTravailTechnicien(value: boolean) {
    this._validArretTravailTechnicien = value;
    }
    get validArretTravailDateDebut(): boolean {
    return this._validArretTravailDateDebut;
    }

    set validArretTravailDateDebut(value: boolean) {
    this._validArretTravailDateDebut = value;
    }
    get validArretTravailDateFin(): boolean {
    return this._validArretTravailDateFin;
    }

    set validArretTravailDateFin(value: boolean) {
    this._validArretTravailDateFin = value;
    }
    get validArretTravailRaisonArretTravail(): boolean {
    return this._validArretTravailRaisonArretTravail;
    }

    set validArretTravailRaisonArretTravail(value: boolean) {
    this._validArretTravailRaisonArretTravail = value;
    }

    get validTechnicienIdentifiant(): boolean {
    return this._validTechnicienIdentifiant;
    }

    set validTechnicienIdentifiant(value: boolean) {
    this._validTechnicienIdentifiant = value;
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

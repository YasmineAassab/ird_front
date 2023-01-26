import {Component, OnInit, Input} from '@angular/core';
import {DepartementTechnicienService} from 'src/app/controller/service/DepartementTechnicien.service';
import {DepartementTechnicienVo} from 'src/app/controller/model/DepartementTechnicien.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from 'src/app/controller/service/StringUtil.service';


import {TechnicienVo} from 'src/app/controller/model/Technicien.model';
import {TechnicienService} from 'src/app/controller/service/Technicien.service';
import {DepartementVo} from 'src/app/controller/model/Departement.model';
import {DepartementService} from 'src/app/controller/service/Departement.service';
@Component({
  selector: 'app-departement-technicien-edit-admin',
  templateUrl: './departement-technicien-edit-admin.component.html',
  styleUrls: ['./departement-technicien-edit-admin.component.css']
})
export class DepartementTechnicienEditAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validDepartementTechnicienTechnicien = true;
   _validDepartementTechnicienDepartement = true;
   _validDepartementTechnicienDateDebut = true;
   _validDepartementTechnicienDateFin = true;

    _validTechnicienIdentifiant = true;
    _validDepartementLibelle = true;
    _validDepartementCode = true;
    _validDepartementRegion = true;



constructor(private datePipe: DatePipe, private departementTechnicienService: DepartementTechnicienService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private technicienService: TechnicienService
,       private departementService: DepartementService
) {

}


// methods
ngOnInit(): void {

    this.selectedTechnicien = new TechnicienVo();
    this.technicienService.findAll().subscribe((data) => this.techniciens = data);
    this.selectedDepartement = new DepartementVo();
    this.departementService.findAll().subscribe((data) => this.departements = data);
}




private setValidation(value : boolean){
    this.validDepartementTechnicienTechnicien = value;
    this.validDepartementTechnicienDepartement = value;
    this.validDepartementTechnicienDateDebut = value;
    this.validDepartementTechnicienDateFin = value;
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
     this.departementTechnicienService.edit().subscribe(departementTechnicien=>{
     const myIndex = this.departementTechniciens.findIndex(e => e.id === this.selectedDepartementTechnicien.id);
     this.departementTechniciens[myIndex] = departementTechnicien;
     this.editDepartementTechnicienDialog = false;
     this.submitted = false;
     this.selectedDepartementTechnicien = new DepartementTechnicienVo();



    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateDepartementTechnicienTechnicien();
this.validateDepartementTechnicienDepartement();
this.validateDepartementTechnicienDateDebut();
this.validateDepartementTechnicienDateFin();

    }

private validateDepartementTechnicienTechnicien(){
        if (this.stringUtilService.isEmpty(this.selectedDepartementTechnicien.technicienVo)) {
            this.errorMessages.push('Technicien non valide');
            this.validDepartementTechnicienTechnicien = false;
        } else {
            this.validDepartementTechnicienTechnicien = true;
        }
    }
private validateDepartementTechnicienDepartement(){
        if (this.stringUtilService.isEmpty(this.selectedDepartementTechnicien.departementVo)) {
            this.errorMessages.push('Departement non valide');
            this.validDepartementTechnicienDepartement = false;
        } else {
            this.validDepartementTechnicienDepartement = true;
        }
    }
private validateDepartementTechnicienDateDebut(){
        if (this.stringUtilService.isEmpty(this.selectedDepartementTechnicien.dateDebut)) {
            this.errorMessages.push('Date debut non valide');
            this.validDepartementTechnicienDateDebut = false;
        } else {
            this.validDepartementTechnicienDateDebut = true;
        }
    }
private validateDepartementTechnicienDateFin(){
        if (this.stringUtilService.isEmpty(this.selectedDepartementTechnicien.dateFin)) {
            this.errorMessages.push('Date fin non valide');
            this.validDepartementTechnicienDateFin = false;
        } else {
            this.validDepartementTechnicienDateFin = true;
        }
    }








//openPopup
      public async openCreateDepartement(departement: string) {
        const isPermistted = await this.roleService.isPermitted('Departement', 'edit');
        if(isPermistted) {
         this.selectedDepartement = new DepartementVo();
         this.createDepartementDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
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
// methods

hideEditDialog(){
    this.editDepartementTechnicienDialog  = false;
    this.setValidation(true);
}

// getters and setters

get departementTechniciens(): Array<DepartementTechnicienVo> {
    return this.departementTechnicienService.departementTechniciens;
       }
set departementTechniciens(value: Array<DepartementTechnicienVo>) {
        this.departementTechnicienService.departementTechniciens = value;
       }

 get selectedDepartementTechnicien(): DepartementTechnicienVo {
           return this.departementTechnicienService.selectedDepartementTechnicien;
       }
    set selectedDepartementTechnicien(value: DepartementTechnicienVo) {
        this.departementTechnicienService.selectedDepartementTechnicien = value;
       }

   get editDepartementTechnicienDialog(): boolean {
           return this.departementTechnicienService.editDepartementTechnicienDialog;

       }
    set editDepartementTechnicienDialog(value: boolean) {
        this.departementTechnicienService.editDepartementTechnicienDialog= value;
       }

       get selectedDepartement(): DepartementVo {
           return this.departementService.selectedDepartement;
       }
      set selectedDepartement(value: DepartementVo) {
        this.departementService.selectedDepartement = value;
       }
       get departements(): Array<DepartementVo> {
           return this.departementService.departements;
       }
       set departements(value: Array<DepartementVo>) {
        this.departementService.departements = value;
       }
       get createDepartementDialog(): boolean {
           return this.departementService.createDepartementDialog;
       }
      set createDepartementDialog(value: boolean) {
        this.departementService.createDepartementDialog= value;
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

    get validDepartementTechnicienTechnicien(): boolean {
    return this._validDepartementTechnicienTechnicien;
    }

    set validDepartementTechnicienTechnicien(value: boolean) {
    this._validDepartementTechnicienTechnicien = value;
    }
    get validDepartementTechnicienDepartement(): boolean {
    return this._validDepartementTechnicienDepartement;
    }

    set validDepartementTechnicienDepartement(value: boolean) {
    this._validDepartementTechnicienDepartement = value;
    }
    get validDepartementTechnicienDateDebut(): boolean {
    return this._validDepartementTechnicienDateDebut;
    }

    set validDepartementTechnicienDateDebut(value: boolean) {
    this._validDepartementTechnicienDateDebut = value;
    }
    get validDepartementTechnicienDateFin(): boolean {
    return this._validDepartementTechnicienDateFin;
    }

    set validDepartementTechnicienDateFin(value: boolean) {
    this._validDepartementTechnicienDateFin = value;
    }

    get validTechnicienIdentifiant(): boolean {
    return this._validTechnicienIdentifiant;
    }

    set validTechnicienIdentifiant(value: boolean) {
    this._validTechnicienIdentifiant = value;
    }
    get validDepartementLibelle(): boolean {
    return this._validDepartementLibelle;
    }

    set validDepartementLibelle(value: boolean) {
    this._validDepartementLibelle = value;
    }
    get validDepartementCode(): boolean {
    return this._validDepartementCode;
    }

    set validDepartementCode(value: boolean) {
    this._validDepartementCode = value;
    }
    get validDepartementRegion(): boolean {
    return this._validDepartementRegion;
    }

    set validDepartementRegion(value: boolean) {
    this._validDepartementRegion = value;
    }
}

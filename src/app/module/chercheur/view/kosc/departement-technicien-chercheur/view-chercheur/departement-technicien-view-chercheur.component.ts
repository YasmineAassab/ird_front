import {Component, OnInit} from '@angular/core';
import {DepartementTechnicienService} from 'src/app/controller/service/DepartementTechnicien.service';
import {DepartementTechnicienVo} from 'src/app/controller/model/DepartementTechnicien.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {DepartementVo} from 'src/app/controller/model/Departement.model';
import {DepartementService} from 'src/app/controller/service/Departement.service';
import {TechnicienVo} from 'src/app/controller/model/Technicien.model';
import {TechnicienService} from 'src/app/controller/service/Technicien.service';

@Component({
  selector: 'app-departement-technicien-view-chercheur',
  templateUrl: './departement-technicien-view-chercheur.component.html',
  styleUrls: ['./departement-technicien-view-chercheur.component.css']
})
export class DepartementTechnicienViewChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private departementTechnicienService: DepartementTechnicienService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private departementService: DepartementService
    ,private technicienService: TechnicienService
) {
}

// methods
ngOnInit(): void {
    this.selectedTechnicien = new TechnicienVo();
    this.technicienService.findAll().subscribe((data) => this.techniciens = data);
    this.selectedDepartement = new DepartementVo();
    this.departementService.findAll().subscribe((data) => this.departements = data);
}

hideViewDialog(){
    this.viewDepartementTechnicienDialog  = false;
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

   get viewDepartementTechnicienDialog(): boolean {
           return this.departementTechnicienService.viewDepartementTechnicienDialog;

       }
    set viewDepartementTechnicienDialog(value: boolean) {
        this.departementTechnicienService.viewDepartementTechnicienDialog= value;
       }

       get selectedDepartement(): DepartementVo {
           return this.departementService.selectedDepartement;
       }
      set selectedDepartement(value: DepartementVo) {
        this.departementService.selectedDepartement = value;
       }
       get departements():Array<DepartementVo> {
           return this.departementService.departements;
       }
       set departements(value: Array<DepartementVo>) {
        this.departementService.departements = value;
       }
       get editDepartementDialog(): boolean {
           return this.departementService.editDepartementDialog;
       }
      set editDepartementDialog(value: boolean) {
        this.departementService.editDepartementDialog= value;
       }
       get selectedTechnicien(): TechnicienVo {
           return this.technicienService.selectedTechnicien;
       }
      set selectedTechnicien(value: TechnicienVo) {
        this.technicienService.selectedTechnicien = value;
       }
       get techniciens():Array<TechnicienVo> {
           return this.technicienService.techniciens;
       }
       set techniciens(value: Array<TechnicienVo>) {
        this.technicienService.techniciens = value;
       }
       get editTechnicienDialog(): boolean {
           return this.technicienService.editTechnicienDialog;
       }
      set editTechnicienDialog(value: boolean) {
        this.technicienService.editTechnicienDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}

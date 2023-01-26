import {Component, OnInit} from '@angular/core';
import {TechnicienService} from 'src/app/controller/service/Technicien.service';
import {TechnicienVo} from 'src/app/controller/model/Technicien.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {EntrepriseVo} from 'src/app/controller/model/Entreprise.model';
import {EntrepriseService} from 'src/app/controller/service/Entreprise.service';

@Component({
  selector: 'app-technicien-view-admin',
  templateUrl: './technicien-view-admin.component.html',
  styleUrls: ['./technicien-view-admin.component.css']
})
export class TechnicienViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private technicienService: TechnicienService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private entrepriseService: EntrepriseService
) {
}

// methods
ngOnInit(): void {
    this.selectedEntreprise = new EntrepriseVo();
    this.entrepriseService.findAll().subscribe((data) => this.entreprises = data);
}

hideViewDialog(){
    this.viewTechnicienDialog  = false;
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

   get viewTechnicienDialog(): boolean {
           return this.technicienService.viewTechnicienDialog;

       }
    set viewTechnicienDialog(value: boolean) {
        this.technicienService.viewTechnicienDialog= value;
       }

       get selectedEntreprise(): EntrepriseVo {
           return this.entrepriseService.selectedEntreprise;
       }
      set selectedEntreprise(value: EntrepriseVo) {
        this.entrepriseService.selectedEntreprise = value;
       }
       get entreprises():Array<EntrepriseVo> {
           return this.entrepriseService.entreprises;
       }
       set entreprises(value: Array<EntrepriseVo>) {
        this.entrepriseService.entreprises = value;
       }
       get editEntrepriseDialog(): boolean {
           return this.entrepriseService.editEntrepriseDialog;
       }
      set editEntrepriseDialog(value: boolean) {
        this.entrepriseService.editEntrepriseDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}

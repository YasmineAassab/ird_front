import {Component, OnInit} from '@angular/core';
import {ArretTravailService} from 'src/app/controller/service/ArretTravail.service';
import {ArretTravailVo} from 'src/app/controller/model/ArretTravail.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {RaisonArretTravailVo} from 'src/app/controller/model/RaisonArretTravail.model';
import {RaisonArretTravailService} from 'src/app/controller/service/RaisonArretTravail.service';
import {TechnicienVo} from 'src/app/controller/model/Technicien.model';
import {TechnicienService} from 'src/app/controller/service/Technicien.service';

@Component({
  selector: 'app-arret-travail-view-chercheur',
  templateUrl: './arret-travail-view-chercheur.component.html',
  styleUrls: ['./arret-travail-view-chercheur.component.css']
})
export class ArretTravailViewChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private arretTravailService: ArretTravailService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private raisonArretTravailService: RaisonArretTravailService
    ,private technicienService: TechnicienService
) {
}

// methods
ngOnInit(): void {
    this.selectedTechnicien = new TechnicienVo();
    this.technicienService.findAll().subscribe((data) => this.techniciens = data);
    this.selectedRaisonArretTravail = new RaisonArretTravailVo();
    this.raisonArretTravailService.findAll().subscribe((data) => this.raisonArretTravails = data);
}

hideViewDialog(){
    this.viewArretTravailDialog  = false;
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

   get viewArretTravailDialog(): boolean {
           return this.arretTravailService.viewArretTravailDialog;

       }
    set viewArretTravailDialog(value: boolean) {
        this.arretTravailService.viewArretTravailDialog= value;
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
       get selectedRaisonArretTravail(): RaisonArretTravailVo {
           return this.raisonArretTravailService.selectedRaisonArretTravail;
       }
      set selectedRaisonArretTravail(value: RaisonArretTravailVo) {
        this.raisonArretTravailService.selectedRaisonArretTravail = value;
       }
       get raisonArretTravails():Array<RaisonArretTravailVo> {
           return this.raisonArretTravailService.raisonArretTravails;
       }
       set raisonArretTravails(value: Array<RaisonArretTravailVo>) {
        this.raisonArretTravailService.raisonArretTravails = value;
       }
       get editRaisonArretTravailDialog(): boolean {
           return this.raisonArretTravailService.editRaisonArretTravailDialog;
       }
      set editRaisonArretTravailDialog(value: boolean) {
        this.raisonArretTravailService.editRaisonArretTravailDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}

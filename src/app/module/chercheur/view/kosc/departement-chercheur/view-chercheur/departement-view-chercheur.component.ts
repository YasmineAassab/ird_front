import {Component, OnInit} from '@angular/core';
import {DepartementService} from 'src/app/controller/service/Departement.service';
import {DepartementVo} from 'src/app/controller/model/Departement.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {RegionVo} from 'src/app/controller/model/Region.model';
import {RegionService} from 'src/app/controller/service/Region.service';

@Component({
  selector: 'app-departement-view-chercheur',
  templateUrl: './departement-view-chercheur.component.html',
  styleUrls: ['./departement-view-chercheur.component.css']
})
export class DepartementViewChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private departementService: DepartementService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private regionService: RegionService
) {
}

// methods
ngOnInit(): void {
    this.selectedRegion = new RegionVo();
    this.regionService.findAll().subscribe((data) => this.regions = data);
}

hideViewDialog(){
    this.viewDepartementDialog  = false;
}

// getters and setters

get departements(): Array<DepartementVo> {
    return this.departementService.departements;
       }
set departements(value: Array<DepartementVo>) {
        this.departementService.departements = value;
       }

 get selectedDepartement(): DepartementVo {
           return this.departementService.selectedDepartement;
       }
    set selectedDepartement(value: DepartementVo) {
        this.departementService.selectedDepartement = value;
       }

   get viewDepartementDialog(): boolean {
           return this.departementService.viewDepartementDialog;

       }
    set viewDepartementDialog(value: boolean) {
        this.departementService.viewDepartementDialog= value;
       }

       get selectedRegion(): RegionVo {
           return this.regionService.selectedRegion;
       }
      set selectedRegion(value: RegionVo) {
        this.regionService.selectedRegion = value;
       }
       get regions():Array<RegionVo> {
           return this.regionService.regions;
       }
       set regions(value: Array<RegionVo>) {
        this.regionService.regions = value;
       }
       get editRegionDialog(): boolean {
           return this.regionService.editRegionDialog;
       }
      set editRegionDialog(value: boolean) {
        this.regionService.editRegionDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}

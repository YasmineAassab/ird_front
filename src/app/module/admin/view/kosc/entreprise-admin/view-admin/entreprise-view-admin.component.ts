import {Component, OnInit} from '@angular/core';
import {EntrepriseService} from 'src/app/controller/service/Entreprise.service';
import {EntrepriseVo} from 'src/app/controller/model/Entreprise.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-entreprise-view-admin',
  templateUrl: './entreprise-view-admin.component.html',
  styleUrls: ['./entreprise-view-admin.component.css']
})
export class EntrepriseViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private entrepriseService: EntrepriseService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewEntrepriseDialog  = false;
}

// getters and setters

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

   get viewEntrepriseDialog(): boolean {
           return this.entrepriseService.viewEntrepriseDialog;

       }
    set viewEntrepriseDialog(value: boolean) {
        this.entrepriseService.viewEntrepriseDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}

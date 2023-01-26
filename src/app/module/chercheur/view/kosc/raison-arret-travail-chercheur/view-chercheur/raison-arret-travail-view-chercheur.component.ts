import {Component, OnInit} from '@angular/core';
import {RaisonArretTravailService} from 'src/app/controller/service/RaisonArretTravail.service';
import {RaisonArretTravailVo} from 'src/app/controller/model/RaisonArretTravail.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-raison-arret-travail-view-chercheur',
  templateUrl: './raison-arret-travail-view-chercheur.component.html',
  styleUrls: ['./raison-arret-travail-view-chercheur.component.css']
})
export class RaisonArretTravailViewChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private raisonArretTravailService: RaisonArretTravailService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewRaisonArretTravailDialog  = false;
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

   get viewRaisonArretTravailDialog(): boolean {
           return this.raisonArretTravailService.viewRaisonArretTravailDialog;

       }
    set viewRaisonArretTravailDialog(value: boolean) {
        this.raisonArretTravailService.viewRaisonArretTravailDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}

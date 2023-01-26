import {Component, OnInit} from '@angular/core';
import {EtatDemandeKoscService} from 'src/app/controller/service/EtatDemandeKosc.service';
import {EtatDemandeKoscVo} from 'src/app/controller/model/EtatDemandeKosc.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-etat-demande-kosc-view-chercheur',
  templateUrl: './etat-demande-kosc-view-chercheur.component.html',
  styleUrls: ['./etat-demande-kosc-view-chercheur.component.css']
})
export class EtatDemandeKoscViewChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private etatDemandeKoscService: EtatDemandeKoscService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewEtatDemandeKoscDialog  = false;
}

// getters and setters

get etatDemandeKoscs(): Array<EtatDemandeKoscVo> {
    return this.etatDemandeKoscService.etatDemandeKoscs;
       }
set etatDemandeKoscs(value: Array<EtatDemandeKoscVo>) {
        this.etatDemandeKoscService.etatDemandeKoscs = value;
       }

 get selectedEtatDemandeKosc(): EtatDemandeKoscVo {
           return this.etatDemandeKoscService.selectedEtatDemandeKosc;
       }
    set selectedEtatDemandeKosc(value: EtatDemandeKoscVo) {
        this.etatDemandeKoscService.selectedEtatDemandeKosc = value;
       }

   get viewEtatDemandeKoscDialog(): boolean {
           return this.etatDemandeKoscService.viewEtatDemandeKoscDialog;

       }
    set viewEtatDemandeKoscDialog(value: boolean) {
        this.etatDemandeKoscService.viewEtatDemandeKoscDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}

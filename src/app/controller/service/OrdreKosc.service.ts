import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from 'src/environments/environment';


import {OrdreKoscVo} from '../model/OrdreKosc.model';
import {TemplateEmailReplanificationVo} from '../model/TemplateEmailReplanification.model';
import {EtatDemandeKoscVo} from '../model/EtatDemandeKosc.model';
import {TemplateEmailPlanificationVo} from '../model/TemplateEmailPlanification.model';
import {TemplateEmailClotureVo} from '../model/TemplateEmailCloture.model';
import {TemplateSuiviVo} from '../model/TemplateSuivi.model';
import {OperatorVo} from '../model/Operator.model';
import {DepartementVo} from '../model/Departement.model';
import {TemplateEmailKoscVo} from '../model/TemplateEmailKosc.model';
import {TemplateEmailReportVo} from '../model/TemplateEmailReport.model';
import {ClientVo} from '../model/Client.model';
import {TechnicienVo} from '../model/Technicien.model';
import {TemplateEmailClientInjoinableVo} from '../model/TemplateEmailClientInjoinable.model';


@Injectable({
  providedIn: 'root'
})
export class OrdreKoscService {
    private API = '' ;
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/ordreKosc/';
        });
    }
     private _ordreKoscs: Array<OrdreKoscVo> ;
     private _selectedOrdreKosc: OrdreKoscVo;
     private _ordreKoscSelections: Array<OrdreKoscVo>;
     private _createOrdreKoscDialog: boolean;
     private _editOrdreKoscDialog: boolean;
     private _viewOrdreKoscDialog: boolean;
     public editOrdreKosc$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchOrdreKosc: OrdreKoscVo ;

    // methods

    public findSuivi(){
        return this.http.get<Array<OrdreKoscVo>>(this.API + 'suivi/');
    }

    public findAll(){
     return this.http.get<Array<OrdreKoscVo>>(this.API);
    }

    public save(): Observable<OrdreKoscVo> {
           return this.http.post<OrdreKoscVo>(this.API, {...this.selectedOrdreKosc,dateEnvoiSuivi: moment(this.selectedOrdreKosc.dateEnvoiSuivi).format('YYYY-MM-DD')});
    }

    delete(ordreKosc: OrdreKoscVo) {
         return this.http.delete<number>(this.API + 'id/' + ordreKosc.id);
    }


    public edit(): Observable<OrdreKoscVo> {
        return this.http.put<OrdreKoscVo>(this.API, this.selectedOrdreKosc);
    }


     public findByCriteria(ordreKosc:OrdreKoscVo): Observable<Array<OrdreKoscVo>>{
           return this.http.post<Array<OrdreKoscVo>>(this.API + 'search', ordreKosc);
    }

   public findByIdWithAssociatedList(ordreKosc:OrdreKoscVo):Observable<OrdreKoscVo>{
         return this.http.get<OrdreKoscVo>(this.API + 'detail/id/' +ordreKosc.id);
    }

    // getters and setters


    get ordreKoscs(): Array<OrdreKoscVo> {
    if(this._ordreKoscs == null){
    this._ordreKoscs = new Array<OrdreKoscVo>();
    }
return this._ordreKoscs;
       }

    set ordreKoscs(value: Array<OrdreKoscVo>) {
        this._ordreKoscs = value;
       }

    get selectedOrdreKosc(): OrdreKoscVo {
    if(this._selectedOrdreKosc == null){
    this._selectedOrdreKosc = new OrdreKoscVo();
    }
           return this._selectedOrdreKosc;
       }

    set selectedOrdreKosc(value: OrdreKoscVo) {
        this._selectedOrdreKosc = value;
       }

    get ordreKoscSelections(): Array<OrdreKoscVo> {
    if(this._ordreKoscSelections == null){
    this._ordreKoscSelections = new Array<OrdreKoscVo>();
    }
        return this._ordreKoscSelections;
       }


    set ordreKoscSelections(value: Array<OrdreKoscVo>) {
        this._ordreKoscSelections = value;
       }

    get createOrdreKoscDialog(): boolean {
        return this._createOrdreKoscDialog;
       }

    set createOrdreKoscDialog(value: boolean) {
        this._createOrdreKoscDialog = value;
       }

    get editOrdreKoscDialog(): boolean {
        return this._editOrdreKoscDialog;
       }

    set editOrdreKoscDialog(value: boolean) {
        this._editOrdreKoscDialog = value;
       }

    get viewOrdreKoscDialog(): boolean {
        return this._viewOrdreKoscDialog;
       }

    set viewOrdreKoscDialog(value: boolean) {
        this._viewOrdreKoscDialog = value;
       }

     get searchOrdreKosc(): OrdreKoscVo {
     if(this._searchOrdreKosc==null){
    this._searchOrdreKosc=new OrdreKoscVo();
    }
        return this._searchOrdreKosc;
    }

    set searchOrdreKosc(value: OrdreKoscVo) {
        this._searchOrdreKosc = value;
       }

}

import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from 'src/environments/environment';


import {EtatDemandeKoscVo} from '../model/EtatDemandeKosc.model';


@Injectable({
  providedIn: 'root'
})
export class EtatDemandeKoscService {
    private API = '' ;
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/etatDemandeKosc/';
        });
    }
     private _etatDemandeKoscs: Array<EtatDemandeKoscVo> ;
     private _selectedEtatDemandeKosc: EtatDemandeKoscVo;
     private _etatDemandeKoscSelections: Array<EtatDemandeKoscVo>;
     private _createEtatDemandeKoscDialog: boolean;
     private _editEtatDemandeKoscDialog: boolean;
     private _viewEtatDemandeKoscDialog: boolean;
     public editEtatDemandeKosc$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchEtatDemandeKosc: EtatDemandeKoscVo ;

    // methods

    public findAll(){
     return this.http.get<Array<EtatDemandeKoscVo>>(this.API);
    }

    public save(): Observable<EtatDemandeKoscVo> {
         return this.http.post<EtatDemandeKoscVo>(this.API, this.selectedEtatDemandeKosc);
    }

    delete(etatDemandeKosc: EtatDemandeKoscVo) {
         return this.http.delete<number>(this.API + 'id/' + etatDemandeKosc.id);
    }


    public edit(): Observable<EtatDemandeKoscVo> {
        return this.http.put<EtatDemandeKoscVo>(this.API, this.selectedEtatDemandeKosc);
    }


     public findByCriteria(etatDemandeKosc:EtatDemandeKoscVo): Observable<Array<EtatDemandeKoscVo>>{
           return this.http.post<Array<EtatDemandeKoscVo>>(this.API + 'search', etatDemandeKosc);
    }

   public findByIdWithAssociatedList(etatDemandeKosc:EtatDemandeKoscVo):Observable<EtatDemandeKoscVo>{
         return this.http.get<EtatDemandeKoscVo>(this.API + 'detail/id/' +etatDemandeKosc.id);
    }

    // getters and setters


    get etatDemandeKoscs(): Array<EtatDemandeKoscVo> {
    if(this._etatDemandeKoscs == null){
    this._etatDemandeKoscs = new Array<EtatDemandeKoscVo>();
    }
return this._etatDemandeKoscs;
       }

    set etatDemandeKoscs(value: Array<EtatDemandeKoscVo>) {
        this._etatDemandeKoscs = value;
       }

    get selectedEtatDemandeKosc(): EtatDemandeKoscVo {
    if(this._selectedEtatDemandeKosc == null){
    this._selectedEtatDemandeKosc = new EtatDemandeKoscVo();
    }
           return this._selectedEtatDemandeKosc;
       }

    set selectedEtatDemandeKosc(value: EtatDemandeKoscVo) {
        this._selectedEtatDemandeKosc = value;
       }

    get etatDemandeKoscSelections(): Array<EtatDemandeKoscVo> {
    if(this._etatDemandeKoscSelections == null){
    this._etatDemandeKoscSelections = new Array<EtatDemandeKoscVo>();
    }
        return this._etatDemandeKoscSelections;
       }


    set etatDemandeKoscSelections(value: Array<EtatDemandeKoscVo>) {
        this._etatDemandeKoscSelections = value;
       }

    get createEtatDemandeKoscDialog(): boolean {
        return this._createEtatDemandeKoscDialog;
       }

    set createEtatDemandeKoscDialog(value: boolean) {
        this._createEtatDemandeKoscDialog = value;
       }

    get editEtatDemandeKoscDialog(): boolean {
        return this._editEtatDemandeKoscDialog;
       }

    set editEtatDemandeKoscDialog(value: boolean) {
        this._editEtatDemandeKoscDialog = value;
       }

    get viewEtatDemandeKoscDialog(): boolean {
        return this._viewEtatDemandeKoscDialog;
       }

    set viewEtatDemandeKoscDialog(value: boolean) {
        this._viewEtatDemandeKoscDialog = value;
       }

     get searchEtatDemandeKosc(): EtatDemandeKoscVo {
     if(this._searchEtatDemandeKosc==null){
    this._searchEtatDemandeKosc=new EtatDemandeKoscVo();
    }
        return this._searchEtatDemandeKosc;
    }

    set searchEtatDemandeKosc(value: EtatDemandeKoscVo) {
        this._searchEtatDemandeKosc = value;
       }

}

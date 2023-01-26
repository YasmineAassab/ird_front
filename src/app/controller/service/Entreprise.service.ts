import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from 'src/environments/environment';


import {EntrepriseVo} from '../model/Entreprise.model';


@Injectable({
  providedIn: 'root'
})
export class EntrepriseService {
    private API = '' ;
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/entreprise/';
        });
    }
     private _entreprises: Array<EntrepriseVo> ;
     private _selectedEntreprise: EntrepriseVo;
     private _entrepriseSelections: Array<EntrepriseVo>;
     private _createEntrepriseDialog: boolean;
     private _editEntrepriseDialog: boolean;
     private _viewEntrepriseDialog: boolean;
     public editEntreprise$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchEntreprise: EntrepriseVo ;

    // methods

    public findAll(){
     return this.http.get<Array<EntrepriseVo>>(this.API);
    }

    public save(): Observable<EntrepriseVo> {
         return this.http.post<EntrepriseVo>(this.API, this.selectedEntreprise);
    }

    delete(entreprise: EntrepriseVo) {
         return this.http.delete<number>(this.API + 'id/' + entreprise.id);
    }


    public edit(): Observable<EntrepriseVo> {
        return this.http.put<EntrepriseVo>(this.API, this.selectedEntreprise);
    }


     public findByCriteria(entreprise:EntrepriseVo): Observable<Array<EntrepriseVo>>{
           return this.http.post<Array<EntrepriseVo>>(this.API + 'search', entreprise);
    }

   public findByIdWithAssociatedList(entreprise:EntrepriseVo):Observable<EntrepriseVo>{
         return this.http.get<EntrepriseVo>(this.API + 'detail/id/' +entreprise.id);
    }

    // getters and setters


    get entreprises(): Array<EntrepriseVo> {
    if(this._entreprises == null){
    this._entreprises = new Array<EntrepriseVo>();
    }
return this._entreprises;
       }

    set entreprises(value: Array<EntrepriseVo>) {
        this._entreprises = value;
       }

    get selectedEntreprise(): EntrepriseVo {
    if(this._selectedEntreprise == null){
    this._selectedEntreprise = new EntrepriseVo();
    }
           return this._selectedEntreprise;
       }

    set selectedEntreprise(value: EntrepriseVo) {
        this._selectedEntreprise = value;
       }

    get entrepriseSelections(): Array<EntrepriseVo> {
    if(this._entrepriseSelections == null){
    this._entrepriseSelections = new Array<EntrepriseVo>();
    }
        return this._entrepriseSelections;
       }


    set entrepriseSelections(value: Array<EntrepriseVo>) {
        this._entrepriseSelections = value;
       }

    get createEntrepriseDialog(): boolean {
        return this._createEntrepriseDialog;
       }

    set createEntrepriseDialog(value: boolean) {
        this._createEntrepriseDialog = value;
       }

    get editEntrepriseDialog(): boolean {
        return this._editEntrepriseDialog;
       }

    set editEntrepriseDialog(value: boolean) {
        this._editEntrepriseDialog = value;
       }

    get viewEntrepriseDialog(): boolean {
        return this._viewEntrepriseDialog;
       }

    set viewEntrepriseDialog(value: boolean) {
        this._viewEntrepriseDialog = value;
       }

     get searchEntreprise(): EntrepriseVo {
     if(this._searchEntreprise==null){
    this._searchEntreprise=new EntrepriseVo();
    }
        return this._searchEntreprise;
    }

    set searchEntreprise(value: EntrepriseVo) {
        this._searchEntreprise = value;
       }

}

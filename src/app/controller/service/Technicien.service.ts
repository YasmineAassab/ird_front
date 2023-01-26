import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from 'src/environments/environment';


import {TechnicienVo} from '../model/Technicien.model';
import {EntrepriseVo} from '../model/Entreprise.model';


@Injectable({
  providedIn: 'root'
})
export class TechnicienService {
    private API = '' ;
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/technicien/';
        });
    }
     private _techniciens: Array<TechnicienVo> ;
     private _selectedTechnicien: TechnicienVo;
     private _technicienSelections: Array<TechnicienVo>;
     private _createTechnicienDialog: boolean;
     private _editTechnicienDialog: boolean;
     private _viewTechnicienDialog: boolean;
     public editTechnicien$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchTechnicien: TechnicienVo ;

    // methods

    public findAll(){
     return this.http.get<Array<TechnicienVo>>(this.API);
    }

    public save(): Observable<TechnicienVo> {
         return this.http.post<TechnicienVo>(this.API, this.selectedTechnicien);
    }

    delete(technicien: TechnicienVo) {
         return this.http.delete<number>(this.API + 'id/' + technicien.id);
    }


    public edit(): Observable<TechnicienVo> {
        return this.http.put<TechnicienVo>(this.API, this.selectedTechnicien);
    }


     public findByCriteria(technicien:TechnicienVo): Observable<Array<TechnicienVo>>{
           return this.http.post<Array<TechnicienVo>>(this.API + 'search', technicien);
    }

   public findByIdWithAssociatedList(technicien:TechnicienVo):Observable<TechnicienVo>{
         return this.http.get<TechnicienVo>(this.API + 'detail/id/' +technicien.id);
    }

    // getters and setters


    get techniciens(): Array<TechnicienVo> {
    if(this._techniciens == null){
    this._techniciens = new Array<TechnicienVo>();
    }
return this._techniciens;
       }

    set techniciens(value: Array<TechnicienVo>) {
        this._techniciens = value;
       }

    get selectedTechnicien(): TechnicienVo {
    if(this._selectedTechnicien == null){
    this._selectedTechnicien = new TechnicienVo();
    }
           return this._selectedTechnicien;
       }

    set selectedTechnicien(value: TechnicienVo) {
        this._selectedTechnicien = value;
       }

    get technicienSelections(): Array<TechnicienVo> {
    if(this._technicienSelections == null){
    this._technicienSelections = new Array<TechnicienVo>();
    }
        return this._technicienSelections;
       }


    set technicienSelections(value: Array<TechnicienVo>) {
        this._technicienSelections = value;
       }

    get createTechnicienDialog(): boolean {
        return this._createTechnicienDialog;
       }

    set createTechnicienDialog(value: boolean) {
        this._createTechnicienDialog = value;
       }

    get editTechnicienDialog(): boolean {
        return this._editTechnicienDialog;
       }

    set editTechnicienDialog(value: boolean) {
        this._editTechnicienDialog = value;
       }

    get viewTechnicienDialog(): boolean {
        return this._viewTechnicienDialog;
       }

    set viewTechnicienDialog(value: boolean) {
        this._viewTechnicienDialog = value;
       }

     get searchTechnicien(): TechnicienVo {
     if(this._searchTechnicien==null){
    this._searchTechnicien=new TechnicienVo();
    }
        return this._searchTechnicien;
    }

    set searchTechnicien(value: TechnicienVo) {
        this._searchTechnicien = value;
       }

}

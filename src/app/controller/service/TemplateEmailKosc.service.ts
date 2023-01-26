import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from 'src/environments/environment';


import {TemplateEmailKoscVo} from '../model/TemplateEmailKosc.model';


@Injectable({
  providedIn: 'root'
})
export class TemplateEmailKoscService {
    private API = '' ;
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/templateEmailKosc/';
        });
    }
     private _templateEmailKoscs: Array<TemplateEmailKoscVo> ;
     private _selectedTemplateEmailKosc: TemplateEmailKoscVo;
     private _templateEmailKoscSelections: Array<TemplateEmailKoscVo>;
     private _createTemplateEmailKoscDialog: boolean;
     private _editTemplateEmailKoscDialog: boolean;
     private _viewTemplateEmailKoscDialog: boolean;
     public editTemplateEmailKosc$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchTemplateEmailKosc: TemplateEmailKoscVo ;

    // methods

    public findAll(){
     return this.http.get<Array<TemplateEmailKoscVo>>(this.API);
    }

    public save(): Observable<TemplateEmailKoscVo> {
         return this.http.post<TemplateEmailKoscVo>(this.API, this.selectedTemplateEmailKosc);
    }

    delete(templateEmailKosc: TemplateEmailKoscVo) {
         return this.http.delete<number>(this.API + 'id/' + templateEmailKosc.id);
    }


    public edit(): Observable<TemplateEmailKoscVo> {
        return this.http.put<TemplateEmailKoscVo>(this.API, this.selectedTemplateEmailKosc);
    }


     public findByCriteria(templateEmailKosc:TemplateEmailKoscVo): Observable<Array<TemplateEmailKoscVo>>{
           return this.http.post<Array<TemplateEmailKoscVo>>(this.API + 'search', templateEmailKosc);
    }

   public findByIdWithAssociatedList(templateEmailKosc:TemplateEmailKoscVo):Observable<TemplateEmailKoscVo>{
         return this.http.get<TemplateEmailKoscVo>(this.API + 'detail/id/' +templateEmailKosc.id);
    }

    // getters and setters


    get templateEmailKoscs(): Array<TemplateEmailKoscVo> {
    if(this._templateEmailKoscs == null){
    this._templateEmailKoscs = new Array<TemplateEmailKoscVo>();
    }
return this._templateEmailKoscs;
       }

    set templateEmailKoscs(value: Array<TemplateEmailKoscVo>) {
        this._templateEmailKoscs = value;
       }

    get selectedTemplateEmailKosc(): TemplateEmailKoscVo {
    if(this._selectedTemplateEmailKosc == null){
    this._selectedTemplateEmailKosc = new TemplateEmailKoscVo();
    }
           return this._selectedTemplateEmailKosc;
       }

    set selectedTemplateEmailKosc(value: TemplateEmailKoscVo) {
        this._selectedTemplateEmailKosc = value;
       }

    get templateEmailKoscSelections(): Array<TemplateEmailKoscVo> {
    if(this._templateEmailKoscSelections == null){
    this._templateEmailKoscSelections = new Array<TemplateEmailKoscVo>();
    }
        return this._templateEmailKoscSelections;
       }


    set templateEmailKoscSelections(value: Array<TemplateEmailKoscVo>) {
        this._templateEmailKoscSelections = value;
       }

    get createTemplateEmailKoscDialog(): boolean {
        return this._createTemplateEmailKoscDialog;
       }

    set createTemplateEmailKoscDialog(value: boolean) {
        this._createTemplateEmailKoscDialog = value;
       }

    get editTemplateEmailKoscDialog(): boolean {
        return this._editTemplateEmailKoscDialog;
       }

    set editTemplateEmailKoscDialog(value: boolean) {
        this._editTemplateEmailKoscDialog = value;
       }

    get viewTemplateEmailKoscDialog(): boolean {
        return this._viewTemplateEmailKoscDialog;
       }

    set viewTemplateEmailKoscDialog(value: boolean) {
        this._viewTemplateEmailKoscDialog = value;
       }

     get searchTemplateEmailKosc(): TemplateEmailKoscVo {
     if(this._searchTemplateEmailKosc==null){
    this._searchTemplateEmailKosc=new TemplateEmailKoscVo();
    }
        return this._searchTemplateEmailKosc;
    }

    set searchTemplateEmailKosc(value: TemplateEmailKoscVo) {
        this._searchTemplateEmailKosc = value;
       }

}

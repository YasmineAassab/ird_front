import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from 'src/environments/environment';


import {TemplateEmailClotureVo} from '../model/TemplateEmailCloture.model';


@Injectable({
  providedIn: 'root'
})
export class TemplateEmailClotureService {
    private API = '' ;
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/templateEmailCloture/';
        });
    }
     private _templateEmailClotures: Array<TemplateEmailClotureVo> ;
     private _selectedTemplateEmailCloture: TemplateEmailClotureVo;
     private _templateEmailClotureSelections: Array<TemplateEmailClotureVo>;
     private _createTemplateEmailClotureDialog: boolean;
     private _editTemplateEmailClotureDialog: boolean;
     private _viewTemplateEmailClotureDialog: boolean;
     public editTemplateEmailCloture$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchTemplateEmailCloture: TemplateEmailClotureVo ;

    // methods

    public findAll(){
     return this.http.get<Array<TemplateEmailClotureVo>>(this.API);
    }

    public save(): Observable<TemplateEmailClotureVo> {
         return this.http.post<TemplateEmailClotureVo>(this.API, this.selectedTemplateEmailCloture);
    }

    delete(templateEmailCloture: TemplateEmailClotureVo) {
         return this.http.delete<number>(this.API + 'id/' + templateEmailCloture.id);
    }


    public edit(): Observable<TemplateEmailClotureVo> {
        return this.http.put<TemplateEmailClotureVo>(this.API, this.selectedTemplateEmailCloture);
    }


     public findByCriteria(templateEmailCloture:TemplateEmailClotureVo): Observable<Array<TemplateEmailClotureVo>>{
           return this.http.post<Array<TemplateEmailClotureVo>>(this.API + 'search', templateEmailCloture);
    }

   public findByIdWithAssociatedList(templateEmailCloture:TemplateEmailClotureVo):Observable<TemplateEmailClotureVo>{
         return this.http.get<TemplateEmailClotureVo>(this.API + 'detail/id/' +templateEmailCloture.id);
    }

    // getters and setters


    get templateEmailClotures(): Array<TemplateEmailClotureVo> {
    if(this._templateEmailClotures == null){
    this._templateEmailClotures = new Array<TemplateEmailClotureVo>();
    }
return this._templateEmailClotures;
       }

    set templateEmailClotures(value: Array<TemplateEmailClotureVo>) {
        this._templateEmailClotures = value;
       }

    get selectedTemplateEmailCloture(): TemplateEmailClotureVo {
    if(this._selectedTemplateEmailCloture == null){
    this._selectedTemplateEmailCloture = new TemplateEmailClotureVo();
    }
           return this._selectedTemplateEmailCloture;
       }

    set selectedTemplateEmailCloture(value: TemplateEmailClotureVo) {
        this._selectedTemplateEmailCloture = value;
       }

    get templateEmailClotureSelections(): Array<TemplateEmailClotureVo> {
    if(this._templateEmailClotureSelections == null){
    this._templateEmailClotureSelections = new Array<TemplateEmailClotureVo>();
    }
        return this._templateEmailClotureSelections;
       }


    set templateEmailClotureSelections(value: Array<TemplateEmailClotureVo>) {
        this._templateEmailClotureSelections = value;
       }

    get createTemplateEmailClotureDialog(): boolean {
        return this._createTemplateEmailClotureDialog;
       }

    set createTemplateEmailClotureDialog(value: boolean) {
        this._createTemplateEmailClotureDialog = value;
       }

    get editTemplateEmailClotureDialog(): boolean {
        return this._editTemplateEmailClotureDialog;
       }

    set editTemplateEmailClotureDialog(value: boolean) {
        this._editTemplateEmailClotureDialog = value;
       }

    get viewTemplateEmailClotureDialog(): boolean {
        return this._viewTemplateEmailClotureDialog;
       }

    set viewTemplateEmailClotureDialog(value: boolean) {
        this._viewTemplateEmailClotureDialog = value;
       }

     get searchTemplateEmailCloture(): TemplateEmailClotureVo {
     if(this._searchTemplateEmailCloture==null){
    this._searchTemplateEmailCloture=new TemplateEmailClotureVo();
    }
        return this._searchTemplateEmailCloture;
    }

    set searchTemplateEmailCloture(value: TemplateEmailClotureVo) {
        this._searchTemplateEmailCloture = value;
       }

}

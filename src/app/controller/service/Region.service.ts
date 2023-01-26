import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from 'src/environments/environment';


import {RegionVo} from '../model/Region.model';


@Injectable({
  providedIn: 'root'
})
export class RegionService {
    private API = '' ;
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/region/';
        });
    }
     private _regions: Array<RegionVo> ;
     private _selectedRegion: RegionVo;
     private _regionSelections: Array<RegionVo>;
     private _createRegionDialog: boolean;
     private _editRegionDialog: boolean;
     private _viewRegionDialog: boolean;
     public editRegion$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchRegion: RegionVo ;

    // methods

    public findAll(){
     return this.http.get<Array<RegionVo>>(this.API);
    }

    public save(): Observable<RegionVo> {
         return this.http.post<RegionVo>(this.API, this.selectedRegion);
    }

    delete(region: RegionVo) {
         return this.http.delete<number>(this.API + 'id/' + region.id);
    }


    public edit(): Observable<RegionVo> {
        return this.http.put<RegionVo>(this.API, this.selectedRegion);
    }


     public findByCriteria(region:RegionVo): Observable<Array<RegionVo>>{
           return this.http.post<Array<RegionVo>>(this.API + 'search', region);
    }

   public findByIdWithAssociatedList(region:RegionVo):Observable<RegionVo>{
         return this.http.get<RegionVo>(this.API + 'detail/id/' +region.id);
    }

    // getters and setters


    get regions(): Array<RegionVo> {
    if(this._regions == null){
    this._regions = new Array<RegionVo>();
    }
return this._regions;
       }

    set regions(value: Array<RegionVo>) {
        this._regions = value;
       }

    get selectedRegion(): RegionVo {
    if(this._selectedRegion == null){
    this._selectedRegion = new RegionVo();
    }
           return this._selectedRegion;
       }

    set selectedRegion(value: RegionVo) {
        this._selectedRegion = value;
       }

    get regionSelections(): Array<RegionVo> {
    if(this._regionSelections == null){
    this._regionSelections = new Array<RegionVo>();
    }
        return this._regionSelections;
       }


    set regionSelections(value: Array<RegionVo>) {
        this._regionSelections = value;
       }

    get createRegionDialog(): boolean {
        return this._createRegionDialog;
       }

    set createRegionDialog(value: boolean) {
        this._createRegionDialog = value;
       }

    get editRegionDialog(): boolean {
        return this._editRegionDialog;
       }

    set editRegionDialog(value: boolean) {
        this._editRegionDialog = value;
       }

    get viewRegionDialog(): boolean {
        return this._viewRegionDialog;
       }

    set viewRegionDialog(value: boolean) {
        this._viewRegionDialog = value;
       }

     get searchRegion(): RegionVo {
     if(this._searchRegion==null){
    this._searchRegion=new RegionVo();
    }
        return this._searchRegion;
    }

    set searchRegion(value: RegionVo) {
        this._searchRegion = value;
       }

}

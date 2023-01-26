import {RaisonArretTravailVo} from './RaisonArretTravail.model';
import {TechnicienVo} from './Technicien.model';



export class ArretTravailVo {

    public id: number;

    public dateDebut: Date;
    public dateFin: Date;
    public comment: string;
                public dateDebutMax: string ;
                public dateDebutMin: string ;
                public dateFinMax: string ;
                public dateFinMin: string ;
      public technicienVo: TechnicienVo ;
      public raisonArretTravailVo: RaisonArretTravailVo ;

}

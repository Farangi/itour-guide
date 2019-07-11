import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
//import { User } from '../_models/index';

@Injectable()
export class PlaceService {
    constructor(private http: Http) { }
  
    getAll(longitude: number, latitude: number): Observable<any> {
        return this.http.get('/places'+'?longitude='+longitude+'&latitude='+latitude).map((response: Response) => response.json());
    }
    
    getPlacesByKeyword(longitude: number, latitude: number, keyword: string): Observable<any> {
        return this.http.get('/places/placesByKeyword'+'?longitude='+longitude+'&latitude='+latitude+'&keyword='+keyword).map((response: Response) => response.json());
    }
    
    getPlace(placeId: string): Observable<any> {
        return this.http.get('/places/place'+'?placeId='+placeId).map((response: Response) => response.json());
    }
	
	registerGuideToPlace(params: any) {
        return this.http.post('/places/registerGuide', params);
    }
}
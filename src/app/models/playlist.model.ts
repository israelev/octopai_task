import {BaseSpotObject} from './base-spot-object.model'

export class Playlist extends BaseSpotObject {
    description:string;
    items:object[];
    isEditbale:boolean; 
}

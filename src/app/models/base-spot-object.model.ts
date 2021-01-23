
import { spotImage } from './image.model';
export class BaseSpotObject {
    id:string;
    href: string;
    name: string;
    images:spotImage[];
    type:string;
}


import {Media} from "./Common";
import {Shop} from "./Shop";

export interface Feed {
    id: number,
    authors: Array<any>,//todo(need update)
    tags: Array<string>,
    sections: Array<Section>,
    shop: Shop,
    reactor: Array<string>,
    time: string,

}

export interface Section {
    title: string,
    description: string,
    type: string,
    medias: Array<Media>,

}
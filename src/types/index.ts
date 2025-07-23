export interface ItemData {
    id: string;
    relation?: string;
    [key: string]: any;
    children?: ItemData[];
}
export interface Action {
    type: string;
    id: string;
}
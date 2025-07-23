export interface ItemData {
    UID: string;
    rel?: string;
    [key: string]: any;
    children?: ItemData[];
}
export interface Action {
    type: string;
    id: string;
}
import example from "../assets/example-data.json";
import type { Action, ItemData } from "../types";
import { createContext, useContext, useReducer } from "react";
import type { ReactNode } from "react";

const transformData = (raw: any[]): ItemData[] => {
    const parseItem = (item: any, parent: string = "", rel: string = "", index: number = 0): ItemData => {
        const { data, children } = item;
        const childItems: ItemData[] = [];
        const UID = [parent, rel, data.ID, index].join("_");
        if (children && typeof children === "object") {
            for (const [rk, ra] of Object.entries(children)) {
                if (ra && typeof ra === "object" && "records" in ra && Array.isArray(ra?.records)) { // todo
                    ra.records.forEach((child, i) => childItems.push(parseItem(child, UID, rk, i)))
                }
            }
        }
        return { UID, data, rel, children: childItems }
    }
    return raw.map((r, i) => parseItem(r, "", "root", i));
};
const initData: ItemData[] = transformData(example);

type TableState = {
    data: ItemData[];
    expanded: string[];
};

const TableContext = createContext<(TableState & { dispatch: React.Dispatch<Action> }) | undefined>(undefined);

export const TableProvider = ({ children }: { children: ReactNode }) => {
    const reducer = (state: TableState, action: Action): TableState => {
        switch (action.type) {
            case "TOGGLE":
                return {
                    ...state,
                    expanded: state.expanded.includes(action.id) ? state.expanded.filter(i => i !== action.id) : [...state.expanded, action.id]
                };
            case "DELETE":
                const newState = (data: ItemData[], id: string): ItemData[] => data.filter(i => i.UID !== id).map(i => {
                    if (i.children) return { ...i, children: newState(i.children, id) || undefined }
                    return i;
                })
                return { ...state, data: newState(state.data, action.id), expanded: state.expanded.filter(i => i !== action.id) }
        }
        return state;
    };
    const [state, dispatch] = useReducer(reducer, {
        data: initData,
        expanded: [],
    });

    return <TableContext.Provider value={{ ...state, dispatch }}> {children} </TableContext.Provider>;
}
export const useTable = () => {
    const ctx = useContext(TableContext);
    if (!ctx) throw new Error('(!ctx)');
    return ctx;
};
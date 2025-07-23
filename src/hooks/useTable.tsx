import example from "../assets/example-data.json";
import type { Action, ItemData } from "../types";
import { createContext, useContext, useReducer } from "react";
import type { ReactNode } from "react";

const transformData = (raw: any[]): ItemData[] => {
    const parseItem = (item: any, rel?: string): ItemData => {
        const { data, children } = item;
        const childItems: ItemData[] = [];
        if (children && typeof children === "object") {
            for (const [rk, ra] of Object.entries(children)) {
                if (ra && typeof ra === "object" && "records" in ra && Array.isArray(ra?.records)) { // todo
                    for (const r of ra.records) { childItems.push(parseItem(r, rk)) };
                }
            }
        }
        return { id: data.ID || data.id, data, rel, children }
    }
    return raw.map(r => parseItem(r));
};
const initData: ItemData[] = transformData(example);

type TableState = {
    data: ItemData[];
    expanded: string[];
    dispatch?: React.Dispatch<Action>;
};

const TableContext = createContext<TableState | undefined>(undefined);

export const TableProvider = ({ children }: { children: ReactNode }) => {
    const reducer = (state: TableState, action: Action): TableState => {
        switch (action.type) {
            case "TOGGLE":
                return state;
        }
        return state;
    };
    const [state, dispatch] = useReducer(reducer, {
        data: initData,
        expanded: [],
    });

    return <TableContext.Provider value={{ ...state, dispatch }}> {children} </TableContext.Provider>;
}
export const useTable = () => useContext(TableContext);
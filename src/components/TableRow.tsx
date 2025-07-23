import { useTable } from "../hooks/useTable";
import type { ItemData } from "../types";
import Table from "./Table";

const TableRow = ({ data, keys, level }: { data: ItemData, keys: string[], level: number }) => {
    const { expanded, dispatch } = useTable();
    return (<>
        <div style={{ display: "table-row" }}>
            <div style={{ display: "table-cell" }}>{data.children && data.children.length > 0 && <button onClick={() => dispatch({ type: "TOGGLE", id: data.id })}>
                {expanded.includes(data.id) ? "▼" : "▶"}
            </button>}</div>
            {keys.map(k => <div key={k} style={{ display: "table-cell" }}>{data.data[k]}</div>)}
        </div>
        {data.children && expanded.includes(data.id) && <Table data={data.children} level={level + 1} />}
    </>)
}

export default TableRow;
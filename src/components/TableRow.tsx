import { useTable } from "../hooks/useTable";
import type { ItemData } from "../types";
import Table from "./Table";

const TableRow = ({ data, keys, level, index }: { data: ItemData, keys: string[], level: number, index: number }) => {
    const { expanded, dispatch } = useTable();
    const bg = index % 2 === 0 ? "bg-gray-900" : "bg-gray-800";
    return (<>
        <div className={`grid grid-cols-[2rem_repeat(auto-fit,minmax(120px,auto))_3rem] items-center px-3 py-2 ${bg}`}
            style={{ paddingLeft: `${level * 12}px` }} >
            <div>{data.children && data.children.length > 0 && <button onClick={() => dispatch({ type: "TOGGLE", id: data.UID })}>
                {expanded.includes(data.UID) ? "▼" : "▶"}
            </button>}</div>
            {keys.map(k => <div key={k}>{data.data[k]}</div>)}
            <div><button onClick={() => dispatch({ type: "DELETE", id: data.UID })}>✖</button></div>
        </div>
        {data.children && expanded.includes(data.UID) && <div className={bg}><Table data={data.children} level={level + 1} /></div>}
    </>)
}

export default TableRow;
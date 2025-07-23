import type { ItemData } from "../types";
import TableRow from "./TableRow";

const Table = ({ data, level = 0 }: { data: ItemData[], level: number }) => {
    const keys = [...new Set(data.flatMap(i => Object.keys(i.data)))];
    return (
        <div style={{ display: level == 0 ? "table" : "table-row" }}>
            <div style={{ display: "table-row", backgroundColor: "#AAA" }}>
                <div style={{ display: "table-cell" }} ></div>
                {keys.map(k => <div key={k} style={{ display: "table-cell" }}>{k}</div>)}
            </div>
            {/* what do i do with same ids ??? */}
            {data.map((i, ix) => <TableRow key={i.id + ix} data={i} keys={keys} level={level} />)}
        </div>
    );
};

export default Table;
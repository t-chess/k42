import type { ItemData } from "../types";
import TableRow from "./TableRow";

const Table = ({ data, level = 0 }: { data: ItemData[], level: number }) => {
    const keys = [...new Set(data.flatMap(i => Object.keys(i.data)))];
    if (data.length) return (
        <div className="text-white" style={{ marginLeft: level * 16 }}>
            <div className="grid grid-cols-[2rem_repeat(auto-fit,minmax(120px,auto))_3rem] bg-teal-400 py-2 px-3">
                <div></div>
                {keys.map(k => <div key={k}>{k}</div>)}
                <div>delete</div>
            </div>
            {data.map((i, ix) => <TableRow key={i.UID} index={ix} data={i} keys={keys} level={level} />)}
        </div>
    );
};

export default Table;
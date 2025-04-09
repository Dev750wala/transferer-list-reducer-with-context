import { useData } from "./hooks/useData";

const Block = ({
    side,
    onSelect,
}: {
    side: "left" | "right";
    onSelect: React.Dispatch<React.SetStateAction<string[]>>;
}) => {

    const data = useData().data;

    return (
        <div className="m-4 flex-col justify-start items-start min-w-20 min-h-52 border-2 rounded-2xl border-dashed">
            {data.map((user) => {
                return (
                    user.side === side && (
                        <div className="p-3" key={user.id}>
                            <span>
                                <input
                                    type="checkbox"
                                    name={user.id}
                                    id={`${user.id}-transfer`}
                                    onClick={(e: any) =>
                                        onSelect((prev) => {
                                            return e.target.checked ? [...prev, user.id] : prev.filter(id => id !== user.id)
                                        })
                                    }
                                />{" "}
                                {user.username}
                            </span>{" "}
                            <br />
                        </div>
                    )
                );
            })}
        </div>
    );
};

export default Block    
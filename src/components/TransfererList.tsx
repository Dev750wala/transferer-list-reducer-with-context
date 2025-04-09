import { useState } from "react";
import Block from "./Block";
import TransferButton from "./TransferButton";
import { useData } from "./hooks/useData";
import { DataActionType } from "./DataProvider";

const TransfererList = () => {
    const dataDispatch = useData().dataDispatch;
    const [selected, setSelected] = useState<string[]>([]);

    function handleTransfer(mode: "selected" | "all", to: "left" | "right") {
        dataDispatch({type: DataActionType.MODIFY_SIDE, payload: { mode, to, selected }})
        setSelected([]);
    }

    const propsForButtons: {
        from: "left" | "right";
        to: "left" | "right";
        mode: "selected" | "all";
        symbol: string;
        handleTransfer: (
            mode: "selected" | "all",
            to: "left" | "right"
        ) => void;
    }[] = [
        {
            from: "left",
            to: "right",
            mode: "selected",
            symbol: ">",
            handleTransfer: handleTransfer,
        },
        {
            from: "left",
            to: "right",
            mode: "all",
            symbol: ">>",
            handleTransfer: handleTransfer,
        },
        {
            from: "right",
            to: "left",
            mode: "selected",
            symbol: "<",
            handleTransfer: handleTransfer,
        },
        {
            from: "right",
            to: "left",
            mode: "all",
            symbol: "<<",
            handleTransfer: handleTransfer,
        },
    ];

    return (
        <div className="flex flex-row justify-center gap-7">
            <Block side="left" key="left" onSelect={setSelected} />

            <div className="flex flex-col gap-5">
                {propsForButtons.map((btnProp, index) => {
                    return <TransferButton {...btnProp} key={index} />;
                })}
            </div>

            <Block side="right" key="right" onSelect={setSelected} />
        </div>
    );
};

export default TransfererList;

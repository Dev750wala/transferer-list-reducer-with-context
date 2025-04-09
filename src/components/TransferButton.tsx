import { Button } from "./ui/button";

const TransferButton = ({
    to,
    mode,
    symbol,
    handleTransfer,
}: {
    to: "left" | "right";
    mode: "selected" | "all";
    symbol: string;
    handleTransfer: (
        mode: "selected" | "all",
        to: "left" | "right"
    ) => void;
}) => {
    return (
        <Button onClick={() => handleTransfer(mode, to)}>{symbol}</Button>
    );
};
export default TransferButton;
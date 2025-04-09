import { User } from "@/interface";
import React from "react";

const Temp = ({
    setData,
}: {
    setData: React.Dispatch<React.SetStateAction<User[]>>;
}) => {
    return (
        <div>
            <button
                onClick={() =>
                    setData((prev) => {
                        console.log("Before: ", prev);
                        prev.splice(1, 1);
                        console.log("After: ", prev);
                        return [...prev];
                    })
                }
            >
                change
            </button>
        </div>
    );
};

export default Temp;

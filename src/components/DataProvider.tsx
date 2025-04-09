import { User } from "@/interface";
import { useReducer } from "react";
import React, { createContext } from "react";

export enum DataActionType {
    ADD_OR_UPDATE_USER = "ADD_OR_UPDATE_USER",
    REMOVE_USER_WITH_INDEX = "REMOVE_USER_WITH_INDEX",
    MODIFY_SIDE = "MODIFY_SIDE"
}

type DataAction = {
    type: DataActionType;
    payload: unknown;
};

type UpdateSides = {
    mode: "selected" | "all";
    to: "left" | "right";
    selected: string[];
};

type AddUserPayloadType = {
    editing: boolean,
    dataToBeAdded: User[]
}

const dataReducer = (state: User[], action: DataAction): User[] => {
    switch (action.type) {
        case DataActionType.MODIFY_SIDE:

            if ((action.payload as UpdateSides).mode === "all") {
                return state.map((user) => {
                    return { ...user, side: (action.payload as UpdateSides).to };
                });
            } else {
                return state.map((user) => {
                    if (
                        (action.payload as UpdateSides).selected.includes(user.id)
                    ) {
                        return {
                            ...user,
                            side: (action.payload as UpdateSides).to,
                        };
                    } else {
                        return user;
                    }
                });
            }

        case DataActionType.REMOVE_USER_WITH_INDEX:
            state.splice(action.payload as number, 1);
            return [...state];

        case DataActionType.ADD_OR_UPDATE_USER:
            const temp = action.payload as AddUserPayloadType
            
            if (temp.editing) {
                return temp.dataToBeAdded
            } else {
                return [...state, ...temp.dataToBeAdded]
            }

        default:
            return state;

    }
};

export let UserDataContext = createContext<{
    data: User[];
    dataDispatch: React.ActionDispatch<[action: DataAction]>;
}>({ data: [], dataDispatch: () => [] });

export function DataProvider({ children }: { children: React.ReactNode }) {
    const [dataState, dataDispatch] = useReducer(dataReducer, []);

    return (
        <UserDataContext.Provider
            value={{ data: dataState, dataDispatch: dataDispatch }}
        >
            {children}
        </UserDataContext.Provider>
    );
}

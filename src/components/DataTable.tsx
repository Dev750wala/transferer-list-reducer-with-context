import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { User } from "@/interface";
import { Button } from "./ui/button";
import { useState } from "react";
import FilterBar from "./FilterBar";
import { useData } from "./hooks/useData";
import { DataActionType } from "./DataProvider";

export function DataTable({
    setIsEditing,
    setForm,
}: {
    setForm: React.Dispatch<React.SetStateAction<User>>;
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const [filter, setFilter] = useState<[string, string]>(["", ""]);

    const {data, dataDispatch} = useData();

    function handleDeleteUser(index: number) {
        dataDispatch({type: DataActionType.REMOVE_USER_WITH_INDEX, payload: index})
    }

    return (
        <>
            <FilterBar setFilter={setFilter} data={data} />

            <Table className="py-0">
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Username</TableHead>
                        <TableHead>Full Name</TableHead>
                        <TableHead>City</TableHead>
                        <TableHead>Age</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((user, index) => {
                        if (
                            filter[0] === "all" ||
                            user[
                                filter[0] as
                                    | "username"
                                    | "fullName"
                                    | "city"
                                    | "age"
                            ] === filter[1]
                        ) {
                            return (
                                <TableRow key={user.id}>
                                    <TableCell>{user.id}</TableCell>
                                    <TableCell>{user.username}</TableCell>
                                    <TableCell>{user.fullName}</TableCell>
                                    <TableCell>{user.city}</TableCell>
                                    <TableCell>{user.age}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant={"secondary"}
                                            onClick={() => {
                                                setIsEditing(true);
                                                setForm(data[index]);
                                            }}
                                        >
                                            Edit
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            variant={"link"}
                                            onClick={() =>
                                                handleDeleteUser(index)
                                            }
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            );
                        }
                    })}
                </TableBody>
            </Table>
        </>
    );
}

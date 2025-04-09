import * as React from "react";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Fields, User } from "@/interface";
import { Button } from "./ui/button";

const FilterBar = ({
    setFilter,
    data,
}: {
    setFilter: React.Dispatch<React.SetStateAction<[string, string]>>;
    data: User[];
}) => {
    const uniqueFieldsArray: Fields[] = ["username", "fullName", "city", "age"];

    const [values, setValues] = React.useState<(string | number)[]>([]);

    const [selectedField, setSelectedField] = React.useState("");
    const [selectedValue, setSelectedValue] = React.useState("");

    const [error, setError] = React.useState("");

    const handleFilter = () => {
        if (selectedField.length === 0 || selectedValue.length === 0) {
            setError("Please Select the filters first");
        }


        // SET FILTER
        setFilter([selectedField, selectedValue]);
    };

    return (
        <>
            <h2 className="text-3xl">Filter User Info</h2>
            <div className="flex flex-row gap-4 border-2 rounded-xl p-4">
                <SelectDemo
                    typeTemp="field"
                    values={uniqueFieldsArray}
                    data={data}
                    setValue={setSelectedField}
                    setAnotherVal={setValues}
                    setError={setError}
                />
                <SelectDemo
                    typeTemp="value"
                    values={values}
                    data={data}
                    setValue={setSelectedValue}
                    setError={setError}
                />
                <Button onClick={handleFilter}>Filter</Button>
                <Button onClick={() => setFilter(['all', 'all'])}>All</Button>
            </div>
            <h3 className="text-red-700">{error}</h3>
        </>
    );
};

export default FilterBar;

export function SelectDemo({
    typeTemp,
    data,
    values,
    setValue,
    setAnotherVal,
    setError,
}: {
    typeTemp: "field" | "value";
    data: User[];
    values: (string | number)[];
    setValue: React.Dispatch<React.SetStateAction<string>>;
    setAnotherVal?: React.Dispatch<React.SetStateAction<(string | number)[]>>;
    setError: React.Dispatch<React.SetStateAction<string>>;
}) {
    const handleChange = (value: string) => {
        setValue(value);

        if (setAnotherVal) {
            setAnotherVal([]);
            let temp = data.map((user) => {
                return user[value as "username" | "fullName" | "city" | "age"];
            });

            setAnotherVal([...new Set(temp)]);
        }

        setError("");
    };

    return (
        <Select onValueChange={(value) => handleChange(value)}>
            <SelectTrigger className="w-[180px] bg-white">
                <SelectValue placeholder={`unique ${typeTemp}`} />
            </SelectTrigger>
            <SelectContent className="bg-white">
                <SelectGroup>
                    {values.map((value) => {
                        return (
                            <SelectItem key={value} value={value.toString()}>
                                {value}
                            </SelectItem>
                        );
                    })}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}

import React from "react";
import { User } from "@/interface";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useData } from "./hooks/useData";
import { DataActionType } from "./DataProvider";

const UserForm = ({
    isEditing,
    setIsEditing,
    form,
    setForm,
}: {
    isEditing: boolean;
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
    form: User;
    setForm: React.Dispatch<React.SetStateAction<User>>;
}) => {
    const { data, dataDispatch } = useData();

    function handleChangeForm(event: React.ChangeEvent<HTMLInputElement>) {
        setForm((prev) => {
            return {
                ...prev,
                [event.target.name]: event.target.value,
            };
        });
    }

    function handleSaveUser(e: any) {
        if (
            form.username.length === 0 ||
            form.fullName.length === 0 ||
            form.city.length === 0 ||
            form.age < 2
        ) {
            e.preventDefault();
            alert("All the fields need to be filled up.");
            return;
        }

        if (isEditing) {
            const userIndex = data.findIndex(
                (user: User) => user.id === form.id
            );

            let dataCopy = [...data];
            dataCopy.splice(userIndex, 1, form);

            dataDispatch({
                type: DataActionType.ADD_OR_UPDATE_USER,
                payload: { editing: true, dataToBeAdded: dataCopy },
            });
        } else {
            dataDispatch({
                type: DataActionType.ADD_OR_UPDATE_USER,
                payload: {
                    editing: false,
                    dataToBeAdded: [{ ...form, id: Date.now().toString() }],
                },
            });
        }
        setIsEditing(false);
        setForm({
            id: "",
            age: 0,
            city: "",
            fullName: "",
            username: "",
            side: "left",
        });
    }

    return (
        <>
            <div className="bg-white rounded-2xl border-blue-950 border-2 min-w-fit min-h-fit p-5 gap-3 flex flex-col justify-start">
                <div className="flex flex-col gap-1 justify-start items-start">
                    <label htmlFor="username">Username</label>
                    <Input
                        required
                        type="text"
                        value={form.username}
                        name="username"
                        onChange={handleChangeForm}
                    />
                </div>
                <div className="flex flex-col gap-1 justify-start items-start">
                    <label htmlFor="fullName">Full Name</label>
                    <Input
                        required
                        type="text"
                        value={form.fullName}
                        name="fullName"
                        onChange={handleChangeForm}
                    />
                </div>
                <div className="flex flex-col gap-1 justify-start items-start">
                    <label htmlFor="city">City</label>
                    <Input
                        required
                        type="text"
                        value={form.city}
                        name="city"
                        onChange={handleChangeForm}
                    />
                </div>
                <div className="flex flex-col gap-1 justify-start items-start">
                    <label htmlFor="age">Age</label>
                    <Input
                        required
                        type="number"
                        value={form.age}
                        min={2}
                        name="age"
                        onChange={handleChangeForm}
                    />
                </div>
                <Button onClick={handleSaveUser} variant={"ghost"}>
                    {!isEditing ? "Add User" : "Update User"}
                </Button>
            </div>
        </>
    );
};

export default UserForm;

// const InputComponent = ({
//   type,
//   value,
//   min,
//   name,
//   onChange,
// }: {
//   type: "number" | "string";
//   value: string | number;
//   min?: number;
//   name: string;
//   onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
// }) => {
//   return (
//     <div className="flex flex-col gap-1 justify-start items-start">
//       <label htmlFor="age">Age</label>
//       <Input
//         required
//         type="number"
//         value={value}
//         min={2}
//         name="age"
//         onChange={handleChangeForm}
//       />
//     </div>
//   );
// };

// interface InputInterface {
//     type: "number" | "string";
//     value: string | number;
//     min?: number;
//     name: string;
//     onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
// }

// const InputComponent = (prop: InputInterface) => {
//     return (
//         <div className="flex flex-col gap-1 justify-start items-start">
//             <label htmlFor="age">Age</label>
//             <Input required {...prop} />
//         </div>
//     );
// };

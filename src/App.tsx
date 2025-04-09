import "./App.css";
import { useReducer, useState } from "react";
import { User } from "./interface";
import UserForm from "./components/UserForm";
import { DataTable } from "./components/DataTable";
import TransfererList from "./components/TransfererList";



// useReducer with useContext hook
function App() {
    console.log("RENDERED");
    
    
    const [isEditing, setIsEditing] = useState(false);
    const [form, setForm] = useState<User>({
        id: "",
        username: "",
        fullName: "",
        city: "",
        age: 0,
        side: "left",
    });

    return (
        <>
            <div className="flex flex-row gap-10">
                <div className="flex flex-col gap-20 m-24">
                    <UserForm
                        isEditing={isEditing}
                        setIsEditing={setIsEditing}
                        form={form}
                        setForm={setForm}
                    />

                    <DataTable setForm={setForm} setIsEditing={setIsEditing} />
                </div>

                <div>
                    <TransfererList />
                </div>
            </div>
        </>
    );
}

export default App;

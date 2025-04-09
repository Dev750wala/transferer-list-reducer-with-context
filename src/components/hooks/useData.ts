import { useContext } from "react"
import { UserDataContext } from "../DataProvider"

export const useData = () => {
    const dataContext = useContext(UserDataContext);

    return dataContext;
}
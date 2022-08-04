import AddClothesContext from "./addclothescontext";
import { useState } from "react";
 export default function AddClothesState({children}){
    const [name, setName] = useState("")
    const [price, setPrice] = useState(0)
    const [type, setType] = useState("")
    const [gender, setGender] = useState("")
    const [size,setSize]  = useState([])
    const [preview, setPreview] = useState([])
    const [description, setDescription] = useState("")


    const [ updateName, setUpdateName] = useState("")
    const [ updatePrice, setUpdatePrice] = useState(0)
    const [ updateType, setUpdateType] = useState("")
    const [ updateGender, setUpdateGender] = useState("")
    const [updateSize,setUpdateSize]  = useState([])
    const [ updateDescription, setUpdateDescription] = useState("")

    return (
        <AddClothesContext.Provider value={{
            name,
            setName,
            price,
            setPrice,
            type,
            setType,
            gender,
            setGender,
            size,
            setSize,
            description,
            setDescription,
            updateName,
            setUpdateName,
            updatePrice,
            setUpdatePrice,
            updateType,
            setUpdateType,
            updateGender,
            setUpdateGender,
            updateSize,
            setUpdateSize,
            updateDescription,
            setUpdateDescription,
            preview,
            setPreview,

        }}>
            {children}
        </AddClothesContext.Provider>
    )
 }

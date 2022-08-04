import AdminOptionContext from "./adminoptioncontext";
import { useState } from "react";

export default function AdminOptionState({ children }) {
    const [AdminOption, setAdminOption] = useState("ShowAllItems");
  return (
    <AdminOptionContext.Provider
        value={{
            AdminOption,
            setAdminOption,
        }}
        >
        {children}
    </AdminOptionContext.Provider>
  );
}
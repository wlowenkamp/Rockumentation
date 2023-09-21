import { useState, useContext, createContext, useEffect } from "react";

const UserContext = createContext(null)

function UserProvider({children}) {

    const [user, setUser] = useState(null)
    
    useEffect(() => {
    }, [user]);

    return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>
}

export { UserContext, UserProvider }

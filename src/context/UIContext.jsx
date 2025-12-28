import { createContext, useContext, useState } from 'react'

const UIContext = createContext({
    isLocked: false,
    setLocked: () => { }
})

export const UIProvider = ({ children }) => {
    const [isLocked, setLocked] = useState(false)

    return (
        <UIContext.Provider value={{ isLocked, setLocked }}>
            {children}
        </UIContext.Provider>
    )
}

export const useUI = () => useContext(UIContext)

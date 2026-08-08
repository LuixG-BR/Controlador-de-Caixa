import { createContext, useContext, useState } from "react";

const CongregacaoContext = createContext(null);

export function CongregacaoProvider({ children }) {

    const [congregacaoSelecionada, setCongregacaoSelecionada] = useState(null);

    return (
        <CongregacaoContext.Provider
            value={{
                congregacaoSelecionada,
                setCongregacaoSelecionada
            }}
        >
            {children}
        </CongregacaoContext.Provider>
    );
}

export function useCongregacao() {
    return useContext(CongregacaoContext);
}
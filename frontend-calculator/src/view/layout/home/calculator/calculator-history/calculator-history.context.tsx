import {
    createContext,
    PropsWithChildren,
    useState,
    FC,
    useContext,
    useCallback,
} from "react";

export interface ResolvedOperation {
    id: number;
    operation: string;
    result: string;
}
type CalculatorHistory = [
    ResolvedOperation[],
    (resolvedOperation: ResolvedOperation) => void
];

export const CalculatorHistoryContext = createContext<CalculatorHistory>([[], ()=>{}]);
CalculatorHistoryContext.displayName = "CalculatorHistoryContext";

export const CalculatorHistoryProvider: FC<PropsWithChildren> = ({
    children,
}) => {
    const [history, setHistory] = useState<ResolvedOperation[]>([]);
    const memoizedDispatch = useCallback(
        (resolvedOperation: ResolvedOperation) => {
            setHistory(prevHistory => {
                const hasInHistory = prevHistory.some(
                    operation => operation.id === resolvedOperation.id
                );

                if (hasInHistory) return prevHistory;

                const newHistory = [...prevHistory];
                newHistory.push(resolvedOperation);

                return newHistory;
            })
        },
        []
    );
    const value: CalculatorHistory = [history, memoizedDispatch];

    return (
        <CalculatorHistoryContext.Provider value={value}>
            {children}
        </CalculatorHistoryContext.Provider>
    );
};

export const useCalculatorHistory = () => {
    const context = useContext(CalculatorHistoryContext);

    if (context === undefined) throw new Error(
        `useCalculatorHistory must be used within a CalculatorHistoryProvider.`
    );

    return context;
}

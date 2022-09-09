import { FC, useEffect } from "react"
import { useCalculatorHistory } from "./calculator-history.context";

export const CalculatorHistory: FC = () => {
    const [history, setHistory] = useCalculatorHistory();

    useEffect(() => {
        setHistory({id: '2', operation: "3+3", result: "6" });
    }, []);

    return <>History</>
}

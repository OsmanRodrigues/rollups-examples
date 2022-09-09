import { GlobalStyle } from "./view/atomic/global-style.mol";
import { HomeView } from "./view/layout/home/home-view";
import { setConfiguration } from "react-grid-system";
import { ToastContainer } from "react-toast";
import { initWeb3Wallet } from "./config/web3-wallet.setup";
import { CalculatorHistoryProvider } from "./view/layout/home/calculator/calculator-history/calculator-history.context";



// Grid system setup
setConfiguration({ maxScreenClass: "xl" });
// web3 wallet setup
initWeb3Wallet();

export const App = () => {
    return (
        <>
            <GlobalStyle />
            <CalculatorHistoryProvider>
                <HomeView />
            </CalculatorHistoryProvider>
            <ToastContainer position="bottom-center" delay={6000} />
        </>
    );
};

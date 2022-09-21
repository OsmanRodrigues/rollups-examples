import { SetStateAction, useState } from "react";
import styled from "styled-components";
import { fetchNotices } from "./controller/notices.controller";
import { sendInput, SendInputData } from "./controller/send.controller";
import { useService } from "./controller/use-service/use-service.hook";
import { NoticeViewModel } from "./service/notices.service";
import { SendInputViewModel } from "./service/send.service";

export const App = () => {
    const [ noticesState, noticesDispatch ] = useService<NoticeViewModel[]>();
    const [ sendInputState, sendInputDispatch ] = useService<SendInputViewModel>();

    const [errorMessage, setErrorMessage] = useState('');
    const [connButtonText, setConnButtonText] = useState('Connect Wallet');
    const [defaultAccount, setDefaultAccount] = useState(null);

    const handleResult = (notices: NoticeViewModel[]) => {
        const notice = notices[0];
        const message = notice.payload_parsed;

        return <h2>{message}</h2>;
    }

    const connectWalletHandler = ()=>{
        if(window?.ethereum){
            window.ethereum.request({method: 'eth_requestAccounts'})
            .then((result: SetStateAction<null>[]) =>{
                accountChangeHandler(result[0]);
                setConnButtonText('WalletConnected');
            })

        }else{
            setErrorMessage('Please, install the metamask plugin');
        }
    }

    const accountChangeHandler = (newAccount: SetStateAction<null>)=>{
        setDefaultAccount(newAccount);
    }

    const updateEthers = () =>{
        
    }

    const handleSendInput = (e: any) => {
        e.preventDefault()
        const form = e.target;
        const elementsKeys = Object.keys(form);
        let data: SendInputData = {
            Operation: ''
        }
        elementsKeys
            .filter((key) => !!form[key]?.value)
            .forEach((key) => {
                const { id, value } = form[key]
                const parsedId: keyof typeof data = id.replace('Input', '')
                data[parsedId] = value;
            });
        sendInput(sendInputDispatch, data).then((result) =>
            fetchNotices(noticesDispatch, {
                epoch_index: result?.epochNumber,
                input_index: result?.inputIndex,
            }, true)
        );
    }

    return (
        <AppWrapper>
            <Heading>Calculator</Heading>
            {!!noticesState.data?.length ? (
                handleResult(noticesState.data)
            ) : null}
            <div>
                <form
                    onSubmit={handleSendInput}
                    style={{ display: "flex", flexDirection: "column" }}
                >   
                    <button onClick={connectWalletHandler}type="submit">{connButtonText}</button>
                    <h3> Wallet: {defaultAccount}</h3>
                    <label>Operation</label>
                    <input id="OperationInput" type="text" />
                    <button type="submit">Send</button>
                    {errorMessage}
                </form>
            </div>
        </AppWrapper>
    );
};

const AppWrapper = styled.div``;
const Heading = styled.h1`
    color: red;
`;
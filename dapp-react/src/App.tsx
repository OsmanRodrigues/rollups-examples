import { useEffect, useState } from 'react';
import {
    Example, Heading, MessageForm
} from './component';
import { ACCOUNT_INDEX, DAPP_NAME, HARDHAT_DEFAULT_MNEMONIC, HARDHAT_DEFAULT_RPC_URL } from './services/constants';
import { getNotices } from './services/notices';
import { sendInput } from './services/send';

type RequestHandler = (
    params?: Record<string, any>,
    onSuccess?: (data?: any) => void,
    onFail?: (err?: any) => void
) => void;

const createNotice: RequestHandler = (params,onSuccess, onFail) => {
    sendInput({
        input: params?.message,
        accountIndex: ACCOUNT_INDEX,
        dapp: DAPP_NAME,
        rpc: HARDHAT_DEFAULT_RPC_URL,
        mnemonic: HARDHAT_DEFAULT_MNEMONIC,
    })
        .then((data) => onSuccess?.(data))
        .catch((err) => onFail?.(err));
}

const fetchNotices: RequestHandler = (_,onSuccess, onFail) => {
    getNotices({ epoch_index: "0" })
        .then((data) => {
            onSuccess?.(data);
        })
        .catch((err) => onFail?.(err));
}

function App() {
    const [messages, setMessages] = useState<any[]>([]);
    console.log({messages});

    const sendMessage = (message: string) => {
        createNotice(
            { message },
            (mainData) => {
                fetchNotices(
                    undefined,
                    (data) => {
                        setMessages(()=> [...data])
                        window.alert(mainData?.message || 'Message send successfully!')
                    },
                    (err) => {
                        console.log({err});
                    }
                )
            },
            (err) => console.log({err})
        );
    }
    const handleSendMessage = (e: any) => {
        e.preventDefault();
        const form = e.target
        const elementsKeys = Object.keys(form);
        elementsKeys
            .filter(key => !!form[key]?.value)
            .forEach(key => {
                const { value } = form[key];
                sendMessage(value);
            });
    };

    useEffect(() => {
        fetchNotices(
            undefined,
            (data) => setMessages(data),
            (err) => console.log({ err })
        );
    }, [])

    return (
        <div>
            <Heading>Hello world</Heading>
            <MessageForm onSubmit={handleSendMessage}/>
            <Example data={messages} />
        </div>
    );
}

export default App;

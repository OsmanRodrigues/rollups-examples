import { Dispatch } from "react";
import { SendInputViewModel, sendInput as sendInputService } from "../service/send.service";
import { ServiceReducerActions } from "./use-service/use-service.hook";
import { WalletState, ConnectedChain } from "@web3-onboard/core";

export interface SendInputData {
    sl: number;
    sw: number;
    pl: number;
    pw: number;
}

export const sendInput = async (
    dispatch: Dispatch<ServiceReducerActions<SendInputViewModel>>,
    data: SendInputData,
    chainId: ConnectedChain["id"],
    walletProvider: WalletState["provider"]
) => {
    dispatch({ type: "start_request" });
    try {
        Object.keys(data)
            .forEach(key => {
                const typedKey = key as keyof typeof data;
                data[typedKey] = Number(data[typedKey].toFixed(2));
             })
        const sendInputResult = await sendInputService(
            {
                input: JSON.stringify(data)
            },
            chainId,
            walletProvider
        );
        dispatch({
            type: "resolve_request",
            data: sendInputResult,
        });

        return sendInputResult;
    } catch (err) {
        dispatch({ type: "fail_request", error: err });

        throw err;
    }
};

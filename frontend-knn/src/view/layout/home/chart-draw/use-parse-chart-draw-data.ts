import { useState, useEffect } from "react";
import { UseFormSetError, UseFormClearErrors } from "react-hook-form";
import { SendInputData } from "../../../../controller/send.controller";

export const useParseChartDrawData = (
    formData: SendInputData,
    lengthAndWidthMax: number,
    errorHandler: UseFormSetError<SendInputData>,
    clearError: UseFormClearErrors<SendInputData>
): SendInputData => {
    const [parsedFormData, setParsedFormData] = useState<typeof formData>({
        pl: '',
        pw: '',
        sl: '',
        sw: '',
    });

    useEffect(() => {
        Object.keys(formData).forEach((key) => {
            const typedKey = key as keyof typeof formData;
            const dataValue = formData[typedKey];

            if (+dataValue <= lengthAndWidthMax) {
                setParsedFormData((prev) => ({
                    ...prev,
                    [typedKey]: dataValue,
                }));
                clearError(typedKey);
            } else errorHandler(typedKey, { type: "max" });
        });
    }, [formData.pl, formData.pw, formData.sl, formData.sw]);

    const chartDrawData = {
        ...parsedFormData,
        pl: +parsedFormData.pl > +parsedFormData.sl
                ? parsedFormData.sl
                : parsedFormData.pl,
        pw: +parsedFormData.pw > +parsedFormData.sw
                ? parsedFormData.sw
                : parsedFormData.pw,
    };

    return chartDrawData;
};

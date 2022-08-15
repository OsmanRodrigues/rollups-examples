// Copyright 2022 Cartesi Pte. Ltd.

// Licensed under the Apache License, Version 2.0 (the "License"); you may not use
// this file except in compliance with the License. You may obtain a copy of the
// License at http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software distributed
// under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
// CONDITIONS OF ANY KIND, either express or implied. See the License for the
// specific language governing permissions and limitations under the License.

import { FC, useCallback } from "react";
import { Col, Hidden, Row, Visible } from "react-grid-system";
import { useForm } from "react-hook-form";
import { brandName } from "../../../config/constants";
import { SendInputData } from "../../../controller/send.controller";
import { Button } from "../../atomic/button.mol/button.mol";
import { FieldsetWrapper, FormWrapper } from "../../atomic/form.org/form.mol";
import { Input, Option } from "../../atomic/form.org/input.mol";
import { Separator } from "../../atomic/layout.org/separator.mol/separator.atm";
import { H1, Paragraph } from "../../atomic/typography.mol";
import { id, string } from "./constants";

interface ISendInputForm {
    handleSendInput: (data: SendInputData) => void;
    onClearForm: () => void;
    isLoading: boolean;
    canClearForm: boolean;
}

const sexOptions: Option[] = [
    { id: "female", name: "Female" },
    { id: "male", name: "Male" },
];

const embarkedOptions: Option[] = [
    { id: "C", name: "Cherbourg" },
    { id: "Q", name: "Queenstown" },
    { id: "S", name: "Southampton" },
];

const formString = string.sendInputForm;

export const SendInputForm: FC<ISendInputForm> = ({
    handleSendInput,
    onClearForm,
    isLoading,
    canClearForm,
}) => {
    const { handleSubmit, register, formState, clearErrors, reset } =
        useForm<SendInputData>();
    const handleClearForm = useCallback(
        (e: any) => {
            e.preventDefault();
            onClearForm();
            clearErrors();
            reset();
        },
        [onClearForm, clearErrors, reset]
    );
    const renderSubmitButton = useCallback(() => {
        return (
            <>
                <Col xs="content">
                    {canClearForm ? (
                        <Button
                            form={id.sendInputForm.main}
                            type="reset"
                            onClick={handleClearForm}
                        >
                            {formString.clearButtonText}
                        </Button>
                    ) : (
                        <Button
                            form={id.sendInputForm.main}
                            type="submit"
                            sideElement="right"
                            disabled={isLoading}
                        >
                            {isLoading
                                ? formString.loadingButtonText
                                : formString.submitButtonText}
                        </Button>
                    )}
                </Col>
            </>
        );
    }, [canClearForm, handleClearForm, isLoading]);

    return (
        <Col sm={12} md={6}>
            <H1>{brandName}</H1>
            <Paragraph color="gray">{formString.description}</Paragraph>
            <Separator />
            <FormWrapper
                id={id.sendInputForm.main}
                onSubmit={handleSubmit(handleSendInput)}
            >
                <Row>
                    <Col>
                        <FieldsetWrapper form={id.sendInputForm.main}>
                            <Input
                                id={id.sendInputForm.ageInput}
                                name={formString.ageInputText}
                                register={register}
                                inputError={formState.errors.Age}
                                type="number"
                                isOutilined
                                required
                            />
                        </FieldsetWrapper>
                    </Col>
                    <Col>
                        <FieldsetWrapper form={id.sendInputForm.main}>
                            <Input
                                id={id.sendInputForm.sexInput}
                                name={formString.sexInputText}
                                register={register}
                                options={sexOptions}
                                inputError={formState.errors.Sex}
                                type="select"
                                isOutilined
                                required
                            />
                        </FieldsetWrapper>
                    </Col>
                </Row>
                <Separator />
                <Row>
                    <Col>
                        <FieldsetWrapper form={id.sendInputForm.main}>
                            <Input
                                id={id.sendInputForm.embarkedInput}
                                name={formString.embarkedInputText}
                                register={register}
                                options={embarkedOptions}
                                inputError={formState.errors.Embarked}
                                type="select"
                                isOutilined
                                required
                            />
                        </FieldsetWrapper>
                    </Col>
                </Row>
                <Separator large />
                <Visible xs sm>
                    <Row justify="center">{renderSubmitButton()}</Row>
                </Visible>
                <Hidden xs sm>
                    <Row>{renderSubmitButton()}</Row>
                </Hidden>
            </FormWrapper>
            <Visible xs sm>
                <Separator />
            </Visible>
        </Col>
    );
};

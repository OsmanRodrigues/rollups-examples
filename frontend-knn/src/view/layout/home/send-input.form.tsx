import { FC, useCallback } from "react";
import { Col, Hidden, Row, Visible } from "react-grid-system";
import { useForm } from "react-hook-form";
import { brandName } from "../../../config/constants";
import { SendInputData } from "../../../controller/send.controller";
import { Button } from "../../atomic/button.mol/button.mol";
import { FieldsetWrapper, FormWrapper } from "../../atomic/form.org/form.mol";
import { InputError } from "../../atomic/form.org/helpers";
import { Input } from "../../atomic/form.org/input.mol";
import { Separator } from "../../atomic/layout.org/separator.mol/separator.atm";
import { H1, Label, Paragraph } from "../../atomic/typography.mol";
import { ChartDraw } from "./chart-draw/chart-draw";
import { id, string } from "./constants";

interface ISendInputForm {
    handleSendInput: (data: SendInputData) => void,
    onClearForm: () => void
    isLoading: boolean,
    canClearForm: boolean,
}

const formString = string.sendInputForm;

export const SendInputForm: FC<ISendInputForm> = ({
    handleSendInput,
    onClearForm,
    isLoading,
    canClearForm
}) => {
    const {
        handleSubmit,
        register,
        formState,
        clearErrors,
        reset,
        watch
    } = useForm<SendInputData>();
    const formValue = watch();
    const lengthAndWidthMax = 10;
    const plMaxFallback = !!formValue.sl ? +formValue.sl : lengthAndWidthMax;
    const pwMaxFallback = !!formValue.sw ? +formValue.sw : lengthAndWidthMax;
    const chartDrawData = {
        ...formValue,
        pl: formValue.pl > formValue.sl ? formValue.sl : formValue.pl,
        pw: formValue.pw > formValue.sw ? formValue.sw : formValue.pw,
    };

    const handleClearForm = useCallback((e: any) => {
        e.preventDefault();
        onClearForm();
        clearErrors();
        reset();
    }, [onClearForm, clearErrors, reset])

    return (
        <Col xs={12} md={6}>
            <H1>{brandName}</H1>
            <Paragraph color="gray">{formString.description}</Paragraph>
            <Separator />
            <Row>
                <Col xs={12} md={8} lg={9}>
                    <ChartDraw inputData={chartDrawData} />
                </Col>
                <Col xs={12} md={4} lg={3}>
                    <FormWrapper
                        id={id.sendInputForm.main}
                        onSubmit={handleSubmit(handleSendInput)}
                    >
                        <Row>
                            <Col>
                                <Label paddingX="sm">
                                    {formString.sepalLabel}
                                </Label>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={6} md={12}>
                                <FieldsetWrapper
                                    form={id.sendInputForm.main}
                                    flexDir="row"
                                >
                                    <Input
                                        id={id.sendInputForm.sepalWidthInput}
                                        name={formString.widthLabel}
                                        register={register}
                                        type="number"
                                        flexDir="row"
                                        max={lengthAndWidthMax}
                                        min={0.1}
                                        step={0.01}
                                        isOutilined
                                        required
                                    />
                                </FieldsetWrapper>
                                <InputError
                                    error={formState.errors.sw}
                                    name={formString.widthLabel}
                                    options={{
                                        required: true,
                                        max: lengthAndWidthMax,
                                        min: 0.1,
                                    }}
                                />
                            </Col>
                            <Col xs={6} md={12}>
                                <FieldsetWrapper
                                    form={id.sendInputForm.main}
                                    flexDir="row"
                                >
                                    <Input
                                        id={id.sendInputForm.sepalLengthInput}
                                        name={formString.lengthLabel}
                                        register={register}
                                        type="number"
                                        flexDir="row"
                                        max={lengthAndWidthMax}
                                        min={0.1}
                                        step={0.01}
                                        isOutilined
                                        required
                                    />
                                </FieldsetWrapper>
                                <InputError
                                    error={formState.errors.sl}
                                    name={formString.lengthLabel}
                                    options={{
                                        required: true,
                                        max: lengthAndWidthMax,
                                        min: 0.1,
                                    }}
                                />
                            </Col>
                        </Row>
                        <Separator />
                        <Row>
                            <Col>
                                <Label paddingX="sm">
                                    {formString.petalLabel}
                                </Label>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={6} md={12}>
                                <FieldsetWrapper
                                    form={id.sendInputForm.main}
                                    flexDir="row"
                                >
                                    <Input
                                        id={id.sendInputForm.petalWidthInput}
                                        name={formString.widthLabel}
                                        register={register}
                                        type="number"
                                        flexDir="row"
                                        max={pwMaxFallback}
                                        min={0.1}
                                        step={0.01}
                                        isOutilined
                                        required
                                    />
                                </FieldsetWrapper>
                                <InputError
                                    error={formState.errors.pw}
                                    name={formString.widthLabel}
                                    options={{
                                        required: true,
                                        max: pwMaxFallback,
                                        min: 0.1,
                                    }}
                                />
                            </Col>
                            <Col xs={6} md={12}>
                                <FieldsetWrapper
                                    form={id.sendInputForm.main}
                                    flexDir="row"
                                >
                                    <Input
                                        id={id.sendInputForm.petalLengthInput}
                                        name={formString.lengthLabel}
                                        register={register}
                                        type="number"
                                        flexDir="row"
                                        max={plMaxFallback}
                                        min={0.1}
                                        step={0.01}
                                        isOutilined
                                        required
                                    />
                                </FieldsetWrapper>
                                <InputError
                                    error={formState.errors.pl}
                                    name={formString.lengthLabel}
                                    options={{
                                        required: true,
                                        max: plMaxFallback,
                                        min: 0.1,
                                    }}
                                />
                            </Col>
                        </Row>
                    </FormWrapper>
                </Col>
            </Row>
            <Separator />
            <Row>
                <Col>
                    <Visible xs sm>
                        <Row justify="center">
                            {renderSubmitButton(
                                canClearForm,
                                handleClearForm,
                                isLoading
                            )}
                        </Row>
                    </Visible>
                    <Hidden xs sm>
                        <Row>
                            {renderSubmitButton(
                                canClearForm,
                                handleClearForm,
                                isLoading
                            )}
                        </Row>
                    </Hidden>
                </Col>
            </Row>
            <Visible xs sm>
                <Separator />
            </Visible>
        </Col>
    );
};

const renderSubmitButton = (
    canClearForm: boolean,
    handleClearForm: (e: any)=> void,
    isLoading: boolean
) => {
    return (
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
    );
};

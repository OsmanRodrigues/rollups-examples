import { FC, useMemo } from "react";
import { AxisOptions, Chart } from "react-charts";
import { Col } from "react-grid-system";
import { ChartDrawSVGDefs, ChartDrawWrapper, FLOWER_BG_ID } from "./chart-draw.style";
import { Measurements, Series } from "./types";
import flowerBg from "../../../../assets/img/flower-bg.svg"
import { SendInputData } from "../../../../controller/send.controller";

interface IChartDraw {
    inputData: SendInputData
}

export const ChartDraw: FC<IChartDraw> = ({
    inputData: {
        pl, pw, sl, sw
    }
}) => {
    const sepalData = [
        {
            l: +sl ?? 0,
            w: 0,
        },
        {
            l: +sl ?? 0,
            w: +sw ?? 0,
        },
    ];
    const sepal = {
        label: "Sepal",
        data: sepalData,
    };
    const petalData = [
        {
            l: +pl ?? 0,
            w: 0,
        },
        {
            l: +pl ?? 0,
            w: +pw ?? 0,
        },
    ];
    const petal = {
        label: "Petal",
        data: petalData,
    };
    const background = sepal;
    const data: [Series, Series, Series] = [background, sepal, petal];

    const primaryAxis = useMemo(
        (): AxisOptions<Measurements> => ({
            getValue: (datum) => datum.w,
            max: 12,
            min: 0,
        }),
        []
    );

    const secondaryAxes = useMemo(
        (): AxisOptions<Measurements>[] => [
            {
                getValue: (datum) => datum.l,
                elementType: "area",
                stacked: false,
                max: 12,
                min: 0,
            },
        ],
        []
    );

    return (
        <Col xs={12}>
            <ChartDrawSVGDefs>
                <defs>
                    <pattern
                        id={FLOWER_BG_ID}
                        patternUnits="userSpaceOnUse"
                        width="400"
                        height="400"
                    >
                        <image
                            xlinkHref={flowerBg}
                        />
                    </pattern>
                </defs>
            </ChartDrawSVGDefs>
            <ChartDrawWrapper>
                <Chart
                    options={{
                        data,
                        primaryAxis,
                        secondaryAxes,
                        getSeriesStyle: () => ({
                            line: { opacity: 0 },
                            area: {
                                transition: "all 1.5s ease-out 0s",
                            },
                        }),
                    }}
                />
            </ChartDrawWrapper>
        </Col>
    );
};

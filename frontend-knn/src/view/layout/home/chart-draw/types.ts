export type Measurements = {
    w?: number;
    l?: number;
};

export type Series = {
    label: string;
    data: Measurements[];
};

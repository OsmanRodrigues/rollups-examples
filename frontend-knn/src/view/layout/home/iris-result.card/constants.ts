import { SendInputData } from "../../../../controller/send.controller"

export enum IrisType {
    Setosa = "iris-setosa",
    Versicolor = "iris-versicolor",
    Virginica = "iris-virginica"
};

export const irisTitle: Record<IrisType, string> = {
    "iris-setosa": "Iris Setosa",
    "iris-versicolor": "Iris Versicolor",
    "iris-virginica": "Iris Virginica"
};

export const irisDescription: typeof irisTitle = {
    "iris-setosa":
        "Iris setosa is similar in form to a miniature Japanese iris, or a dwarf version of Iris sibirica but a shorter lived version.",
    "iris-versicolor":
        "Iris versicolor is a flowering herbaceous perennial plant, growing 10–80 cm (4–31 in) high. It tends to form large clumps from thick, creeping rhizomes.",
    "iris-virginica":
        "Iris virginica is a perennial plant. The plant has 2 to 4 erect or arching, bright green, lance-shaped leaves that are flattened into one plane at the base.",
};

export const irisDescriptionSrcLink: typeof irisTitle = {
    "iris-setosa": "https://en.wikipedia.org/wiki/Iris_setosa",
    "iris-versicolor": "https://en.wikipedia.org/wiki/Iris_versicolor",
    "iris-virginica": "https://en.wikipedia.org/wiki/Iris_virginica",
};

export const irisDataTitle: Record<keyof SendInputData, string> = {
    pl: "Petal length",
    pw: "Petal width",
    sl: "Sepal length",
    sw: "Sepal width",
};

export const string = {
    resultTitle: "You got a",
    dataProvidedTitle: "Data provided",
    description: {
        sourceText: "Source: Wikipedia",
        sourceLinkText: "See more",
    },
};

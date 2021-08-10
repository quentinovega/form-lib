export function buildSubResolver(props: any, key: any, dependencies: any): yup.AnySchema<any, any, any> | undefined;
export function getShapeAndDependencies(flow: any, schema: any, dependencies?: any[]): {
    shape: any;
    dependencies: any[];
};
export function Form({ schema, flow, value, inputWrapper, onChange, footer, httpClient }: {
    schema: any;
    flow: any;
    value: any;
    inputWrapper: any;
    onChange: any;
    footer: any;
    httpClient: any;
}): JSX.Element;
import * as yup from "yup";

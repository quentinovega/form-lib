export interface SimpleConstraint {
    message: string;
}
export interface NumberConstraint {
    value: number;
    message: string;
}
export interface DateConstraint {
    value: Date | string;
    message: string;
}
export interface StringConstraint {
    value: string;
    message: string;
}
export interface ReferenceConstraint {
    ref: string | number;
    message: string;
}
export interface TestConstraint extends ReferenceConstraint {
    test: (val: any) => boolean;
}
export interface WhenConstraint {
    ref: string;
    test: (val: any) => boolean;
    then: object;
    otherwise?: object;
}
export interface MatcheConstraint {
    message: string;
    regexp: RegExp;
}
export interface OneOfConstraint {
    message: string;
    arrayOfValues: any[];
}
export interface NoUnknownConstraint {
    message: string;
    onlyKnownKeys?: boolean;
}

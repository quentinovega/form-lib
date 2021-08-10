import * as yup from 'yup';
import { BaseResolverConstraints } from './baseResolver';
import * as Constraints from './types';
import { BaseResolver } from './baseResolver';
declare type NumberResolverConstraints = {
    min?: Constraints.NumberConstraint;
    max?: Constraints.NumberConstraint;
    positive?: Constraints.SimpleConstraint;
    negative?: Constraints.SimpleConstraint;
    integer?: Constraints.SimpleConstraint;
    lessThan?: Constraints.ReferenceConstraint;
    moreThan?: Constraints.ReferenceConstraint;
};
export declare class NumberResolver extends BaseResolver {
    constructor(constraints: BaseResolverConstraints & NumberResolverConstraints);
    min?: Constraints.NumberConstraint;
    max?: Constraints.NumberConstraint;
    positive?: Constraints.SimpleConstraint;
    negative?: Constraints.SimpleConstraint;
    integer?: Constraints.SimpleConstraint;
    lessThan?: Constraints.ReferenceConstraint;
    moreThan?: Constraints.ReferenceConstraint;
    toResolver(key: string, dependencies: any): yup.AnySchema<any, any, any>;
}
export {};

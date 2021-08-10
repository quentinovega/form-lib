import * as yup from 'yup';
import { BaseResolverConstraints } from './baseResolver';
import * as Constraints from './types';
import { BaseResolver } from './baseResolver';
declare type DateResolverConstraints = {
    min?: Constraints.DateConstraint;
    max?: Constraints.DateConstraint;
};
export declare class DateResolver extends BaseResolver {
    constructor(constraints: BaseResolverConstraints & DateResolverConstraints);
    min?: Constraints.DateConstraint;
    max?: Constraints.DateConstraint;
    toResolver(key: string, dependencies: any): yup.AnySchema<any, any, any>;
}
export {};

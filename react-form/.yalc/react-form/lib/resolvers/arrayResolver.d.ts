import * as yup from 'yup';
import * as Constraints from './types';
import { BaseResolver } from './baseResolver';
import { BaseResolverConstraints } from './baseResolver';
declare type ArrayResolverConstraints = {
    min?: Constraints.NumberConstraint;
    max?: Constraints.NumberConstraint;
    length?: Constraints.NumberConstraint;
};
export declare class ArrayResolver extends BaseResolver {
    constructor(constraints: BaseResolverConstraints & ArrayResolverConstraints);
    min?: Constraints.NumberConstraint;
    max?: Constraints.NumberConstraint;
    length?: Constraints.NumberConstraint;
    toResolver(subResolver: any, key: string, dependencies: any): yup.AnySchema<any, any, any>;
}
export {};

import * as yup from 'yup';
import { BaseResolverConstraints } from './baseResolver';
import * as Constraint from './types';
import { BaseResolver } from './baseResolver';
declare type StringResolverConstraints = {
    min?: Constraint.NumberConstraint;
    max?: Constraint.NumberConstraint;
    email?: Constraint.SimpleConstraint;
    url?: Constraint.SimpleConstraint;
    uuid?: Constraint.SimpleConstraint;
    matches?: Constraint.MatcheConstraint;
};
export declare class StringResolver extends BaseResolver {
    constructor(constraints: BaseResolverConstraints & StringResolverConstraints);
    min?: Constraint.NumberConstraint;
    max?: Constraint.NumberConstraint;
    email?: Constraint.SimpleConstraint;
    url?: Constraint.SimpleConstraint;
    uuid?: Constraint.SimpleConstraint;
    matches?: Constraint.MatcheConstraint;
    toResolver(key: string, dependencies: any): yup.AnySchema<any, any, any>;
}
export {};

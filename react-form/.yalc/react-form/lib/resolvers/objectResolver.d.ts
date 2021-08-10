import * as yup from 'yup';
import { BaseResolverConstraints } from './baseResolver';
import * as Constraints from './types';
import { BaseResolver } from './baseResolver';
declare type ObjectResolverConstraints = {
    noUnknown?: Constraints.NoUnknownConstraint;
    schema?: object;
};
export declare class ObjectResolver extends BaseResolver {
    constructor(constraints: BaseResolverConstraints & ObjectResolverConstraints);
    schema?: object;
    noUnknown?: Constraints.NoUnknownConstraint;
    toResolver(key: string, dependencies: any): yup.AnySchema<any, any, any>;
}
export {};

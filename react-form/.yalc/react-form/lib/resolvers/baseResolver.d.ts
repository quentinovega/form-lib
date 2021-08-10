import * as Constraints from './types';
import * as yup from 'yup';
export declare type BaseResolverConstraints = {
    required?: Constraints.SimpleConstraint;
    test?: Constraints.TestConstraint | Array<Constraints.TestConstraint>;
    when?: Constraints.WhenConstraint | Array<Constraints.WhenConstraint>;
    oneOf?: Constraints.OneOfConstraint;
};
export declare class BaseResolver {
    constructor(type: string, constraints: BaseResolverConstraints);
    type: string;
    required?: Constraints.SimpleConstraint;
    test?: Constraints.TestConstraint | Array<Constraints.TestConstraint>;
    when?: Constraints.WhenConstraint | Constraints.WhenConstraint[];
    oneOf?: Constraints.OneOfConstraint;
    toBaseResolver(yupResolver: yup.AnySchema, key: string, dependencies: any): yup.AnySchema<any, any, any>;
}

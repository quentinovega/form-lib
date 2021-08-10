export function option(x: any): any;
export function Some(x: any): {
    map: (f: any) => any;
    flatMap: (f: any) => any;
    fold: (_ifEmpty: any, f: any) => any;
    orElse: () => any;
    getOrElse: () => any;
    getOrNull: () => any;
    isDefined: boolean;
    exists: (f: any) => any;
};
export namespace None {
    function map(): {
        map: () => any;
        flatMap: () => any;
        fold: (ifEmpty: any, _f: any) => any;
        orElse: (x: any) => any;
        getOrElse: (ifEmpty: any) => any;
        getOrNull: () => undefined;
        isDefined: boolean;
        exists: () => boolean;
    };
    function flatMap(): {
        map: () => any;
        flatMap: () => any;
        fold: (ifEmpty: any, _f: any) => any;
        orElse: (x: any) => any;
        getOrElse: (ifEmpty: any) => any;
        getOrNull: () => undefined;
        isDefined: boolean;
        exists: () => boolean;
    };
    function fold(ifEmpty: any, _f: any): any;
    function orElse(x: any): any;
    function getOrElse(ifEmpty: any): any;
    function getOrNull(): undefined;
    const isDefined: boolean;
    function exists(): boolean;
}

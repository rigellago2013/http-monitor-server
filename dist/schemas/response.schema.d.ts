import { HydratedDocument } from 'mongoose';
export type ResponseDocument = HydratedDocument<Response>;
export declare class Response {
    args: Record<string, any>;
    data: string;
    files: Record<string, any>;
    form: Record<string, any>;
    headers: Record<string, string>;
    json: any;
    method: string;
    origin: string;
    url: string;
}
export declare const ResponseSchema: import("mongoose").Schema<Response, import("mongoose").Model<Response, any, any, any, import("mongoose").Document<unknown, any, Response> & Response & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v?: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Response, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Response>> & import("mongoose").FlatRecord<Response> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v?: number;
}>;

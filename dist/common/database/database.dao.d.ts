import { Model, FilterQuery, UpdateQuery, QueryOptions, SaveOptions } from 'mongoose';
export declare abstract class DAO<T> {
    protected readonly model: Model<T>;
    constructor(model: Model<T>);
    create(doc: Partial<T>, options?: SaveOptions): Promise<(import("mongoose").Document<unknown, {}, T> & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v?: number;
    }) | (import("mongoose").Document<unknown, {}, T> & Required<{
        _id: unknown;
    }> & {
        __v?: number;
    })>;
    find(filter?: FilterQuery<T>, options?: QueryOptions): Promise<import("mongoose").Require_id<import("mongoose").BufferToBinary<import("mongoose").FlattenMaps<T>>>[]>;
    findOne(filter: FilterQuery<T>, options?: QueryOptions): Promise<import("mongoose").IfAny<T, any, import("mongoose").Document<unknown, {}, T> & import("mongoose").Default__v<import("mongoose").Require_id<T>>> extends infer T_1 ? T_1 extends import("mongoose").IfAny<T, any, import("mongoose").Document<unknown, {}, T> & import("mongoose").Default__v<import("mongoose").Require_id<T>>> ? T_1 extends null ? T_1 extends infer T_2 ? T_2 extends T_1 ? T_2 extends any[] ? import("mongoose").Require_id<import("mongoose").BufferToBinary<import("mongoose").FlattenMaps<T>>>[] : import("mongoose").Require_id<import("mongoose").BufferToBinary<import("mongoose").FlattenMaps<T>>> : never : never : T_1 extends any[] ? import("mongoose").Require_id<import("mongoose").BufferToBinary<import("mongoose").FlattenMaps<T>>>[] : import("mongoose").Require_id<import("mongoose").BufferToBinary<import("mongoose").FlattenMaps<T>>> : never : never>;
    updateOne(filter: FilterQuery<T>, update: UpdateQuery<T>, options?: QueryOptions): Promise<import("mongoose").IfAny<T, any, import("mongoose").Document<unknown, {}, T> & import("mongoose").Default__v<import("mongoose").Require_id<T>>>>;
    deleteOne(filter: FilterQuery<T>, options?: QueryOptions): Promise<import("mongoose").IfAny<T, any, import("mongoose").Document<unknown, {}, T> & import("mongoose").Default__v<import("mongoose").Require_id<T>>>>;
}

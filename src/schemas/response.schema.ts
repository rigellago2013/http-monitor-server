// src/schemas/response.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
 
export type ResponseDocument = HydratedDocument<Response>;

@Schema()
export class Response {
  @Prop({ type: Object })
  args: Record<string, any>;

  @Prop({ type: String })
  data: string;

  @Prop({ type: Object })
  files: Record<string, any>;

  @Prop({ type: Object })
  form: Record<string, any>;

  @Prop({ type: Object })
  headers: Record<string, string>;

  @Prop({ type: Object, default: null })
  json: any;

  @Prop({ type: String })
  method: string;

  @Prop({ type: String })
  origin: string;

  @Prop({ type: String })
  url: string;
}

export const ResponseSchema = SchemaFactory.createForClass(Response);

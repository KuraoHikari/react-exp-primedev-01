import { Response } from "express";

export const sendResponse = (res: Response, status: string, metadata?: any) => {
 let code = 200;

 switch (status) {
  case SuccessCode.OK:
   break;
  case SuccessCode.Created:
   code = 201;
   break;
  case SuccessCode.Accepted:
   code = 202;
   break;
  case SuccessCode.NoContent:
   code = 204;
   break;
  default:
   code = 200;
   break;
 }

 return res.status(code).json({
  status: code,
  name: status,
  metaData: metadata,
 });
};

export class SuccessCode {
 public static readonly Created = "Created";
 public static readonly Accepted = "Accepted";
 public static readonly NoContent = "NoContent";
 public static readonly OK = "OK";
}

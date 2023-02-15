import 'reflect-metadata';
import { Methods } from '../enums/methods';
import { MetadataKeys } from '../enums/metadataKeys';
import { RouteHandlerDescriptor } from '../interfaces/routeHandlerDescriptor.interface';

function routeBinder(method: string) {
  return function (path: string) {
    return function(target: any, key: string, desc: RouteHandlerDescriptor) {
      Reflect.defineMetadata(MetadataKeys.path, path, target, key);
      Reflect.defineMetadata(MetadataKeys.method, method, target, key);
    };
  }
}

export const get = routeBinder(Methods.get);
export const post = routeBinder(Methods.post);
export const del = routeBinder(Methods.del);
export const put = routeBinder(Methods.put);
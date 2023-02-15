import 'reflect-metadata';
import { AppRouter } from '../routes/app.router';
import { Methods } from '../enums/methods';
import { MetadataKeys } from '../enums/metadataKeys';

export function controller(routePrefix: string) {
  return function(target: Function) {
    const router = AppRouter.getInstance();

    for (let key in target.prototype) {
      const routeHandler = target.prototype[key];
      const path = Reflect.getMetadata(MetadataKeys.path, target.prototype, key);
      const method: Methods = Reflect.getMetadata(MetadataKeys.method, target.prototype, key);
      const middlewares = Reflect.getMetadata(MetadataKeys.middleware, target.prototype, key) || [];

      if (path) {
        router[method](`${routePrefix}${path}`,...middlewares, routeHandler);
      }
    }
  };
}

/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { util, configure } from 'protobufjs/minimal';
import * as Long from 'long';
import { Observable } from 'rxjs';

export const protobufPackage = 'film';

export interface CreateFilmRequest {
  title: string;
  releaseYear: string;
}

export interface CreateFilmResponse {
  status: number;
  error: string[];
  id: number;
}

export const FILM_PACKAGE_NAME = 'film';

export interface FilmServiceClient {
  createFilm(request: CreateFilmRequest): Observable<CreateFilmResponse>;
}

export interface FilmServiceController {
  createFilm(request: CreateFilmRequest): Promise<CreateFilmResponse> | Observable<CreateFilmResponse> | CreateFilmResponse;
}

export function FilmServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['createFilm'];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod('FilmService', method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod('FilmService', method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const FILM_SERVICE_NAME = 'FilmService';

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (util.Long !== Long) {
  util.Long = Long as any;
  configure();
}
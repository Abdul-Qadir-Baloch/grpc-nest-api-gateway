/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { util, configure } from 'protobufjs/minimal';
import * as Long from 'long';
import { Observable } from 'rxjs';

export const protobufPackage = 'film';

export interface CreateFilmRequest {
  title: string;
  releaseYear: string;
  directorId:number;
  userId:number;
}

export interface CreateFilmResponse {
  status: number;
  error: string[];
  id: number;
}
export interface DeleteFilm{
  id:number
}
export interface DeleteFilmResponse{
  status:number;
  error:string[]
}
export interface FindOneData {
  id: number;
  title: string;
  release_year: string;
  directorId: number;
  created_at:string ;
}
export const FILM_PACKAGE_NAME = 'film';

export interface FilmServiceClient {
  createFilm(request: CreateFilmRequest): Observable<CreateFilmResponse>;
 
  delete(request:DeleteFilm): Observable<DeleteFilmResponse>
 
  search(request:any) :Observable<FindOneData>
 
  updateFilm(request:any) : Observable <any>
 
  find(request:any): Observable <any>
}

export interface FilmServiceController {
  createFilm(request: CreateFilmRequest): Promise<CreateFilmResponse> | Observable<CreateFilmResponse> | CreateFilmResponse;
 
  delete(request:DeleteFilm):Promise<any> |Observable<DeleteFilmResponse>
 
  search(request:any) :Promise<any> |Observable<FindOneData>
 
  updateFilm(request:any) : Promise<any> | Observable <any>

  find(request:any) : Promise<any> | Observable<any>
}

export function FilmServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['createFilm','delete','search', 'updateFilm', 'find'];
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
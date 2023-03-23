
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { FILM_SERVICE_NAME, FILM_PACKAGE_NAME } from './film.pb';
import { FilmController } from './film.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: FILM_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:50052',
          package: FILM_PACKAGE_NAME,
          protoPath: 'node_modules/grpc-nest-proto/proto/film.proto',
        },
      },
    ]),
  ],
  controllers: [FilmController],
})
export class FilmModule {}
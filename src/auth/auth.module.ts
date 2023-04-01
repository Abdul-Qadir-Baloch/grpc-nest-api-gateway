import { Global, Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthController } from './auth.controller';
import { AUTH_SERVICE_NAME, AUTH_PACKAGE_NAME } from './auth.pb';
import { AuthService } from './auth.service';
import { RolesGuard } from './roles.guard';

@Global()
@Module({
  imports: [
    ClientsModule.register([
      {
        name: AUTH_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:50051',
          package: AUTH_PACKAGE_NAME,
          protoPath: 'node_modules/grpc-nest-proto/proto/auth.proto',
        },
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService,{provide:APP_GUARD ,useClass:RolesGuard}],
  exports: [AuthService],
})
export class AuthModule {}
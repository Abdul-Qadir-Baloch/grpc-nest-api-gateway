import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { FilmModule } from './film/film.module';

@Module({
  imports: [AuthModule, FilmModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Controller, Inject, Post, OnModuleInit, UseGuards, Req } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { CreateFilmResponse, FilmServiceClient, FILM_SERVICE_NAME, CreateFilmRequest } from './film.pb';
import { AuthGuard } from '../auth/auth.guard';
import { Request } from 'express';

@Controller('film')
export class FilmController implements OnModuleInit {
  private svc: FilmServiceClient;

  @Inject(FILM_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.svc = this.client.getService<FilmServiceClient>(FILM_SERVICE_NAME);
  }

  @Post()
  @UseGuards(AuthGuard)
  private async createFilm(@Req() req: Request): Promise<Observable<CreateFilmResponse>> {
    const body: CreateFilmRequest = req.body;

    // body.userId = <number>req.user;

    return this.svc.createFilm(body);
  }
}

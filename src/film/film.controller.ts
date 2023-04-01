import { Controller, Inject, Post,Delete, OnModuleInit, UseGuards, Req, Body,Param,ParseIntPipe,Get,Patch,Query } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { CreateFilmResponse, FilmServiceClient, FILM_SERVICE_NAME, CreateFilmRequest, DeleteFilmResponse } from './film.pb';
import { AuthGuard } from '../auth/auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { query, Request } from 'express';
import { Role } from 'src/auth/role.enum';


@Controller('film')
export class FilmController implements OnModuleInit {
  private svc: FilmServiceClient;

  @Inject(FILM_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.svc = this.client.getService<FilmServiceClient>(FILM_SERVICE_NAME);
  }

  @Post()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard)
  private async createFilm(@Req() req: Request): Promise<Observable<CreateFilmResponse>> {
    const body: CreateFilmRequest = req.body;
    body.userId = <number>req.user;

    return this.svc.createFilm(body);
  }
  @Delete(':id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard)
  private async delete(@Param('id', ParseIntPipe)id:number):Promise<Observable<DeleteFilmResponse>>{
        return this.svc.delete({id})
  }
  @Patch()
  @UseGuards(AuthGuard)
  private async updateFilm(@Body() body ):Promise<any>{
      return this.svc.updateFilm(body)
  } 
  @Get()
  @UseGuards(AuthGuard)
  private async findFilms(@Query() query ):Promise<any>{
        return this.svc.find(query)
  }
}

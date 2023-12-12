import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { UserParam } from 'src/auth/user.decorator';
import { CreateReviewDto } from 'src/review/dto/create-review.dto';
import { User } from 'src/user/user.model';
import { CreateMovieDto, UpdateMovieDto } from './dto/create-movie.dto';
import { MovieService } from './movie.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { ApiBearerAuth, ApiConsumes, ApiResponse } from '@nestjs/swagger';

@Controller('movies')
export class MovieController {
  constructor(private movieService: MovieService) {}

  @ApiBearerAuth('access-token')
  @ApiResponse({
    status: 403,
    description: 'This is forbidden for non contributor users',
  })
  @Roles('CONTRIBUTOR')
  @UseGuards(RolesGuard)
  @UseInterceptors(FileInterceptor('poster'))
  @Post()
  create(
    @Body() movie: CreateMovieDto,
    @UploadedFile() poster?: Express.Multer.File,
  ) {
    return this.movieService.createMovie(movie, poster);
  }

  @ApiConsumes('multipart/form-data')
  @ApiBearerAuth('access-token')
  @ApiResponse({
    status: 403,
    description: 'This is forbidden for non contributor users',
  })
  @ApiResponse({
    status: 404,
    description: 'Movie with this id was not found',
  })
  @Roles('CONTRIBUTOR')
  @UseGuards(RolesGuard)
  @UseInterceptors(FileInterceptor('poster'))
  @Patch('/:id')
  update(
    @Param('id') id: number,
    @Body() movie: UpdateMovieDto,
    @UploadedFile() poster?: Express.Multer.File,
  ) {
    return this.movieService.updateMovie(id, movie, poster);
  }

  @ApiBearerAuth('access-token')
  @ApiResponse({
    status: 403,
    description: 'This is forbidden for non contributor users',
  })
  @ApiResponse({
    status: 404,
    description: 'Movie with this id was not found',
  })
  @Roles('CONTRIBUTOR')
  @UseGuards(RolesGuard)
  @Delete('/:id')
  deleteMovie(@Param('id') id: number) {
    return this.movieService.deleteMovie(id);
  }

  @Get()
  getAll() {
    return this.movieService.getAllMovies();
  }

  @Get('/:id')
  getById(@Param('id') id: number) {
    return this.movieService.getMovieById(id);
  }

  @ApiBearerAuth('access-token')
  @ApiResponse({
    status: 401,
    description: 'This is forbidden for not authorized users',
  })
  @ApiResponse({
    status: 404,
    description: 'Movie with this id was not found',
  })
  @UseGuards(AuthGuard)
  @Post('/:id/reviews')
  addReview(
    @Param('id') id: number,
    @UserParam() user: User,
    @Body() review: CreateReviewDto,
  ) {
    return this.movieService.addReview(id, review, user);
  }

  @Get('/:id/reviews')
  getAllReviews(@Param('id') id: number) {
    return this.movieService.getMovieReviews(id);
  }

  @Get('/search')
  search(@Query('name') name: string) {
    return this.movieService.searchByName(name);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { CreateReviewDto } from 'src/review/dto/create-review.dto';
import { ReviewService } from 'src/review/review.service';
import { User } from 'src/user/user.model';
import { CreateMovieDto } from './dto/create-movie.dto';
import { Movie } from './movie.model';
import { FilesService } from 'src/files/files.service';
import Exception from 'src/exceptions/exceptions';

@Injectable()
export class MovieService {
  constructor(
    @InjectModel(Movie) private movieRepository: typeof Movie,
    private reviewService: ReviewService,
    private filesService: FilesService,
  ) {}

  async createMovie(dto: CreateMovieDto, poster: any) {
    const dtoWithRating = { ...dto, rating: 0, year: Number(dto.year) };
    const posterFileName = await this.getPosterFileName(poster);
    const movie = await this.movieRepository.create({
      ...dtoWithRating,
      poster: posterFileName,
    });

    return movie;
  }

  async updateMovie(id: number, dto: Partial<CreateMovieDto>, poster: any) {
    const movie = await this.getMovieById(id);

    if (!movie) {
      throw new Exception.NotFoundException('Movie');
    }

    const posterFileName = await this.getPosterFileName(poster);

    await movie.update({
      ...movie,
      ...dto,
      poster: posterFileName || movie.poster,
    });

    return await this.getMovieById(id);
  }

  private async getPosterFileName(poster: any): Promise<string> | null {
    return poster ? await this.filesService.createFile(poster) : null;
  }

  async deleteMovie(id: number) {
    const movie = await this.getMovieById(id);

    if (!movie) {
      throw new Exception.NotFoundException('Movie');
    }

    await movie.destroy();

    return movie;
  }

  async getAllMovies() {
    const movies = await this.movieRepository.findAll({
      include: { all: true },
    });

    return movies;
  }

  async getMovieById(id: number) {
    const movie = await this.movieRepository.findByPk(id, {
      include: { all: true },
    });

    if (!movie) {
      throw new Exception.NotFoundException('Movie');
    }

    return movie;
  }

  private async verifyMovie(id: number) {
    const movie = await this.getMovieById(id);

    if (!movie) {
      throw new Exception.NotFoundException('Movie');
    }

    return movie;
  }

  async addReview(id: number, reviewDto: CreateReviewDto, user: User) {
    const movie = await this.verifyMovie(id);

    const review = await this.reviewService.createReview(
      reviewDto,
      movie,
      user,
    );
    const reviews = await this.getMovieReviews(movie.id);
    const newRating =
      (movie.rating * (reviews.length - 1) + review.rate) / reviews.length;
    await movie.update({ rating: newRating });

    return review;
  }

  async getMovieReviews(id: number) {
    const movie = await this.verifyMovie(id);
    const reviews = await this.reviewService.getAllReviewsByMovie(movie.id);

    return reviews;
  }

  async searchByName(name: string) {
    const movie = await this.movieRepository.findAll({
      where: {
        name: { [Op.iLike]: '%' + name + '%' },
      },
    });

    return movie;
  }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { CreateReviewDto } from 'src/review/dto/create-review-dto';
import { ReviewService } from 'src/review/review.service';
import { User } from 'src/user/user.model';
import { CreateMovieDto } from './dto/create-movie-dto';
import { Movie } from './movie.model';

@Injectable({})
export class MovieService {
  constructor(
    @InjectModel(Movie) private movieRepository: typeof Movie,
    private reviewService: ReviewService,
  ) {}

  async createMovie(dto: CreateMovieDto) {
    const dtoWithRating = { ...dto, rating: 0 };
    const movie = await this.movieRepository.create(dtoWithRating);

    return movie;
  }

  async deleteMovie(id: number) {
    const movie = await this.getMovieById(id);

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

    return movie;
  }

  private async verifyMovie(id: number) {
    const movie = await this.getMovieById(id);

    if (!movie) {
      throw new HttpException(
        'Movie with this id does not exist',
        HttpStatus.NOT_FOUND,
      );
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

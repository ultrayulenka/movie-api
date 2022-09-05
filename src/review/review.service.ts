import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Movie } from 'src/movie/movie.model';
import { User } from 'src/user/user.model';
import { CreateReviewDto } from './dto/create-review-dto';
import { Review } from './review.model';

@Injectable({})
export class ReviewService {
  constructor(@InjectModel(Review) private reviewRepository: typeof Review) {}

  async createReview(dto: CreateReviewDto, movie: Movie, user: User) {
    const review = await this.reviewRepository.create(dto);
    await review.$set('movie', movie.id);
    await review.$set('user', user.id);

    return review;
  }

  async getAllReviewsByMovie(movieId: number) {
    const reviews = await this.reviewRepository.findAll({
      where: {
        movieId,
      },
    });

    return reviews;
  }
}

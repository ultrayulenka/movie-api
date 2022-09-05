import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Movie } from 'src/movie/movie.model';
import { User } from 'src/user/user.model';
import { UserModule } from 'src/user/user.module';
import { ReviewController } from './review.controller';
import { Review } from './review.model';
import { ReviewService } from './review.service';

@Module({
  controllers: [ReviewController],
  providers: [ReviewService],
  imports: [SequelizeModule.forFeature([User, Movie, Review]), UserModule],
  exports: [ReviewService],
})
export class ReviewModule {}

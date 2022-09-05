import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { Review } from 'src/review/review.model';
import { ReviewModule } from 'src/review/review.module';
import { MovieController } from './movie.controller';
import { Movie } from './movie.model';
import { MovieService } from './movie.service';

@Module({
  controllers: [MovieController],
  providers: [MovieService],
  imports: [
    SequelizeModule.forFeature([Movie, Review]),
    forwardRef(() => ReviewModule),
    AuthModule,
  ],
  exports: [MovieService],
})
export class MovieModule {}

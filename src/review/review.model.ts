import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Movie } from 'src/movie/movie.model';
import { User } from 'src/user/user.model';

interface ReviewCreationAttributes {
  text: string;
  rate: number;
  movieId: number;
  userId: number;
}

@Table({ tableName: 'reviews' })
export class Review extends Model<Review, ReviewCreationAttributes> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  @ApiProperty()
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  @ApiProperty()
  text: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  @ApiProperty()
  rate: number;

  @ForeignKey(() => Movie)
  @Column({ type: DataType.INTEGER })
  @ApiProperty()
  movieId: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  @ApiProperty()
  userId: number;

  @BelongsTo(() => Movie)
  movie: Movie;

  @BelongsTo(() => User)
  user: User;
}

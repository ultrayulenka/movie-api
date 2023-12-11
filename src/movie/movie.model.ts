import { ApiProperty } from '@nestjs/swagger';
import { HasMany, Column, DataType, Model, Table } from 'sequelize-typescript';
import { Review } from 'src/review/review.model';

interface MovieCreationAttributes {
  name: string;
  description: string;
  year: number;
  genre: string;
  poster: string;
}

@Table({ tableName: 'movies' })
export class Movie extends Model<Movie, MovieCreationAttributes> {
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
  name: string;

  @Column({ type: DataType.STRING })
  @ApiProperty()
  poster: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  @ApiProperty()
  description: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  @ApiProperty()
  year: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  @ApiProperty()
  genre: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  @ApiProperty()
  rating: number;

  @HasMany(() => Review)
  @ApiProperty({ type: () => [Review] })
  reviews: Review[];
}

import { HasMany, Column, DataType, Model, Table } from 'sequelize-typescript';
import { Review } from 'src/review/review.model';

interface MovieCreationAttributes {
  name: string;
  description: string;
  year: number;
  genre: string;
}

@Table({ tableName: 'movies' })
export class Movie extends Model<Movie, MovieCreationAttributes> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  year: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  genre: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  rating: number;

  @HasMany(() => Review)
  reviews: Review[];
}

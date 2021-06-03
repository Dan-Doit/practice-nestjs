import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config.service';
import { MoviesModule } from './movies/movies.module';
import { join } from 'path';
import { GraphQLJSON } from 'graphql-type-json';
import { AppController } from './app.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    GraphQLModule.forRoot({
      debug: true,
      playground: true,
      typePaths: ['./**/*.graphql'],
      definitions: { path: join(process.cwd(), 'src/graphql.ts') },
      resolvers: { JSON: GraphQLJSON },
      context: ({ req }) => ({
        headers: req.headers,
      }),
    }),
    MoviesModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

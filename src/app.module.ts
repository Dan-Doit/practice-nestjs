import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfigService } from './config/ormconfig.service';
import { MoviesModule } from './movies/movies.module';
import { join } from 'path';
import { GraphQLJSON } from 'graphql-type-json';
import { AppController } from './app.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfigService.getTypeOrmConfig()),
    GraphQLModule.forRoot({
      debug: true,
      playground: true,
      typePaths: ['./**/*.graphql'],
      definitions: { path: join(process.cwd(), 'src/graphql.ts') },
      // resolvers: { JSON: GraphQLJSON },
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

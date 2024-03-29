import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { ormConfigService } from './config/ormconfig.service';
import { MoviesModule } from './components/movies/movies.module';
import { join } from 'path';
import { GraphQLJSON } from 'graphql-type-json';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './components/users/user.module';
import { StarsModule } from './components/stars/stars.module';
import { CommentsModule } from './components/comments/comments.module';
import { SpendsModule } from './components/spends/spends.module';
import { ChargesModule } from './components/charges/charges.module';

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
    ScheduleModule.forRoot(),
    SpendsModule,
    ChargesModule,
    MoviesModule,
    AuthModule,
    UserModule,
    StarsModule,
    CommentsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

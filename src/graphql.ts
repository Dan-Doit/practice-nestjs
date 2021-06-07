
/*
 * ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface Token {
    access_token: string;
}

export interface IMutation {
    login(email: string, pass: string): token | Promise<token>;
    create_comment(comment: string, movieId: number): string | Promise<string>;
    add_movie(title: string, poster: string, filmed: string, genre: string, discription: string): string | Promise<string>;
    create_star(star: number, movieId: number): boolean | Promise<boolean>;
    add_user(email: string, password: string, avatar?: string, name: string): string | Promise<string>;
    delete_user(email: string): string | Promise<string>;
    update_user(password?: string, avatar?: string, name?: string): string | Promise<string>;
}

export interface IQuery {
    all_movies(): Movie[] | Promise<Movie[]>;
    all_users(): User[] | Promise<User[]>;
    one_user(email: string): User | Promise<User>;
}

export interface User {
    id: string;
    email: string;
    password: string;
    avatar: string;
    name: string;
    role: string;
    stars?: Star[];
    charges?: Charge[];
    spends?: Spend[];
    comments?: Comment[];
    createAt: string;
    updatedAt: string;
}

export interface Movie {
    id: number;
    title: string;
    poster: string;
    filmed: string;
    genre: string;
    discription: string;
    spends?: Spend[];
    stars?: Star[];
    comments?: Comment[];
    createdAt: string;
    updatedAt: string;
}

export interface Spend {
    id: number;
    user: User;
    movie: Movie;
    point: number;
    valid: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface Charge {
    id: number;
    user: User;
    point: number;
    vaild: boolean;
    chargedby: string;
    comments?: Comment[];
    createdAt: string;
    updatedAt: string;
}

export interface Star {
    id: number;
    user: User;
    movie: Movie;
    star: number;
    createdAt: string;
    updatedAt: string;
}

export interface Comment {
    id: number;
    user: User;
    comment: string;
    createdAt: string;
    updatedAt: string;
}

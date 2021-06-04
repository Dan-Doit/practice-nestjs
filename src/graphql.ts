
/*
 * ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface User {
    id: string;
    token: string;
    email: string;
    password: string;
    avatar: string;
    name: string;
    role: string;
    charges: Charge[];
    spends: Spend[];
    comments: Comment[];
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
    title: string;
    poster: string;
    filmed: string;
    genre: string;
    discription: string;
    stars?: Star[];
    comments?: Comment[];
    createdAt: string;
    updatedAt: string;
}

export interface Comment {
    id: number;
    title: string;
    poster: string;
    filmed: string;
    genre: string;
    discription: string;
    stars?: Star[];
    comments?: Comment[];
    createdAt: string;
    updatedAt: string;
}

export interface IQuery {
    all_movies(): Movie[] | Promise<Movie[]>;
}

export interface IMutation {
    add_movie(title: string, poster: string, filmed: string, genre: string, discription: string): string | Promise<string>;
}

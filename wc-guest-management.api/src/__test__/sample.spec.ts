interface IResource {
    create(data: any): any;
    findMany(): any[];
}

let movies: object[] = [];

class MoviesApi implements IResource {
    create(data: any) {
        movies.push(data);
        return data;
    }

    findMany() {
        return movies;
    }
}

const moviesApi: IResource = new MoviesApi();

describe('Movies API', () => {
    it('should create a new movie', () => {
        const movieData: object = {
            name: 'Pirates of the caribbean',
            rating: 8.5,
        };

        const movie: object = moviesApi.create(movieData);

        expect(movie).toEqual(movieData);
    });
});

// ---------- MOVIE Routing ----------
// Packages import
import express, { Request, Response } from "express";

// Datas import
import { movies } from "../data/movies";

export const moviesRouter = express.Router();

// ---------- Routes GET ----------
// Display all movies
moviesRouter.get("/movies", (req: Request, res: Response) => {
  try {
    const datas = movies.map((movie) => ({
      id: movie.id,
      poster: movie.poster,
      overview: movie.overview,
      title: movie.title,
    }));
    res.status(200).json(datas);
  } catch (error) {
    // res.status(500).json({ message: error.message });
  }
});

// ---------- Routes PUT ----------
// Update movie title by Id
moviesRouter.put("/movies/:id", (req: Request, res: Response) => {
  try {
    const movieId = req.params.id;
    const { title } = req.body;

    if (!title) {
      return res.status(404).json({ message: "Title is missing !" });
    }

    const movieIndex = movies.findIndex((movie) => movie.id === movieId);

    if (movieIndex === -1) {
      return res.status(404).json({ message: "Movie not found !" });
    }

    movies[movieIndex].title = title;

    res.status(200).json({
      message: "Title correctly updated !",
      movie: movies[movieIndex],
    });
  } catch (error) {
    console.log(error);
    //res.status(500).json({ message: error.message });
  }
});

// ---------- Routes DELETE ----------
// Delete movie by Id
moviesRouter.delete("/movies/:id", (req: Request, res: Response) => {
  try {
    const movieId = req.params.id;
    const movieIndex = movies.findIndex((movie) => movie.id === movieId);

    if (movieIndex === -1) {
      return res.status(404).json({ message: "Movie not found !" });
    }

    const movieToDelete = movies.splice(movieIndex, 1)[0];

    res.status(200).json({
      message: "The movie has been deleted !",
      movieToDelete: movieToDelete,
    });
  } catch (error) {
    console.log(error);
    //res.status(500).json({ message: error.message });
  }
});

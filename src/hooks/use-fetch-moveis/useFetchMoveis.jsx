import axios from "axios";
import { useEffect, useState } from "react";
import moviesData from "../../../movies.json";

export const useFetchMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          "https://thingproxy.freeboard.io/fetch/https://www.jsondataai.com/api/guK8Sdo"
        );
        console.log(response,'resp');
        
        if (!response.data) {
          setMovies(moviesData);
        } else {
          setMovies(response.data);
        }
      } catch (error) {
        setMovies(moviesData);
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return { movies, loading };
};

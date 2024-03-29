import React, { useEffect, useState } from "react";
import Tmdb from "./Tmdb";
import MovieRow from "./components/MovieRow";
import FeaturedMovie from "./components/FeaturedMovie";
import Header from "./components/Header";
import "./App.css";

export default () => {
  const [movieList, setMovieList] = useState([]);
  const [featuredData, setfeaturedData] = useState(null);
  const [blackHeader , setBlackHeader] = useState(false)
  useEffect(() => {
    //Armazenando a Lista de filmes
    const loadAll = async () => {
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      //Featured
      let originals = list.filter(i => i.slug === 'originals');
      let randomChosen = Math.floor(
        Math.random() * (originals[0].items.results.length - 1));
    
        let chosen = originals[0].items.results[randomChosen];

      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, "tv");
      setfeaturedData(chosenInfo); 
    };

    loadAll();
  }, []);


  useEffect(() => {
    //scroll 
  const scrollListener = () =>{
    if( window.scrollY > 10 ) {
      setBlackHeader(true)
    }else{
      setBlackHeader(false)
    }
  }

    window.addEventListener('scroll', scrollListener) 
 return() => {
  window.removeEventListener('scroll', scrollListener)
 }
 
 

  }, []);






  return (
    <div className="page">

   <Header black={blackHeader} />

      {featuredData && 
      <FeaturedMovie item={featuredData} />
      }

      <section className="lists">
        {movieList.map((item, key) => (
          
            <MovieRow key={key} title={item.title} items={item.items} />
          
        ))}
      </section>

          <footer>            
            Criado por Irvson Almeida<br/>
            Orientado por Bonieky Lacerda<br/>
            AP9I do site Themoviedb.org
          </footer>

          {movieList.length <= 0 && 
          <div className="loading">
            <img src="https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif" alt="carregando" />
          </div>
        }
    </div>
  );
};

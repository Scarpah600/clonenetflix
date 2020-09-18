import React , {useEffect, useState} from 'react';
import Tmdb from './Tmdb';
import './App.css';
import MovieRow from './components/MovieRow';
import FeactureMovie from './components/FeaturedMovie';


export default () => {

  const [movieList, setMovieList] = useState([]);
  const [featureData, setfeatureData] = useState(null);

  useEffect(() => {
      const loadAll = async() => {
          //Pegando a lista total
          let list = await Tmdb.getHomeList();
          setMovieList(list);

          let originals = list.filter(i => i.slug === 'originals');
          let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
          let chosen = originals[0].items.results[randomChosen];

          let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
          setfeatureData(chosenInfo);
          
      }
      loadAll();

  }, []);
  return(
    <div className="page">
      {featureData &&   <FeactureMovie item={featureData} />}
      <h1>Desenvolvimento do Gustavo Scarpin</h1>
        <section className="lists">
          {movieList.map((item,key) => (
               
              <MovieRow key={key} title={item.title} items={item.items}></MovieRow>
          ))}
        </section>
    </div>
  );
}
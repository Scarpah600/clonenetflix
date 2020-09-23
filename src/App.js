import React , {useEffect, useState} from 'react';
import Tmdb from './Tmdb';
import './App.css';
import MovieRow from './components/MovieRow';
import FeactureMovie from './components/FeaturedMovie';
import Header from './components/Header';

export default () => {

  const [movieList, setMovieList] = useState([]);
  const [featureData, setfeatureData] = useState(null);
  const [backHeader, setBlackHeader] = useState(false);
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

  useEffect(() =>{
      const scrollListener = () => {
        if(window.scrollY > 10){
          setBlackHeader(true);
        }else{
          setBlackHeader(false);
        }
      }
      window.addEventListener('scroll',scrollListener);
      return () =>{
      window.removeEventListener('scrol',scrollListener);
      }
  },[]);

  return(
    <div className="page">
      
      <Header black={backHeader}/>
      {featureData &&   <FeactureMovie item={featureData} />}
        <section className="lists">
          {movieList.map((item,key) => (
               
              <MovieRow key={key} title={item.title} items={item.items}></MovieRow>
          ))}
        </section>
        <footer>
               Feito pelo Gustavo Scarpin<br></br>
               Direitos de imagem para netflix<br></br>
               Dados pegos do site Themoviedb.org
        </footer>
    </div>
  );
}
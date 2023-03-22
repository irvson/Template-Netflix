const API_KEY = `b955d1fc89c8d582ec82be7a2cafdcbc`;
const Api_BASE = `https://api.themoviedb.org/3`;

/*
Lista 
Originais da netflix
- Recomendados ( trending)
- em alta ( top rated)
- ação
- comedia
- terror
- romance 
- documentarios

*/


const basicFetch = async (endpoint) =>{
    const req = await fetch(`${Api_BASE}${endpoint}`)
    const json = await req.json()
    return json;
}



export default {
  getHomeList: async () => {
    return [
      {
        /*Originals Netflix*/
        slug: "originals",
        title: "Originais do Netflix",
        items: await basicFetch(`/discover/tv?with_network=213&language=pt-BR&api_key=${API_KEY}`)
      },
      /*Trending - Recomendados*/
      {
        slug: "trending",
        title: "Recomendados para Você",
        items: await basicFetch(`/trending/all/week?language=pt-BR&api_key=${API_KEY}`)
      },

      /*Toprated - em alta*/
      {
        slug: "toprated",
        title: "Em alta",
        items: await basicFetch(`/movie/top_rated?language=pt-BR&api_key=${API_KEY}`),
      },

      /*======Gender - Gêneros======*/

      /*Action*/
      {
        slug: "action",
        title: "Ação",
        items: await basicFetch(`/discover/movie?with_genres=28&language=pt-BR&api_key=${API_KEY}`)
      },

      /*Comedy*/
      {
        slug: "comedy",
        title: "Comédia",
         items: await basicFetch(`/discover/movie?with_genres=35&language=pt-BR&api_key=${API_KEY}`)
      },

      /*Horror*/
      {
        slug: "horror",
        title: "Terror",
         items: await basicFetch(`/discover/movie?with_genres=27&language=pt-BR&api_key=${API_KEY}`)
      },
      /*Romance*/
      {
        slug: "romance",
        title: "Romance",
         items: await basicFetch(`/discover/movie?with_genres=10749&language=pt-BR&api_key=${API_KEY}`)
      },

      /*Documentary*/
      {
        slug: "documentary",
        title: "Documentarios",
        items: await basicFetch(`/discover/movie?with_genres=99&language=pt-BR&api_key=${API_KEY}`)
      },

    ]

  },

getMovieInfo: async (movieId , type) =>{
  let info = {};

  if(movieId){
    switch(type){
      case 'movie':
        info = await basicFetch(`/movie/${movieId}?language=pt-BR&api_key=${API_KEY}`)
        break;
        case 'tv':
          info = await basicFetch(`/tv/${movieId}?language=pt-BR&api_key=${API_KEY}`)
        break;
        default:
          info = null;
          break;
    }
  }

  return info;
}

};

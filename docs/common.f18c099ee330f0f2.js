"use strict";(self.webpackChunkAngular=self.webpackChunkAngular||[]).push([[592],{9525:(y,u,a)=>{a.d(u,{u:()=>m});var c=a(515),h=a(5e3),v=a(3480);let m=(()=>{class i{constructor(t){this.api=t}serachMovies(t){return void 0!==t&&""!==t?this.api.searchMovies(t):(0,c.c)()}getPopularSeries(){return this.api.getPopularSeries()}getGenres(){return this.api.getGenres()}getMoviesCountByGenre(t){return this.api.getGenreMovieCount(t)}getMoviesByGenre(t,l){return this.api.getMoviesByGenre(t,l)}getMovie(t){return this.api.getMovie(t)}}return i.\u0275fac=function(t){return new(t||i)(h.LFG(v.o))},i.\u0275prov=h.Yz7({token:i,factory:i.\u0275fac}),i})()},3480:(y,u,a)=>{a.d(u,{o:()=>k});var c=a(2843);class h{constructor(p={}){this.name="",this.total_results="",Object.assign(this,p)}}class v{constructor(p={}){Object.assign(this,p)}get_poster_path(){return null!==this.poster_path?"https://image.tmdb.org/t/p/w300/"+this.poster_path:null}}class m{constructor(p={}){Object.assign(this,p)}}var i=a(4004),g=a(2340),t=a(520);class l{constructor(p={}){Object.assign(this,p)}}var M=a(5e3);const d=g.N.MOVIES_API_KEY;let k=(()=>{class n{constructor(e){this.http=e,this.apikey=d,this.apikey=d}getPopular(){const e=new t.LE;return e.set("sort_by","popularity.desc"),e.set("api_key",this.apikey),this.http.get("https://api.themoviedb.org/3/discover/movie?callback=JSONP_CALLBACK",{params:e}).pipe((0,i.U)(s=>s))}getPopularSeries(){return(new t.LE).set("api_key",this.apikey),this.http.get("https://api.themoviedb.org/3/tv/popular?api_key="+this.apikey).pipe((0,i.U)(s=>s.results.map(o=>new m(o))))}searchMovies(e){return this.http.get("https://api.themoviedb.org/3/search/movie?api_key="+this.apikey+"&query="+e).pipe((0,i.U)(s=>{const r=new l;return r.total_pages=s.total_pages,r.total_results=s.total_results,r.page=s.page,r.movies=s.results.map(o=>new v(o)),r}))}getMovie(e){return(new URLSearchParams).set("api_key",this.apikey),this.http.get("https://api.themoviedb.org/3/movie/"+e+"?api_key="+this.apikey).pipe((0,i.U)(r=>{let o=new v(r);return this.getCasts(e).subscribe(_=>{o.casts=_}),o}))}getCasts(e){return this.http.get("https://api.themoviedb.org/3/movie/"+e+"/credits?api_key="+this.apikey).pipe((0,i.U)(s=>s.cast))}getGenres(){const e=new URLSearchParams;return e.set("language","en-US"),e.set("api_key",this.apikey),this.http.get("https://api.themoviedb.org/3/genre/movie/list?api_key="+this.apikey).pipe((0,i.U)(s=>s.genres.map(o=>new h(o))))}getGenreMovieCount(e){return(new URLSearchParams).set("api_key",this.apikey),this.http.get("https://api.themoviedb.org/3/genre/"+e+"/movies?api_key="+this.apikey).pipe((0,i.U)(r=>r.total_results))}getMoviesByGenre(e,s=1){return this.http.get("https://api.themoviedb.org/3/genre/"+e+"/movies?api_key="+this.apikey+"&page="+s.toString()).pipe((0,i.U)(r=>{const o=new l;return o.total_pages=r.total_pages,o.total_results=r.total_results,o.page=r.page,o.movies=r.results.map(_=>new v(_)),o}))}handleError(e){return console.error("ApiService::handleError",e),(0,c._)(e)}}return n.\u0275fac=function(e){return new(e||n)(M.LFG(t.eN))},n.\u0275prov=M.Yz7({token:n,factory:n.\u0275fac}),n})()},8446:(y,u,a)=>{a.d(u,{B:()=>h});const h=(0,a(1777).X$)("routerFadeInAnimation",[])}}]);
"use strict";(self.webpackChunkAngular=self.webpackChunkAngular||[]).push([[76],{9970:(m,u,i)=>{i.d(u,{r:()=>v});var c=i(983),h=i(3953),l=i(450);let v=(()=>{class a{constructor(s){this.api=s}serachMovies(s){return void 0!==s&&""!==s?this.api.searchMovies(s):(0,c.I)()}getPopularSeries(){return this.api.getPopularSeries()}getGenres(){return this.api.getGenres()}getMoviesCountByGenre(s){return this.api.getGenreMovieCount(s)}getMoviesByGenre(s,g){return this.api.getMoviesByGenre(s,g)}getMovie(s){return this.api.getMovie(s)}static#t=this.\u0275fac=function(g){return new(g||a)(h.KVO(l.L))};static#e=this.\u0275prov=h.jDH({token:a,factory:a.\u0275fac})}return a})()},450:(m,u,i)=>{i.d(u,{L:()=>M});var c=i(8810);class h{constructor(p={}){this.name="",this.total_results="",Object.assign(this,p)}}class l{constructor(p={}){Object.assign(this,p)}get_poster_path(){return null!==this.poster_path?"https://image.tmdb.org/t/p/w300/"+this.poster_path:null}get_poster_path_w500(){return null!==this.poster_path?"https://image.tmdb.org/t/p/w500/"+this.poster_path:null}get_poster_path_w780(){return null!==this.poster_path?"https://image.tmdb.org/t/p/w780/"+this.poster_path:null}}class v{constructor(p={}){Object.assign(this,p)}}var a=i(6354),k=i(5312),s=i(1626);class g{constructor(p={}){Object.assign(this,p)}}var y=i(3953);const d=k.c.MOVIES_API_KEY;let M=(()=>{class n{constructor(t){this.http=t,this.apikey=d,this.apikey=d}getPopular(){const t=new s.Nl;return t.set("sort_by","popularity.desc"),t.set("api_key",this.apikey),this.http.get("https://api.themoviedb.org/3/discover/movie?callback=JSONP_CALLBACK",{params:t}).pipe((0,a.T)(e=>e))}getPopularSeries(){return(new s.Nl).set("api_key",this.apikey),this.http.get("https://api.themoviedb.org/3/tv/popular?api_key="+this.apikey).pipe((0,a.T)(e=>e.results.map(o=>new v(o))))}searchMovies(t){return this.http.get("https://api.themoviedb.org/3/search/movie?api_key="+this.apikey+"&query="+t).pipe((0,a.T)(e=>{const r=new g;return r.total_pages=e.total_pages,r.total_results=e.total_results,r.page=e.page,r.movies=e.results.map(o=>new l(o)),r}))}getMovie(t){return(new URLSearchParams).set("api_key",this.apikey),this.http.get("https://api.themoviedb.org/3/movie/"+t+"?api_key="+this.apikey).pipe((0,a.T)(r=>{const o=new l(r);return this.getCasts(t).subscribe(_=>{o.casts=_}),o}))}getCasts(t){return this.http.get("https://api.themoviedb.org/3/movie/"+t+"/credits?api_key="+this.apikey).pipe((0,a.T)(e=>e.cast))}getGenres(){const t=new URLSearchParams;return t.set("language","en-US"),t.set("api_key",this.apikey),this.http.get("https://api.themoviedb.org/3/genre/movie/list?api_key="+this.apikey).pipe((0,a.T)(e=>e.genres.map(o=>new h(o))))}getGenreMovieCount(t){return(new URLSearchParams).set("api_key",this.apikey),this.http.get("https://api.themoviedb.org/3/genre/"+t+"/movies?api_key="+this.apikey).pipe((0,a.T)(r=>r.total_results))}getMoviesByGenre(t,e=1){return this.http.get(`https://api.themoviedb.org/3/genre/${t}/movies?api_key=${this.apikey}&page=${e.toString()}`).pipe((0,a.T)(r=>({total_pages:r.total_pages,total_results:r.total_results,page:r.page,movies:r.results.map(_=>new l(_))})))}handleError(t){return console.error("ApiService::handleError",t),(0,c.$)(t)}static#t=this.\u0275fac=function(e){return new(e||n)(y.KVO(s.Qq))};static#e=this.\u0275prov=y.jDH({token:n,factory:n.\u0275fac})}return n})()},6088:(m,u,i)=>{i.d(u,{I:()=>h});const h=(0,i(9969).hZ)("routerFadeInAnimation",[])}}]);
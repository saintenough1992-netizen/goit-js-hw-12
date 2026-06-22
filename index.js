import{a as S,S as v,i as a}from"./assets/vendor-DirGshhi.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))d(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&d(l)}).observe(document,{childList:!0,subtree:!0});function r(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function d(t){if(t.ep)return;t.ep=!0;const s=r(t);fetch(t.href,s)}})();const P="https://pixabay.com/api/",M="56128915-3f9b657c3018140957932d29d",q=15;async function u(o,e){return(await S.get(P,{params:{key:M,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,page:e,per_page:q}})).data}const f=document.querySelector(".gallery"),m=document.querySelector(".loader"),p=document.querySelector(".load-more"),O=new v(".gallery a",{captionsDelay:250,captionsData:"title"});function $(){f.innerHTML=""}function y(){m.classList.remove("is-hidden")}function h(){m.classList.add("is-hidden")}function g(){p.classList.remove("is-hidden")}function i(){p.classList.add("is-hidden")}function L(o){const e=o.map(r=>`
      <li class="gallery-item">
        <a class="gallery-link" href="${r.largeImageURL}">
          <img 
            class="gallery-image" 
            src="${r.webformatURL}" 
            alt="${r.tags}" 
            title="${r.tags}" 
          />
        </a>
        <div class="info">
          <p class="info-item"><b>Likes</b> ${r.likes}</p>
          <p class="info-item"><b>Views</b> ${r.views}</p>
          <p class="info-item"><b>Comments</b> ${r.comments}</p>
          <p class="info-item"><b>Downloads</b> ${r.downloads}</p>
        </div>
      </li>`).join("");f.insertAdjacentHTML("beforeend",e),O.refresh()}a.settings({timeout:1e4,resetOnHover:!0,icon:"material-icons",transitionIn:"flipInX",transitionOut:"flipOutX"});const b=document.querySelector(".form"),B=document.querySelector(".load-more");let c="",n=1;const w=15;b.addEventListener("submit",E);B.addEventListener("click",I);i();async function E(o){if(o.preventDefault(),c=o.currentTarget.elements["search-text"].value.trim(),n=1,$(),i(),c===""){a.error({message:"Search cannot be empty!",position:"topLeft"});return}y();try{const e=await u(c,n);if(e.hits.length===0){a.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topLeft"});return}L(e.hits);const r=Math.ceil(e.totalHits/w);n>=r?(i(),a.info({message:"We're sorry, but you've reached the end of search results.",position:"topLeft"})):g()}catch{a.error({message:"Something went wrong. Please try again later.",position:"topLeft"})}finally{h(),b.reset()}}async function I(){n+=1,i(),y();try{const o=await u(c,n);L(o.hits),H();const e=Math.ceil(o.totalHits/w);n>=e?(i(),a.info({message:"We're sorry, but you've reached the end of search results.",position:"topLeft"})):g()}catch{a.error({message:"Something went wrong. Please try again later.",position:"topLeft"})}finally{h()}}function H(){const o=document.querySelector(".gallery-item");if(!o)return;const e=o.getBoundingClientRect().height;window.scrollBy({top:e*2,behavior:"smooth"})}
//# sourceMappingURL=index.js.map

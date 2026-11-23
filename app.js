(function(){
  var b=document.querySelector('.burger'),m=document.getElementById('menu');
  b.addEventListener('click',function(){var on=m.classList.toggle('on');b.setAttribute('aria-expanded',on)});
  m.addEventListener('click',function(e){if(e.target.tagName==='A'){m.classList.remove('on');b.setAttribute('aria-expanded',false)}});
  // pasek na telefonie dopiero po przewinieciu pierwszego ekranu
  var mob=document.getElementById('mob'),cta=document.querySelector('.hero .btn');
  if('IntersectionObserver' in window){new IntersectionObserver(function(e){mob.classList.toggle('widac',!e[0].isIntersecting&&e[0].boundingClientRect.top<0)}).observe(cta)}
  // pas realizacji: strzalki + przeciaganie myszą
  var pas=document.getElementById('pas'),krok=function(){var k=pas.querySelector('.real');return k?k.getBoundingClientRect().width+24:300};
  document.querySelector('.w-lewo').onclick=function(){pas.scrollBy({left:-krok(),behavior:'smooth'})};
  document.querySelector('.w-prawo').onclick=function(){pas.scrollBy({left:krok(),behavior:'smooth'})};
  var x0=null,s0=0,ruch=false;
  pas.addEventListener('pointerdown',function(e){if(e.pointerType!=='mouse')return;x0=e.clientX;s0=pas.scrollLeft;ruch=false});
  window.addEventListener('pointermove',function(e){if(x0===null)return;var d=e.clientX-x0;if(Math.abs(d)>5){ruch=true;pas.classList.add('ciag')}if(ruch)pas.scrollLeft=s0-d});
  window.addEventListener('pointerup',function(){if(x0===null)return;x0=null;if(ruch){pas.classList.remove('ciag');var w=krok();pas.scrollTo({left:Math.round(pas.scrollLeft/w)*w,behavior:'smooth'})}});
  // podglad zdjec realizacji
  var lb=document.getElementById('lb'),li=lb.querySelector('img'),lo=lb.querySelector('.lb-opis'),cur=null,i=0;
  function pokaz(){li.src=cur.z[i];li.alt=cur.t;lo.textContent=cur.t+'  ('+(i+1)+' / '+cur.z.length+')'}
  pas.addEventListener('click',function(e){if(ruch){e.preventDefault();return}var k=e.target.closest('.real');if(!k)return;cur=REAL[k.dataset.r];i=0;pokaz();lb.classList.add('on');document.body.style.overflow='hidden'});
  function zamknij(){lb.classList.remove('on');document.body.style.overflow=''}
  function idz(d){i=(i+d+cur.z.length)%cur.z.length;pokaz()}
  lb.querySelector('.zamk').onclick=zamknij;lb.querySelector('.pop').onclick=function(){idz(-1)};lb.querySelector('.nast').onclick=function(){idz(1)};
  lb.addEventListener('click',function(e){if(e.target===lb||e.target.classList.contains('lb-ram'))zamknij()});
  document.addEventListener('keydown',function(e){if(!lb.classList.contains('on'))return;if(e.key==='Escape')zamknij();if(e.key==='ArrowLeft')idz(-1);if(e.key==='ArrowRight')idz(1)});
  var tx=null;lb.addEventListener('touchstart',function(e){tx=e.touches[0].clientX},{passive:true});
  lb.addEventListener('touchend',function(e){if(tx===null)return;var d=e.changedTouches[0].clientX-tx;if(Math.abs(d)>40)idz(d<0?1:-1);tx=null});
  // formularz pokazowy
  document.getElementById('form').addEventListener('submit',function(e){e.preventDefault();var u=document.getElementById('uwaga');u.textContent='To podgląd strony: formularz zacznie wysyłać wiadomości po wdrożeniu.';u.classList.add('ok')});
})();

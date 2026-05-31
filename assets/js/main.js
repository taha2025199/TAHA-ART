(function(){
  // Year
  var yr = document.getElementById('yr'); if(yr) yr.textContent = new Date().getFullYear();

  // Preloader counter
  var count = document.getElementById('loaderCount');
  var n = 0;
  var iv = setInterval(function(){
    n += Math.floor(Math.random()*8)+2;
    if(n >= 100){ n = 100; clearInterval(iv); }
    if(count) count.textContent = n + '%';
  }, 60);
  window.addEventListener('load', function(){
    setTimeout(function(){ document.getElementById('preloader').classList.add('done'); }, 1900);
  });

  // AOS
  if (window.AOS) AOS.init({ duration: 800, once: true, offset: 80, easing: 'ease-out-cubic' });

  // Custom cursor
  var dot = document.querySelector('.cursor-dot');
  var ring = document.querySelector('.cursor-ring');
  var mx=0,my=0,rx=0,ry=0;
  document.addEventListener('mousemove', function(e){
    mx = e.clientX; my = e.clientY;
    if(dot){ dot.style.left = mx+'px'; dot.style.top = my+'px'; }
  });
  function loop(){
    rx += (mx - rx) * 0.18;
    ry += (my - ry) * 0.18;
    if(ring){ ring.style.left = rx+'px'; ring.style.top = ry+'px'; }
    requestAnimationFrame(loop);
  }
  loop();
  var hoverables = 'a, button, .btn, .work-card, .service-card, input, textarea, .filter-tabs button';
  document.querySelectorAll(hoverables).forEach(function(el){
    el.addEventListener('mouseenter', function(){ document.body.classList.add('cursor-hover'); });
    el.addEventListener('mouseleave', function(){ document.body.classList.remove('cursor-hover'); });
  });

  // Scroll progress + nav scrolled
  var nav = document.querySelector('.site-nav');
  var bar = document.querySelector('.scroll-progress span');
  var back = document.querySelector('.back-to-top');
  window.addEventListener('scroll', function(){
    var y = window.scrollY;
    var h = document.documentElement.scrollHeight - window.innerHeight;
    if(bar) bar.style.width = (y/h*100) + '%';
    if(nav) nav.classList.toggle('scrolled', y > 30);
    if(back) back.classList.toggle('show', y > 400);

    // active link
    document.querySelectorAll('section[id]').forEach(function(s){
      var top = s.offsetTop - 120;
      if(y >= top && y < top + s.offsetHeight){
        document.querySelectorAll('.nav-links .nav-link').forEach(function(a){
          a.classList.toggle('active', a.getAttribute('href') === '#'+s.id);
        });
      }
    });
  });

  // Works filter
  document.querySelectorAll('.filter-tabs button').forEach(function(btn){
    btn.addEventListener('click', function(){
      document.querySelectorAll('.filter-tabs button').forEach(function(b){ b.classList.remove('active'); });
      btn.classList.add('active');
      var f = btn.getAttribute('data-filter');
      document.querySelectorAll('.work-item').forEach(function(it){
        it.classList.toggle('hide', !(f === 'all' || it.getAttribute('data-cat') === f));
      });
    });
  });

  // Smooth scroll (native via CSS, plus offset for fixed nav on hash click)
  document.querySelectorAll('a[href^="#"]').forEach(function(a){
    a.addEventListener('click', function(e){
      var id = a.getAttribute('href');
      if(id.length > 1 && document.querySelector(id)){
        e.preventDefault();
        var target = document.querySelector(id);
        window.scrollTo({ top: target.offsetTop - 70, behavior: 'smooth' });
      }
    });
  });



  // Project Modal populate
  var pm = document.getElementById('projectModal');
  if(pm){
    pm.addEventListener('show.bs.modal', function(ev){
      var t = ev.relatedTarget; if(!t) return;
      var set = function(id,val){ var el=document.getElementById(id); if(el) el.textContent = val || ''; };
      set('pmTitle', t.getAttribute('data-title'));
      set('pmCat', t.getAttribute('data-cat'));
      set('pmDesc', t.getAttribute('data-desc'));
      set('pmClient', t.getAttribute('data-client'));
      set('pmYear', t.getAttribute('data-year'));
      set('pmRole', t.getAttribute('data-role'));
      var img = document.getElementById('pmImg'); if(img) img.src = t.getAttribute('data-img') || '';
      var bh = document.getElementById('pmBehance'); if(bh) bh.href = t.getAttribute('data-behance') || '#';
    });
  }
})();

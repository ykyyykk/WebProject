function loadCSS(url) {
  var link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = url;
  document.head.appendChild(link);
}

function loadJs(url) {
  var script = document.createElement("script");
  script.src = url;
  document.head.appendChild(script);
}

// Bootstrap_v5.3 已從main.js匯入
// loadCSS(
//   "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
// );
// loadJs(
//   "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
// );
//<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
//</link><script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>

// Vue3 沒辦法在這邊使用
// loadJs("https://unpkg.com/vue@3");
// <script src="https://unpkg.com/vue@3"></script>

// FontAwesome_v6.0.0
// 因為直接用 i 會比較方便 所以不要取消
loadCSS(
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
);

// loadCSS("https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css");
// Swiper SwiperJs 沒辦法在這邊使用
// loadJs("https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js");

// <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css"/>
// <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>

// animejs
// loadJs("https://cdn.jsdelivr.net/npm/animejs@3.2.2/lib/anime.min.js");

// youtube iframe api
// loadJs("https://www.youtube.com/iframe_api");
//<script src="https://www.youtube.com/iframe_api"></script>;

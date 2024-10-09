<template>
  <main class="d-none" style="height: calc(100vh - 50px)">
    <div class="container-fluid h-100 position-relative">
      <!-- 作品集1遊戲背景圖片 -->
      <img
        class="w-100 h-100 object-fit-fill position-absolute start-0 z-n1"
        src="/static/header.jpg"
      />
      <!-- 漸層Mask -->
      <div class="gradient position-absolute w-100 h-100 z-0"></div>
      <!-- 作品集1 -->
      <div class="row h-100">
        <!-- 作品集1 左邊 -->
        <div id="left_side" class="col-xxl col-xl col-lg col-md">
          <!-- 連結Group -->
          <div
            class="d-flex mt-3 flex-xxl-row flex-wrap justify-content-evenly position-relative gap-sm-3 gap-0"
          >
            <a
              class="text-decoration-none m-0 d-flex flex-xxl-column flex-xl-column flex-md-column flex-sm-column flex-column align-items-center justify-content-xl-between justify-content-xxl-center col-xl-12 flex-nowrap-4 col-xxl"
              href="https://store.steampowered.com/app/1483600/_/"
            >
              <p class="text-white fs-3">Steam</p>
              <img
                src="/static/Steam逢魔之時.png"
                style="width: 100px; height: 100px"
              />
            </a>
            <a
              class="text-decoration-none btn m-0 d-flex flex-xxl-column flex-xl-column flex-md-column flex-sm-column flex-column align-items-center justify-content-xl-between justify-content-xxl-center col-xl-12 flex-nowrap-4 col-xxl"
              href="https://play.google.com/store/apps/details?id=com.LittleFox.LittleFox&hl=zh_TW"
            >
              <p class="text-white fs-3">GooglePlay</p>
              <img
                src="/static/GooglePlay逢魔之時.png"
                style="width: 100px; height: 100px"
              />
            </a>
            <a
              class="text-decoration-none btn m-0 d-flex flex-xxl-column flex-xl-column flex-md-column flex-sm-column flex-column align-items-center justify-content-xl-between justify-content-xxl-center col-xl-12 flex-nowrap-4 col-xxl"
              href="https://simmer.io/@louise_bws/littlefox"
            >
              <p class="text-white fs-3">Simmer.io</p>
              <img
                src="/static/SimmerQRCode.png"
                style="width: 100px; height: 100px"
              />
            </a>
          </div>
        </div>
        <!-- 作品集1 右邊 -->
        <div
          id="right_side"
          class="col-xxl col-xl-9 col-lg-9 col-md-9 d-flex justify-content-center"
        >
          <div class="right-side-content w-100">
            <!-- 為了水平置中按鈕所以將img包起來 -->
            <div class="position-relative">
              <!-- style是為了16:9顯示 (9/16 = 0.5625 = 56.25%) -->
              <div
                class="position-relative w-100 mt-3"
                style="padding-top: 56.2%"
              >
                <!-- 原始大小600 * 315 -->
                <img
                  id="big_img"
                  class="position-absolute w-100 h-100 top-0 start-0 rounded-3"
                  src="/static/1.jpg"
                  alt="作品圖片"
                />
                <!-- 選擇的作品圖片 -->
                <!--  src的embed後面是youtub_id 要再加入"?enablejsapi=1"允許API控制影片，否則無效 -->
                <!-- 還需要加入onload -->
                <!-- https://hackmd.io/@Kyosukewu/HkkMh8Urt -->
                <iframe
                  id="trailer"
                  class="position-absolute w-100 h-100 top-0 start-0 rounded-3"
                  src="https://www.youtube.com/embed/pGC87JdJqho?enablejsapi=1"
                  title="Littlefox 宣傳影片-逢魔之時"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerpolicy="strict-origin-when-cross-origin"
                  allowfullscreen
                ></iframe>
              </div>

              <!-- 上一頁按鈕 -->
              <button
                id="previousPageBtn"
                class="border border-0 bg-transparent position-absolute text-white top-50 start-0"
              >
                <i class="fa-solid fa-chevron-left fs-1"></i>
              </button>
              <!-- 下一頁按鈕 -->
              <button
                id="nextPageBtn"
                class="border border-0 bg-transparent position-absolute text-white top-50 end-0"
              >
                <i class="fa-solid fa-chevron-right fs-1"></i>
              </button>
            </div>

            <!-- 進度條 -->
            <div
              id="fill"
              class="position-relative mt-0 bg-primary rounded"
              style="width: 0%; height: 3px"
            ></div>

            <!-- 介紹文 -->
            <div class="text-white fs-5 d-block position-relative mt-3">
              <p class="text-start">世間萬物，皆為神靈</p>
              <p class="text-start ms-5">日本神道，八百萬神</p>
              <p class="text-start">以日本八百萬神為故事原型的ＡＲＰＧ。</p>
              <p class="text-start">千萬技能，四散各地</p>
              <p class="text-start ms-5">囊括依蒨，盡收手心</p>
              <p class="text-start">探索地圖拿取秘笈，拜師學藝習得技能，</p>
              <p class="text-start">
                擊敗Boss掠取能力，蒐集所有技能成為掌握千技之人。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>

  <div class="d-block container">
    <div class="shadow-sm d-flex justify-content-evenly p-3">
      <div
        class="border border-black"
        style="width: 150px; height: 150px"
      ></div>
      <div>
        <h2>姓名：汪世傑</h2>
        <h2>學業：桃園農工 造園科 畢業</h2>
        <h2>生日：1998年6月27日</h2>
      </div>
    </div>

    <div class="d-flex justify-content-evenly shadow-sm mt-3 p-3">
      <!-- 在這裡可以放置捲動區域的內容 -->
      <div class="d-block">
        <div class="company_name">公司名稱：宏國室內裝修</div>
        <div class="job_title">職位：學徒</div>
        <div class="senioirty">年資：2017/8~2020/6 2年11個月</div>
      </div>
      <div class="d-block">
        <div class="company_name">公司名稱：曉兔科技</div>
        <div class="job_title">職位：前端端遊戲程式設計</div>
        <div class="senioirty">年資：2021/1~2021/7 7個月</div>
      </div>
      <div class="d-block">
        <div class="company_name">公司名稱：奧奇盟科技</div>
        <div class="job_title">職位：全端遊戲程式設計</div>
        <div class="senioirty">年資：2021/8~2021/9 2個月</div>
      </div>
      <div class="d-block">
        <div class="company_name">公司名稱：村宏室內裝修</div>
        <div class="job_title">職位：師傅</div>
        <div class="senioirty">年資：2022/9~2023/10 1年2個月</div>
      </div>
    </div>

    <div class="d-block justify-content-center shadow-sm mt-3 p-3 mb-5">
      <div class="w-25 border border-black mx-auto">
        <div class="d-flex justify-content-center mb-3 border border-black">
          <i class="fa-solid fa-phone mx-2"></i>
          <div>0950074430</div>
        </div>
        <div class="d-flex justify-content-center">
          <i class="fa-solid fa-envelope mx-2"></i>
          <div>louise87276@gmail.com</div>
        </div>

        <div class="d-flex justify-content-center mb-3">
          <div>你的姓名:</div>
          <input type="text" />
        </div>
        <div class="d-flex justify-content-center mb-3">
          <div>你的電子郵件:</div>
          <input type="email" />
        </div>
        <div class="d-block justify-content-center mb-3">
          <div>詢問內容:</div>
          <textarea cols="30" rows="10"></textarea>
        </div>
        <button
          class="d-flex justify-content-center w-100 btn btn-outline-primary"
        >
          送出
        </button>
      </div>
    </div>
  </div>
</template>

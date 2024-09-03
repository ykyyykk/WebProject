<template>
  <HeaderComponent />
  <SmallHeaderComponent pageTitle="繼續購物" />

  <div class="col-12 mt-5">
    <div class="swiper mySwiper mb-3" style="height: 25rem">
      <div class="swiper-wrapper">
        <div
          class="swiper-slide d-flex justify-content-center align-items-center"
        >
          <img
            src="../../assets/img/product1.jpg"
            style="width: 100%; height: auto"
          />
        </div>
        <div
          class="swiper-slide d-flex justify-content-center align-items-center"
        >
          <img
            src="../../assets/img/product2.jpg"
            style="width: 100%; height: auto"
          />
        </div>
        <div
          class="swiper-slide d-flex justify-content-center align-items-center"
        >
          <img
            src="../../assets/img/product1.jpg"
            style="width: 100%; height: auto"
          />
        </div>
        <div
          class="swiper-slide d-flex justify-content-center align-items-center"
        >
          <img
            src="../../assets/img/product2.jpg"
            style="width: 100%; height: auto"
          />
        </div>
        <div
          class="swiper-slide d-flex justify-content-center align-items-center"
        >
          <img
            src="../../assets/img/product1.jpg"
            style="width: 100%; height: auto"
          />
        </div>
        <div
          class="swiper-slide d-flex justify-content-center align-items-center"
        >
          <img
            src="../../assets/img/product2.jpg"
            style="width: 100%; height: auto"
          />
        </div>
      </div>
      <div class="swiper-button-next"></div>
      <div class="swiper-button-prev"></div>
      <div class="swiper-pagination"></div>
    </div>

    <div class="p-2">
      <p class="fs-5 fw-bolder">
        14吋 兒童鋼製自行車 (塗鴉款/附輔助輪) DISCOVER 500
      </p>
      <p class="fs-5 fw-bolder">$2,999</p>

      <div class="mb-3">
        <div>
          <p>數量</p>
          <NumberInputComponent />
        </div>

        <!-- TODOError 目前還沒有即時更新 -->
        <div>剩餘庫存: {{ lastAmount }}</div>
      </div>
      <div class="w-100 d-flex justify-content-between mb-3">
        <button class="btn btn-danger col-5">加入購物車</button>
        <button class="btn btn-outline-danger col-5">立即購買</button>
      </div>

      <div class="fs-5 fw-bolder">商品描述</div>
      <div class="">
        一款簡單又堅固、附輔助輪的 14" 自行車。一款簡單又堅固、附輔助輪的 14"
        自行車。適合身高 90-110 cm 兒童的 14"
        單速自行車，配有輔助輪及簡單的鏈條保護罩。附有輔助輪，擋泥板、腳撐需另購。
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis
        voluptates eum hic dolorum autem quibusdam iste ab, asperiores
        consequatur id totam consequuntur exercitationem esse saepe? Fuga
        necessitatibus aut eaque aliquid. Magnam eligendi voluptatum est maiores
        incidunt excepturi quaerat deleniti, nemo rerum, nisi, quam eveniet
        dolore. Fugit, sed laborum. Dignissimos voluptatibus iure soluta minima
        pariatur asperiores obcaecati, aspernatur atque mollitia cupiditate.
        Laboriosam, quo! Cupiditate modi ipsa laudantium deserunt sequi fugit
        eaque non explicabo quae exercitationem dolor ducimus optio, doloremque
        tempore fuga commodi. Dolor iusto nulla nostrum provident, explicabo qui
        eaque quae! Dignissimos magni consectetur quia culpa consequatur ipsum
        modi cupiditate. Minima tenetur quaerat deserunt, vel similique
        cupiditate est esse maxime iure, et maiores repellat, aliquam vero velit
        ipsam non quas ad. Assumenda quos odit illo eveniet inventore magni
        consequatur nulla ea ut accusamus provident alias dolore eligendi quam
        nam, temporibus earum optio nesciunt enim! Reprehenderit sequi id
        tempora natus aspernatur. Nemo! Eum, quibusdam nihil dignissimos cum
        praesentium ad sint quam. Velit corrupti praesentium, delectus laborum
        modi repudiandae reprehenderit aut eius sequi! Quam dignissimos
        blanditiis natus laborum consequatur! Illum dignissimos delectus alias!
        Nobis ut nulla cupiditate amet voluptate maxime aliquam sint, ratione
        obcaecati saepe, impedit reiciendis voluptates voluptatum numquam,
        itaque error. Expedita placeat praesentium itaque ratione atque nam quis
        rerum eligendi mollitia. Aspernatur excepturi fugiat, accusamus eius ab,
        vero blanditiis molestiae ut quis facilis corrupti saepe quia harum
        inventore eveniet dolorum reprehenderit, ratione eligendi cumque. Dicta
        temporibus quidem ipsum? Molestiae, ab amet. Aliquam dolore consectetur
        esse quasi veniam corporis rerum error nisi. Obcaecati, laboriosam
        repellendus debitis necessitatibus nemo iste corporis alias asperiores
        id voluptates eaque consequuntur, delectus facilis at, temporibus vel a.
        Molestiae harum dolor modi natus ab maxime, commodi porro provident,
        eius eaque asperiores odit facilis consequatur rem quae veniam. Quos
        atque rerum quidem eum. Est quae praesentium blanditiis vero! Magni.
      </div>
    </div>
  </div>
</template>

<script>
import HeaderComponent from "../../components/HeaderComponent.vue";
import SmallHeaderComponent from "../../components/SmallHeaderComponent.vue";
import SwiperComponent from "../../components/SwiperComponent.vue";
import NumberInputComponent from "../../components/NumberInputComponent.vue";

export default {
  components: {
    HeaderComponent,
    SmallHeaderComponent,
    SwiperComponent,
    NumberInputComponent,
  },
  methods: {
    Back() {
      this.$router.go(-1);
    },
  },
};
</script>

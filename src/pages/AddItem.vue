<template>
  <HeaderComponent />
  <SmallHeaderComponent pageTitle="新增商品" />

  <form @submit.prevent="AddNewItem()" class="p-3 w-100 h-100 mt-5">
    <div class="mb-3">
      <label class="form-label fw-bolder">商品圖片</label>
      <FileInputComponent v-model:images="productImages" />
    </div>

    <div class="mb-3">
      <label class="form-label fw-bolder">商品名稱</label>
      <input
        class="form-control border border-danger border-2"
        v-model="name"
        aria-describedby="product_name"
      />
    </div>

    <div class="mb-3">
      <label class="form-label fw-bolder">商品描述</label>
      <textarea
        v-model="detail"
        class="form-control border border-danger border-2"
      />
    </div>

    <div class="dropdown mb-3">
      <span class="fw-bolder">商品分類: </span>
      <button
        class="btn btn-secondary dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <span>{{ selectCategory }}</span>
      </button>
      <ul class="dropdown-menu">
        <li v-for="(categorya, index) in categories" :key="index">
          <a class="dropdown-item" @click="SetCategory(categorya)">
            {{ categorya }}
          </a>
        </li>
      </ul>
    </div>

    <div class="mb-3">
      <label class="form-label fw-bolder">價格</label>
      <input
        type="number"
        v-model="price"
        class="form-control border border-danger border-2"
      />
    </div>

    <div class="mb-3">
      <label class="form-label fw-bolder">商品數量</label>
      <input
        type="number"
        v-model="stock"
        class="form-control border border-danger border-2"
      />
    </div>

    <div class="dropdown mb-3">
      <span class="fw-bolder">商品狀態: </span>
      <button
        class="btn btn-secondary dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <span>{{ status }}</span>
      </button>
      <ul class="dropdown-menu">
        <li><a class="dropdown-item" @click="SetStatus('全新')">全新</a></li>
        <li><a class="dropdown-item" @click="SetStatus('二手')">二手</a></li>
      </ul>
    </div>

    <!-- 不能把 @submit.prevent="AddNewItem()" 放這邊 會清空 而且不呼叫 -->
    <button type="submit" class="btn btn-primary" :disabled="!canUpload">
      新增物品
    </button>
  </form>
</template>

<script>
import axios from "axios";
import HeaderComponent from "../components/HeaderComponent.vue";
import SmallHeaderComponent from "../components/SmallHeaderComponent.vue";
import FileInputComponent from "../components/FileInputComponent.vue";
import { API_BASE_URL } from "../config/api";
import { mapState } from "vuex/dist/vuex.cjs.js";

export default {
  data() {
    return {
      productImages: [],
      name: "",
      detail: "",
      selectCategory: "處理器",
      price: 0,
      stock: 0,
      status: "全新",
    };
  },
  components: { HeaderComponent, SmallHeaderComponent, FileInputComponent },
  computed: {
    ...mapState(["categories"]),
    canUpload() {
      return this.productImages.length > 0;
    },
  },
  methods: {
    SetCategory(category) {
      this.selectCategory = category;
    },
    SetStatus(status) {
      this.status = status;
    },
    async UploadImage() {
      try {
        // console.log("UploadImage");
        // console.log(`productImages: ${this.productImages.length}`);
        const formData = new FormData();
        this.productImages.forEach((image) => {
          // console.log(image.name);
          // console.log(image.url);
          // console.log(image.file);
          formData.append("images", image.file);
        });

        // Send the FormData object in the POST request
        const response = await axios.post(
          `${API_BASE_URL}/api/uploadimage`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        return response;
      } catch (error) {
        alert(`上傳圖片失敗: ${error}`);
        return false;
      }
    },
    async AddNewItem() {
      console.log("AddNewItem");
      const uploadResponse = await this.UploadImage();

      // console.log(`uploadResponse: ${JSON.stringify(uploadResponse)}`);
      if (!uploadResponse) {
        return;
      }

      try {
        // console.log(uploadResponse.data.files);
        // console.log(uploadResponse.data.files[0]);
        // console.log(uploadResponse.data.files[0].filename);
        // console.log(uploadResponse.data.files[0].filename.split("-"));
        // console.log(uploadResponse.data.files[0].filename.split("-")[0]);
        const itemID = uploadResponse.data.files[0].filename.split("-")[0];
        const uploadedFiles = uploadResponse.data.files;
        const imageUrls = uploadedFiles.map((file) => file.filename);
        await axios.post(`${API_BASE_URL}/api/insertmultipleimages`, {
          itemID: itemID,
          imageUrls: imageUrls,
        });

        this.detail =
          this.detail === "" ? `高效能${this.selectCategory}` : this.detail;
        // console.log(itemID);
        // console.log(this.name);
        // console.log(this.detail);
        // console.log(this.selectCategory);
        // console.log(this.price);
        // console.log(this.stock);
        // console.log(this.status);
        // console.log(uploadedFiles[0].filename);
        await axios.post(`${API_BASE_URL}/api/addnewitem`, {
          id: itemID,
          name: this.name,
          detail: this.detail,
          category: this.selectCategory,
          price: this.price,
          stock: this.stock,
          status: this.status,
          thumbnail: uploadedFiles[0].filename,
        });
        alert("新增物品成功");
      } catch (error) {
        alert(`新增物品失敗: ${error}`);
        return;
      }
    },
  },
};
</script>

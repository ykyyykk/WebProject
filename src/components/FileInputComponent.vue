<template>
  <!-- 拖放區域 -->
  <div
    class="d-block align-items-center border border-danger border-2 rounded p-2 mb-3"
    :class="{ 'bg-light': isDragging }"
    @dragover.prevent="onDragOver"
    @dragleave.prevent="onDragLeave"
    @drop.prevent="onDrop"
  >
    <span
      v-if="!isDragging"
      class="d-flex align-items-center justify-content-center mb-2"
    >
      拖曳圖片至此或
      <span class="btn btn-link p-0 text-decoration-none" @click="selectFiles">
        選擇檔案
      </span>
    </span>

    <span v-else class="d-flex align-items-center justify-content-center mb-2"
      >在此處放下</span
    >

    <!-- 不能註解掉 為了讓選擇檔案可以點擊 -->
    <input
      name="file"
      type="file"
      class="d-none"
      ref="fileInput"
      multiple
      @change="onFileSelect"
    />

    <!-- 預覽圖片區域 -->
    <div class="row g-2" style="height: 250px; overflow-y: auto">
      <div class="col-3" v-for="(image, index) in images" :key="index">
        <div class="position-relative shadow">
          <img
            :src="image.url"
            class="img-fluid rounded"
            alt="Uploaded image"
          />
          <button
            type="button"
            class="btn btn-danger btn-sm position-absolute top-0 end-0"
            @click.stop="deleteImage(index)"
          >
            &times;
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: [],
      isDragging: false,
    };
  },
  methods: {
    // 觸發文件選擇
    selectFiles() {
      this.$refs.fileInput.click();
    },
    // 處理文件選擇
    onFileSelect(event) {
      const files = event.target.files;
      this.addImagesToList(files);
    },
    // 刪除圖片
    deleteImage(index) {
      this.images.splice(index, 1);
      this.$emit("update:images", this.images);
    },
    // 處理拖動進入
    onDragOver(event) {
      event.preventDefault();
      this.isDragging = true;
    },
    // 處理拖動離開
    onDragLeave(event) {
      event.preventDefault();
      this.isDragging = false;
    },
    // 處理檔案拖放
    onDrop(event) {
      event.preventDefault();
      this.isDragging = false;
      const files = event.dataTransfer.files;
      this.addImagesToList(files);
    },
    // 將圖片添加到列表
    addImagesToList(files) {
      for (let i = 0; i < files.length; i++) {
        if (files[i].type.split("/")[0] !== "image") continue;
        if (!this.images.some((e) => e.name === files[i].name)) {
          this.images.push({
            name: files[i].name,
            url: URL.createObjectURL(files[i]),
            file: files[i],
          });
        }
      }
      this.$emit("update:images", this.images);
    },
  },
};
</script>

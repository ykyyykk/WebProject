<template>
  <h1>Test</h1>
  <div class="card">
    <div class="top">
      <p>Drag & drop images</p>
    </div>
    <div class="drag-area">
      <span>
        Drag & drop image here or
        <span class="select" role="button"> Choose </span>
      </span>
      <div class="select">Drop images here</div>
    </div>
    <div class="container">
      <div class="image">
        <span>&times;</span>
      </div>
    </div>
    <button type="button">Upload</button>
  </div>
</template>

<script></script>

<style scoped>
.card {
  width: 100%;
  padding: 10px;
  box-shadow: 0 0 5px white;
  border-radius: 5px;
  overflow: hidden;
}
.card .top {
  text-align: center;
}
.card p {
  font-weight: bold;
  color: red;
}
.card button {
  outline: 0;
  border: 0;
  color: white;
  border-radius: 4px;
  font-weight: 400;
  padding: 8px 13px;
  width: 100%;
  background: red;
}

.card .drag-area {
  height: 150px;
  border-radius: 5px;
  border: 2px dashed red;
  background: white;
  color: red;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: center;
  -webkit-user-select: none;
  margin-top: 10px;
}

.card .drag-area {
  font-size: 18px;
}

.card .select {
  color: blue;
  margin-left: 5px;
  cursor: pointer;
  transition: 0.4s;
}

.card .select:hover {
  opacity: 0.6;
}

.card .container {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
  max-height: 200px;
  position: relative;
  margin-bottom: 8px;
}

.card .container .image img {
  width: 100%;
  height: 100%;
  border-radius: 5px;
}
</style>

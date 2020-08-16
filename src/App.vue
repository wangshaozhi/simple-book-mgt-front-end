<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style >
#app,html {
  font-family: "Avenir", Helvetica, Arical, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
}
/* 取消内外边距，盒子为标准盒子模型 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>

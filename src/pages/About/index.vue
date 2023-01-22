<template>
  <div class="about-container">
    <h2>O que é a Pesquise</h2>
    <div class="wrapper">
      <p>
        Interdum et malesuada fames ac ante ipsum primis in faucibus. Praesent
        aliquam, est eu dignissim sodales, odio neque malesuada eros, a blandit
        lectus arcu sed velit. Maecenas ultrices dolor vel nulla euismod
        efficitur. Praesent ex tortor, suscipit auctor commodo sit amet, laoreet
        ut magna. Donec dapibus at dolor at hendrerit. Praesent felis mi,
        accumsan non varius id, venenatis vel lorem. Nullam porttitor augue ex,
        eget sodales sapien cursus ac. Donec non laoreet nisi. Nullam neque
        risus, aliquam eget varius quis, finibus nec sapien. Duis vulputate ex
        aliquet nunc rhoncus consectetur ac vitae nisl. Nunc vitae massa augue.
        In hac habitasse platea dictumst. Nullam ullamcorper molestie commodo.
      </p>
      <p>
        Interdum et malesuada fames ac ante ipsum primis in faucibus. Praesent
        aliquam, est eu dignissim sodales, odio neque malesuada eros, a blandit
        lectus arcu sed velit. Maecenas ultrices dolor vel nulla euismod
        efficitur. Praesent ex tortor, suscipit auctor commodo sit amet, laoreet
        ut magna. Donec dapibus at dolor at hendrerit. Praesent felis mi,
        accumsan non varius id, venenatis vel lorem. Nullam porttitor augue ex,
        eget sodales sapien cursus ac. Donec non laoreet nisi. Nullam neque
        risus, aliquam eget varius quis, finibus nec sapien. Duis vulputate ex
        aliquet nunc rhoncus consectetur ac vitae nisl. Nunc vitae massa augue.
        In hac habitasse platea dictumst. Nullam ullamcorper molestie commodo.
      </p>
    </div>
  </div>
</template>
<script lang="ts" setup></script>
<style scoped>
.about-container {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  justify-content: center;
}
.wrapper {
  width: 100%;
  background: white;
  min-width: 18.75rem;
  padding: 2.5rem;
  border-radius: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
}
h2 {
  font-weight: 700;
  font-size: 2rem;
}
.wrapper p {
  font-size: 1rem;
}
</style>

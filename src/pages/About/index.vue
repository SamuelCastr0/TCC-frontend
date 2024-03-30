<template>
  <div class="about-container">
    <h2>O que é a Pesquise</h2>
    <div class="wrapper">
      <p>
        Comprometidos com a evolução da tecnologia educacional, desenvolvemos um
        repositório de objetos de aprendizagem baseado no modelo IEEE/LOM
        (Learning Object Metadata). Este repositório é uma ferramenta para
        organizar e recuperar conteúdos educacionais, funcionando também como
        uma plataforma educacional interativa que facilita experiências de
        aprendizagem ricas e personalizadas.
      </p>
      <p>
        Com a aplicação de linguagens e frameworks como Python e Django para o
        backend e TypeScript e Vue.js para o frontend, criamos um site de busca
        avançada que se integra à nossa plataforma educacional. A interface do
        frontend permite que os usuários interajam facilmente com o sistema,
        enquanto o backend assegura a eficácia e precisão no processamento dos
        dados.
      </p>
      <p>
        Nossa plataforma simplifica a busca e organização de objetos de
        aprendizagem e oferece funcionalidades CRUD (Create, Read, Update,
        Delete) para um gerenciamento eficiente desses objetos, atendendo às
        necessidades variadas de usuários, desde educadores até estudantes.
        Adicionalmente, o sistema permite a criação de cursos personalizados a
        partir dos objetos de aprendizagem, incluindo recursos para monitorar o
        progresso nos cursos, apoiando uma experiência educacional adaptativa e
        participativa.
      </p>
      <p>
        O propósito da nossa plataforma é ser uma ferramenta útil no campo da
        tecnologia educacional, melhorando a acessibilidade e a organização dos
        recursos educacionais. Nosso foco é impactar positivamente a comunidade
        educacional, fornecendo uma solução prática para o gerenciamento de
        conteúdo educacional, incentivando todos a descobrirem as
        funcionalidades que nosso repositório proporciona no aprimoramento do
        processo de ensino-aprendizagem.
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
  min-width: 18.75rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}
h2 {
  font-weight: 700;
  font-size: 2rem;
}
.wrapper p {
  font-size: 1rem;
}
</style>

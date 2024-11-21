import { defineConfig } from "vite";

// <https://vitejs.dev/config/>
export default defineConfig({
  base: "/threejs-study/",
  build: {
    rollupOptions: {
      input: {
        main: "index.html",
        multipleScenes: "multiple-scenes/multiple-scenes.html",
        project1: "toy-project-1/toy-project-1.html",
        project2: "toy-project-2/toy-project-2.html",
      },
    },
  },
});

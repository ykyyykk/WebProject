<template>
  <SmallHeaderComponent pageTitle="筆記" />
  <!-- <div v-for="note in notes" :key="note">
  </div> -->
  <router-link
    :to="{
      name: 'Note1',
    }"
  >
    Note1
  </router-link>
</template>

<script>
import CopyCodeComponent from "../components/CopyCodeComponent.vue";
import SmallHeaderComponent from "../components/SmallHeaderComponent.vue";

export default {
  components: { SmallHeaderComponent, CopyCodeComponent },
  data() {
    return {
      notes: [],
    };
  },
  mounted() {
    this.GetAllNotes();
    console.log(this.notes);
  },
  methods: {
    // GetAllNotes() {
    //   const modules = import.meta.glob("../pages/Notes/*.vue");
    //   console.log(modules);
    //   Object.entries(modules).map(([path, module]) => {
    //     if (path === undefined) {
    //       return;
    //     }
    //     const nameVue = path.split("/")[2];
    //     const name = nameVue.split(".")[0];
    //     this.$router.addRoute({
    //       path: `/notes/${name}`,
    //       name: "Note",
    //       components: `${name}`,
    //     });
    //     this.notes.push(name);
    //     return { path, name, module };
    //   });
    // },
  },
};
</script>

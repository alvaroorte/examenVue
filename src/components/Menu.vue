<template>
  <nav>
    <div class="nav-wrapper">
      <a href="/" class="brand-logo right">Inventario</a>
      <ul id="nav-mobile" class="left ">
        <li>
          <a class="waves-effect waves-light ">
            <i class="material-icons" @click="menu()">menu</i>
          </a>
        </li>
      </ul>
    </div>
  </nav>

  <ul class="sidenav">
    <li><router-link to="/area">Areas</router-link></li>
    <li><router-link to="/activo">Activos</router-link></li>
  </ul>
  
</template>

<script>
import M from 'materialize-css'
export default {
  name: 'menu',
  data() {
    return {
      sidenav: null
    }
  },
  props: [],
  methods:{
    menu(){
      this.sidenav.open();
    }
  },
  mounted() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);
    this.sidenav = instances[0];
  }
}

  

</script>


<style></style>

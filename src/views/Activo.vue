<template>
    <div class="container">
        <h5>Activos</h5>
    
        <div class="card">
            <div class="card-content">
                <form @submit.prevent="nuevo()" >
                    <h5>Nuevo Activo</h5>
                    <p>Tipo: <input type="text" v-model="data.tipo" required/></p>
                    <p>Marca: <input type="text" v-model="data.marca" required/></p>
                    <p>Modelo: <input type="text" v-model="data.modelo" required/></p>
                    <p>Estado: 
                        <div class="input-field ">
                            <select v-model="data.estado">
                                <option value="nuevo" >Nuevo</option>
                                <option value="usado" >Usado</option>
                                <option value="desuso" >Desuso</option>
                            </select>
                            <label>Elija un estado</label>
                        </div>
                    </p>
                    <p v-if="areas.length > 0">Area:
                        <div class="input-field ">
                            <select v-model="data.areaId">
                                <option :value="area.id" v-for="area in areas">{{area.nombre}}</option>
                            </select>
                            <label>Elija un area</label>
                        </div>
                    </p>
                    <button type="submit" class="waves-effect waves-light btn-small">Guardar</button>
                </form>
            </div>
        </div>
    
        <div class="card">
                <div class="card-content">
                    <form @submit.prevent="getList()">
                        <h5>Buscar Activo</h5>
                        <p>Nombre Activo: <input type="search" v-model="search" @search="getList()" /></p>
                        <button type="submit" class="waves-effect waves-light btn-small">buscar</button>
                    </form>
                </div>
            </div>
    
        <div class="card">
                <div class="card-content">
                    <h5>filtro por Estado</h5>
                    <div class="input-field ">
                            <select @change="filter('estado',$event.target.value)">
                                <option value="" >Todos</option>
                                <option value="nuevo" >Nuevo</option>
                                <option value="usado" >Usado</option>
                                <option value="desuso" >Desuso</option>
                            </select>
                            <label>Elija un estado</label>
                    </div>
        
                </div>
            </div>
    
        <div class="card">
            <div class="card-content">
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Tipo</th>
                            <th>Marca</th>
                            <th>Modelo</th>
                            <th>Estado</th>
                            <th>Area</th>
                            <th></th>
                        </tr>
                    </thead>
    
                    <tbody>
                        <tr v-for="activo in activos">
                            <td>{{activo.id}}</td>
                            <td>{{activo.tipo}}</td>
                            <td>{{activo.marca}}</td>
                            <td>{{activo.modelo}}</td>
                            <td>{{activo.estado}}</td>
                            <td>{{activo.area.nombre}}</td>
                            <td>
                                <a class="app-btn btn-small btn-floating btn-large waves-effect waves-light blue "><i class="material-icons" @click="update(activo.id)" >edit</i></a>
                                <a class="app-btn btn-small btn-floating btn-large waves-effect waves-light red"><i class="material-icons" @click="eliminar(activo.id)" >delete</i></a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ActivoView',
    data() {
        const api = "http://localhost:5000/";
        return {
            api,
            activos: [],
            search: '',
            toFilter: '',
            areas: [],
            data: {
                tipo: null,
                marca: null,
                modelo: null,
                estado: null,
                areaId: null
            },
            contador: 0
        }
    },
    methods: {
        filter(name, value) {
            this.toFilter = (!value) ? '' : '&' + name + '=' + value;
            this.getList();
        },
        update(id) {
            this.$router.push('activo/' + id);
        },
        eliminar(id) {
            if (confirm("Esta seguro de eliminar el activo?.")) {
                this.axios({
                    method: 'delete',
                    url: this.api + 'activos/' + id
                }).then((response) => {
                    this.getList();
                }).catch((error) => {
                    console.log(error);
                });
            }
        },
        nuevo() {
            this.axios({
                method: 'post',
                url: this.api + 'activos',
                data: this.data
            }).
            then((response) => {
                this.getList();
                console.log(response);
            }).
            catch((error) => {
                console.log(error);
            });
        },
        getList() {
            console.log(this.search);
            console.log(this.toFilter);
            this.axios({
                method: 'get',
                url: this.api + 'activos?_expand=area&q=' + this.search + this.toFilter
            }).
            then((response) => {
                this.activos = response.data;
            }).
            catch((error) => {
                console.log(error);
            })
        },
        getActivoList() {

            this.axios({
                method: 'get',
                url: this.api + 'areas'
            }).
            then((response) => {
                this.areas = response.data;
                if (this.contador <= 2 ) {
                    const intervalo = setTimeout(() => {
                        this.intSelect(); 
                        clearTimeout(intervalo);
                    }, 3000);
                    this.contador++;
                }
            }).
            catch((error) => {
                console.log(error);
            })
        },
        intSelect(){
            this.getList();
            this.getActivoList();
            var elems = document.querySelectorAll('select');
            var instances = M.FormSelect.init(elems);
        }
    },
    components: {

    },
    mounted() {
        this.getList();
        this.getActivoList();
        var elems = document.querySelectorAll('select');
        var instances = M.FormSelect.init(elems);
    }
}
</script>

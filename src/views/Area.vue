<template>
    <div class="container">
        <h4>Areas</h4>
    
        <div class="card">
            <div class="card-content">
                <form @submit.prevent="nuevo()">
                    <h5>Nueva area</h5>
                    <p>Nombre area: <input type="text" v-model="data.nombre" required/></p>
                    <p>Nombre Encargado: <input type="text" v-model="data.encargado" required/></p>
                    <p>Funcionario: <input type="number" v-model="data.funcionario" required/></p>
                    <button type="submit" class="waves-effect waves-light btn-small">Crear</button>
                </form>
            </div>
        </div>
    
        <div class="card">
            <div class="card-content">
                <form @submit.prevent="getList()">
                    <h5>Buscar area</h5>
                    <p>Nombre area: <input type="search" v-model="search" @search="getList()" /></p>
                    <button type="submit" class="waves-effect waves-light btn-small">buscar</button>
                </form>
            </div>
        </div>
    
        <div class="card">
            <div class="card-content">
                <h5>filtros</h5>
                <div class="input-field ">
                    <select @change="filter('active',$event.target.value)">
                        <option value="" selected>todos</option>
                        <option value="true">activo</option>
                        <option value="false">inactivo</option>
                    </select>
                    <label>Materialize Select</label>
                </div>
    
            </div>
        </div>
    
        <div class="card">
            <div class="card-content">
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Area</th>
                            <th>Encargado</th>
                            <th>idFuncionario</th>
                            <th></th>
                        </tr>
                    </thead>
    
                    <tbody>
                        <tr v-for="area in areas">
                            <td>{{area.id}}</td>
                            <td>{{area.nombre}}</td>
                            <td>{{area.encargado}}</td>
                            <td>{{area.funcionario}}</td>
                            <td>
                                <a class="app-btn btn-small btn-floating btn-large waves-effect waves-light blue "><i class="material-icons" @click="update(area.id)" >edit</i></a>
                                <a class="app-btn btn-small btn-floating btn-large waves-effect waves-light red"><i class="material-icons" @click="eliminar(area.id)" >delete</i></a>
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
    name: 'AreaView',
    data() {
        const api = "http://localhost:5000/";
        return {
            api,
            areas: [],
            search: '',
            toFilter: '',
            data: {
                name: null,
                encargado: null,
                funcionario: null,
            }
        }
    },
    methods: {
        filter(name, value) {
            this.toFilter = value === '' ? '' : '&' + name + '=' + value;
            this.getList();
        },
        update(id) {
            this.$router.push('/area/' + id);
        },
        eliminar(id) {
            if (confirm("Esta seguro de eliminar el Area?.")) {
                this.axios({
                    method: 'delete',
                    url: this.api + 'areas/' + id
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
                url: this.api + 'areas',
                data: this.data
            }).then((response) => {
                this.getList();
            }).catch((error) => {
                console.log(error);
            });
        },
        getList() {
            this.axios({
                method: 'get',
                url: this.api + 'areas?q=' + this.search + this.toFilter
            }).
            then((response) => {
                this.areas = response.data;
            }).
            catch((error) => {
                console.log(error);
            })
        }
    },
    components: {

    },
    mounted() {
        this.getList();
        var elems = document.querySelectorAll('select');
        var instances = M.FormSelect.init(elems);
    }
}
</script>

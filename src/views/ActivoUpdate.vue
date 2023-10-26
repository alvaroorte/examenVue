<template>
    <div class="container">
        <h5>Editar Activo</h5>
    
        <div class="card">
            <div class="card-content">
                <form @submit.prevent="update()">
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
                    <button type="submit" class="waves-effect waves-light btn-small">Editar</button>
                </form>
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
            data: {
                tipo: null,
                marca:null,
                modelo:null,
                estado:null
            }
        }
    },
    methods: {
        getOne() {
            this.axios({
                method: 'get',
                url: this.api + 'activos/' + this.$route.params.id
            }).then((response) => {
                this.data = response.data;
            }).catch((error) => {
                console.log(error);
            });
        },
        update() {
            if (confirm("Esta seguro de editar el activo?.")) {
                this.axios({
                    method: 'patch',
                    url: this.api + 'activos/' + this.$route.params.id,
                    data: this.data
                }).then((response) => {
                    console.log(response);
                }). catch((error) => {
                    console.log(error);
                });
            }
        }
    },
    components: {

    },
    mounted() {
        this.getOne();
    }
}
</script>

<template>
    <div class="container">
        <h5>Areas Editar</h5>
    
        <div class="card">
            <div class="card-content">
                <form @submit.prevent="update()">
                    <p>Nombre area: <input type="text" v-model="data.nombre" required/></p>
                    <p>Nombre Encargado: <input type="text" v-model="data.encargado" required/></p>
                    <p>Funcionario: <input type="number" v-model="data.funcionario" required/></p>
                    <button type="submit" class="waves-effect waves-light btn-small">Editar</button>
                </form>
            </div>
        </div>
    
    </div>
</template>

<script>
export default {
    name: 'AreaUpdateView',
    data() {
        const api = "http://localhost:5000/";
        return {
            api,
            data: {
                name: null,
                encargado: null,
                funcionario: null
            }
        }
    },
    methods: {
        getOne() {
            this.axios({
                method: 'get',
                url: this.api + 'areas/' + this.$route.params.id
            }).
            then((response) => {
                this.data = response.data;
            }).
            catch((error) => {
                console.log(error);
            });
        },
        update() {
            if (confirm("Esta seguro de editar?.")) {
                this.axios({
                    method: 'patch',
                    url: this.api + 'areas/' + this.$route.params.id,
                    data: this.data
                }).
                then((response) => {
                    this.$router.push('/area');
                }).
                catch((error) => {
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

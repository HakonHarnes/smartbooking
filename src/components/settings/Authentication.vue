<template>
    <div>
        <h2>Autentisering</h2>
        <form @submit.prevent="handleSave">
            <div class="control">
                <label>To-faktor autentisering</label>
                <div class="option">
                    <div>
                        <label>Av</label>
                        <input v-model.number="two_factor" type="radio" :value="0" name="two_factor" />
                    </div>
                    <div>
                        <label>På</label>
                        <input v-model.number="two_factor" type="radio" :value="1" name="two_factor" />
                    </div>
                </div>
            </div>
            <div class="control" v-if="two_factor === 1">
                <label>Autentiseringsmetode</label>
                <div class="option">
                    <div>
                        <label>App</label
                        ><input v-model="two_factor_method" type="radio" value="app" name="two_factor_method" />
                    </div>
                    <div>
                        <label>E-post</label
                        ><input v-model="two_factor_method" type="radio" value="email" name="two_factor_method" />
                    </div>
                </div>
            </div>
            <base-button>Lagre</base-button>
        </form>
    </div>
</template>

<script>
export default {
    props: {
        two_f: Number,
        two_f_method: String
    },
    data() {
        return {
            two_factor: this.two_f,
            two_factor_method: this.two_f_method
        };
    },
    computed: {
        toast() {
            return this.$store.getters.toast;
        }
    },
    methods: {
        handleChange(e) {
            this[e.target.name] = e.target.value;
        },
        handleSave() {
            if (!!this.two_factor && !this.two_factor_method) {
                this.toast.warning('Vennligst velg en autentiseringsmetode');
            } else {
                this.toast.success('Oppdatert');
            }
        }
    }
};
</script>

<style scoped>
.control {
    margin: 2rem 0;
    padding: 0.8rem 0;
    border-bottom: 1px solid #eee;
}

.option {
    padding: 0.8rem 0;
    display: flex;
    justify-content: center;
}

.option div {
    margin: 0 0.5rem;
    font-size: 1.2rem;
}
</style>

<template>
    <div>
        <h2>Autentisering</h2>
        <form @submit.prevent="handleSave">
            <div class="control">
                <label>To-Faktor Autentisering</label>
                <div class="option">
                    <div>
                        <label>Av</label>
                        <input v-model.number="twoFactor" type="radio" :value="0" name="twoFactor" />
                    </div>
                    <div>
                        <label>På</label>
                        <input v-model.number="twoFactor" type="radio" :value="1" name="twoFactor" />
                    </div>
                </div>
            </div>
            <div class="control" v-if="twoFactor === 1">
                <label>Autentiseringsmetode</label>
                <div class="option">
                    <div>
                        <label>App</label
                        ><input v-model="twoFactorMethod" type="radio" value="app" name="twoFactorMethod" />
                    </div>
                    <div>
                        <label>E-post</label
                        ><input v-model="twoFactorMethod" type="radio" value="email" name="twoFactorMethod" />
                    </div>
                </div>
            </div>
            <base-button>Oppdater</base-button>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            twoFactor: this.$store.getters['auth/user'].two_factor,
            twoFactorMethod: this.$store.getters['auth/user'].two_factor_method
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
        async handleSave() {
            if (!this.twoFactor) return this.disableTwoFactorAuth();
            if (!this.twoFactorMethod) return this.toast.warning('Vennligst velg en autentiseringsmetode');

            this.enableTwoFactorAuth();
        },
        async disableTwoFactorAuth() {
            await this.$store.dispatch('auth/disableTwoFactorAuth');

            if (!this.$store.getters['auth/user'].twoFactor)
                this.toast.success('To-faktor autentisering har blitt slått av.');
            else this.toast.error('Kunne ikke slå av to-faktor autentisering.');
        },
        async enableTwoFactorAuth() {
            await this.$store.dispatch('auth/enableTwoFactorAuth', { twoFactorMethod: this.twoFactorMethod });

            // Redirects the user
            if (this.$store.getters['auth/verificationToken']) return this.$router.push('/init-to-faktor');
            else this.toast.error('Klarte ikke å slå på to-faktor autentisering');
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

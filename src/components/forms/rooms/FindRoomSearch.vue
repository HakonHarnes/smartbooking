<template>
    <base-card class="card">
        <form @submit.prevent="search">
            <div class="form-control">
                <label>Dato</label>
                <input type="date" :min="today" v-model="date.val" />
            </div>
            <div class="form-control">
                <label>Fra kl.</label>
                <input type="time" required v-model="times.from" />
            </div>
            <div class="form-control">
                <label>Til kl.</label>
                <input type="time" required v-model="times.to" />
            </div>
            <div class="form-control">
                <label>Bygg</label>
                <select>
                    <option>Alle bygg</option>
                </select>
            </div>
            <div class="form-control">
                <base-button>Søk</base-button>
            </div>
        </form>
        <div class="error">{{ error }}</div>
    </base-card>
</template>

<script>
export default {
    emits: ['find-rooms'],
    data() {
        return {
            date: {
                val: new Date().toISOString().slice(0, 10),
                valid: false
            },
            times: {
                from: '',
                to: '',
                valid: false
            },
            formValid: false,
            error: null
        };
    },
    computed: {
        today() {
            return new Date().toISOString().slice(0, 10);
        }
    },
    methods: {
        search() {
            this.error = null;
            this.validateForm();
            if (this.formValid) {
                this.$emit('find-rooms', {});
            }
        },
        validateDate() {
            const now = new Date().setHours(0, 0, 0);
            const start = new Date(this.date.val);
            if (start <= now || this.date.val.length !== 10) {
                this.date.valid = false;
            }
            this.date.valid = true;
        },
        validateTimes() {
            const replaceDot = time => time.replace(':', '');
            const from = replaceDot(this.times.from);
            const to = replaceDot(this.times.to);
            if (to - from <= 0) {
                this.error = '"FRA KL." må være før "TIL KL."';
                return (this.times.valid = false);
            }
            this.times.valid = true;
        },
        validateForm() {
            this.validateDate();
            this.validateTimes();

            if (!this.date.valid || !this.times.valid) {
                return (this.formValid = false);
            }
            this.formValid = true;
        }
    }
};
</script>

<style scoped>
.card {
    margin: 2rem 0 1rem;
    width: min-content;
}

.error {
    margin-top: 1rem;
    font-size: 0.9rem;
    font-weight: 600;
    color: rgba(182, 23, 23, 0.933);
}

form {
    display: flex;
    justify-content: center;
    align-items: flex-end;
}

form div {
    display: flex;
    flex-direction: column;
    align-items: start;
}

select,
input[type='date'],
input[type='time'] {
    padding: 0.3rem 0.2rem;
    font-family: inherit;
    font-size: 0.9rem;
}

select {
    min-width: 10rem;
}

label {
    text-transform: uppercase;
    font-size: 1rem;
    font-weight: 500;
    margin-bottom: 0.3rem;
}
.form-control {
    margin: 0 1rem;
}

input[type='time']:nth-child(3n) {
    display: none;
}
</style>

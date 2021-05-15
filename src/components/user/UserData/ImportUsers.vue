<template>
    <form class="csvUpload" @submit.prevent="handleSave">
        <div class="file">
            <label class="csv-label" for="csv">Velg CSV-fil</label>
            <p class="filename">{{ filename }}</p>
            <input id="csv" type="file" @change="handleFileUpload" />
        </div>

        <img class="image" v-if="showImage" src="../../../assets/csv-user.png" alt="" />
        <div class="info" v-if="showInfo">
            <p class="total-users-label">Antall brukere:</p>
            <p class="total-users">{{ userLength }}</p>

            <p class="total-errors-label">Antall feil i filen:</p>
            <p class="total-errors">{{ errors.length }}</p>
        </div>

        <div class="error" v-if="showError">
            Feil i CSV-filen på:
            <ul>
                <li v-for="(error, index) in errors" :key="index">Linje {{ error.line }}</li>
            </ul>
        </div>

        <div class="actions">
            <base-button :disabled="disableButton">Registrer brukere</base-button>
        </div>
    </form>
</template>

<script>
export default {
    emits: ['server-response'],
    data() {
        return {
            users: [],
            errors: [],
            filename: ''
        };
    },
    computed: {
        userLength() {
            return this.users.length + this.errors.length;
        },
        showImage() {
            return this.filename === '' || this.errors.length > 0;
        },
        showInfo() {
            return this.filename !== '';
        },
        showError() {
            return this.errors.length > 0;
        },
        disableButton() {
            return !(this.users.length > 0 && this.errors.length === 0);
        },
        user() {
            return this.$store.getters['auth/user'];
        },
        toast() {
            return this.$store.getters.toast;
        }
    },
    methods: {
        resetState() {
            this.filename = '';
            this.users = [];
            this.errors = [];
        },
        async handleSave() {
            const response = await this.$store.dispatch('users/registerUsers', { users: this.users });

            console.log(response);

            const users = this.users.filter(
                user => !response.errors.includes(user.email) && !response.warnings.includes(user.email)
            );
            const errors = this.users.filter(user => response.errors.includes(user.email));
            const warnings = this.users.filter(user => response.warnings.includes(user.email));

            this.$emit('server-response', { users, errors, warnings });
        },
        handleFileUpload(event) {
            this.resetState();

            // Makes sure a file is chosen
            const files = event.target.files;
            if (files.length === 0) return this.toast.error('Vennligst velg en fil');
            if (files.length > 1) return this.toast.error('Du kan kun velge en fil');

            // Checks if file is a .csv file
            const file = files[0];
            if (!file.name.includes('.csv')) return this.toast.error('Filen må være en CSV-fil');

            // Sets the filename
            this.filename = file.name;

            // Reads the file
            const reader = new FileReader();
            reader.onload = this.readFile();
            reader.readAsText(file);
        },

        readFile() {
            return event => {
                // Checks if file uses accepted deliminators
                if (!event.target.result.includes(';') && !event.target.result.includes(','))
                    return this.toast.error('CSV-filen må bruke ; eller , som adskiller');

                // Loops through each line in the file
                const lines = event.target.result.split('\n');
                lines.forEach((line, index) => {
                    // Ignores empty lines
                    if (line === '') return;

                    // Removes newlines and carret returns
                    line = line.replace('/n', '').replace('/r', '');

                    // Creates a user object
                    let props = line.split(/;|,/);

                    // Checks that all props are provided
                    props = props.filter(prop => prop.length > 0);
                    if (props.length < 3) return this.errors.push({ line: ++index });
                    if (!props[2].includes('@')) return this.errors.push({ line: ++index });

                    const user = {
                        firstName: props[0],
                        lastName: props[1],
                        email: props[2],
                        organization_id: this.user.organization_id
                    };

                    return this.users.push(user);
                });
            };
        }
    }
};
</script>

<style scoped>
form {
    display: grid;
    max-width: 350px;
    grid-gap: 1rem;
    width: 100%;
}

form * {
    width: 100%;
}

input[type='file'] {
    display: none;
}

.csv-label {
    font-family: 'Montserrat';
    background-color: white;
    border: 1px solid gray;
    border-radius: 0px;
    padding: 0.5rem;
    cursor: pointer;
}

.csv-label:hover {
    background-color: rgb(241, 241, 241);
}

.info {
    display: grid;
    grid-template-areas:
        'total-users-label  total-users'
        'total-errors-label total-errors';
    text-align: left;
    padding: 0.8rem;
    background-color: #dfdfdf;
}

.image {
    border: 1px solid gray;
}

.error {
    width: 100%;
    text-align: left;
    padding: 0.8rem;
    background-color: rgb(255, 86, 86);
}

.error * {
    margin: 0.2rem;
}

.success * {
    margin: 0.2rem;
}

.info * {
    margin: 0;
}
</style>

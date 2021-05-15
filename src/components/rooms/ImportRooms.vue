<template>
    <form class="csvUpload" @submit.prevent="handleSave">
        <div class="file">
            <label class="csv-label" for="csv">Velg CSV-fil</label>
            <p class="filename">{{ filename }}</p>
            <input id="csv" type="file" @change="handleFileUpload" />
        </div>

        <img class="image" v-if="showImage" src="../../assets/csv-room.png" alt="" />
        <div class="info" v-if="showInfo">
            <p class="total-rooms-label">Antall rom:</p>
            <p class="total-rooms">{{ rooms.length }}</p>

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
            <base-button :disabled="disableButton">Registrer rom</base-button>
        </div>
    </form>
</template>

<script>
export default {
    emits: ['server-response'],
    data() {
        return {
            rooms: [],
            errors: [],
            filename: ''
        };
    },
    computed: {
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
            return !(this.rooms.length > 0 && this.errors.length === 0);
        },
        user() {
            return this.$store.getters['auth/user'];
        },
        toast() {
            return this.$store.getters.toast;
        },
        buildings() {
            return this.$store.getters['buildings/buildings'];
        }
    },
    methods: {
        resetState() {
            this.filename = '';
            this.rooms = [];
            this.errors = [];
        },
        async handleSave() {
            this.rooms = this.rooms.map(room => {
                const { building_id } = this.buildings.find(
                    building => building.building_name === room.building.trim()
                );
                return {
                    name: room.room_name,
                    building: room.building,
                    size: room.size,
                    is_active: 1,
                    building_id,
                    organization_id: this.user.organization_id
                };
            });

            const response = await this.$store.dispatch('rooms/addRooms', { rooms: this.rooms });

            const rooms = this.rooms.filter(
                room => !response.errors.includes(room.name) && !response.warnings.includes(room.name)
            );
            const errors = this.rooms.filter(room => response.errors.includes(room.name));
            const warnings = this.rooms.filter(room => response.warnings.includes(room.name));

            this.$emit('server-response', { rooms, errors, warnings });
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

                    // Checks props
                    let props = line.split(/;|,/);
                    props = props.filter(prop => prop.length > 0);
                    if (props.length < 3) return this.errors.push({ line: ++index });

                    const room = {
                        room_name: props[0],
                        size: props[1],
                        building: props[2]
                    };

                    return this.rooms.push(room);
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
        'total-rooms-label  total-rooms'
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

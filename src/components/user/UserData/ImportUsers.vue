<template>
    <form class="csvUpload" @submit.prevent="handleSave">
        <div class="file">
            <label class="csv-label" for="csv">Velg fil</label>
            <p class="filename">{{ filename }}</p>
            <input id="csv" type="file" @change="readFileAsString" />
        </div>
        <div class="message" v-if="lines > 0">
            <p>Got {{ lines }} lines</p>
            <p>Found {{ errorList.length }} error</p>
        </div>
        <div class v-if="lines > 0">
            <div class="wrapper" v-if="errorList.length > 0">
                <p class="listHeader">Faulty Lines</p>
                <div class="listItem" v-for="item in errorList" :key="item.email">{{ item }}</div>
            </div>
            <div class="wrapper">
                <p class="listHeader">Successful Lines</p>
                <div class="listItem" v-for="item in list" :key="item.email">{{ item }}</div>
            </div>
        </div>
        <div class="actions"><base-button :disabled="!list.length">Lagre</base-button></div>
    </form>
</template>

<script>
export default {
    data() {
        return {
            list: [],
            errorList: [],
            lines: 0
        };
    },
    methods: {
        readFileAsString(event) {
            this.filename = '';

            const files = event.target.files;
            if (files.length === 0) {
                return this.toast.error('Vennligst velg en fil');
            }

            let fileName = files[0].name.split('.');
            if (fileName[fileName.length - 1] !== 'csv') {
                return this.toast.error('Filen må være en CSV-fil');
            }

            // Reads the CSV-file
            this.filename = files[0].name;
            const reader = new FileReader();
            let csvString;
            reader.onload = event => {
                csvString = event.target.result;
                const lines = csvString.split('\r\n');
                this.lines = lines.length - 1;
                const result = [];
                const faultyLines = [];
                const headers = lines[0].split(';');
                //Dårlig sjekk her. EVT sett delimiter her til ,
                if (headers.length <= 1) {
                    this.toast.error('Filen må bruke semicolon (;) som adskiller');
                }
                let faulty = false;

                for (let i = 1; i < lines.length; i++) {
                    if (!lines[i]) continue;
                    const obj = {};
                    const currentline = lines[i].split(';');
                    faulty = false;

                    for (let j = 0; j < headers.length; j++) {
                        if (currentline[j] === '' || (headers[j] === 'email' && !currentline[j].includes('@'))) {
                            faulty = true;
                        }
                        obj[headers[j]] = currentline[j];
                    }
                    if (!faulty) {
                        result.push(obj);
                    } else {
                        faultyLines.push(obj);
                    }
                }

                this.list = result;
                this.errorList = faultyLines;
            };
            reader.readAsText(files[0]);
        }
    }
};
</script>

<style scoped>
input[type='file'] {
    display: none;
}

.filename {
    font-weight: 500;
}

.csv-label {
    font-family: 'Montserrat';
    background-color: white;
    border: 1px solid gray;
    border-radius: 0px;
    padding: 0.5rem;
    cursor: pointer;
}

.actions {
    margin: 1.4rem 0 0;
}

.error {
    font-weight: 500;
    margin: 2rem 0 0.6rem;
    font-size: 1.2rem;
    color: rgb(200, 0, 0);
}
</style>

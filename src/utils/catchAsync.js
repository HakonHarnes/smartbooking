import { useToast } from 'vue-toastification';
const toast = useToast();

export default fn => {
    return async function() {
        try {
            return await fn.apply(this, arguments);
        } catch (error) {
            if (!error.response) toast.error("Can't connect to the database");
            else if (error.response.data.error) toast.error(error.response.data.error);
            return error.response;
        }
    };
};

export default fn => {
    return async function() {
        try {
            return await fn.apply(this, arguments);
        } catch (error) {
            if (!error.response) {
                return { error: "Can't connect to database" };
            }

            return { error: error.response.data.message };
        }
    };
};

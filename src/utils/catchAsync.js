export default fn => {
    return async function() {
        try {
            return await fn.apply(this, arguments);
        } catch (error) {
            return { error: error.response.data.message };
        }
    };
};

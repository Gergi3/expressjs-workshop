exports.match = (validation, message, messages) => {
    if (!validation) {
        messages.push(message);
    }    
}
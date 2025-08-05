window.copyText = (text) => {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text);
    } else {
        const temp = document.createElement('textarea');
        temp.value = text;
        document.body.appendChild(temp);
        temp.select();
        document.execCommand('copy');
        document.body.removeChild(temp);
    }
};

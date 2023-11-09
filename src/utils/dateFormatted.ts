const timestamp = (time: number) => {
    return new Date(time * 1000).toLocaleDateString('en-US', {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });
};

function secondsToDhms(seconds: number) {
    seconds = Number(seconds);
    var d = Math.floor(seconds / (3600 * 24));
    var h = Math.floor((seconds % (3600 * 24)) / 3600);
    var m = Math.floor((seconds % 3600) / 60);
    var s = Math.floor(seconds % 60);
    var dDisplay = d > 0 ? d + 'd' : '';
    var hDisplay = h > 0 ? h + 'h' : '';
    var mDisplay = m > 0 ? m + 'm' : '';
    var sDisplay = s > 0 ? s + 's' : '';
    return dDisplay + hDisplay + mDisplay + sDisplay;
}

export { secondsToDhms, timestamp };

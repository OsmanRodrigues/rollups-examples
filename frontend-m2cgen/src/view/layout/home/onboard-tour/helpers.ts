export const resetTourScroll = () =>
    new Promise(function (resolve) {
        setTimeout(function () {
            window.scrollTo(0, 0);
            resolve(void 0);
        }, 500);
    });

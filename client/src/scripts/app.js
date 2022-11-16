(() => {
    function Start() {
        console.log('App Started');
    }
    window.addEventListener('load', Start);
})();

// Change the Copyright Year Every Year
const copyright = `<p> © ${new Date().getFullYear()} Copyright PseudoCodes </p>`;
document.getElementById("copyright-year").innerHTML = copyright;
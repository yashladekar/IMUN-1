window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("pc").style.top = "0";
    } else {
        document.getElementById("pc").style.top = "-80px";
    }
}
var headings = document.querySelectorAll("h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]");

for (var i = 0; i < headings.length; i++) {
    headings[i].innerHTML =
        '<a style="border-bottom:none;color:#000;" href="#' + headings[i].id + '">' +
            headings[i].innerText +
        '</a>';
}

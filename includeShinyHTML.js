let pokemons = [];

/* HTML inclusion script. */
function includeHTML() {
    var z, i, elmnt, file, xhttp;
    /* Loop through a collection of all HTML elements: */
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
      elmnt = z[i];
      /*search for elements with a certain atrribute:*/
      file = elmnt.getAttribute("w3-include-html");
      if (file) {
        /* Make an HTTP request using the attribute value as the file name: */
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4) {
            if (this.status == 200) {elmnt.innerHTML = this.responseText;}
            if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
            /* Remove the attribute, and call this function once more: */
            elmnt.removeAttribute("w3-include-html");
            includeHTML();
          }
        }
        xhttp.open("GET", file, true);
        xhttp.send();
        /* Exit the function: */
        return;
      }
    }

    if (localStorage["shinypage"] !== undefined && localStorage["shinypage"] !== null) {
      pokemons = JSON.parse(localStorage["shinypage"]);
      $(function(){
        JSON.parse(localStorage["shinypage"]).forEach(e => {
          $('a.infocard').filter(function () {
            return $(this).text().trim() == e;
          }).addClass("highlight");
        });
      });
    }
    
    $(document).on('click', "div > a", function(event) {
      localStorage.removeItem("shinypage");
      this.classList.toggle("highlight");
      
      if (!$(this).hasClass("highlight")) {
        //Remove
        pokemons.splice(pokemons.indexOf($(this).text().trim()), 1);
      } else {
        //Add
        pokemons.push($(this).text().trim());
      }

      localStorage["shinypage"] = JSON.stringify(pokemons);
    });
}
/*jslint plusplus: true, eqeq: true*/
"use strict";
var titreParam = ["param1", "param2", "param3", "param4", "param5", "param6", "param7", "param8"];
var tabTitre = ["Système environnants", "Systèmes de communication", "Acteurs", "Processus", "Infrastructure", "Paramètres environnants", "Paramètres systèmes", "systèmes identiques"];


/* Creation d'un "close" button et ajout à la liste des items*/
function createCloseButton() {
    var myNodelist, i, span, txt;

    //myNodelist = document.getElementsByTagName("LI");
    myNodelist = document.getElementsByClassName("liItem");
    for (i = 0; i < myNodelist.length; i++) {
        span = document.createElement("SPAN");
        txt = document.createTextNode("\u00D7");
        span.className = "close";
        span.appendChild(txt);
        myNodelist[i].appendChild(span);
    }

}

/*Gere le onclick sur la fermeture des balises li*/
function closeOnclick(close) {
    var div;
    close.onclick = function () { // création de la fonction de gestion du onclick sur la crois close
        div = this.parentElement; // récupère le parent (div)
        div.style.display = "none"; // cache la ligne
        div.innerHTML = ""; //efface la ligne car elle existe encore même si elle n'est plus visible (permet la gestion d'une ligne vide)
    };

}

/* creation du click de fermeture de la ligne*/
function createClickCloseButton() {
    var i, close;
    // Click on a close button to hide the current list item
    close = document.getElementsByClassName("close");
    for (i = 0; i < close.length; i++) {
        closeOnclick(close[i]); // création de la fonction du click 
    }
}

//ajoute un evènement sur le click de la ligne*/
function listaddevenListener(list) {

    list.addEventListener('click', function (ev) { // ajoute un evènement sur le click de la ligne
        if (ev.target.tagName === 'LI') { // si li
            ev.target.classList.toggle('checked'); // affiche la ligne comme checked
        }
    }, false);

}
/* ajoute un "checked"  sym bole sur les balises li quand on click sur une ligne*/
function addCheckedLI() {
    var i, list;
    for (i = 1; i <= document.getElementsByClassName("clsULParam").length; i++) { // ajoute pour chaque paramètre (défini par clsULParam)
        list = document.querySelector("#monUL" + i); // nom de chaque case param (défini par un ul)
        listaddevenListener(list); // ajoute l'évènement du click
    }

}

/* gestion des lignes*/
function gestionLI() {

    var list;
    createCloseButton(); // ajout du close sur les lignes (croix)
    createClickCloseButton();
    addCheckedLI(); // ajout du symbole checked sur les lignes


}

function newElement(num, titre) {
    var li, inputValue, t, span, txt, close, i;

    li = document.createElement("li");
    li.setAttribute("class", "liItem");
    if (titre === undefined) {
        inputValue = document.getElementById("InputTitre" + num).value;
    } else {
        inputValue = titre;
    }
    t = document.createTextNode(inputValue);
    span = document.createElement("SPAN");
    span.appendChild(t);
    li.appendChild(span);
    if (inputValue === '') {
        /*global alert*/
        alert("You must write something!");
    } else {
        document.getElementById("monUL" + num).appendChild(li);
    }
    document.getElementById("InputTitre" + num).value = "";

    span = document.createElement("SPAN");
    txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);

    createClickCloseButton();
}

/* Gere le onclick sur le button Lien*/

function lienOnclick(lien) {
    var div;
    lien.onclick = function () { // création de la fonction de gestion du onclick sur la crois close
        div = this.parentElement; // récupère le parent (div)
        div.classList.toggle("Activelien");
        div.classList.remove("Activenolien");
    };

}

/* creation du click de fermeture de la ligne*/
function createClickLienButton() {
    var i, lien;
    // Click on a close button to hide the current list item
    lien = document.getElementsByClassName("lien");
    for (i = 0; i < lien.length; i++) {
        lienOnclick(lien[i]); // création de la fonction du click 
    }
}
function nolienOnclick(nolien) {
    var div;
    nolien.onclick = function () { // création de la fonction de gestion du onclick sur la crois close
        div = this.parentElement; // récupère le parent (div)
        div.classList.toggle("Activenolien");
        div.classList.remove("Activelien");
    };

}

/* creation du click de fermeture de la ligne*/
function createClickNoLienButton() {
    var i, lien;
    // Click on a close button to hide the current list item
    lien = document.getElementsByClassName("nolien");
    for (i = 0; i < lien.length; i++) {
        nolienOnclick(lien[i]); // création de la fonction du click 
    }
}


function newLien(titre) {
    var li, inputValue, t, span, spanNoLien, spanLien, txt, close, i;

    li = document.createElement("li");
    //    inputValue = document.getElementById("InputTitre" + num).value;
    inputValue = titre;
    t = document.createTextNode(inputValue);
    span = document.createElement("SPAN");
    span.appendChild(t);
    li.appendChild(span);
    if (inputValue === '') {
        /*global alert*/
        alert("You must write something!");
    } else {
        document.getElementById("ulLien").appendChild(li);
    }
    //    document.getElementById("InputTitre" + num).value = "";

    spanNoLien = document.createElement("SPAN");
    txt = document.createTextNode("\u00D7");
    spanNoLien.className = "nolien";
    spanNoLien.appendChild(txt);
    li.appendChild(spanNoLien);

    spanLien = document.createElement("SPAN");
    txt = document.createTextNode("Lien");
    spanLien.className = "lien";
    spanLien.appendChild(txt);
    li.appendChild(spanLien);
    //
    createClickLienButton();
    createClickNoLienButton();
}



function creationclsParam(idPosFlex, i, titre) {
    var d, divclsParam, divheader, h, input, span, ul,
        divAdd, chk;
    d = document.getElementById(idPosFlex);
    divclsParam = document.createElement("div");
    divclsParam.setAttribute("class", "clsParam");

    divheader = document.createElement("div");
    divheader.setAttribute("class", "header");

    chk = document.createElement("input");
    chk.setAttribute("type", "checkbox");
    chk.setAttribute("id", "chk" + i);

    h = document.createElement("h2");
    h.innerHTML = titre;

    divAdd = document.createElement("div");
    divAdd.setAttribute("class", "divAdd");

    input = document.createElement("input");
    input.setAttribute("id", "InputTitre" + i);
    input.setAttribute("type", "text");
    input.setAttribute("placeholder", "titre test ...");
    span = document.createElement("span");
    span.setAttribute("class", "addBtn");
    span.innerHTML = "Add";
    span.addEventListener('click', function () {
        newElement(i);
    });

    divheader.appendChild(chk);
    divheader.appendChild(h);

    divAdd.appendChild(input);
    divAdd.appendChild(span);
    divheader.appendChild(divAdd);
    //divheader.appendChild(input);
    //divheader.appendChild(span);

    ul = document.createElement("ul");
    ul.setAttribute("id", "monUL" + i);
    ul.setAttribute("class", "clsULParam");

    divclsParam.appendChild(divheader);
    divclsParam.appendChild(ul);

    d.appendChild(divclsParam);

}

function creationclsLien() {
    var d, divheader, h, ul;
    d = document.getElementById("divLien");
    d.setAttribute("class", "clslien");

    divheader = document.createElement("div");
    divheader.setAttribute("class", "header");

    h = document.createElement("h2");
    h.innerHTML = "Lien";

    divheader.appendChild(h);

    ul = document.createElement("ul");
    ul.setAttribute("id", "ulLien");

    d.appendChild(divheader);
    d.appendChild(ul);


}


function reset() {
    var div, i;

    div = document.getElementById('PosFlex1');
    div.innerHTML = "";
    div = document.getElementById('PosFlex2');
    div.innerHTML = "";


    for (i = 1; i <= 4; i++) {
        creationclsParam("PosFlex1", i, tabTitre[i - 1]);
    }
    for (i = 5; i <= 8; i++) {
        creationclsParam("PosFlex2", i, tabTitre[i - 1]);
    }
    gestionLI();

}

function getStorage() {
    var myUL, itemParams, i, j;
    reset();
    if (typeof localStorage != 'undefined' && JSON) {
        itemParams = JSON.parse(localStorage.getItem('param'));
        myUL = document.getElementsByTagName('ul');
        for (j = 0; j < myUL.length - 1; j++) { //je soustrait 1 pour enlever celui du lien
            for (i = 0; i < itemParams[titreParam[j]].length; i++) {
                newElement(j + 1, itemParams[titreParam[j]][i]);
            }
        }
        //		document.getElementById('nom').value = coordonnees.nom;
        //		document.getElementById('prenom').value = coordonnees.prenom;
        //		document.getElementById('ville').value = coordonnees.ville;
    } else {
        alert("localStorage n'est pas supporté");
    }
}

function setStorage() {
    var myUL, lis, li, itemParams, chaineJson, i, j;

    itemParams = {
        "param1": [],
        "param2": [],
        "param3": [],
        "param4": [],
        "param5": [],
        "param6": [],
        "param7": [],
        "param8": []
    };

    localStorage.clear();
    if (typeof localStorage !== 'undefined' && JSON) {
        //myUL = document.getElementsByTagName('ul');
        myUL = document.getElementsByClassName('clsULParam');

        for (j = 0; j < myUL.length; j++) {
            lis = myUL[j].getElementsByTagName('LI');
            for (i = 0; i < lis.length; i++) {
                li = lis[i].getElementsByTagName('SPAN');
                if (li.length > 0) {
                    itemParams[titreParam[j]].push(li[0].innerHTML);
                }
            }

        }
        chaineJson = JSON.stringify(itemParams);
        localStorage.setItem('param', chaineJson);
    }
}

function clickLien() {
    var i, j, k, l, myUL, lis1, lis2, li1, li2, d, list, id;

    d = document.getElementById("divLien");
    d.innerHTML = "";
    creationclsLien();

    //    myUL = document.getElementsByTagName('ul');
    myUL = document.getElementsByClassName('clsULParam');
    for (i = 0; i < myUL.length - 1; i++) {
        id = i + 1;
        id = "chk" + id;
        if (document.getElementById(id).checked) {
            lis1 = myUL[i].getElementsByTagName('LI');
            for (j = 0; j < lis1.length; j++) {
                li1 = lis1[j].getElementsByTagName('SPAN');
                if (li1.length > 0) {
                    for (k = i + 1; k < myUL.length - 1; k++) {
                        id = k + 1;
                        id = "chk" + id;
                        if (document.getElementById(id).checked) {
                            lis2 = myUL[k].getElementsByTagName('LI');
                            for (l = 0; l < lis2.length; l++) {
                                li2 = lis2[l].getElementsByTagName('SPAN');
                                if (li2.length > 0) {
                                    newLien(li1[0].innerHTML + "<-->" + li2[0].innerHTML);
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    //    list = document.querySelector("#ulLien");
    //    listaddevenListener(list);

}


function start() {
    var i;
    for (i = 1; i <= 4; i++) {
        creationclsParam("PosFlex1", i, tabTitre[i - 1]);
    }
    for (i = 5; i <= 8; i++) {
        creationclsParam("PosFlex2", i, tabTitre[i - 1]);
    }
    getStorage();

}

start();

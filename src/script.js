/*jslint plusplus: true, eqeq: true*/
"use strict";
var titreParam = ["param1", "param2", "param3", "param4", "param5", "param6", "param7", "param8"];
var tabTitre = ["Système environnants", "Systèmes de communication", "Acteurs", "Processus", "Infrastructure", "Paramètres environnants", "Paramètres systèmes", "systèmes identiques"];


/*          BLOC et item            */

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
/*Gere le onclick sur la fermeture des balises li (croix)*/
function closeOnclick(close) {
    var div;
    close.onclick = function () { // création de la fonction de gestion du onclick sur la crois close
        div = this.parentElement; // récupère le parent (div)
        div.style.display = "none"; // cache la ligne
        div.innerHTML = ""; //efface la ligne car elle existe encore même si elle n'est plus visible (permet la gestion d'une ligne vide)
        resetLien();
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
//ajoute un evènement sur le click de la ligne (toggle class checked)*/
function listaddevenListener(list) {

    list.addEventListener('click', function (ev) { // ajoute un evènement sur le click de la ligne
        if (ev.target.tagName === 'LI') { // si li
            ev.target.classList.toggle('checked'); // affiche la ligne comme checked
        }
    }, false);

}
/* ajoute un "checked"  symbole sur les balises li quand on click sur une ligne (listaddeventlistener)*/
function addCheckedLI() {
    var i, list;
    for (i = 1; i <= document.getElementsByClassName("clsULParam").length; i++) { // ajoute pour chaque paramètre (défini par clsULParam)
        list = document.querySelector("#monUL" + i); // nom de chaque case param (défini par un ul)
        listaddevenListener(list); // ajoute l'évènement du click
    }

}
/* ajoute un item au bloc*/
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
/* création des blocs*/
function creationclsParam(idPosFlex, i, titre) {
    var d, divclsParam, divheader, h, input, span, ul,
        divAdd, chk, itemchk;
    d = document.getElementById(idPosFlex);
    divclsParam = document.createElement("div");
    divclsParam.setAttribute("class", "clsParam");

    divheader = document.createElement("div");
    divheader.setAttribute("class", "header");

    chk = document.createElement("input");
    chk.setAttribute("type", "checkbox");
    chk.setAttribute("id", "chk" + i);

    itemchk = JSON.parse(localStorage.getItem('Domhus_chk'));
    if (itemchk) {
        if (itemchk.chk[i - 1]) {
            chk.setAttribute("checked", true);
        }
    }

    chk.addEventListener('click', function () {
        resetLien();
    });

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
        resetLien();
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


/*          lien            */

/*recupere du stockage les liens*/
function getstorageLien() {
    var chaineJson, tableauLien;
    if (typeof localStorage !== 'undefined' && JSON) {
        chaineJson = JSON.stringify(tableauLien);
        tableauLien = JSON.parse(localStorage.getItem('Domhus_lien'));
    }
    return tableauLien;
}
/*sauvegarde dans le stockage les liens*/
function setstorageLien(tableauLien) {
    var chaineJson;
    if (typeof localStorage !== 'undefined' && JSON) {
        localStorage.removeItem('Domhus_lien');
        chaineJson = JSON.stringify(tableauLien);
        localStorage.setItem('Domhus_lien', chaineJson);
    }
}
/* met à jour le stockage des liens*/
function majStorageLien(num, div) {
    var i, tableauLien;
    tableauLien = getstorageLien();
    if (div.classList.contains("Activelien")) {
        tableauLien.Lien[num] = 1;
    } else {
        if (div.classList.contains("Activenolien")) {
            tableauLien.Lien[num] = 2;

        } else {
            tableauLien.Lien[num] = 0;
        }
    }
    setstorageLien(tableauLien);
}
/* Gere le onclick sur le button Lien*/
function lienOnclick(lien, i) {
    var div;
    lien.onclick = function () { // création de la fonction de gestion du onclick sur la croix close
        div = this.parentElement; // récupère le parent (div)
        div.classList.toggle("Activelien");
        div.classList.remove("Activenolien");
        majStorageLien(i, div);
    };

}
/* creation du click sur le bouton lien*/
function createClickLienButton() {
    var i, lien;
    lien = document.getElementsByClassName("lien");
    for (i = 0; i < lien.length; i++) {
        lienOnclick(lien[i], i); // création de la fonction du click 
    }
}
/* Gere le onclick sur le button noLien (croix)*/
function nolienOnclick(nolien, i) {
    var div;
    nolien.onclick = function () { // création de la fonction de gestion du onclick sur la crois close
        div = this.parentElement; // récupère le parent (div)
        div.classList.toggle("Activenolien");
        div.classList.remove("Activelien");
        majStorageLien(i, div);

    };

}
/* creation du click sur le bouton nolien (croix)*/
function createClickNoLienButton() {
    var i, lien;
    lien = document.getElementsByClassName("nolien");
    for (i = 0; i < lien.length; i++) {
        nolienOnclick(lien[i], i); // création de la fonction du click 
    }
}
/* création d'un lien*/
function newLien(titre, num, numlien) {
    var li, inputValue, t, span, spanNoLien, spanLien, txt, close, i, a;

    li = document.createElement("li");
    //    inputValue = document.getElementById("InputTitre" + num).value;
    inputValue = titre;
    t = document.createTextNode(inputValue);

    a = document.createElement("a");
    a.appendChild(t);
    a.setAttribute("onclick", "afficheScrollLien(" + num + ")");

    span = document.createElement("SPAN");
    span.appendChild(a);


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

    if (numlien === 1) {
        li.classList.add("Activelien");
    } else {
        if (numlien === 2) {
            li.classList.add("Activenolien");
        }
    }

    //
    createClickLienButton();
    createClickNoLienButton();
}
/*création du bloc lien*/
function creationclsLien() {
    var d, divheader, h, ul;
    d = document.getElementById("divLien");
    d.setAttribute("class", "clslien");

    divheader = document.createElement("div");
    divheader.setAttribute("class", "headerlien");

    h = document.createElement("h2");
    h.innerHTML = "Lien";

    divheader.appendChild(h);

    ul = document.createElement("ul");
    ul.setAttribute("id", "ulLien");

    d.appendChild(divheader);
    d.appendChild(ul);

}
/* crétaion des liens*/
function creationLien(itemLien, start) {
    var i, j, k, l, myUL, lis1, lis2, li1, li2, d, list, id, lien, num = 0;
    d = document.getElementById("divLien");
    d.innerHTML = "";
    creationclsLien();

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
                                    if (start === false) {
                                        itemLien.Param1.push(li1[0].innerHTML);
                                        itemLien.Param2.push(li2[0].innerHTML);
                                        itemLien.Lien.push(0);
                                    }
                                    //                                    newLien(tabTitre[i] + ":" + li1[0].innerHTML + " <==> " + tabTitre[k] + ":" + li2[0].innerHTML, num, itemLien.Lien[num]);
                                    newLien(li1[0].innerHTML + " <==> " + li2[0].innerHTML, num, itemLien.Lien[num]);
                                    num = num + 1;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    if (start === false) {
        setstorageLien(itemLien);
    }
}

/*          Tableau         */
function ajoutCellule(row, rowspan, colspan, texte, classname) {
    var cell;
    cell = document.createElement("td");
    cell.rowSpan = rowspan;
    cell.colSpan = colspan;
    if (classname !== "") {
        cell.className = classname;
    }
    texte = document.createTextNode(texte);
    cell.appendChild(texte);
    row.appendChild(cell);

    return row;
}

function getChecked() {
    var itemchk, chk = [],
        i, j = 0;
    itemchk = JSON.parse(localStorage.getItem('Domhus_chk'));
    for (i = 0; i < itemchk.chk.length; i++) {
        if (itemchk.chk[i]) {
            chk[j] = tabTitre[i];
            j = j + 1;
        }
    }
    return chk;
}

/* crétaion d'un tableau des lien pour pouvoir le copier coller */
function creationTableauLien() {
    var divTableau, table, caption, tablehead, row, tablebody, lien, i, divLien,
        param = [];


    lien = getstorageLien();

    param = getChecked();

    divTableau = document.getElementById("tableauLien");
    divTableau.innerHTML = "";

    divLien = document.getElementById("divLien");

    divTableau.classList.toggle("pasvisible");
    divLien.classList.toggle("pasvisible");

    table = document.createElement("table");
    table.id = "monTableauLien";
    table.className = "clsTableau";
    caption = document.createElement("caption");
    //caption.innerHTML = "Tableau RetR" + numTableau;
    table.appendChild(caption);

    tablehead = document.createElement("thead");
    tablehead.className = "clsTableau_Head";
    //Opérateurs,Esssais,Pièces,Moyenne    
    row = document.createElement("tr");
    row = ajoutCellule(row, 1, 1, param[0], "clsTableau_Param");
    row = ajoutCellule(row, 1, 1, param[1], "clsTableau_Param");
    row = ajoutCellule(row, 1, 1, "X");
    row = ajoutCellule(row, 1, 1, "lien");
    tablehead.appendChild(row);
    table.appendChild(tablehead);

    tablebody = document.createElement("tbody");
    for (i = 0; i < lien.Param1.length; i++) {
        row = document.createElement("tr");
        row = ajoutCellule(row, 1, 1, lien.Param1[i]);
        row = ajoutCellule(row, 1, 1, lien.Param2[i]);

        if (lien.Lien[i] === 1) {
            row = ajoutCellule(row, 1, 1, " ", "clsTableau_Gris");
            row = ajoutCellule(row, 1, 1, "X", "clsTableau_Vert");
        } else {
            if (lien.Lien[i] === 2) {
                row = ajoutCellule(row, 1, 1, "X", "clsTableau_Rouge");
                row = ajoutCellule(row, 1, 1, " ", "clsTableau_Gris");
            } else {
                row = ajoutCellule(row, 1, 1, " ", "clsTableau_Gris");
                row = ajoutCellule(row, 1, 1, " ", "clsTableau_Gris");
            }
        }
        tablebody.appendChild(row);
    }
    table.appendChild(tablebody);
    divTableau.appendChild(table);


}


/*          scrollLien          */

/* efface l'affichage du scroll des liens*/
function fermerScrollLien() {
    var div1, div2, itemLien;
    div1 = document.getElementById("divParam");
    div1.classList.remove("pasvisible");
    div2 = document.getElementById("divScrollLien");
    div2.classList.add("pasvisible");

    itemLien = getstorageLien();
    creationLien(itemLien, true);


}
/* met à jour le scrolllien (couleur lien ou pas lien)*/
function majScrollLien(num) {
    var tableauLien;

    if (typeof sessionStorage !== 'undefined') {

        num = sessionStorage.getItem("Domhus_NumEnCours");
        tableauLien = getstorageLien();
        if (tableauLien.Param1.length > 0) {
            if (num < 0) {
                num = tableauLien.Param1.length - 1;
                sessionStorage.setItem("Domhus_NumEnCours", num);
            }

            if (num >= tableauLien.Param1.length) {
                num = 0;
                sessionStorage.setItem("Domhus_NumEnCours", num);
            }

            document.getElementById("scrollLien").innerHTML = tableauLien.Param1[num] + "<br><==><br>" + tableauLien.Param2[num];

            if (tableauLien.Lien[num] === 1) { // lien
                document.getElementById("choixX").classList.remove("Activenolien");
                document.getElementById("choixLien").classList.add("Activelien");
            } else {
                if (tableauLien.Lien[num] === 2) { //pas de lien
                    document.getElementById("choixX").classList.add("Activenolien");
                    document.getElementById("choixLien").classList.remove("Activelien");
                } else { // pas renseigné
                    document.getElementById("choixX").classList.remove("Activenolien");
                    document.getElementById("choixLien").classList.remove("Activelien");

                }
            }
        } else {
            alert("session storage n'est pas supporté");
        }
    }
}
/* affiche l'affichage du scroll des liens*/
function afficheScrollLien(num) {
    var div1, div2;
    div1 = document.getElementById("divParam");
    div1.classList.add("pasvisible");
    div2 = document.getElementById("divScrollLien");
    div2.classList.remove("pasvisible");

    if (typeof sessionStorage !== 'undefined') {

        sessionStorage.setItem("Domhus_NumEnCours", num);
        majScrollLien();
    } else {
        alert("session  storage n'est pas supporté");
    }
}


/*          function onclick des boutons            */

/* onclick reset les blocs */
function reset() {
    var div, i, itemLien;

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
    createCloseButton(); // ajout du close sur les lignes (croix)
    createClickCloseButton();
    addCheckedLI(); // ajout du symbole checked sur les lignes

    itemLien = getstorageLien();
    creationLien(itemLien, true);

}
/* onclick getstorage  recupère les blocs dans le stockage*/
function getStorage() {
    var myUL, itemParams, i, j, itemchk, id, itemLien;
    reset();
    if (typeof localStorage != 'undefined' && JSON) {
        itemParams = JSON.parse(localStorage.getItem('Domhus_param'));
        myUL = document.getElementsByTagName('ul');
        for (j = 0; j < myUL.length - 1; j++) { //je soustrait 1 pour enlever celui du lien
            for (i = 0; i < itemParams[titreParam[j]].length; i++) {
                newElement(j + 1, itemParams[titreParam[j]][i]);
            }
            id = j + 1;
            id = "chk" + id;
            itemchk = JSON.parse(localStorage.getItem('Domhus_chk'));
            if (itemchk.chk[j]) {
                document.getElementById(id).checked = true;
            }
        }
        itemLien = getstorageLien();
        creationLien(itemLien, true);
    } else {
        alert("localStorage n'est pas supporté");
    }
}
/* onclick setstorage  sauvegarde les blocs dans le stockage*/
function setStorage() {
    var myUL, lis, li, itemParams, chaineJson, i, j,
        itemLien, itemchk, id;

    itemchk = {
        "chk": []
    };

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

    if (typeof localStorage !== 'undefined' && JSON) {
        localStorage.removeItem('Domhus_param');
        myUL = document.getElementsByClassName('clsULParam');
        for (j = 0; j < myUL.length; j++) {
            lis = myUL[j].getElementsByTagName('LI');
            for (i = 0; i < lis.length; i++) {
                li = lis[i].getElementsByTagName('SPAN');
                if (li.length > 0) {
                    itemParams[titreParam[j]].push(li[0].innerHTML);
                }
            }
            id = j + 1;
            id = "chk" + id;
            if (document.getElementById(id).checked) {
                itemchk.chk.push(true);
            } else {
                itemchk.chk.push(false);
            }
        }
        chaineJson = JSON.stringify(itemParams);
        localStorage.setItem('Domhus_param', chaineJson);

        chaineJson = JSON.stringify(itemchk);
        localStorage.setItem('Domhus_chk', chaineJson);
    }
}

/*ResetLien*/
function resetLien() {
    var itemLien;
    itemLien = {
        "Param1": [],
        "Param2": [],
        "Lien": [] // 0 pas renseigné, 2 lien, 2 pas de lien
    };

    creationLien(itemLien, false);
    setStorage();
}

/* Affiche  les liens*/
function testAffichageTableau() {
    var divTableauLien, i, flagPasvisible = false;
    document.getElementById("divLien1").classList.toggle("pasvisible");
    document.getElementById("divBloc").classList.toggle("pasvisible");

    divTableauLien = document.getElementById("tableauLien").classList;
    for (i = 0; i < divTableauLien.length; i++) {
        if (divTableauLien[i] === "pasvisible") {
            flagPasvisible = true;
        }
    }
    if (flagPasvisible === false) {
        document.getElementById("tableauLien").classList.add("pasvisible");
    }

}

/* onclick clickResetlien afffiche les liens réinitialisés*/
function clickResetLien() {
    resetLien();
    testAffichageTableau();
}

/* onclick clicklien afffiche les liens*/
function clickLien() {
    var itemLien;
    itemLien = getstorageLien();
    creationLien(itemLien, true);

    testAffichageTableau();
}
/* onclick lien suivant */
function scrollPlus() {
    var num;
    if (typeof sessionStorage !== 'undefined') {
        num = sessionStorage.getItem("Domhus_NumEnCours");
        num = Number(num) + 1;
        sessionStorage.setItem("Domhus_NumEnCours", num);

        majScrollLien();
    } else {
        alert("session storage n'est pas supporté");
    }
}
/* onclick lien précédent */
function scrollMoins() {
    var num;
    if (typeof sessionStorage !== 'undefined') {
        num = sessionStorage.getItem("Domhus_NumEnCours");
        num = num - 1;
        sessionStorage.setItem("Domhus_NumEnCours", num);

        majScrollLien();
    } else {
        alert("session storage n 'est supporté");
    }
}
/* onclik choix pas de lien */
function choixX() {
    var num, tableauLien;
    if (typeof sessionStorage !== 'undefined') {
        num = sessionStorage.getItem("Domhus_NumEnCours");
        tableauLien = getstorageLien();
        tableauLien.Lien[num] = 2;
        setstorageLien(tableauLien);

        majScrollLien();
    } else {
        alert("session storage n'est pas supporté");
    }
}
/* onclik choix lien */
function choixLien() {
    var num, tableauLien;
    if (typeof sessionStorage !== 'undefined') {

        num = sessionStorage.getItem("Domhus_NumEnCours");
        tableauLien = getstorageLien();
        tableauLien.Lien[num] = 1;
        setstorageLien(tableauLien);

        majScrollLien();
    } else {
        alert("session storage n'est pas supporté");
    }
}
/* ferme la fenêtre des liens pour retourner sur les blocs*/
function fermerLien() {
    document.getElementById("divLien1").classList.toggle("pasvisible");
    document.getElementById("divBloc").classList.toggle("pasvisible");

}

/*          onload           */
function start() {
    var i, itemLien;
    for (i = 1; i <= 4; i++) {
        creationclsParam("PosFlex1", i, tabTitre[i - 1]);
    }
    for (i = 5; i <= 8; i++) {
        creationclsParam("PosFlex2", i, tabTitre[i - 1]);
    }
    getStorage();

}

start();

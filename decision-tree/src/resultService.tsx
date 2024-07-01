const messages = {a : "", b : "", c : "", d : ""};
const probabilities = {a : 0, b : 0, c : 0, d : 0}

enum choices {
    a = "a",
    b = "b",
    c = "c",
    d = "d"
}

function updateProba(properties : choices[], message : string){
    for (const prop of properties) {
        messages[prop] = messages[prop] ? message : messages[prop];
        probabilities[prop] = -1000;
}

}
export default function calculateResult(data : any){
    const surveyResult = {result : "res", observation : "obs"}
    if (data.implication == 'Item 1'){
        updateProba([choices.b, choices.c, choices.d], "Implication financière moyenne");
    }
    else
        probabilities.a = -1000;
    if (data.hmd == 'Item 1'){
        updateProba([choices.b, choices.c, choices.d], "Hygiène, degré de motivation et disponibilité: Moyen");
    }
    else if (data.hmd == 'Item 2'){
        updateProba([choices.a, choices.d], "Hygiène, degré de motivation et disponibilité: Bon");
    }else
        updateProba([choices.a], "Hygiène, degré de motivation et disponibilité: Très bon");
    if (data.had == 'Item 1')
        updateProba([choices.d], "Présence d'habitudes alco-tabagiques");
    if (data.pathologies == 'Item 2'){
        if (data.ci == 'Item 1'){
            probabilities.a += 12;
            probabilities.b += 12;
            probabilities.c += 12;
            probabilities.c += 6;
        }else {
            if (data.ciabs == 'Item 1') {
                updateProba([choices.b, choices.c], "CI absolues TTT endo");
            } else {
                updateProba([choices.d], "CI absolues à la chirurgie");
            }
        }
    }
    if (data.dsupport == 'Item 1'){
        if (data.mcoronaire == 'Item 1') {
            probabilities.a += 12;
            probabilities.d += 12;
            probabilities.b -= 12;
            probabilities.c -= 12;
        }else if (data.mcoronaire == 'Item 3') {
            probabilities.c += 12;
            probabilities.d += 12;
            probabilities.a -= 12;
            probabilities.b -= 12;
        }else {
            if (data.mcoronairedefavorable == 'Item 1') {
                probabilities.a += 12;
                probabilities.d += 12;
                probabilities.b -= 12;
                probabilities.c -= 12;
            }else {
                probabilities.b += 12;
                probabilities.d += 12;
                probabilities.a -= 12;
                probabilities.c -= 12;
            }
        }
    }else if (data.dsupport == 'Item 2'){
        if (data.dsupportdelabree == 'Item 1'){
            probabilities.a += 4;
            probabilities.d += 4;
            probabilities.b -= 4;
            probabilities.c -= 4;
        }else if(data.dsupportdelabree == 'Item 2'){
            probabilities.a += 12;
            probabilities.d += 12;
            probabilities.b -= 12;
            probabilities.c -= 12;
        }else if (data.dsupportdelabree == 'Item 3'){
            probabilities.a += 16;
            probabilities.d += 16;
            probabilities.b -= 16;
            probabilities.c -= 16;
        }else {
            probabilities.a = -1000;
            probabilities.b = -1000;
            probabilities.c = -1000;
            updateProba([choices.a, choices.b, choices.c], "Dent support délabrée très important (extraction)")
        }
    }else {
        probabilities.a += 4;
        probabilities.b += 8;
        probabilities.c -= 8;
        probabilities.d -= 8;
    }
    if (data.malveolaire == 'Item 2')
        updateProba([choices.c], "Morphologie alvéolaire au tour de la dent support défavorable")
    if (data.osteomuqueuses == 'Item 2'){
        probabilities.c += 10;
        probabilities.d += 10;
        probabilities.a += 10;
        probabilities.b += 10;
    }
    // Structures d'appui secondaires
    if (data.speriphzneutre == 'Item 1'){
        probabilities.a += 10;
        probabilities.b += 10;
        probabilities.c -= 10;
        probabilities.d -= 10;
    }else{
        probabilities.c += 10;
        probabilities.d += 10;
        probabilities.a -= 10;
        probabilities.b -= 10;
    }
    if (data.atm == 'Item 2'){
        probabilities.c += 12;
        probabilities.d += 12;
        probabilities.a -= 12;
        probabilities.b -= 12;
    }
    // Donnés esthétiques
    if (data.zretrait == 'Item 1'){
        probabilities.a += 6;
        probabilities.b += 12;
        probabilities.d += 12;
        probabilities.c -= 12;
    }else{
        probabilities.d += 8;
        probabilities.d += 8;
    }
    if (data.disolee == 'Item 1'){
        probabilities.c += 10;
        probabilities.d += 10;
        probabilities.a -= 10;
        probabilities.b -= 10;
    }
    if (data.ka == 'Item 1'){
        probabilities.b += 10;
        probabilities.d += 10;
        probabilities.a -= 10;
        probabilities.c -= 10;
    }
    if (data.maldia == 'Item 1'){
        probabilities.a += 6;
        probabilities.d += 6;
        probabilities.c -= 6;
        probabilities.b -= 6;
    }else
        updateProba([choices.a], "Malposition et diastèmes PF")
    // Données occluso-fonctionnelles
    if (data.ouvbuccale == 'Item 2'){
        probabilities.a += 16;
        probabilities.b += 16;
        probabilities.c += 16;
        probabilities.d -= 16;
    }else if (data.ouvbuccale == 'Item 3'){
        updateProba([choices.b, choices.c, choices.d], "Ouveture buccale très limitée")
    }
    if (data.dyo == 'Item 2'){
        updateProba([choices.a, choices.c, choices.d], "DYO sous-évaluée")
    }else if (data.dyo == 'Item 3'){
        if (data.mamelaire == 'Item 1'){
            probabilities.a += 4;
            probabilities.b -= 4;
            probabilities.c -= 4;
            probabilities.d -= 4;
        }else{
            probabilities.b += 16;
            probabilities.c += 16;
            probabilities.a -= 16;
            probabilities.d -= 16;
        }
    }
    if (data.dim == 'Item 1'){
        probabilities.a += 4;
        probabilities.d += 4;
        probabilities.b -= 4;
        probabilities.c -= 4;
    }else{
        updateProba([choices.c], "DIM instable")
    }
    if (data.arcade == 'Item 1'){
        probabilities.a += 4;
        probabilities.b -= 4;
        probabilities.c -= 4;
        probabilities.d -= 4;
    }else if (data.antagoniste == 'Item 2'){
        probabilities.c += 14;
        probabilities.d += 14;
        probabilities.a -= 14;
        probabilities.b -= 14;
    }else{
        updateProba([choices.a, choices.b], "Arcade antagoniste PFIP");
    }
    // Données complémentaires
    if (data.mradiculaire == 'Item 2'){
        updateProba([choices.b, choices.c], "Morphologie radiculaire défavorable (Extraction)");
    }
    if (data.ccrc == 'Item 1'){
        probabilities.a += 4;
        probabilities.b += 4;
        probabilities.d += 4;
        probabilities.c -= 4;
    }else if (data.ccrc == 'Item 2'){
        probabilities.c += 16;
        probabilities.d += 16;
        probabilities.a -= 16;
        probabilities.b -= 16;
    }else {
        updateProba([choices.b, choices.c], "CC/RC dent support très défavorable (Extraction)");
    }
    if (data.vosseux == 'Item 2'){
        probabilities.a += 16;
        probabilities.b += 16;
        probabilities.c += 16;
        probabilities.d += 8;
    }
    if (data.qosseux == 'Item 2'){
        updateProba([choices.b, choices.c], "Qualité osseuse défavorable");
    }
    // Données analyse articulateur
    if (data.pocclusion == 'Item 1'){
        probabilities.a += 4;
        probabilities.d += 4;
        probabilities.c -= 4;
        probabilities.b -= 4;
    }else{
        if (data.tperturbations == 'Item 1'){
            probabilities.a += 8;
            probabilities.d += 8;
            probabilities.c -= 4;
            probabilities.b -= 4;
        }else{
            if (data.ddf == 'Item 2')
                updateProba([choices.a], "Plan d'occlusion: perturbations importantes non DDF");
        }
    }
    if (data.eprothetique == 'Item 2'){
        updateProba([choices.b, choices.c, choices.d], "Espace prothétique insuffisant");
    }
    if (data.aic == 'Item 2'){
        probabilities.c += 16;
        probabilities.d += 16;
        probabilities.a -= 16;
        probabilities.b -= 16;
    }
    // Données analyse sur paralléliseur
    if (data.zdr == 'Item 3'){
        if (data.zdrdefavorable == 'Item 2'){
            updateProba([choices.a], "Zone de retrait défavorable PF");
        }
        else{
            probabilities.a += 12;
            probabilities.d += 12;
            probabilities.c -= 12;
            probabilities.b -= 12;
        }
    }else if (data.zdr == 'Item 1'){
        probabilities.a += 4;
        probabilities.d += 4;
        probabilities.b -= 4;
        probabilities.c -= 4;
    }else {
        probabilities.a += 8;
        probabilities.d += 8;
        probabilities.b -= 8;
        probabilities.c -= 8;
    }
    if (data.sgc == 'Item 1'){
        probabilities.a += 4;
        probabilities.d += 4;
        probabilities.b -= 4;
        probabilities.c -= 4;
    }else if (data.sgc == 'Item 2'){
        probabilities.a += 8;
        probabilities.d += 8;
        probabilities.b -= 8;
        probabilities.c -= 8;
    }else {
        if (data.sgcdefav == 'Item 2') {
            updateProba([choices.a], "Surfaces de guidage et de calage défavorables PF");
        }else{
            probabilities.a += 12;
            probabilities.d += 12;
            probabilities.b -= 12;
            probabilities.c -= 12;
        }
    }
    console.log(probabilities);
    return {probabilities, messages};
}
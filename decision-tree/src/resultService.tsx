export default function calculateResult(data : any){
    const surveyResult = {result : "res", observation : "obs"}
    const probabilities = {a : 0, b : 0, c : 0, d : 0}
    if (data.implication == 'Item 1'){
        probabilities.b = -1000;
        probabilities.c = -1000;
        probabilities.d = -1000;
    }
    else
        probabilities.a = -1000;
    if (data.hmd == 'Item 1'){
        probabilities.b = -1000;
        probabilities.c = -1000;
        probabilities.d = -1000;
    }
    else if (data.hmd == 'Item 2'){
        probabilities.a = -1000;
        probabilities.d = -1000;
    }else
        probabilities.a = -1000;
    if (data.had == 'Item 1')
        probabilities.d = -1000;
    if (data.pathologies == 'Item 2'){
        if (data.ciabs == 'Item 1') {
            probabilities.b = -1000;
            probabilities.c = -1000;
        } else {
            probabilities.d = -1000;
        }
    }
    if (data.malveolaire == 'Item 2')
        probabilities.c = -1000;
    if (data.dim == 'Item 2')
        probabilities.c = -1000;
    if (data.ccrc == 'Item 12'){
        probabilities.b = -1000;
        probabilities.c = -1000;
    }
    if (data.qosseux == 'Item 2'){
        probabilities.d = -1000;
    }
    if (data.ddf == 'Item 2'){
        probabilities.a = -1000;
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
        }
    }else {
        probabilities.b += 8;
        probabilities.c -= 8;
        probabilities.d -= 8;
    }
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
        probabilities.a = -1000;
    // Données occluso-fonctionnelles
    if (data.ouvbuccale == 'Item 2'){
        probabilities.a += 16;
        probabilities.b += 16;
        probabilities.c += 16;
        probabilities.d -= 16;
    }else if (data.ouvbuccale == 'Item 3'){
        probabilities.b = -1000;
        probabilities.c = -1000;
        probabilities.d = -1000;
    }
    if (data.dyo == 'Item 2'){
        probabilities.a = -1000;
        probabilities.c = -1000;
        probabilities.d = -1000;
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
        probabilities.c = -1000;
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
        probabilities.c = -1000;
        probabilities.d = -1000;
    }
    // Données complémentaires
    if (data.mradiculaire == 'Item 2'){
        probabilities.b = -1000;
        probabilities.c = -1000;
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
        probabilities.c = -1000;
        probabilities.b = -1000;
    }
    if (data.vosseux == 'Item 2'){
        probabilities.a += 16;
        probabilities.b += 16;
        probabilities.c += 16;
    }
    if (data.qosseux == 'Item 2'){
        probabilities.d = -1000;
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
                probabilities.a = -1000;
        }
    }
    if (data.eprothetique == 'Item 2'){
        probabilities.b = -1000;
        probabilities.c = -1000;
        probabilities.d = -1000;
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
            probabilities.a = -1000;
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
            probabilities.a = -1000;
        }else{
            probabilities.a += 12;
            probabilities.d += 12;
            probabilities.b -= 12;
            probabilities.c -= 12;
        }
    }
    console.log(probabilities);
    return surveyResult;
}
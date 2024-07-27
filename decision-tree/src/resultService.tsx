const messages = {a : "", b : "", c : "", d : ""};
const probabilities = {a : 100, b : 100, c : 100, d : 100}

enum choices {
  b = "b",
  a = "a",
  c = "c",
  d = "d"
}

function updateProba(properties : choices[], message : string){
  for (const prop of properties) {
    messages[prop] = message;
    probabilities[prop] = -1000;
  }

}
export default function calculateResult(data : any){
  if (data.implication == 'Item 1'){
    updateProba([choices.b, choices.c, choices.d], "Implication financière moyenne");
  }
  if (data.hmd == 'Item 1'){
    updateProba([choices.b, choices.c, choices.d], "Hygiène, degré de motivation et disponibilité: Moyen");
  }else if (data.hmd == 'Item 2'){
    updateProba([choices.d], "Hygiène, degré de motivation et disponibilité: Bon");
  }
  if (data.hat == 'Item 1'){
    updateProba([choices.d], "Présence d'habitudes alco-tabagiques");
  }
  if (data.pathologies == 'Item 2'){
    if (data.ci == 'Item 1'){
      probabilities.a += 12;
      probabilities.b += 12;
      probabilities.c += 12;
      probabilities.c += 6;
    }else {
      if (data.ciabs == 'Item 1') {
        updateProba([choices.b, choices.c], "CI absolues TTT endo");
      }else if (data.ciabs != null)
        updateProba([choices.d], "CI absolues à la chirurgie");
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
      }else if (data.mcoronairedefavorable != null){
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
    }else if (data.dsupportdelabree != null){
      probabilities.a = -1000;
      probabilities.b = -1000;
      probabilities.c = -1000;
      updateProba([choices.a, choices.b, choices.c], "Dent support délabrée très important (extraction)")
    }
  }else if (data.dsupport != null){
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
  }else if (data.speriphzneutre != null){
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
  }else if (data.zretrait != null){
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
  }else if (data.maldia != null)
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
    }else if (data.mamelaire != null){
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
  }else if (data.dim != null){
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
  }else if (data.antagoniste != null){
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
  }else if (data.ccrc != null){
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
    }else if (data.ddf == 'Item 2')
      updateProba([choices.a], "Plan d'occlusion: perturbations importantes non DDF");
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
    else if (data.zdrdefavorable != null){
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
  }else if (data.zdr != null){
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
    }else if (data.sgcdefav != null){
      probabilities.a += 12;
      probabilities.d += 12;
      probabilities.b -= 12;
      probabilities.c -= 12;
    }
  }
  console.log(probabilities);
  console.log(messages);
  return {probabilities, messages};
}

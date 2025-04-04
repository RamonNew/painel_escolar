function AbreviaUC({nomeUC}) {
  nomeUC = nomeUC.toUpperCase();
    const pieces = nomeUC.split(" ");
    if (pieces.length <= 2) {
      return nomeUC; // Retorna o nome se for apenas uma palavra
    }
    const abrev = pieces[0].substring(0, 4);
    // Remove os dois últimos elementos do array
    pieces.splice(-2, 2);
    return abrev + ". " + pieces.pop();
}

export default AbreviaUC;
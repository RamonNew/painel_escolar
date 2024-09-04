function Ambiente({nomeAmbiente}) {
    nomeAmbiente = nomeAmbiente.toUpperCase();
    const pieces = nomeAmbiente.split("-");
    if (pieces.length <= 2) {
      return nomeAmbiente; // Retorna o nome se não houver prefixo suficiente para remover
    }
    // Remove os dois primeiros elementos do array
    pieces.shift();
    pieces.shift();
    return pieces.join("-");
}

export default Ambiente
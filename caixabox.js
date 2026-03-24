// Função para criar uma caixa no mapa
function spawnBox(tipo, x, y) {
    const box = {
        type: tipo,
        posX: x,
        posY: y,
        collected: false
    };

    console.log(`Uma caixa de ${tipo} apareceu em X:${x} Y:${y}!`);
    return box;
}

// O que acontece quando o jogador encosta na caixa
function onCollectBox(player, box) {
    if (box.type === "ammo") {
        player.ammo += 50; 
        if (player.isInfiniteAmmo) player.ammo = 9999; // Se for o admin222
    } 
    else if (box.type === "level") {
        meuAdmin.subirNivel(); // Usa aquela função que criamos antes!
    }
    console.log(`Você pegou uma caixa de ${box.type}!`);
}
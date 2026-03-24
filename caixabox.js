// --- 1. CONFIGURAÇÕES DO JOGADOR ---
let player = {
    user: "admin222", // Mude aqui para testar o acesso
    level: 1,
    money: 0,
    weapon: "Pistola",
    ammo: 100,
    isSandbox: false,
    isInfiniteAmmo: false,
    pos: { x: 0, y: 0 }
};

// --- 2. BANCO DE DADOS DE ARMAS ---
const arsenal = {
    1: "Pistola",
    2: "Submetralhadora",
    3: "Rifle de Assalto",
    4: "Escopeta",
    5: "Bazuca de Nível Especial"
};

// --- 3. SISTEMA DE CAIXAS (DROPS) ---
let activeBoxes = [];

function spawnBox(type, x, y) {
    const newBox = { type, x, y, id: Date.now() };
    activeBoxes.push(newBox);
    console.log(`📦 Caixa de ${type} spawnada em [${x}, ${y}]`);
}

// --- 4. LÓGICA DO JOGO (COLETA E COMBATE) ---
function collectBox(boxId) {
    const boxIndex = activeBoxes.findIndex(b => b.id === boxId);
    if (boxIndex !== -1) {
        const box = activeBoxes[boxIndex];
        
        if (box.type === "money") player.money += 100;
        if (box.type === "ammo") player.ammo += 50;
        if (box.type === "level") adminSystem.subirNivel();

        activeBoxes.splice(boxIndex, 1); // Remove a caixa do mapa
        console.log(`✅ Coletou: ${box.type}. Status: Lvl ${player.level}, Money ${player.money}`);
    }
}

// --- 5. PAINEL DE ADMIN (EXCLUSIVO admin222) ---
const adminSystem = {
    checkAccess: function() {
        return player.user === "admin222";
    },

    subirNivel: function() {
        if (!this.checkAccess()) return console.log("❌ Acesso negado!");
        player.level++;
        player.weapon = arsenal[player.level] || "Arma Suprema";
        console.log(`⭐ Nível UP! Nova arma: ${player.weapon}`);
    },

    dinheiroInfinito: function() {
        if (!this.checkAccess()) return;
        player.money = Infinity;
        console.log("💰 DINHEIRO INFINITO ATIVADO!");
    },

    modoSandbox: function() {
        if (!this.checkAccess()) return;
        player.isSandbox = !player.isSandbox;
        console.log(`🛠️ MODO SANDBOX: ${player.isSandbox ? "LIGADO" : "DESLIGADO"}`);
    },

    municaoInfinita: function() {
        if (!this.checkAccess()) return;
        player.isInfiniteAmmo = !player.isInfiniteAmmo;
        player.ammo = 999999;
        console.log("🔫 MUNIÇÃO INFINITA ATIVADA!");
    },

    spawnCustomBox: function(tipo) {
        if (!this.checkAccess()) return;
        spawnBox(tipo, player.pos.x + 10, player.pos.y);
    }
};

// --- EXEMPLO DE USO NO CONSOLE ---
// adminSystem.subirNivel();
// adminSystem.dinheiroInfinito();
// adminSystem.spawnCustomBox("level");
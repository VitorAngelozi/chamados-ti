// Alternar entre modo escuro e claro
function toggleDarkMode() {
    document.body.classList.toggle("light-mode");
}

// Mostrar formulário de abertura de chamado
function mostrarFormulario() {
    document.getElementById("formularioChamado").style.display = "block";
    document.getElementById("meusChamados").style.display = "none";
}

// Mostrar lista de chamados
function mostrarChamados() {
    document.getElementById("formularioChamado").style.display = "none";
    document.getElementById("meusChamados").style.display = "block";
    carregarChamados();
}

// Abrir um novo chamado e salvar no LocalStorage
function abrirChamado() {
    const setor = document.getElementById("setor").value;
    const sala = document.getElementById("sala").value.trim();
    const descricao = document.getElementById("descricao").value.trim();

    if (!descricao) {
        alert("Por favor, insira uma descrição do problema.");
        return;
    }

    let chamados = JSON.parse(localStorage.getItem("chamados")) || [];
    
    const chamado = {
        setor,
        sala: sala || "N/A",
        descricao,
        status: "Aberto"
    };

    chamados.push(chamado);
    localStorage.setItem("chamados", JSON.stringify(chamados));

    alert("Chamado aberto com sucesso!");
    document.getElementById("formChamado").reset();
}

// Carregar e exibir os chamados na lista
function carregarChamados() {
    const listaChamados = document.getElementById("listaChamados");
    listaChamados.innerHTML = "";

    let chamados = JSON.parse(localStorage.getItem("chamados")) || [];

    chamados.forEach((chamado, index) => {
        const chamadoElemento = document.createElement("li");
        chamadoElemento.classList.add("chamado");

        chamadoElemento.innerHTML = `
            <strong>📍 ${chamado.setor} - Sala ${chamado.sala}</strong>
            <p>📝 ${chamado.descricao}</p>
            <span class="status ${chamado.status === 'Aberto' ? 'aberto' : 'resolvido'}">${chamado.status}</span>
            ${chamado.status === "Aberto" ? `<button onclick="resolverChamado(${index})">✅ Resolver</button>` : ""}
        `;

        listaChamados.appendChild(chamadoElemento);
    });
}

// Resolver chamado
function resolverChamado(index) {
    let chamados = JSON.parse(localStorage.getItem("chamados")) || [];
    
    if (chamados[index]) {
        chamados[index].status = "Resolvido";
        localStorage.setItem("chamados", JSON.stringify(chamados));
        carregarChamados();
    }
}

// Adicionar data e hora ao abrir um chamado
function abrirChamado() {
    const setor = document.getElementById("setor").value;
    const sala = document.getElementById("sala").value.trim();
    const descricao = document.getElementById("descricao").value.trim();
    const dataHora = new Date().toLocaleString("pt-BR");

    if (!descricao) {
        alert("Por favor, insira uma descrição do problema.");
        return;
    }

    let chamados = JSON.parse(localStorage.getItem("chamados")) || [];
    
    const chamado = {
        setor,
        sala: sala || "N/A",
        descricao,
        status: "Aberto",
        dataHora
    };

    chamados.push(chamado);
    localStorage.setItem("chamados", JSON.stringify(chamados));

    alert("Chamado aberto com sucesso!");
    document.getElementById("formChamado").reset();
}

// Exibir chamados na lista
function carregarChamados() {
    const listaChamados = document.getElementById("listaChamados");
    listaChamados.innerHTML = "";

    let chamados = JSON.parse(localStorage.getItem("chamados")) || [];

    chamados.forEach((chamado, index) => {
        const chamadoElemento = document.createElement("li");
        chamadoElemento.classList.add("chamado");

        chamadoElemento.innerHTML = `
            <strong>📍 ${chamado.setor} - Sala ${chamado.sala}</strong>
            <p>📝 ${chamado.descricao}</p>
            <span class="status ${chamado.status === 'Aberto' ? 'aberto' : 'resolvido'}">${chamado.status}</span>
            <p>📅 ${chamado.dataHora}</p>
            ${chamado.status === "Aberto" ? `<button onclick="resolverChamado(${index})">✅ Resolver</button>` : ""}
            <button onclick="excluirChamado(${index})">🗑️ Excluir</button>
        `;

        listaChamados.appendChild(chamadoElemento);
    });
}

// Excluir chamado
function excluirChamado(index) {
    let chamados = JSON.parse(localStorage.getItem("chamados")) || [];

    if (confirm("Tem certeza que deseja excluir este chamado?")) {
        chamados.splice(index, 1);
        localStorage.setItem("chamados", JSON.stringify(chamados));
        carregarChamados();
    }
}
// Armazena os dados em memória
let funcionarios = [];
let produtos = [];

// ------------------- Cadastro de Funcionários -------------------
const formFuncionario = document.getElementById("formFuncionario");
if (formFuncionario) {
  const lista = document.getElementById("listaFuncionarios");

  formFuncionario.addEventListener("submit", function (e) {
    e.preventDefault();

    const nome = document.getElementById("nomeFuncionario").value;
    const cargo = document.getElementById("cargoFuncionario").value;
    const id = document.getElementById("idFuncionario").value;

    const funcionario = { nome, cargo, id };
    funcionarios.push(funcionario);

    const item = document.createElement("li");
    item.textContent = `ID: ${id} - ${nome} (${cargo})`;
    lista.appendChild(item);

    formFuncionario.reset();
  });
}

// ------------------- Controle de Estoque -------------------
const formProduto = document.getElementById("formProduto");
if (formProduto) {
  const lista = document.getElementById("listaProdutos");

  formProduto.addEventListener("submit", function (e) {
    e.preventDefault();

    const nome = document.getElementById("nomeProduto").value;
    const quantidade = parseInt(document.getElementById("quantidadeProduto").value);
    const preco = parseFloat(document.getElementById("precoProduto").value);

    const produto = { nome, quantidade, preco };
    produtos.push(produto);

    const item = document.createElement("li");
    item.textContent = `${nome} - ${quantidade} unidades - R$ ${preco.toFixed(2)}`;
    lista.appendChild(item);

    formProduto.reset();
  });
}

// ------------------- Registro de Vendas -------------------
const formVenda = document.getElementById("formVenda");
if (formVenda) {
  const selectFuncionario = document.getElementById("funcionarioVenda");
  const selectProduto = document.getElementById("produtoVenda");
  const mensagem = document.getElementById("mensagemVenda");

  // Preencher os selects com dados simulados (teste)
  // Em projeto real, os dados viriam de um banco de dados ou localStorage
  funcionarios.forEach(func => {
    const option = document.createElement("option");
    option.value = func.id;
    option.textContent = `${func.nome} (${func.cargo})`;
    selectFuncionario.appendChild(option);
  });

  produtos.forEach(prod => {
    const option = document.createElement("option");
    option.value = prod.nome;
    option.textContent = `${prod.nome} - ${prod.quantidade} un`;
    selectProduto.appendChild(option);
  });

  formVenda.addEventListener("submit", function (e) {
    e.preventDefault();

    const nomeProduto = selectProduto.value;
    const quantidadeVendida = parseInt(document.getElementById("quantidadeVendida").value);

    const produto = produtos.find(p => p.nome === nomeProduto);

    if (!produto) {
      mensagem.textContent = "Produto não encontrado.";
      mensagem.style.color = "red";
      return;
    }

    if (quantidadeVendida > produto.quantidade) {
      mensagem.textContent = "Estoque insuficiente.";
      mensagem.style.color = "red";
    } else {
      produto.quantidade -= quantidadeVendida;
      mensagem.textContent = `Venda registrada com sucesso! Estoque atualizado: ${produto.quantidade} unidades restantes.`;
      mensagem.style.color = "green";
    }

    formVenda.reset();
  });
}

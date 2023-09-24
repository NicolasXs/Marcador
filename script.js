// Função para salvar os dados no localStorage
function salvar() {
  const url = document.getElementById("url").value;
  const url_image = document.getElementById("url_image").value;
  const capitulo = document.getElementById("capitulo").value;
  const nome = document.getElementById("nome").value;

  // Verifique se já existe um array de dados no localStorage
  let dadosArray = JSON.parse(localStorage.getItem("meusDados")) || [];

  // Crie um objeto para armazenar os dados
  const dados = {
    url,
    url_image,
    capitulo,
    nome,
  };

  // Adicione o novo conjunto de dados ao array
  dadosArray.push(dados);

  // Converta o array em uma string JSON
  const dadosJSON = JSON.stringify(dadosArray);

  // Armazene os dados atualizados no localStorage
  localStorage.setItem("meusDados", dadosJSON);

  carregarDadosSalvos();

  console.log("Dados salvos no localStorage:", dados);
}

// Função para carregar os dados salvos do localStorage
function carregarDadosSalvos() {
  // Verifique se existe um array de dados no localStorage
  const dadosJSON = localStorage.getItem("meusDados");

  if (dadosJSON) {
    // Se os dados existirem, analise-os de volta para um array JavaScript
    const dadosArray = JSON.parse(dadosJSON);

    // Exiba os dados na página
    const cardContainer = document.querySelector(".container");
    cardContainer.innerHTML = "";

    console.log("Dados lidos do localStorage:", dadosArray);

    dadosArray.forEach((dados, index) => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
      <img src="${dados.url_image}" alt="Imagem" />
      <h2>${dados.nome}</h2>
      <a href="${dados.url}" target="_blank">Link do site</a>
      <p>Capítulo: ${dados.capitulo}</p>
      <div class="buttons"> 
      <button class="btnExcluir" onclick="ExcluirDados(${index})">Excluir</button>
      <button id="btnEditar" class="btnEditar" onclick="editarDados(${index})">Editar</button>
      </div>
    `;
      cardContainer.appendChild(card);
    });
  }
}

function editarDados(index) {
  const dadosJSON = localStorage.getItem("meusDados");
  if (dadosJSON) {
    const dadosArray = JSON.parse(dadosJSON);
    const dados = dadosArray[index];

    // Rola a página para o topo
    window.scrollTo(0, 0);

    // Preencha o formulário de edição com os dados atuais
    document.getElementById("edit_url").value = dados.url;
    document.getElementById("edit_url_image").value = dados.url_image;
    document.getElementById("edit_capitulo").value = dados.capitulo;
    document.getElementById("edit_nome").value = dados.nome;

    // Mostre o formulário de edição
    document.querySelector(".edit-form").style.display = "block";

    // Crie uma função para salvar as edições
    document.getElementById("edit_button").onclick = function () {
      // Atualize os dados no array
      dados.url = document.getElementById("edit_url").value;
      dados.url_image = document.getElementById("edit_url_image").value;
      dados.capitulo = document.getElementById("edit_capitulo").value;
      dados.nome = document.getElementById("edit_nome").value;

      // Atualize os dados no localStorage
      dadosArray[index] = dados;
      localStorage.setItem("meusDados", JSON.stringify(dadosArray));

      // Atualize a exibição na página
      carregarDadosSalvos();

      // Oculte o formulário de edição
      document.querySelector(".edit-form").style.display = "none";
    };
  }
}

function ExcluirDados(index) {
  const dadosJSON = localStorage.getItem("meusDados");
  if (dadosJSON) {
    const dadosArray = JSON.parse(dadosJSON);
    dadosArray.splice(index, 1);
    localStorage.setItem("meusDados", JSON.stringify(dadosArray));
    carregarDadosSalvos();
  }
}

// Chame a função para carregar os dados quando a página for carregada
document.addEventListener("DOMContentLoaded", carregarDadosSalvos);

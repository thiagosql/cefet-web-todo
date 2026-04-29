// Exercício 0: Vetor de tarefas com objetos
const tarefas = [
  { nome: 'Comprar leite', categoria: 'compras', realizada: false },
  { nome: 'Escutar chimbinha', categoria: 'lazer', realizada: true },
];

// Exercício 1: Insere uma tarefa na página
function insereTarefaNaPagina(tarefa) {
  const lista = document.querySelector('#lista-tarefas');

  const li = document.createElement('li');
  li.classList.add('item-tarefa');
  li.classList.add(`categoria-${tarefa.categoria}`);

  if (tarefa.realizada) {
    li.classList.add('marcado');
  }

  li.textContent = tarefa.nome;

  // Exercício Opcional 5: clique alterna tarefa como realizada
  li.addEventListener('click', () => {
    tarefa.realizada = !tarefa.realizada;
    li.classList.toggle('marcado');
  });

  lista.appendChild(li);
}

// Carrega todas as tarefas do vetor na página
function carregaTarefas() {
  const lista = document.querySelector('#lista-tarefas');

  // Remove os filhos existentes antes de popular
  lista.innerHTML = '';

  tarefas.forEach(insereTarefaNaPagina);
}

// Exercício 2: Inclui nova tarefa ao clicar no botão
function incluiNovaTarefa() {
  const nomeInput = document.querySelector('#nova-tarefa-nome');
  const categoriaSelect = document.querySelector('#nova-tarefa-categoria');

  const nome = nomeInput.value.trim();
  if (!nome) return; // não adiciona tarefa vazia

  const novaTarefa = {
    nome: nome,
    categoria: categoriaSelect.value,
    realizada: false,
  };

  tarefas.push(novaTarefa);
  insereTarefaNaPagina(novaTarefa);

  // Limpa o campo e devolve o foco
  nomeInput.value = '';
  nomeInput.focus();

  // Reaplica o filtro após inserir, se houver algum ativo
  aplicaFiltro();
}

// Opcional 3: Filtra itens por categoria
function aplicaFiltro() {
  const filtro = document.querySelector('#filtro-de-categoria').value;
  const itens = document.querySelectorAll('.item-tarefa');

  itens.forEach((item) => {
    if (filtro === '' || item.classList.contains(`categoria-${filtro}`)) {
      item.classList.remove('retido-no-filtro');
    } else {
      item.classList.add('retido-no-filtro');
    }
  });
}

// Registra os eventos
document.querySelector('#incluir-nova-tarefa').addEventListener('click', incluiNovaTarefa);

// Opcional 4: Enter no campo de texto inclui a tarefa
document.querySelector('#nova-tarefa-nome').addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    incluiNovaTarefa();
  }
});

// Opcional 3: muda filtro ao alterar o select
document.querySelector('#filtro-de-categoria').addEventListener('change', aplicaFiltro);

// Inicia carregando as tarefas existentes
carregaTarefas();
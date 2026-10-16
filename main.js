const WHATSAPP = '55SEUNUMERO';

const PROJETOS = [
  {
    titulo: 'Dra. Rayssa Fernandes',
    tipo: 'site institucional',
    descricao: 'Pacientes precisavam conhecer a médica e confiar no atendimento antes mesmo da primeira consulta. O site apresenta a Dra. Rayssa, explica doenças e tratamentos, reúne depoimentos e leva direto ao agendamento.',
    imagem: 'assets/projeto-rayssa.webp',
    alt: 'Página inicial do site da Dra. Rayssa Fernandes, em tons de roxo',
    link: 'https://rayssafernandesreumato.com.br/'
  },
  {
    titulo: 'Cultivato Ambiental',
    tipo: 'landing page',
    descricao: 'Licenciamento, PGRS, outorga: serviços técnicos difíceis de explicar em poucas palavras. A página traduz cada um em linguagem simples, mostra o passo a passo do atendimento e deixa o orçamento a um clique, no WhatsApp.',
    imagem: 'assets/projeto-cultivato.webp',
    alt: 'Página inicial do site da Cultivato Ambiental, em verde, com um técnico de capacete e prancheta',
    link: 'https://cultivato.com.br/'
  },
  {
    titulo: 'Nova Acabamentos',
    tipo: 'site institucional',
    descricao: 'Uma loja de Medianeira com mais de dez linhas de produto, do piso vinílico à grama sintética. Organizei tudo com uma página para cada produto, depoimentos, fotos de antes e depois e orçamento rápido pelo WhatsApp.',
    imagem: 'assets/projeto-nova.webp',
    alt: 'Seção de produtos do site da Nova Acabamentos, com piso vinílico, boiserie e rodapé',
    link: 'https://novaacabamentos.com/'
  }
];

const CONSELHOS = [
  'Testa no celular antes de entregar. Eu tô de olho.',
  'Botão de WhatsApp grande e visível. Confia na sócia.',
  'Site lento ninguém espera carregar. Nem eu espero o sachê.',
  'Menos texto, mais clareza. Miau.',
  'Já salvou o arquivo? Salva de novo.',
  'Hora da pausa. De preferência com petisco.',
  'Cliente feliz, site no ar, gata alimentada. Nessa ordem? Não.'
];

const dominio = (url) => new URL(url).hostname.replace(/^www\./, '');

function criarCapa({ titulo, imagem, alt }) {
  if (imagem) return `<img src="${imagem}" alt="${alt}" loading="lazy">`;
  return `<div class="capa" role="img" aria-label="${alt}"><span class="rabisco">${titulo}</span></div>`;
}

function criarProjeto(projeto) {
  const { titulo, tipo, descricao, link } = projeto;
  return `
    <article class="projeto">
      <a class="navegador" href="${link}" target="_blank" rel="noopener" aria-label="Abrir o site ${titulo} em nova aba">
        <div class="navegador-barra" aria-hidden="true">
          <div class="navegador-bolinhas"><span></span><span></span><span></span></div>
          <div class="navegador-url">${dominio(link)}</div>
        </div>
        ${criarCapa(projeto)}
      </a>
      <p class="projeto-tipo">${tipo}</p>
      <h3>${titulo}</h3>
      <p>${descricao}</p>
      <a class="projeto-link" href="${link}" target="_blank" rel="noopener">Visitar o site</a>
    </article>
  `;
}

function renderizarProjetos() {
  const lista = document.getElementById('lista-projetos');
  if (!lista) return;

  lista.innerHTML = PROJETOS.map(criarProjeto).join('') + `
    <div class="projeto-vazio">
      <p class="rabisco">o próximo pode ser o seu</p>
      <p>Me conta sua ideia, mesmo que ela ainda esteja só na cabeça. A gente tira do papel juntos.</p>
      <a class="botao" href="#contato">Pedir orçamento</a>
    </div>
  `;
}

function iniciarMenu() {
  const botao = document.querySelector('.menu-botao');
  const menu = document.getElementById('menu');
  if (!botao || !menu) return;

  const alternar = (aberto) => {
    menu.classList.toggle('aberto', aberto);
    botao.setAttribute('aria-expanded', String(aberto));
    botao.textContent = aberto ? 'Fechar' : 'Menu';
  };

  botao.addEventListener('click', () => alternar(!menu.classList.contains('aberto')));
  menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => alternar(false)));
  document.addEventListener('keydown', (evento) => {
    if (evento.key === 'Escape') alternar(false);
  });
}

function iniciarChecklist() {
  const caderno = document.querySelector('.caderno');
  if (!caderno) return;

  if (!('IntersectionObserver' in window)) {
    caderno.classList.add('visivel');
    return;
  }

  const observador = new IntersectionObserver(([entrada]) => {
    if (!entrada.isIntersecting) return;
    caderno.classList.add('visivel');
    observador.disconnect();
  }, { threshold: 0.4 });

  observador.observe(caderno);
}

function iniciarInox() {
  const botao = document.getElementById('conselho-inox');
  const balao = document.getElementById('balao-inox');
  if (!botao || !balao) return;

  let ultimo = -1;

  botao.addEventListener('click', () => {
    let indice;
    do {
      indice = Math.floor(Math.random() * CONSELHOS.length);
    } while (indice === ultimo);
    ultimo = indice;

    balao.textContent = CONSELHOS[indice];
    balao.hidden = false;
    balao.style.animation = 'none';
    void balao.offsetWidth;
    balao.style.animation = '';
    botao.textContent = 'Outro conselho';
  });
}

function iniciarFormulario() {
  const form = document.getElementById('form-orcamento');
  const erro = document.getElementById('erro-form');
  if (!form || !erro) return;

  const mostrarErro = (campo, mensagem) => {
    erro.textContent = mensagem;
    erro.hidden = false;
    campo.focus();
  };

  form.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const nome = form.nome.value.trim();
    const tipo = form.tipo.value;
    const mensagem = form.mensagem.value.trim();

    if (!nome) return mostrarErro(form.nome, 'Escreva seu nome para continuar.');
    if (!mensagem) return mostrarErro(form.mensagem, 'Conte um pouco da sua ideia para continuar.');

    erro.hidden = true;

    const texto = `Oi, Luna! Meu nome é ${nome}.\nTenho interesse em: ${tipo}.\n\n${mensagem}`;
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(texto)}`, '_blank', 'noopener');
  });
}

document.getElementById('ano').textContent = new Date().getFullYear();
renderizarProjetos();
iniciarMenu();
iniciarChecklist();
iniciarInox();
iniciarFormulario();

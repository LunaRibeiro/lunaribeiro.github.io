// ============================================================
//  CONFIGURAÇÕES — troque aqui
// ============================================================

// Seu WhatsApp com DDI + DDD, só números (ex.: 5545999998888)
const WHATSAPP = '55SEUNUMERO';

// Seus projetos. Para adicionar um novo, copie um bloco { ... } e edite.
const PROJETOS = [
  {
    titulo: 'Dra. Rayssa Fernandes',
    tipo: 'site institucional',
    descricao: 'Site para consultório de reumatologia, com apresentação da médica, atendimentos, depoimentos, dúvidas frequentes e agendamento de consulta.',
    imagem: 'assets/projeto-rayssa.webp',
    alt: 'Página inicial do site da Dra. Rayssa Fernandes, em tons de roxo',
    link: 'https://rayssafernandesreumato.com.br/'
  }
];

// Conselhos da Inox (pode inventar mais!)
const CONSELHOS = [
  'Testa no celular antes de entregar. Eu tô de olho.',
  'Botão de WhatsApp grande e visível. Confia na sócia.',
  'Site lento ninguém espera carregar. Nem eu espero o sachê.',
  'Menos texto, mais clareza. Miau.',
  'Já salvou o arquivo? Salva de novo.',
  'Hora da pausa. De preferência com petisco.',
  'Cliente feliz, site no ar, gata alimentada. Nessa ordem? Não.'
];

// ============================================================
//  Projetos
// ============================================================
function dominio(url) {
  try { return new URL(url).hostname.replace(/^www\./, ''); }
  catch { return url; }
}

function renderizarProjetos() {
  const lista = document.getElementById('lista-projetos');
  if (!lista) return;

  const cartoes = PROJETOS.map((p) => `
    <article class="projeto">
      <a class="navegador" href="${p.link}" target="_blank" rel="noopener" aria-label="Abrir o site ${p.titulo} em nova aba">
        <div class="navegador-barra" aria-hidden="true">
          <div class="navegador-bolinhas"><span></span><span></span><span></span></div>
          <div class="navegador-url">${dominio(p.link)}</div>
        </div>
        <img src="${p.imagem}" alt="${p.alt}" loading="lazy">
      </a>
      <p class="projeto-tipo">${p.tipo}</p>
      <h3>${p.titulo}</h3>
      <p>${p.descricao}</p>
      <a class="projeto-link" href="${p.link}" target="_blank" rel="noopener">Visitar o site</a>
    </article>
  `).join('');

  const vazio = `
    <div class="projeto-vazio">
      <p class="rabisco">o próximo pode ser o seu</p>
      <p>Tem uma ideia de site? Me conta e a gente tira do papel juntos.</p>
      <a class="botao" href="#contato">Pedir orçamento</a>
    </div>
  `;

  lista.innerHTML = cartoes + vazio;
}

// ============================================================
//  Menu no celular
// ============================================================
function iniciarMenu() {
  const botao = document.querySelector('.menu-botao');
  const menu = document.getElementById('menu');
  if (!botao || !menu) return;

  const fechar = () => {
    menu.classList.remove('aberto');
    botao.setAttribute('aria-expanded', 'false');
    botao.textContent = 'Menu';
  };

  botao.addEventListener('click', () => {
    const aberto = menu.classList.toggle('aberto');
    botao.setAttribute('aria-expanded', String(aberto));
    botao.textContent = aberto ? 'Fechar' : 'Menu';
  });

  menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', fechar));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') fechar(); });
}

// ============================================================
//  Checklist "fora do código": marca quando aparece na tela
// ============================================================
function iniciarChecklist() {
  const caderno = document.querySelector('.caderno');
  if (!caderno) return;

  if (!('IntersectionObserver' in window)) {
    caderno.classList.add('visivel');
    return;
  }

  const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        caderno.classList.add('visivel');
        observador.disconnect();
      }
    });
  }, { threshold: 0.4 });

  observador.observe(caderno);
}

// ============================================================
//  Conselho da Inox
// ============================================================
function iniciarInox() {
  const botao = document.getElementById('conselho-inox');
  const balao = document.getElementById('balao-inox');
  if (!botao || !balao) return;

  let ultimo = -1;
  botao.addEventListener('click', () => {
    let i;
    do { i = Math.floor(Math.random() * CONSELHOS.length); } while (i === ultimo && CONSELHOS.length > 1);
    ultimo = i;

    balao.hidden = false;
    balao.textContent = CONSELHOS[i];
    // reinicia a animação do balão
    balao.style.animation = 'none';
    void balao.offsetWidth;
    balao.style.animation = '';
    botao.textContent = 'Outro conselho';
  });
}

// ============================================================
//  Formulário: abre o WhatsApp com a mensagem pronta
// ============================================================
function iniciarFormulario() {
  const form = document.getElementById('form-orcamento');
  const erro = document.getElementById('erro-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nome = form.nome.value.trim();
    const tipo = form.tipo.value;
    const mensagem = form.mensagem.value.trim();

    if (!nome || !mensagem) {
      erro.hidden = false;
      erro.textContent = !nome ? 'Escreva seu nome para continuar.' : 'Conte um pouco da sua ideia para continuar.';
      (!nome ? form.nome : form.mensagem).focus();
      return;
    }
    erro.hidden = true;

    const texto = `Oi, Luna! Meu nome é ${nome}.\nTenho interesse em: ${tipo}.\n\n${mensagem}`;
    const url = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(texto)}`;
    window.open(url, '_blank', 'noopener');
  });
}

// ============================================================
document.getElementById('ano').textContent = new Date().getFullYear();
renderizarProjetos();
iniciarMenu();
iniciarChecklist();
iniciarInox();
iniciarFormulario();

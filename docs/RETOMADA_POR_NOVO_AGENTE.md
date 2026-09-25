# Retomada P0 — Treino Tracker

**Papel responsável:** `Dev | LANCES | Treino Tracker`  
**Tipo:** `PRODUTO`  
**Produto:** Treino Tracker  
**Estado:** `ESTÁVEL`  
**Autoridade documental principal:** `brenofazolo/treino-tracker`  
**Data do checkpoint:** 2026-09-25

## 1. Identidade e autoridades

O Treino Tracker é uma linha de produto PWA estática, hospedada via GitHub Pages, com duas variantes oficiais e dois ambientes de validação.

| Repositório | Papel |
|---|---|
| `brenofazolo/treino-tracker` | variante masculina oficial/produção e autoridade documental principal da linha |
| `brenofazolo/treino-tracker-test` | ambiente de validação masculino |
| `brenofazolo/treino-tracker-feminino` | variante feminina oficial/produção e autoridade de execução da variante feminina |
| `brenofazolo/treino-tracker-feminino-test` | ambiente de validação feminino |

Os repositórios `-test` são ambientes de validação. Eles **não são réplicas integrais nem fontes capazes de substituir produção inteira**.

## 2. Proveniência confirmada neste checkpoint

HEADs observados antes deste checkpoint:

- masculino produção: `ff256c61c1bdb2a4cb5626c5f6ea8bf272e66cad`
- masculino teste: `3fcf9ac3600c76218040aa97477e0629bfb6f40b`
- feminino produção: `8d56c81feec036901396985d226ddca3a7b4c1d4`
- feminino teste: `27ca68520a516d96ecf6907ee17b05644556127d`

A continuidade foi reconstruída por leitura das quatro autoridades GitHub, da governança P0 vigente e do checkpoint histórico produzido pelo Work.

## 3. Fluxo atual teste → promoção

Fluxo seguro vigente:

1. alterar primeiro somente o repositório `-test` da variante;
2. atualizar o identificador de cache do `sw.js` quando houver mudança de assets/comportamento cacheado;
3. aguardar publicação do GitHub Pages;
4. recarregar o PWA mais de uma vez quando necessário para ativar o novo service worker;
5. validar visualmente e testar estados reversíveis;
6. confirmar persistência após recarga;
7. antes de tocar produção, criar proteção adequada quando o risco justificar;
8. promover **somente** os arquivos/regras efetivamente validados;
9. preservar módulos exclusivos de produção;
10. conferir que arquivos protegidos permaneceram intactos.

Promoção não significa copiar o repositório `-test` inteiro para produção.

## 4. Persistência e localStorage

Não há backend próprio confirmado. A persistência é local ao navegador/aparelho.

Chaves protegidas:

- masculino produção: `tt100`
- masculino teste: `tt100_male_test_v106`
- feminino produção: `ttf100`
- feminino teste: `ttf100`
- aparência feminina: `ttf_appearance`
- versão instalada feminina: `ttf_version`

Os registros abrangem sessões, séries, repetições, RPE, carga, equipamento/variação, treinos finalizados e, nas produções com ferramentas de perfil, avaliações corporais e dados correlatos.

### Risco de origem compartilhada no feminino

Os GitHub Pages das variantes feminina produção e teste usam a mesma origem `brenofazolo.github.io` e a mesma chave `ttf100`. Logo, no mesmo navegador, ambos podem acessar o mesmo conjunto de dados locais. `ttf_appearance` e `ttf_version` também são compartilhadas por origem.

Essa característica não deve ser alterada incidentalmente.

## 5. Variante masculina

### Produção — `treino-tracker`

Arquivos críticos atuais:

- `index.html`
- `manifest.json`
- `sw.js`
- `male-enhancements.js`
- `profile-tools.js`
- `lances-theme.js`
- `lances-tech-logo.png`

Cache: `treino-tracker-prod-v7`.

O `sw.js` injeta, nesta ordem:

1. `male-enhancements.js`
2. `profile-tools.js`
3. `lances-theme.js`

`profile-tools.js` é protegido porque substitui/estende as telas completas de Progresso e Configurações, incluindo avaliação corporal, backup/restauração e exportação.

Programa atual protegido:

- Quarta: Peito + Tríceps
- Quinta: Costas + Bíceps
- Sexta: Pernas
- Sábado: Ombros + Trapézio + Core
- Domingo: Upper Hipertrofia

Versão visual atual do `index.html`: V1.03.

### Teste — `treino-tracker-test`

Cache: `treino-tracker-test-v111`.

Chave isolada: `tt100_male_test_v106`.

O `sw.js` injeta:

1. `male-enhancements.js`
2. `lances-theme.js`

O repositório não contém `profile-tools.js`. Portanto, produção masculina possui funções oficiais que o teste não possui. O HTML identifica V1.06 TESTE e `male-enhancements.js` identifica V1.07 TESTE.

## 6. Variante feminina

### Produção — `treino-tracker-feminino`

Arquivos críticos atuais:

- `index.html`
- `manifest.json`
- `sw.js`
- `config-tools.js`
- `history-tools.js`
- `workout-input-tools.js`
- `version-tools.js`
- `block-workout-tools.js`
- `female-enhancements.js`
- `profile-tools.js`
- `lances-theme.js`
- `appearance-tools.js`
- `lances-tech-logo.png`

Cache: `treino-feminino-prod-v7`.

O `sw.js` injeta, nesta ordem:

1. `config-tools.js`
2. `history-tools.js`
3. `workout-input-tools.js`
4. `version-tools.js`
5. `block-workout-tools.js`
6. `female-enhancements.js`
7. `profile-tools.js`
8. `lances-theme.js`
9. `appearance-tools.js`

A ordem é funcionalmente relevante. `block-workout-tools.js` substitui o programa base; `profile-tools.js` substitui Progresso/Configurações; `appearance-tools.js` deve vir depois para envolver a configuração final e inserir o seletor de aparência.

Programa efetivo protegido em `block-workout-tools.js`:

- Quarta — Treino A: Glúteos + costas + tríceps
- Quinta — Treino B: Quadríceps + peito + tríceps
- Sexta — Treino C: Glúteos + costas + ombros
- Sábado — Treino D: Glúteos + pernas + tríceps

Versão oficial exposta por `version-tools.js`: V1.05.

`appearance-tools.js` preserva `ttf_appearance`, modo Claro/Conforto e a cor de conclusão `#28A866`.

### Teste — `treino-tracker-feminino-test`

Cache: `treino-feminino-test-v14`.

Mantém `ttf100` e a mesma base de programa A–D.

Não contém:

- `profile-tools.js`
- `version-tools.js`

Logo, Configurações, Progresso e controle de versão não representam integralmente a produção.

## 7. Diferenças masculino × feminino

Masculino:

- cinco dias, quarta a domingo;
- organização tradicional por grupos musculares;
- núcleo mais concentrado no `index.html`;
- `profile-tools.js` substitui `renderProgress` e `renderConfig`.

Feminino:

- quatro dias efetivos, quarta a sábado;
- programa A–D em blocos;
- `block-workout-tools.js` substitui programa e renderização de treino;
- `profile-tools.js` substitui Progresso/Configurações;
- `appearance-tools.js` adiciona a camada de aparência após o perfil.

## 8. Service worker, cache e riscos

O comportamento atual dos quatro PWAs combina:

- cache versionado;
- remoção de caches antigos na ativação;
- tentativa de `fetch` com `cache: 'no-store'`;
- fallback para cache quando offline;
- injeção dinâmica de scripts no HTML.

Riscos protegidos:

- alterar assets sem atualizar `CACHE` pode manter usuários em recursos antigos;
- a publicação do GitHub Pages pode disponibilizar arquivos em momentos diferentes;
- novo service worker pode exigir mais de uma recarga para assumir controle;
- mudar a ordem de injeção pode remover funcionalidades silenciosamente;
- mudar chaves de `localStorage` pode fazer histórico parecer perdido;
- mudar índices/ordem de exercícios pode associar histórico antigo ao exercício errado.

## 9. Arquivos e estruturas protegidos

Preservar explicitamente:

- `tt100`
- `tt100_male_test_v106`
- `ttf100`
- `ttf_appearance`
- `ttf_version`
- `profile-tools.js`
- `version-tools.js`
- programas de treino atuais das duas variantes
- ordem de carregamento/injeção dos scripts
- comportamento de cache/service worker
- `block-workout-tools.js` e seu `PROGRAM`
- `appearance-tools.js`
- `config-tools.js`
- `history-tools.js`
- `workout-input-tools.js`
- `male-enhancements.js`
- `female-enhancements.js`
- `lances-theme.js`
- `manifest.json`
- `lances-tech-logo.png`

## 10. Divergências conhecidas

1. Masculino produção exibe V1.03; masculino teste exibe V1.06 no HTML e V1.07 TESTE no enhancement.
2. Feminino produção possui V1.05 em `version-tools.js`, enquanto o HTML base ainda contém referências históricas V1.01.
3. Feminino teste não carrega `version-tools.js`, portanto o mecanismo base de versão não equivale ao oficial.
4. `profile-tools.js` feminino registra meta textual de treinos de quarta a domingo, enquanto o programa efetivamente instalado por `block-workout-tools.js` possui treinos de quarta a sábado e trata domingo como descanso/mobilidade.
5. Os repositórios `-test` têm menos módulos que produção; divergência não significa, por si só, evolução pendente.

## 11. Estado confirmado

`ESTÁVEL`.

Não há evolução funcional recente confirmada no feminino teste aguardando promoção. O modo Conforto, seletor de aparência e botão verde de conclusão já foram promovidos ao feminino produção em 2026-09-25.

No masculino, a divergência de `profile-tools.js` representa superioridade funcional da produção, não uma promoção pendente conhecida.

## 12. Próximo ponto seguro

Antes da próxima alteração funcional:

1. identificar a variante alvo;
2. reancorar nesta Retomada e nos arquivos materialmente afetados;
3. verificar se a mudança exige teste isolado;
4. quando exigir, implementar primeiro no `-test` correspondente;
5. preservar chaves, programas, ordem de scripts e módulos exclusivos de produção;
6. promover seletivamente somente após validação.

Não consolidar os quatro repositórios nem redesenhar arquitetura como consequência deste checkpoint. Qualquer mudança estrutural futura deve ser tratada como decisão substantiva própria.

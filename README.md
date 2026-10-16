# The Fall Knight

Protótipo jogável 3D de fantasia medieval sombria para navegador desktop com WebGL. Arte original low-poly inspirada na época PS2; nenhum recurso de jogos comerciais foi extraído ou incluído.

## Executar

Requer Node.js 22.12+ (validado com 24.19) e npm.

```sh
npm ci
npm run dev
```

Para produção: `npm run build` e `npm run preview`. O jogo pausa quando o mouse é liberado. Clique no cenário para retomar. Use um computador com teclado e mouse.

## Controles

| Entrada | Ação |
|---|---|
| WASD / mouse | Mover / olhar |
| Shift | Correr (5 stamina por segundo) |
| Botão esquerdo | Usar item selecionado |
| Botão direito | Usar mão esquerda |
| Roda ou 1–9 | Selecionar barra de 9 espaços |
| F | Trocar item selecionado e mão esquerda |
| E | Inventário: arrastar ou clicar em dois espaços para trocar |
| Y | Criação de poções |
| V | Alternar primeira / terceira pessoa, ver armadura |
| Esc | Liberar mouse e pausar |

O pedido repetia o botão direito para as duas mãos; adotou-se esquerdo para principal e direito para secundária.

## Regras

Vida, mana e stamina: máximo 100. Espada: 28 de dano e 5 de stamina por golpe. Escudo: 5 de stamina, bloqueio frontal por 0,65 s. Fogo: 45 de dano e 10 de mana. Cura: recupera 30 de vida e custa 15 de mana. Mana regenera 2/s e stamina 9/s quando não há uso/corrida. Ao morrer, retorna à fogueira com atributos restaurados e mantém inventário.

- Poção de cura: 1 erva verde + 1 essência vital; restaura 40 de vida.
- Poção de stamina: 1 essência vital + 1 raiz de carvalho; restaura 50 de stamina.
- Cortar cada grupo de grama: 5% de erva, reaparece após 30 s.
- Cada golpe em árvore: 25% de raiz; árvore permanece em pé.
- Derrotar zumbi: 15% de essência. Esqueletos não dão essência.
- 20 inimigos com reaparecimento em 24 s. Duas variantes de zumbi e um esqueleto armado.
- Três fogueiras; raio seguro de 7 m e margem de aproximação de 0,5 m. Inimigos não perseguem o jogador dentro do abrigo.

## Arte e UV

`src/models.js` contém modelos hierárquicos originais: cavaleiro com placas e riscos de ferrugem, zumbi de armadura, zumbi de farrapos, esqueleto, espada, escudo, livros, carvalho, grama e fogueira. Animação procedural dos membros.

`public/assets/weathered-atlas.svg` é uma textura original de 128×128 com desgaste procedural e arranhões. Aplicada com filtragem nearest e cores próprias de cada material. As primitivas incluem coordenadas UV explícitas (faces de caixas 0–1, cilindros desenrolados no eixo Y).

`npm run assets` exporta 11 arquivos OBJ editáveis com posições, normais e coordenadas `vt`, além de `public/assets/models/manifest.json` com contagem de triângulos. O OBJ contém geometria e UV; materiais e hierarquia são reconstruídos por `models.js`, não por um MTL. Importe no Blender e associe o SVG convertido em PNG se desejar editar a textura.

Névoa exponencial, distância de visão limitada, geometrias simples, resolução limitada a 1× e uma única luz com sombra de 1024². Névoa é principalmente visual; o desempenho também depende de culling, quantidade de objetos e GPU. Não há promessa de FPS específico.

## Verificação

```sh
npm test
npm run build
# Com servidor dev ativo e Chromium instalado:
node scripts/smoke.mjs
```

O smoke usa `/usr/bin/chromium`; use `CHROMIUM_PATH` para outro caminho. Valida renderização WebGL, inventário, seleção, troca de mãos, movimentação de itens e receita sem ingredientes. Testes de lógica cobrem receitas e limites de drops.

## Escopo atual

Protótipo inicial single-player: sem áudio, persistência de progresso, multiplayer ou suporte a toque. Colisão com árvores e limites do mapa; a câmera de terceira pessoa é uma visualização simples e pode atravessar objetos. Recursos artísticos são estilizados e procedurais, não reproduções fiéis de personagens comerciais. Fontes remotas são opcionais; há fallback local.

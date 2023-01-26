# Projeto React Testing Library
## Este repositório contém o desenvolvimento do meu 12º projeto na Trybe

Neste projeto, comecei a trabalhar com a biblioteca do React Testing Library e também com a biblioteca complementar do User-Event. O objetivo foi desenvolver testes de integração para uma aplicação de Pokedéx já em funcionamento.

## Detalhes do projeto

Confira os requisitos exigidos pela Trybe (texto extraído dos readme oficial da Trybe):

1. Teste o componente <App.js />

> Teste se o topo da aplicação contém um conjunto fixo de links de navegação:

> Teste se a aplicação é redirecionada para a página inicial, na URL / ao clicar no link Home da barra de navegação;

> Teste se a aplicação é redirecionada para a página de About, na URL /about, ao clicar no link About da barra de navegação;

> Teste se a aplicação é redirecionada para a página de Pokémon Favoritados, na URL /favorites, ao clicar no link Favorite Pokémon da barra de navegação;

> Teste se a aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida.

2. Teste o componente <About.js />.

> Teste se a página contém as informações sobre a Pokédex;

> Teste se a página contém um heading h2 com o texto About Pokédex;

> Teste se a página contém dois parágrafos com texto sobre a Pokédex;

> Teste se a página contém a seguinte imagem de uma Pokédex: https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png.

3. Teste o componente <FavoritePokemon.js />

Ao favoritar a partir da página de detalhes teste se:

> É exibida na tela a mensagem No favorite pokemon found, caso a pessoa não tenha Pokémon favoritos;

> Apenas são exibidos os Pokémon favoritados.

4. Teste o componente <NotFound.js />

> Teste se a página contém um heading h2 com o texto Page requested not found;

> Teste se a página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif.

5. Teste o componente <Pokedex.js />

> Teste se a página contém um heading h2 com o texto Encountered Pokémon;

> Teste se é exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado:

> Teste se é mostrado apenas um Pokémon por vez;

> Teste se a Pokédex tem os botões de filtro:

> Teste se a Pokédex contém um botão para resetar o filtro:

6. Teste o componente <Pokemon.js />

> Teste se é renderizado um card com as informações de determinado Pokémon:

> Teste se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes deste Pokémon. O link deve possuir a URL /pokemon/<id>, onde <id> é o id do Pokémon exibido;

> Teste se ao clicar no link de navegação do Pokémon, é feito o redirecionamento da aplicação para a página de detalhes de Pokémon;

> Teste também se a URL exibida no navegador muda para /pokemon/<id>, onde <id> é o id do Pokémon cujos detalhes se deseja ver;

> Teste se existe um ícone de estrela nos Pokémon favoritados:

7. Teste o componente <PokemonDetails.js />

> Teste se as informações detalhadas do Pokémon selecionado são mostradas na tela:

> Teste se existe na página uma seção com os mapas contendo as localizações do Pokémon:

> Teste se o usuário pode favoritar um Pokémon através da página de detalhes:

### Observações sobre as pastas

Apenas os códigos contidos na pasta /src/tests foram desenvolvidos por mim. Todos os outros arquivos são de criação da Trybe.

Os console.log() comentados em outras pastas do /src inseri para verificar os retornos de funções, props e elementos. 


#### Sobre o curso da Trybe
O programa total de estudo conta com mais de 1.500 horas de aulas presenciais e online,divididas ao longo de 12 meses. O conteúdo aborda introdução ao desenvolvimento de software, front-end, back-end, ciência da computação, engenharia de software, metodologias ágeis e habilidades comportamentais.

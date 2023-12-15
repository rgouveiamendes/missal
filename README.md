## Descrição da proposta de solução

### TypeScript

Em vez de JavaScript (`.js/.jsx`), prefiro usar o TypeScript (`.ts/.tsx`) para essa aplicação, que é igual a JavaScript mas com declaração de tipos (string, Object, number, etc...). Isso é útil porque facilita o processo de lidar com os dados, que vem de um JSON, e garante que eles estão estruturados da forma certa dentro da aplicação.
Adiciona alguma complexidade ao código, mas a longo prazo facilita a manutenção. Posso dar um exemplo mais concreto do motivo na sexta, mas se olhar o arquivo `src/types.ts` talvez consiga entender intuitivamente. Podemos também simplemente não usar e voltar ao JavaScript.

- Onde aprender?

  Se já trabalhou com alguma linguagem que usa variáveis tipadas, é muito simples, tem um tutorial breve na página oficial da linguagem que me pareceu bom: https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html

### React.js

É uma biblioteca em JavaScript muito popular pra criar interfaces por causa da componentização. Como precisamos criar vários componentes parecidos em que só se muda o conteúdo, acho que facilitaria muito o trabalho. Existem várias alternativas, mas essa é uma das mais populares. A ideia é usar uma abstração em cima do React, não propriamente o React puro.

- Onde aprender?
  O tutorial da própria biblioteca é muito bom, aprendi por lá. Talvez faça sentido dar uma lida rápida pra entender mais ou menos como funciona e aprender de fato enquanto fazemos o Missal: https://react.dev/learn. Também achei uma documentação do Next.js explicando o básico necessário de React.js pra usar o Next, talvez faça mais sentido olhar isso: https://nextjs.org/learn/react-foundations

### Next.js 14:

É uma framework que usa o React.js pra gerar páginas estáticas interativas e rápidas. É uma das mais usadas atualmente pra todo tipo de aplicação, mas no nosso caso é especialmente útil, já que queremos justamente gerar todas as páginas estáticas (HTMLs) a partir do JSON em tempo de build. Por exemplo, para as leituras do advento, em vez de dar manutenção em X arquivos (1 index e vários de leitura), só é preciso alterar o index em `app/page.tsx` (ou no futuro `app/advent/page.tsx`) e o arquivo padrão para leituras em `app/advent/[period]/[day]/page.tsx`, que, usando o `generateStaticParams`, gera todos os HTMLs em tempo de build. Futuramente podemos abstrair ainda mais e ter só um arquivo para todas as leituras do ano em `app/[season]/[period]/[day]/reading/page.tsx`!

- Onde aprender?

  A documentação é uma das melhores que já vi: https://nextjs.org/learn e https://nextjs.org/docs. É uma framework com muitas funcionalidades, não precisamos usar boa parte delas. A ideia é focar na geração de páginas estáticas com o a função generateStaticParams, pelo que vi por cima não é explicada no tutorial do next, já não é o mesmo que fiz.

- Onde fazer o deploy da aplicação?

  Podemos usar o próprio GitHub pages, com o GitHub actions, ou a Vercel, que é plataforma da empresa que criou o Next.js. Nas duas situações a página é recriada a cada push que damos na main, então depois da configuração inicial, atualizar o site é só uma questão de mudar o que precisa e dar um push!
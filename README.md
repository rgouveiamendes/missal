## Descrição da proposta de solução

### TypeScript

Em vez de JavaScript (`.js/.jsx`), prefiro usar o TypeScript (`.ts/.tsx`) para essa aplicação, que é igual a JavaScript mas com declaração de tipos (string, Object, number, etc...). Isso é útil porque facilita o processo de lidar com os dados, que vêm de um JSON, e garante que eles estão estruturados da forma certa dentro da aplicação.
Adiciona alguma complexidade ao código, mas a longo prazo facilita a manutenção. Posso dar um exemplo mais concreto do motivo na sexta, mas se olhar o arquivo `src/types.ts` talvez consiga entender intuitivamente. Podemos também simplemente não usar o TypeScript e voltar ao JavaScript.

- Onde aprender?

  Se já trabalhou com alguma linguagem que usa variáveis tipadas, é muito simples, tem um tutorial breve na página oficial da linguagem que me pareceu bom: https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html

### React.js

É uma biblioteca em JavaScript muito popular pra criar interfaces por causa da componentização. Como precisamos criar vários componentes parecidos em que só se muda o conteúdo, acho que facilitaria muito o trabalho. Existem várias alternativas, mas essa é uma das mais populares. A ideia é usar uma abstração em cima do React, não propriamente o React puro.

- Onde aprender?
  
  Achei uma documentação muito boa do Next.js explicando o básico necessário de React.js pra usar o Next, talvez faça mais sentido olhar isso: https://nextjs.org/learn/react-foundations. O tutorial da própria biblioteca também é muito bom, aprendi por lá. Talvez faça sentido dar uma lida muito por cima pra entender mais ou menos como funciona se o tutorial do Next não for suficiente, mas podemos aprender de fato enquanto fazemos o Missal: https://react.dev/learn. 

### Next.js 14:

É uma framework que usa o React.js pra gerar páginas estáticas interativas e rápidas. É uma das mais usadas atualmente pra todo tipo de aplicação, mas no nosso caso é especialmente útil, já que queremos justamente gerar todas as páginas estáticas (HTMLs) a partir do JSON em tempo de build. Por exemplo, para as leituras do advent, em vez de dar manutenção em X arquivos (1 index e vários de leitura), só é preciso alterar o index em `app/page.tsx` (ou no futuro `app/advent/page.tsx`) e o arquivo padrão para leituras em `app/advent/[period]/[day]/page.tsx`, que, usando o `generateStaticParams`, gera todos os HTMLs em tempo de build. Futuramente podemos abstrair ainda mais e ter só um arquivo para todas as leituras do ano em `app/[season]/[period]/[day]/reading/page.tsx`!

- Onde aprender?

  A documentação é uma das melhores que já vi: https://nextjs.org/learn e https://nextjs.org/docs. É uma framework com muitas funcionalidades, não precisamos usar boa parte delas. A ideia é focar na geração de páginas estáticas com a função `generateStaticParams`, pelo que vi por cima não é explicada no tutorial do next, já não é o mesmo que fiz.

- Onde fazer o deploy da aplicação?

  Podemos usar o próprio GitHub pages, com o GitHub actions, ou a Vercel, que é plataforma da empresa que criou o Next.js. Nas duas situações a página é recriada a cada push que damos na main, então depois da configuração inicial, atualizar o site é só uma questão de mudar o que precisa e dar um push!

## Workflow de colaboração no Github

### Branches

Por agora vamos ter apenas uns poucos branches "oficiais":
- **main**: a partir de onde se faz o build e deploy do site, e desde onde se fazem as releases.
- **dev**: onde se desenvolve a próxima versão. É para este branch que se devem dirigir os Pull Requests com contribuições.
- outros branches criados para alguém ir trabalhando nalguma feature à parte. Em princípio estes branches devem ser começados a partir de **dev**. Deve ser um branch por feature, mantendo alguma separação.

### Merges e Releases

- quando há alguma feature nova, ou pacote de textos novo, está pronto e testado em **dev**, pode-se fazer o Pull Request para **dev**.
- os commits devem ser squashed de forma a manter a git history limpa e fácil de seguir. Não tem de ser só um commit por PR, mas sim um número reduzido e lógico.
- mesmo que alguém tenha direito de escrita, não deve fazer merge dos seus próprios PR's, a não ser que sejam _muito_ triviais.
- o normal será outra pessoa fazer o code review e aprovar o PR antes de se fazer o merge, para garantir que há dois pares de olhos a rever cada alteração e a comentar possíveis melhorias.
- quando houver um número de melhoramentos relevante em **dev**, faz-se merge desse branch para dentro de **main** e faz-se uma nova **Release**.
- nesse momento, quem tiver outros branches com trabalho inacabado, deve fazer um update do seu branch para ficar a par com o novo estado de **dev** e **main**.

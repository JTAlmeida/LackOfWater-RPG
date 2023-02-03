import { Scene, Enemy, Option, Item, EnemyItem, SceneOption } from "@prisma/client";

type CreateScene = Omit<Scene, "id" | "createdAt" | "updatedAt">;
type CreateManyScenes = CreateScene[];

type CreateOption = Omit<Option, "id">;
type CreateManyOptions = CreateOption[];

type CreateEnemy = Omit<Enemy, "id" | "createdAt" | "updatedAt">;
type CreateManyEnemies = CreateEnemy[];

type CreateItem = Omit<Item, "id" | "createdAt" | "updatedAt">;
type CreateManyItems = CreateItem[];

type CreateEnemyItem = Omit<EnemyItem, "id">;
type CreateManyEnemyItems = CreateEnemyItem[];

type CreateSceneOption = Omit<SceneOption, "id">
type CreateManySceneOptions = CreateSceneOption[];

const Scenes: CreateManyScenes = [
  {
    description:
      "Você entra no labirinto e, apesar de não saber o caminho certo, sua inteligência avançada e capacidade de armazenar dados em memória faz ser possível criar um mapa dos lugares que já passou no labirinto, portanto não ficará perdido, mesmo podendo errar o caminho. Depois de dar algumas voltas e mapear uma porção do labirinto, você encontra um guarda que aparentemente não percebeu sua presença, mas não sabe se o caminho que ele está guardando é o correto.",
  },
  {
    description:
      "Você se vê em um caminho sem saída. Você volta e vai pelo outro lado. Após alguns minutos caminhando, se depara com outro guarda parecendo um escorpião que notou sua presença, o combate é inevitável.",
  },
  {
    description:
      "Você encontra um artefato, ao pegá-lo você o identifica como sendo um tipo de sensor, com ele você consegue saber a posição dos outros guardas e tem um que emana uma energia especial, então decide que ele deve estar guardando o “Fim da Humanidade” e vai para lá. Chegando no local se depara com o Rei Mechius, um dos reis da raça robótica e protetor do “Fim da Humanidade”.",
  },
  {
    description:
      "Ao seguir andando por alguns minutos e nota que tem um guarda mais forte, parecido com um escorpião, de costas.",
  },
  {
    description: "Você tenta assassinar o guarda, mas falha, ele reage no último instante e se esquiva.",
  },
  {
    description:
      "Após algumas horas andando e evitando combates, você encontra uma sala suspeita. Ao entrar nela se depara com ninguém menos que o Rei Mechius, um dos reis da raça robótica e protetor do “Fim da Humanidade”.",
  },
  {
    description:
      "Por fim vence a árdua batalha e vê em um pedestal o “Fim da Humanidade”. Você o pega e escapa, restaurando a água para a humanidade e lhes garantindo a sobrevivência. Com os ânimos restaurados, os humanos fazem uma nova investida e massacram o restante dos robôs! Infelizmente você não foi uma exceção... apesar de tê-los salvado, ninguém o reconhecia como amigo e, por fim, viu que a raça humana não merecia sua compaixão pois são mesquinhos e egoístas.",
  },
  {
    description: "Você encontra um guarda no seu caminho enquanto mapeava o labirinto.",
  },
  {
    description: "Você anda sem encontrar desafios e se depara com uma bifurcação.",
  },
];

const Options: CreateManyOptions = [
  {
    description: "ATACAR O GUARDA",
  },
  {
    description: "IR PELO OUTRO CAMINHO",
  },
  {
    description: "PROSSEGUIR COM O COMBATE",
  },
  {
    description: "ASSASSINAR O GUARDA",
  },
  {
    description: "VOLTAR E PROCURAR OUTRO CAMINHO",
  },
  {
    description: "IR À ESQUERDA",
  },
  {
    description: "IR À DIREITA",
  },
  {
    description: "VOLTAR AO MENU INICIAL",
  }
];

const Enemies: CreateManyEnemies = [
  {
    name: "Guarda",
    atk: 10,
    def: 2,
    hp: 40,
    exp: 50,
    imgUrl:
      "https://trello.com/1/cards/63c831995a5f1201c630a8e7/attachments/63cefaf7353a69058ecb7ef8/previews/63cefaf8353a69058ecb7f02/download/guard.png",
  },
  {
    name: "Guarda de Elite",
    atk: 20,
    def: 5,
    hp: 70,
    exp: 100,
    imgUrl:
      "https://trello.com/1/cards/63c831995a5f1201c630a8e7/attachments/63cefaf480529af3754c766a/previews/63cefaf580529af3754c76d1/download/elite_guard.png",
  },
  {
    name: "Rei Mechius",
    atk: 40,
    def: 10,
    hp: 100,
    exp: 10000,
    imgUrl:
      "https://trello.com/1/cards/63c831995a5f1201c630a8e7/attachments/63cefa7d5a990916ad57bd26/previews/63cefa7e5a990916ad57bd30/download/mechius.png",
  },
];

const Items: CreateManyItems = [
  {
    name: "Poção de HP",
    description: "Cura 50% da sua vida máxima",
  },
];

const EnemyItems: CreateManyEnemyItems = [
  {
    enemyId: 1,
    itemId: 1,
    dropChance: 50,
  },
  {
    enemyId: 2,
    itemId: 1,
    dropChance: 50,
  },
];

const SceneOptions: CreateManySceneOptions = [
  {
    sceneId: 1,
    optionId: 1,
  },
  {
    sceneId: 1,
    optionId: 2,
  },
  {
    sceneId: 2,
    optionId: 3,
  },
  {
    sceneId: 3,
    optionId: 3,
  },
  {
    sceneId: 4,
    optionId: 4,
  },
  {
    sceneId: 4,
    optionId: 5,
  },
  {
    sceneId: 5,
    optionId: 3,
  },
  {
    sceneId: 6,
    optionId: 3,
  },
  {
    sceneId: 7,
    optionId: 8,
  },
  {
    sceneId: 8,
    optionId: 3,
  },
  {
    sceneId: 9,
    optionId: 6,
  },
  {
    sceneId: 9,
    optionId: 7,
  },
];

export { Scenes, Options, Enemies, Items, EnemyItems, SceneOptions };

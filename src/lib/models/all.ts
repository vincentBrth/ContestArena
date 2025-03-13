interface Word {
  checked: boolean;
  label?: string;
}

interface Bingo {
  size: number;
  words: { [key: string]: Word };
}

interface PlayerBingo {
  words: { [key: string]: { checked: boolean } };
}

interface User {
  country: string;
  pseudo: string;
  squads?: string[];
}

interface Player {
  bingo?: PlayerBingo;
  likes: string[][];
  user: User;
}

interface Round {
  locked: boolean;
  max: number;
  name: string;
  points: number;
  pool: string[];
  qualified: string[];
  watch: boolean;
}

interface Asset {
  abstract: string;
  asset: string[];
  link: string;
  subtitle: string;
  title: string;
}

interface BasePool {
  [key: string]: Asset;
}

interface Settings {
  admins: string[];
  asset_in_use: number;
  base_pool: BasePool;
  enabled: boolean;
  info: {
    abstract: string;
    asset: string[];
    date: string;
    name: string;
  };
  message: string;
  password: string;
  propagate: boolean;
  theme: string;
}

interface Contest {
  event: {
    bingo: Bingo;
    players: { [key: string]: Player };
    rounds: Round[];
  };
  settings: Settings;
}

interface User {
  country: string;
  pseudo: string;
  squads?: string[];
}

interface Users {
  [key: string]: User;
}

interface Model {
  contest: {
    MissFrance2k25: Contest;
  };
  users: Users;
}

// Example usage
const model: Model = {
  contest: {
    MissFrance2k25: {
      event: {
        bingo: {
          size: 12,
          words: {
            "2": { checked: false, label: "Une question sur le succès de Paris 2024" },
            // ... other words
          },
        },
        players: {
          "1GlXoIaI4oec8bUYwsfUOLWph1t1": {
            bingo: {
              words: {
                "5": { checked: true },
                // ... other words
              },
            },
            likes: [
              ["Alsace", "Centre-Val de Loire", "Corse", "Côte d'Azur", "Franche-Comté", "Lorraine", "Martinique", "Midi-Pyrénées", "Nord-Pas-de-Calais", "Pays de la Loire", "Roussillon", "Réunion", "Aquitaine", "Île-de-France", "Guyane"],
              ["Côte d'Azur", "Martinique", "Nord-Pas-de-Calais", "Aquitaine", "Guadeloupe"],
              ["Martinique"]
            ],
            user_info: {
              country: "FR",
              pseudo: "Nounouille ",
              squads: ["RLM", "Les Vilains"]
            },
          },
          // ... other players
        },
        rounds: [
          {
            locked: true,
            max: 15,
            name: "Top 15",
            points: 1,
            pool: ["Alsace", "Aquitaine", "Auvergne", "Bourgogne", "Bretagne", "Centre-Val de Loire", "Champagne-Ardenne", "Corse", "Côte d'Azur", "Franche-Comté", "Guadeloupe", "Guyane", "Ile-de-France", "Languedoc", "Limousin", "Lorraine", "Martinique", "Mayotte", "Midi-Pyrénées", "Nord-Pas-de-Calais", "Normandie", "Nouvelle-Calédonie", "Pays de la Loire", "Picardie", "Poitou-Charentes", "Provence", "Réunion", "Rhône-Alpes", "Roussillon", "Tahiti", "Île-de-France", "St-Martin St-Barthélémy"],
            qualified: ["Midi-Pyrénées", "Corse", "Guadeloupe", "Champagne-Ardenne", "Lorraine", "Tahiti", "Picardie", "Martinique", "Nord-Pas-de-Calais", "Alsace", "Rhône-Alpes", "Aquitaine", "Côte d'Azur", "Normandie", "Bourgogne"],
            watch: true
          },
          // ... other rounds
        ],
      },
      settings: {
        admins: ["QBOULQWohKMTEIskyDr6cr3AsFg2"],
        asset_in_use: 0,
        base_pool: {
          "Alsace": {
            abstract: "Franco-colombienne, titulaire d'un BTS communication, en alternance dans une clinique esthétique.",
            asset: ["https://storage.googleapis.com/contestarena-5c70a.appspot.com/contest/MissFrance2k25/classic/Alsace.png", "https://storage.googleapis.com/contestarena-5c70a.appspot.com/contest/MissFrance2k25/bikini/Alsace.png"],
            link: "https://www.instagram.com/isabellahebertoff/",
            subtitle: "20 ans, 1m71",
            title: "Isabella Hebert"
          },
          // ... other regions
        },
        enabled: true,
        info: {
          abstract: "",
          asset: ["https://firebasestorage.googleapis.com/v0/b/contestarena-5c70a.appspot.com/o/contest%2FMissFrance2k25%2Fmiss_france_2025.png?alt=media&token=b0d801e5-0159-4d8d-bb83-3472679c3fb2"],
          date: "2024-12-14T21:00:00",
          name: "Miss France 2025"
        },
        message: "",
        password: "",
        propagate: true,
        theme: "linen"
      },
    },
  },
  users: {
    "1GlXoIaI4oec8bUYwsfUOLWph1t1": {
      country: "FR",
      pseudo: "Nounouille ",
      squads: ["RLM", "Les Vilains"]
    },
    // ... other users
  },
};

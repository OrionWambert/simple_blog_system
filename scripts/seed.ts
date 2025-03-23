import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Delete existing data
    await prisma.post.deleteMany();
    await prisma.user.deleteMany();

    const user = await prisma.user.upsert({
        where: {email: 'kpriss2dev@example.com'},
        update: {},
        create: {
            email: 'kpriss2dev@example.com',
            name: 'Kpriss2Dev',
            image: 'https://avatars.githubusercontent.com/u/583231?v=4',
        },
    });
    const articles = [
        {
            title: "Next.js 14 : Une révolution dans le développement web",
            description: "Découvrez les fonctionnalités majeures de Next.js 14 qui redéfinissent le développement web moderne.",
            image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
            content: {
                blocks: [
                    {
                        type: 'text',
                        content: "Next.js 14 marque un tournant majeur dans l’écosystème JavaScript. L’introduction du Partial Prerendering (PPR) permet de pré-générer uniquement les parties statiques d’une page tout en gardant du contenu dynamique. Cette approche hybride optimise le SEO et booste considérablement la performance des applications."
                    },
                    {
                        type: 'quote',
                        content: "Avec Next.js 14, le futur du web devient prévisible et plus rapide.",
                        author: "Vercel CEO"
                    },
                    {
                        type: 'text',
                        content: "Les Server Actions évoluent également, facilitant la gestion des requêtes serveurs sans surcharger le client. Le système de cache intelligent de cette version donne aux développeurs un contrôle granulaire sur la revalidation des données."
                    },
                    {
                        type: 'image',
                        url: "https://images.unsplash.com/photo-1531482615713-2afd69097998",
                        caption: "Illustration des performances accrues avec Next.js 14"
                    }
                ]
            },
            published: true,
            authorId: user.id
        },

        {
            title: "Node.js 20 : Sécurité renforcée et performances au sommet",
            description: "Zoom sur les nouveautés de Node.js 20 qui révolutionnent le backend moderne.",
            image: "https://images.unsplash.com/photo-1505232070786-70637c2d5b52",
            content: {
                blocks: [
                    {
                        type: 'text',
                        content: "Node.js 20 apporte un vent de fraîcheur aux applications backend. La grosse nouveauté ? Le système de permissions qui permet de restreindre l'accès aux ressources comme les fichiers ou les sockets réseau, limitant drastiquement les vecteurs d’attaques potentielles."
                    },
                    {
                        type: 'code',
                        content: "node --allow-fs --allow-env app.js",
                        language: "bash"
                    },
                    {
                        type: 'text',
                        content: "La mise à jour de V8 en version 11.3 booste encore la vitesse d’exécution. De plus, le support natif des WebAssembly Garbage Collection permet d’intégrer des modules WASM plus efficacement dans vos apps Node.js."
                    },
                    {
                        type: 'image',
                        url: "https://images.unsplash.com/photo-1518770660439-4636190af475",
                        caption: "Node.js 20 au cœur des architectures modernes"
                    }
                ]
            },
            published: true,
            authorId: user.id
        },

        {
            title: "Rust : Le langage de la fiabilité et de la performance",
            description: "Rust s’impose comme la référence pour le développement système moderne.",
            image: "https://images.unsplash.com/photo-1581090700227-1e37b190418e",
            content: {
                blocks: [
                    {
                        type: 'text',
                        content: "Rust séduit par son approche unique : garantir la sécurité mémoire sans garbage collector. Grâce à son système de propriété et son borrow checker, il élimine toute une catégorie de bugs liés aux accès concurrents ou aux fuites mémoire."
                    },
                    {
                        type: 'quote',
                        content: "Rust ne vous demande pas d’écrire du code sécurisé, il l’impose.",
                        author: "The Rust Book"
                    },
                    {
                        type: 'text',
                        content: "Adopté par Mozilla, Dropbox ou encore Microsoft, Rust s’impose dans les systèmes critiques où la fiabilité et la performance sont primordiales. La communauté grandit et l’écosystème devient de plus en plus riche."
                    },
                    {
                        type: 'image',
                        url: "https://images.unsplash.com/photo-1610484826967-c27850aa3244",
                        caption: "Rust, la puissance au service de la sécurité"
                    }
                ]
            },
            published: true,
            authorId: user.id
        },

        {
            title: "Micro-frontends : La scalabilité des interfaces web",
            description: "Découvrez comment les micro-frontends transforment la manière de développer de grandes applications frontend.",
            image: "https://images.unsplash.com/photo-1517430816045-df4b7de169fb",
            content: {
                blocks: [
                    {
                        type: 'text',
                        content: "Les micro-frontends sont à la frontend ce que les microservices sont au backend. Chaque équipe peut développer, déployer et maintenir sa partie de l’interface de manière totalement indépendante."
                    },
                    {
                        type: 'text',
                        content: "Cette approche réduit les risques de régressions globales et permet une évolution plus rapide des produits digitaux. Des géants comme Spotify ou Amazon utilisent cette architecture pour leurs plateformes à grande échelle."
                    },
                    {
                        type: 'image',
                        url: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7",
                        caption: "Architecture typique de micro-frontends"
                    }
                ]
            },
            published: true,
            authorId: user.id
        },

        {
            title: "GraphQL vs REST : Le duel des API modernes",
            description: "Analyse complète des avantages et inconvénients de GraphQL face aux API REST traditionnelles.",
            image: "https://images.unsplash.com/photo-1581090700227-1e37b190418e",
            content: {
                blocks: [
                    {
                        type: 'text',
                        content: "REST a longtemps dominé le monde des API. Cependant, GraphQL, initié par Facebook, bouscule cet univers en proposant une approche plus flexible et plus performante, notamment pour les applications mobiles et les SPAs."
                    },
                    {
                        type: 'quote',
                        content: "Avec GraphQL, ce n’est plus l’API qui décide ce qu’elle envoie, mais le client.",
                        author: "Apollo Team"
                    },
                    {
                        type: 'text',
                        content: "Le principal avantage de GraphQL est la réduction du nombre de requêtes nécessaires pour récupérer des données complexes. En contrepartie, la gestion du cache est plus complexe et nécessite des outils spécifiques."
                    },
                    {
                        type: 'image',
                        url: "https://images.unsplash.com/photo-1526378722484-bd91ca387e72",
                        caption: "GraphQL, une API taillée pour le futur"
                    }
                ]
            },
            published: true,
            authorId: user.id
        },

    ]


    for (const article of articles) {
        await prisma.post.create({
            data: {
                ...article,
                slug: article.title
                    .toLowerCase()
                    .replace(/[^\w\s]/g, '')
                    .replace(/\s+/g, '-')
            }
        });
    }

    console.log('Database has been seeded. 🌱')
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

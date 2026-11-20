Vue.createApp({
    data() {
        return {
            cardImages: [
                { name: "ドットフラワー", image: "images/131009737_p0_square1200.jpg" },
                { name: "ブーメランフラワー", image: "images/141627870_p0_square1200.jpg" },
                { name: "1UPキノコ", image: "images/25304666_p0_square1200.jpg" },
                { name: "スター", image: "images/55476644_p0_square1200.jpg" },
                { name: "ドットキノコ", image: "images/57614576_p0_square1200.jpg" },
                { name: "ゴールドキノコ", image: "images/i-img1200x1200-1790849428055t5foe2.jpg" },
                { name: "ファイアフラワー", image: "images/kumaneko-honpo-y_sk03824_2_d_20221208142949.jpg" },
                { name: "プロペラキノコ", image: "images/p4ein7ey.jpg" }
            ],
            cards: [],
            flippedCards: [],
            turns: 0,
            matchedPairs: 0,
            lockBoard: false
        };
    },

    computed: {
        isGameClear() {
            return this.matchedPairs === this.cardImages.length;
        }
    },

    mounted() {
        this.createCards();
    },

    methods: {
        createCards() {
            const cards = [];

            this.cardImages.forEach((item, index) => {
                for (let i = 0; i < 2; i++) {
                    cards.push({
                        id: cards.length,
                        imageId: index,
                        name: item.name,
                        image: item.image,
                        flipped: false,
                        matched: false
                    });
                }
            });

            cards.sort(() => Math.random() - 0.5);

            this.cards = cards;
        },

        flipCard(card) {
            if (this.lockBoard || card.flipped || card.matched) {
                return;
            }

            card.flipped = true;

            this.flippedCards.push(card);

            if (this.flippedCards.length === 2) {
                this.turns++;
                this.checkMatch();
            }
        },

        checkMatch() {
            const [card1, card2] = this.flippedCards;

            if (card1.imageId === card2.imageId) {
                card1.matched = true;
                card2.matched = true;

                this.matchedPairs++;
                this.flippedCards = [];
            } else {
                this.lockBoard = true;

                setTimeout(() => {
                    card1.flipped = false;
                    card2.flipped = false;

                    this.flippedCards = [];
                    this.lockBoard = false;
                }, 1000);
            }
        },

        restartGame() {
            this.flippedCards = [];
            this.turns = 0;
            this.matchedPairs = 0;
            this.lockBoard = false;

            this.createCards();
        }
    }
}).mount("#app");

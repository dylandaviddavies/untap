import {$, component$, useSignal} from "@builder.io/qwik";
import type {DocumentHead} from "@builder.io/qwik-city";

export default component$(() => {
    const comboCount = useSignal(0);
    const deck = ['images/radiant-lotus.png'].concat(Array.from(Array(84)).map(() => 'images/hare-apparent.png').concat(Array.from(Array(15)).map(() => 'images/plains.png')));
    const hand = useSignal(['images/plains.png', 'images/radiant-lotus.png'].concat(Array.from(Array(5)).map(() => 'images/hare-apparent.png')));

    const mulligan = $(() => {
        const newHand = [];

        for(let i = 0; i < 7; i++) {
            newHand.push(deck[Math.floor(Math.random() * deck.length)]);
        }

        hand.value = newHand;
        comboCount.value++;
    });

    return (
        <>
            <div id="home" class="banner">
                <h1>untap</h1>
                <h2>
                    a modern deck builder for Magic: The Gathering®
                </h2>

                <div class="banner__card">
                    <img class="banner__card__front" width="300" height="418" alt="" src="images/lotus.png"/>
                    <img class="banner__card__back" width="300" height="418" alt="" src="images/card-back.png"/>
                </div>

                <a class="banner__cta" href="#mulliganer">
                    <span class="banner__cta__content">
                        <span>start building</span>
                        <span class="banner__cta__icon material-symbols-outlined">arrow_downward</span>
                    </span>
                </a>
            </div>
            <div id="mulliganer" class="content">
                <div class="d-flex justify-content-flex-end">
                    <div>
                        <div class="content__heading">
                            tired of mulligans?
                        </div>
                        <div class="content__subheading">
                            too many lands? no lands? too few lands? your deck might not be optimized.
                        </div>
                    </div>
                </div>
                <div class="d-flex-col align-items-center">
                    <div class="starting-hand">
                        {hand.value.map((img, i) => <div key={i} class="card">
                            <img class="card__front" width="225" height="313" src={img} alt=""/>
                            <img class="card__back" width="225" height="313" src="images/card-back.png" alt=""/>
                        </div>)}
                    </div>
                    <button class={`btn mulligan-btn ${comboCount.value > 0 && 'mulligan-btn--comboing'}`} onClick$={mulligan}>
                            <span>mulligan</span>
                            {(comboCount.value > 0) &&
                                <div class="mulligan-btn__counter">
                                    <span>x{comboCount.value} Combo</span>

                                    <div class="fire">
                                        <div class="flames">
                                            <div class="flame"></div>
                                            <div class="flame"></div>
                                            <div class="flame"></div>
                                            <div class="flame"></div>
                                        </div>
                                    </div>
                                </div>}
                    </button>
                </div>
            </div>
        </>
    );
});

export const head: DocumentHead = {
    title: "home // untap - MTG Deck Builder",
    meta: [
        {
            name: "description",
            content: "MTG Deck Builder",
        },
    ],
};


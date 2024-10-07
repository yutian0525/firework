import { createRouter, createWebHashHistory } from "vue-router";
import card from "../view/card.vue";
import makeCard from "../view/makeCard.vue";
import home from "../view/home.vue";


const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: "/",
            name: 'home',
            component: home,
        },
        {
            path: "/card",
            name: 'card',
            component: card,
        },
        {
            path: "/makeCard",
            component: makeCard,
            name: 'makeCard'
        }
    ]
});
export default router;
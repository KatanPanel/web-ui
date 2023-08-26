import { createRouter, createWebHistory } from "vue-router"
import i18n, { loadLocaleMessages, setI18nLanguage, SUPPORTED_LOCALES } from "@/i18n"
import { AuthRoutes } from "@/modules/auth/auth.routes"
import { AccountsRoute } from "@/modules/accounts/accounts.routes"
import { AuthenticatedOnlyGuard } from "@/modules/auth/guards/authenticated-only.guard"
import { HomeRoutes } from "@/modules/home/home.routes"
import { BlueprintsRoutes } from "@/modules/blueprints/blueprints.routes"

export function importPage(module: string, path: string): () => Promise<unknown> {
    const comps = import.meta.glob(`./modules/**/ui/pages/**/*.vue`)
    return comps[`./modules/${module}/ui/pages/${path}Page.vue`]
}

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            component: importPage("platform", "Root"),
            beforeEnter: AuthenticatedOnlyGuard,
            children: [
                ...HomeRoutes,
                ...AccountsRoute,
                ...BlueprintsRoutes
            ]
        },
        ...AuthRoutes
    ]
})

router.beforeEach(async (to, _from, next) => {
    const paramsLocale = to.query.lang
    if (SUPPORTED_LOCALES.includes(paramsLocale as string)) {
        // load locale messages
        if (!i18n.global.availableLocales.includes(paramsLocale)) {
            await loadLocaleMessages(i18n, paramsLocale)
        }

        // set i18n language
        setI18nLanguage(i18n, paramsLocale)
    }

    return next()
})

export default router

import type { Logger } from "@/modules/platform/api/services/log.service"
import { useAccountsStore } from "../../accounts.store"
import logService from "@/modules/platform/api/services/log.service"
import type { Account } from "../models/account.model"

class AccountService {
    private readonly logger!: Logger

    constructor() {
        this.logger = logService.create(AccountService.name)
    }

    get isLoggedIn(): boolean {
        return useAccountsStore().isLoggedIn
    }

    async updateAccount(account: Account): Promise<void> {
        this.logger.debug("Account updated", account)
        useAccountsStore().updateAccount(account)
    }
}

export default new AccountService()

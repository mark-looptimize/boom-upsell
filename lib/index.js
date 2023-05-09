import { DataSource, InCartUpsellService, UpsellStrategyOption } from "./InCartUpsellService.js";
const inCartUpsellConfig = {
    dataSource: DataSource.LOCAL_STORAGE,
    upsellStrategy: UpsellStrategyOption.BLENDED
};
export const inCartUpsell = new InCartUpsellService(inCartUpsellConfig);
//# sourceMappingURL=index.js.map
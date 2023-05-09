import { DataSource, FeatureConfiguration, InCartUpsellService, UpsellStrategyOption } from "./InCartUpsellService.js";

const inCartUpsellConfig: FeatureConfiguration = {
  dataSource: DataSource.LOCAL_STORAGE,
  upsellStrategy: UpsellStrategyOption.BLENDED
};

export const inCartUpsell = new InCartUpsellService(inCartUpsellConfig); 
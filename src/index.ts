import { DataSource, FeatureConfiguration, InCartUpsellService, UpsellStrategyOption } from "./InCartUpsellService.js";

const inCartUpsellTestConfig: FeatureConfiguration = {
  dataSource: DataSource.TEST,
  upsellStrategy: UpsellStrategyOption.BLENDED
};

const inCartUpsell = new InCartUpsellService(inCartUpsellTestConfig);
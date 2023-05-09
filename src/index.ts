import { DataSource, FeatureConfiguration, InCartUpsellService, UpsellStrategyOption } from "./InCartUpsellService.js";

const inCartUpsellConfig: FeatureConfiguration = {
  dataSource: DataSource.LOCAL_STORAGE,
  upsellStrategy: UpsellStrategyOption.BLENDED,
  debugMode: true
};

window.looptimize = window.looptimize || new InCartUpsellService(inCartUpsellConfig);
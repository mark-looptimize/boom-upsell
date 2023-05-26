import { DataSource, FeatureConfiguration, InCartUpsellService, UpsellStrategyOption } from "./services/InCartUpsellService.js";

const inCartUpsellConfig: FeatureConfiguration = {
  dataSource: DataSource.LOCAL_STORAGE,
  upsellStrategy: UpsellStrategyOption.BLENDED,
  debugMode: false
};

window.looptimize = window.looptimize || new InCartUpsellService(inCartUpsellConfig);

window.dataLayer?.push({
  "event": "in-cart-upsell-script-installed"
});
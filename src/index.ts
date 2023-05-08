import { FeatureConfiguration, InCartUpsellService } from "./InCartUpsellService.js";
import { FakeDataRepository } from "./repository/FakeDataRepository.js";
import { BlendedUpsellStrategy } from "./strategies/BlendedUpsellStrategy.js";

const inCartUpsellTestConfig: FeatureConfiguration = {
  enabled: true,
  upsellStrategy: new BlendedUpsellStrategy(new FakeDataRepository())
};

const inCartUpsell = new InCartUpsellService(inCartUpsellTestConfig);
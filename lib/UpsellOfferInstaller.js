var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _UpsellOfferInstaller_instances, _UpsellOfferInstaller_product, _UpsellOfferInstaller_installComponent;
// Responsible for making sure the upsell offer element is correctly placed on the page
export class UpsellOfferInstaller {
    constructor(product) {
        _UpsellOfferInstaller_instances.add(this);
        _UpsellOfferInstaller_product.set(this, void 0);
        __classPrivateFieldSet(this, _UpsellOfferInstaller_product, product, "f");
        __classPrivateFieldGet(this, _UpsellOfferInstaller_instances, "m", _UpsellOfferInstaller_installComponent).call(this);
    }
}
_UpsellOfferInstaller_product = new WeakMap(), _UpsellOfferInstaller_instances = new WeakSet(), _UpsellOfferInstaller_installComponent = function _UpsellOfferInstaller_installComponent() {
    console.log(__classPrivateFieldGet(this, _UpsellOfferInstaller_product, "f"));
};
//# sourceMappingURL=UpsellOfferInstaller.js.map
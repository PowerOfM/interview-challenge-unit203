const { DELIVERY_DATES } = require("./constants")

module.exports = function computeDeliveryDate(item, postalCode) {
  for (const deliveryDate of DELIVERY_DATES) {
    if (deliveryDate.potal === postalCode[0] && deliveryDate.ids.includes(item.id)) {
      return deliveryDate.estimatedDeliveryDate
    }
  }
  return 'Unknown'
}

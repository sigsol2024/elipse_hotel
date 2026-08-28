/**
 * Facilities page imagery — cover (section background) + gallery (modal slider).
 * Restaurant gallery uses the dining folder. Room service has no dedicated folder yet,
 * so it borrows reception / dining / suite photos.
 */
(function () {
  var F = "/assets/images/facilities/";
  var D = "/assets/images/dining/";
  var bar = F + "Bar and Lounge/";
  var pool = F + "pool/";
  var reception = F + "Reception/";
  var suite = "/assets/images/hotel/rooms/SUITE/";

  function rest(cover, all) {
    return all.filter(function (src) {
      return src !== cover;
    });
  }

  var poolAll = [
    pool + "_DSC8548.jpg",
    pool + "_DSC8480.jpg",
    pool + "_DSC8592.jpg",
    pool + "_DSC8600.jpg",
    pool + "_DSC8667.jpg",
    pool + "_DSC8715.jpg",
    pool + "_DSC8718.jpg",
    pool + "_DSC8726.jpg",
    pool + "_DSC8743.jpg",
    pool + "_DSC8757.jpg",
    pool + "_DSC8781.jpg",
    pool + "_DSC8830.jpg",
    pool + "_DSC8854.jpg",
    pool + "DJI_0972.jpg",
    pool + "DJI_0973.jpg",
    pool + "DJI_0974.jpg"
  ];

  var barAll = [
    bar + "_DSC8169.jpg",
    bar + "_DSC8526.jpg",
    bar + "_DSC8531.jpg",
    bar + "_DSC8537.jpg",
    bar + "_DSC8545.jpg",
    bar + "_DSC8546.jpg",
    bar + "_DSC8564.jpg",
    bar + "_DSC8582.jpg",
    bar + "_DSC8599.jpg",
    bar + "_DSC8605.jpg",
    bar + "_DSC8629.jpg",
    bar + "_DSC8631.jpg",
    bar + "_DSC8642.jpg",
    bar + "_DSC8644.jpg",
    bar + "_DSC8701.jpg",
    bar + "_DSC8745.jpg",
    bar + "_DSC8794.jpg",
    bar + "_DSC8796.jpg",
    bar + "_DSC8892.jpg"
  ];

  var receptionAll = [
    reception + "_DSC8189.jpg",
    reception + "_DSC8195.jpg",
    reception + "_DSC8211.jpg",
    reception + "_DSC8375.jpg",
    reception + "_DSC8376.jpg",
    reception + "_DSC8380.jpg"
  ];

  var diningAll = [
    D + "DSC8163.jpg",
    D + "DSC8164.jpg",
    D + "DSC8165.jpg",
    D + "DSC8166.jpg",
    D + "DSC8169.jpg",
    D + "DSC8177.jpg",
    D + "DSC8178.jpg",
    D + "DSC8179.jpg",
    D + "DSC8200.jpg",
    D + "DSC8201.jpg",
    D + "DSC8203.jpg",
    D + "DSC8204.jpg",
    D + "DSC8205.jpg",
    D + "DSC8207.jpg"
  ];

  var poolCover = poolAll[0];
  var barCover = barAll[0];
  var receptionCover = receptionAll[0];
  var restaurantCover = D + "DSC8178.jpg";
  var serviceCover = reception + "_DSC8380.jpg";

  var serviceAll = [
    serviceCover,
    D + "DSC8164.jpg",
    D + "DSC8201.jpg",
    reception + "_DSC8376.jpg",
    suite + "DSC8268.jpg",
    suite + "DSC8274.jpg"
  ];

  window.EllipseFacilityImages = {
    pool: { cover: poolCover, gallery: rest(poolCover, poolAll) },
    restaurant: { cover: restaurantCover, gallery: rest(restaurantCover, diningAll) },
    bar: { cover: barCover, gallery: rest(barCover, barAll) },
    reception: { cover: receptionCover, gallery: rest(receptionCover, receptionAll) },
    service: { cover: serviceCover, gallery: rest(serviceCover, serviceAll) }
  };
})();

const covid19ImpactEstimator = (data) => {
  const impact = {};
  const severeImpact = {};
  // CHALLENGE 1
  impact.currentlyInfected = data.reportedCases * 10;
  severeImpact.currentlyInfected = data.reportedCases * 50;
  // Duration in days
  if (data.periodType === 'days') {
    impact.infectionsByRequestedTime = impact.currentlyInfected
    * 2 ** Math.floor(data.timeToElapse / 3);
    severeImpact.infectionsByRequestedTime = severeImpact.currentlyInfected
    * 2 ** Math.floor(data.timeToElapse / 3);
  // Duration in weeks
  } else if (data.periodType === 'weeks') {
    impact.infectionsByRequestedTime = impact.currentlyInfected
    * 2 ** Math.floor((data.timeToElapse * 7) / 3);
    severeImpact.infectionsByRequestedTime = severeImpact.currentlyInfected
    * 2 ** Math.floor((data.timeToElapse * 7) / 3);
  // Duration in months
  } else {
    impact.infectionsByRequestedTime = impact.currentlyInfected
    * 2 ** Math.floor((data.timeToElapse * 30) / 3);
    severeImpact.infectionsByRequestedTime = severeImpact.currentlyInfected
    * 2 ** Math.floor((data.timeToElapse * 30) / 3);
  }

  // CHALLENGE 2
  impact.severeCasesByRequestedTime = Math.trunc(impact.infectionsByRequestedTime * 0.15);
  severeImpact.severeCasesByRequestedTime = Math.trunc(severeImpact.infectionsByRequestedTime
    * 0.15);
  // Available beds for severe affected customers
  const totalBedsforSevere = data.totalHospitalBeds * 0.35;
  impact.hospitalBedsByRequestedTime = Math.trunc(totalBedsforSevere
  - impact.severeCasesByRequestedTime);
  // Available number of beds for severeimpact
  severeImpact.hospitalBedsByRequestedTime = Math.trunc(totalBedsforSevere
  - severeImpact.severeCasesByRequestedTime);
  // Challenge 3
  // Severe cases for ICU
  impact.casesForICUByRequestedTime = Math.floor(0.05 * impact.infectionsByRequestedTime);
  severeImpact.casesForICUByRequestedTime = Math.floor(0.05
  * severeImpact.infectionsByRequestedTime);
  // Severe cases for Ventilators
  impact.casesForVentilatorsByRequestedTime = Math.floor(0.02
  * impact.infectionsByRequestedTime);
  severeImpact.casesForVentilatorsByRequestedTime = Math.floor(0.02
  * severeImpact.infectionsByRequestedTime);
  // Income loss Estimation
  const totalImpactLoss = impact.infectionsByRequestedTime
  * data.region.avgDailyIncomePopulation
  * data.region.avgDailyIncomeInUSD;
  const totalSevereImpactLoss = severeImpact.infectionsByRequestedTime
  * data.region.avgDailyIncomePopulation * data.region.avgDailyIncomeInUSD;
  // Estimate and round off
  if (data.periodType === 'days') {
    impact.dollarsInFlight = Math.floor(totalImpactLoss * data.timeToElapse * 100) / 100;
    severeImpact.dollarsInFlight = Math.floor(totalSevereImpactLoss * data.timeToElapse
    * 100) / 100;
  } else if (data.periodType === 'weeks') {
    impact.dollarsInFlight = Math.floor(totalImpactLoss * data.timeToElapse * 7 * 100) / 100;
    severeImpact.dollarsInFlight = Math.floor(totalSevereImpactLoss * data.timeToElapse
    * 7 * 100) / 100;
  } else {
    impact.dollarsInFlight = Math.floor(totalImpactLoss * data.timeToElapse * 30 * 100) / 100;
    severeImpact.dollarsInFlight = Math.floor(totalSevereImpactLoss * data.timeToElapse
    * 30 * 100) / 100;
  }
  return { data, impact, severeImpact };
};
export default covid19ImpactEstimator;



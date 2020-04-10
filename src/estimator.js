
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
  impact.severeCasesByRequestedTime = Math.floor(impact.infectionsByRequestedTime * 0.15);
  severeImpact.severeCasesByRequestedTime = Math.floor(severeImpact.infectionsByRequestedTime
    * 0.15);
  // Available beds for severe affected customers
  const totalBedsforSevere = data.totalHospitalBeds * 0.35;
  impact.hospitalBedsByRequestedTime = totalBedsforSevere - impact.severeCasesByRequestedTime;
  // Available number of beds for severeimpact
  severeImpact.hospitalBedsByRequestedTime = totalBedsforSevere
  - severeImpact.severeCasesByRequestedTime;
  return { data, impact, severeImpact };
};
export default covid19ImpactEstimator;

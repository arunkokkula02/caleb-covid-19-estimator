const data = {
  region: {
  name: "Africa",
  avgAge: 19.7,
  avgDailyIncomeInUSD: 5,
  avgDailyIncomePopulation: 0.71
  },
  periodType: "days",
  timeToElapse: 58,
  reportedCases: 674,
  population: 66622705,
  totalHospitalBeds: 1380614
  }
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
  return { data, impact, severeImpact };
};
console.log(covid19ImpactEstimator(data))
//export default covid19ImpactEstimator;

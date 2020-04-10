
const covid19ImpactEstimator = (data) => {
  const impact = {};
  const severeImpact = {};
  // CHALLENGE 1
  impact.currentlyInfected = data.reportedCases * 10;
  severeImpact.currentlyInfected = data.reportedCases * 50;
  // Duration in days
  if(data.periodType === 'days') {
    impact.infectionsByRequestedTime = impact.currentlyInfected
    * Math.pow(2,Math.floor(data.timeToElapse / 3));
    severeImpact.infectionsByRequestedTime = severeImpact.currentlyInfected
    * Math.pow(2,Math.floor(data.timeToElapse / 3));
  // Duration in weeks
  }else if(data.periodType === 'weeks') {
    impact.infectionsByRequestedTime = impact.currentlyInfected
    * Math.pow(2,Math.floor((data.timeToElapse * 7) / 3));
    severeImpact.infectionsByRequestedTime = severeImpact.currentlyInfected
    * Math.pow(2,Math.floor((data.timeToElapse * 7) / 3));
  // Duration in months
  }else{
    impact.infectionsByRequestedTime = impact.currentlyInfected
    * Math.pow(2,Math.floor((data.timeToElapse * 30) / 3));
    severeImpact.infectionsByRequestedTime = severeImpact.currentlyInfected
    * Math.pow(2,Math.floor((data.timeToElapse * 30) / 3));
  };
  return { data, impact, severeImpact };
};
export default covid19ImpactEstimator;

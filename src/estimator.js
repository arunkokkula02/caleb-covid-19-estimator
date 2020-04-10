const covid19ImpactEstimator = (data) => {
  const impact = {};
  const severeImpact = {};
  // CHALLENGE 1
  impact.currentlyInfected = data.reportedCases * 10;
  severeImpact.currentlyInfected = data.reportedCases * 50;
  impact.infectionsByRequestedTime = impact.currentlyInfected * 10 * 512;
  severeImpact.infectionsByRequestedTime = severeImpact.currentlyInfected * 50 * 512;
  impact.severeCasesByRequestedTime = Math.floor(impact.infectionsByRequestedTime * (15 / 100));
  severeImpact.severeCasesByRequestedTime = Math.floor(severeImpact.infectionsByRequestedTime * 
    (15 / 100));
return {data:data,impact,severeImpact};
}

export default covid19ImpactEstimator;

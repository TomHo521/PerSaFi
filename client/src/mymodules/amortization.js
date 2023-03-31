function pmt(rate, nper, pv, type = 0, fv = 0) {
  if (rate === 0) return -(pv + fv) / nper;
 
  const pvif = Math.pow(1 + rate, nper);
  let pmt = rate / (pvif - 1) * -(pv * pvif + fv);
 
  if (type === 1) {
    pmt /= (1 + rate);
  }
 
  return pmt;
}
 
function ppmt(rate, per, nper, pv, type = 0, fv = 0) {
  if (per < 1 || per >= nper + 1) return null;
  const pmtVal = pmt(rate, nper, pv, type, fv);
  const fvif = Math.pow(1 + rate, nper - per + 1);
  return -(pv * fvif + pmtVal * (fvif - 1)) * rate;
}
 
function ipmt(rate, per, nper, pv, type = 0, fv = 0) {
  if (per < 1 || per >= nper + 1) return null;
  const pmtVal = pmt(rate, nper, pv, type, fv);
  const ppmtVal = ppmt(rate, per, nper, pv, type, fv);
  return pmtVal - ppmtVal;
}

module.exports = { pmt, ppmt, ipmt };

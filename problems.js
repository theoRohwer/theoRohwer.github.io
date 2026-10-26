/* Multi-part, homework-style problems for AAE 412/512.
   Each generator returns { setup, parts:[{ q, ans, unit, sig?, abs?, steps:[] }] }.
   gen(o) accepts overrides so answers can be checked against the homework keys. */
(function () {
"use strict";
const R = String.raw;
const MU = 398600, RE = 6371, REQ = 6378, G0 = 9.81, QE = 1.6e-19, AMU = 1.66e-27, ME = 9.11e-31, MUS = 1.327e11, J2 = 1.08263e-3;
const D2R = Math.PI / 180, R2D = 180 / Math.PI, DAY = 86400;
const rnd = (a, b, s) => { const st = s || 1; return Math.round((a + Math.random() * (b - a)) / st) * st; };
const pick = a => a[Math.floor(Math.random() * a.length)];
const f = (x, d) => Number(x).toLocaleString("en-US", { maximumFractionDigits: d == null ? 3 : d, minimumFractionDigits: 0 });
const ex = (x, d) => { const s = Number(x).toExponential(d == null ? 3 : d); const [m, e] = s.split("e"); return `${m}\\times10^{${Number(e)}}`; };
const HW = [];
function hw(id, t, mr, title, based, eq, src, gen) { HW.push({ id, t, mr: !!mr, title, based, eq, src, gen }); }

/* ---------- HW 1 #1: exponential atmosphere, drag, torque ---------- */
hw("hw-drag","env",1,"Atmosphere, drag and disturbance torque","HW 1 #1",["expatm","drag","aerotorque","vcirc"],"Space Env notes p.1–2; HW1 #1",(o={})=>{
  const z = o.z ?? pick([120,130,140,150,160,180]), A = o.A ?? rnd(1,3,0.25), d = o.d ?? rnd(0.2,0.6,0.05), CD = 2.2;
  const rho = 1.225*Math.exp(-z/8), r = RE+z, v = Math.sqrt(MU/r), F = 0.5*rho*CD*A*(v*1000)**2, M = F*d;
  return { setup: R`A rectangular spacecraft with a ram area of ${f(A,2)} m² and \(C_D = 2.2\) is in a circular orbit at ${z} km. Use the exponential atmosphere with \(n_0 = 1.225\ \mathrm{kg/m^3}\) and \(H = 8\) km, \(\mu_\oplus = 398{,}600\ \mathrm{km^3/s^2}\), and \(R_\oplus = 6371\) km. The center of pressure is offset ${f(d,2)} m from the center of mass, normal to the ram direction.`,
    parts: [
      { q: R`Atmospheric density at ${z} km`, ans: rho, unit: "kg/m³", sig: true, steps: [R`\(\rho = n_0 e^{-z/H} = 1.225\,e^{-${z}/8} = ${ex(rho)}\ \mathrm{kg/m^3}\)`] },
      { q: "Orbital speed", ans: v, unit: "km/s", steps: [R`\(r = 6371 + ${z} = ${f(r,0)}\) km`, R`\(v = \sqrt{\mu/r} = ${f(v,4)}\) km/s`] },
      { q: "Drag force", ans: F, unit: "N", sig: true, steps: [R`Convert speed to m/s: \(v = ${f(v*1000,0)}\) m/s`, R`\(F_D = \tfrac12\rho C_D A v^2 = \tfrac12(${ex(rho)})(2.2)(${f(A,2)})(${f(v*1000,0)})^2 = ${ex(F)}\) N`] },
      { q: "Disturbance torque about the center of mass", ans: M, unit: "N·m", sig: true, steps: [R`\(M_d = F_D(c_p - c_g) = (${ex(F)})(${f(d,2)}) = ${ex(M)}\) N·m`] }
    ] };
});

/* ---------- HW 1 #2b: rotational motion primer ---------- */
hw("hw-primer","orb",0,"Circular orbit from a speed","HW 1 #2b",["vcirc","period"],"HW1 #2b; Astro notes p.6–7",(o={})=>{
  const mph = o.mph ?? rnd(15500,17200,100), T2 = o.T2 ?? pick([6,8,12,16]);
  const v = mph*1.609/3600, r = MU/(v*v), h = r-RE, P = 2*Math.PI*r/v/3600, g = MU/(r*r)*1000;
  const r2 = Math.cbrt(MU*(T2*3600/(2*Math.PI))**2), h2 = r2-RE;
  return { setup: R`A satellite is in a circular LEO at a constant speed of ${f(mph,0)} mph with no drag. Use 1 mi = 1.609 km, \(\mu_\oplus = 398{,}600\ \mathrm{km^3/s^2}\) and \(R_\oplus = 6371\) km.`,
    parts: [
      { q: "Speed in km/s", ans: v, unit: "km/s", steps: [R`\(v = ${f(mph,0)}\times1.609/3600 = ${f(v,4)}\) km/s`] },
      { q: "Orbit radius", ans: r, unit: "km", steps: [R`\(v = \sqrt{\mu/r}\Rightarrow r = \mu/v^2 = 398{,}600/${f(v,4)}^2 = ${f(r,0)}\) km`] },
      { q: "Altitude", ans: h, unit: "km", steps: [R`\(h = r - R_\oplus = ${f(r,0)} - 6371 = ${f(h,0)}\) km`] },
      { q: "Orbital period", ans: P, unit: "hr", steps: [R`\(T = 2\pi r/v = ${f(P*3600,0)}\) s \(= ${f(P,3)}\) hr`] },
      { q: "Gravitational acceleration at that radius", ans: g, unit: "m/s²", steps: [R`\(a = \mu/r^2 = ${f(MU/(r*r),6)}\ \mathrm{km/s^2} = ${f(g,3)}\ \mathrm{m/s^2}\)`] },
      { q: R`Altitude needed for a ${T2}-hour circular orbit`, ans: h2, unit: "km", steps: [R`\(r = \left(\mu\,(T/2\pi)^2\right)^{1/3} = ${f(r2,0)}\) km`, R`\(h = r - 6371 = ${f(h2,0)}\) km`] }
    ] };
});

/* ---------- HW 2 #1: orbit determination ---------- */
hw("hw-orbdet","orb",1,"Orbit determination from r and v","HW 2 #1",["energy","angmom","traj","geom","visviva","vcirc"],"Astro notes p.3–6; HW2 #1",(o={})=>{
  const h = o.h ?? rnd(300,800,50), rp = RE+h, vc = Math.sqrt(MU/rp), vesc = Math.sqrt(2*MU/rp);
  const v = o.v ?? Math.round((vc + (0.25+0.6*Math.random())*(vesc-vc))*10)/10;
  const eps = v*v/2 - MU/rp, H = rp*v, a = -MU/(2*eps), e = Math.sqrt(1+2*eps*H*H/(MU*MU)), p = H*H/MU, ra = a*(1+e), va = H/ra;
  return { setup: R`A spacecraft is observed at an altitude of ${h} km with a speed of ${f(v,1)} km/s, and its velocity is perpendicular to its radius vector. Use \(R_\oplus = 6371\) km and \(\mu_\oplus = 398{,}600\ \mathrm{km^3/s^2}\).`,
    parts: [
      { q: R`Specific mechanical energy \(\varepsilon\)`, ans: eps, unit: "km²/s²", abs: 0.05, steps: [R`\(r = ${f(rp,0)}\) km`, R`\(\varepsilon = v^2/2 - \mu/r = ${f(v*v/2,3)} - ${f(MU/rp,3)} = ${f(eps,3)}\ \mathrm{km^2/s^2}\)`, R`\(\varepsilon < 0\), so the orbit is elliptical.`] },
      { q: R`Specific angular momentum \(H\)`, ans: H, unit: "km²/s", steps: [R`Velocity is perpendicular to \(\vec r\), so \(\phi = 0\): \(H = rv = (${f(rp,0)})(${f(v,1)}) = ${f(H,0)}\ \mathrm{km^2/s}\)`] },
      { q: R`Semi-major axis \(a\)`, ans: a, unit: "km", steps: [R`\(a = -\mu/(2\varepsilon) = ${f(a,0)}\) km`] },
      { q: R`Eccentricity \(e\)`, ans: e, unit: "", steps: [R`\(e = \sqrt{1 + 2\varepsilon H^2/\mu^2} = ${f(e,4)}\)`, R`Check: \(e = 1 - r_p/a = ${f(1-rp/a,4)}\)`] },
      { q: R`Parameter \(p\)`, ans: p, unit: "km", steps: [R`\(p = H^2/\mu = ${f(p,0)}\) km (also \(= a(1-e^2)\))`] },
      { q: "Altitude at apogee", ans: ra-RE, unit: "km", steps: [R`\(r_a = a(1+e) = ${f(ra,0)}\) km`, R`\(h_a = r_a - 6371 = ${f(ra-RE,0)}\) km`] },
      { q: "Speed at apogee", ans: va, unit: "km/s", steps: [R`\(v_a = H/r_a = ${f(H,0)}/${f(ra,0)} = ${f(va,4)}\) km/s (vis-viva gives the same)`] },
      { q: "Minimum speed at the observed point for an escape trajectory", ans: vesc, unit: "km/s", steps: [R`\(v_{esc} = \sqrt{2\mu/r} = ${f(vesc,4)}\) km/s`] }
    ] };
});

/* ---------- HW 2 #2: lunar transfer ---------- */
hw("hw-lunar","man",1,"Transfer to lunar distance","HW 2 #2",["vcirc","geom","hohmann","phase","period"],"Astro notes p.9–10; Interplanetary s.14; HW2 #2",(o={})=>{
  const h = o.h ?? rnd(200,600,50), rM = 385000, Tm = 27.3;
  const r1 = RE+h, v1 = Math.sqrt(MU/r1), a = (r1+rM)/2, e = (rM-r1)/(rM+r1), p = a*(1-e*e), vp = Math.sqrt(MU*(2/r1-1/a));
  const tof = Math.PI*Math.sqrt(a**3/MU), moved = 360*tof/(Tm*DAY), phi = 180-moved;
  return { setup: R`A spacecraft in a ${h} km circular orbit makes one impulsive burn to enter an ellipse whose apoapsis reaches the Moon's mean distance of 385,000 km. The Moon is in a circular orbit with a 27.3-day period. Use \(R_\oplus = 6371\) km.`,
    parts: [
      { q: "Circular speed before the burn", ans: v1, unit: "km/s", steps: [R`\(r_1 = ${f(r1,0)}\) km; \(v_c = \sqrt{\mu/r_1} = ${f(v1,4)}\) km/s`] },
      { q: R`Semi-major axis of the transfer ellipse`, ans: a, unit: "km", steps: [R`\(a = (r_1 + r_a)/2 = (${f(r1,0)} + 385{,}000)/2 = ${f(a,0)}\) km`] },
      { q: R`Eccentricity of the transfer ellipse`, ans: e, unit: "", steps: [R`\(e = (r_a - r_p)/(r_a + r_p) = ${f(e,4)}\)`, R`(Parameter \(p = a(1-e^2) = ${f(p,0)}\) km)`] },
      { q: R`\(\Delta v\) for the burn`, ans: vp-v1, unit: "km/s", steps: [R`\(v_p = \sqrt{\mu(2/r_1 - 1/a)} = ${f(vp,4)}\) km/s`, R`\(\Delta v = v_p - v_c = ${f(vp-v1,4)}\) km/s`] },
      { q: "Time of flight to apoapsis", ans: tof/3600, unit: "hr", steps: [R`\(\mathrm{TOF} = \pi\sqrt{a^3/\mu} = ${f(tof,0)}\) s \(= ${f(tof/3600,2)}\) hr`] },
      { q: "Phase angle (Moon ahead of the spacecraft) at the burn", ans: phi, unit: "deg", abs: 0.5, steps: [R`Moon moves \(360°\cdot\mathrm{TOF}/T_{moon} = 360°\cdot${f(tof/DAY,3)}/27.3 = ${f(moved,2)}°\) during the transfer`, R`\(\phi = 180° - ${f(moved,2)}° = ${f(phi,2)}°\)`] }
    ] };
});

/* ---------- HW 2 #3: LEO to GEO, three options ---------- */
hw("hw-leogeo","man",1,"LEO to GEO with a plane change: three transfers","HW 2 #3",["hohmann","planechange","edelbaum"],"Astro notes p.8–11; Midterm Review s.10–11; HW2 #3",(o={})=>{
  const h = o.h ?? rnd(300,800,25), inc = o.i ?? pick([28.5,38,45,51.6,5.2,62.9]), r1 = RE+h, r2 = 42164;
  const vc1 = Math.sqrt(MU/r1), vc2 = Math.sqrt(MU/r2), at = (r1+r2)/2, vp = Math.sqrt(MU*(2/r1-1/at)), va = Math.sqrt(MU*(2/r2-1/at));
  const d1 = vp-vc1, d2 = vc2-va, d3 = 2*vc2*Math.sin(inc*D2R/2), comb = Math.sqrt(va*va+vc2*vc2-2*va*vc2*Math.cos(inc*D2R));
  const ed = Math.sqrt(vc1*vc1+vc2*vc2-2*vc1*vc2*Math.cos(Math.PI/2*inc*D2R));
  return { setup: R`A spacecraft is launched into a ${h} km circular LEO with inclination ${inc}°. It must reach GEO (\(r = 42{,}164\) km) at 0° inclination. Treat all burns as impulsive except in Transfer III. Use \(R_\oplus = 6371\) km.`,
    parts: [
      { q: R`Transfer I, burn 1: \(\Delta v_1\) at LEO onto the transfer ellipse`, ans: d1, unit: "km/s", steps: [R`\(a_{tr} = (${f(r1,0)} + 42{,}164)/2 = ${f(at,0)}\) km`, R`\(v_{c1} = ${f(vc1,4)}\), \(v_p = ${f(vp,4)}\) km/s, so \(\Delta v_1 = ${f(d1,4)}\) km/s`] },
      { q: R`Transfer I, burn 2: circularize at GEO`, ans: d2, unit: "km/s", steps: [R`\(v_a = ${f(va,4)}\), \(v_{c2} = ${f(vc2,4)}\) km/s, so \(\Delta v_2 = ${f(d2,4)}\) km/s`] },
      { q: R`Transfer I, burn 3: ${inc}° plane change at GEO`, ans: d3, unit: "km/s", steps: [R`\(\Delta v_3 = 2v_{c2}\sin(\Delta i/2) = 2(${f(vc2,4)})\sin(${f(inc/2,2)}°) = ${f(d3,4)}\) km/s`] },
      { q: "Transfer I total", ans: d1+d2+d3, unit: "km/s", steps: [R`\(\Delta v_I = ${f(d1,4)} + ${f(d2,4)} + ${f(d3,4)} = ${f(d1+d2+d3,4)}\) km/s`] },
      { q: R`Transfer II: circularize and change plane in one burn at apogee`, ans: comb, unit: "km/s", steps: [R`\(\Delta v = \sqrt{v_a^2 + v_{c2}^2 - 2v_av_{c2}\cos\Delta i} = ${f(comb,4)}\) km/s`, R`Transfer II total \(= \Delta v_1 + ${f(comb,4)} = ${f(d1+comb,4)}\) km/s, saving ${f((d2+d3-comb)*1000,0)} m/s over Transfer I`] },
      { q: R`Transfer III: low-thrust spiral (Edelbaum)`, ans: ed, unit: "km/s", steps: [R`\(\Delta\alpha = ${inc}° = ${f(inc*D2R,4)}\) rad`, R`\(\Delta v = \sqrt{v_{c1}^2 + v_{c2}^2 - 2v_{c1}v_{c2}\cos(\tfrac{\pi}{2}\Delta\alpha)} = ${f(ed,4)}\) km/s`] }
    ] };
});

/* ---------- HW 2 #4: coverage geometry ---------- */
hw("hw-cover","cov",0,"Earth coverage geometry","HW 2 #4",["coverage"],"Astro Pt2 s.12–14; HW2 #4",(o={})=>{
  const H = o.H ?? pick([800,1000,1500,10000,20000,35786]), eps = o.eps ?? pick([5,8,10,15]);
  const rho = Math.asin(RE/(RE+H))*R2D, eta = Math.asin(Math.cos(eps*D2R)*Math.sin(rho*D2R))*R2D, lam = 90-eta-eps;
  const D = RE*Math.sin(lam*D2R)/Math.sin(eta*D2R), F = (1-Math.cos(lam*D2R))/2;
  return { setup: R`A satellite is in a circular orbit at altitude \(H = ${f(H,0)}\) km. A ground target needs a minimum elevation angle of \(\varepsilon = ${eps}°\). Use \(R_E = 6371\) km.`,
    parts: [
      { q: R`Angular radius of the Earth, \(\rho\), seen from the satellite`, ans: rho, unit: "deg", abs: 0.1, steps: [R`\(\sin\rho = R_E/(R_E + H) = ${f(RE/(RE+H),5)}\), so \(\rho = ${f(rho,3)}°\)`] },
      { q: R`Nadir angle \(\eta\) to the edge of coverage`, ans: eta, unit: "deg", abs: 0.1, steps: [R`\(\sin\eta = \cos\varepsilon\,\sin\rho = ${f(Math.cos(eps*D2R)*Math.sin(rho*D2R),5)}\), so \(\eta = ${f(eta,3)}°\)`] },
      { q: R`Earth central angle \(\lambda\)`, ans: lam, unit: "deg", abs: 0.1, steps: [R`\(\lambda = 90° - \eta - \varepsilon = ${f(lam,3)}°\)`] },
      { q: R`Slant range \(D\) to the edge of coverage`, ans: D, unit: "km", steps: [R`\(D = R_E\sin\lambda/\sin\eta = ${f(D,0)}\) km`] },
      { q: "Fraction of Earth's surface in view", ans: F*100, unit: "%", steps: [R`\(F = \tfrac12(1-\cos\lambda) = ${f(F,5)} = ${f(F*100,3)}\%\)`] }
    ] };
});

/* ---------- HW 2 #6: ground station passes ---------- */
hw("hw-pass","cov",0,"Ground station visibility per pass","HW 2 #6",["coverage","period"],"Astro Pt2 s.12–15; HW2 #6",(o={})=>{
  const h = o.h ?? rnd(500,1000,50), eps = o.eps ?? pick([5,8,10,12]);
  const r = RE+h, P = 2*Math.PI*Math.sqrt(r**3/MU)/60, lam = Math.acos(Math.cos(eps*D2R)/(1+h/RE))*R2D-eps;
  const A = 2*Math.PI*RE*RE*(1-Math.cos(lam*D2R)), tpass = P*2*lam/360;
  return { setup: R`A LEO space telescope orbits at \(h = ${h}\) km. Its ground station needs the satellite at least ${eps}° above the horizon. Use \(R_E = 6371\) km and ignore Earth's rotation during a pass.`,
    parts: [
      { q: "Orbital period", ans: P, unit: "min", steps: [R`\(T = 2\pi\sqrt{r^3/\mu}\) with \(r = ${f(r,0)}\) km: \(${f(P,2)}\) min`] },
      { q: R`Maximum Earth central angle \(\lambda_{max}\)`, ans: lam, unit: "deg", abs: 0.1, steps: [R`\(\lambda = \cos^{-1}\!\left(\dfrac{\cos ${eps}°}{1 + ${h}/6371}\right) - ${eps}° = ${f(lam,3)}°\)`] },
      { q: "Area of instantaneous coverage", ans: A, unit: "km²", steps: [R`\(A_t = 2\pi R_E^2(1-\cos\lambda) = ${ex(A)}\ \mathrm{km^2}\)`] },
      { q: "Longest possible pass (directly overhead)", ans: tpass, unit: "min", steps: [R`An overhead pass sweeps \(2\lambda_{max} = ${f(2*lam,2)}°\) of the orbit`, R`\(t = T\cdot 2\lambda/360° = ${f(tpass,2)}\) min`] }
    ] };
});

/* ---------- HW 2 #5: J2 and sun-synchronous ---------- */
hw("hw-sso","cov",1,"Sun-synchronous orbit design (J₂)","HW 2 #5",["j2node","j2apse","sso"],"Astro Pt2 s.21–24; HW2 #5",(o={})=>{
  const h = o.h ?? rnd(600,1400,50), e = o.e ?? pick([0,0.05,0.1,0.15,0.25]);
  const a = REQ+h, n = Math.sqrt(MU/a**3), k = 1.5*J2*n*(REQ/(a*(1-e*e)))**2, Od = 0.9856*D2R/DAY;
  const ci = -Od/k, inc = Math.acos(ci)*R2D, wd = k*(2-2.5*Math.sin(inc*D2R)**2)*R2D*DAY;
  return { setup: R`Design a sun-synchronous orbit with average altitude ${h} km (take \(a = R_e + h\) with \(R_e = 6378\) km) and eccentricity ${e}. Use \(J_2 = 1.08263\times10^{-3}\).`,
    parts: [
      { q: R`Mean motion \(n\)`, ans: n, unit: "rad/s", sig: true, steps: [R`\(a = ${f(a,0)}\) km; \(n = \sqrt{\mu/a^3} = ${ex(n,4)}\) rad/s`] },
      { q: R`Required \(\dot\Omega\) in rad/s`, ans: Od, unit: "rad/s", sig: true, steps: [R`\(0.9856°/\text{day}\times\dfrac{\pi}{180}\times\dfrac{1}{86{,}400} = ${ex(Od,4)}\) rad/s`] },
      { q: "Inclination required", ans: inc, unit: "deg", abs: 0.1, steps: [R`\(\tfrac32J_2n\left(\tfrac{R_e}{a(1-e^2)}\right)^2 = ${ex(k,4)}\) rad/s`, R`\(\cos i = -\dot\Omega/${ex(k,4)} = ${f(ci,5)}\), so \(i = ${f(inc,3)}°\)`] },
      { q: R`Apsidal rotation \(\dot\omega\) at that inclination`, ans: wd, unit: "°/day", abs: 0.02, steps: [R`\(\dot\omega = \tfrac32J_2n\left(\tfrac{R_e}{a(1-e^2)}\right)^2\left(2-\tfrac52\sin^2 i\right) = ${f(wd,4)}°/\text{day}\)`] }
    ] };
});

/* ---------- HW 3 #1: propulsion trade ---------- */
hw("hw-trade","rkt",1,"LEO-to-GEO propulsion trade study","HW 3 #1",["rocket","isp"],"Propulsion notes p.3; Space Propulsion s.13–21; HW3 #1",(o={})=>{
  const mf = o.mf ?? rnd(800,1500,50), dv2 = o.dv2 ?? rnd(4.0,4.4,0.01), dv3 = o.dv3 ?? rnd(5.5,6.0,0.01);
  const mp = (isp, dv) => mf*(Math.exp(dv*1000/(isp*G0))-1);
  const hyd = mp(230,dv2), bip = mp(425,dv2), hall = mp(1850,dv3), ion = mp(4200,dv3);
  const st = (isp, dv, m) => [R`\(c = ${isp}\times9.81 = ${f(isp*G0,0)}\) m/s`, R`\(m_p = m_f\left(e^{\Delta V/c}-1\right) = ${f(mf,0)}\left(e^{${f(dv*1000/(isp*G0),4)}}-1\right) = ${f(m,1)}\) kg`];
  return { setup: R`A spacecraft with a delivered (dry) mass of ${f(mf,0)} kg is going from LEO to GEO. The impulsive Transfer II needs \(\Delta V = ${f(dv2,2)}\) km/s, and the low-thrust Transfer III needs \(\Delta V = ${f(dv3,2)}\) km/s.`,
    parts: [
      { q: "Propellant for Transfer II with hydrazine monoprop (Isp 230 s)", ans: hyd, unit: "kg", steps: st(230,dv2,hyd) },
      { q: "Propellant for Transfer II with a biprop engine (Isp 425 s)", ans: bip, unit: "kg", steps: st(425,dv2,bip) },
      { q: "Propellant for Transfer III with a Hall thruster (Isp 1850 s)", ans: hall, unit: "kg", steps: st(1850,dv3,hall) },
      { q: "Propellant for Transfer III with an ion thruster (Isp 4200 s)", ans: ion, unit: "kg", steps: st(4200,dv3,ion) },
      { q: "Propellant saved by the ion option compared with biprop", ans: bip-ion, unit: "kg", steps: [R`\(${f(bip,1)} - ${f(ion,1)} = ${f(bip-ion,1)}\) kg, despite the larger \(\Delta V\)`] }
    ] };
});

/* ---------- HW 3 #2: SRM with propellant mass fraction ---------- */
hw("hw-srm","chem",0,"Solid motor vs liquid, including case mass","HW 3 #2",["rocket","isp"],"Chem s.9; Propulsion notes p.3; HW3 #2",(o={})=>{
  const md = o.md ?? rnd(800,1500,50), dv = o.dv ?? rnd(1.6,2.2,0.01), ispL = o.ispL ?? 320, ispS = o.ispS ?? 285, fr = o.fr ?? 0.9;
  const xL = Math.exp(dv*1000/(ispL*G0))-1, mpL = md*xL;
  const xS = Math.exp(dv*1000/(ispS*G0))-1, k = (1-fr)/fr, mpS = md*xS/(1-k*xS), case_ = k*mpS;
  return { setup: R`A ${f(dv,2)} km/s orbit insertion burn is performed by a spacecraft with ${f(md,0)} kg of dry mass (not counting any motor case). Option 1 is a liquid biprop with \(I_{sp} = ${ispL}\) s (ignore its tank mass here). Option 2 is a solid motor with vacuum \(I_{sp} = ${ispS}\) s and a propellant mass fraction of ${fr}, meaning \(m_p/(m_p + m_{case}) = ${fr}\). The empty case stays attached during the burn.`,
    parts: [
      { q: "Liquid option: propellant mass", ans: mpL, unit: "kg", steps: [R`\(m_p = m_f(e^{\Delta V/c}-1) = ${f(md,0)}(${f(xL,5)}) = ${f(mpL,1)}\) kg`] },
      { q: "Solid option: propellant mass", ans: mpS, unit: "kg", steps: [R`The case adds \(m_{case} = m_p(1-f)/f = ${f(k,4)}\,m_p\) to the final mass`, R`\(m_p = (m_d + ${f(k,4)}m_p)(e^{\Delta V/c}-1)\) with \(e^{\Delta V/c}-1 = ${f(xS,5)}\)`, R`\(m_p = \dfrac{m_d(e^{\Delta V/c}-1)}{1 - ${f(k,4)}(e^{\Delta V/c}-1)} = ${f(mpS,1)}\) kg`] },
      { q: "Solid option: case mass", ans: case_, unit: "kg", steps: [R`\(m_{case} = ${f(k,4)}\times${f(mpS,1)} = ${f(case_,1)}\) kg`] },
      { q: "Solid option: total motor mass (propellant + case)", ans: mpS+case_, unit: "kg", steps: [R`\(${f(mpS,1)} + ${f(case_,1)} = ${f(mpS+case_,1)}\) kg, vs ${f(mpL,1)} kg of liquid propellant (plus its tanks)`] }
    ] };
});

/* ---------- HW 3 #3: liquid tank sizing ---------- */
hw("hw-tank","chem",0,"Spherical propellant tank sizing","HW 3 #3",["tank","rocket"],"Chem s.8; HW3 #3",(o={})=>{
  const dv = o.dv ?? rnd(1.5,4.0,0.1), md = o.md ?? rnd(300,600,10), isp = o.isp ?? rnd(300,330,5), rhoP = o.rhoP ?? pick([800,1000,1140]);
  const P = (o.P ?? rnd(500,2000,50))*1000, sig = 275e6, rhoAl = 2700, FS = 1.2;
  const x = Math.exp(dv*1000/(isp*G0))-1;
  const tankFor = mp => { const V = mp/rhoP, r = Math.cbrt(3*V/(4*Math.PI)), t = FS*P*r/(2*sig), m = 4*Math.PI*r*r*t*rhoAl; return { V, r, t, m }; };
  const mp0 = md*x, t0 = tankFor(mp0);
  let mp = mp0, it = 0, tk; do { tk = tankFor(mp); const nm = (md+tk.m)*x; if (Math.abs(nm-mp) < 1e-6) { mp = nm; break; } mp = nm; it++; } while (it < 50);
  return { setup: R`A liquid system must deliver \(\Delta V = ${f(dv,1)}\) km/s with \(I_{sp} = ${isp}\) s. The spacecraft dry mass without the tank is ${md} kg. Propellant density is ${rhoP} kg/m³. The spherical aluminum tank (\(\rho_{Al} = 2700\ \mathrm{kg/m^3}\), \(\sigma_Y = 275\) MPa) is pressurized to ${f(P/1000,0)} kPa and sized with a factor of safety of 1.2 on hoop stress.`,
    parts: [
      { q: "Propellant mass, ignoring the tank", ans: mp0, unit: "kg", steps: [R`\(m_p = ${md}\left(e^{\Delta V/c}-1\right) = ${md}(${f(x,5)}) = ${f(mp0,2)}\) kg`] },
      { q: "Tank radius for that propellant", ans: t0.r, unit: "m", steps: [R`\(V = m_p/\rho = ${f(t0.V,5)}\ \mathrm{m^3}\)`, R`\(r = (3V/4\pi)^{1/3} = ${f(t0.r,4)}\) m`] },
      { q: "Wall thickness", ans: t0.t*1000, unit: "mm", sig: true, steps: [R`\(\sigma = Pr/2t \Rightarrow t = FS\cdot Pr/(2\sigma_Y) = 1.2(${f(P,0)})(${f(t0.r,4)})/(2\cdot275\times10^6) = ${f(t0.t*1000,4)}\) mm`] },
      { q: "Tank mass", ans: t0.m, unit: "kg", steps: [R`\(m_{tank} = 4\pi r^2 t\,\rho_{Al} = ${f(t0.m,3)}\) kg`] },
      { q: "Propellant mass once the tank's own mass is included (iterate to convergence)", ans: mp, unit: "kg", steps: [R`Repeat: \(m_p = (m_d + m_{tank}(m_p))(e^{\Delta V/c}-1)\), resizing the tank each time`, R`Converges to \(m_p = ${f(mp,2)}\) kg with a ${f(tk.m,3)} kg tank (r = ${f(tk.r,4)} m)`] }
    ] };
});

/* ---------- HW 3 #4: Hall thruster ---------- */
hw("hw-hall","ep",1,"Hall thruster performance","HW 3 #4",["vplus","epeff","epperf","gyro"],"Propulsion notes p.7–8; Space Env s.26–27; HW3 #4",(o={})=>{
  const gas = o.gas ?? pick([["xenon",131.3],["krypton",83.8],["argon",39.9]]), VB = o.VB ?? rnd(250,400,25), PE = o.PE ?? rnd(1.2,3.0,0.1);
  const md = (o.mdot ?? rnd(5,15,0.5))*1e-6, eta = o.eta ?? rnd(0.45,0.65,0.05), BG = o.B ?? pick([150,200,300,500]);
  const m = gas[1]*AMU, vp = Math.sqrt(2*QE*VB/m), F = Math.sqrt(2*eta*PE*1000*md), c = F/md, isp = c/G0, B = BG*1e-4;
  const ri = m*vp/(QE*B), ve = Math.sqrt(2*20*QE/ME), re = ME*ve/(QE*B);
  return { setup: R`A Hall thruster runs on ${gas[0]} (${gas[1]} amu) at \(V_B = ${VB}\) V with \(P_E = ${f(PE,1)}\) kW of input power, \(\dot m = ${f(md*1e6,1)}\) mg/s and total efficiency \(\eta_T = ${f(eta,2)}\). The radial magnetic field is ${BG} G and the channel is 30 mm long. Use \(e = 1.6\times10^{-19}\) C, 1 amu \(= 1.66\times10^{-27}\) kg, \(m_e = 9.11\times10^{-31}\) kg.`,
    parts: [
      { q: R`Ideal singly charged ion exit speed \(v_+\)`, ans: vp/1000, unit: "km/s", steps: [R`\(m = ${gas[1]}\times1.66\times10^{-27} = ${ex(m)}\) kg`, R`\(v_+ = \sqrt{2eV_B/m} = ${f(vp/1000,3)}\) km/s`] },
      { q: "Thrust, using the total efficiency", ans: F*1000, unit: "mN", steps: [R`\(\eta_TP_E = \tfrac12\dot mc^2 = \tfrac{F^2}{2\dot m}\Rightarrow F = \sqrt{2\eta_TP_E\dot m}\)`, R`\(F = \sqrt{2(${f(eta,2)})(${f(PE*1000,0)})(${ex(md)})} = ${f(F*1000,2)}\) mN`] },
      { q: "Specific impulse", ans: isp, unit: "s", steps: [R`\(c = F/\dot m = ${f(c,0)}\) m/s; \(I_{sp} = c/g = ${f(isp,0)}\) s`, R`(Below the ideal \(v_+/g = ${f(vp/G0,0)}\) s because of efficiency losses)`] },
      { q: "Ion Larmor (gyro) radius", ans: ri, unit: "m", steps: [R`\(B = ${BG}\ \mathrm{G} = ${ex(B,1)}\) T`, R`\(r_g = mv_+/(eB) = ${f(ri,3)}\) m, which is ${f(ri/0.03,0)}× the 30 mm channel, so ions are effectively unmagnetized`] },
      { q: "Electron Larmor radius for 20 eV electrons", ans: re*1000, unit: "mm", steps: [R`\(v_e = \sqrt{2(20\,e)/m_e} = ${ex(ve)}\) m/s`, R`\(r_g = m_ev_e/(eB) = ${f(re*1000,4)}\) mm, much smaller than 30 mm, so electrons are magnetized`] }
    ] };
});

/* ---------- HW 4 #1: launch site inclination penalty ---------- */
hw("hw-incl","lau",1,"Launch site latitude and inclination","HW 4 #1",["azimuth","planechange","launchdv"],"Launch notes p.1–3; HW4 #1",(o={})=>{
  const site = o.site ?? pick([["KSC",28.57],["Plesetsk",62.92],["Vandenberg",34.7]]), h = o.h ?? pick([200,480,500,1000,1500]);
  const it = o.it ?? pick([0,5,10,15,20]), iHi = o.iHi ?? rnd(site[1]+5, Math.min(site[1]+35, 88), 1), d = site[1];
  const r = RE+h, v = Math.sqrt(MU/r), dvEq = 2*v*Math.sin(d*D2R/2), dvT = 2*v*Math.sin((d-it)*D2R/2);
  const A = Math.asin(Math.cos(iHi*D2R)/Math.cos(d*D2R))*R2D, boost = (2*Math.PI/DAY)*RE*Math.cos(d*D2R)*Math.sin(A*D2R)*1000;
  return { setup: R`An upper stage launches from ${site[0]} (latitude ${d}°) into a ${h} km circular orbit, then performs any plane change needed at that orbit, at a node in the equatorial plane. Use \(R_\oplus = 6371\) km and \(\omega_\oplus = 2\pi/24\) hr.`,
    parts: [
      { q: "Circular orbit speed", ans: v, unit: "km/s", steps: [R`\(v = \sqrt{\mu/(R_\oplus+h)} = ${f(v,4)}\) km/s`] },
      { q: "Minimum Δv to end up in an equatorial orbit", ans: dvEq, unit: "km/s", steps: [R`Launch due east gives the lowest direct inclination, \(i = \delta = ${d}°\)`, R`\(\Delta v = 2v\sin(\delta/2) = ${f(dvEq,4)}\) km/s`] },
      { q: R`Minimum Δv to end up at \(i = ${it}°\)`, ans: dvT, unit: "km/s", steps: [R`Plane change \(\Delta i = ${d} - ${it} = ${f(d-it,2)}°\)`, R`\(\Delta v = 2v\sin(\Delta i/2) = ${f(dvT,4)}\) km/s`] },
      { q: R`Launch azimuth (northeast) for a direct ascent to \(i = ${iHi}°\)`, ans: A, unit: "deg", abs: 0.2, steps: [R`\(\sin A = \cos i/\cos\delta = ${f(Math.cos(iHi*D2R)/Math.cos(d*D2R),5)}\), so \(A = ${f(A,2)}°\) (or \(180° - A\) heading southeast)`] },
      { q: "Earth-rotation boost at that azimuth", ans: boost, unit: "m/s", steps: [R`\(\Delta V_{\omega} = \omega_\oplus R_\oplus\cos\delta\sin A = ${f(boost,1)}\) m/s`] }
    ] };
});

/* ---------- HW 4 #3: two-stage launch vehicle ---------- */
hw("hw-2stage","rkt",1,"Two-stage launch vehicle performance","HW 4 #3",["staging","rocket","isp"],"Staging notes; Midterm Review s.16; HW4 #3",(o={})=>{
  const s = o.s ?? (1+(Math.random()-0.5)*0.08);
  const I1 = o.I1 ?? Math.round(287*s), F1 = o.F1 ?? Math.round(1710000*s/1000)*1000, P1 = o.P1 ?? Math.round(906050*s/50)*50, D1 = o.D1 ?? Math.round(49100*s/10)*10;
  const I2 = o.I2 ?? Math.round(352*s), F2 = o.F2 ?? Math.round(210000*s/1000)*1000, P2 = o.P2 ?? Math.round(241000*s/50)*50, D2 = o.D2 ?? Math.round(8760*s/10)*10, dvL = o.dv ?? 32800, g = 32.174;
  const t1 = I1*P1/F1, t2 = I2*P2/F2;
  const dv = pl => { const m02 = pl+P2+D2, m01 = m02+D1+P1; return I1*g*Math.log(m01/(m01-P1)) + I2*g*Math.log(m02/(m02-P2)); };
  let lo = 0, hi = 400000; for (let k = 0; k < 100; k++) { const mid = (lo+hi)/2; if (dv(mid) > dvL) lo = mid; else hi = mid; }
  const pl = (lo+hi)/2, m02 = pl+P2+D2, m01 = m02+D1+P1;
  const dv1 = I1*g*Math.log(m01/(m01-P1)), dv2 = I2*g*Math.log(m02/(m02-P2));
  return { setup: R`A two-stage, Falcon 9–like vehicle. Stage 1: \(I_{sp} = ${I1}\) s, thrust ${f(F1,0)} lbf, propellant ${f(P1,0)} lbm, dry ${f(D1,0)} lbm. Stage 2: \(I_{sp} = ${I2}\) s, thrust ${f(F2,0)} lbf, propellant ${f(P2,0)} lbm, dry ${f(D2,0)} lbm. Use \(g_0 = 32.174\ \mathrm{ft/s^2}\) and \(\Delta V_{LEO} = ${f(dvL,0)}\) ft/s.`,
    parts: [
      { q: "Stage 1 burn time (to MECO)", ans: t1, unit: "s", steps: [R`\(\dot m = F/(I_{sp}g_0)\) and 1 lbm weighs 1 lbf at \(g_0\), so \(t = I_{sp}W_p/F = ${I1}(${f(P1,0)})/${f(F1,0)} = ${f(t1,1)}\) s`] },
      { q: "Stage 2 burn time (to SECO)", ans: t2, unit: "s", steps: [R`\(t = ${I2}(${f(P2,0)})/${f(F2,0)} = ${f(t2,1)}\) s`] },
      { q: "Payload to LEO", ans: pl, unit: "lbm", steps: [R`\(\Delta V(m_{PL}) = c_1\ln\dfrac{m_{0,1}}{m_{0,1}-m_{p,1}} + c_2\ln\dfrac{m_{0,2}}{m_{0,2}-m_{p,2}}\), with \(m_{0,2} = m_{PL} + ${f(P2,0)} + ${f(D2,0)}\) and \(m_{0,1} = m_{0,2} + ${f(D1,0)} + ${f(P1,0)}\)`, R`Solve \(\Delta V(m_{PL}) = ${f(dvL,0)}\) ft/s numerically: \(m_{PL} = ${f(pl,0)}\) lbm`, R`Check: \(\Delta V_1 = ${f(dv1,0)}\), \(\Delta V_2 = ${f(dv2,0)}\) ft/s`] },
      { q: "Stage 1 total impulse", ans: F1*t1, unit: "lbf·s", steps: [R`\(I = Ft = ${f(F1,0)}\times${f(t1,1)} = ${ex(F1*t1)}\) lbf·s`, R`\(I/W_p = ${f(F1*t1/P1,1)}\) s, which recovers the stage \(I_{sp}\)`] }
    ] };
});

/* ---------- HW 4 #4: Mars mission ---------- */
hw("hw-mars","ipl",1,"Mars mission: departure to capture","HW 4 #4",["hohmann","c3","vsun","rocket","vcirc"],"Interplanetary s.9–15; Midterm Review s.21–22; HW4 #4",(o={})=>{
  const rE = 149e6, rM = 228e6, h = o.h ?? rnd(200,400,25), m0 = o.m0 ?? rnd(2000,5000,100), isp = o.isp ?? pick([230,250,300,320]), dvc = 1.44;
  const vE = Math.sqrt(MUS/rE), at = (rE+rM)/2, vdep = Math.sqrt(MUS*(2/rE-1/at)), vinf = vdep-vE, C3 = vinf*vinf, tof = Math.PI*Math.sqrt(at**3/MUS)/DAY;
  const r = RE+h, vc = Math.sqrt(MU/r), vesc = Math.sqrt(2*MU/r), vbo = Math.sqrt(C3+vesc*vesc), dvx = vbo-vc;
  const x = 1-Math.exp(-dvc*1000/(isp*G0)), mp = m0*x, mfin = m0-mp;
  return { setup: R`A Hohmann transfer from Earth to Mars uses \(\mu_\odot = 1.327\times10^{11}\ \mathrm{km^3/s^2}\), \(r_\oplus = 149\times10^6\) km and \(r_{Mars} = 228\times10^6\) km. The spacecraft departs from a ${h} km circular parking orbit, arrives at Mars with a mass of ${f(m0,0)} kg, and then needs \(\Delta V = 1.44\) km/s (from the subway map) to reach low Mars orbit using an engine with \(I_{sp} = ${isp}\) s.`,
    parts: [
      { q: R`Departure \(v_\infty\) relative to Earth`, ans: vinf, unit: "km/s", steps: [R`\(v_\oplus = \sqrt{\mu_\odot/r_\oplus} = ${f(vE,3)}\) km/s`, R`\(a_{tr} = ${f(at/1e6,1)}\times10^6\) km; \(v_{dep} = \sqrt{\mu_\odot(2/r_\oplus - 1/a_{tr})} = ${f(vdep,3)}\) km/s`, R`\(v_\infty = ${f(vinf,3)}\) km/s`] },
      { q: R`\(C_3\)`, ans: C3, unit: "km²/s²", steps: [R`\(C_3 = v_\infty^2 = ${f(C3,3)}\ \mathrm{km^2/s^2}\)`] },
      { q: "Transfer time", ans: tof, unit: "days", steps: [R`\(\pi\sqrt{a_{tr}^3/\mu_\odot} = ${f(tof,1)}\) days`] },
      { q: R`\(\Delta v\) from the parking orbit to reach that \(C_3\)`, ans: dvx, unit: "km/s", steps: [R`\(v_c = ${f(vc,4)}\), \(v_{esc} = ${f(vesc,4)}\) km/s`, R`\(v_{bo} = \sqrt{C_3 + v_{esc}^2} = ${f(vbo,4)}\) km/s; \(\Delta v = v_{bo} - v_c = ${f(dvx,4)}\) km/s`] },
      { q: "Propellant for Mars orbit insertion", ans: mp, unit: "kg", steps: [R`\(m_p = m_0\left(1-e^{-\Delta V/c}\right)\) with \(c = ${f(isp*G0,0)}\) m/s`, R`\(m_p = ${f(m0,0)}(${f(x,5)}) = ${f(mp,1)}\) kg`] },
      { q: "Mass delivered to low Mars orbit", ans: mfin, unit: "kg", steps: [R`\(${f(m0,0)} - ${f(mp,1)} = ${f(mfin,1)}\) kg`] }
    ] };
});

/* ---------- Launch slides: booster + core staging ---------- */
hw("hw-boost","lau",0,"Boosters plus core: when does the stage change?","Launch slides, staging cases",["ispmix","rocket","staging"],"Launch s.14–19",(o={})=>{
  const nb = o.nb ?? 2, ib = o.ib ?? rnd(240,270,5), mb = o.mb ?? rnd(3000,4500,100), ic = o.ic ?? rnd(420,460,5), mc = o.mc ?? rnd(1200,1600,25);
  const tb = o.tb ?? rnd(100,130,5), burn = (nb*mb+mc)*tb, M0 = o.M0 ?? Math.round(burn/rnd(0.42,0.58,0.01)/10000)*10000, srbDry = o.srbDry ?? Math.round(0.12*nb*mb*tb/1000)*1000;
  const isp = (nb*mb*ib+mc*ic)/(nb*mb+mc), mpb = (nb*mb+mc)*tb, Mbo = M0-mpb, dv1 = isp*G0*Math.log(M0/Mbo), Mafter = Mbo-srbDry;
  return { setup: R`At liftoff (${f(M0/1000,0)} t), ${nb} solid boosters (\(I_{sp} = ${ib}\) s, ${f(mb,0)} kg/s each) fire with a core engine (\(I_{sp} = ${ic}\) s, ${f(mc,0)} kg/s). The boosters burn out at \(t = ${tb}\) s and are jettisoned together (${f(srbDry/1000,0)} t of empty casings). Ignore gravity and drag losses.`,
    parts: [
      { q: "Combined Isp while boosters and core fire together", ans: isp, unit: "s", steps: [R`\(I_{sp} = \dfrac{\sum\dot mI_{sp}}{\sum\dot m} = \dfrac{${nb}(${mb})(${ib}) + ${mc}(${ic})}{${nb}(${mb}) + ${mc}} = ${f(isp,1)}\) s`] },
      { q: "Propellant used by booster burnout", ans: mpb/1000, unit: "t", steps: [R`\((${nb}\cdot${mb} + ${mc})\times${tb} = ${f(mpb,0)}\) kg`] },
      { q: "Ideal ΔV from liftoff to booster burnout", ans: dv1/1000, unit: "km/s", steps: [R`\(m_f = ${f(M0,0)} - ${f(mpb,0)} = ${f(Mbo,0)}\) kg`, R`\(\Delta V = I_{sp}g\ln(m_0/m_f) = ${f(dv1,0)}\) m/s`] },
      { q: "Initial mass of the next stage (core alone, after jettison)", ans: Mafter/1000, unit: "t", steps: [R`Burnout changes Isp and jettison changes dry mass, so both start a new stage`, R`\(m_0 = ${f(Mbo,0)} - ${f(srbDry,0)} = ${f(Mafter,0)}\) kg`] }
    ] };
});

/* ---------- Interplanetary: Oberth effect at escape ---------- */
hw("hw-oberth","ipl",0,"Escape burn and the Oberth effect","Interplanetary slides",["c3","oberth","vcirc"],"Interplanetary s.9–11; Midterm Review s.21–22",(o={})=>{
  const h = o.h ?? rnd(200,600,50), dv = o.dv ?? rnd(3.3,4.2,0.05), r = RE+h, vc = Math.sqrt(MU/r), vesc = Math.sqrt(2*MU/r);
  const vbo = vc+dv, C3 = vbo*vbo-vesc*vesc, vinf = Math.sqrt(C3);
  const dvPar = o.dvp ?? 1, vinfOb = dvPar*Math.sqrt(2*vesc/dvPar+1);
  return { setup: R`A spacecraft in a ${h} km circular orbit makes a ${f(dv,2)} km/s prograde burn. Use \(R_\oplus = 6371\) km.`,
    parts: [
      { q: "Burnout speed", ans: vbo, unit: "km/s", steps: [R`\(v_c = ${f(vc,4)}\) km/s, so \(v_{bo} = ${f(vbo,4)}\) km/s`] },
      { q: R`\(C_3\)`, ans: C3, unit: "km²/s²", abs: 0.1, steps: [R`\(v_{esc} = ${f(vesc,4)}\) km/s`, R`\(C_3 = v_{bo}^2 - v_{esc}^2 = ${f(C3,3)}\ \mathrm{km^2/s^2}\)`] },
      { q: R`Hyperbolic excess speed \(v_\infty\)`, ans: vinf, unit: "km/s", steps: [R`\(v_\infty = \sqrt{C_3} = ${f(vinf,4)}\) km/s`] },
      { q: R`A craft on a parabolic flyby (\(v_\infty = 0\)) passes periapsis at this same radius and burns 1 km/s there. Resulting \(v_\infty\)`, ans: vinfOb, unit: "km/s", steps: [R`At periapsis it moves at \(v_{esc} = ${f(vesc,4)}\) km/s`, R`\(v_\infty = \Delta v\sqrt{2v_{esc}/\Delta v + 1} = ${f(vinfOb,4)}\) km/s, versus 1 km/s for the same burn far from the planet`] }
    ] };
});

window.AAE_HW = HW;
})();

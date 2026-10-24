/* AAE 412/512 study bank — built from Prof. Wirz's F26 slides, notes and HW 1–4.
   Math uses \( \) inline and \[ \] display (typeset by MathJax). */
(function () {
"use strict";
const R = String.raw;

const TOPICS = [
  { id: "env", name: "Space environment", short: "Environment" },
  { id: "orb", name: "Orbital mechanics", short: "Orbits" },
  { id: "man", name: "Transfers & plane change", short: "Transfers" },
  { id: "cov", name: "3D orbits, coverage & J₂", short: "3D & coverage" },
  { id: "rkt", name: "Rocket basics & staging", short: "Rocket basics" },
  { id: "chem", name: "Chemical propulsion", short: "Chemical" },
  { id: "ep", name: "Electric propulsion", short: "Electric" },
  { id: "lau", name: "Launch", short: "Launch" },
  { id: "ipl", name: "Interplanetary", short: "Interplanetary" },
  { id: "mis", name: "Space missions", short: "Missions" }
];

/* ---------------- Multiple choice ----------------
   mc(topic, kind, midtermReview, question, choices, answerIndex, explanation, source)
   kind: concept | equation | fact */
const MC = [];
let n = 0;
function mc(t, k, mr, q, ch, a, ex, src) { MC.push({ id: t + "-" + (++n), t, k, mr: !!mr, q, ch, a, ex, src }); }

/* ===== Space environment ===== */
mc("env","fact",1,R`The course lists four external disturbance sources that the attitude control system (AODCS) must handle. Which of these is <b>not</b> one of the four?`,
 ["Micrometeoroid impacts","Gravity gradient","Magnetic","Aerodynamic"],0,
 R`The four are solar (radiation pressure), gravity gradient, magnetic, and aerodynamic. Debris and micrometeoroids are an environment hazard, but they are not one of the four disturbance-torque sources on the AODCS slide.`,"Midterm Review s.4; Space Env s.8");
mc("env","concept",1,R`On the torque-vs-altitude chart, which disturbance torque dominates for a spacecraft near geostationary altitude?`,
 ["Solar radiation torque","Aerodynamic torque","Gravity-gradient torque","Magnetic torque"],0,
 R`Aerodynamic and magnetic torques fall off quickly with altitude (density and \(B \propto 1/r^3\)). Solar radiation pressure does not depend on altitude around Earth, so it is the largest one left at GEO.`,"Midterm Review s.4");
mc("env","concept",1,R`At low LEO (≈200–400 km), which disturbance torque is usually largest?`,
 ["Aerodynamic","Solar radiation","Magnetic","Gravity gradient"],0,
 R`Atmospheric density is highest there, so the drag force acting through a center-of-pressure offset gives the largest torque. It drops off steeply with altitude.`,"Midterm Review s.4");
mc("env","fact",1,R`Which space-environment concern <b>dominates in MEO</b> (period ≈ 12 hr)?`,
 ["Trapped radiation from the Van Allen belts","Atmospheric drag","Solar radiation pressure","Atomic oxygen erosion"],0,
 R`LEO: must consider the atmosphere (drag, reactions), relatively low radiation. MEO: dominated by Van Allen belt radiation. GEO: dominated by solar radiation.`,"Space Env s.6; Midterm Review s.30");
mc("env","fact",1,R`What environment concern dominates at <b>GEO</b>?`,
 ["Solar radiation","Atmospheric drag","Inner Van Allen belt protons","Atomic oxygen"],0,
 R`GEO (≈ 6.6 Earth radii) sits outside the densest trapped-particle regions and far above the atmosphere, so solar radiation (particles and EM) is the main concern.`,"Space Env s.6");
mc("env","fact",0,R`At what altitude is the Kármán line, commonly used as the boundary of space?`,
 ["100 km","50 km","80 km","200 km"],0,
 R`100 km (62 mi). Von Kármán showed that around this altitude a vehicle would need to go faster than orbital velocity to get enough aerodynamic lift.`,"Space Env s.10");
mc("env","fact",1,R`Roughly what is the solar flux intensity \(I_{s\oplus}\) at 1 AU?`,
 [R`\(\approx 1358\ \mathrm{W/m^2}\)`,R`\(\approx 4.5\times10^{-6}\ \mathrm{W/m^2}\)`,R`\(\approx 136\ \mathrm{W/m^2}\)`,R`\(\approx 3.8\times10^{26}\ \mathrm{W/m^2}\)`],0,
 R`About 1358 W/m², ranging from 1321 to 1413 over the year. \(4.5\times10^{-6}\) is the solar <i>pressure</i> in N/m², which is \(I_s/c\).`,"Midterm Review s.5");
mc("env","equation",1,R`In \(F_s = P_s A_\perp (1+q)\), what value of reflectivity \(q\) applies to a perfect mirror, and what does it do to the force?`,
 [R`\(q=1\): the force doubles compared with a black body`,R`\(q=0\): the force doubles`,R`\(q=-1\): the force is zero`,R`\(q=1\): the force is zero`],0,
 R`\(q=-1\) transparent (no force), \(q=0\) black body (absorbs the momentum), \(q=1\) mirror (reflects it, so twice the momentum change).`,"Midterm Review s.5");
mc("env","equation",1,R`A probe moves from 1 AU to Mars at 1.52 AU. How does the solar flux on its arrays scale?`,
 [R`It drops to about 43% of the 1 AU value`,R`It drops to about 66%`,R`It drops to about 29%`,R`It stays the same because flux is a property of the Sun`],0,
 R`\(I_s = I_{s\oplus}\,(r_{\oplus}/r)^2 = (1/1.52)^2 \approx 0.43\). It is an inverse-square law, not linear.`,"Midterm Review s.5");
mc("env","equation",1,R`What key assumption makes the exponential atmosphere \(n = n_0\,e^{-z/H}\) come out exponential?`,
 [R`Temperature is constant through the layer, so \(H = kT/(Mg)\) is constant`,R`Density is constant with altitude`,R`Gravity drops off as \(1/r^2\)`,R`The atmosphere is fully ionized`],0,
 R`The derivation combines the ideal gas law \(p = nkT\) with hydrostatic balance \(dp/dz = -nMg\). Holding \(T\) (and \(g\)) constant gives \(dn/n = -dz/H\), so density decays exponentially.`,"Space Env notes p.1");
mc("env","equation",0,R`In the exponential atmosphere model, what is the scale height \(H\)?`,
 [R`\(H = \dfrac{kT}{Mg}\)`,R`\(H = \dfrac{Mg}{kT}\)`,R`\(H = \dfrac{\mu}{r^2}\)`,R`\(H = \sqrt{\dfrac{kT}{M}}\)`],0,
 R`\(H = kT/(Mg)\): the altitude over which density falls by a factor of \(e\). HW 1 uses \(H = 8\) km and \(n_0 = 1.225\ \mathrm{kg/m^3}\).`,"Space Env notes p.1; HW1");
mc("env","concept",1,R`Two satellites at the same altitude have ballistic coefficients \(\beta = 200\) and \(20\ \mathrm{kg/m^2}\). Which lasts longer before re-entry, and why?`,
 [R`\(\beta = 200\): more mass per unit drag area means less deceleration`,R`\(\beta = 20\): lower \(\beta\) means less drag`,R`They last the same time because altitude sets lifetime`,R`\(\beta = 200\): higher \(\beta\) means a higher drag coefficient`],0,
 R`\(\beta = m/(C_D A)\) and \(a_D = -\tfrac{1}{2}\rho V^2/\beta\). A dense, compact spacecraft (high \(\beta\)) decelerates less and stays up longer.`,"Space Env notes p.2; Midterm Review s.6");
mc("env","fact",1,R`According to the orbit-lifetime chart, below roughly what altitude will essentially everything decay and re-enter by the next solar maximum?`,
 ["≈ 500 km","≈ 200 km","≈ 1000 km","≈ 2000 km"],0,
 R`The SMAD Fig. 9-19 caption: below about 500 km essentially everything re-enters at the next solar maximum.`,"Midterm Review s.6");
mc("env","concept",1,R`How does solar maximum affect a LEO satellite's drag?`,
 ["UV heating expands the thermosphere, raising density at altitude and increasing drag","It lowers density, so the satellite lasts longer","It has no effect below 1000 km","It only increases radiation dose, not drag"],0,
 R`Higher solar EUV flux (tracked by F10.7) heats and puffs up the thermosphere. Density at a fixed altitude rises, so drag rises and lifetime shortens. On the lifetime chart, the lower curve for each β is launch at solar max.`,"Space Env s.15–20");
mc("env","fact",0,R`Per the course notes, drag is generally significant to extreme below about ___ km and usually a minor effect above about ___ km.`,
 ["300; 600","100; 300","500; 1000","200; 2000"],0,
 R`Drag is significant to extreme for \(h \le 300\) km and usually minor for \(h \ge 600\) km. It is still worth checking for most LEO missions.`,"Space Env notes p.2");
mc("env","equation",0,R`In \(M_d = F_D\,(c_p - c_g)\), what creates the aerodynamic torque?`,
 ["The drag force acting at the center of pressure, offset from the center of gravity","The drag force acting through the center of gravity","Magnetic dipole interacting with Earth's field","Differences in gravity across the spacecraft"],0,
 R`Drag acts at the aerodynamic center of pressure \(c_p\). Any offset from \(c_g\) gives a moment arm. The torque is constant for Earth-oriented vehicles and varies for inertially oriented ones.`,"Space Env notes p.2; HW1 1c");
mc("env","equation",0,R`In the drag acceleration \(\vec a_D = -\tfrac12\rho V^2 (C_D A/m)\,\hat v_{rel}\), what velocity is used?`,
 [R`Velocity relative to the rotating atmosphere, \(\vec v_{rel} = \dot{\vec r} - \vec\omega_\oplus\times\vec r\)`,"Inertial velocity in the ECI frame","Ground speed of the sub-satellite point","Velocity relative to the Sun"],0,
 R`The atmosphere co-rotates with Earth, so drag depends on velocity relative to the air.`,"Space Env notes p.2");
mc("env","fact",0,R`The inner Van Allen belt (≈1.1–2.5 DU) is known as the "proton zone." What does the outer belt (≈2–10 DU) mainly contain?`,
 ["Energetic electrons (≈0.1–10 MeV)","Energetic protons above 100 MeV","Heavy ions from cosmic rays","Neutral atomic oxygen"],0,
 R`Inner belt: energetic protons that can exceed 100 MeV (plus electrons at hundreds of keV), peak ≈1.5 DU. Outer belt: energetic electrons ≈0.1–10 MeV, peak ≈4–6 DU. Intensity is not maximum at GEO.`,"Space Env s.25");
mc("env","concept",0,R`What creates the Van Allen belts?`,
 ["High-energy particles from the solar wind trapped by Earth's magnetic field","Ionization of the upper atmosphere by UV","Charged debris from old spacecraft","Galactic cosmic rays reflecting off the ionosphere"],0,
 R`The solar wind interacting with Earth's magnetosphere gives toroidal regions of trapped energetic particles: the inner and outer belts.`,"Space Env s.4, s.25");
mc("env","fact",0,R`Which ionosphere region has the highest electron density?`,
 ["F2 (≈200–400 km)","D (≈70–90 km)","E (≈95–140 km)","Plasmasphere (>1200 km)"],0,
 R`F2, 200–400 km, mostly N⁺ and O⁺. D is weakly ionized. E is mostly O₂⁺. F1 is NO⁺ and O⁺. The plasmasphere is H⁺ and He⁺.`,"Space Env s.33");
mc("env","concept",0,R`Which is a challenge the ionosphere poses to spacecraft?`,
 ["Atomic oxygen degrading surfaces, plus effects on EM waves and surface charging","Strong gravity-gradient torques","Direct heating from the solar corona","High-energy protons above 100 MeV"],0,
 R`The slide lists atomic oxygen degradation of components and surfaces, electrons affecting EM waves (refraction, reflection, dispersion, scintillation), and spacecraft surface charging.`,"Space Env s.33");
mc("env","concept",0,R`Which kind of surface keeps a deposited charge the longest?`,
 ["An insulator or isolated conductor","A grounded conductor","A semiconductor tied to structure","A poor conductor connected to ground"],0,
 R`On an insulator the charge stays essentially forever in vacuum. A poor dielectric bleeds it slowly, and a grounded conductor bleeds it quickly. Differences between surfaces set up fields that can arc.`,"Space Env s.34");
mc("env","fact",0,R`Which three are listed as the main sources of energetic <b>particle</b> radiation?`,
 ["Trapped Van Allen belts, the Sun (solar wind and flares), and galactic cosmic rays","The Sun, the Moon, and Earth's albedo","Atomic oxygen, ionosphere, and plasmasphere","X-rays, UV, and infrared"],0,
 R`Particle radiation: Van Allen belts, Sun, galactic cosmic rays. Electromagnetic radiation (UV, IR, X-ray, gamma) comes mostly from the Sun.`,"Space Env s.23");
mc("env","fact",0,R`What is the F10.7 index?`,
 ["Solar radio flux at a 10.7 cm wavelength, used as a proxy for solar activity","The ratio of solar max to solar min density at 107 km","A geomagnetic index of auroral activity","The fraction of solar flux absorbed by the F layer"],0,
 R`F10.7 is the 10.7 cm solar radio flux. It tracks the ~11-year solar cycle and drives thermosphere-density models. The geomagnetic index on the same chart is \(a_p\).`,"Space Env s.15–16");
mc("env","fact",0,R`A meteoroid that enters Earth's atmosphere and survives to hit the surface is called a…`,
 ["Meteorite","Meteor","Meteoroid","Bolide"],0,
 R`Meteoroid: debris in the solar system. Meteor: a meteoroid that enters Earth's atmosphere. Meteorite: a meteor that survives to impact.`,"Space Env bonus s.45");
mc("env","fact",0,R`What shielding approach does the ISS use against debris and micrometeoroids?`,
 ["A stuffed Whipple shield: spaced, multi-layer bumpers","A single thick aluminum wall","Active magnetic deflection","Water tanks only"],0,
 R`A stuffed Whipple shield breaks up the impactor on outer layers so the spread-out debris cloud hits the inner wall.`,"Space Env bonus s.47");

/* ===== Orbital mechanics ===== */
mc("orb","concept",1,R`An orbit has \(\varepsilon > 0\). Which describes it?`,
 [R`Hyperbolic: \(e > 1\), \(a < 0\), escape with excess speed`,R`Elliptical: \(0<e<1\), \(a>0\)`,R`Parabolic: \(e=1\), \(a\to\infty\)`,R`Circular: \(e=0\), \(a=r\)`],0,
 R`\(\varepsilon = -\mu/2a\). Positive energy needs \(a<0\), which is the hyperbola (\(e>1\)): \(|PE| < |KE|\), escape with \(v_\infty > 0\).`,"Midterm Review s.8");
mc("orb","concept",1,R`For a parabolic trajectory, how do potential and kinetic energy compare?`,
 [R`\(|PE| = |KE|\), so \(\varepsilon = 0\)`,R`\(|PE| > |KE|\), so \(\varepsilon < 0\)`,R`\(|PE| < |KE|\), so \(\varepsilon > 0\)`,R`\(|PE| = 2|KE|\)`],0,
 R`Parabola: \(\varepsilon = 0\), \(e = 1\), the minimum escape case. Circular and elliptical orbits are trapped (\(|PE|>|KE|\)). Hyperbolic orbits escape with excess speed.`,"Midterm Review s.8");
mc("orb","equation",1,R`Vis-viva comes from setting two expressions for specific energy equal. Which two?`,
 [R`\(\varepsilon = \tfrac{v^2}{2} - \tfrac{\mu}{r}\) and \(\varepsilon = -\tfrac{\mu}{2a}\)`,R`\(\varepsilon = \tfrac{v^2}{2}\) and \(\varepsilon = \tfrac{\mu}{r}\)`,R`\(H = rv\cos\phi\) and \(p = H^2/\mu\)`,R`\(P = 2\pi\sqrt{a^3/\mu}\) and \(v = 2\pi r/P\)`],0,
 R`Setting \(\tfrac{v^2}{2}-\tfrac{\mu}{r} = -\tfrac{\mu}{2a}\) gives \(v = \sqrt{\mu\left(\tfrac{2}{r}-\tfrac{1}{a}\right)}\). It works at any point on any conic, given \(r\) and \(a\).`,"Astro notes p.6; Midterm Review s.9");
mc("orb","equation",1,R`You know an ellipse's perigee and apogee radii and need the speed at perigee. What do you use?`,
 [R`\(a = (r_p + r_a)/2\), then vis-viva at \(r = r_p\)`,R`\(v = \sqrt{\mu/r_p}\)`,R`\(v = \sqrt{2\mu/r_p}\)`,R`\(v = 2\pi r_p/P\)`],0,
 R`Vis-viva at \(r_p\). The circular formula only holds when \(a = r\), and the escape formula only for \(a \to \infty\). Course example: \(r_p = 8000\), \(r_a = 100{,}000\) km gives \(v_p = 9.6\) km/s and \(v_a = 0.77\) km/s.`,"Midterm Review s.9");
mc("orb","equation",1,R`Which limit of vis-viva gives the escape speed \(v_{esc} = \sqrt{2\mu/r}\)?`,
 [R`\(a \to \infty\) (parabola)`,R`\(a = r\) (circle)`,R`\(a = 0\)`,R`\(r \to \infty\)`],0,
 R`With \(a\to\infty\) the \(1/a\) term vanishes, leaving \(v = \sqrt{2\mu/r}\): the parabolic, \(\varepsilon = 0\) case. For \(a = r\), you get \(v_c = \sqrt{\mu/r}\).`,"Midterm Review s.9, s.21");
mc("orb","concept",0,R`At the same radius, how does escape speed compare with circular speed?`,
 [R`\(v_{esc} = \sqrt{2}\,v_c\)`,R`\(v_{esc} = 2v_c\)`,R`\(v_{esc} = v_c/\sqrt2\)`,R`They are equal`],0,
 R`\(\sqrt{2\mu/r} / \sqrt{\mu/r} = \sqrt2 \approx 1.414\). From a 200 km LEO: \(v_c \approx 7.8\) and \(v_{esc} \approx 11.0\) km/s.`,"Astro notes p.6");
mc("orb","equation",0,R`What does the orbital period \(P = 2\pi\sqrt{a^3/\mu}\) depend on?`,
 ["Only the semi-major axis (and μ)","Semi-major axis and eccentricity","Perigee radius only","Inclination and semi-major axis"],0,
 R`Kepler's 3rd law: \(P^2 \propto a^3\). Two orbits with the same \(a\) have the same period and the same energy, whatever their eccentricity.`,"Astro notes p.7");
mc("orb","concept",1,R`A homework problem gives "a 400 km orbit." What radius goes into vis-viva or \(v_c = \sqrt{\mu/r}\)?`,
 [R`\(r = R_\oplus + h = 6371 + 400 = 6771\) km`,"r = 400 km","r = 6371 km","r = 6371 − 400 = 5971 km"],0,
 R`\(r = R_\oplus + h\), measured from Earth's center. The slides flag forgetting this as a very common astronautics mistake. The course uses the mean radius, 6371 km.`,"Astro Pt1 s.10");
mc("orb","concept",0,R`Which is <b>not</b> an assumption of the restricted two-body problem?`,
 ["The orbit is circular","M ≫ m, so the satellite is treated as a point mass","Both bodies are spherically symmetric","Gravity is the only force acting"],0,
 R`The two-body problem assumes spherically symmetric bodies and no other forces. "Restricted" adds \(M \gg m\). Any conic is allowed.`,"Astro notes p.2");
mc("orb","concept",0,R`Why is two-body orbital motion planar?`,
 [R`Specific angular momentum \(\vec H = \vec r\times\vec v\) is constant, so its direction is fixed`,"Specific energy is constant","Gravity always points toward the equator","Kepler's 2nd law forbids out-of-plane motion"],0,
 R`\(d\vec H/dt = 0\) for a central force. \(\vec r\) and \(\vec v\) always lie in the plane perpendicular to the fixed \(\vec H\).`,"Astro notes p.3");
mc("orb","equation",0,R`In \(H = rv\cos\phi\), what is \(\phi\) and when is it zero?`,
 ["Flight path angle from the local horizontal; zero at periapsis and apoapsis","True anomaly; zero at periapsis","Inclination; zero for equatorial orbits","Angle from the radius vector; zero at periapsis"],0,
 R`\(\phi\) is the flight path angle measured from the local horizontal. At periapsis and apoapsis velocity is perpendicular to \(\vec r\), so \(\phi = 0\) and \(H = rv\).`,"Astro notes p.3");
mc("orb","equation",0,R`In the trajectory equation \(r = \dfrac{p}{1+e\cos\theta}\), what is \(p\)?`,
 [R`The parameter (semi-latus rectum), \(p = H^2/\mu = a(1-e^2)\)`,"Periapsis radius","Orbit period","Perigee altitude"],0,
 R`\(p = H^2/\mu = a(1-e^2) = r_p(1+e) = r_a(1-e)\). It is the radius at \(\theta = 90°\).`,"Astro notes p.4");
mc("orb","equation",0,R`Given \(r_p\) and \(r_a\), which expression gives eccentricity?`,
 [R`\(e = \dfrac{r_a - r_p}{r_a + r_p}\)`,R`\(e = \dfrac{r_a + r_p}{r_a - r_p}\)`,R`\(e = 1 - \dfrac{r_p}{r_a}\)`,R`\(e = \dfrac{r_p}{a}\)`],0,
 R`From \(r_p = a(1-e)\) and \(r_a = a(1+e)\).`,"Astro notes p.4");
mc("orb","concept",0,R`Why does a satellite move fastest at perigee?`,
 ["Angular momentum is conserved (Kepler's 2nd law), so smaller r means larger v","Drag is lowest at perigee","Gravity does no work near perigee","Thrusters fire at perigee"],0,
 R`Equal areas in equal times: \(H = r v_\perp\) is constant, so the speed is highest at the smallest radius.`,"Astro Pt1 s.7");
mc("orb","concept",1,R`A spacecraft at 500 km altitude has a 10.4 km/s velocity perpendicular to its radius (HW 2, problem 1). What kind of trajectory is it on?`,
 [R`Elliptical: \(v_c \approx 7.6 < 10.4 < v_{esc} \approx 10.8\) km/s, with this point as perigee`,"Hyperbolic, because 10.4 km/s exceeds circular speed","Circular","Parabolic"],0,
 R`\(r = 6871\) km gives \(v_c = \sqrt{\mu/r} \approx 7.62\) and \(v_{esc} \approx 10.77\) km/s. It is faster than circular but slower than escape, so the orbit is elliptical and this point is perigee.`,"HW2 #1");
mc("orb","fact",0,R`What is Earth's gravitational parameter \(\mu_\oplus\)?`,
 [R`\(398{,}600\ \mathrm{km^3/s^2}\)`,R`\(6.67\times10^{-11}\ \mathrm{km^3/s^2}\)`,R`\(1.327\times10^{11}\ \mathrm{km^3/s^2}\)`,R`\(9.81\ \mathrm{km^3/s^2}\)`],0,
 R`\(\mu = GM\). Earth: \(398{,}600\ \mathrm{km^3/s^2}\) (≈ \(4\times10^5\) for estimates). Sun: \(1.327\times10^{11}\ \mathrm{km^3/s^2}\) (HW 4).`,"Astro notes p.2; HW4");
mc("orb","fact",0,R`Kepler's 3rd law states that…`,
 ["The square of the period is proportional to the cube of the semi-major axis","Orbits are ellipses with the Sun at one focus","Equal areas are swept in equal times","Every action has an equal and opposite reaction"],0,
 R`1st: ellipse, Sun at a focus (1609). 2nd: equal areas in equal times (1609). 3rd: \(P^2\propto a^3\) (1619).`,"Astro Pt1 s.7");
mc("orb","concept",0,R`Two orbits share the same semi-major axis but one is circular and one is highly eccentric. Which statement is true?`,
 ["They have the same specific energy and the same period","The eccentric orbit has more energy","The circular orbit has a longer period","They have the same angular momentum"],0,
 R`\(\varepsilon = -\mu/2a\) and \(P = 2\pi\sqrt{a^3/\mu}\) depend only on \(a\). Angular momentum differs: \(H = \sqrt{\mu p}\) and \(p = a(1-e^2)\).`,"Astro notes p.3, p.7");

/* ===== Transfers & plane change ===== */
mc("man","equation",1,R`For a Hohmann transfer from circular \(r_1\) to circular \(r_2\), what is the first burn?`,
 [R`\(\Delta v_1 = v_p - v_{c1}\), with \(v_p\) from vis-viva at \(r_1\) using \(a_{tr} = (r_1+r_2)/2\)`,R`\(\Delta v_1 = v_{c2} - v_{c1}\)`,R`\(\Delta v_1 = \sqrt{2\mu/r_1} - v_{c1}\)`,R`\(\Delta v_1 = |v_{c2} - v_a|\)`],0,
 R`Burn 1 is at perigee of the transfer ellipse: \(v_p = \sqrt{\mu(2/r_1 - 1/a_{tr})}\). Burn 2 at apogee: \(\Delta v_2 = |v_{c2} - v_a|\).`,"Midterm Review s.11");
mc("man","concept",1,R`Prof. Wirz warns against "equations that lump \(\Delta v\) into one equation" for a Hohmann transfer. Why?`,
 ["You need each velocity and burn separately for mission analysis, for example combining a plane change with a burn","The lumped equation is only valid for low thrust","The lumped equation gives the wrong total","It ignores the time of flight"],0,
 R`Keeping \(v_{c1}, v_p, v_a, v_{c2}\) separate lets you do things like combine the GEO plane change with the apogee circularization burn (HW 2 Transfer II), or size each burn's propellant.`,"Astro notes p.9–10");
mc("man","equation",1,R`What is the time of flight of a Hohmann transfer?`,
 [R`Half the transfer-ellipse period: \(\pi\sqrt{a_{tr}^3/\mu}\)`,"The full transfer-ellipse period",R`\(c\,m_p/F\)`,"The average of the two circular periods"],0,
 R`TOF \(= \tfrac12 P_{tr}\). For 8000 → 100,000 km: \(a = 54{,}000\) km, \(P = 36.4\) hr, TOF ≈ 17–18 hr.`,"Astro notes p.9–10");
mc("man","equation",1,R`When is the simplified Edelbaum equation the right tool?`,
 ["Low-thrust (continuous, spiral) transfer between circular orbits, optionally with a plane change","Impulsive transfer between two ellipses","Hyperbolic escape from Earth","Launch from the surface to LEO"],0,
 R`Edelbaum: \(\Delta v = \sqrt{v_{c1}^2 + v_{c2}^2 - 2v_{c1}v_{c2}\cos\!\left(\tfrac{\pi}{2}\Delta\alpha\right)}\), for spiral circle-to-circle transfers with electric propulsion.`,"Astro notes p.8; Midterm Review s.10");
mc("man","equation",1,R`In the Edelbaum equation, what does \(\Delta v\) reduce to when there is no plane change (\(\Delta\alpha = 0\))?`,
 [R`\(|v_{c1} - v_{c2}|\)`,R`\(v_{c1}+v_{c2}\)`,R`The Hohmann \(\Delta v\)`,R`\(\sqrt{v_{c1}^2+v_{c2}^2}\)`],0,
 R`\(\cos 0 = 1\), so the root becomes \(|v_{c1}-v_{c2}|\). Example: 8000 → 100,000 km gives ≈ 7 − 2 = 5 km/s, more than the ≈ 3.8 km/s Hohmann.`,"Astro notes p.8");
mc("man","equation",0,R`In Edelbaum's \(\cos\!\left(\tfrac{\pi}{2}\Delta\alpha\right)\), what units must \(\Delta\alpha\) be in?`,
 ["Radians","Degrees","Revolutions","Either: the π/2 converts it"],0,
 R`The notes say \(\Delta\alpha\) is the plane change in radians. Putting degrees in is a common error.`,"Astro notes p.8");
mc("man","concept",1,R`A low-thrust spiral needs more \(\Delta v\) than a Hohmann transfer between the same orbits. Why use it anyway?`,
 ["EP's much higher Isp means far less propellant mass despite the larger Δv","Spirals are faster","Spirals need no power","Spirals avoid the Van Allen belts"],0,
 R`The rocket equation is exponential in \(\Delta V/c\). With \(c\) about 10× larger, the extra Δv costs little propellant. The trade-off is time: LEO–GEO Hohmann ≈ 5 hours, spiral ≈ 200 days.`,"Space Propulsion s.15–16");
mc("man","equation",1,R`For an impulsive plane change where speed is unchanged (\(v_1 = v_2 = v\)), what is \(\Delta v\)?`,
 [R`\(2v\sin(\Delta\alpha/2)\)`,R`\(v\,\Delta\alpha\)`,R`\(2v\cos(\Delta\alpha/2)\)`,R`\(v\sin\Delta\alpha\)`],0,
 R`From the law of cosines \(\Delta v^2 = v_1^2+v_2^2-2v_1v_2\cos\Delta\alpha\) with equal magnitudes. At \(v \approx 7\) km/s and 30°, \(\Delta v \approx 3.6\) km/s.`,"Astro notes p.11");
mc("man","concept",1,R`Where in an orbit should an impulsive plane change be done to minimize \(\Delta v\)?`,
 ["Where speed is lowest, for example apogee or the high circular orbit","At perigee, to use the Oberth effect","Anywhere: the cost is the same","At the ascending node of a low orbit"],0,
 R`\(\Delta v = 2v\sin(\Delta\alpha/2)\) scales with speed, so do it where \(v\) is smallest. For LEO → GEO, combine it with the apogee burn at GEO.`,"Astro notes p.11; Astro Pt2 s.5");
mc("man","fact",0,R`From the "Impulsive ΔV Requirements" chart, roughly how does the cost of a 1° plane change in LEO compare with raising the orbit 100 km?`,
 ["About 130 m/s for 1° vs about 50 m/s for +100 km: plane change is expensive","They are about equal","Raising 100 km costs more","1° costs about 10 m/s"],0,
 R`In LEO, 1° costs ≈ \(2(7.7)\sin(0.5°)\approx 0.13\) km/s, while a 100 km raise is ≈ 50 m/s. The chart's bottom line: plane change is expensive.`,"Astro Pt2 s.5");
mc("man","equation",0,R`When should you use \(\cos\Delta\alpha = \cos i_1\cos i_2 + \sin i_1\sin i_2\cos(\Omega_2-\Omega_1)\)?`,
 ["When the maneuver changes both inclination and RAAN, to find the actual angle between planes","To find launch azimuth","For a coplanar Hohmann transfer","To find the J₂ nodal drift"],0,
 R`Spherical trig gives the true rotation angle \(\Delta\alpha\) between two orbit planes. If only \(i\) changes (same \(\Omega\)), \(\Delta\alpha = |i_2 - i_1|\).`,"Astro notes p.11");
mc("man","concept",0,R`In HW 2, combining the GEO circularization burn with the 28°→0° plane change into one maneuver saves \(\Delta v\). Why?`,
 ["One vector Δv is shorter than the sum of two separate magnitudes (triangle inequality)","The Oberth effect is larger at GEO","It shortens the time of flight","It avoids gravity losses"],0,
 R`Separate burns cost \(|\Delta\vec v_a| + |\Delta\vec v_b|\). Combined, you pay \(|\Delta\vec v_a + \Delta\vec v_b| \le\) the sum, computed with the law of cosines between \(v_a\) and \(v_{c2}\).`,"HW2 #3");
mc("man","equation",0,R`For a constant-thrust spiral, how do the notes estimate time of flight?`,
 [R`\(\mathrm{TOF} = m_p/\dot m_p = c\,m_p/F\)`,R`\(\mathrm{TOF} = \tfrac12 P_{tr}\)`,R`\(\mathrm{TOF} = \Delta v / g\)`,R`\(\mathrm{TOF} = 2\pi\sqrt{a^3/\mu}\)`],0,
 R`Burn time is propellant divided by mass flow rate. With \(F = \dot m c\), \(\mathrm{TOF} = c\,m_p/F\).`,"Astro notes p.8");
mc("man","fact",0,R`Roughly how long does a LEO → GEO transfer take with a Hohmann (chemical) vs a spiral (EP)?`,
 ["≈ 5 hours vs ≈ 200 days","≈ 5 days vs ≈ 20 days","≈ 1 hour vs ≈ 1 year","≈ 12 hours vs ≈ 2 days"],0,
 R`From the propulsion slides: Hohmann ≈ 5 hours, spiral ≈ 200 days.`,"Space Propulsion s.16");

/* ===== 3D orbits, coverage, J2 ===== */
mc("cov","fact",0,R`Which orbital element is the angle from the vernal-equinox X axis to the ascending node?`,
 [R`RAAN, \(\Omega\)`,R`Argument of periapsis, \(\omega\)`,R`Inclination, \(i\)`,R`True anomaly, \(\theta\)`],0,
 R`\(\Omega\): right ascension of the ascending node, where the satellite crosses the equator heading north. \(\omega\) is measured from the node to perigee within the orbit plane.`,"Astro Pt2 s.3");
mc("cov","fact",0,R`Which three Keplerian elements describe the orbit <b>within its plane</b> (size, shape, position)?`,
 [R`\(a, e, \theta\)`,R`\(i, \Omega, \omega\)`,R`\(a, i, \Omega\)`,R`\(e, \omega, \Omega\)`],0,
 R`\(a\) (size), \(e\) (shape), \(\theta\) (position from perigee) describe in-plane motion. \(i\), \(\Omega\), \(\omega\) orient the plane and the ellipse in it.`,"Astro Pt2 s.3");
mc("cov","fact",1,R`Which altitude ranges does the course use for LEO, MEO and GEO?`,
 ["LEO ≈ 200–1200 km; MEO ≈ 1200–35,790 km; GEO ≈ 35,790 km","LEO < 100 km; MEO 100–1000 km; GEO 42,164 km","LEO 0–2000 km; MEO 2000–20,000 km; GEO 20,200 km","LEO 300–600 km; MEO 600–10,000 km; GEO 36,000–40,000 km"],0,
 R`Altitudes above the surface: LEO ≈ 200–1200, MEO ≈ 1200–35,790, GSO/GEO ≈ 35,790 km. GEO radius ≈ 42,164 km (the notes round to 42,238).`,"Astro Pt2 s.9; Midterm Review s.30");
mc("cov","fact",1,R`What are the approximate orbital periods of LEO, MEO and GEO?`,
 ["≈ 1.5–2 hr, ≈ 12 hr, ≈ 24 hr","≈ 30 min, ≈ 6 hr, ≈ 12 hr","≈ 3 hr, ≈ 24 hr, ≈ 48 hr","≈ 90 min for all, since period depends on mass"],0,
 R`From the "Orbit Types and Space Env. Considerations" slide.`,"Space Env s.6");
mc("cov","fact",0,R`Which describes the GPS constellation?`,
 ["24 satellites in 6 planes (4 per plane) at ≈ 20,200 km and 55°","66 satellites at ≈ 780 km","3 satellites in GEO","24 satellites at 1200 km, polar"],0,
 R`GPS is MEO: 6 planes, 4 satellites each, 20,200 km, 55° inclination. Iridium is LEO (66 active, ≈ 780 km). Three GEO satellites can cover most of the Earth.`,"Astro Pt2 s.16");
mc("cov","fact",0,R`Iridium was named for element 77. How many active satellites does it actually use, and at what altitude?`,
 ["66 at ≈ 780 km","77 at ≈ 780 km","24 at 20,200 km","66 at 35,786 km"],0,
 R`Iridium: 66 active satellites at ≈ 780 km.`,"Astro Pt2 s.16");
mc("cov","concept",0,R`What is the difference between geostationary and geosynchronous?`,
 ["Both have a 1-sidereal-day period. Geostationary is also circular and equatorial, so it appears fixed. An inclined GSO traces a figure-8 ground track","They are identical","Geosynchronous is lower than geostationary","Geostationary has a 12-hour period"],0,
 R`GEO is a special GSO with \(i = 0\) and \(e = 0\).`,"Astro Pt2 s.17");
mc("cov","equation",0,R`In the coverage relation \(\lambda = \cos^{-1}\!\left(\dfrac{\cos\varepsilon}{1+H/R_E}\right)-\varepsilon\), what is \(\varepsilon\)?`,
 ["Minimum elevation angle of the satellite as seen from the ground","Eccentricity","Specific energy","Nadir angle from the satellite"],0,
 R`\(\varepsilon\) is the elevation angle above the target's horizon, \(\lambda\) the Earth central angle, and \(\eta\) the nadir angle at the satellite. They satisfy \(\lambda+\eta+\varepsilon = 90°\).`,"Astro Pt2 s.12–13");
mc("cov","equation",0,R`What does \(F = \tfrac12(1-\cos\lambda)\) give?`,
 ["The fraction of Earth's surface instantaneously in view","The field of view of the sensor in degrees","The fraction of the orbit in eclipse","The ground-track swath width"],0,
 R`The instantaneous access area is \(A_t = 2\pi R_E^2(1-\cos\lambda)\). Dividing by \(4\pi R_E^2\) gives \(F\).`,"Astro Pt2 s.13");
mc("cov","concept",0,R`If you raise the minimum elevation angle from 0° to 10° at fixed altitude, what happens to coverage?`,
 ["The coverage circle shrinks (smaller λ and F)","Coverage grows","No change","Coverage depends only on altitude"],0,
 R`Higher \(\varepsilon\) cuts off low-on-the-horizon views, so \(\lambda\) decreases. HW 2 #4 and #6 use \(\varepsilon = 10°\) and \(8°\).`,"Astro Pt2 s.13–14");
mc("cov","equation",1,R`For J₂ nodal regression \(\dot\Omega = -\tfrac32 J_2 n\left(\tfrac{R_e}{a(1-e^2)}\right)^2\cos i\), why must a sun-synchronous orbit be retrograde?`,
 [R`SSO needs \(\dot\Omega = +0.9856°/\text{day}\) (eastward). That requires \(\cos i < 0\), so \(i > 90°\)`,"Retrograde orbits have less drag","J₂ is zero for prograde orbits","Prograde orbits regress too fast"],0,
 R`The node must advance with the Sun's apparent motion, 360°/365.256 days. With the minus sign, \(\dot\Omega > 0\) only for \(i > 90°\). Example: \(h = 833\) km gives \(i = 98.7°\).`,"Astro Pt2 s.22–23");
mc("cov","fact",0,R`What \(\dot\Omega\) does a sun-synchronous orbit need?`,
 ["+0.9856°/day","−0.9856°/day","+360°/day","0°/day"],0,
 R`\(360°/365.256\ \text{days} = 0.9856°/\text{day}\), eastward, matching Earth's motion around the Sun. Common SSOs are noon–midnight and dawn–dusk.`,"Astro Pt2 s.23");
mc("cov","fact",0,R`At what "critical inclinations" does J₂ produce no apsidal rotation (\(\dot\omega = 0\))?`,
 ["63.4° and 116.6°","0° and 90°","28.5° and 51.6°","45° and 135°"],0,
 R`\(\dot\omega \propto 2 - \tfrac52\sin^2 i = 0\) gives \(\sin^2 i = 0.8\), so \(i = 63.4°\) or \(116.6°\). Molniya (HEO) orbits use this to keep apogee over the northern hemisphere.`,"Astro Pt2 s.24");
mc("cov","concept",0,R`What causes the J₂ perturbation?`,
 [R`Earth's oblateness: the equatorial bulge (\(R_{eq} - R_{pole} \approx 21.4\) km)`,"The Moon's gravity","Atmospheric drag","Solar radiation pressure"],0,
 R`J₂ is the second zonal harmonic, \(1.08263\times10^{-3}\), from the oblate spheroid shape. \(\Delta R \approx 21.4/6371 \approx 0.3\%\).`,"Astro Pt2 s.20–21");
mc("cov","concept",0,R`What is the J₂ nodal regression for a polar orbit (\(i = 90°\))?`,
 ["Zero, because cos 90° = 0","Maximum westward","Maximum eastward","It equals the SSO rate"],0,
 R`\(\dot\Omega \propto \cos i\), so a polar orbit's plane does not precess from J₂. Regression is largest for low-inclination LEO (up to ≈ 10°/day).`,"Astro Pt2 s.21–22");
mc("cov","fact",1,R`Which are listed as orbit perturbations (deviations from the two-body approximation)?`,
 ["Non-spherical Earth, atmospheric drag, third-body gravity, solar radiation pressure","Only atmospheric drag","Kepler's laws and vis-viva","Launch azimuth and latitude"],0,
 R`Non-spherical Earth (J₂) plus space-environment forces: drag, third body, SRP. The midterm review says "Don't forget other topics: plane change, coverage, perturbations, etc."`,"Astro Pt2 s.19; Midterm Review s.11");
mc("cov","concept",0,R`For a space telescope, which coordinate system is most useful for describing where it is pointing on the sky?`,
 ["Celestial coordinates (fixed relative to the stars)","Earth-fixed coordinates","Roll-pitch-yaw only","Launch-site coordinates"],0,
 R`The four systems shown are spacecraft-fixed, Earth-fixed, RPY, and celestial. A telescope's targets are fixed on the celestial sphere. Spacecraft-fixed axes describe the instrument boresight.`,"Astro Pt2 s.11; HW2 #6e");
mc("cov","fact",0,R`Which Earth radius values appear in the course?`,
 ["Mean 6371 km; equatorial 6378 km; polar 6356 km","Mean 6378 km; equatorial 6400 km; polar 6300 km","Mean 6000 km; equatorial 6371 km; polar 6356 km","6371 km at all latitudes"],0,
 R`Use the mean 6371 km unless told otherwise. J₂ formulas often use \(R_e\) = equatorial 6378 km.`,"Astro Pt2 s.20");
mc("cov","fact",0,R`What is a parking orbit and what is a transfer orbit?`,
 ["Park: a temporary orbit (usually LEO) for checkout or storage. Transfer: an intermediate orbit to the final one, such as GTO (≈ 320 × 35,786 km)","Park: the final GEO slot. Transfer: the launch trajectory","Park: a graveyard orbit. Transfer: re-entry","They mean the same thing"],0,
 R`From the "Parking and Transfer Orbits" slide.`,"Astro Pt2 s.8");

/* ===== Rocket basics & staging ===== */
mc("rkt","equation",1,R`In \(F_T = \dot m V_e + A_e(P_e - P_\infty)\), when is the pressure-thrust term zero?`,
 [R`When the nozzle is perfectly expanded, \(P_e = P_\infty\)`,"In vacuum",R`When \(\dot m = 0\)`,"At the throat"],0,
 R`The second term is pressure thrust. In a well-designed rocket it is small compared with \(\dot m V_e\), so \(c \approx V_e\). In vacuum (\(P_\infty = 0\)) it is positive, not zero.`,"Propulsion notes p.1");
mc("rkt","equation",1,R`Why does \(I_{sp} = c/g\) always use \(g\) at Earth's surface, even for a thruster on Mars?`,
 [R`Isp is defined per weight of propellant on Earth. \(g_0\) is a fixed conversion constant`,"Because the rocket launched from Earth","It should use local gravity","Because thrust is measured on Earth"],0,
 R`The notes are explicit: \(W\) is propellant weight on Earth, so \(g\) is Earth surface gravity. The notes recommend converting \(I_{sp}\) to \(c\) first and working with \(c\).`,"Propulsion notes p.2; Midterm Review s.12");
mc("rkt","concept",0,R`What does specific impulse measure?`,
 ["Propellant efficiency: impulse per weight of propellant","Total impulse delivered","Thrust-to-weight ratio of the vehicle","Thrust per unit nozzle area"],0,
 R`\(I_{sp} = I/W = F_T/\dot W = F_T/(\dot m g)\), in seconds. Higher \(I_{sp}\) means less propellant for a given impulse.`,"Propulsion notes p.2");
mc("rkt","fact",0,R`Which typical Isp ranges are given in the notes?`,
 ["Chemical 50–450 s; electrothermal 300–1200 s; electrostatic/electromagnetic 1500–4000 s","Chemical 1000–2000 s; EP 200–400 s","All rockets ≈ 300 s","Chemical 450–1500 s; EP 4000–10,000 s"],0,
 R`From the Impulse and Specific Impulse notes.`,"Propulsion notes p.2");
mc("rkt","equation",1,R`What does the ideal rocket equation \(\Delta V = c\ln(m_0/m_f)\) assume?`,
 ["No external forces (gravity, drag) and constant effective exhaust velocity c","Constant mass","Constant thrust-to-weight","That the burn happens at periapsis"],0,
 R`It is a momentum balance on the vehicle with only thrust acting. For launch, gravity and drag losses are subtracted separately.`,"Propulsion notes p.3");
mc("rkt","equation",1,R`You know the required \(\Delta V\), the engine \(c\), and the dry (delivered) mass \(m_f\). Which form gives propellant mass directly?`,
 [R`\(m_p = m_f\left(e^{\Delta V/c}-1\right)\)`,R`\(m_p = m_0\left(1-e^{-\Delta V/c}\right)\)`,R`\(m_p = m_f\,\Delta V/c\)`,R`\(m_p = m_f\ln(\Delta V/c)\)`],0,
 R`From \(m_0/m_f = e^{\Delta V/c}\) and \(m_0 = m_f + m_p\). The second option is also correct, but needs \(m_0\), which you don't have here.`,"Propulsion notes p.3; Midterm Review s.14");
mc("rkt","concept",1,R`Which of these is <b>not</b> a way listed to decrease propellant mass?`,
 ["Increase dry mass for structural margin","Increase Isp","Use staging","Lower ΔV with better trajectories or flybys"],0,
 R`Rocket options: increase Isp, staging. Mission options: lower ΔV (trajectory, flyby). Spacecraft options: lower dry mass, which is the hardest. Adding dry mass increases propellant.`,"Space Propulsion s.19");
mc("rkt","concept",1,R`Which mass is \(m_f\) in the rocket equation?`,
 [R`Dry or delivered mass: payload plus inert mass, \(m_{pay}+m_i\)`,"Payload only","Propellant mass","Initial (wet) mass"],0,
 R`\(m_0 = m_{pay}+m_i+m_p\) (wet), \(m_f = m_{pay}+m_i\) (dry). Inert mass includes structure, fairings, electronics, power, the thruster system without propellant, and ACS.`,"Midterm Review s.13");
mc("rkt","concept",0,R`According to the \(m_p/m_f\) vs \(c\) curves, what happens as Isp rises far above ≈ 4500 s?`,
 ["Diminishing returns: propellant fraction is already small, so more Isp barely helps (and costs power)","Propellant mass keeps falling exponentially","Propellant mass rises","Thrust rises proportionally"],0,
 R`The curves flatten. The slide's takeaway: much higher than 4500 s is not particularly attractive.`,"Space Propulsion s.21");
mc("rkt","fact",0,R`Which effective exhaust velocities are given for the chemical options?`,
 ["Cold gas ≈ 0.69, monoprop ≈ 2.26, solid ≈ 2.94, biprop ≈ 3.92 km/s","Cold gas ≈ 3, solid ≈ 1, biprop ≈ 10 km/s","All ≈ 30 km/s","Cold gas ≈ 2.9, monoprop ≈ 0.7 km/s"],0,
 R`These correspond to Isp ≈ 70, 230, 300 and 400 s, from the "Decreasing Propellant Mass (Isp)" slide.`,"Space Propulsion s.13");
mc("rkt","equation",1,R`In serial staging, \(m_{0,1} = m_{0,2} + m_{i,1} + m_{p,1}\). What is \(m_{0,2}\)?`,
 ["The full initial mass of stage 2 and everything above it, including payload","Stage 2 propellant only","The payload only","Stage 1 dry mass"],0,
 R`To stage 1, the whole upper stack is payload. Then \(m_{f,1} = m_{0,1} - m_{p,1}\), and stage 2 starts fresh after dropping \(m_{i,1}\).`,"Staging notes; Midterm Review s.16");
mc("rkt","concept",1,R`During launch, all engines throttle back to 60% through Max Q. Is that a stage change for ΔV purposes?`,
 ["No: dry mass and the mass-flow-weighted Isp are unchanged","Yes: the thrust changed","Yes: any throttle change is a stage","Only if the boosters are solid"],0,
 R`A stage change happens when Isp changes (some engines shut down) or dry mass changes (jettison). Throttling every engine by the same fraction keeps the stage Isp the same (289 s in the slide example).`,"Launch s.14–19");
mc("rkt","concept",1,R`The SRBs burn out but stay attached while the core keeps firing. Is that a stage change?`,
 ["Yes: Isp changes to the core-only value even though dry mass hasn't changed","No: dry mass is unchanged","Only once the SRBs separate","No: the core never stopped"],0,
 R`Case 2 on the launch slides: an Isp change is a stage change. Restart the ΔV calculation from SRB burnout. Separation (Case 3) is another stage change, since dry mass changes. In practice the two are treated as simultaneous.`,"Launch s.15–16");
mc("rkt","equation",0,R`Two SRBs (250 s, 4000 kg/s each) fire with a core engine (500 s, 1475 kg/s). How do you get the stage Isp?`,
 [R`Mass-flow-weighted average: \(\sum \dot m I_{sp} / \sum \dot m \approx 289\) s`,"Simple average: (250 + 500)/2 = 375 s","Use the highest: 500 s","Use the lowest: 250 s"],0,
 R`\(I_{sp,stage} = \sum F/\sum\dot W = \sum(\dot m I_{sp})/\sum\dot m = (2\cdot4000\cdot250 + 1475\cdot500)/(9475) \approx 289\) s.`,"Launch s.14");
mc("rkt","concept",0,R`Why does staging reduce the propellant needed?`,
 ["Dropping spent tanks and engines means later burns don't accelerate dead inert mass","It raises each engine's Isp","It reduces gravity","It removes the need for a payload fairing"],0,
 R`Each stage's \(m_0/m_f\) improves because the previous stage's inert mass is gone.`,"Staging notes; Launch s.12");
mc("rkt","fact",0,R`Roughly what fraction of a launch vehicle's mass is propellant?`,
 ["≈ 90%","≈ 50%","≈ 25%","≈ 99%"],0,
 R`"A rocket's weight is roughly 90% propellant, 10% structure and electronics."`,"Launch s.5; Launch notes p.3");
mc("rkt","fact",0,R`What is the difference between parallel and serial staging?`,
 ["Parallel: boosters fire at the same time as the core and are dropped. Serial: stages fire one after another","Parallel: stages fire one after another. Serial: all at once","There is no difference","Parallel is only used for upper stages"],0,
 R`The slides also mention partial and piggy-back staging. Many vehicles combine series and parallel (boosters, core, upper stage).`,"Midterm Review s.17–18; Launch s.12");
mc("rkt","equation",0,R`What is impulse for constant thrust, and its units?`,
 [R`\(I = F_T t\), in N·s (or lbf·s)`,R`\(I = F_T/t\), in N/s`,R`\(I = \dot m c^2\), in W`,R`\(I = F_T/\dot m\), in m/s`],0,
 R`\(I = \int F_T\,dt\), which reduces to \(F_T t\) for constant thrust.`,"Propulsion notes p.2");
mc("rkt","fact",0,R`What typical ΔV values does the Fortescue slide give for LEO and for LEO → GEO?`,
 ["Into LEO ≥ 9.5 km/s (with drag and gravity losses); GEO from a 30° parking orbit ≈ 4.2 km/s","Into LEO ≈ 7.8 km/s; GEO ≈ 1.5 km/s","Into LEO ≈ 11 km/s; GEO ≈ 9 km/s","Into LEO ≈ 3 km/s; GEO ≈ 0.35 km/s"],0,
 R`Also: GEO N–S stationkeeping ≈ 0.35 km/s over 7 years, E–W ≈ 0.03 km/s, Mars flyby ≈ 3.4 km/s extra, solar system escape ≈ 8.5 km/s.`,"Space Propulsion s.6");

/* ===== Chemical propulsion ===== */
mc("chem","equation",0,R`From \(V_e \approx \sqrt{\dfrac{2\gamma}{\gamma-1}\dfrac{\bar R}{\bar M}T_c}\), what are the two ways to raise exhaust velocity?`,
 [R`Raise chamber temperature \(T_c\) and lower molecular weight \(\bar M\)`,R`Raise \(\bar M\) and lower \(T_c\)`,"Raise chamber pressure only","Lengthen the nozzle only"],0,
 R`\(V_e \propto \sqrt{T_c/\bar M}\). This assumes \(T_e \ll T_c\) (full expansion). It is why LH₂/LOX, with light products, has high Isp.`,"Propulsion notes p.4");
mc("chem","equation",0,R`The characteristic velocity \(c^* = P_c A_t/\dot m\) mainly measures…`,
 ["Combustion chamber performance, independent of the nozzle","Nozzle performance","Vehicle Δv","Thrust coefficient"],0,
 R`\(c^*\) describes the chamber. \(c_f = F_t/(P_c A_t)\) describes the nozzle. Their product is \(c = c^*c_f\).`,"Propulsion notes p.5");
mc("chem","equation",0,R`A new nozzle raises the thrust coefficient \(c_f\) by 3% with \(P_c\) and \(A_t\) unchanged (HW 3). What happens to \(c\)?`,
 [R`\(c\) rises 3%, since \(c = c^* c_f\) and \(c^*\) is unchanged`,R`\(c\) rises 9%`,R`\(c\) is unchanged`,R`\(c\) falls 3%`],0,
 R`Same chamber, so the same \(c^*\). Then \(c\) scales with \(c_f\). Propellant savings come from the rocket equation, and are less than 3% of \(m_p\) for modest ΔV/c.`,"Propulsion notes p.5; HW3 #3b");
mc("chem","equation",0,R`What flow condition does the choked mass-flow equation assume at the throat?`,
 ["Mach 1 (choked flow)","Mach 0","Mach 2","Fully expanded flow"],0,
 R`\(\dot m = \sqrt{\gamma}\left(\tfrac{2}{\gamma+1}\right)^{\frac{\gamma+1}{2(\gamma-1)}}\dfrac{P_cA_t}{\sqrt{RT_c}}\), valid with \(M = 1\) at the throat.`,"Propulsion notes p.5");
mc("chem","fact",1,R`Which are the types of chemical propulsion listed in the course?`,
 ["Cold gas, liquid (monoprop and biprop), solid, hybrid","Ion, Hall, arcjet, resistojet","Nuclear thermal and solar thermal","Liquid and solid only"],0,
 R`Listed on the Chemical Propulsion and midterm review slides.`,"Midterm Review s.31; Chem s.3");
mc("chem","concept",0,R`What is the main advantage and main disadvantage of cold gas thrusters?`,
 ["Simple, but low Isp","High Isp, but complex","High thrust, but toxic","Throttleable, but needs cryogenics"],0,
 R`Highly pressurized gas through a valve, with thrust set by pulse-width modulation. Isp ≈ 70 s.`,"Chem s.4");
mc("chem","concept",0,R`Compared with a solid motor, a liquid bipropellant engine typically…`,
 ["Has higher Isp and can stop, restart and throttle, at the cost of complex plumbing and possible leaks","Is simpler with no moving parts","Has lower Isp but is storable indefinitely","Cannot be throttled"],0,
 R`Biprop: higher Isp, controllable (stop/start, throttle), reusable after refurbishment. Downsides: complex plumbing and leaks, and cryogens need insulation and can't be stored long.`,"Chem s.6");
mc("chem","concept",1,R`Which is an advantage of a solid rocket motor (SRM)?`,
 ["Simple, dense (smaller vehicle) and storable for long periods","Easy restart and throttling on command","Highest Isp of all chemical types","Non-toxic exhaust"],0,
 R`SRM pros: simple with no moving parts except the nozzle, high density, storable, thrust tailored by grain design, gimbaled nozzle. Cons: limited restart (needs separate igniters), toxic exhaust, not throttleable in flight.`,"Chem s.9");
mc("chem","equation",0,R`What does the solid propellant regression rate \(r = aP_c^n\) depend on?`,
 [R`Chamber pressure, with exponent \(n \approx 0.3\)–\(0.8\)`,"Only grain geometry","Ambient pressure","Nozzle exit area"],0,
 R`The burning surface recedes faster at higher \(P_c\). Typical rates are 0.05–10 in/s.`,"Chem s.10");
mc("chem","fact",0,R`What is a hybrid rocket?`,
 ["A solid fuel with a liquid oxidizer","A liquid fuel with a solid oxidizer","A chemical rocket with an ion stage","A monoprop with a cold gas backup"],0,
 R`Pros: safer, less toxic plumes, stop/start/restart, benefits of both. Cons: mixture ratio and throttling variation affect efficiency.`,"Chem s.11");
mc("chem","equation",0,R`What is the wall stress in a thin-walled spherical tank?`,
 [R`\(\sigma = \dfrac{Pr}{2t}\)`,R`\(\sigma = \dfrac{Pr}{t}\)`,R`\(\sigma = \dfrac{P}{2\pi r t}\)`,R`\(\sigma = \dfrac{2Pr}{t}\)`],0,
 R`Sphere: \(Pr/2t\). Cylinder: hoop \(Pr/t\) (the larger one) and longitudinal \(Pr/2t\). HW 3 sizes the thickness with a factor of safety from this.`,"Chem s.8; HW3 #3");
mc("chem","fact",0,R`Liquid monopropellant thrusters usually use which propellant, decomposed over a catalyst bed?`,
 ["Hydrazine (N₂H₄)","Liquid hydrogen","Xenon","Ammonium perchlorate"],0,
 R`Hydrazine monoprop thrusters are common for attitude control and small ΔV. Isp ≈ 230 s (HW 3 uses 230 s).`,"Chem s.5; HW3");

/* ===== Electric propulsion ===== */
mc("ep","equation",1,R`Where does \(v_+ = \sqrt{2eV_B/m}\) come from?`,
 [R`Energy conservation: the ion's potential energy \(eV_B\) becomes kinetic energy \(\tfrac12 m v^2\)`,R`Momentum conservation in the exhaust`,R`The Lorentz \(\vec v\times\vec B\) force`,"Choked flow at the grid"],0,
 R`For electrostatic acceleration, \(F = qE\) with \(E = -\nabla V\). Integrating gives \(\tfrac12 mv^2 = qV_B\). Singly charged means \(q = e = 1.6\times10^{-19}\) C.`,"Propulsion notes p.7");
mc("ep","concept",1,R`At fixed propellant flow, how does electrostatic thrust scale with beam voltage?`,
 [R`\(F_T \propto \sqrt{V_B}\)`,R`\(F_T \propto V_B\)`,R`\(F_T \propto V_B^2\)`,R`It doesn\'t depend on \(V_B\)`],0,
 R`\(F_T = \dot m_p \eta_m v_+\) and \(v_+ \propto \sqrt{V_B}\).`,"Propulsion notes p.8; Midterm Review s.19");
mc("ep","equation",0,R`What is the mass utilization efficiency \(\eta_m\)?`,
 [R`\(\dot m_i / \dot m_p\): the fraction of propellant flow that leaves as ions`,R`\(P_B/P_E\)`,R`\(P_{jet}/P_E\)`,R`\(\dot m_p / \dot m_i\)`],0,
 R`\(\dot m_p = \dot m_i + \dot m_{loss}\). Unionized neutrals add mass flow but not thrust.`,"Propulsion notes p.8");
mc("ep","equation",0,R`What is the beam current for singly charged ions?`,
 [R`\(J_B = \dfrac{q}{m}\dot m_p\eta_m\)`,R`\(J_B = \dot m_p v_+\)`,R`\(J_B = P_B V_B\)`,R`\(J_B = qV_B/m\)`],0,
 R`Each ion carries charge \(q\) and mass \(m\), so the ion mass flow \(\dot m_i\) times \(q/m\) is the current. Beam power is \(P_B = J_B V_B\).`,"Propulsion notes p.8");
mc("ep","equation",0,R`What does the electrical efficiency \(\eta_E = \dfrac{J_BV_B}{J_BV_B + P_0}\) represent?`,
 [R`Fraction of total electrical input power that goes into the beam. \(P_0\) is power lost elsewhere`,"Fraction of propellant ionized","Fraction of jet power converted to thrust","Ratio of thrust to power"],0,
 R`Total efficiency is \(\eta_T = P_{jet}/P_E\) with \(P_{jet} = \tfrac12\dot m_p c^2\).`,"Propulsion notes p.8");
mc("ep","equation",0,R`Which expression is the total thruster efficiency?`,
 [R`\(\eta_T = \dfrac{\tfrac12\dot m_p c^2}{P_E}\)`,R`\(\eta_T = \dot m_i/\dot m_p\)`,R`\(\eta_T = J_B V_B\)`,R`\(\eta_T = c/g\)`],0,
 R`Jet power over electrical input power. For a fixed \(\eta_T\) and \(P_E\), raising \(c\) lowers thrust: \(F = 2\eta_T P_E/c\).`,"Propulsion notes p.8; HW3 #4");
mc("ep","concept",1,R`Chemical propulsion is "energy limited." What is EP limited by?`,
 ["The available electric power, which limits thrust","Propellant chemical energy","Nozzle area","Launch vehicle volume"],0,
 R`Chemical: \(v_{ex}\) is limited by the propellant's energy density (c ≈ 3–4 km/s). EP: energy comes from the power system, so \(c\) can be 5–100+ km/s, but thrust is limited by power (≈ 0.1 to hundreds of mN).`,"Space Propulsion s.16");
mc("ep","fact",1,R`Which is listed as a <b>disadvantage</b> of electric propulsion?`,
 ["Higher inert mass, because an external power system is required","Low Isp","High disturbance forces","No precision"],0,
 R`EP pros: high Isp (low propellant mass), high precision, low disturbance. Cons: low thrust and longer trips, higher inert mass for power, typically less heritage.`,"Midterm Review s.32");
mc("ep","concept",0,R`In the Lorentz force \(\vec F = q\vec E + q(\vec v\times\vec B)\), what is the \(q(\vec v\times\vec B)\) term the basis for?`,
 ["Magnetic confinement and electromagnetic propulsion","Electrostatic ion acceleration","Chemical combustion","Gravity-gradient stabilization"],0,
 R`Electrostatic thrusters use \(q\vec E\). When \(\vec B = 0\) or \(\vec v\parallel\vec B\), only \(q\vec E\) remains. EM propulsion is considered still under development for mission design.`,"Propulsion notes p.6–7");
mc("ep","concept",0,R`A Hall thruster switches from xenon (131.3 amu) to krypton (83.8 amu) at the same beam voltage. What happens to the ion exit velocity?`,
 [R`It rises by \(\sqrt{131.3/83.8}\approx 1.25\)`,"It falls by 1.25","It is unchanged","It rises by 131.3/83.8 ≈ 1.57"],0,
 R`\(v_+ \propto 1/\sqrt{m}\). Lighter propellant gives higher Isp at the same voltage, but more current and power per kg of propellant.`,"Propulsion notes p.7; HW3 #4");
mc("ep","equation",0,R`Why does a Hall thruster need the electron gyroradius much smaller than the channel, and the ion gyroradius much larger?`,
 ["Electrons are trapped by B to create the Hall current and electric field, while ions are accelerated electrostatically almost unaffected by B","To make ions spiral and gain energy","So both species are magnetized equally","To reduce the plume divergence of electrons"],0,
 R`\(r_g = m v_\perp/(|q|B)\). The tiny electron mass gives a tiny \(r_g\), so electrons are magnetized. Heavy ions have \(r_g \gg L\) and leave nearly straight.`,"Space Env s.26–27; HW3 #4b");
mc("ep","fact",0,R`What does the notes' example give for singly charged xenon at \(V_B = 1000\) V?`,
 ["v₊ ≈ 38.3 km/s, Isp ≈ 3900 s","v₊ ≈ 3.8 km/s, Isp ≈ 390 s","v₊ ≈ 383 km/s, Isp ≈ 39,000 s","v₊ ≈ 30 km/s, Isp ≈ 3000 s"],0,
 R`\(m_{Xe} = 131.3\times1.66\times10^{-27} = 2.18\times10^{-25}\) kg, so \(v_+ = \sqrt{2(1.6\times10^{-19})(1000)/2.18\times10^{-25}} \approx 38.3\) km/s.`,"Propulsion notes p.7");
mc("ep","fact",0,R`ESA's SMART-1 lunar mission was a first for which technology?`,
 ["First use of Hall thruster EP outside geosynchronous orbit","First ion engine ever flown","First solar sail","First nuclear thermal rocket"],0,
 R`SMART-1: PPS-1350 Hall thruster, 0.46–1.19 kW, Isp 1100–1600 s, thrust 30–70 mN, with a spiral transfer and plane change.`,"Astro Pt1 s.14");
mc("ep","fact",0,R`Which EP class do the notes call the primary means for high-Isp propulsion?`,
 ["Electrostatic","Electrothermal","Electromagnetic","Cold gas"],0,
 R`Electrostatic is the primary means for high Isp. Electrothermal improves on chemical. Electromagnetic is promising but should be considered under development.`,"Propulsion notes p.6");
mc("ep","fact",0,R`Starlink's Hall thrusters moved away from xenon. What did Gen 1 and Gen 2 (2023+) use?`,
 ["Krypton, then argon (cheaper propellants)","Argon, then helium","Hydrazine, then xenon","Iodine, then cesium"],0,
 R`From HW 3 #4: NASA traditionally used Xe. Starlink Gen 1 used Kr for lower cost, and Gen 2 uses Ar, which is cheaper still.`,"HW3 #4");

/* ===== Launch ===== */
mc("lau","equation",1,R`What does \(\cos i = \cos\delta\,\sin A\) tell you about launching due east (\(A = 90°\))?`,
 [R`\(i = \delta\): the lowest inclination reachable directly from that latitude`,R`\(i = 0\)`,R`\(i = 90°\)`,R`\(i = 90° - \delta\)`],0,
 R`With \(\sin A = 1\), \(\cos i = \cos\delta\). Since \(|\sin A| \le 1\), \(i_{orbit} \ge \delta_{launch}\).`,"Launch notes p.1; Midterm Review s.20");
mc("lau","concept",1,R`Can a vehicle launched from KSC (28.5°N) go directly into an equatorial orbit?`,
 ["No: i ≥ δ, so it reaches at least 28.5° and needs a plane change (expensive)","Yes, by launching due south","Yes, by launching due east","Only with a polar launch"],0,
 R`HW 4 #1 computes the inclination-change ΔV this costs from several spaceports. French Guiana at 5° has a big advantage for GEO.`,"Launch notes p.1; HW4 #1");
mc("lau","equation",1,R`What is the Earth-rotation velocity boost, and when is it largest?`,
 [R`\(\Delta V_{\omega} \approx \omega_\oplus R_\oplus\cos\delta\sin A\), largest for an eastward launch from the equator (≈ 0.46 km/s)`,R`\(\omega_\oplus R_\oplus\), the same everywhere`,"Largest for a polar launch","Largest for a westward launch"],0,
 R`\(\omega_\oplus = 2\pi/24\,\mathrm{hr}\). At KSC: ≈ 0.465·cos 28.5° ≈ 0.41 km/s due east. A retrograde launch (\(\sin A<0\)) pays a penalty.`,"Launch notes p.3; Midterm Review s.20");
mc("lau","equation",0,R`Which balance gives the velocity a launch vehicle actually reaches?`,
 [R`\(V_{orbit} = \Delta V_{prop} - \Delta V_g - \Delta V_D + \Delta V_{\omega\oplus}\) (minus steering losses)`,R`\(V_{orbit} = \Delta V_{prop} + \Delta V_g + \Delta V_D\)`,R`\(V_{orbit} = c\ln(m_0/m_f)\) only`,R`\(V_{orbit} = \sqrt{2\mu/r}\)`],0,
 R`The rocket equation gives \(\Delta V_{prop}\). Gravity loss \(\int g\sin\gamma\,dt\), drag loss \(\int D/m\,dt\), and steering loss \(\int (T/m)(1-\cos\alpha)\,dt\) come off. Earth's rotation adds.`,"Launch notes p.2");
mc("lau","concept",0,R`Why do launch vehicles "burn and turn" (a gravity turn)?`,
 ["Go vertical through the dense lower atmosphere to limit drag, then pitch over toward horizontal to cut gravity losses","To maximize drag for stability","To reach the Kármán line faster","To avoid the Van Allen belts"],0,
 R`Gravity loss \(\int g\sin\gamma\,dt\) is smallest when the flight path angle \(\gamma\) is near 0 (horizontal). Drag is largest low down, where density is high.`,"Launch notes p.2");
mc("lau","fact",0,R`For the Space Shuttle example, which launch loss was largest?`,
 ["Gravity loss ≈ 1222 m/s","Drag loss ≈ 107 m/s","Steering loss ≈ 358 m/s","Earth rotation ≈ −395 m/s"],0,
 R`Shuttle: \(V_{LEO}\) 7794, \(\Delta V_g\) 1222, \(\Delta V_D\) 107, \(\Delta V_{st}\) 358, \(\Delta V_\omega\) −395, total \(\Delta V_{prop}\) ≈ 9086 m/s (≈ 30,000 ft/s).`,"Launch notes p.3");
mc("lau","fact",0,R`"Launch by the numbers": how much propellant to put 4.5 kg (10 lb) into LEO, and into GEO?`,
 ["≈ 180 kg to LEO; ≈ 725 kg to GEO","≈ 18 kg; ≈ 72 kg","≈ 1800 kg; ≈ 7250 kg","≈ 45 kg; ≈ 180 kg"],0,
 R`Also: you need at least 7.5 km/s to stay in LEO, and Shuttle launch power was equivalent to 23 Hoover Dams.`,"Launch s.5; Launch notes p.3");
mc("lau","concept",0,R`Why does the US need both Vandenberg (≈ 35°N) and KSC (28.5°N)?`,
 ["Range-safety limits on allowed azimuths mean each site reaches only part of the inclination range","KSC can't reach LEO","Vandenberg is closer to the equator","Only Vandenberg can launch at night"],0,
 R`KSC azimuths ≈ 35°–120° give \(i\) ≈ 28.5°–57°. Vandenberg's southward azimuths (≈ 140°–201°) give high-inclination, polar and retrograde orbits (\(i\) ≈ 56°–104°).`,"Launch notes p.1; Launch s.7");
mc("lau","equation",0,R`What sets the RAAN of the orbit you launch into?`,
 [R`Launch time, which sets where the launch meridian is: \(\sin\gamma_2 = \tan\delta\cot i\), \(\alpha = \Omega + \gamma_2\)`,"The launch azimuth only","The launch vehicle's Isp","It is always zero"],0,
 R`To hit a desired ascending node, the launch site's meridian must be at the right right-ascension, so you wait for Earth to rotate the site into place.`,"Launch notes p.1");
mc("lau","concept",1,R`On the launch selection slides, what are the three groups of launch effects on spacecraft design?`,
 ["Mission capability (ΔV, mass to LEO or C3), structural loads and frequencies, and spacecraft geometry and size (fairing)","Cost, schedule, and politics","Isp, thrust, and burn time","Drag, gravity, and steering losses"],0,
 R`Also: design the spacecraft to avoid natural frequencies near the launch vehicle's, and the stowed configuration must fit in the payload fairing.`,"Launch s.6; Midterm Review s.33");
mc("lau","equation",0,R`What are \(f_{n,ax} \approx 0.25\sqrt{AE/(mL)}\) and \(f_{n,lat} \approx 0.56\sqrt{EI/(mL^3)}\) used for?`,
 ["Estimating the spacecraft's fundamental frequencies to keep them above the launch vehicle's minimum and avoid resonance","Sizing propellant tanks","Computing gravity losses","Finding the payload's center of pressure"],0,
 R`Launch vehicle user's guides specify minimum axial and lateral frequencies (the SMAD table lists them per vehicle).`,"Launch s.34; Midterm Review s.33");
mc("lau","concept",0,R`On the 3-stage launch acceleration plot, when does acceleration (in g's) peak within each stage?`,
 ["Right before burnout, when the stage's mass is lowest","At liftoff","At Max Q","Right after staging"],0,
 R`Acceleration in g = Thrust/Weight. With roughly constant thrust and falling mass, it climbs through each burn, then drops at staging.`,"Launch s.32");
mc("lau","fact",0,R`What is "Max Q"?`,
 ["The point of maximum dynamic pressure on the vehicle","Maximum thrust","Maximum altitude","Maximum heat flux at re-entry"],0,
 R`Vehicles usually throttle down through Max Q to limit aerodynamic loads (Case 1 in the staging examples).`,"Launch s.14, s.23");
mc("lau","fact",0,R`What LEO capability and price does the slide give for Falcon 9 vs Falcon Heavy?`,
 ["F9: 22,800 kg, $74M. FH: 63,800 kg, $97M","F9: 63,800 kg; FH: 22,800 kg","Both ≈ 10,000 kg","F9: 8,300 kg, $62M; FH: 26,700 kg, $90M"],0,
 R`From the "Launch Sequence, Vehicles, Considerations" slide.`,"Launch s.22");
mc("lau","concept",0,R`What is the payload fairing for?`,
 ["Protecting the spacecraft during ascent through the atmosphere. It is jettisoned once out of the dense air","Providing thrust","Storing upper-stage propellant","Shielding from Van Allen radiation"],0,
 R`The MER launch slides call it a thin metal shroud or nose cone. Its envelope constrains spacecraft geometry and stowed configuration.`,"Interplanetary s.33; Launch s.36");

/* ===== Interplanetary ===== */
mc("ipl","concept",1,R`In patched conics, what conic is used in each phase of an interplanetary mission?`,
 ["Geocentric escape: hyperbola. Heliocentric transfer: ellipse. Planetocentric encounter: hyperbola","Ellipse, hyperbola, ellipse","Parabola for all three","Circle, ellipse, circle"],0,
 R`The conics are patched together at the planets' spheres of influence.`,"Interplanetary s.5–7");
mc("ipl","equation",1,R`How is C3 related to burnout and escape speeds?`,
 [R`\(C_3 = v_\infty^2 = v_{bo}^2 - v_{esc}^2\)`,R`\(C_3 = v_{bo} - v_{esc}\)`,R`\(C_3 = v_\infty\)`,R`\(C_3 = v_{bo}^2 + v_{esc}^2\)`],0,
 R`An energy balance: \(\varepsilon_\infty = \varepsilon_{bo} - \varepsilon_{esc}\) with \(\varepsilon_{esc} = 0\) at the same \(r\). C3 is a squared speed (km²/s²).`,"Midterm Review s.21–22");
mc("ipl","concept",1,R`Which statement about C3 is correct?`,
 ["It is measured relative to the planet being left or approached, and launch vehicles are rated by the max C3 they can deliver for a payload mass","It is measured relative to the Sun","It is the Δv for a Hohmann transfer","It has units of km/s"],0,
 R`C3 \(= v_\infty^2\), relative to the planet. It is proportional to the minimum specific energy needed for the mission.`,"Midterm Review s.24");
mc("ipl","equation",1,R`After leaving Earth's SOI, how do you get the spacecraft's heliocentric velocity?`,
 [R`Vector sum: \(\vec v_{sun} = \vec v_\infty + \vec v_{planet}\)`,R`Scalar sum \(v_\infty + v_{planet}\) always`,R`\(v_{sun} = v_\infty\)`,R`\(v_{sun} = \sqrt{v_\infty^2 - v_{planet}^2}\)`],0,
 R`It is vector addition. Leaving parallel to Earth's orbital velocity is the efficient case for an outer-planet Hohmann transfer.`,"Midterm Review s.22");
mc("ipl","equation",0,R`How is a planet's sphere of influence approximated?`,
 [R`\(r_{SOI} \approx a\left(\dfrac{\mu_p}{\mu_s}\right)^{2/5}\)`,R`\(r_{SOI} \approx a\sqrt{\mu_p/\mu_s}\)`,R`\(r_{SOI} = a\,\mu_p/\mu_s\)`,R`\(r_{SOI} = 2R_p\)`],0,
 R`Earth's SOI ≈ 0.62% of its orbital radius (≈ 925,000 km). Jupiter's is largest by fraction, at 6.19%.`,"Interplanetary s.8");
mc("ipl","concept",1,R`What is the Oberth effect?`,
 ["A burn at higher speed changes mechanical energy more, so burn at periapsis for the largest energy change","Gravity assists steal momentum from planets","Plane changes are cheapest at apoapsis","Thrust increases in vacuum"],0,
 R`\(\Delta KE = \tfrac12(v+\Delta v)^2 - \tfrac12 v^2 = v\Delta v + \tfrac12\Delta v^2\), which grows with \(v\). The slide example: 1 m/s added at 10 m/s gives +10.5, at 20 m/s gives +20.5 (m²/s²).`,"Interplanetary s.10; Missions s.2");
mc("ipl","equation",0,R`For a burn \(\Delta v\) at periapsis of a parabolic approach (\(v_\infty = 0\)), what is the resulting \(v_\infty\)?`,
 [R`\(v_\infty = \Delta v\sqrt{\dfrac{2v_{esc}}{\Delta v}+1} > \Delta v\)`,R`\(v_\infty = \Delta v\)`,R`\(v_\infty = v_{esc}+\Delta v\)`,R`\(v_\infty = \sqrt{v_{esc}\Delta v}\)`],0,
 R`From \(\varepsilon_\infty = v_{esc}\Delta v + \tfrac12\Delta v^2\). The same Δv applied far from the planet would give only \(\Delta v\).`,"Interplanetary s.11");
mc("ipl","equation",0,R`What is the departure phase angle for a Hohmann transfer to an outer planet?`,
 [R`\(\phi = \pi - 2\pi\,t_{xfer}/T_2\): how far the target must lead at departure`,R`\(\phi = 2\pi t_{xfer}/T_1\)`,R`\(\phi = \pi\)`,R`\(\phi = T_1T_2/(T_2-T_1)\)`],0,
 R`The transfer sweeps \(\theta_{xfer} = \pi\) in \(t_{xfer} = T_{tr}/2\). The target moves \(2\pi t_{xfer}/T_2\) in that time, and the difference is the lead angle (≈ 44° for Earth → Mars).`,"Interplanetary s.14; HW2 #2d");
mc("ipl","equation",0,R`How often do Earth–Mars transfer windows recur?`,
 [R`Every synodic period \(T_s = T_1T_2/|T_2 - T_1| \approx 780\) days (≈ 2.1 yr)`,"Every year","Every 687 days (a Mars year)","Every 11 years"],0,
 R`\(365.25\times687/(687-365.25)\approx 780\) days.`,"Interplanetary s.14");
mc("ipl","concept",1,R`On a porkchop plot, what separates a Type I from a Type II transfer?`,
 ["Type I has a transfer angle < 180°, Type II > 180°","Type I uses chemical propulsion, Type II EP","Type I is to inner planets, Type II to outer","Type I is Hohmann, Type II is a flyby"],0,
 R`The transfer angle is the true-anomaly sweep. The 180° "ridge" between them is a costly region (it needs large plane changes).`,"Midterm Review s.23–25");
mc("ipl","concept",1,R`What do porkchop plots show, and why are they useful?`,
 ["C3 (and arrival v∞) contours vs departure and arrival dates, for finding launch windows and trading C3 against transfer time","Δv vs altitude for plane changes","Rocket mass ratio vs Isp","Radiation dose vs shielding"],0,
 R`Built from many Lambert's-problem solutions. Given a launch vehicle's max C3, the window is the range of departure dates under that contour.`,"Interplanetary s.16, s.25, s.44–58; HW4 #2");
mc("ipl","concept",0,R`In the 2005 example, the launch vehicle can provide C3 = 21 km²/s². How do you find the launch window?`,
 ["Find the span of departure dates where the required C3 (for an acceptable arrival) is ≤ 21","Pick the single minimum-C3 date","Use the synodic period","Divide 21 by v∞"],0,
 R`The slide shows about a 23–24 day window for each transfer type.`,"Interplanetary s.57");
mc("ipl","concept",1,R`In a gravity assist, what stays the same and what changes?`,
 ["Speed relative to the planet is the same in and out, but direction turns. Speed relative to the Sun can change","Speed relative to the Sun is unchanged","The spacecraft burns propellant at closest approach","Speed relative to the planet doubles"],0,
 R`\(\vec v_{rel} = \vec v_{ti} - \vec v_p\). The hyperbola turns \(\vec v_{rel}\), and \(\vec v_{tf} = \vec v_{rel,out} + \vec v_p\). Energy is exchanged with the planet (angular momentum is "stolen" or added).`,"Interplanetary s.18–19; Midterm Review s.27");
mc("ipl","fact",0,R`Per the solar-system "subway map," what are the ΔV legs for Earth surface to Mars capture?`,
 ["9.4 to LEO, 3.21 to escape, 1.06 to Mars, 1.44 capture: ≈ 15.11 km/s total","7.8, 11.2, 3.0, 2.0","9.4 to LEO, then 2 km/s total","≈ 30 km/s total"],0,
 R`Subway maps are simplistic but good initial estimates. HW 4 #4 uses the 1.44 km/s Mars capture leg.`,"Interplanetary s.15");
mc("ipl","concept",0,R`What is Lambert's problem?`,
 [R`Given two position vectors and the time of flight between them, find the departure and arrival velocities`,"Find the SOI radius","Find the C3 given v∞","Find the stage Isp"],0,
 R`Given \(t_0, \vec R_0, t_f, \vec R_f\), find \(\vec V_0, \vec V_f\) (two-body). Solved for many date pairs, it produces porkchop plots.`,"Interplanetary s.44");
mc("ipl","concept",1,R`Which is true about the three-body problem and Lagrange points?`,
 ["There is no general closed-form solution. Lagrange points are limited special solutions where the forces balance in the rotating frame (JWST is at Sun–Earth L2)","Patched conics solve it exactly","Spheres of influence are real physical boundaries","There are 3 Lagrange points"],0,
 R`Spheres of influence don't really exist, but they are a good approximation. There are 5 Lagrange points (L1–L5). The Interplanetary Transport Network uses n-body dynamics for low-Δv transfers (e.g., Genesis, ≈ 450 m/s total).`,"Interplanetary s.22–23; Midterm Review s.34");
mc("ipl","concept",1,R`A landing mission at Mars uses EDL. What does each phase use?`,
 ["Entry: aeroshell/aerocapture. Descent: parachutes and/or retrorockets. Landing: retrorockets or airbags","Entry: retrorockets. Descent: airbags. Landing: parachute","Only an orbit insertion burn","Entry: ion engine. Descent: solar sail"],0,
 R`Orbiters instead convert the hyperbolic approach into an orbit with a capture burn (MOI). MER used an aeroshell, a parachute with Zylon bridle, RAD motors, and airbags with a tetrahedral lander.`,"Midterm Review s.28; Interplanetary s.24, s.34–38");
mc("ipl","concept",0,R`Why did MER Rover B launch on the more powerful Delta II 7925-H instead of the 7925?`,
 ["It launched later in the window and needed more energy (C3) to rendezvous with Mars","It was heavier because it carried a helicopter","It went to a different planet","The 7925 was retired"],0,
 R`The slide asks "Why? Rendezvous." A later departure date needs a higher C3 on the porkchop plot.`,"Interplanetary s.30");
mc("ipl","fact",0,R`What fraction of spacecraft have ever left Earth orbit, per the interplanetary intro?`,
 ["About 1%","About 10%","About 25%","Less than 0.01%"],0,
 R`Roughly 16,000 active around Earth (≈ 15,183 in LEO) vs ≈ 130 cis-lunar and ≈ 101 beyond the Moon. "But it's a really cool 1%."`,"Interplanetary s.3–4");
mc("ipl","concept",0,R`When the spacecraft leaves a planet's SOI, what is generally assumed?`,
 ["It has the planet's position relative to the Sun, but a velocity (direction and magnitude) different from the planet's","It has the planet's velocity exactly","It is at rest relative to the Sun","It is at the Lagrange point"],0,
 R`The SOI is tiny on heliocentric scales, so the position is the planet's. The velocity is \(\vec v_p + \vec v_\infty\).`,"Interplanetary s.8");

/* ===== Missions ===== */
mc("mis","fact",1,R`Which mission is known for the "Grand Tour" gravity assists and reaching the farthest distance from Earth?`,
 ["Voyager","Galileo","Cassini","Parker Solar Probe"],0,
 R`Voyager used a rare outer-planet alignment (about every 175 years), identified by Gary Flandro as a JPL summer intern in 1964.`,"Midterm Review s.36; Missions s.3");
mc("mis","fact",1,R`Which mission went to Jupiter using an Earth assist and suffered a high-gain antenna failure?`,
 ["Galileo","Voyager 2","Juno","Cassini"],0,
 R`The HGA failed to deploy, and data rate fell from a planned 134.4 kbps to ≈ 10–20 bps. Lesson: mechanisms are vital, often single-point failures, and hard to test in 1 g (cold welding, contamination).`,"Midterm Review s.36; Missions s.6–7");
mc("mis","fact",1,R`What attitude control features does the course highlight for Hubble?`,
 ["3-axis stabilized with reaction wheels, magnetic torquers to desaturate the wheels, and 3 gyros","Spin-stabilized with a yo-yo despin","Gravity-gradient boom","Cold gas thrusters only"],0,
 R`Hubble can point 90° in under 18 minutes. Midterm keywords: Earth orbit, magnetic torquing.`,"Midterm Review s.36; Missions s.5");
mc("mis","fact",1,R`Where is the James Webb Space Telescope?`,
 ["Sun–Earth L2","Low Earth orbit","GEO","Earth–Moon L1"],0,
 R`JWST orbits about Sun–Earth L2, about 1.5 million km from Earth.`,"Midterm Review s.36");
mc("mis","fact",1,R`What did DART do?`,
 ["Impacted Dimorphos, the moon of asteroid Didymos, to test changing its orbit. Near Earth, with critical targeting and observation","Returned samples from Phobos","Flew through the solar corona","Orbited Saturn"],0,
 R`DART used an ion drive and a high-res camera for targeting, plus the LICIACube CubeSat to image the impact. Hubble observed the debris tail 12 days later.`,"Midterm Review s.36; Missions s.13–15");
mc("mis","fact",1,R`How does Parker Solar Probe reach such a close perihelion?`,
 ["Multiple (7) Venus gravity assists to shed heliocentric energy, passing through the Sun's corona","A single Jupiter flyby","Solar sail","A direct Hohmann transfer"],0,
 R`Launched 2018 with max launch C3 154 km²/s². 24 orbits, final perihelion ≈ 9.86 R☉, period 88 days. Mission extended to 2029.`,"Midterm Review s.36; Missions s.18");
mc("mis","fact",1,R`What is distinctive about JAXA's Martian Moons eXploration (MMX)?`,
 ["It launches straight onto a hyperbolic escape and is a Phobos sample-return mission","It is a Mars rover","It orbits Deimos only, with no return","It uses a Venus flyby"],0,
 R`It aims to return ≈ 10 g from Phobos to study the moons' origin. Launch 2026, Earth return targeted for 2031.`,"Midterm Review s.36; Missions s.20–22");
mc("mis","fact",1,R`Cassini's trajectory is known for which gravity assists?`,
 ["VVEJGA (Venus–Venus–Earth–Jupiter), then repeated Titan flybys to shape orbits at Saturn","A single Jupiter flyby","Mars and Venus","No assists: direct transfer"],0,
 R`A single Titan flyby can give more than 800 m/s of Δv. Cassini made 294 orbits and 162 targeted flybys, then dove into Saturn in the 2017 Grand Finale.`,"Midterm Review s.36; Missions s.27–43");
mc("mis","concept",0,R`Why was Cassini deliberately sent into Saturn at the end of the mission?`,
 ["To avoid contaminating moons such as Enceladus and Titan that may have life or its precursors","To measure the impact crater","Because it ran out of power","To test aerocapture"],0,
 R`A final Titan flyby set up the collision course, and 22 proximal orbits lowered periapsis until the plunge on 2017-09-15.`,"Missions s.40");
mc("mis","fact",0,R`Which are given as examples of EP missions?`,
 ["DAWN, ARM, Starlink, the Lunar Gateway PPE, and a future Mars mission","Voyager and Cassini","Hubble and JWST","Viking 1 and 2"],0,
 R`From the EP missions slides.`,"Missions s.9–16");
mc("mis","fact",0,R`How much propellant did Cassini carry at launch?`,
 ["≈ 3132 kg (3000 kg biprop, 132 kg monoprop)","≈ 300 kg","≈ 30,000 kg","≈ 1,000 kg xenon"],0,
 R`Dry mass 2113 kg (Cassini) plus 320 kg (Huygens), with an 879 W RTG. It made a 450 m/s plane change in 1998.`,"Missions s.29");


/* ---------- Harder answer choices (v2): correct answer first, distractors matched in form ---------- */
const CH = {
"env-1":["Micrometeoroid and debris impacts","Solar radiation pressure","Gravity gradient","Magnetic field interaction"],
"env-2":["Solar radiation torque","Gravity-gradient torque","Magnetic torque","Aerodynamic torque"],
"env-3":["Aerodynamic torque","Gravity-gradient torque","Magnetic torque","Solar radiation torque"],
"env-4":["Trapped Van Allen belt radiation","Solar particle radiation","Atmospheric drag","Atomic oxygen erosion"],
"env-5":["Solar radiation","Trapped Van Allen belt radiation","Galactic cosmic rays","Atmospheric drag"],
"env-6":["100 km","80 km","120 km","160 km"],
"env-7":[R`\(\approx 1358\ \mathrm{W/m^2}\)`,R`\(\approx 1000\ \mathrm{W/m^2}\)`,R`\(\approx 1580\ \mathrm{W/m^2}\)`,R`\(\approx 4.5\times10^{-6}\ \mathrm{W/m^2}\)`],
"env-8":[R`\(q = 1\), so \(F_s = 2P_sA_\perp\)`,R`\(q = 1\), so \(F_s = P_sA_\perp\)`,R`\(q = 0\), so \(F_s = 2P_sA_\perp\)`,R`\(q = -1\), so \(F_s = 2P_sA_\perp\)`],
"env-9":["≈ 43% of the 1 AU value","≈ 66% of the 1 AU value","≈ 81% of the 1 AU value","≈ 28% of the 1 AU value"],
"env-10":[R`Constant temperature in the layer, so \(H = kT/(Mg)\) is constant`,R`Constant pressure in the layer, so density scales as \(1/T\)`,R`Gravity falling off as \(1/r^2\), so density decays with altitude`,R`Constant mean free path, so collisions set the decay rate`],
"env-11":[R`\(H = \dfrac{kT}{Mg}\)`,R`\(H = \dfrac{Mg}{kT}\)`,R`\(H = \dfrac{kT}{M}\)`,R`\(H = \dfrac{2kT}{Mg}\)`],
"env-12":[R`\(\beta = 200\ \mathrm{kg/m^2}\): drag deceleration scales as \(1/\beta\)`,R`\(\beta = 20\ \mathrm{kg/m^2}\): a lower \(\beta\) means a smaller drag force`,R`\(\beta = 200\ \mathrm{kg/m^2}\): a higher \(\beta\) means a lower \(C_D\)`,"Neither: at equal altitude, lifetime depends only on solar activity"],
"env-13":["≈ 500 km","≈ 300 km","≈ 700 km","≈ 1000 km"],
"env-14":["The thermosphere heats and expands, raising density and drag at a given altitude","The thermosphere heats and contracts, lowering density and drag at a given altitude","Density is unchanged, but solar wind pressure adds a drag-like force","Density is unchanged, but ionization raises the drag coefficient"],
"env-15":["300; 600","200; 400","400; 800","500; 1000"],
"env-16":["Drag acting at the center of pressure, offset from the center of mass","Drag acting at the center of mass, offset from the geometric center","Different drag coefficients on the ram and wake faces, even with c_p = c_g","Co-rotating atmosphere pushing sideways on the spacecraft"],
"env-17":[R`Velocity relative to the rotating atmosphere, \(\dot{\vec r} - \vec\omega_\oplus\times\vec r\)`,R`Inertial (ECI) velocity \(\dot{\vec r}\), since drag acts in the inertial frame`,R`Ground-relative velocity of the sub-satellite point`,R`Circular orbital speed \(\sqrt{\mu/r}\) at that altitude`],
"env-18":["Energetic electrons, ≈ 0.1–10 MeV","Energetic protons, ≈ 10–100 MeV","Energetic protons, above 100 MeV","Heavy ions, ≈ 1–10 GeV"],
"env-19":["Energetic solar-wind particles trapped by Earth's magnetic field","Upper-atmosphere gas ionized by solar UV and held by gravity","Galactic cosmic rays reflected inward by the magnetopause","Auroral particles accelerated upward along polar field lines"],
"env-20":["F2 (≈ 200–400 km)","F1 (≈ 140–200 km)","E (≈ 95–140 km)","D (≈ 70–90 km)"],
"env-21":["Atomic oxygen erosion, radio signal effects, and surface charging","Trapped protons above 100 MeV, single-event upsets, and total dose","Gravity-gradient torques, J₂ drift, and orbit decay","Micrometeoroid craters, debris strikes, and spallation"],
"env-22":["An insulator or an isolated conductor","A grounded conductor","A semiconductor bonded to structure","A poor dielectric connected to ground"],
"env-23":["Van Allen belts, the Sun (wind and flares), galactic cosmic rays","Van Allen belts, the ionosphere, galactic cosmic rays","Van Allen belts, the Sun (wind and flares), Earth's albedo","The Sun (wind and flares), the ionosphere, galactic cosmic rays"],
"env-24":["Solar radio flux at 10.7 cm, used as a proxy for solar activity","Solar EUV flux at 10.7 nm, which directly heats the thermosphere","A geomagnetic index of auroral activity, sampled every 10.7 hours","Thermosphere density at 107 km, used to scale drag models"],
"env-25":["Meteorite","Meteor","Meteoroid","Bolide"],
"env-26":["Spaced multi-layer bumpers (a stuffed Whipple shield)","A thick monolithic aluminum wall around each module","Multi-layer insulation blankets alone","Water and polyethylene layers, as used for radiation"],
"orb-27":[R`Hyperbolic: \(e > 1\), \(a < 0\)`,R`Hyperbolic: \(e > 1\), \(a > 0\)`,R`Parabolic: \(e = 1\), \(a \to \infty\)`,R`Elliptical: \(0 < e < 1\), \(a < 0\)`],
"orb-28":[R`\(|PE| = |KE|\), \(\varepsilon = 0\)`,R`\(|PE| = 2|KE|\), \(\varepsilon < 0\)`,R`\(|PE| < |KE|\), \(\varepsilon > 0\)`,R`\(|PE| > |KE|\), \(\varepsilon < 0\)`],
"orb-29":[R`\(\varepsilon = \tfrac{v^2}{2} - \tfrac{\mu}{r}\) and \(\varepsilon = -\tfrac{\mu}{2a}\)`,R`\(\varepsilon = \tfrac{v^2}{2} - \tfrac{\mu}{r}\) and \(\varepsilon = -\tfrac{\mu}{a}\)`,R`\(\varepsilon = \tfrac{v^2}{2} + \tfrac{\mu}{r}\) and \(\varepsilon = -\tfrac{\mu}{2a}\)`,R`\(\varepsilon = \tfrac{v^2}{2} - \tfrac{\mu}{2r}\) and \(\varepsilon = -\tfrac{\mu}{2a}\)`],
"orb-30":[R`\(a = (r_p+r_a)/2\), then vis-viva at \(r = r_p\)`,R`\(a = (r_p+r_a)/2\), then vis-viva at \(r = a\)`,R`\(a = r_a - r_p\), then vis-viva at \(r = r_p\)`,R`\(v = \sqrt{\mu/r_p}\), since velocity is horizontal there`],
"orb-31":[R`\(a \to \infty\), so \(\varepsilon = 0\)`,R`\(a = r\), so \(\varepsilon = -\mu/2r\)`,R`\(a = 2r\), so \(\varepsilon = -\mu/4r\)`,R`\(r \to \infty\), so \(\varepsilon = -\mu/2a\)`],
"orb-32":[R`\(v_{esc} = \sqrt{2}\,v_c\)`,R`\(v_{esc} = 2\,v_c\)`,R`\(v_{esc} = \sqrt{3}\,v_c\)`,R`\(v_{esc} = 1.5\,v_c\)`],
"orb-33":[R`Only \(a\)`,R`\(a\) and \(e\)`,R`Only \(r_p\)`,R`\(a\) and \(i\)`],
"orb-34":["r = 6771 km","r = 400 km","r = 6371 km","r = 5971 km"],
"orb-35":["The orbit is circular or elliptical","M ≫ m, so the satellite is a point mass","Both bodies are spherically symmetric","Gravity is the only force acting"],
"orb-36":[R`\(\vec H = \vec r\times\vec v\) is constant, fixing the plane's normal`,R`Specific energy \(\varepsilon\) is constant, fixing the plane's normal`,R`The eccentricity vector is fixed, so motion can't leave its plane`,R`Equal areas in equal times can only be swept in one plane`],
"orb-37":["Flight path angle from the local horizontal; zero at periapsis and apoapsis","Flight path angle from the radius vector; zero at periapsis and apoapsis","Flight path angle from the local horizontal; zero only at periapsis","True anomaly; zero at periapsis"],
"orb-38":[R`Semi-latus rectum: \(p = H^2/\mu = a(1-e^2)\)`,R`Periapsis radius: \(p = H^2/\mu = a(1-e)\)`,R`Semi-minor axis: \(p = a\sqrt{1-e^2}\)`,R`Semi-latus rectum: \(p = H/\mu = a(1+e)\)`],
"orb-39":[R`\(e = \dfrac{r_a - r_p}{r_a + r_p}\)`,R`\(e = \dfrac{r_a - r_p}{a}\)`,R`\(e = 1 - \dfrac{r_p}{r_a}\)`,R`\(e = \dfrac{r_a + r_p}{2r_a}\)`],
"orb-40":["Angular momentum is constant, so a smaller r requires a larger v","Specific energy is constant, so a smaller r requires a smaller |PE|","Gravity is strongest there, so the satellite has just been accelerated most","Areal velocity is constant, so a smaller r requires a smaller v"],
"orb-41":["Elliptical, with this point as perigee","Elliptical, with this point as apogee","Hyperbolic, since 10.4 km/s exceeds circular speed by over 30%","Circular, since the velocity is perpendicular to the radius"],
"orb-42":[R`\(398{,}600\ \mathrm{km^3/s^2}\)`,R`\(398{,}600\ \mathrm{m^3/s^2}\)`,R`\(3.986\times10^{14}\ \mathrm{km^3/s^2}\)`,R`\(1.327\times10^{11}\ \mathrm{km^3/s^2}\)`],
"orb-43":[R`\(P^2 \propto a^3\)`,R`\(P^3 \propto a^2\)`,R`\(P \propto a^3\)`,R`\(P^2 \propto r_p^3\)`],
"orb-44":["Same energy and same period, different angular momentum","Same energy and same angular momentum, different period","Same period and same angular momentum, different energy","Same energy, but the eccentric orbit has the longer period"],
"man-45":[R`\(\Delta v_1 = \sqrt{\mu\left(\tfrac{2}{r_1}-\tfrac{1}{a_{tr}}\right)} - \sqrt{\tfrac{\mu}{r_1}}\)`,R`\(\Delta v_1 = \sqrt{\mu\left(\tfrac{2}{r_1}-\tfrac{1}{r_2}\right)} - \sqrt{\tfrac{\mu}{r_1}}\)`,R`\(\Delta v_1 = \sqrt{\mu\left(\tfrac{2}{r_2}-\tfrac{1}{a_{tr}}\right)} - \sqrt{\tfrac{\mu}{r_1}}\)`,R`\(\Delta v_1 = \sqrt{\tfrac{\mu}{r_2}} - \sqrt{\tfrac{\mu}{r_1}}\)`],
"man-46":["Separate burns let you combine, split or re-assign them (e.g., add a plane change)","The lumped form is only exact when r₂/r₁ < 11.94, where Hohmann is optimal","The lumped form double-counts the perigee speed of the transfer ellipse","The lumped form ignores that burn 2 happens at a lower orbital speed"],
"man-47":[R`\(\pi\sqrt{a_{tr}^3/\mu}\)`,R`\(2\pi\sqrt{a_{tr}^3/\mu}\)`,R`\(\pi\sqrt{r_2^3/\mu}\)`,R`\(\tfrac{\pi}{2}\sqrt{a_{tr}^3/\mu}\)`],
"man-48":["Low-thrust spiral between circular orbits, with an optional plane change","Two-impulse transfer between circular orbits, with a plane change","Low-thrust spiral between elliptical orbits of any eccentricity","Single-impulse plane change at the ascending node"],
"man-49":[R`\(|v_{c1} - v_{c2}|\)`,R`\(\tfrac{\pi}{2}|v_{c1} - v_{c2}|\)`,R`\(\sqrt{v_{c1}^2 + v_{c2}^2}\)`,"The Hohmann total Δv"],
"man-50":["Radians","Degrees","Either: the π/2 converts degrees","Fractions of a full revolution"],
"man-51":["Much higher Isp means far less propellant despite the larger Δv","Spirals avoid gravity losses, so the real propellant cost is lower","Spirals arrive sooner because the thrust never stops","Spiral Δv drops below Hohmann once the Oberth effect is included"],
"man-52":[R`\(2v\sin(\Delta\alpha/2)\)`,R`\(v\,\Delta\alpha\)`,R`\(2v\sin\Delta\alpha\)`,R`\(2v\cos(\Delta\alpha/2)\)`],
"man-53":["Where speed is lowest, such as apogee","Where speed is highest, such as perigee (Oberth effect)","At the ascending node of the lowest orbit","Anywhere: the cost depends only on Δα"],
"man-54":["≈ 130 m/s for 1° vs ≈ 50 m/s for +100 km","≈ 50 m/s for 1° vs ≈ 130 m/s for +100 km","≈ 130 m/s for 1° vs ≈ 130 m/s for +100 km","≈ 13 m/s for 1° vs ≈ 50 m/s for +100 km"],
"man-55":["When both i and Ω change, to get the true angle between the planes","When only i changes, to convert Δi into the burn angle","When ω changes, to rotate the line of apsides","When the orbit is elliptical, to correct for flight path angle"],
"man-56":["One vector Δv is shorter than the sum of two separate burns","Burning at apogee adds the Oberth effect to the plane change","Circularizing first raises the speed, making the plane change cheaper","A combined burn avoids the gravity loss of a second burn"],
"man-57":[R`\(\mathrm{TOF} = c\,m_p/F\)`,R`\(\mathrm{TOF} = m_p/(cF)\)`,R`\(\mathrm{TOF} = F\,m_p/c\)`,R`\(\mathrm{TOF} = \tfrac12 P_{tr}\)`],
"man-58":["≈ 5 hours vs ≈ 200 days","≈ 5 hours vs ≈ 20 days","≈ 2 days vs ≈ 200 days","≈ 12 hours vs ≈ 2 years"],
"cov-59":[R`RAAN, \(\Omega\)`,R`Argument of periapsis, \(\omega\)`,R`Inclination, \(i\)`,R`True anomaly, \(\theta\)`],
"cov-60":[R`\(a, e, \theta\)`,R`\(a, e, \omega\)`,R`\(i, \Omega, \omega\)`,R`\(a, i, \theta\)`],
"cov-61":["LEO ≈ 200–1200 km; MEO ≈ 1200–35,790 km; GEO ≈ 35,790 km","LEO ≈ 200–1200 km; MEO ≈ 1200–20,200 km; GEO ≈ 42,164 km","LEO ≈ 100–1000 km; MEO ≈ 1000–20,200 km; GEO ≈ 35,790 km","LEO ≈ 200–2000 km; MEO ≈ 2000–35,790 km; GEO ≈ 42,164 km"],
"cov-62":["≈ 1.5–2 hr, ≈ 12 hr, ≈ 24 hr","≈ 1.5–2 hr, ≈ 6 hr, ≈ 24 hr","≈ 3–4 hr, ≈ 12 hr, ≈ 24 hr","≈ 1.5–2 hr, ≈ 18 hr, ≈ 48 hr"],
"cov-63":["24 satellites, 6 planes × 4, ≈ 20,200 km, 55°","24 satellites, 3 planes × 8, ≈ 20,200 km, 55°","24 satellites, 6 planes × 4, ≈ 35,786 km, 55°","30 satellites, 3 planes × 10, ≈ 23,200 km, 56°"],
"cov-64":["66 at ≈ 780 km","77 at ≈ 780 km","66 at ≈ 1200 km","48 at ≈ 1400 km"],
"cov-65":["Same 1-sidereal-day period; GEO also has i = 0 and e = 0","Same altitude; GSO also has i = 0 and e = 0","Same period; GSO is the one with i = 0 and e = 0","GEO has a 24 h solar-day period; GSO a 23 h 56 m sidereal one"],
"cov-66":["Minimum elevation angle above the ground station's horizon","Nadir angle from the satellite to the target","Half-angle of the sensor's field of view","Earth central angle out to the target"],
"cov-67":["Fraction of Earth's surface instantaneously in view","Fraction of each orbit spent over the target","Fraction of each orbit spent in Earth's shadow","Fraction of the sensor's field of view filled by Earth"],
"cov-68":["Coverage shrinks (smaller λ and F)","Coverage grows (larger λ and F)","λ shrinks but F grows","No change: λ depends only on altitude"],
"cov-69":[R`It needs \(\dot\Omega = +0.9856°/\text{day}\), which requires \(\cos i < 0\)`,R`It needs \(\dot\Omega = -0.9856°/\text{day}\), which requires \(\cos i < 0\)`,R`It needs \(\dot\Omega = 0\), which only happens near \(i = 90°\)`,R`It needs \(\dot\omega = 0\), which happens at \(i = 116.6°\)`],
"cov-70":["+0.9856°/day (eastward)","−0.9856°/day (westward)","+360°/day (one revolution per day)","0°/day (fixed plane)"],
"cov-71":["63.4° and 116.6°","54.7° and 125.3°","45° and 135°","28.5° and 151.5°"],
"cov-72":["Earth's equatorial bulge (oblateness)","The Moon's tidal pull on the satellite","Distortion of Earth's magnetic field by the solar wind","Non-uniform density in the upper atmosphere"],
"cov-73":["Zero, because cos 90° = 0","Maximum westward","Maximum eastward","Equal to the sun-synchronous rate"],
"cov-74":["Non-spherical Earth, drag, third-body gravity, solar radiation pressure","Non-spherical Earth, drag, third-body gravity, relativistic time dilation","Drag, third-body gravity, solar radiation pressure, Earth's magnetic field","Non-spherical Earth, drag, Coriolis force, solar radiation pressure"],
"cov-75":["Celestial coordinates","Earth-fixed coordinates","Roll-pitch-yaw (orbit-referenced) coordinates","Launch-site topocentric coordinates"],
"cov-76":["Mean 6371; equatorial 6378; polar 6356 km","Mean 6378; equatorial 6371; polar 6356 km","Mean 6371; equatorial 6378; polar 6336 km","Mean 6371; equatorial 6400; polar 6356 km"],
"cov-77":["Park: temporary orbit (often LEO) for checkout or waiting. Transfer: intermediate orbit such as GTO","Park: intermediate orbit such as GTO. Transfer: temporary LEO for checkout","Park: the final operational slot. Transfer: the launch ascent trajectory","Park: a graveyard disposal orbit. Transfer: a phasing orbit"],
"rkt-78":[R`\(P_e = P_\infty\) (perfect expansion)`,R`\(P_\infty = 0\) (vacuum)`,R`\(P_e = 0\) (full expansion to vacuum)`,R`\(A_e = A_t\) (no divergent section)`],
"rkt-79":["Isp is defined per Earth weight of propellant, so g₀ is a fixed constant","Engines are tested on Earth, so Isp already includes Earth's gravity loss","Isp should use local g; g₀ is just a convenient approximation","g₀ cancels in the rocket equation, so any g gives the same Δv"],
"rkt-80":["Impulse per unit weight of propellant","Impulse per unit mass of the vehicle","Thrust per unit weight of the vehicle","Total impulse over a full-duration burn"],
"rkt-81":["Chem 50–450 s; electrothermal 300–1200 s; electrostatic/EM 1500–4000 s","Chem 50–450 s; electrothermal 1500–4000 s; electrostatic/EM 300–1200 s","Chem 200–600 s; electrothermal 300–1200 s; electrostatic/EM 1500–4000 s","Chem 50–450 s; electrothermal 450–800 s; electrostatic/EM 4000–10,000 s"],
"rkt-82":["No gravity or drag during the burn, and constant c","No gravity or drag, and constant thrust-to-mass ratio","Constant thrust and constant propellant flow rate","Constant c, and the burn happens at periapsis"],
"rkt-83":[R`\(m_p = m_f\left(e^{\Delta V/c}-1\right)\)`,R`\(m_p = m_f\,e^{\Delta V/c}\)`,R`\(m_p = m_f\left(1-e^{-\Delta V/c}\right)\)`,R`\(m_p = m_0\left(1-e^{-\Delta V/c}\right)\)`],
"rkt-84":["Raise tank pressure to raise the mass flow rate","Increase Isp with a higher-performance propellant","Use staging to drop inert mass along the way","Use a flyby to lower the ΔV requirement"],
"rkt-85":[R`Payload plus inert mass, \(m_{pay}+m_i\)`,R`Payload only, \(m_{pay}\)`,R`Inert mass only, \(m_i\)`,R`Payload plus propellant, \(m_{pay}+m_p\)`],
"rkt-86":[R`Diminishing returns: \(m_p/m_f\) is already small, while power needs grow`,R`\(m_p/m_f\) keeps falling exponentially, so Isp should be maximized`,R`\(m_p/m_f\) starts rising again because thrust drops`,"The rocket equation stops applying above ≈ 4500 s"],
"rkt-87":["Cold gas 0.69, monoprop 2.26, solid 2.94, biprop 3.92 km/s","Cold gas 0.69, monoprop 2.94, solid 2.26, biprop 3.92 km/s","Cold gas 2.26, monoprop 0.69, solid 2.94, biprop 3.92 km/s","Cold gas 0.69, monoprop 2.26, solid 3.92, biprop 2.94 km/s"],
"rkt-88":["Stage 2's full initial mass: its propellant, its inert mass, and the payload","Stage 2's propellant and inert mass, without the payload","Stage 2's inert mass and the payload, without its propellant","Stage 1's burnout mass minus the payload"],
"rkt-89":["No: dry mass and stage Isp are unchanged","Yes: the thrust changed, so the ΔV segment restarts","Yes: Isp drops when the engines throttle down","Only for solid boosters, whose thrust profile changes"],
"rkt-90":["Yes: the stage Isp changes to the core-only value","No: dry mass hasn't changed until separation","No: only separation events count as staging","Yes: thrust drops, which changes the mass ratio"],
"rkt-91":[R`Flow-weighted: \(\sum \dot m I_{sp}/\sum\dot m \approx 289\) s`,R`Thrust-weighted: \(\sum F I_{sp}/\sum F \approx 317\) s`,R`Engine average: \((250+250+500)/3 \approx 333\) s`,R`Type average: \((250+500)/2 = 375\) s`],
"rkt-92":["Later burns no longer carry the empty tanks and engines","Each stage's engine runs at a higher chamber pressure","Upper stages benefit from weaker gravity at altitude","Separation adds momentum to the remaining vehicle"],
"rkt-93":["≈ 90%","≈ 75%","≈ 60%","≈ 98%"],
"rkt-94":["Parallel: boosters burn alongside the core. Serial: stages fire one after another","Parallel: stages fire one after another. Serial: boosters burn alongside the core","Parallel: two stages share one engine. Serial: each has its own engine","Parallel: payloads ride side by side. Serial: payloads are stacked"],
"rkt-95":[R`\(I = F_T t\), in N·s`,R`\(I = F_T t\), in N/s`,R`\(I = F_T/t\), in N/s`,R`\(I = \dot m c\), in N`],
"rkt-96":["LEO ≥ 9.5 km/s; GEO from a 30° parking orbit ≈ 4.2 km/s","LEO ≈ 7.8 km/s; GEO from a 30° parking orbit ≈ 4.2 km/s","LEO ≥ 9.5 km/s; GEO from a 30° parking orbit ≈ 2.5 km/s","LEO ≈ 11.2 km/s; GEO from a 30° parking orbit ≈ 3.4 km/s"],
"chem-97":[R`Raise \(T_c\) and lower \(\bar M\)`,R`Raise \(T_c\) and raise \(\bar M\)`,R`Lower \(T_c\) and lower \(\bar M\)`,R`Raise \(P_c\) and lower \(\gamma\)`],
"chem-98":["Combustion chamber performance, independent of the nozzle","Nozzle performance, independent of the chamber","Overall engine performance, combining chamber and nozzle","Exhaust velocity at the nozzle exit plane"],
"chem-99":[R`\(c\) rises 3%`,R`\(c\) rises ≈ 1.5% (as \(\sqrt{1.03}\))`,R`\(c\) is unchanged, since \(c^*\) is unchanged`,R`\(c\) rises 3%, and \(m_p\) falls by 3%`],
"chem-100":["Mach 1 at the throat","Mach 1 at the nozzle exit","Subsonic flow throughout the nozzle","Perfect expansion at the exit"],
"chem-101":["Cold gas, liquid (mono/biprop), solid, hybrid","Cold gas, liquid (mono/biprop), solid, resistojet","Liquid (mono/biprop), solid, hybrid, nuclear thermal","Cold gas, liquid (mono/biprop), solid, arcjet"],
"chem-102":["Simple, but low Isp","High Isp, but complex plumbing","High thrust, but toxic exhaust","Throttleable, but not storable"],
"chem-103":["Higher Isp and throttle/restart, but complex plumbing and storage limits","Lower Isp, but simpler with fewer leak paths","Higher density and storability, but no restart","Higher Isp and denser propellant, but no throttling"],
"chem-104":["Simple, dense and storable for long periods","Throttleable and restartable on command","Highest Isp of the chemical options","Clean, non-toxic exhaust products"],
"chem-105":[R`Chamber pressure: \(r = aP_c^n\), \(n \approx 0.3\)–\(0.8\)`,R`Ambient pressure: \(r = aP_\infty^n\), \(n \approx 0.3\)–\(0.8\)`,R`Chamber pressure: \(r = aP_c^n\), \(n \approx 1.2\)–\(2\)`,R`Throat area: \(r = aA_t^n\), \(n \approx 0.3\)–\(0.8\)`],
"chem-106":["Solid fuel with a liquid oxidizer","Liquid fuel with a solid oxidizer","Solid first stage with a liquid upper stage","Monopropellant with a cold-gas pressurant"],
"chem-107":[R`\(\sigma = \dfrac{Pr}{2t}\)`,R`\(\sigma = \dfrac{Pr}{t}\)`,R`\(\sigma = \dfrac{Pr}{4t}\)`,R`\(\sigma = \dfrac{2Pr}{t}\)`],
"chem-108":["Hydrazine (N₂H₄)","Monomethylhydrazine (MMH)","Nitrogen tetroxide (N₂O₄)","Kerosene (RP-1)"],
"ep-109":[R`Energy: the ion's potential energy \(eV_B\) becomes \(\tfrac12mv^2\)`,R`Momentum: \(mv\) equals \(eV_B\) times the transit time`,R`Lorentz force: \(q(\vec v\times\vec B)\) accelerates the ion`,R`Thermal: the ion temperature \(eV_B/k\) sets \(v\)`],
"ep-110":[R`\(F_T \propto \sqrt{V_B}\)`,R`\(F_T \propto V_B\)`,R`\(F_T \propto V_B^2\)`,R`\(F_T \propto 1/\sqrt{V_B}\)`],
"ep-111":[R`\(\dot m_i/\dot m_p\)`,R`\(\dot m_p/\dot m_i\)`,R`\(\dot m_{loss}/\dot m_p\)`,R`\(P_B/P_E\)`],
"ep-112":[R`\(J_B = \dfrac{q}{m}\dot m_p\eta_m\)`,R`\(J_B = \dfrac{q}{m}\dfrac{\dot m_p}{\eta_m}\)`,R`\(J_B = \dfrac{m}{q}\dot m_p\eta_m\)`,R`\(J_B = q\,\dot m_p\eta_m\)`],
"ep-113":["Fraction of electrical input power that goes into the beam","Fraction of beam power that becomes jet kinetic power","Fraction of propellant flow that leaves as ions","Fraction of input power that becomes jet power, ½ṁc²"],
"ep-114":[R`\(\eta_T = \dfrac{\tfrac12\dot m_pc^2}{P_E}\)`,R`\(\eta_T = \dfrac{\dot m_pc^2}{P_E}\)`,R`\(\eta_T = \dfrac{J_BV_B}{P_E}\)`,R`\(\eta_T = \dfrac{\dot m_i}{\dot m_p}\)`],
"ep-115":["The available electric power, which caps thrust","The propellant's chemical energy, which caps exhaust speed","The ion mass, which caps exhaust speed","Grid erosion, which caps total impulse"],
"ep-116":["Higher inert mass for the power system","Lower Isp than chemical systems","Higher disturbance forces on the spacecraft","Lower pointing precision during burns"],
"ep-117":["Magnetic confinement and electromagnetic propulsion","Electrostatic ion acceleration in gridded thrusters","Ionizing the neutral propellant","Neutralizing the ion beam"],
"ep-118":[R`It rises by \(\sqrt{131.3/83.8}\approx 1.25\)`,R`It falls by \(\sqrt{131.3/83.8}\approx 1.25\)`,R`It rises by \(131.3/83.8 \approx 1.57\)`,"It stays the same, since V_B is the same"],
"ep-119":["Magnetized electrons sustain the Hall current and E-field; ions exit nearly unaffected","Magnetized ions spiral longer and gain more energy before exiting","Unmagnetized electrons reach the anode quickly, raising efficiency","Both species are magnetized, keeping the plume collimated"],
"ep-120":["v₊ ≈ 38.3 km/s, Isp ≈ 3900 s","v₊ ≈ 27.1 km/s, Isp ≈ 2760 s","v₊ ≈ 54.2 km/s, Isp ≈ 5520 s","v₊ ≈ 38.3 km/s, Isp ≈ 3830 s"],
"ep-121":["First Hall-thruster EP used beyond geosynchronous orbit","First gridded ion engine used for primary propulsion","First EP spacecraft to orbit two different bodies","First solar-electric mission to rendezvous with an asteroid"],
"ep-122":["Electrostatic","Electrothermal","Electromagnetic","Pulsed plasma"],
"ep-123":["Krypton, then argon","Argon, then krypton","Krypton, then iodine","Iodine, then argon"],
"lau-124":[R`\(i = \delta\): the minimum inclination from that site`,R`\(i = \delta\): the maximum inclination from that site`,R`\(i = 90° - \delta\): the complement of the latitude`,R`\(i = 0\): an equatorial orbit from any latitude`],
"lau-125":["No: i ≥ 28.5°, so it needs a plane change in orbit","Yes, with an azimuth near 118° (southeast)","Yes, by launching due east","No: KSC can only reach polar orbits"],
"lau-126":[R`\(\omega_\oplus R_\oplus\cos\delta\sin A\); largest due east at the equator (≈ 0.46 km/s)`,R`\(\omega_\oplus R_\oplus\cos\delta\sin A\); largest due east at high latitude`,R`\(\omega_\oplus R_\oplus\sin\delta\sin A\); largest due east at the poles`,R`\(\omega_\oplus R_\oplus\cos\delta\cos A\); largest due north at the equator`],
"lau-127":[R`\(V_{orbit} = \Delta V_{prop} - \Delta V_g - \Delta V_D + \Delta V_{\omega\oplus}\)`,R`\(V_{orbit} = \Delta V_{prop} - \Delta V_g - \Delta V_D - \Delta V_{\omega\oplus}\)`,R`\(V_{orbit} = \Delta V_{prop} + \Delta V_g - \Delta V_D + \Delta V_{\omega\oplus}\)`,R`\(V_{orbit} = \Delta V_{prop} - \Delta V_g + \Delta V_D + \Delta V_{\omega\oplus}\)`],
"lau-128":["Climb steeply through the thick air, then pitch over to cut gravity losses","Pitch over early to cut drag, then climb steeply to cut gravity losses","Fly vertically the whole way to minimize the path length","Turn horizontal right away to maximize the Earth-rotation boost"],
"lau-129":["Gravity loss ≈ 1222 m/s","Steering loss ≈ 358 m/s","Drag loss ≈ 107 m/s","Earth rotation ≈ 395 m/s"],
"lau-130":["≈ 180 kg to LEO; ≈ 725 kg to GEO","≈ 45 kg to LEO; ≈ 180 kg to GEO","≈ 90 kg to LEO; ≈ 360 kg to GEO","≈ 725 kg to LEO; ≈ 1800 kg to GEO"],
"lau-131":["Range safety limits each site's azimuths, so neither covers all inclinations","Vandenberg's lower latitude gives it a bigger Earth-rotation boost","KSC can't reach orbits above about 1000 km within its azimuth range","Two sites keep launch cadence up when one has bad weather"],
"lau-132":["The launch time, which sets where the launch meridian is","The launch azimuth, which sets the heading at liftoff","The site latitude, which sets the minimum inclination","The burnout altitude and flight path angle"],
"lau-133":["Capability (ΔV, mass to LEO or C3), loads and frequencies, geometry and fairing","Capability (ΔV, mass to LEO or C3), cost, and launch schedule","Loads and frequencies, radiation environment, and fairing size","Capability (ΔV, mass to LEO or C3), thermal environment, range safety"],
"lau-134":["Keeping the spacecraft's fundamental frequencies above the launch vehicle's minimums","Keeping the spacecraft's fundamental frequencies below the launch vehicle's maximums","Sizing the separation springs for payload release","Estimating acoustic levels inside the fairing"],
"lau-135":["Just before each stage burns out","At liftoff, when thrust first exceeds weight","At Max Q, when the aerodynamic load peaks","Just after each staging event"],
"lau-136":["Maximum dynamic pressure","Maximum acceleration","Maximum aerodynamic heating","Maximum thrust"],
"lau-137":["F9 22,800 kg, $74M; FH 63,800 kg, $97M","F9 15,600 kg, $62M; FH 63,800 kg, $97M","F9 22,800 kg, $74M; FH 45,000 kg, $150M","F9 8,300 kg, $74M; FH 26,700 kg, $97M"],
"lau-138":["Protecting the payload through the atmosphere; jettisoned once above it","Protecting the payload until orbit insertion; then kept as a sunshield","Carrying upper-stage propellant around the payload","Damping launch vibration; it stays attached until separation"],
"ipl-139":["Hyperbola → ellipse → hyperbola","Ellipse → hyperbola → ellipse","Parabola → ellipse → parabola","Hyperbola → parabola → hyperbola"],
"ipl-140":[R`\(C_3 = v_\infty^2 = v_{bo}^2 - v_{esc}^2\)`,R`\(C_3 = v_\infty = v_{bo} - v_{esc}\)`,R`\(C_3 = v_\infty^2 = v_{bo}^2 + v_{esc}^2\)`,R`\(C_3 = v_\infty^2 = v_{bo}^2 - v_c^2\)`],
"ipl-141":["Relative to the planet; launch vehicles are rated by max C3 for a payload mass","Relative to the Sun; launch vehicles are rated by max C3 for a payload mass","Relative to the planet; it equals the Δv of the escape burn","Relative to the Sun; it is the heliocentric transfer energy"],
"ipl-142":[R`Vector sum: \(\vec v_\infty + \vec v_{planet}\)`,R`Scalar sum: \(|\vec v_\infty| + |\vec v_{planet}|\)`,R`Vector difference: \(\vec v_{planet} - \vec v_\infty\)`,R`Quadrature: \(\sqrt{v_\infty^2 + v_{planet}^2}\)`],
"ipl-143":[R`\(r_{SOI} \approx a\left(\dfrac{\mu_p}{\mu_s}\right)^{2/5}\)`,R`\(r_{SOI} \approx a\left(\dfrac{\mu_p}{\mu_s}\right)^{1/3}\)`,R`\(r_{SOI} \approx a\left(\dfrac{\mu_p}{\mu_s}\right)^{1/2}\)`,R`\(r_{SOI} \approx a\,\dfrac{\mu_p}{\mu_s}\)`],
"ipl-144":["The same Δv adds more energy when applied at higher speed","The same Δv adds more energy when applied at lower speed","A flyby adds energy without any propellant","A plane change is cheaper at higher speed"],
"ipl-145":[R`\(v_\infty = \Delta v\sqrt{\dfrac{2v_{esc}}{\Delta v}+1}\)`,R`\(v_\infty = \Delta v\sqrt{\dfrac{v_{esc}}{\Delta v}+1}\)`,R`\(v_\infty = \Delta v\sqrt{\dfrac{2v_{esc}}{\Delta v}-1}\)`,R`\(v_\infty = \sqrt{v_{esc}^2+\Delta v^2}\)`],
"ipl-146":[R`\(\phi = \pi - 2\pi\,t_{xfer}/T_2\)`,R`\(\phi = 2\pi\,t_{xfer}/T_2 - \pi\)`,R`\(\phi = \pi - 2\pi\,t_{xfer}/T_1\)`,R`\(\phi = 2\pi\,t_{xfer}/T_2\)`],
"ipl-147":["Every ≈ 780 days (the synodic period)","Every 687 days (Mars's orbital period)","Every ≈ 520 days (twice the Hohmann transfer time)","Every ≈ 1052 days (the sum of the two periods)"],
"ipl-148":["Transfer angle below vs above 180°","Transfer time below vs above 180 days","Departure C3 below vs above 15 km²/s²","Prograde vs retrograde heliocentric transfer"],
"ipl-149":["C3 and arrival v∞ contours vs departure and arrival dates","Δv contours vs launch azimuth and latitude","C3 contours vs payload mass and launch vehicle","Transfer-time contours vs C3 and arrival v∞"],
"ipl-150":["The span of departure dates where the required C3 ≤ 21 km²/s²","The span of departure dates where the required C3 ≥ 21 km²/s²","The span of arrival dates where arrival v∞ ≤ √21 km/s","The minimum-C3 date, plus or minus one synodic period"],
"ipl-151":["Planet-relative speed is unchanged and its direction turns; Sun-relative speed can change","Sun-relative speed is unchanged and its direction turns; planet-relative speed can change","Both speeds stay the same; only the direction changes","Planet-relative speed grows by up to twice the planet's speed"],
"ipl-152":["9.4 + 3.21 + 1.06 + 1.44 ≈ 15.1 km/s","9.4 + 3.21 + 2.94 + 1.44 ≈ 17.0 km/s","7.8 + 3.21 + 1.06 + 1.44 ≈ 13.5 km/s","9.4 + 1.44 + 1.06 + 3.21 ≈ 15.1 km/s, capture at Earth"],
"ipl-153":["Given two positions and the flight time, find the velocities","Given a position and velocity, find the position after a flight time","Given two velocities and the flight time, find the positions","Given C3 and arrival v∞, find the departure and arrival dates"],
"ipl-154":["No general closed-form solution; Lagrange points are special equilibrium solutions","Patched conics solve it exactly once SOIs are defined","A closed-form solution exists when one mass is negligible","There are three Lagrange points, all on the line through the two bodies"],
"ipl-155":["Entry: aeroshell. Descent: parachute and retrorockets. Landing: retrorockets or airbags","Entry: retrorockets. Descent: aeroshell. Landing: parachute and airbags","Entry: parachute. Descent: aeroshell and retrorockets. Landing: airbags","Entry: aeroshell. Descent: airbags. Landing: parachute and retrorockets"],
"ipl-156":["It departed later in the window, when the required C3 was higher","It was heavier because it carried extra science instruments","It departed earlier, before the minimum-C3 date","It targeted a higher-latitude landing site"],
"ipl-157":["About 1%","About 5%","About 10%","About 0.1%"],
"ipl-158":["The planet's position relative to the Sun, with velocity v_planet + v∞","The planet's position and the planet's velocity","Its own position one SOI radius out, with velocity v∞ only","The planet's velocity, with position one SOI radius ahead"],
"mis-159":["Voyager","Pioneer 10","New Horizons","Cassini"],
"mis-160":["Galileo","Juno","Cassini","Ulysses"],
"mis-161":["Reaction wheels, with magnetic torquers to desaturate them","Reaction wheels, with cold-gas thrusters to desaturate them","Control moment gyros, with magnetic torquers for slewing","Magnetic torquers, with reaction wheels as a backup"],
"mis-162":["Sun–Earth L2","Sun–Earth L1","Earth–Moon L2","Geostationary orbit"],
"mis-163":["Kinetic impact on Dimorphos to change its orbit around Didymos","Kinetic impact on Didymos to change its orbit around the Sun","Sample return from Dimorphos to study its composition","Gravity-tractor test that slowly nudged Dimorphos"],
"mis-164":["Repeated Venus gravity assists","A single Jupiter gravity assist","Repeated Earth gravity assists","A solar-electric spiral inward"],
"mis-165":["Direct launch to hyperbolic escape; Phobos sample return","Direct launch to hyperbolic escape; Deimos sample return","LEO parking orbit, then EP spiral; Phobos sample return","Direct launch to hyperbolic escape; Phobos lander, no return"],
"mis-166":["VVEJGA, then repeated Titan flybys","VEEGA, then repeated Titan flybys","VVEJGA, then repeated Enceladus flybys","EJGA, then repeated Titan flybys"],
"mis-167":["To avoid contaminating Enceladus and Titan (planetary protection)","To collect atmospheric data while the RTG still had power","Because no stable disposal orbit around Saturn existed","To keep its debris from damaging Saturn's rings"],
"mis-168":["DAWN, ARM, Starlink, Lunar Gateway PPE","DAWN, Cassini, Starlink, Lunar Gateway PPE","Voyager, ARM, Starlink, Lunar Gateway PPE","DAWN, Galileo, Starlink, JWST"],
"mis-169":["≈ 3132 kg (3000 kg biprop, 132 kg monoprop)","≈ 3132 kg (3000 kg monoprop, 132 kg biprop)","≈ 2113 kg (2000 kg biprop, 113 kg monoprop)","≈ 1566 kg (1500 kg biprop, 66 kg monoprop)"]
};
for (const q of MC) { const c = CH[q.id]; if (c) { q.ch = c; q.a = 0; } }
const QFIX = {
  "man-45": R`For a Hohmann transfer from circular \(r_1\) to circular \(r_2\), with \(a_{tr} = (r_1+r_2)/2\), which expression is the first burn?`
};
const EXFIX = {
  "rkt-83": R`From \(m_0/m_f = e^{\Delta V/c}\) and \(m_0 = m_f + m_p\). The \(m_0(1-e^{-\Delta V/c})\) form is also correct, but it needs \(m_0\), which you don't have here.`,
  "env-7": R`About 1358 W/m², ranging from 1321 to 1413 over the year. About 1000 W/m² is what reaches the ground on a clear day. \(4.5\times10^{-6}\) is the solar <i>pressure</i> in N/m² (\(I_s/c\)), not a flux.`,
  "man-45": R`Burn 1 is at perigee of the transfer ellipse, so use vis-viva at \(r_1\) with the transfer ellipse's \(a_{tr}\), then subtract the circular speed. Burn 2 at apogee: \(\Delta v_2 = |v_{c2} - v_a|\).`
};
for (const q of MC) { if (QFIX[q.id]) q.q = QFIX[q.id]; if (EXFIX[q.id]) q.ex = EXFIX[q.id]; }

/* ---------------- Flashcards (memorization) ---------------- */
const CARDS = [];
function card(t, mr, front, back) { CARDS.push({ id: "c-" + t + "-" + CARDS.length, t, mr: !!mr, front, back }); }
card("env",1,"Four external disturbance sources for AODCS","Solar (radiation pressure), gravity gradient, magnetic, aerodynamic");
card("env",1,"Dominant environment concern: LEO / MEO / GEO","LEO: atmosphere (drag, reactions), low radiation. MEO: Van Allen belt radiation. GEO: solar radiation");
card("env",1,"Solar flux at 1 AU",R`\(I_{s\oplus}\approx 1358\ \mathrm{W/m^2}\) (1321–1413)`);
card("env",1,"Solar pressure at 1 AU",R`\(P_s = I_s/c \approx 4.5\times10^{-6}\ \mathrm{N/m^2}\)`);
card("env",1,"Reflectivity q in F = PₛA⊥(1+q)",R`\(-1\) transparent, \(0\) black body, \(1\) mirror`);
card("env",0,"Kármán line","100 km (62 mi), commonly used as the boundary of space");
card("env",0,"HW 1 exponential-model constants",R`\(n_0 = 1.225\ \mathrm{kg/m^3}\), \(H = 8\) km`);
card("env",0,"Typical drag coefficient",R`\(C_D \approx 2.2\)`);
card("env",1,"Ballistic coefficient",R`\(\beta = m/(C_D A)\) [kg/m²]. Higher β means longer lifetime. Ranges from about 1 to hundreds of kg/m²`);
card("env",1,"Lifetime rule of thumb","Below ≈ 500 km, essentially everything re-enters by the next solar maximum");
card("env",0,"Drag significance by altitude","Significant to extreme at h ≤ 300 km; usually minor at h ≥ 600 km");
card("env",0,"Inner Van Allen belt","≈ 1.1–2.5 DU, peak ≈ 1.5 DU. Proton zone: protons > 100 MeV, plus electrons at hundreds of keV");
card("env",0,"Outer Van Allen belt","≈ 2–10 DU, peak ≈ 4–6 DU. Energetic electrons ≈ 0.1–10 MeV. Not at peak intensity at GEO");
card("env",0,"Ionosphere layers","D 70–90 km (weak). E 95–140 km (O₂⁺). F1 140–200 km (NO⁺, O⁺). F2 200–400 km (N⁺, O⁺, highest electron density). Plasmasphere > 1200 km (H⁺, He⁺)");
card("env",0,"Sources of energetic particle radiation","Trapped Van Allen belts, the Sun (solar wind and flares), galactic cosmic rays");
card("env",0,"F10.7","Solar radio flux at 10.7 cm, a proxy for solar activity. Drives thermosphere density (≈ 11-yr cycle, 27-day solar rotation spikes)");
card("env",0,"Meteoroid / meteor / meteorite","Meteoroid: debris in the solar system. Meteor: one entering the atmosphere. Meteorite: one that survives to impact");
card("env",0,"Radiation dose units","1 Gy = 100 rad. 1 Sv = 100 rem. For X-rays and gamma rays, 1 rad = 1 rem = 10 mSv. Sea level ≈ 0.3 rad/yr");
card("orb",1,"Orbit types table",R`Circle: \(\varepsilon<0\), \(e=0\). Ellipse: \(\varepsilon<0\), \(0<e<1\), \(a>0\). Parabola: \(\varepsilon=0\), \(e=1\). Hyperbola: \(\varepsilon>0\), \(e>1\), \(a<0\)`);
card("orb",0,"μ for Earth and Sun",R`\(\mu_\oplus = 398{,}600\ \mathrm{km^3/s^2}\); \(\mu_\odot = 1.327\times10^{11}\ \mathrm{km^3/s^2}\)`);
card("orb",0,"Kepler's three laws","1) Ellipse with the Sun at a focus. 2) Equal areas in equal times. 3) P² ∝ a³");
card("orb",1,"Course example ellipse",R`\(r_p = 8000\), \(r_a = 100{,}000\) km gives \(a = 54{,}000\) km, \(v_p = 9.6\), \(v_a = 0.77\) km/s`);
card("man",1,"Course example Hohmann 8000 → 100,000 km",R`\(\Delta v_1 \approx 2.6\), \(\Delta v_2 \approx 1.2\), total ≈ 3.775 km/s. TOF ≈ 17.3 hr (P ≈ 36.4 hr)`);
card("man",1,"Same transfer by low-thrust spiral",R`\(\Delta v = |v_{c1}-v_{c2}| \approx 7 - 2 = 5\) km/s; TOF days to months`);
card("man",1,"Plane change at 7 km/s, 30°",R`\(\Delta v = 2v\sin 15° \approx 3.6\) km/s. Plane change is expensive`);
card("man",0,"Cost of 1° plane change in LEO","≈ 130 m/s (vs ≈ 50 m/s to raise the orbit 100 km)");
card("man",0,"LEO→GEO time: Hohmann vs spiral","≈ 5 hours vs ≈ 200 days");
card("cov",1,"Altitude bands","LEO ≈ 200–1200 km; MEO ≈ 1200–35,790 km; GEO ≈ 35,790 km (r ≈ 42,164 km)");
card("cov",1,"Periods","LEO ≈ 1.5–2 hr; MEO ≈ 12 hr; GEO ≈ 24 hr");
card("cov",0,"Earth radii",R`Mean 6371 km; equatorial 6378 km; polar 6356 km; \(R_{eq} - R_{pole} \approx 21.4\) km (0.3%)`);
card("cov",0,"GPS constellation","24 satellites, 6 planes × 4, 20,200 km, 55° inclination");
card("cov",0,"Iridium","66 active satellites at ≈ 780 km (named for element 77)");
card("cov",0,"J₂ value",R`\(J_2 = 1.08263\times10^{-3}\)`);
card("cov",0,"SSO node rate",R`\(+0.9856°/\text{day}\) (360°/365.256 d). Example: h = 833 km needs i = 98.7°`);
card("cov",0,"Critical inclinations","63.4° and 116.6°: no apsidal rotation (Molniya / HEO)");
card("cov",0,"J₂ drift magnitudes in LEO","Nodal regression up to ≈ 10°/day; apsidal rotation up to ≈ 20°/day");
card("cov",0,"Coverage angles","ε elevation angle, η nadir (sub-satellite) angle, λ Earth central angle, ρ angular radius of Earth: λ + η + ε = 90°");
card("cov",0,"Four coordinate systems","Spacecraft-fixed, Earth-fixed, roll-pitch-yaw (RPY), celestial");
card("cov",0,"GTO","Geosynchronous transfer orbit ≈ 320 km × 35,786 km");
card("rkt",0,"Typical Isp ranges","Chemical 50–450 s; electrothermal 300–1200 s; electrostatic/EM 1500–4000 s");
card("rkt",0,"c for chemical options","Cold gas ≈ 0.69, monoprop ≈ 2.26, solid ≈ 2.94, biprop ≈ 3.92 km/s");
card("rkt",0,"Chem vs EP exhaust speed and thrust","Chem: c ≈ 3–4 km/s, T ≈ 1 N to MN+. EP: c ≈ 5–100+ km/s, T ≈ 0.1 to hundreds of mN");
card("rkt",1,"Mass definitions",R`\(m_0 = m_{pay}+m_i+m_p\) (wet); \(m_f = m_{pay}+m_i\) (dry)`);
card("rkt",1,"Ways to reduce propellant mass","Increase Isp, staging; lower ΔV (trajectory, flyby); lower dry mass (hardest)");
card("rkt",1,"When is it a new stage?","When Isp changes (engines shut down) or dry mass changes (jettison). Throttling all engines equally is not a new stage");
card("rkt",0,"Typical ΔV budget (Fortescue)","LEO ≥ 9.5 km/s; GEO from 30° parking ≈ 4.2; GEO N–S stationkeeping ≈ 0.35 (7 yr); E–W ≈ 0.03; Mars flyby +3.4; solar escape +8.5 km/s");
card("rkt",0,"Rocket mass fraction","Launch vehicles are ≈ 90% propellant");
card("chem",1,"Chemical propulsion types","Cold gas, liquid (monoprop, biprop), solid, hybrid");
card("chem",0,"SRM pros / cons","Pros: simple, dense, storable, thrust tailored by grain, gimbaled nozzle. Cons: limited restart, toxic exhaust, not throttleable");
card("chem",0,"Biprop pros / cons","Pros: higher Isp, stop/start, throttle, reusable. Cons: complex plumbing and leaks, cryogens not storable long");
card("chem",0,"Hybrid","Solid fuel + liquid oxidizer. Safer, restartable, less toxic. Mixture-ratio variation hurts efficiency");
card("chem",0,"Regression rate exponent",R`\(r = aP_c^n\), \(n \approx 0.3\)–\(0.8\); typical 0.05–10 in/s`);
card("chem",1,"Chem advantages vs EP","High thrust (shorter trips), no external power, more heritage");
card("chem",1,"Chem disadvantages vs EP","Low Isp (high propellant mass, energy limited), lower precision, high disturbance");
card("ep",1,"EP advantages","High Isp (low propellant mass, more ΔV margin), high precision, low disturbance");
card("ep",1,"EP disadvantages","Low thrust and long trips (power limited), higher inert mass for the power system, typically less heritage");
card("ep",0,"Xe at 1000 V example",R`\(v_+ \approx 38.3\) km/s, Isp ≈ 3906 s; \(m_{Xe} = 2.18\times10^{-25}\) kg`);
card("ep",0,"Atomic masses",R`Xe 131.3, Kr 83.8, Ar 39.9 amu; 1 amu = \(1.66\times10^{-27}\) kg; \(e = 1.6\times10^{-19}\) C`);
card("ep",0,"SMART-1","ESA lunar mission. First Hall thruster EP beyond GEO (PPS-1350, 30–70 mN, Isp 1100–1600 s)");
card("lau",1,"Launch azimuth rules",R`\(\cos i = \cos\delta\sin A\); \(A = 90°\) gives \(i = \delta\); \(i \ge \delta\). 0–90° prograde, 90° polar, 90–180° retrograde`);
card("lau",0,"KSC and Vandenberg",R`KSC 28.5°N, azimuth ≈ 35°–120° (i ≈ 28.5°–57°). Vandenberg ≈ 35°N, south azimuths for polar and retrograde`);
card("lau",0,"HW 4 spaceport latitudes","French Guiana 5.04°; Plesetsk 62.92°; KSC 28.57°");
card("lau",0,"Shuttle ΔV budget (m/s)",R`\(V_{LEO}\) 7794; gravity 1222; drag 107; steering 358; Earth rotation −395; \(\Delta V_{prop}\) ≈ 9086 (≈ 30,000 ft/s)`);
card("lau",0,"Launch by the numbers","180 kg of propellant per 4.5 kg to LEO; 725 kg per 4.5 kg to GEO; ≥ 7.5 km/s to stay in LEO");
card("lau",0,"Falcon 9 vs Falcon Heavy (slide)","F9: 22,800 kg LEO, $74M. FH: 63,800 kg LEO, $97M");
card("lau",0,"Staging methods","Series, partial, parallel, piggy-back");
card("ipl",1,"Interplanetary phases","A) Geocentric escape (hyperbola), B) heliocentric transfer (ellipse), C) planetocentric encounter (hyperbola)");
card("ipl",0,"SOI as % of orbital radius","Mercury 0.19, Venus 0.57, Earth 0.62, Mars 0.25, Jupiter 6.19, Saturn 3.82, Uranus 1.80, Neptune 1.93");
card("ipl",0,"Subway map, Earth to Mars (km/s)","9.4 to LEO; 3.21 to escape; 1.06 to Mars; 1.44 capture; total ≈ 15.11");
card("ipl",1,"Type I vs Type II","Type I: transfer angle < 180°. Type II: > 180°. The ridge at 180° is costly");
card("ipl",1,"Mission planning steps","1) Destination and science 2) Transfer options 3) Launch window 4) Swing-bys 5) Approach and EDL 6) Repeat (porkchop plots)");
card("ipl",0,"Earth–Mars synodic period","≈ 780 days (≈ 2.14 yr)");
card("ipl",0,"Genesis (ITN) total ΔV","≈ 450 m/s, using Sun–Earth L1/L2 dynamics");
card("mis",1,"Voyager","Grand Tour gravity assists; farthest objects from Earth. Flandro (JPL intern, 1964); alignment about every 175 yr");
card("mis",1,"Galileo","Jupiter; Earth assist; high-gain antenna failure (134.4 kbps → 10–20 bps)");
card("mis",1,"Hubble","Earth orbit; reaction wheels, magnetic torquers desaturate them; 3 gyros; 90° slew < 18 min");
card("mis",1,"JWST","Sun–Earth L2");
card("mis",1,"DART","Near-Earth asteroid impactor (Dimorphos / Didymos); critical targeting; science observation (LICIACube, Hubble)");
card("mis",1,"Parker Solar Probe","7 Venus assists; flies through the Sun's corona; perihelion ≈ 9.86 R☉; max launch C3 154 km²/s²");
card("mis",1,"MMX","JAXA; launches straight to hyperbolic escape; Phobos sample return (≈ 10 g), return ≈ 2031");
card("mis",1,"Cassini","Saturn; VVEJGA assists; Titan flybys (> 800 m/s each); Grand Finale into Saturn in 2017");

/* ---------------- Equation sheet ----------------
   eq(id, topic, mr, name, tex, terms[[sym, meaning]], use, assume, watch, labHash) */
const EQ = [];
function eq(id, t, mr, name, tex, terms, use, assume, watch, lab) { EQ.push({ id, t, mr: !!mr, name, tex, terms, use, assume, watch, lab: lab || "" }); }

eq("expatm","env",1,"Exponential atmosphere",R`n = n_0\,\exp\!\left(-\frac{z}{H}\right),\qquad H = \frac{kT}{Mg}`,
 [[R`n_0`,"density at sea level (1.225 kg/m³)"],[R`z`,"altitude"],[R`H`,"scale height (≈ 8 km)"],[R`k`,"Boltzmann constant"],[R`M`,"molecular mass"]],
 "First-order density at altitude, for drag and lifetime estimates.","Ideal gas, hydrostatic balance, constant T and g within the layer.","Real density varies by orders of magnitude with the solar cycle. Use consistent units (m vs km).");
eq("drag","env",1,"Atmospheric drag",R`F_D = \tfrac12\rho\,C_D A\,V^2,\qquad \vec a_D = -\tfrac12\rho V^2\!\left(\frac{C_DA}{m}\right)\hat v_{rel},\qquad \beta = \frac{m}{C_DA}`,
 [[R`\rho`,"atmospheric density"],[R`C_D`,"drag coefficient ≈ 2.2"],[R`A`,"ram (frontal) area"],[R`V`,"speed relative to the atmosphere"],[R`\beta`,"ballistic coefficient [kg/m²]"]],
 "Drag force or deceleration on a LEO spacecraft; comparing lifetimes via β.",R`Velocity relative to the co-rotating atmosphere, \(\vec v_{rel} = \dot{\vec r} - \vec\omega_\oplus\times\vec r\).`,"Convert km/s to m/s before multiplying by ρ in kg/m³. Higher β means slower decay.");
eq("decay","env",0,"Orbit decay rate (circular)",R`\frac{da}{dt} = -\rho\,\beta\sqrt{\mu a}\quad(\text{course form})`,
 [[R`a`,"semi-major axis"],[R`\rho`,"local density"],[R`\mu`,"gravitational parameter"]],
 "Rate the orbit shrinks under drag, for a near-circular orbit.","Circular orbit, slowly varying a.",R`For the units to work, the factor multiplying \(\rho\) has to be \(C_DA/m = 1/\beta\). So a larger \(m/(C_DA)\) means slower decay.`);
eq("aerotorque","env",0,"Aerodynamic disturbance torque",R`M_d = F_D\,(c_p - c_g)`,
 [[R`c_p`,"center of pressure"],[R`c_g`,"center of gravity"]],"Torque from drag acting off the CG (HW 1c).",R`Drag acts through \(c_p\).`,"Constant for Earth-oriented vehicles, varies for inertially oriented ones.");
eq("solar","env",1,"Solar power and pressure",R`\text{Power} = I_sA_\perp,\quad P_s = \frac{I_s}{c},\quad F_s = P_sA_\perp(1+q),\quad I_s = I_{s\oplus}\!\left(\frac{r_{\oplus}}{r}\right)^{2}`,
 [[R`I_{s\oplus}`,"≈ 1358 W/m² at 1 AU"],[R`A_\perp`,"area facing the Sun"],[R`q`,"reflectivity: −1 transparent, 0 black, 1 mirror"],[R`c`,"speed of light"]],
 "Array power, solar radiation force and torque, scaling to other distances.","Flat surface normal to the Sun.",R`Inverse-square scaling with distance; \(P_s \approx 4.5\times10^{-6}\ \mathrm{N/m^2}\) at 1 AU.`);
eq("gyro","env",0,"Gyroradius and gyroperiod",R`r_g = \frac{m v_\perp}{|q|B},\qquad T_g = \frac{2\pi r_g}{v_\perp}`,
 [[R`v_\perp`,"velocity perpendicular to B"],[R`B`,"magnetic field"]],"Whether a charged particle is magnetized (Van Allen trapping, Hall thruster electrons vs ions).","Uniform B over one orbit.",R`1 Gauss = 10⁻⁴ T. Lighter particles have smaller \(r_g\).`);
eq("eom","orb",0,"Restricted two-body EOM",R`\ddot{\vec r} = -\frac{\mu}{r^2}\,\hat r,\qquad \mu = GM`,
 [[R`\mu`,"gravitational parameter (398,600 km³/s² for Earth)"]],"Starting point for all two-body results.","M ≫ m, spherically symmetric bodies, gravity only.","");
eq("energy","orb",1,"Specific mechanical energy",R`\varepsilon = \frac{v^2}{2} - \frac{\mu}{r} = -\frac{\mu}{2a}`,
 [[R`v^2/2`,"specific kinetic energy"],[R`-\mu/r`,"specific potential energy"],[R`a`,"semi-major axis"]],
 "Classify the orbit (sign of ε) and connect speed at a point to orbit size.","Two-body, conservative.","Energy depends only on a: ε < 0 bound, = 0 parabolic, > 0 hyperbolic.");
eq("angmom","orb",0,"Specific angular momentum",R`\vec H = \vec r\times\vec v,\qquad H = rv\cos\phi = \sqrt{\mu p}`,
 [[R`\phi`,"flight path angle from the local horizontal"],[R`p`,"parameter"]],
 R`Motion is planar. Gives the speed relation between periapsis and apoapsis (\(r_pv_p = r_av_a\)).`,"Central force.","φ = 0 at periapsis and apoapsis.");
eq("traj","orb",0,"Trajectory equation",R`r = \frac{p}{1+e\cos\theta},\quad p = \frac{H^2}{\mu},\quad e = \sqrt{1+\frac{2\varepsilon H^2}{\mu^2}}`,
 [[R`\theta`,"true anomaly (from periapsis)"],[R`e`,"eccentricity"],[R`p`,"semi-latus rectum"]],
 "Radius at any true anomaly; e and p from ε and H (HW 2 #1).","Two-body conic.","");
eq("geom","orb",1,"Ellipse geometry",R`a = \frac{r_a+r_p}{2},\quad e = \frac{r_a-r_p}{r_a+r_p},\quad r_p = a(1-e),\quad r_a = a(1+e),\quad p = a(1-e^2)`,
 [[R`r_p, r_a`,"periapsis and apoapsis radii from the planet's center"]],R`Convert between \((r_p, r_a)\) and \((a, e)\).`,"","Radii, not altitudes: r = R⊕ + h.");
eq("visviva","orb",1,"Vis-viva",R`v = \sqrt{\mu\left(\frac{2}{r}-\frac{1}{a}\right)}`,
 [[R`r`,"current radius"],[R`a`,"semi-major axis of the orbit you're on"]],
 "Speed at any point on any conic. The workhorse for perigee and apogee speeds and every impulsive transfer.","Two-body.",R`Use the \(a\) of the orbit you are on (e.g., \(a_{tr}\) on the transfer ellipse). For a hyperbola, \(a < 0\).`,"elements");
eq("vcirc","orb",1,"Circular and escape speed",R`v_c = \sqrt{\frac{\mu}{r}},\qquad v_{esc} = \sqrt{\frac{2\mu}{r}} = \sqrt2\,v_c`,
 [[R`r`,"orbit radius = R⊕ + h"]],"Circular orbit speed (a = r); minimum escape speed (a → ∞).","Vis-viva limits.","");
eq("period","orb",1,"Orbit period (Kepler III)",R`P = 2\pi\sqrt{\frac{a^3}{\mu}}`,
 [[R`a`,"semi-major axis"]],R`Period; Hohmann TOF \(= P_{tr}/2\); altitude for a given period (HW 1, 12 hr).`,"Two-body ellipse.",R`Solve for \(a\): \(a = \left(\mu (P/2\pi)^2\right)^{1/3}\).`,"elements");
eq("hohmann","man",1,"Hohmann transfer",R`a_{tr} = \tfrac{r_1+r_2}{2},\ \ \Delta v_1 = v_p - v_{c1},\ \ \Delta v_2 = |v_{c2}-v_a|,\ \ \mathrm{TOF} = \tfrac12 P_{tr}`,
 [[R`v_p, v_a`,"vis-viva on the transfer ellipse at r₁ and r₂"],[R`v_{c1}, v_{c2}`,"circular speeds"]],
 "Two-impulse, high-thrust transfer between coplanar circular orbits.","Impulsive burns, coplanar circular orbits.","Compute each velocity separately. Don't use a lumped formula.","phase");
eq("edelbaum","man",1,"Edelbaum (low-thrust spiral)",R`\Delta v = \sqrt{v_{c1}^2+v_{c2}^2-2v_{c1}v_{c2}\cos\!\left(\tfrac{\pi}{2}\Delta\alpha\right)},\qquad \mathrm{TOF} = \frac{c\,m_p}{F}`,
 [[R`\Delta\alpha`,"plane change in radians"],[R`v_{c1}, v_{c2}`,"circular speeds"]],
 "Low-thrust (EP) circle-to-circle transfer with optional plane change.","Continuous low thrust, near-circular spiral, constant power.",R`\(\Delta\alpha\) in radians. With \(\Delta\alpha = 0\), \(\Delta v = |v_{c1} - v_{c2}|\).`);
eq("planechange","man",1,"Impulsive plane change",R`\Delta v = \sqrt{v_1^2+v_2^2-2v_1v_2\cos\Delta\alpha}\ \xrightarrow{v_1=v_2=v}\ 2v\sin\frac{\Delta\alpha}{2}`,
 [[R`\Delta\alpha`,"angle between the velocity vectors (or planes)"]],
 "High-thrust plane change, or a combined plane change with a speed change.","Impulsive burn at the node.","Do it where v is smallest (apogee). Combining with a burn saves Δv.","plane");
eq("sphtrig","man",0,"Plane change angle (spherical trig)",R`\cos\Delta\alpha = \cos i_1\cos i_2 + \sin i_1\sin i_2\cos(\Omega_2-\Omega_1)`,
 [[R`i`,"inclination"],[R`\Omega`,"RAAN"]],"Angle between two orbit planes when both i and Ω change.","","With the same Ω, Δα = |i₂ − i₁|.","plane");
eq("coverage","cov",0,"Instantaneous coverage",R`\lambda = \cos^{-1}\!\left(\frac{\cos\varepsilon}{1+H/R_E}\right)-\varepsilon,\quad A_t = 2\pi R_E^2(1-\cos\lambda),\quad F = \tfrac12(1-\cos\lambda)`,
 [[R`\varepsilon`,"minimum elevation angle"],[R`\lambda`,"Earth central angle"],[R`H`,"altitude"],[R`F`,"fraction of Earth in view"]],
 "Coverage area and visibility for LEO, MEO, GEO (HW 2 #4, #6).","Spherical Earth.",R`Also \(\sin\rho = R_E/(R_E+H)\), \(\sin\eta = \cos\varepsilon\sin\rho\), \(\lambda+\eta+\varepsilon = 90°\).`,"coverage");
eq("j2node","cov",1,"J₂ nodal regression",R`\dot\Omega = -\frac32 J_2\,n\left(\frac{R_e}{a(1-e^2)}\right)^2\cos i`,
 [[R`J_2`,"1.08263×10⁻³"],[R`n`,"mean motion √(μ/a³)"],[R`R_e`,"Earth radius"]],
 "Drift of the orbit plane; designing sun-synchronous orbits.","Oblate Earth, first-order secular rate.","n is in rad/s, so convert to deg/day. Prograde orbits regress (westward); SSO needs i > 90°.","elements");
eq("j2apse","cov",0,"J₂ apsidal rotation",R`\dot\omega = \frac32 J_2\,n\left(\frac{R_e}{a(1-e^2)}\right)^2\left(2-\frac52\sin^2 i\right)`,
 [[R`\omega`,"argument of periapsis"]],"Perigee drift; critical inclination (Molniya).","First-order secular J₂.","Zero at 63.4° and 116.6°. Meaningless for e = 0.","elements");
eq("sso","cov",0,"Sun-synchronous condition",R`\dot\Omega_{SSO} = \frac{360°}{365.256\ \text{d}} = 0.9856°/\text{day}`,
 [],"Set the J₂ nodal rate equal to this and solve for i.","","Must be +, so retrograde (e.g., 833 km gives 98.7°).","elements");
eq("thrust","rkt",1,"Thrust equation",R`F_T = \dot mV_e + A_e(P_e-P_\infty) = \dot m\,c`,
 [[R`\dot m`,"propellant mass flow"],[R`V_e`,"exhaust velocity"],[R`A_e`,"exit area"],[R`c`,"effective exhaust velocity"]],
 "Thrust from nozzle conditions; defines c.","1-D, no body forces.",R`Pressure thrust is usually small, so \(c \approx V_e\).`);
eq("isp","rkt",1,"Impulse and specific impulse",R`I = \int F_T\,dt,\qquad I_{sp} = \frac{I}{W} = \frac{F_T}{\dot m g} = \frac{c}{g}`,
 [[R`g`,"Earth surface gravity (always)"],[R`W`,"propellant weight on Earth"]],"Propellant efficiency; converting Isp to c.","","Convert Isp to c first (c = Isp·g) and work in c.");
eq("rocket","rkt",1,"Rocket equation",R`\Delta V = c\ln\frac{m_0}{m_f},\qquad \frac{m_p}{m_f} = e^{\Delta V/c}-1`,
 [[R`m_0`,"initial (wet) mass"],[R`m_f`,"final (dry, delivered) mass"],[R`m_p`,"propellant mass"]],
 "Δv from a burn or stage; propellant for a given Δv.","No gravity or drag during the burn, constant c.","Match units (m/s with m/s). Masses are ratios, so any mass unit works.");
eq("staging","rkt",1,"Serial staging",R`\Delta V_{tot} = \sum_{i=1}^{n} c_i\ln\frac{m_{0,i}}{m_{f,i}},\quad m_{0,1} = m_{0,2}+m_{i,1}+m_{p,1},\quad m_{f,1} = m_{0,1}-m_{p,1}`,
 [[R`m_{0,2}`,"everything above stage 1 (upper stages + payload)"]],"Δv of a multi-stage vehicle; payload capability (HW 4 #3).","Each stage drops its inert mass before the next fires.","A new stage starts whenever Isp or dry mass changes.");
eq("ispmix","rkt",0,"Stage Isp with several engines",R`I_{sp,stage} = \frac{\sum F}{\sum \dot W} = \frac{\sum \dot m_j I_{sp,j}}{\sum \dot m_j}`,
 [],"Boosters plus core firing together.","","Weight by mass flow, not a simple average.");
eq("ve","chem",0,"Ideal exhaust velocity",R`V_e = \sqrt{2c_pT_c\left(1-\frac{T_e}{T_c}\right)} \approx \sqrt{\frac{2\gamma}{\gamma-1}\frac{\bar R}{\bar M}T_c}`,
 [[R`T_c`,"chamber temperature"],[R`\bar M`,"molecular weight"],[R`\gamma`,"ratio of specific heats"]],R`Why propellant choice matters: \(V_e \propto \sqrt{T_c/\bar M}\).`,R`Energy conservation, chamber velocity ≈ 0, \(T_e \ll T_c\).`,"");
eq("cstar","chem",0,"Characteristic velocity and thrust coefficient",R`c^* = \frac{P_cA_t}{\dot m},\qquad c_f = \frac{F_t}{P_cA_t},\qquad c = c^*c_f`,
 [[R`P_c`,"chamber pressure"],[R`A_t`,"throat area"]],R`Separate chamber performance (\(c^*\)) from nozzle performance (\(c_f\)).`,"Choked throat.",R`A better nozzle changes \(c_f\) only.`);
eq("choked","chem",0,"Choked mass flow",R`\dot m = \sqrt{\gamma}\left(\frac{2}{\gamma+1}\right)^{\frac{\gamma+1}{2(\gamma-1)}}\frac{P_cA_t}{\sqrt{RT_c}}`,
 [[R`R`,"specific gas constant"]],"Mass flow through a choked throat.","M = 1 at the throat, ideal gas.","");
eq("regress","chem",0,"Solid regression rate",R`r = aP_c^{\,n}`,[[R`n`,"≈ 0.3–0.8"]],"Burning-surface recession in an SRM.","","");
eq("tank","chem",0,"Thin-wall tank stress",R`\text{sphere: }\sigma = \frac{Pr}{2t};\qquad \text{cylinder: }\sigma_{hoop} = \frac{Pr}{t},\ \ \sigma_{long} = \frac{Pr}{2t}`,
 [[R`P`,"internal pressure"],[R`t`,"wall thickness"]],"Tank wall thickness and mass (HW 3 #3).","Thin wall.","Apply a factor of safety to the thickness.");
eq("lorentz","ep",0,"Lorentz force",R`\vec F = m\frac{d\vec v}{dt} = q\vec E + q(\vec v\times\vec B)`,
 [[R`q\vec E`,"electrostatic force"],[R`q\vec v\times\vec B`,"magnetic (Lorentz) force"]],"Charged-particle motion: electrostatic vs electromagnetic thrusters.","","v × B gives magnetic confinement and EM propulsion.");
eq("vplus","ep",1,"Ion exit velocity",R`v_+ = \sqrt{\frac{2eV_B}{m}}`,
 [[R`V_B`,"beam voltage"],[R`m`,"ion mass (amu × 1.66×10⁻²⁷ kg)"],[R`e`,"1.6×10⁻¹⁹ C"]],"Ion speed and Isp of a gridded ion or Hall thruster.","Singly charged ion starting from rest.",R`Thrust \(\propto \sqrt{V_B}\) at fixed \(\dot m\).`);
eq("epperf","ep",1,"Electrostatic thruster performance",R`F_T = \dot m_p c,\ \ c = \gamma\eta_m v_+,\ \ \eta_m = \frac{\dot m_i}{\dot m_p},\ \ J_B = \frac{q}{m}\dot m_p\eta_m,\ \ P_B = J_BV_B`,
 [[R`\eta_m`,"mass utilization efficiency"],[R`\gamma`,"other efficiencies (≈ 1)"],[R`J_B`,"beam current"]],"Thrust, current and beam power of an ion or Hall thruster.","Singly charged ions.","");
eq("epeff","ep",1,"EP efficiencies",R`\eta_E = \frac{P_B}{P_E} = \frac{J_BV_B}{J_BV_B+P_0},\qquad \eta_T = \frac{P_{jet}}{P_E},\quad P_{jet} = \tfrac12\dot m_pc^2`,
 [[R`P_E`,"total electric input power"],[R`P_0`,"power not in the beam"]],"How much input power becomes beam or jet power (HW 3 #4).","",R`At fixed power and efficiency, \(F = 2\eta_T P_E/c\), so higher Isp means less thrust.`);
eq("azimuth","lau",1,"Launch azimuth and inclination",R`\cos i = \cos\delta\,\sin A,\qquad i \ge \delta`,
 [[R`\delta`,"launch-site latitude"],[R`A`,"azimuth clockwise from north"]],"Inclination reachable from a site and azimuth.","Spherical Earth, direct ascent.","A = 90° (due east) gives i = δ.","launch");
eq("node","lau",0,"Launch time for a target node",R`\sin\gamma_2 = \tan\delta\cot i,\qquad \alpha = \Omega + \gamma_2`,
 [[R`\alpha`,"right ascension of the launch meridian"]],"When to launch to reach a desired RAAN.","","","launch");
eq("launchdv","lau",1,"Launch velocity budget",R`V_{orbit} = \Delta V_{prop} - \Delta V_g - \Delta V_D + \Delta V_{\omega\oplus},\qquad \Delta V_{\omega\oplus} \approx \omega_\oplus R_\oplus\cos\delta\sin A`,
 [[R`\Delta V_g`,"gravity loss ∫ g sin γ dt"],[R`\Delta V_D`,"drag loss ∫ D/m dt"],[R`\omega_\oplus`,"2π / 24 hr"]],"Total propulsive ΔV needed to reach orbit.","","Launch east for the maximum rotation boost; a steering loss term also appears.","launch");
eq("freq","lau",0,"Spacecraft fundamental frequencies",R`f_{n,ax}\approx 0.25\sqrt{\frac{AE}{mL}},\qquad f_{n,lat}\approx 0.56\sqrt{\frac{EI}{mL^3}}`,
 [[R`E`,"Young's modulus"],[R`I`,"area moment of inertia"],[R`L`,"length"]],"Checking that the spacecraft stays above the launch vehicle's minimum frequencies.","Beam-like structure.","");
eq("c3","ipl",1,"Hyperbolic excess and C3",R`C_3 = v_\infty^2 = v_{bo}^2 - v_{esc}^2,\qquad v_{bo} = v + \Delta v`,
 [[R`v_{bo}`,"speed after the burn"],[R`v_{esc}`,"escape speed at that radius"]],"Energy left after escaping a planet; the launch vehicle requirement.","Energy balance at the same radius.","C3 is in km²/s², relative to the planet.");
eq("vsun","ipl",1,"Heliocentric velocity",R`\vec v_{sun} = \vec v_\infty + \vec v_{planet}`,
 [],"Turning planet-relative excess speed into a heliocentric transfer speed.","Patched conics.","Vector addition. Align them for a Hohmann transfer.","phase");
eq("soi","ipl",0,"Sphere of influence",R`r_{SOI}\approx a_{p}\left(\frac{\mu_{p}}{\mu_{sun}}\right)^{2/5}`,
 [],"Where to patch planet-centered and Sun-centered conics.","Approximation.","Earth ≈ 0.62% of 1 AU.");
eq("oberth","ipl",1,"Oberth effect",R`\Delta\varepsilon = v\Delta v + \tfrac12\Delta v^2,\qquad v_\infty = \Delta v\sqrt{\frac{2v_{esc}}{\Delta v}+1}`,
 [],"Why to burn at periapsis; powered flybys.","Impulsive burn.","");
eq("phase","ipl",0,"Departure phase angle",R`\phi = \theta_{xfer} - 2\pi\frac{t_{xfer}}{T_2},\qquad \text{Hohmann: }\theta_{xfer} = \pi,\ t_{xfer} = \tfrac12 P_{tr}`,
 [[R`T_2`,"target's orbital period"]],"Where the target must be at departure (Mars, or the Moon in HW 2 #2d).","Circular coplanar orbits.","","phase");
eq("synodic","ipl",0,"Synodic period",R`T_s = \frac{T_1T_2}{|T_2-T_1|}`,[],"How often transfer windows repeat.","","Earth–Mars ≈ 780 days.","phase");
eq("assist","ipl",0,"Gravity assist",R`\vec v_{rel} = \vec v_{ti} - \vec v_p,\qquad \vec v_{tf} = \vec v_{rel}' + \vec v_p,\quad |\vec v_{rel}'| = |\vec v_{rel}|`,
 [],"Velocity change in the Sun frame from a flyby.","Hyperbolic flyby inside the SOI.","Speed relative to the planet is unchanged; only its direction turns.");

/* ---------------- Numeric problem generators ---------------- */
const MU = 398600, RE = 6371, G0 = 9.81, QE = 1.6e-19, AMU = 1.66e-27, MUS = 1.327e11;
const rnd = (a, b, step) => { const s = step || 1; return Math.round((a + Math.random() * (b - a)) / s) * s; };
const pick = arr => arr[Math.floor(Math.random() * arr.length)];
const f = (x, d) => Number(x).toLocaleString("en-US", { maximumFractionDigits: d == null ? 3 : d, minimumFractionDigits: 0 });
const D2R = Math.PI / 180;

const NUM = [];
function num(id, t, mr, title, gen) { NUM.push({ id, t, mr: !!mr, title, gen }); }

num("n-circ","orb",1,"Circular speed and period",()=>{
  const h=rnd(250,1500,10), r=RE+h, v=Math.sqrt(MU/r), P=2*Math.PI*Math.sqrt(r**3/MU)/60;
  return { q:R`A satellite is in a circular orbit at altitude \(h = ${h}\) km. Find its orbital period in minutes.`, ans:P, unit:"min",
    steps:[R`\(r = R_\oplus + h = 6371 + ${h} = ${f(r,0)}\) km`,R`\(v_c = \sqrt{\mu/r} = ${f(v,3)}\) km/s`,R`\(P = 2\pi\sqrt{r^3/\mu} = ${f(P,1)}\) min`]};
});
num("n-visviva","orb",1,"Perigee speed with vis-viva",()=>{
  const hp=rnd(300,1500,50), ha=rnd(5000,40000,500), rp=RE+hp, ra=RE+ha, a=(rp+ra)/2, vp=Math.sqrt(MU*(2/rp-1/a)), va=Math.sqrt(MU*(2/ra-1/a));
  return { q:R`An Earth orbit has perigee altitude ${hp} km and apogee altitude ${f(ha,0)} km. Find the speed at perigee.`, ans:vp, unit:"km/s",
    steps:[R`\(r_p = ${f(rp,0)}\), \(r_a = ${f(ra,0)}\) km`,R`\(a = (r_p+r_a)/2 = ${f(a,0)}\) km`,R`\(v_p = \sqrt{\mu(2/r_p - 1/a)} = ${f(vp,3)}\) km/s`,R`(For reference, \(v_a = ${f(va,3)}\) km/s)`]};
});
num("n-energy","orb",0,"Energy and classification",()=>{
  const h=rnd(300,900,50), v=rnd(7.8,12.5,0.1), r=RE+h, eps=v*v/2-MU/r, a=-MU/(2*eps), vesc=Math.sqrt(2*MU/r);
  const kind = eps<0 ? "elliptical (bound)" : "hyperbolic (escape)";
  return { q:R`A spacecraft at ${h} km altitude moves at ${f(v,1)} km/s. Find its specific mechanical energy \(\varepsilon\) in km²/s².`, ans:eps, unit:"km²/s²", abs:0.05,
    steps:[R`\(r = ${f(r,0)}\) km, \(\mu/r = ${f(MU/r,2)}\)`,R`\(\varepsilon = v^2/2 - \mu/r = ${f(v*v/2,2)} - ${f(MU/r,2)} = ${f(eps,2)}\) km²/s²`,R`\(v_{esc} = ${f(vesc,2)}\) km/s, so the trajectory is ${kind}${eps<0?R`, with \(a = -\mu/2\varepsilon = ${f(a,0)}\) km`:""}.`]};
});
num("n-hohmann","man",1,"Hohmann transfer Δv",()=>{
  const h1=rnd(200,800,50), h2=pick([20200,35786,10000,15000,5000]), r1=RE+h1, r2=RE+h2, at=(r1+r2)/2;
  const vc1=Math.sqrt(MU/r1), vc2=Math.sqrt(MU/r2), vp=Math.sqrt(MU*(2/r1-1/at)), va=Math.sqrt(MU*(2/r2-1/at));
  const d1=vp-vc1, d2=vc2-va, tof=Math.PI*Math.sqrt(at**3/MU)/3600;
  return { q:R`Find the total \(\Delta v\) for a Hohmann transfer from a ${h1} km circular orbit to a ${f(h2,0)} km circular orbit.`, ans:d1+d2, unit:"km/s",
    steps:[R`\(r_1 = ${f(r1,0)}\), \(r_2 = ${f(r2,0)}\), \(a_{tr} = ${f(at,0)}\) km`,R`\(v_{c1} = ${f(vc1,3)}\), \(v_p = ${f(vp,3)}\), so \(\Delta v_1 = ${f(d1,3)}\) km/s`,R`\(v_{c2} = ${f(vc2,3)}\), \(v_a = ${f(va,3)}\), so \(\Delta v_2 = ${f(d2,3)}\) km/s`,R`\(\Delta v_{tot} = ${f(d1+d2,3)}\) km/s; TOF \(= \tfrac12P_{tr} = ${f(tof,2)}\) hr`]};
});
num("n-edel","man",1,"Edelbaum low-thrust Δv",()=>{
  const h1=rnd(300,1000,50), h2=pick([35786,20200,8000]), da=pick([0,10,20,28.5,38]), r1=RE+h1, r2=RE+h2;
  const v1=Math.sqrt(MU/r1), v2=Math.sqrt(MU/r2), arad=da*D2R, dv=Math.sqrt(v1*v1+v2*v2-2*v1*v2*Math.cos(Math.PI/2*arad));
  return { q:R`An EP spacecraft spirals from a ${h1} km circular orbit to ${f(h2,0)} km while changing inclination by ${da}°. Estimate \(\Delta v\) with Edelbaum.`, ans:dv, unit:"km/s",
    steps:[R`\(v_{c1} = ${f(v1,3)}\), \(v_{c2} = ${f(v2,3)}\) km/s`,R`\(\Delta\alpha = ${da}° = ${f(arad,4)}\) rad`,R`\(\Delta v = \sqrt{v_{c1}^2+v_{c2}^2-2v_{c1}v_{c2}\cos(\tfrac{\pi}{2}\Delta\alpha)} = ${f(dv,3)}\) km/s`]};
});
num("n-plane","man",1,"Impulsive plane change",()=>{
  const h=pick([400,600,800,20200,35786]), da=rnd(5,40,1), r=RE+h, v=Math.sqrt(MU/r), dv=2*v*Math.sin(da*D2R/2);
  return { q:R`A satellite in a circular orbit at ${f(h,0)} km changes its plane by ${da}° with one impulsive burn. Find \(\Delta v\).`, ans:dv, unit:"km/s",
    steps:[R`\(v = \sqrt{\mu/r} = ${f(v,3)}\) km/s`,R`\(\Delta v = 2v\sin(\Delta\alpha/2) = ${f(dv,3)}\) km/s`]};
});
num("n-escape","ipl",1,"Escape burn for a target C3",()=>{
  const h=rnd(200,600,50), C3=rnd(8,30,0.5), r=RE+h, vc=Math.sqrt(MU/r), vesc=Math.sqrt(2*MU/r), vbo=Math.sqrt(C3+vesc*vesc), dv=vbo-vc;
  return { q:R`From a ${h} km circular parking orbit, what tangential \(\Delta v\) gives \(C_3 = ${f(C3,1)}\ \mathrm{km^2/s^2}\)?`, ans:dv, unit:"km/s",
    steps:[R`\(v_c = ${f(vc,3)}\), \(v_{esc} = ${f(vesc,3)}\) km/s`,R`\(v_{bo} = \sqrt{C_3 + v_{esc}^2} = ${f(vbo,3)}\) km/s`,R`\(\Delta v = v_{bo} - v_c = ${f(dv,3)}\) km/s`]};
});
num("n-c3","ipl",0,"C3 after a burn",()=>{
  const h=rnd(200,600,50), dv=rnd(3.2,4.5,0.05), r=RE+h, vc=Math.sqrt(MU/r), vesc=Math.sqrt(2*MU/r), vbo=vc+dv, C3=vbo*vbo-vesc*vesc;
  return { q:R`A spacecraft in a ${h} km circular orbit makes a ${f(dv,2)} km/s prograde burn. Find \(C_3\).`, ans:C3, unit:"km²/s²", abs:0.2,
    steps:[R`\(v_{bo} = v_c + \Delta v = ${f(vc,3)} + ${f(dv,2)} = ${f(vbo,3)}\) km/s`,R`\(v_{esc} = ${f(vesc,3)}\) km/s`,R`\(C_3 = v_{bo}^2 - v_{esc}^2 = ${f(C3,2)}\ \mathrm{km^2/s^2}\)${C3<0?" (negative: it does not escape)":""}`]};
});
num("n-hel","ipl",0,"Heliocentric Hohmann v∞",()=>{
  const tgt=pick([["Mars",228e6],["Venus",108e6],["Jupiter",778e6]]), r1=149e6, r2=tgt[1], at=(r1+r2)/2;
  const v1=Math.sqrt(MUS/r1), vp=Math.sqrt(MUS*(2/r1-1/at)), vinf=Math.abs(vp-v1);
  return { q:R`Using \(\mu_\odot = 1.327\times10^{11}\ \mathrm{km^3/s^2}\), \(r_\oplus = 149\times10^6\) km and \(r = ${f(r2/1e6,0)}\times10^6\) km for ${tgt[0]}, find the departure \(v_\infty\) for a Hohmann transfer.`, ans:vinf, unit:"km/s",
    steps:[R`\(v_\oplus = \sqrt{\mu_\odot/r_\oplus} = ${f(v1,3)}\) km/s`,R`\(a_{tr} = ${f(at/1e6,1)}\times10^6\) km; \(v_{dep} = \sqrt{\mu_\odot(2/r_\oplus-1/a_{tr})} = ${f(vp,3)}\) km/s`,R`\(v_\infty = |v_{dep}-v_\oplus| = ${f(vinf,3)}\) km/s, so \(C_3 = ${f(vinf*vinf,2)}\ \mathrm{km^2/s^2}\)`]};
});
num("n-phase","ipl",0,"Departure phase angle",()=>{
  const tgt=pick([["Mars",687,228e6],["Jupiter",4333,778e6]]), r1=149e6, at=(r1+tgt[2])/2;
  const ttr=Math.PI*Math.sqrt(at**3/MUS)/86400, phi=180-360*ttr/tgt[1];
  return { q:R`For a Hohmann transfer from Earth (\(r = 149\times10^6\) km) to ${tgt[0]} (\(r = ${f(tgt[2]/1e6,0)}\times10^6\) km, \(T = ${tgt[1]}\) days), how many degrees must ${tgt[0]} lead Earth at departure?`, ans:((phi%360)+360)%360, unit:"deg", abs:1.5,
    steps:[R`\(a_{tr} = ${f(at/1e6,1)}\times10^6\) km; \(t_{xfer} = \pi\sqrt{a_{tr}^3/\mu_\odot} = ${f(ttr,1)}\) days`,R`Target moves \(360°\cdot t_{xfer}/T = ${f(360*ttr/tgt[1],1)}°\)`,R`\(\phi = 180° - ${f(360*ttr/tgt[1],1)}° = ${f(((phi%360)+360)%360,1)}°\)`]};
});
num("n-synodic","ipl",0,"Synodic period",()=>{
  const p=pick([["Mars",687],["Venus",224.7],["Jupiter",4333],["Saturn",10759]]), T1=365.25, Ts=T1*p[1]/Math.abs(p[1]-T1);
  return { q:R`How often (in days) do Earth–${p[0]} transfer windows recur? (\(T_\oplus = 365.25\) d, \(T = ${p[1]}\) d)`, ans:Ts, unit:"days",
    steps:[R`\(T_s = \dfrac{T_1T_2}{|T_2-T_1|} = \dfrac{365.25\cdot${p[1]}}{${f(Math.abs(p[1]-T1),2)}} = ${f(Ts,0)}\) days`]};
});
num("n-rocket","rkt",1,"Propellant from the rocket equation",()=>{
  const isp=pick([70,230,280,300,330,425,1500,1850,3000,4200]), dv=rnd(0.5,5,0.1), mf=rnd(50,2000,10), c=isp*G0/1000, mp=mf*(Math.exp(dv/c)-1);
  return { q:R`A spacecraft with dry mass ${f(mf,0)} kg needs \(\Delta V = ${f(dv,1)}\) km/s from a thruster with \(I_{sp} = ${isp}\) s. How much propellant is needed?`, ans:mp, unit:"kg",
    steps:[R`\(c = I_{sp}g = ${isp}\times9.81 = ${f(c*1000,0)}\) m/s`,R`\(m_p/m_f = e^{\Delta V/c}-1 = e^{${f(dv/c,4)}}-1 = ${f(Math.exp(dv/c)-1,4)}\)`,R`\(m_p = ${f(mp,1)}\) kg`]};
});
num("n-dv","rkt",0,"Δv of a stage",()=>{
  const isp=rnd(250,450,5), mp=rnd(5000,90000,500), mf=rnd(2000,20000,100), c=isp*G0, dv=c*Math.log((mp+mf)/mf)/1000;
  return { q:R`A stage with \(I_{sp} = ${isp}\) s burns ${f(mp,0)} kg of propellant. Its burnout mass (including everything above it) is ${f(mf,0)} kg. Find its \(\Delta V\).`, ans:dv, unit:"km/s",
    steps:[R`\(c = ${f(c,0)}\) m/s`,R`\(m_0/m_f = ${f(mp+mf,0)}/${f(mf,0)} = ${f((mp+mf)/mf,4)}\)`,R`\(\Delta V = c\ln(m_0/m_f) = ${f(dv,3)}\) km/s`]};
});
num("n-2stage","rkt",1,"Two-stage ΔV",()=>{
  const isp1=rnd(260,310,1), isp2=rnd(320,460,1), mp1=rnd(80000,200000,1000), mi1=rnd(6000,15000,500), mp2=rnd(15000,40000,500), mi2=rnd(1500,4000,100), mpl=rnd(2000,8000,100);
  const m02=mpl+mp2+mi2, m01=m02+mi1+mp1, mf1=m01-mp1, mf2=m02-mp2, dv1=isp1*G0*Math.log(m01/mf1)/1000, dv2=isp2*G0*Math.log(m02/mf2)/1000;
  return { q:R`Two-stage vehicle: stage 1 \(I_{sp} = ${isp1}\) s, \(m_{p,1} = ${f(mp1,0)}\) kg, \(m_{i,1} = ${f(mi1,0)}\) kg. Stage 2 \(I_{sp} = ${isp2}\) s, \(m_{p,2} = ${f(mp2,0)}\) kg, \(m_{i,2} = ${f(mi2,0)}\) kg. Payload ${f(mpl,0)} kg. Find the total ideal \(\Delta V\).`, ans:dv1+dv2, unit:"km/s",
    steps:[R`\(m_{0,2} = m_{PL}+m_{p,2}+m_{i,2} = ${f(m02,0)}\) kg; \(m_{0,1} = m_{0,2}+m_{i,1}+m_{p,1} = ${f(m01,0)}\) kg`,R`\(\Delta V_1 = c_1\ln(${f(m01,0)}/${f(mf1,0)}) = ${f(dv1,3)}\) km/s`,R`\(\Delta V_2 = c_2\ln(${f(m02,0)}/${f(mf2,0)}) = ${f(dv2,3)}\) km/s`,R`\(\Delta V_{tot} = ${f(dv1+dv2,3)}\) km/s`]};
});
num("n-ispmix","rkt",0,"Stage Isp with boosters",()=>{
  const nb=pick([2,4]), ib=rnd(240,280,5), mb=rnd(2000,5000,100), ic=rnd(320,460,5), mc_=rnd(800,2000,25), isp=(nb*mb*ib+mc_*ic)/(nb*mb+mc_);
  return { q:R`${nb} boosters (\(I_{sp} = ${ib}\) s, ${f(mb,0)} kg/s each) fire with a core engine (\(I_{sp} = ${ic}\) s, ${f(mc_,0)} kg/s). Find the stage \(I_{sp}\).`, ans:isp, unit:"s",
    steps:[R`\(I_{sp} = \dfrac{\sum\dot m I_{sp}}{\sum\dot m} = \dfrac{${nb}(${mb})(${ib}) + (${mc_})(${ic})}{${nb}(${mb}) + ${mc_}} = ${f(isp,1)}\) s`]};
});
num("n-ion","ep",1,"Ion exit velocity and Isp",()=>{
  const g=pick([["xenon",131.3],["krypton",83.8],["argon",39.9]]), V=pick([300,500,1000,1500]), m=g[1]*AMU, v=Math.sqrt(2*QE*V/m), isp=v/G0;
  return { q:R`Singly charged ${g[0]} ions (${g[1]} amu) are accelerated through \(V_B = ${V}\) V. Find the specific impulse, assuming \(\eta_m = 1\).`, ans:isp, unit:"s",
    steps:[R`\(m = ${g[1]}\times1.66\times10^{-27} = ${m.toExponential(3)}\) kg`,R`\(v_+ = \sqrt{2eV_B/m} = ${f(v/1000,2)}\) km/s`,R`\(I_{sp} = v_+/g = ${f(isp,0)}\) s`]};
});
num("n-epthrust","ep",0,"EP thrust from power",()=>{
  const P=rnd(1,6,0.1), eta=rnd(0.45,0.65,0.01), isp=rnd(1500,4000,50), c=isp*G0, F=2*eta*P*1000/c*1000;
  return { q:R`A Hall thruster runs at \(P_E = ${f(P,1)}\) kW with total efficiency \(\eta_T = ${f(eta,2)}\) and \(I_{sp} = ${isp}\) s. Find the thrust in mN.`, ans:F, unit:"mN",
    steps:[R`\(c = I_{sp}g = ${f(c,0)}\) m/s`,R`\(\eta_T P_E = \tfrac12\dot m c^2 = \tfrac12 F c\), so \(F = 2\eta_T P_E/c\)`,R`\(F = 2(${f(eta,2)})(${f(P*1000,0)})/${f(c,0)} = ${f(F,1)}\) mN`]};
});
num("n-atm","env",1,"Exponential atmosphere density",()=>{
  const z=pick([20,40,60,80,100,120,150]), rho=1.225*Math.exp(-z/8);
  return { q:R`Using \(n_0 = 1.225\ \mathrm{kg/m^3}\) and \(H = 8\) km, find the density at ${z} km.`, ans:rho, unit:"kg/m³", sig:true,
    steps:[R`\(\rho = 1.225\,e^{-${z}/8} = 1.225\,e^{-${f(z/8,3)}} = ${rho.toExponential(3)}\ \mathrm{kg/m^3}\)`]};
});
num("n-drag","env",1,"Drag force in LEO",()=>{
  const z=pick([100,120,150]), A=rnd(1,4,0.5), rho=1.225*Math.exp(-z/8), r=RE+z, v=Math.sqrt(MU/r)*1000, F=0.5*rho*2.2*A*v*v;
  return { q:R`A spacecraft with ram area ${f(A,1)} m² and \(C_D = 2.2\) is in a circular orbit at ${z} km. Using the exponential model (\(n_0 = 1.225\), \(H = 8\) km), find the drag force.`, ans:F, unit:"N", sig:true,
    steps:[R`\(\rho = ${rho.toExponential(3)}\ \mathrm{kg/m^3}\)`,R`\(v = \sqrt{\mu/r} = ${f(v,0)}\) m/s`,R`\(F_D = \tfrac12\rho C_DAv^2 = ${F.toExponential(3)}\) N`]};
});
num("n-solar","env",0,"Solar radiation force",()=>{
  const A=rnd(5,40,1), q=pick([0,0.3,0.6,1]), au=pick([0.72,1,1.52]), Is=1358/(au*au), Ps=Is/3e8, F=Ps*A*(1+q);
  return { q:R`A ${A} m² surface faces the Sun at ${au} AU with reflectivity \(q = ${q}\). Find the solar radiation force (μN).`, ans:F*1e6, unit:"μN",
    steps:[R`\(I_s = 1358/(${au})^2 = ${f(Is,1)}\ \mathrm{W/m^2}\)`,R`\(P_s = I_s/c = ${Ps.toExponential(3)}\ \mathrm{N/m^2}\)`,R`\(F_s = P_sA(1+q) = ${f(F*1e6,2)}\ \mu\mathrm{N}\)`]};
});
num("n-incl","lau",1,"Inclination from launch azimuth",()=>{
  const site=pick([["KSC",28.57],["French Guiana",5.04],["Plesetsk",62.92],["Vandenberg",34.7]]), A=rnd(40,140,5), i=Math.acos(Math.cos(site[1]*D2R)*Math.sin(A*D2R))/D2R;
  return { q:R`A vehicle launches from ${site[0]} (\(\delta = ${site[1]}°\)) at azimuth \(A = ${A}°\). What inclination results?`, ans:i, unit:"deg",
    steps:[R`\(\cos i = \cos\delta\sin A = \cos ${site[1]}°\cdot\sin ${A}° = ${f(Math.cos(site[1]*D2R)*Math.sin(A*D2R),4)}\)`,R`\(i = ${f(i,2)}°\)`]};
});
num("n-rot","lau",0,"Earth-rotation boost",()=>{
  const site=pick([["KSC",28.57],["French Guiana",5.04],["Plesetsk",62.92]]), A=rnd(45,135,5), w=2*Math.PI/86400, dv=w*RE*Math.cos(site[1]*D2R)*Math.sin(A*D2R)*1000;
  return { q:R`Estimate the Earth-rotation velocity gain \(\Delta V_{\omega\oplus}\) for a launch from ${site[0]} (\(\delta = ${site[1]}°\)) at azimuth ${A}°, using \(\omega_\oplus = 2\pi/24\) hr.`, ans:dv, unit:"m/s",
    steps:[R`\(\omega_\oplus R_\oplus = (7.272\times10^{-5})(6371\ \mathrm{km}) = ${f(w*RE*1000,1)}\) m/s`,R`\(\Delta V = \omega_\oplus R_\oplus\cos\delta\sin A = ${f(dv,1)}\) m/s`]};
});
num("n-cover","cov",0,"Coverage fraction",()=>{
  const H=pick([700,1000,20000,35786]), e=pick([0,5,8,10]), x=Math.cos(e*D2R)/(1+H/RE), lam=Math.acos(x)/D2R-e, F=0.5*(1-Math.cos(lam*D2R));
  return { q:R`A satellite at \(H = ${f(H,0)}\) km has a minimum elevation angle \(\varepsilon = ${e}°\). What fraction of Earth's surface is in view (as a %)?`, ans:F*100, unit:"%",
    steps:[R`\(\lambda = \cos^{-1}\!\left(\dfrac{\cos ${e}°}{1+${H}/6371}\right) - ${e}° = ${f(lam,2)}°\)`,R`\(F = \tfrac12(1-\cos\lambda) = ${f(F,4)} = ${f(F*100,2)}\%\)`]};
});
num("n-j2","cov",1,"J₂ nodal regression",()=>{
  const h=rnd(400,1200,50), i=pick([28.5,45,51.6,63.4,98]), e=0, a=6378+h, n=Math.sqrt(MU/(a**3)), Od=-1.5*1.08263e-3*n*Math.pow(6378/(a*(1-e*e)),2)*Math.cos(i*D2R), deg=Od/D2R*86400;
  return { q:R`Find the J₂ nodal regression rate (°/day) for a circular orbit at ${h} km and \(i = ${i}°\). Use \(R_e = 6378\) km.`, ans:deg, unit:"°/day", abs:0.05,
    steps:[R`\(a = ${f(a,0)}\) km; \(n = \sqrt{\mu/a^3} = ${n.toExponential(4)}\) rad/s`,R`\(\dot\Omega = -\tfrac32 J_2 n (R_e/a)^2\cos i = ${Od.toExponential(4)}\) rad/s`,R`\(= ${f(deg,3)}°/\text{day}\)`]};
});

window.AAE = { TOPICS, MC, CARDS, EQ, NUM };
})();

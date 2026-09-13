"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * Full-page fixed SVG spider-web background layer
 * Spans viewport, placed behind all content (pointer-events-none, fixed, z-0)
 * Uses realistic radial + concentric curved spiral web pattern radiating from 3 corner anchors
 * Threads: web-white (~20% opacity, thicker) near anchors, thinning/fading (down to ~5% opacity) toward edges
 * Subtle GSAP sway oscillation + mouse parallax with gsap.quickTo
 */
export default function WebNetBackground() {
  const containerRef = useRef(null);
  const webGroupRef = useRef(null);
  const anchorTopLeftRef = useRef(null);
  const anchorTopRightRef = useRef(null);
  const anchorBottomRightRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const webGroup = webGroupRef.current;
    if (!container || !webGroup) return;

    // GSAP quickTo for smooth 60fps mouse parallax
    const setX = gsap.quickTo(webGroup, "x", { duration: 0.8, ease: "power2.out" });
    const setY = gsap.quickTo(webGroup, "y", { duration: 0.8, ease: "power2.out" });

    const handleMouseMove = (e) => {
      // Shift slightly opposite to cursor (up to 20px)
      const nx = (e.clientX / window.innerWidth - 0.5) * -24;
      const ny = (e.clientY / window.innerHeight - 0.5) * -24;
      setX(nx);
      setY(ny);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // GSAP continuous gentle "sway" oscillation on web anchors/strands
    const ctx = gsap.context(() => {
      if (anchorTopLeftRef.current) {
        gsap.to(anchorTopLeftRef.current, {
          rotation: 1.2,
          transformOrigin: "0% 0%",
          duration: 6,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      }
      if (anchorTopRightRef.current) {
        gsap.to(anchorTopRightRef.current, {
          rotation: -1.4,
          transformOrigin: "100% 0%",
          duration: 7.2,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: 0.5,
        });
      }
      if (anchorBottomRightRef.current) {
        gsap.to(anchorBottomRightRef.current, {
          rotation: 1.5,
          transformOrigin: "100% 100%",
          duration: 6.8,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: 1.2,
        });
      }
    }, container);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
    >
      <svg
        ref={webGroupRef}
        className="w-full h-full will-change-transform"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="none"
        fill="none"
      >
        {/* CORNER ANCHOR 1: TOP-LEFT RADIAL + CONCENTRIC CURVED WEB */}
        <g ref={anchorTopLeftRef} id="web-corner-tl">
          {/* Radial straight spokes radiating from anchor */}
          <line x1="0" y1="0" x2="906.0" y2="159.8" stroke="#F5F5F5" strokeOpacity="0.16" strokeWidth="1.2" />
          <line x1="0" y1="0" x2="840.5" y2="374.2" stroke="#F5F5F5" strokeOpacity="0.16" strokeWidth="1.2" />
          <line x1="0" y1="0" x2="725.0" y2="566.4" stroke="#F5F5F5" strokeOpacity="0.16" strokeWidth="1.2" />
          <line x1="0" y1="0" x2="566.4" y2="725.0" stroke="#F5F5F5" strokeOpacity="0.16" strokeWidth="1.2" />
          <line x1="0" y1="0" x2="374.2" y2="840.5" stroke="#F5F5F5" strokeOpacity="0.16" strokeWidth="1.2" />
          <line x1="0" y1="0" x2="159.8" y2="906.0" stroke="#F5F5F5" strokeOpacity="0.16" strokeWidth="1.2" />

          {/* Concentric curved spiral threads connecting radial spokes (thicker/brighter 20% -> fading 5%) */}
          <path d="M 157.6 27.8 Q 141.2 43.2 146.2 65.1 Q 126.6 76.1 126.1 98.5 Q 104.4 104.4 98.5 126.1 Q 76.1 126.6 65.1 146.2 Q 43.2 141.2 27.8 157.6" stroke="#F5F5F5" strokeOpacity="0.20" strokeWidth="1.5" fill="none" />
          <path d="M 315.1 55.6 Q 282.5 86.4 292.3 130.2 Q 253.2 152.1 252.2 197.0 Q 208.9 208.9 197.0 252.2 Q 152.1 253.2 130.2 292.3 Q 86.4 282.5 55.6 315.1" stroke="#F5F5F5" strokeOpacity="0.16" strokeWidth="1.3" fill="none" />
          <path d="M 492.4 86.8 Q 441.4 134.9 456.8 203.4 Q 395.6 237.7 394.0 307.8 Q 326.4 326.4 307.8 394.0 Q 237.7 395.6 203.4 456.8 Q 134.9 441.4 86.8 492.4" stroke="#F5F5F5" strokeOpacity="0.12" strokeWidth="1.1" fill="none" />
          <path d="M 689.4 121.6 Q 617.9 188.9 639.5 284.7 Q 553.9 332.8 551.6 431.0 Q 456.9 456.9 431.0 551.6 Q 332.8 553.9 284.7 639.5 Q 188.9 617.9 121.6 689.4" stroke="#F5F5F5" strokeOpacity="0.08" strokeWidth="0.9" fill="none" />
          <path d="M 906.0 159.8 Q 812.1 248.3 840.5 374.2 Q 727.9 437.4 725.0 566.4 Q 600.5 600.5 566.4 725.0 Q 437.4 727.9 374.2 840.5 Q 248.3 812.1 159.8 906.0" stroke="#F5F5F5" strokeOpacity="0.05" strokeWidth="0.75" fill="none" />
        </g>

        {/* CORNER ANCHOR 2: TOP-RIGHT RADIAL + CONCENTRIC CURVED WEB */}
        <g ref={anchorTopRightRef} id="web-corner-tr">
          {/* Radial straight spokes radiating from anchor */}
          <line x1="1920" y1="0" x2="1760.2" y2="906.0" stroke="#F5F5F5" strokeOpacity="0.16" strokeWidth="1.2" />
          <line x1="1920" y1="0" x2="1545.8" y2="840.5" stroke="#F5F5F5" strokeOpacity="0.16" strokeWidth="1.2" />
          <line x1="1920" y1="0" x2="1353.6" y2="725.0" stroke="#F5F5F5" strokeOpacity="0.16" strokeWidth="1.2" />
          <line x1="1920" y1="0" x2="1195.0" y2="566.4" stroke="#F5F5F5" strokeOpacity="0.16" strokeWidth="1.2" />
          <line x1="1920" y1="0" x2="1079.5" y2="374.2" stroke="#F5F5F5" strokeOpacity="0.16" strokeWidth="1.2" />
          <line x1="1920" y1="0" x2="1014.0" y2="159.8" stroke="#F5F5F5" strokeOpacity="0.16" strokeWidth="1.2" />

          {/* Concentric curved spiral threads connecting radial spokes (thicker/brighter 20% -> fading 5%) */}
          <path d="M 1892.2 157.6 Q 1876.8 141.2 1854.9 146.2 Q 1843.9 126.6 1821.5 126.1 Q 1815.6 104.4 1793.9 98.5 Q 1793.4 76.1 1773.8 65.1 Q 1778.8 43.2 1762.4 27.8" stroke="#F5F5F5" strokeOpacity="0.20" strokeWidth="1.5" fill="none" />
          <path d="M 1864.4 315.1 Q 1833.6 282.5 1789.8 292.3 Q 1767.9 253.2 1723.0 252.2 Q 1711.1 208.9 1667.8 197.0 Q 1666.8 152.1 1627.7 130.2 Q 1637.5 86.4 1604.9 55.6" stroke="#F5F5F5" strokeOpacity="0.16" strokeWidth="1.3" fill="none" />
          <path d="M 1833.2 492.4 Q 1785.1 441.4 1716.6 456.8 Q 1682.3 395.6 1612.2 394.0 Q 1593.6 326.4 1526.0 307.8 Q 1524.4 237.7 1463.2 203.4 Q 1478.6 134.9 1427.6 86.8" stroke="#F5F5F5" strokeOpacity="0.12" strokeWidth="1.1" fill="none" />
          <path d="M 1798.4 689.4 Q 1731.1 617.9 1635.3 639.5 Q 1587.2 553.9 1489.0 551.6 Q 1463.1 456.9 1368.4 431.0 Q 1366.1 332.8 1280.5 284.7 Q 1302.1 188.9 1230.6 121.6" stroke="#F5F5F5" strokeOpacity="0.08" strokeWidth="0.9" fill="none" />
          <path d="M 1760.2 906.0 Q 1671.7 812.1 1545.8 840.5 Q 1482.6 727.9 1353.6 725.0 Q 1319.5 600.5 1195.0 566.4 Q 1192.1 437.4 1079.5 374.2 Q 1107.9 248.3 1014.0 159.8" stroke="#F5F5F5" strokeOpacity="0.05" strokeWidth="0.75" fill="none" />
        </g>

        {/* CORNER ANCHOR 3: BOTTOM-RIGHT RADIAL + CONCENTRIC CURVED WEB */}
        <g ref={anchorBottomRightRef} id="web-corner-br">
          {/* Radial straight spokes radiating from anchor */}
          <line x1="1920" y1="1080" x2="1053.4" y2="927.2" stroke="#F5F5F5" strokeOpacity="0.16" strokeWidth="1.2" />
          <line x1="1920" y1="1080" x2="1116.1" y2="722.1" stroke="#F5F5F5" strokeOpacity="0.16" strokeWidth="1.2" />
          <line x1="1920" y1="1080" x2="1226.6" y2="538.2" stroke="#F5F5F5" strokeOpacity="0.16" strokeWidth="1.2" />
          <line x1="1920" y1="1080" x2="1378.2" y2="386.6" stroke="#F5F5F5" strokeOpacity="0.16" strokeWidth="1.2" />
          <line x1="1920" y1="1080" x2="1562.1" y2="276.1" stroke="#F5F5F5" strokeOpacity="0.16" strokeWidth="1.2" />
          <line x1="1920" y1="1080" x2="1767.2" y2="213.4" stroke="#F5F5F5" strokeOpacity="0.16" strokeWidth="1.2" />

          {/* Concentric curved spiral threads connecting radial spokes (thicker/brighter 20% -> fading 5%) */}
          <path d="M 1772.3 1054.0 Q 1787.6 1039.5 1783.0 1019.0 Q 1801.3 1008.7 1801.8 987.7 Q 1822.1 982.1 1827.7 961.8 Q 1848.7 961.3 1859.0 943.0 Q 1879.5 947.6 1894.0 932.3" stroke="#F5F5F5" strokeOpacity="0.20" strokeWidth="1.5" fill="none" />
          <path d="M 1624.6 1027.9 Q 1655.2 999.0 1645.9 958.0 Q 1682.6 937.4 1683.6 895.3 Q 1724.2 884.2 1735.3 843.6 Q 1777.4 842.6 1798.0 805.9 Q 1839.0 815.2 1867.9 784.6" stroke="#F5F5F5" strokeOpacity="0.16" strokeWidth="1.3" fill="none" />
          <path d="M 1447.3 996.6 Q 1496.3 950.5 1481.5 884.8 Q 1540.2 851.8 1541.8 784.5 Q 1606.7 766.7 1624.5 701.8 Q 1691.8 700.2 1724.8 641.5 Q 1790.5 656.3 1836.6 607.3" stroke="#F5F5F5" strokeOpacity="0.12" strokeWidth="1.1" fill="none" />
          <path d="M 1250.3 961.9 Q 1319.7 896.5 1298.8 803.4 Q 1382.0 756.7 1384.2 661.4 Q 1476.2 636.2 1501.4 544.2 Q 1596.7 542.0 1643.4 458.8 Q 1736.5 479.7 1801.9 410.3" stroke="#F5F5F5" strokeOpacity="0.08" strokeWidth="0.9" fill="none" />
          <path d="M 1053.4 927.2 Q 1143.2 842.5 1116.1 722.1 Q 1223.7 661.6 1226.6 538.2 Q 1345.6 505.6 1378.2 386.6 Q 1501.6 383.7 1562.1 276.1 Q 1682.5 303.2 1767.2 213.4" stroke="#F5F5F5" strokeOpacity="0.05" strokeWidth="0.75" fill="none" />
        </g>
      </svg>
    </div>
  );
}

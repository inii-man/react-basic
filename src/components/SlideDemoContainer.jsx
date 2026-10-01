import React from 'react';

// Demos 1 - 10
import {
  Slide1Demo, Slide2Demo, Slide3Demo, Slide4Demo, Slide5Demo,
  Slide6Demo, Slide7Demo, Slide8Demo, Slide9Demo, Slide10Demo
} from './demos/SlideDemos1to10';

// Demos 11 - 20
import {
  Slide11Demo, Slide12Demo, Slide13Demo, Slide14Demo, Slide15Demo,
  Slide16Demo, Slide17Demo, Slide18Demo, Slide19Demo, Slide20Demo
} from './demos/SlideDemos11to20';

// Demos 21 - 30
import {
  Slide21Demo, Slide22Demo, Slide23Demo, Slide24Demo, Slide25Demo,
  Slide26Demo, Slide27Demo, Slide28Demo, Slide29Demo, Slide30Demo
} from './demos/SlideDemos21to30';

// Demos 31 - 40
import {
  Slide31Demo, Slide32Demo, Slide33Demo, Slide34Demo, Slide35Demo,
  Slide36Demo, Slide37Demo, Slide38Demo, Slide39Demo, Slide40Demo
} from './demos/SlideDemos31to40';

// Demos 41 - 48
import {
  Slide41Demo, Slide42Demo, Slide43Demo, Slide44Demo, Slide45Demo,
  Slide46Demo, Slide47Demo, Slide48Demo
} from './demos/SlideDemos41to48';

/**
 * SlideDemoContainer.jsx
 * Menghubungkan setiap nomor slide (1 sampai 48) dengan demo interaktif spesifiknya masing-masing.
 */
export default function SlideDemoContainer({ slideNumber, onSelectSlide }) {
  switch (slideNumber) {
    case 1: return <Slide1Demo />;
    case 2: return <Slide2Demo onSelectSlide={onSelectSlide} />;
    case 3: return <Slide3Demo />;
    case 4: return <Slide4Demo />;
    case 5: return <Slide5Demo />;
    case 6: return <Slide6Demo />;
    case 7: return <Slide7Demo />;
    case 8: return <Slide8Demo />;
    case 9: return <Slide9Demo />;
    case 10: return <Slide10Demo />;

    case 11: return <Slide11Demo />;
    case 12: return <Slide12Demo />;
    case 13: return <Slide13Demo />;
    case 14: return <Slide14Demo />;
    case 15: return <Slide15Demo />;
    case 16: return <Slide16Demo />;
    case 17: return <Slide17Demo />;
    case 18: return <Slide18Demo />;
    case 19: return <Slide19Demo />;
    case 20: return <Slide20Demo />;

    case 21: return <Slide21Demo />;
    case 22: return <Slide22Demo />;
    case 23: return <Slide23Demo />;
    case 24: return <Slide24Demo />;
    case 25: return <Slide25Demo />;
    case 26: return <Slide26Demo />;
    case 27: return <Slide27Demo />;
    case 28: return <Slide28Demo />;
    case 29: return <Slide29Demo />;
    case 30: return <Slide30Demo />;

    case 31: return <Slide31Demo />;
    case 32: return <Slide32Demo />;
    case 33: return <Slide33Demo />;
    case 34: return <Slide34Demo />;
    case 35: return <Slide35Demo />;
    case 36: return <Slide36Demo />;
    case 37: return <Slide37Demo />;
    case 38: return <Slide38Demo />;
    case 39: return <Slide39Demo />;
    case 40: return <Slide40Demo />;

    case 41: return <Slide41Demo />;
    case 42: return <Slide42Demo />;
    case 43: return <Slide43Demo />;
    case 44: return <Slide44Demo />;
    case 45: return <Slide45Demo />;
    case 46: return <Slide46Demo />;
    case 47: return <Slide47Demo />;
    case 48: return <Slide48Demo />;

    default:
      return <Slide1Demo />;
  }
}

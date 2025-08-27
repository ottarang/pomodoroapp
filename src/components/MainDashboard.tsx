import React from 'react';
import { QuoteSection } from './QuoteSection';
import { ClockSection } from './ClockSection';
import { ControlsSection } from './ControlsSection';

export function MainDashboard() {
  return (
    <>
      <div className="text-white box-border caret-transparent flex flex-col justify-between p-5 md:flex-row md:p-12">
        <div className="box-border caret-transparent hidden">
          <img src="https://c.animaapp.com/mettnup2ip1rht/assets/icon-11.svg" alt="Icon" className="box-border caret-transparent w-[125px] mb-5 mx-auto md:w-[150px] md:mb-0 md:mx-0" />
        </div>
        <QuoteSection />
      </div>
      
      <ClockSection />
      
      <div className="box-border caret-transparent mb-auto"></div>
      
      <ControlsSection />
      
      <div className="box-border caret-transparent block"></div>
    </>
  );
}

import React from 'react';

export function OnboardingHeader() {
  return (
    <div className="static box-border caret-transparent flex flex-col shrink-0 flex-wrap justify-center max-w-full min-h-[auto] min-w-[auto] w-full mb-4 px-3 left-auto top-auto md:absolute md:block md:min-h-0 md:min-w-0 md:w-3/12 md:left-[52px] md:top-14">
      <img src="https://c.animaapp.com/mettnup2ip1rht/assets/icon-11.svg" alt="Icon" className="box-border caret-transparent w-[125px] mb-5 mx-auto md:w-[150px] md:mb-0 md:mx-0" />
      <div className="box-border caret-transparent hidden w-[150px] mt-0 mx-auto md:ml-0 md:mt-[38px]">
        <div role="progressbar" aria-label="Onboarding progress" className="text-xs bg-white/30 box-border caret-transparent flex h-2 leading-[15px] overflow-hidden rounded-[10px]">
          <div className="text-white bg-white/70 box-border caret-transparent flex flex-col justify-center text-center text-nowrap w-[33%] overflow-hidden rounded-[10px]"></div>
        </div>
        <div className="text-sm box-border caret-transparent leading-[17.5px] text-center mt-3.5 md:text-left">
          Step <span className="box-border caret-transparent text-center md:text-left">1</span> of 4
        </div>
      </div>
    </div>
  );
}

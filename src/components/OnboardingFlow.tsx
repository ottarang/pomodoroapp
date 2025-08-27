import React, { useState } from 'react';
import { OnboardingHeader } from './OnboardingHeader';
import { RegistrationForm } from './RegistrationForm';

export function OnboardingFlow() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    newsletterConsent: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="absolute box-border caret-transparent flex flex-wrap h-[1000px] justify-center z-[10000] overflow-auto -mx-3 p-6 inset-0 md:px-16 md:py-14 after:accent-auto after:backdrop-blur after:box-border after:caret-transparent after:text-gray-50 after:block after:text-base after:not-italic after:normal-nums after:font-normal after:tracking-[normal] after:leading-5 after:list-outside after:list-disc after:absolute after:text-start after:indent-[0px] after:normal-case after:visible after:z-[-1] after:border-separate after:inset-0 after:font-inter">
      <OnboardingHeader />
      <div className="box-border caret-transparent flex flex-col shrink-0 justify-center max-w-full w-full px-3 md:w-[58.3333%]">
        <div className="relative backdrop-blur-[10px] bg-[radial-gradient(98.68%_212.38%_at_1.32%_3.1%,rgba(0,0,0,0.64)_0%,rgba(0,0,0,0.16)_100%)] box-border caret-transparent max-h-[800px] pt-[70px] pb-8 px-[33px] rounded-[30px]">
          <div role="tablist" className="box-border caret-transparent hidden flex-wrap list-none">
            <button type="button" role="tab" className="text-white text-sm font-semibold bg-transparent caret-transparent block leading-[17.5px] text-center p-2 hover:text-violet-700 hover:border-violet-700">Register</button>
            <button type="button" role="tab" className="text-white text-sm font-semibold bg-transparent caret-transparent block leading-[17.5px] text-center p-2 hover:text-violet-700 hover:border-violet-700">Login</button>
            <button type="button" role="tab" className="text-white text-sm font-semibold bg-transparent caret-transparent block leading-[17.5px] text-center p-2 hover:text-violet-700 hover:border-violet-700">Reset</button>
            <button type="button" role="tab" className="text-white text-sm font-semibold bg-transparent caret-transparent block leading-[17.5px] text-center p-2 hover:text-violet-700 hover:border-violet-700">Info</button>
          </div>
          <div className="box-border caret-transparent flex flex-col h-full justify-center min-h-[540px]">
            <div role="tabpanel" className="box-border caret-transparent max-h-[700px] overflow-x-auto overflow-y-scroll">
              <RegistrationForm 
                formData={formData}
                onInputChange={handleInputChange}
                onSubmit={handleSubmit}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

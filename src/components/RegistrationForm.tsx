import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useAppStore } from '../store/useAppStore';

interface RegistrationFormProps {
  formData: {
    name: string;
    email: string;
    password: string;
    newsletterConsent: boolean;
  };
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function RegistrationForm({ formData, onInputChange, onSubmit }: RegistrationFormProps) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="items-center box-border caret-transparent flex flex-col justify-start text-center w-full mx-auto">
      <h1 className="text-5xl font-bold box-border caret-transparent tracking-[-1.28px] leading-[48px] mb-2">Let's get more done ✨</h1>
      <span className="text-lg box-border caret-transparent block tracking-[-0.48px] leading-[22.5px] mt-4 mb-8">Save your setup for peak productivity.</span>
      
      <form onSubmit={onSubmit}>
        <div className="relative items-stretch box-border caret-transparent flex flex-wrap w-[270px] mb-4">
          <input 
            type="text" 
            name="name" 
            placeholder="First name" 
            className="text-white bg-transparent box-border caret-transparent block text-start w-[270px] px-0 py-2 border-t-white border-t-0 border-b-white/50 border-x-white border-x-0"
            value={formData.name}
            onChange={onInputChange}
          />
        </div>
        
        <div className="relative items-stretch box-border caret-transparent flex flex-wrap w-[270px] mb-4">
          <input 
            type="email" 
            name="email" 
            placeholder="name@example.com" 
            className="text-white bg-transparent box-border caret-transparent block text-start w-[270px] px-0 py-2 border-t-white border-t-0 border-b-white/50 border-x-white border-x-0"
            value={formData.email}
            onChange={onInputChange}
          />
          <div className="text-white/70 text-sm box-border caret-transparent hidden leading-[17.5px] text-left -ml-0.5 mt-2">
            Please enter a valid email. If you already have a StudyWithMe.io or FlowZen account{' '}
            <button type="button" role="tab" className="relative text-white bg-transparent caret-transparent tracking-[-0.42px] text-center underline z-[2] p-0 hover:no-underline">log in here</button>.
          </div>
        </div>
        
        <div className="relative items-stretch box-border caret-transparent flex flex-wrap w-[270px] mb-8">
          <input 
            type={showPassword ? "text" : "password"}
            name="password" 
            placeholder="create password" 
            className="text-white bg-transparent box-border caret-transparent block text-start w-[270px] pl-0 pr-10 py-2 border-t-white border-t-0 border-b-white/50 border-x-white border-x-0"
            value={formData.password}
            onChange={onInputChange}
          />
          <button 
            type="button" 
            className="absolute text-black bg-transparent caret-transparent block h-[38px] w-10 z-[100] -ml-0.5 p-0 right-0 top-0"
            onClick={togglePasswordVisibility}
          >
            <img src="https://c.animaapp.com/mettnup2ip1rht/assets/icon-55.svg" alt="Icon" className="absolute box-border caret-transparent translate-x-[-50.0%] w-5 left-2/4 top-1.5" />
          </button>
          <div className="text-white text-xs box-border caret-transparent tracking-[-0.36px] leading-[15.6px] opacity-50 w-full -ml-0.5 mt-2">
            8+ characters, 1 uppercase letter, 1 number
          </div>
        </div>
        
        <div className="items-center box-border caret-transparent flex justify-center w-[270px] mb-6">
          <input 
            type="checkbox" 
            value="" 
            name="newsletterConsent" 
            className="text-black bg-violet-600 bg-[url(data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%2020%2020%27%3e%3cpath%20fill=%27none%27%20stroke=%27%23fff%27%20stroke-linecap=%27round%27%20stroke-linejoin=%27round%27%20stroke-width=%273%27%20d=%27m6%2010%203%203%206-6%27/%3e%3c/svg%3e)] bg-no-repeat bg-contain box-border caret-transparent block shrink-0 h-4 text-start align-top w-4 border-violet-600 bg-center mt-0.5 p-0 rounded-bl rounded-br rounded-tl rounded-tr border-solid"
            checked={formData.newsletterConsent}
            onChange={onInputChange}
          />
          <label className="text-xs box-border caret-transparent block tracking-[-0.36px] leading-[15px] text-left pl-2.5">
            Join our productivity newsletter
          </label>
        </div>
        
        <div className="box-border caret-transparent flex flex-wrap -mx-3">
          <div className="box-border caret-transparent shrink-0 max-w-full w-full px-3">
            <button type="submit" className="text-white text-xl font-semibold bg-violet-600 caret-transparent tracking-[-0.6px] min-w-[180px] align-middle border-violet-600 mb-4 p-3.5 rounded-2xl border-solid font-degular_semibold hover:bg-violet-700 hover:border-violet-700">Continue</button>
          </div>
          <div className="box-border caret-transparent shrink-0 max-w-full w-full px-3">
            <button type="button" className="text-white text-xl font-semibold bg-indigo-950 caret-transparent tracking-[-0.6px] min-w-[180px] align-middle border-indigo-950 mb-6 p-3.5 rounded-2xl border-solid font-degular_semibold hover:bg-zinc-700 hover:border-neutral-700">
              Stay logged out
              <img src="https://c.animaapp.com/mettnup2ip1rht/assets/icon-57.svg" alt="Icon" className="box-border caret-transparent h-3 w-4" />
            </button>
          </div>
        </div>
        
        <p className="text-sm font-medium box-border caret-transparent tracking-[-0.42px] leading-[19.6px] mb-4">
          Have an account?
          <button type="button" role="tab" className="text-white font-normal bg-transparent caret-transparent leading-[17.5px] underline px-1 py-0 rounded-2xl hover:no-underline">Log in</button>
        </p>
        
        <span className="text-white/50 text-[10px] box-border caret-transparent block tracking-[-0.3px] leading-[12.5px] max-w-[170px] mb-6">
          By proceeding, you agree to the{' '}
          <a href="https://flowzen.com/terms" className="box-border caret-transparent underline hover:text-white hover:border-white">Terms of Service</a>
          {' '}and{' '}
          <a href="https://flowzen.com/privacy" className="box-border caret-transparent underline hover:text-white hover:border-white">Privacy Policy</a>.
        </span>
        
        <div className="absolute box-border caret-transparent block origin-[50%_100%] bottom-2 md:hidden">
          <img src="https://c.animaapp.com/mettnup2ip1rht/assets/icon-58.svg" alt="Icon" className="box-border caret-transparent h-6 w-6" />
        </div>
      </form>
    </div>
  );
}

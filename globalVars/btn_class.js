const heightSM = 'h-8';
const heightM = 'h-9';

const base = 'btn no-animation w-24 font-bold text-md rounded-full btn-sm';
const baseDark = 'btn no-animation font-bold text-md rounded-full btn-sm';

const BTN_CLASS = {
  primary: `${base} ${heightM} bg-slate-200 text-slate-900 hover:bg-slate-400`,
  secondary: `${base} ${heightM} bg-sky-500 text-zinc-0 hover:bg-sky-600`,
  secondarySM: `${base} ${heightM} bg-sky-500 text-zinc-0 hover:bg-sky-600`,
  secondaryDisabled: `${base} ${heightM} bg-sky-900 text-teal-600 cursor-default`,
  dark: `${baseDark} ${heightM} bg-stone-1000 w-32 text-blue-50 border border-zinc-500 hover:bg-zinc-800`,
  darkWarningHover: `${baseDark} ${heightM} w-24 bg-stone-1000 text-blue-50 hover:bg-zinc-800 hover:text-red-600`,
  darkWarningHoverSM: `${baseDark} ${heightSM} w-24 bg-stone-1000 text-blue-50 hover:bg-zinc-800 hover:text-red-600`,
  sidebarTweet: 'btn rounded-full bg-sky-500 text-zinc-0 hover:bg-sky-600 h-12 w-12',
  sidebarTweetInactive: 'btn rounded-full bg-sky-900 text-teal-600 hover:bg-sky-600 h-12 w-12 cursor-default btn-disabled',
};

export default BTN_CLASS;

import InfluentialVoice from './InfluentialVoice';
import { INFLUENTIAL_VOICES, LEADERS } from './constants';

function CitizenRightSidebar() {
  return (
    <div className="hidden lg:inline-flex lg:flex-col gap-y-4 w-1/5">
      <div className="w-full p-2 space-y-3">
        <h3 className="text-sm font-bold text-tertiary">Top Voices</h3>
        {INFLUENTIAL_VOICES.map(voice => (
          <InfluentialVoice key={voice.username} {...voice} />
        ))}
      </div>
      <div className="w-full p-2 space-y-3">
        <h3 className="text-sm font-bold text-tertiary">Your Leaders</h3>
        {LEADERS.map(voice => (
          <InfluentialVoice key={voice.username} {...voice} leader />
        ))}
      </div>
    </div>
  );
}

export default CitizenRightSidebar;

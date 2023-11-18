import lightPoll from '../../assets/poll_light.svg';
import darkPoll from '../../assets/ill.svg';

import Button from '../../components/ui/Button';
import { useTheme } from '../../context/theme-provider';

function BarazaPoll() {
  const { theme } = useTheme();
  return (
    <div className="border-r px-4 py-2 flex-1">
      <Button>Create poll</Button>
      <img
        src={theme === 'dark' ? darkPoll : lightPoll}
        alt="Poll illustrator"
        className="w-72 md:w-96 h-auto m-4 md:mx-auto"
      />
      <p className="text-center font-semibold text-muted-foreground">
        No polls created
      </p>
    </div>
  );
}

export default BarazaPoll;

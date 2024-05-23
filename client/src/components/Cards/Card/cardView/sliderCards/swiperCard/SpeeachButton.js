import { IconButton } from '@mui/material';
import useSpeech from '../../../../../../Hooks/useSpeech';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';

const SpeechButton = (props) => {
  const { word } = props;
  const { speak } = useSpeech();
  return (
    <IconButton
      sx={{ position: 'absolute', top: '10px', right: '10px', color: 'white' }}
      onClick={(e) => {
        e.stopPropagation();
        speak(word);
      }}
    >
      <VolumeUpIcon />
    </IconButton>
  );
};
export default SpeechButton;

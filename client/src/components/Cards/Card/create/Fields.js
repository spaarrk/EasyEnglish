import { Box } from '@mui/material';
import Field from './Field';
import { useFieldArray } from 'react-hook-form';
import AddButton from './AddButton';
import { TYPE_TEST_ENM } from '../../../../utils/testConstants';

const Fields = (props) => {
  const { typeTest } = props;
  const { fields, append, remove } = useFieldArray({
    name: 'questions',
  });
  const onDeleteField = (index) => {
    remove(index);
  };
  const answersDefault = [
    {
      isRight: false,
      content: '',
    },
    {
      isRight: false,
      content: '',
    },
    {
      isRight: false,
      content: '',
    },
    {
      isRight: false,
      content: '',
    },
  ];
  const answersCards = [
    {
      isRight: true,
      content: '',
    },
  ];
  const onAddField = () => {
    append({
      question: '',
      ...(typeTest === TYPE_TEST_ENM.DEFAULT
        ? { answers: answersDefault }
        : { answers: answersCards }),
    });
  };
  return (
    <Box sx={{ marginTop: '40px' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {fields.map((field, index) => (
          <Field
            typeTest={typeTest}
            key={field.id}
            index={index}
            field={field}
            onDelete={onDeleteField}
          />
        ))}
      </Box>
      <AddButton onClick={onAddField} />
    </Box>
  );
};
export default Fields;

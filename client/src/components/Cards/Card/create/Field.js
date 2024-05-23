import { Box, Typography } from '@mui/material';
import { CheckboxElement, TextFieldElement, useFormContext } from 'react-hook-form-mui';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { TYPE_TEST_ENM } from '../../../../utils/testConstants';

const Field = (props) => {
  const { field, index, onDelete, typeTest } = props;
  const { watch } = useFormContext();
  const answers = watch(`questions.${index}.answers`);
  const isDefault = typeTest === TYPE_TEST_ENM.DEFAULT;
  return (
    <Box sx={{ width: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '0px 10px 10px',
          borderBottom: '1px solid rgba(0,0,0,0.3)',
        }}
      >
        <Typography>{index + 1}</Typography>
        <DeleteForeverIcon
          sx={{ cursor: 'pointer', ':hover': { fill: 'blue' } }}
          onClick={() => onDelete(index)}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '10px',
          marginTop: '10px',
        }}
      >
        <TextFieldElement
          name={`questions.${index}.question`}
          required
          sx={{ flex: isDefault ? '1 1 100%' : '1 1 auto', minWidth: '300px' }}
          placeholder="question"
        />
        {answers && (
          <>
            {answers.map((oneAnswer, id) => (
              <Box
                key={id}
                sx={{
                  flex: '1 1 auto',
                  minWidth: '300px',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <TextFieldElement
                  name={`questions.${index}.answers.${id}.content`}
                  required
                  placeholder="answer"
                  sx={{ width: isDefault ? '70%' : '100%' }}
                />
                {isDefault && (
                  <CheckboxElement
                    label="isRight"
                    name={`questions.${index}.answers.${id}.isRight`}
                  />
                )}
              </Box>
            ))}
          </>
        )}
      </Box>
    </Box>
  );
};
export default Field;

import { Box, Container, Typography } from '@mui/material';
import { DatePickerElement, FormContainer, useForm } from 'react-hook-form-mui';
import CardStatistics from './CardStatistics';
import dayjs from 'dayjs';
import Chart from 'react-apexcharts';
import useDataChart from './useDataChart';
import { useContext, useEffect, useState } from 'react';
import { Context } from '../../..';
import { getDashboard } from '../../../http/userProgresAPI';
import Loader from '../../UI/Loader/Loade';
import { observer } from 'mobx-react-lite';
const info = [
  { id: 0, title: 'Number of completed tests', fieldName: 'countAttempts' },
  { id: 1, title: 'Successfully completed tests', fieldName: 'countRightAnswers' },
  { id: 2, title: 'Number of learned modules ', fieldName: 'testCount' },
  { id: 3, title: 'Number of learned topics ', fieldName: 'vocabularyCount' },
];
const UserStatistics = observer(() => {
  const { userStore } = useContext(Context);
  console.log('userStore = ', userStore);
  const [loading, setLoading] = useState(false);
  const [dataDashboard, setDataDashboard] = useState({});
  const { series, options } = useDataChart(dataDashboard);
  const form = useForm({
    defaultValues: {
      from: dayjs(new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000)),
      to: dayjs(new Date()),
    },
  });
  const from = form.watch('from');
  const to = form.watch('to');
  useEffect(() => {
    const fetch = async () => {
      const payload = {
        from,
        to,
        userId: userStore.user.id,
      };
      setLoading(true);
      getDashboard(payload)
        .then((data) => {
          setDataDashboard(data);
        })
        .finally(() => setLoading(false));
    };
    fetch();
  }, [from, to]);
  return (
    <Container>
      <FormContainer formContext={form}>
        <Typography
          sx={{ fontSize: { xs: '26px', md: '32px' }, fontWeight: 700, marginTop: '66px' }}
        >
          Statistics
        </Typography>
        {/* filters */}
        <Box sx={{ display: 'flex', gap: '20px', marginTop: '30px' }}>
          <DatePickerElement label="from" name="from" />
          <DatePickerElement label="to" name="to" />
        </Box>
      </FormContainer>
      {/* Cards info */}
      <Box
        sx={{
          display: 'grid',
          gap: '15px',
          marginTop: '30px',
          gridTemplateColumns: {
            xs: 'repeat(auto-fit, minmax(243px, 1fr));',
            lg: 'repeat(auto-fit, minmax(243px, 0fr));',
          },
        }}
      >
        {info.map((oneItem) => (
          <CardStatistics
            loading={loading}
            key={oneItem.id}
            {...oneItem}
            value={dataDashboard[oneItem.fieldName]}
          />
        ))}
      </Box>
      {loading ? (
        <Loader />
      ) : (
        <Box sx={{ marginTop: '56px' }} id="chart">
          <Chart options={options} series={series} type="bar" height={350} />
        </Box>
      )}
    </Container>
  );
});
export default UserStatistics;

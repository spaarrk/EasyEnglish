const useDataChart = (props) => {
  const { chartData } = props;
  // const data1 = [
  //   { x: new Date('2024-05-01'), y: 30 },
  //   { x: new Date('2024-05-02'), y: 40 },
  //   { x: new Date('2024-05-03'), y: 35 },
  //   { x: new Date('2024-05-04'), y: 45 },
  //   { x: new Date('2024-05-05'), y: 50 },
  // ];

  // const data2 = [
  //   { x: new Date('2024-05-01'), y: 20 },
  //   { x: new Date('2024-05-02'), y: 35 },
  //   { x: new Date('2024-05-03'), y: 25 },
  //   { x: new Date('2024-05-04'), y: 30 },
  //   { x: new Date('2024-05-05'), y: 40 },
  // ];
  const currentDate = (mas) => {
    return mas.map((oneItem) => ({ ...oneItem, x: new Date(oneItem.x) }));
  };

  const options = {
    chart: {
      type: 'bar',
      height: 350,
      stacked: false,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '40%',
        endingShape: 'flat',
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      type: 'datetime',
      labels: {
        format: 'dd MMM',
      },
    },
    yaxis: {
      title: {
        text: 'Values',
      },
    },
    tooltip: {
      x: {
        format: 'dd MMM yyyy',
      },
    },
  };

  const series = [
    {
      name: 'Tests',
      data: chartData?.firstDataSet
        ? currentDate(chartData.firstDataSet).map((item) => [item.x.getTime(), item.y])
        : [],
    },
    {
      name: 'Cards',
      data: chartData?.secondDataSet
        ? currentDate(chartData.secondDataSet).map((item) => [item.x.getTime(), item.y])
        : [],
    },
  ];
  return {
    options,
    series,
  };
};

export default useDataChart;

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import useMediaQuery from '@/hooks/useMediaQuery';

interface CompetencyData {
  name: string;
  value: number;
  color: string;
}

const CoreCompetencyChart: React.FC = () => {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  
  const data: CompetencyData[] = [
    { name: '성실성', value: 20, color: '#61A7DD' },
    { name: '소통역량', value: 20, color: '#036B3F' },
    { name: '창의역량', value: 10, color: '#F6DB00' },
    { name: '종합적사고력', value: 20, color: '#9E9E9E' },
    { name: '주도성', value: 20, color: '#B0B0B0' },
    { name: '글로벌시민의식', value: 10, color: '#C283C6' },
  ];

  // Filter out 0 values for pie chart but keep them for legend
  const chartData = data.filter(item => item.value > 0);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length > 0) {
      const dataItem = payload[0];
      if (dataItem && dataItem.value !== undefined && dataItem.name !== undefined) {
        return (
          <div className="bg-white p-2 shadow-lg rounded border border-gray-200">
            <p className="text-xs font-semibold">{`${dataItem.name}: ${dataItem.value}%`}</p>
          </div>
        );
      }
    }
    return null;
  };


  return (
    <div className="p-4 bg-white rounded-2xl shadow-[0px_3px_8px_-1px_rgba(50,50,71,0.05)] border border-gray-100">
      <div className={`text-gray-900 ${isDesktop ? 'text-base' : 'text-sm'} font-bold font-['Noto_Sans'] mb-4`}>
        핵심역량
      </div>
      <div className={`${isDesktop ? 'h-56' : 'h-48'} flex flex-col items-center`}>
        <ResponsiveContainer width="100%" height="60%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              innerRadius={isDesktop ? 30 : 25}
              outerRadius={isDesktop ? 50 : 40}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} opacity={entry.color === '#9E9E9E' || entry.color === '#B0B0B0' ? 0.7 : 0.6} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        <div className="grid grid-cols-3 gap-x-3 gap-y-1 mt-2 text-center">
          {data.map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="flex items-center gap-1">
                <div 
                  className="w-2 h-2 rounded-full" 
                  style={{ 
                    backgroundColor: item.color, 
                    opacity: item.value === 0 ? 0.3 : (item.color === '#9E9E9E' || item.color === '#B0B0B0' ? 0.7 : 0.6)
                  }}
                />
                <span className={`text-zinc-800 ${isDesktop ? 'text-sm' : 'text-xs'} font-semibold font-['Inter'] leading-none`}>
                  {item.value}%
                </span>
              </div>
              <span className={`text-slate-500 ${isDesktop ? 'text-xs' : 'text-[10px]'} font-normal font-['Inter'] whitespace-nowrap`}>
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoreCompetencyChart;
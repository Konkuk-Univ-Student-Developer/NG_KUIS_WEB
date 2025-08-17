import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import useMediaQuery from '@/hooks/useMediaQuery';

interface BLearningData {
  name: string;
  value: number;
  color: string;
}

const BLearningChart: React.FC = () => {
  const isTablet = useMediaQuery('(min-width: 768px)');
  
  const data: BLearningData[] = [
    { name: '대면', value: 8, color: '#61A7DD' },
    { name: '녹화', value: 4, color: '#F6DB00' },
    { name: '실시간', value: 4, color: '#036B3F' },
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length > 0) {
      const dataItem = payload[0];
      if (dataItem && dataItem.value !== undefined && dataItem.name !== undefined) {
        return (
          <div className="bg-white p-2 shadow-lg rounded border border-gray-200">
            <p className="text-xs font-semibold">{`${dataItem.name}: ${dataItem.value}주`}</p>
          </div>
        );
      }
    }
    return null;
  };


  return (
    <div className="p-4 bg-white rounded-2xl shadow-[0px_3px_8px_-1px_rgba(50,50,71,0.05)] border border-gray-100">
      <div className={`text-gray-900 ${isTablet ? 'text-base' : 'text-sm'} font-bold font-['Noto_Sans'] mb-4`}>
        B러닝(녹화+대면)
      </div>
      <div className={`${isTablet ? 'h-48' : 'h-48'} flex flex-col items-center`}>
        <ResponsiveContainer width="100%" height="70%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              innerRadius={isTablet ? 25 : 25}
              outerRadius={isTablet ? 45 : 40}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} opacity={0.6} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        <div className={`flex gap-3 mt-2 ${isTablet ? 'min-h-[48px] items-center justify-center' : ''}`}>
          {data.map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="flex items-center gap-1">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: item.color, opacity: 0.6 }}
                />
                <span className={`text-zinc-800 ${isTablet ? 'text-sm' : 'text-xs'} font-semibold font-['Inter'] leading-none`}>
                  {item.value}주
                </span>
              </div>
              <span className={`text-slate-500 ${isTablet ? 'text-xs' : 'text-[10px]'} font-normal font-['Inter']`}>
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BLearningChart;
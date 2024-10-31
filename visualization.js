// visualization.js

const {
  Card,
  CardHeader,
  CardTitle,
  CardContent
} = (() => {
  // Simple Card components using Tailwind CSS
  return {
    Card: ({ children, className }) => <div className={`bg-white shadow rounded-lg ${className}`}>{children}</div>,
    CardHeader: ({ children }) => <div className="px-6 py-4 border-b">{children}</div>,
    CardTitle: ({ children }) => <h2 className="text-xl font-semibold">{children}</h2>,
    CardContent: ({ children }) => <div className="px-6 py-4">{children}</div>,
  };
})();

const {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Label,
  ReferenceLine,
  BarChart,
  Bar
} = Recharts;

const RDIntensityOverview = () => {
  // Data for Scatter Chart
  const pharmaCompanies = [
    { name: "Merck & Co.", rd_2022: 22.85, rd_2023: 50.79 },
    { name: "Eli Lilly", rd_2022: 25.19, rd_2023: 27.29 },
    { name: "Roche", rd_2022: 20.6, rd_2023: 24.87 },
    { name: "Novo Nordisk", rd_2022: 10.86, rd_2023: 13.97 },
    { name: "Moderna", rd_2022: 10.78, rd_2023: 70.75 },
    { name: "BioNTech", rd_2022: 8.88, rd_2023: 46.69 },
    { name: "Sanofi", rd_2022: 15.6, rd_2023: 13.81 },
    { name: "Novartis", rd_2022: 19.78, rd_2023: 21.91 },
    { name: "GSK", rd_2022: 18.41, rd_2023: 15.31 },
    { name: "Pfizer", rd_2022: 11.39, rd_2023: 22.05 },
    { name: "AstraZeneca", rd_2022: 22.01, rd_2023: 20.76 }
  ];

  const medtechCompanies = [
    { name: "Medtronic", rd_2022: 8.63, rd_2023: 8.45 },
    { name: "Stryker", rd_2022: 7.88, rd_2023: 6.77 },
    { name: "Boston Scientific", rd_2022: 10.43, rd_2023: 9.93 },
    { name: "Intuitive Surgical", rd_2022: 14.13, rd_2023: 14.02 },
    { name: "Siemens Healthineers", rd_2022: 8.22, rd_2023: 8.61 }
  ];

  const pharmaAvg2022 = 16.94;
  const pharmaAvg2023 = 29.84;
  const medtechAvg2022 = 9.86;
  const medtechAvg2023 = 9.56;

  // Transform data for Scatter Chart
  const pharmaData2022 = pharmaCompanies.map(company => ({
    x: 2022,
    y: company.rd_2022,
    name: company.name,
    sector: 'Pharma'
  }));

  const pharmaData2023 = pharmaCompanies.map(company => ({
    x: 2023,
    y: company.rd_2023,
    name: company.name,
    sector: 'Pharma'
  }));

  const medtechData2022 = medtechCompanies.map(company => ({
    x: 2022,
    y: company.rd_2022,
    name: company.name,
    sector: 'Medtech'
  }));

  const medtechData2023 = medtechCompanies.map(company => ({
    x: 2023,
    y: company.rd_2023,
    name: company.name,
    sector: 'Medtech'
  }));

  // Custom Tooltip for Scatter Chart
  const CustomScatterTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 border rounded shadow">
          <p className="font-bold">{data.name}</p>
          <p>R&D Intensity: {data.y.toFixed(2)}%</p>
          <p>Year: {data.x}</p>
          <p>Sector: {data.sector}</p>
        </div>
      );
    }
    return null;
  };

  // Data for Bar Chart
  const detailedData = [
    { 
      name: 'Merck & Co.',
      rd_2022: 22.85,
      rd_2023: 50.79,
      sector: 'Pharma',
      isOutlier: true
    },
    { 
      name: 'Moderna',
      rd_2022: 10.78,
      rd_2023: 70.75,
      sector: 'Pharma',
      isOutlier: true
    },
    { 
      name: 'BioNTech',
      rd_2022: 8.88,
      rd_2023: 46.69,
      sector: 'Pharma',
      isOutlier: true
    },
    { 
      name: 'Eli Lilly',
      rd_2022: 25.19,
      rd_2023: 27.29,
      sector: 'Pharma'
    },
    { 
      name: 'Roche',
      rd_2022: 20.6,
      rd_2023: 24.87,
      sector: 'Pharma'
    },
    { 
      name: 'Pfizer',
      rd_2022: 11.39,
      rd_2023: 22.05,
      sector: 'Pharma'
    },
    { 
      name: 'Intuitive Surgical',
      rd_2022: 14.13,
      rd_2023: 14.02,
      sector: 'Medtech'
    },
    { 
      name: 'Boston Scientific',
      rd_2022: 10.43,
      rd_2023: 9.93,
      sector: 'Medtech'
    },
    { 
      name: 'Medtronic',
      rd_2022: 8.63,
      rd_2023: 8.45,
      sector: 'Medtech'
    }
  ].sort((a, b) => b.rd_2023 - a.rd_2023); // Sort by 2023 values

  // Custom Tooltip for Bar Chart
  const CustomBarTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const change = data.rd_2023 - data.rd_2022;
      return (
        <div className="bg-white p-4 border rounded shadow">
          <p className="font-bold">{data.name}</p>
          <p>2022: {data.rd_2022}%</p>
          <p>2023: {data.rd_2023}%</p>
          <p>Change: {change.toFixed(1)}%</p>
          <p>Sector: {data.sector}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8">
      {/* R&D Intensity Comparison */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle>R&D Intensity Comparison: Pharma vs. Medtech (2022-2023)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-auto">
            <ScatterChart
              width={800}
              height={400}
              margin={{ top: 20, right: 20, bottom: 40, left: 60 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                type="number"
                dataKey="x"
                domain={[2021.5, 2023.5]}
                ticks={[2022, 2023]}
                name="Year"
              >
                <Label value="Year" offset={-10} position="insideBottom" />
              </XAxis>
              <YAxis
                type="number"
                dataKey="y"
                name="R&D Intensity (%)"
                domain={[0, 80]}
              >
                <Label
                  value="R&D Intensity (%)"
                  angle={-90}
                  position="insideLeft"
                  style={{ textAnchor: 'middle' }}
                />
              </YAxis>
              <Tooltip content={<CustomScatterTooltip />} />
              <Legend />
  
              {/* Average lines */}
              <ReferenceLine
                segment={[{x: 2022, y: pharmaAvg2022}, {x: 2023, y: pharmaAvg2023}]}
                stroke="#8884d8"
                strokeDasharray="5 5"
                label={{ value: "Pharma Avg", position: "right" }}
              />
              <ReferenceLine
                segment={[{x: 2022, y: medtechAvg2022}, {x: 2023, y: medtechAvg2023}]}
                stroke="#82ca9d"
                strokeDasharray="5 5"
                label={{ value: "Medtech Avg", position: "right" }}
              />
  
              {/* Data points */}
              <Scatter
                name="Pharma 2022"
                data={pharmaData2022}
                fill="#8884d8"
                shape="circle"
              />
              <Scatter
                name="Pharma 2023"
                data={pharmaData2023}
                fill="#8884d8"
                shape="diamond"
              />
              <Scatter
                name="Medtech 2022"
                data={medtechData2022}
                fill="#82ca9d"
                shape="circle"
              />
              <Scatter
                name="Medtech 2023"
                data={medtechData2023}
                fill="#82ca9d"
                shape="diamond"
              />
            </ScatterChart>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            <p>Key observations:</p>
            <ul className="list-disc pl-5">
              <li>Pharma sector showed significant R&D intensity increase from 2022 (16.94%) to 2023 (29.84%)</li>
              <li>Merck & Co. and Moderna led with R&D intensity in 2023 (50.79% and 70.75% respectively) yet Merck counted its $10.2 billion acquisition of Prometheus Biosciences as an R&D expense.</li>
              <li>Medtech sector remained stable around 9-10% R&D intensity</li>
              <li>Notable increases in BioNTech (46.69%) and Pfizer (22.05%) for 2023</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* R&D Detailed View */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle>R&D Detailed View: Key Companies (2022-2023)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-auto">
            <BarChart
              width={800}
              height={400}
              data={detailedData}
              margin={{ top: 20, right: 30, left: 150, bottom: 60 }}
              layout="vertical"
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                type="number" 
                domain={[0, 80]}
                label={{ 
                  value: 'R&D Intensity (%)', 
                  position: 'bottom', 
                  offset: 0 
                }}
              />
              <YAxis 
                dataKey="name" 
                type="category" 
                width={180}
              />
              <Tooltip content={<CustomBarTooltip />} />
              <Legend />
              <Bar 
                dataKey="rd_2022" 
                fill="#94a3b8" 
                name="2022" 
              />
              <Bar 
                dataKey="rd_2023" 
                fill="#3b82f6" 
                name="2023" 
              />
            </BarChart>
          </div>
          <div className="mt-6 p-4 bg-gray-50 rounded-lg text-sm">
            <h3 className="font-bold mb-2">Key Context: Merck's 2023 R&D Intensity Spike</h3>
            <p className="mb-2">Merck's dramatic increase in R&D intensity (50.79%) was driven by $16.9B in strategic investments:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>$10.2B Prometheus Biosciences acquisition</li>
              <li>$5.5B Daiichi Sankyo collaboration</li>
              <li>$1.2B Imago BioSciences acquisition</li>
            </ul>
            <p className="mt-2 text-gray-600 italic">Note: These investments were classified as R&D expenses rather than traditional M&A, significantly impacting the reported R&D intensity.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Render the component
ReactDOM.render(<RDIntensityOverview />, document.getElementById('root'));

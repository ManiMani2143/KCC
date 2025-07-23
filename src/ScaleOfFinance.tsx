import React, { useState } from 'react';
import { Calculator, Plus, Minus, Save, FileText, Search } from 'lucide-react';

interface CropFinance {
  id: string;
  cropName: string;
  season: string;
  acreage: string;
  seedCost: string;
  fertilizerCost: string;
  pesticideCost: string;
  laborCost: string;
  irrigationCost: string;
  machineryRent: string;
  otherCosts: string;
  totalCost: number;
  expectedYield: string;
  marketRate: string;
  expectedIncome: number;
  netProfit: number;
}

const ScaleOfFinance: React.FC = () => {
  const [memberNumber, setMemberNumber] = useState('');
  const [memberName, setMemberName] = useState('');
  const [village, setVillage] = useState('');
  const [totalLandArea, setTotalLandArea] = useState('');
  
  const [crops, setCrops] = useState<CropFinance[]>([
    {
      id: '1',
      cropName: '',
      season: '',
      acreage: '',
      seedCost: '',
      fertilizerCost: '',
      pesticideCost: '',
      laborCost: '',
      irrigationCost: '',
      machineryRent: '',
      otherCosts: '',
      totalCost: 0,
      expectedYield: '',
      marketRate: '',
      expectedIncome: 0,
      netProfit: 0,
    }
  ]);

  const cropOptions = [
    'Groundnut', 'Onion', 'Rice', 'Maize', 'Cotton', 'Wheat', 'Sugarcane', 
    'Tomato', 'Chili', 'Turmeric', 'Banana', 'Coconut'
  ];

  const seasonOptions = ['Kharif', 'Rabi', 'Summer', 'Perennial'];

  const calculateCropFinance = (crop: CropFinance): CropFinance => {
    const totalCost = 
      Number(crop.seedCost || 0) +
      Number(crop.fertilizerCost || 0) +
      Number(crop.pesticideCost || 0) +
      Number(crop.laborCost || 0) +
      Number(crop.irrigationCost || 0) +
      Number(crop.machineryRent || 0) +
      Number(crop.otherCosts || 0);

    const expectedIncome = Number(crop.expectedYield || 0) * Number(crop.marketRate || 0);
    const netProfit = expectedIncome - totalCost;

    return {
      ...crop,
      totalCost,
      expectedIncome,
      netProfit,
    };
  };

  const updateCrop = (id: string, field: keyof CropFinance, value: string) => {
    setCrops(prevCrops =>
      prevCrops.map(crop => {
        if (crop.id === id) {
          const updatedCrop = { ...crop, [field]: value };
          return calculateCropFinance(updatedCrop);
        }
        return crop;
      })
    );
  };

  const addCrop = () => {
    const newCrop: CropFinance = {
      id: Date.now().toString(),
      cropName: '',
      season: '',
      acreage: '',
      seedCost: '',
      fertilizerCost: '',
      pesticideCost: '',
      laborCost: '',
      irrigationCost: '',
      machineryRent: '',
      otherCosts: '',
      totalCost: 0,
      expectedYield: '',
      marketRate: '',
      expectedIncome: 0,
      netProfit: 0,
    };
    setCrops([...crops, newCrop]);
  };

  const removeCrop = (id: string) => {
    if (crops.length > 1) {
      setCrops(crops.filter(crop => crop.id !== id));
    }
  };

  const getTotalFinancials = () => {
    return crops.reduce(
      (totals, crop) => ({
        totalCost: totals.totalCost + crop.totalCost,
        totalIncome: totals.totalIncome + crop.expectedIncome,
        totalProfit: totals.totalProfit + crop.netProfit,
      }),
      { totalCost: 0, totalIncome: 0, totalProfit: 0 }
    );
  };

  const handleSave = () => {
    if (!memberNumber || !memberName) {
      alert('Please enter member number and name');
      return;
    }

    const scaleData = {
      memberNumber,
      memberName,
      village,
      totalLandArea,
      crops,
      totals: getTotalFinancials(),
      timestamp: new Date().toISOString(),
    };

    // Here you would typically save to your data context or API
    console.log('Scale of Finance Data:', scaleData);
    alert('Scale of Finance saved successfully!');
  };

  const generateReport = () => {
    alert('Report generation feature will be implemented');
  };

  const totals = getTotalFinancials();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Scale of Finance</h1>
        <div className="flex space-x-4">
          <button
            onClick={generateReport}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <FileText className="w-4 h-4 mr-2" />
            Generate Report
          </button>
          <button
            onClick={handleSave}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
          >
            <Save className="w-4 h-4 mr-2" />
            Save
          </button>
        </div>
      </div>

      {/* Member Information */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Member Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Member Number <span className="text-red-500">*</span>
            </label>
            <div className="flex">
              <input
                type="text"
                value={memberNumber}
                onChange={(e) => setMemberNumber(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
              <button
                type="button"
                className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition-colors duration-200"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Member Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={memberName}
              onChange={(e) => setMemberName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Village
            </label>
            <input
              type="text"
              value={village}
              onChange={(e) => setVillage(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Total Land Area (Acres)
            </label>
            <input
              type="number"
              step="0.01"
              value={totalLandArea}
              onChange={(e) => setTotalLandArea(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Crop-wise Finance Calculation */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Crop-wise Finance Calculation</h2>
          <button
            onClick={addCrop}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Crop
          </button>
        </div>

        <div className="space-y-6">
          {crops.map((crop, index) => (
            <div key={crop.id} className="border border-gray-200 rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-800">Crop {index + 1}</h3>
                {crops.length > 1 && (
                  <button
                    onClick={() => removeCrop(crop.id)}
                    className="text-red-600 hover:text-red-700 transition-colors duration-200"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Crop Name
                  </label>
                  <select
                    value={crop.cropName}
                    onChange={(e) => updateCrop(crop.id, 'cropName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">Select Crop</option>
                    {cropOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Season
                  </label>
                  <select
                    value={crop.season}
                    onChange={(e) => updateCrop(crop.id, 'season', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">Select Season</option>
                    {seasonOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Acreage
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={crop.acreage}
                    onChange={(e) => updateCrop(crop.id, 'acreage', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expected Yield (Qtl)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={crop.expectedYield}
                    onChange={(e) => updateCrop(crop.id, 'expectedYield', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Cost Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Seed Cost (₹)
                  </label>
                  <input
                    type="number"
                    value={crop.seedCost}
                    onChange={(e) => updateCrop(crop.id, 'seedCost', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fertilizer Cost (₹)
                  </label>
                  <input
                    type="number"
                    value={crop.fertilizerCost}
                    onChange={(e) => updateCrop(crop.id, 'fertilizerCost', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pesticide Cost (₹)
                  </label>
                  <input
                    type="number"
                    value={crop.pesticideCost}
                    onChange={(e) => updateCrop(crop.id, 'pesticideCost', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Labor Cost (₹)
                  </label>
                  <input
                    type="number"
                    value={crop.laborCost}
                    onChange={(e) => updateCrop(crop.id, 'laborCost', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Irrigation Cost (₹)
                  </label>
                  <input
                    type="number"
                    value={crop.irrigationCost}
                    onChange={(e) => updateCrop(crop.id, 'irrigationCost', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Machinery Rent (₹)
                  </label>
                  <input
                    type="number"
                    value={crop.machineryRent}
                    onChange={(e) => updateCrop(crop.id, 'machineryRent', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Other Costs (₹)
                  </label>
                  <input
                    type="number"
                    value={crop.otherCosts}
                    onChange={(e) => updateCrop(crop.id, 'otherCosts', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Market Rate (₹/Qtl)
                  </label>
                  <input
                    type="number"
                    value={crop.marketRate}
                    onChange={(e) => updateCrop(crop.id, 'marketRate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Calculation Results */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50 p-4 rounded-lg">
                <div className="text-center">
                  <div className="text-sm font-medium text-gray-500">Total Cost</div>
                  <div className="text-lg font-bold text-red-600">
                    ₹{crop.totalCost.toLocaleString('en-IN')}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-medium text-gray-500">Expected Income</div>
                  <div className="text-lg font-bold text-blue-600">
                    ₹{crop.expectedIncome.toLocaleString('en-IN')}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-medium text-gray-500">Net Profit</div>
                  <div className={`text-lg font-bold ${crop.netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    ₹{crop.netProfit.toLocaleString('en-IN')}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <Calculator className="w-5 h-5 mr-2 text-green-600" />
          Financial Summary
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-red-50 p-6 rounded-lg text-center">
            <div className="text-sm font-medium text-red-700 mb-2">Total Investment Required</div>
            <div className="text-3xl font-bold text-red-600">
              ₹{totals.totalCost.toLocaleString('en-IN')}
            </div>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg text-center">
            <div className="text-sm font-medium text-blue-700 mb-2">Expected Total Income</div>
            <div className="text-3xl font-bold text-blue-600">
              ₹{totals.totalIncome.toLocaleString('en-IN')}
            </div>
          </div>
          <div className={`p-6 rounded-lg text-center ${totals.totalProfit >= 0 ? 'bg-green-50' : 'bg-red-50'}`}>
            <div className={`text-sm font-medium mb-2 ${totals.totalProfit >= 0 ? 'text-green-700' : 'text-red-700'}`}>
              Net Profit/Loss
            </div>
            <div className={`text-3xl font-bold ${totals.totalProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              ₹{totals.totalProfit.toLocaleString('en-IN')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScaleOfFinance;
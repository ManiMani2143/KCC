@@ .. @@
   timestamp: string;
 }
 
+export interface ScaleOfFinance {
+  id: string;
+  memberNumber: string;
+  memberName: string;
+  village: string;
+  totalLandArea: string;
+  crops: CropFinance[];
+  totals: {
+    totalCost: number;
+    totalIncome: number;
+    totalProfit: number;
+  };
+  timestamp: string;
+}
+
+export interface CropFinance {
+  id: string;
+  cropName: string;
+  season: string;
+  acreage: string;
+  seedCost: string;
+  fertilizerCost: string;
+  pesticideCost: string;
+  laborCost: string;
+  irrigationCost: string;
+  machineryRent: string;
+  otherCosts: string;
+  totalCost: number;
+  expectedYield: string;
+  marketRate: string;
+  expectedIncome: number;
+  netProfit: number;
+}
+
 export interface Stats {
   totalMembers: number;
   totalLoanAmount: number;
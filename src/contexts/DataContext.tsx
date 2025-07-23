@@ .. @@
 import React, { createContext, useContext, useState, ReactNode } from 'react';
-import { Member, KCCApplication, Stats } from '../types';
+import { Member, KCCApplication, ScaleOfFinance, Stats } from '../types';
 
 interface DataContextType {
   members: Member[];
   kccApplications: KCCApplication[];
+  scaleOfFinanceRecords: ScaleOfFinance[];
   addMember: (member: Omit<Member, 'id'>) => void;
   deleteMember: (id: string) => void;
   addKCCApplication: (application: Omit<KCCApplication, 'id'>) => void;
+  addScaleOfFinance: (record: Omit<ScaleOfFinance, 'id'>) => void;
   getStats: () => Stats;
 }
@@ .. @@
 export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
   const [members, setMembers] = useState<Member[]>([]);
   const [kccApplications, setKCCApplications] = useState<KCCApplication[]>([]);
+  const [scaleOfFinanceRecords, setScaleOfFinanceRecords] = useState<ScaleOfFinance[]>([]);
 
   const addMember = (memberData: Omit<Member, 'id'>) => {
@@ .. @@
     setKCCApplications(prev => [...prev, { ...applicationData, id: Date.now().toString() }]);
   };
 
+  const addScaleOfFinance = (recordData: Omit<ScaleOfFinance, 'id'>) => {
+    setScaleOfFinanceRecords(prev => [...prev, { ...recordData, id: Date.now().toString() }]);
+  };
+
   const getStats = (): Stats => {
@@ .. @@
     return {
       members,
       kccApplications,
+      scaleOfFinanceRecords,
       addMember,
       deleteMember,
       addKCCApplication,
+      addScaleOfFinance,
       getStats,
     };
   }, [members, kccApplications]);
@@ .. @@
 import AddMember from './components/AddMember';
 import MemberList from './components/MemberList';
 import KCCApplication from './components/KCCApplication';
+import ScaleOfFinance from './components/ScaleOfFinance';
 import { AuthProvider } from './contexts/AuthContext';
 import { DataProvider } from './contexts/DataContext';
 import ProtectedRoute from './components/ProtectedRoute';
@@ .. @@
               <Route path="/members" element={<MemberList />} />
               <Route path="/add-member" element={<AddMember />} />
               <Route path="/kcc" element={<KCCApplication />} />
+              <Route path="/scale-of-finance" element={<ScaleOfFinance />} />
             </Routes>
           </div>
         </div>
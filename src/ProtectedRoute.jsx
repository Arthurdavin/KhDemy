// import { Navigate, Outlet } from "react-router-dom";
// import { useSelector } from "react-redux";

// export default function ProtectedRoute({ allowedRoles }) {
//   const user = useSelector((state) => state.auth.user);

//   if (!user) {
//     // Not logged in
//     return <Navigate to="/login" replace />;
//   }

//   if (allowedRoles && !allowedRoles.includes(user.role)) {
//     // Role not allowed
//     return <Navigate to="/" replace />;
//   }

//   return <Outlet />;
// }

import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

// Supports two usage patterns:
//
// Pattern A — layout route (Outlet):
//   <Route element={<ProtectedRoute allowedRoles={["teacher"]} />}>
//     <Route path="/all-courses" element={<AllCourse />} />
//   </Route>
//
// Pattern B — wrapper (children):
//   <ProtectedRoute roles={["teacher"]}>
//     <CreateCourse />
//   </ProtectedRoute>

export default function ProtectedRoute({ children, roles, allowedRoles }) {
  const { accessToken, access_token, user } = useSelector((state) => state.auth);

  // ✅ support both token field names
  const token = accessToken || access_token;

  // Not logged in → redirect to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // ✅ support both prop names: roles and allowedRoles
  const requiredRoles = roles ?? allowedRoles;

  // Role check
  if (requiredRoles && requiredRoles.length > 0) {
    const userRole = user?.role;
    if (!userRole || !requiredRoles.includes(userRole)) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  // Pattern A → no children passed, render nested routes via Outlet
  // Pattern B → children passed, render them directly
  return children ? children : <Outlet />;
}
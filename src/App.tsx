/* import "bootstrap/dist/css/bootstrap.min.css"; */
import { Navigate, Route, Routes } from "react-router-dom";

function App() {
	return (
	<Routes>
		<Route path="/" element={<h1>Hi</h1>} />
		<Route path="/new" element={<h1>Home</h1>} />
    <Route path="/:id">
      <Route index element={<h1>Show</h1>}/>
      <Route path="edit" element={<h1>Edit</h1>}/>
    </Route>
		{/* matches everything, redirects to the set page (i.e home) */}
		<Route path="*" element={<Navigate to={"/"} />}></Route>
	</Routes>
  )
}
export default App;

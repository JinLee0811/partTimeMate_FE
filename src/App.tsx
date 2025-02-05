import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
// import JobList from "./pages/jobs/JobList";
// import JobDetail from "./pages/jobs/JobDetail";
// import CompanyList from "./pages/companies/CompanyList";
// import CompanyDetail from "./pages/companies/CompanyDetail";
// import Login from "./pages/auth/Login";
// import Register from "./pages/auth/Register";
// import Resume from "./pages/Resume";
// import PostJob from "./pages/PostJob";
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar />
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          {/* <Route path='/jobs' element={<JobList />} />
          <Route path='/jobs/:id' element={<JobDetail />} />
          <Route path='/companies' element={<CompanyList />} />
          <Route path='/companies/:id' element={<CompanyDetail />} />
          <Route path='/resume' element={<Resume />} />
          <Route path='/post-job' element={<PostJob />} />
          <Route path='/auth/login' element={<Login />} />
          <Route path='/auth/register' element={<Register />} /> */}
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

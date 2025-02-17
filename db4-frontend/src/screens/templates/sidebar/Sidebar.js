import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChartPie,
  faBullseye,
  faRocket,
  faUsers,
  faCalendarCheck,
  faCalendarTimes,
  faMoneyBillWave,
  faChartLine,
  faSignOutAlt,
  faLaptop,
  faHeadset,
  faCogs,
} from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css';

function Sidebar({ setActiveScreen }) {
  const [activeMenu, setActiveMenu] = useState('');
  const [activeSubMenu, setActiveSubMenu] = useState('');

  const handleMainClick = (menu) => {
    setActiveMenu(menu === activeMenu ? '' : menu); // Toggle menu
    setActiveSubMenu(''); // Reset sub-menu on main menu change
  };

  const handleSubClick = (subMenu) => {
    setActiveSubMenu(subMenu);
    setActiveScreen(subMenu); // Pass the active sub-menu to the main screen
    console.log(activeSubMenu)
  };

  return (
    <aside className="sidebar">
      <div>
        <h5 style={{ color: "white" }}>DB4Cloud</h5>
        <p style={{ color: "white" }}>My Company</p>
        <hr />
      </div>
      <ul>
        <li onClick={() => handleSubClick('dashboard')}>
          <FontAwesomeIcon icon={faChartPie} /> Dashboard
        </li>
        <li onClick={() => handleMainClick('recruitment')}>
          <FontAwesomeIcon icon={faBullseye} /> Recruitment
        </li>
        {activeMenu === 'recruitment' && (
          <ul className="sub-menu">
            <li onClick={() => handleSubClick('recruitmentdashboard')}>Dashboard</li>
            <li onClick={() => handleSubClick('recruitmentPipeline')}>Recruitment Pipeline</li>
            <li onClick={() => handleSubClick('recruitmentSurvey')}>Recruitment Survey</li>
            <li onClick={() => handleSubClick('candidates')}>Candidates</li>
            <li onClick={() => handleSubClick('interview')}>Interview</li>
            {/* <li onClick={() => handleSubClick('openJobs')}>Open Jobs</li> */}
            <li onClick={() => handleSubClick('skillZone')}>Skill Zone</li>
          </ul>
        )}

        <li onClick={() => handleMainClick('onboarding')}>
          <FontAwesomeIcon icon={faRocket} /> Onboarding
        </li>
        {activeMenu === 'onboarding' && (
          <ul className="sub-menu">
            <li onClick={() => handleSubClick('onboardingView')}>Onboarding View </li>
            <li onClick={() => handleSubClick('candidatesView')}>Candidates View</li>
            <li onClick={() => handleSubClick('onboardingForm')}>Onboarding Form </li>
          </ul>
        )}

        <li onClick={() => handleMainClick('employee')}>
          <FontAwesomeIcon icon={faUsers} /> Employee
        </li>
        {activeMenu === 'employee' && (
          <ul className="sub-menu">
            <li onClick={() => handleSubClick('profile')}>Profile</li>
            <li onClick={() => handleSubClick('employee')}>Employees</li>
            <li onClick={() => handleSubClick('documentRequest')}>Document Requests</li>
            <li onClick={() => handleSubClick('shiftRequests')}>Shift Requests</li>
            <li onClick={() => handleSubClick('workTypeRequest')}>Work Type Request</li>
            <li onClick={() => handleSubClick('rotatingShiftAssign')}>Rotating Shift Assign</li>
            <li onClick={() => handleSubClick('rotatingWorktypeAssign')}>Rotating Work Type Assign</li>
            <li onClick={() => handleSubClick('disciplinaryActions')}>Disciplinary Actions</li>
            <li onClick={() => handleSubClick('policies')}>Policies</li>
            <li onClick={() => handleSubClick('organizationChart')}>Organization Chart</li>
          </ul>
        )}

        <li onClick={() => handleMainClick('attendance')}>
          <FontAwesomeIcon icon={faCalendarCheck} /> Attendance
        </li>
        {activeMenu === 'attendance' && (
          <ul className="sub-menu">
            <li onClick={() => handleSubClick('attendanceRecords')}>Attendance Records</li>
            <li onClick={() => handleSubClick('timeOffRequests')}>Time Off Requests</li>
          </ul>
        )}

        <li onClick={() => handleMainClick('leave')}>
          <FontAwesomeIcon icon={faCalendarTimes} /> Leave
        </li>
        {activeMenu === 'leave' && (
          <ul className="sub-menu">
            <li onClick={() => handleSubClick('myLeaveRequests')}>My Leave Requests</li>
            <li onClick={() => handleSubClick('leaveRequests')}>Leave Requests</li>
          </ul>
        )}


        <li onClick={() => handleMainClick('payroll')}>
          <FontAwesomeIcon icon={faMoneyBillWave} /> Payroll
        </li>
        {activeMenu === 'payroll' && (
          <ul className="sub-menu">
            <li onClick={() => handleSubClick('payrollDashboard')}>Dashboard</li>
            <li onClick={() => handleSubClick('allowances')}>Allowances</li>
            {/* <li onClick={() => handleSubClick('createAllowance')}>Create Allowance</li> */}
            <li onClick={() => handleSubClick('contract')}>Contract</li>
            <li onClick={() => handleSubClick('deductions')}>Deductions</li>
            {/* <li onClick={() => handleSubClick('createDeduction')}>Create Deduction</li> */}
            <li onClick={() => handleSubClick('payslips')}>Payslips</li>
            <li onClick={() => handleSubClick('federalTax')}>Federal Tax</li>
          </ul>
        )}

        <li onClick={() => handleMainClick('performance')}>
          <FontAwesomeIcon icon={faChartLine} /> Performance
        </li>
        {activeMenu === 'performance' && (
          <ul className="sub-menu">
            <li onClick={() => handleSubClick('performanceDashboard')}>Dashboard</li>
            <li onClick={() => handleSubClick('objectives')}>Objectives</li>
            <li onClick={() => handleSubClick('feedback')}>360 Feedback</li>
            {/* <li onClick={() => handleSubClick('createFeedback')}>Create Feedback</li> */}
          </ul>
        )}

        <li onClick={() => handleMainClick('offboarding')}>
          <FontAwesomeIcon icon={faSignOutAlt} /> Offboarding
        </li>
        {activeMenu === 'offboarding' && (
          <ul className="sub-menu">
            <li onClick={() => handleSubClick('exitProcess')}>Exit Process</li>
            <li onClick={() => handleSubClick('resignationLetter')}>Resignation Letters</li>
          </ul>
        )}

        <li onClick={() => handleMainClick('assets')}>
          <FontAwesomeIcon icon={faLaptop} /> Assets
        </li>
        {activeMenu === 'assets' && (
          <ul className="sub-menu">
            <li onClick={() => handleSubClick('assetsDashboard')}>Dashboard</li>
            <li onClick={() => handleSubClick('assetView')}>Asset View</li>
            <li onClick={() => handleSubClick('assetBatches')}>Asset Batches</li>
            {/* <li onClick={() => handleSubClick('requestAndAllocation')}>Request and Allocation</li> */}
            <li onClick={() => handleSubClick('assetHistory')}>Asset History</li>
          </ul>
        )}

        <li onClick={() => handleMainClick('helpDesk')}>
          <FontAwesomeIcon icon={faHeadset} /> Help Desk
        </li>
        {activeMenu === 'helpDesk' && (
          <ul className="sub-menu">
            <li onClick={() => handleSubClick('faqCategory')}>FAQs</li>
            {/* <li onClick={() => handleSubClick('tickets')}>Tickets</li> */}

          </ul>
        )}
        <li onClick={() => handleMainClick('configuration')}>
          <FontAwesomeIcon icon={faCogs} />  Configuration
        </li>
        {activeMenu === 'configuration' && (
          <ul className="sub-menu">

            <li onClick={() => handleSubClick('holidays')}>Holidays</li>
            <li onClick={() => handleSubClick('companyLeaves')}>Company Leaves</li>
            <li onClick={() => handleSubClick('restrictLeaves')}>Restrict Leaves</li>
          </ul>
        )}


      </ul>
    </aside>
  );
}

export default Sidebar;
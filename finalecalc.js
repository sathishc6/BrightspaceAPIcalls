
// document.addEventListener('DOMContentLoaded', () => {
//     const userNameInput = document.getElementById('userName'); // Get the user name input element
//     const userIdInput = document.getElementById('userId');
//     const calculationMethodSelect = document.getElementById('calculationMethod');
//     const resultDiv = document.getElementById('result');
//     const userDataElement = document.getElementById('userData');
//     const sgpaResultsDiv = document.getElementById('sgpa-results');
//     const cgpaResultsDiv = document.getElementById('cgpa-results');

//     async function fetchOrgUnitIds() {
//         const userName = userNameInput.value.trim(); // Get the user name
//         const userId = userIdInput.value.trim();
//         if (!userName || !userId) {
//             alert('Please enter a valid User Name and User ID.');
//             return null;
//         }

//         resultDiv.innerHTML = ''; // Clear previous results
//         userDataElement.innerHTML = ''; // Clear previous user data
//         sgpaResultsDiv.innerHTML = ''; // Clear previous SGPA results
//         cgpaResultsDiv.innerHTML = ''; // Clear previous CGPA results

//         const apiToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjRjZWJiNTM2LWQwNTItNDQ1OC04YTYyLWQwYWI0MmYyNjUxYSIsInR5cCI6IkpXVCJ9.eyJuYmYiOjE3MjAwODQ3NDksImV4cCI6MTcyMDA5MTk0OSwiaXNzIjoiaHR0cHM6Ly9hcGkuYnJpZ2h0c3BhY2UuY29tL2F1dGgiLCJhdWQiOiJodHRwczovL2FwaS5icmlnaHRzcGFjZS5jb20vYXV0aC90b2tlbiIsInN1YiI6IjY4MiIsInRlbmFudGlkIjoiYzQyNmU0MmQtYWMyYS00ZTU3LTkxZTYtYTJiZjY0ZGNjYmQwIiwiYXpwIjoiN2UxMmUyZWItZGJhMy00MzU2LTkwYjQtYjE3ZTMyNzBlZjBkIiwic2NvcGUiOiJjb250ZW50Oio6KiBjb3JlOio6KiBkYXRhaHViOio6KiBlbnJvbGxtZW50Oio6KiBncmFkZXM6KjoqIG9yZ2FuaXphdGlvbnM6KjoqIHF1aXp6aW5nOio6KiByZXBvcnRpbmc6KjoqIHVzZXJzOio6KiIsImp0aSI6ImI5YTI1Y2JkLTczZDMtNDM4ZC05ZTdkLTcyMTc5NDM1ODRjOCJ9.Wdl3aa3a43a7X3F_WjzZtveJoJ4ybPsJt9FjfIlcalRcCUx0CDOwutp9J7u743G-PENH5GRfIupol9tb_I7KEM7T9KCdiXbz59LB1xg9t8Yoyy1M2UNHpXHeD4LSz6lz_2MVS9UGBGL6a78miImlpEqbuJa1-M5aP3OHsIkSsOLn33SuzgP_6TN9a_Peg8QAnEZ6Euvd2nNG-IaiG54o_l8d8SJ2RuExNDFIJLP0KHNkf8v07JGECk8qMv2J_RBGvhhQKVSHellgA-JYDv_2vrBAp6W2i64RNMQYubaXTXJsjVw2PQqDxjU0IszkkrZcoASCfSbUeNE3eVtDs5WUDA'; //API token
//         const apiUrl = `https://acadlms.d2l-partners.brightspace.com/d2l/api/lp/1.43/enrollments/users/${userId}/orgunits/`;

//         try {
//             const response = await fetch(apiUrl, {
//                 method: 'GET',
//                 headers: {
//                     'Authorization': `Bearer ${apiToken}`,
//                     'Content-Type': 'application/json'
//                 }
//             });

//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }

//             const data = await response.json();
//             const orgUnitIds = data.Items.map(item => item.OrgUnit.Id);

//             let allGrades = [];
//             for (let i = 0; i < orgUnitIds.length; i++) {
//                 const orgId = orgUnitIds[i];
//                 const grades = await fetchGrades(orgId, userId, apiToken);
//                 const courseName = await fetchCourseName(orgId, apiToken);
//                 if (grades) {
//                     allGrades.push({ orgId, courseName, grades });
//                 }
//             }

//             if (allGrades.length === 0) {
//                 userDataElement.innerHTML = '<p>The user does not have any valid grades assigned.</p>';
//             } else {
//                 displayUserData(allGrades, userName); // Pass userName to displayUserData
//                 const calculationMethod = calculationMethodSelect.value;
//                 const { sgpa, cgpa } = calculateSGPACGPA(allGrades, calculationMethod); // Calculate SGPA and CGPA
//                 displaySGPA(sgpa); // Display SGPA in sgpaResultsDiv
//                 displayCGPA(cgpa); // Display CGPA in cgpaResultsDiv
//             }

//             return allGrades; // Return data for further use

//         } catch (error) {
//             console.error('Error fetching org unit IDs:', error);
//             resultDiv.innerHTML = `<p>Error fetching org unit IDs. Please try again.</p>`;
//             return null;
//         }
//     }

//     async function fetchGrades(orgId, userId, apiToken) {
//         const gradeUrl = `https://acadlms.d2l-partners.brightspace.com/d2l/api/le/1.43/${orgId}/grades/final/values/${userId}`;

//         try {
//             const response = await fetch(gradeUrl, {
//                 headers: {
//                     'Authorization': `Bearer ${apiToken}`,
//                     'Content-Type': 'application/json'
//                 }
//             });

//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }

//             const gradeData = await response.json();
//             return gradeData;

//         } catch (error) {
//             console.error('Error fetching grades:', error);
//             return null;
//         }
//     }

//     async function fetchCourseName(orgId, apiToken) {
//         const courseUrl = `https://acadlms.d2l-partners.brightspace.com/d2l/api/lp/1.43/orgstructure/${orgId}`;

//         try {
//             const response = await fetch(courseUrl, {
//                 headers: {
//                     'Authorization': `Bearer ${apiToken}`,
//                     'Content-Type': 'application/json'
//                 }
//             });

//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }

//             const courseData = await response.json();
//             return courseData.Name || 'N/A';

//         } catch (error) {
//             console.error('Error fetching course name:', error);
//             return 'N/A';
//         }
//     }

//     function displayUserData(allGrades, userName) {
//         let htmlContent = `<h3>${userName}'s Grades:</h3>`; // Display user name

//         allGrades.forEach(item => {
//             const orgId = item.orgId;
//             const courseName = item.courseName;
//             const grades = item.grades;

//             htmlContent += `<h4>Course: ${courseName}<div class="org-id">Org Unit ID: ${orgId}</div></h4>`;
//             if (grades && grades.DisplayedGrade !== undefined && grades.PointsNumerator !== undefined) {
//                 const displayedGrade = grades.DisplayedGrade || 'No Grades Assigned yet';
//                 htmlContent += `<p>Grade: ${displayedGrade}</p>`;
//             } else {
//                 htmlContent += `<p>No grades available for this course.</p>`;
//             }
//         });

//         userDataElement.innerHTML = htmlContent;
//     }

//     function percentageToGradePoint(percentage) {
//         if (percentage >= 90) {
//             return 4.0;
//         } else if (percentage >= 80) {
//             return 3.0;
//         } else if (percentage >= 70) {
//             return 2.0;
//         } else if (percentage >= 60) {
//             return 1.0;
//         } else {
//             return 0.0;
//         }
//     }

//     function calculateSGPACGPA(allGrades, method) {
//         let totalSGPA = 0;
//         let totalCredits = 0;
//         let totalCGPA = 0;
//         let totalCourses = 0;

//         allGrades.forEach(item => {
//             const percentage = parseFloat(item.grades.DisplayedGrade);
//             const gradePoint = method === 'percentage' ? percentage / 25 : percentageToGradePoint(percentage);
//             totalSGPA += gradePoint;
//             totalCredits += 1; // Assuming each course is worth 1 credit
//             totalCGPA += gradePoint;
//             totalCourses++;
//         });

//         const sgpa = totalSGPA / totalCredits;
//         const cgpa = totalCGPA / totalCourses;

//         console.log(`SGPA: ${sgpa}, CGPA: ${cgpa}`);

//         return { sgpa, cgpa };
//     }

//     function displaySGPA(sgpa) {
//         sgpaResultsDiv.innerHTML = `
//             <h4>Calculated SGPA:</h4>
//             <p>SGPA: ${sgpa.toFixed(2)}</p>
//         `;
//     }

//     function displayCGPA(cgpa) {
//         cgpaResultsDiv.innerHTML = `
//             <h4>Calculated CGPA:</h4>
//             <p>CGPA: ${cgpa.toFixed(2)}</p>
//         `;
//     }

//     const fetchBtn = document.getElementById('fetchBtn');
//     if (fetchBtn) {
//         fetchBtn.addEventListener('click', async () => {
//             const allGrades = await fetchOrgUnitIds();
//             if (allGrades) {
//                 const calculationMethod = calculationMethodSelect.value;
//                 const { sgpa, cgpa } = calculateSGPACGPA(allGrades, calculationMethod);
//                 displaySGPA(sgpa); // Display SGPA after fetching data
//                 displayCGPA(cgpa); // Display CGPA after fetching data
//             }
//         });
//     }
// });

//CODE 2

// document.addEventListener('DOMContentLoaded', () => {
//     const userNameInput = document.getElementById('userName'); // Get the user name input element
//     const userIdInput = document.getElementById('userId');
//     const calculationMethodSelect = document.getElementById('calculationMethod');
//     const resultDiv = document.getElementById('result');
//     const userDataElement = document.getElementById('userData');
//     const sgpaResultsDiv = document.getElementById('sgpa-results');
//     const cgpaResultsDiv = document.getElementById('cgpa-results');

//     // Cache object to store fetched data
//     const cache = {
//         grades: {},
//         courseNames: {}
//     };

//     async function fetchOrgUnitIds() {
//         const userName = userNameInput.value.trim(); // Get the user name
//         const userId = userIdInput.value.trim();
//         if (!userName || !userId) {
//             alert('Please enter a valid User Name and User ID.');
//             return null;
//         }

//         resultDiv.innerHTML = ''; // Clear previous results
//         userDataElement.innerHTML = ''; // Clear previous user data
//         sgpaResultsDiv.innerHTML = ''; // Clear previous SGPA results
//         cgpaResultsDiv.innerHTML = ''; // Clear previous CGPA results

//         const apiToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjRjZWJiNTM2LWQwNTItNDQ1OC04YTYyLWQwYWI0MmYyNjUxYSIsInR5cCI6IkpXVCJ9.eyJuYmYiOjE3MjAwODQ3NDksImV4cCI6MTcyMDA5MTk0OSwiaXNzIjoiaHR0cHM6Ly9hcGkuYnJpZ2h0c3BhY2UuY29tL2F1dGgiLCJhdWQiOiJodHRwczovL2FwaS5icmlnaHRzcGFjZS5jb20vYXV0aC90b2tlbiIsInN1YiI6IjY4MiIsInRlbmFudGlkIjoiYzQyNmU0MmQtYWMyYS00ZTU3LTkxZTYtYTJiZjY0ZGNjYmQwIiwiYXpwIjoiN2UxMmUyZWItZGJhMy00MzU2LTkwYjQtYjE3ZTMyNzBlZjBkIiwic2NvcGUiOiJjb250ZW50Oio6KiBjb3JlOio6KiBkYXRhaHViOio6KiBlbnJvbGxtZW50Oio6KiBncmFkZXM6KjoqIG9yZ2FuaXphdGlvbnM6KjoqIHF1aXp6aW5nOio6KiByZXBvcnRpbmc6KjoqIHVzZXJzOio6KiIsImp0aSI6ImI5YTI1Y2JkLTczZDMtNDM4ZC05ZTdkLTcyMTc5NDM1ODRjOCJ9.Wdl3aa3a43a7X3F_WjzZtveJoJ4ybPsJt9FjfIlcalRcCUx0CDOwutp9J7u743G-PENH5GRfIupol9tb_I7KEM7T9KCdiXbz59LB1xg9t8Yoyy1M2UNHpXHeD4LSz6lz_2MVS9UGBGL6a78miImlpEqbuJa1-M5aP3OHsIkSsOLn33SuzgP_6TN9a_Peg8QAnEZ6Euvd2nNG-IaiG54o_l8d8SJ2RuExNDFIJLP0KHNkf8v07JGECk8qMv2J_RBGvhhQKVSHellgA-JYDv_2vrBAp6W2i64RNMQYubaXTXJsjVw2PQqDxjU0IszkkrZcoASCfSbUeNE3eVtDs5WUDA'; // Replace with your API token
//         const apiUrl = `https://acadlms.d2l-partners.brightspace.com/d2l/api/lp/1.43/enrollments/users/${userId}/orgunits/`;

//         try {
//             const response = await fetch(apiUrl, {
//                 method: 'GET',
//                 headers: {
//                     'Authorization': `Bearer ${apiToken}`,
//                     'Content-Type': 'application/json'
//                 }
//             });

//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }

//             const data = await response.json();
//             const orgUnitIds = data.Items.map(item => item.OrgUnit.Id);

//             let allGrades = [];
//             for (let i = 0; i < orgUnitIds.length; i++) {
//                 const orgId = orgUnitIds[i];
//                 const grades = await fetchGrades(orgId, userId, apiToken);
//                 const courseName = await fetchCourseName(orgId, apiToken);
//                 if (grades) {
//                     allGrades.push({ orgId, courseName, grades });
//                 }
//             }

//             if (allGrades.length === 0) {
//                 userDataElement.innerHTML = '<p>The user does not have any valid grades assigned.</p>';
//             } else {
//                 displayUserData(allGrades, userName); // Pass userName to displayUserData
//                 const calculationMethod = calculationMethodSelect.value;
//                 const { sgpa, cgpa } = calculateSGPACGPA(allGrades, calculationMethod); // Calculate SGPA and CGPA
//                 displaySGPA(sgpa); // Display SGPA in sgpaResultsDiv
//                 displayCGPA(cgpa); // Display CGPA in cgpaResultsDiv
//             }

//             return allGrades; // Return data for further use

//         } catch (error) {
//             console.error('Error fetching org unit IDs:', error);
//             resultDiv.innerHTML = `<p>Error fetching org unit IDs. Please try again.</p>`;
//             return null;
//         }
//     }

//     async function fetchGrades(orgId, userId, apiToken) {
//         // Check if grades are already cached
//         if (cache.grades[orgId]) {
//             console.log(`Fetching grades for orgId ${orgId} from cache.`);
//             return cache.grades[orgId];
//         }

//         const gradeUrl = `https://acadlms.d2l-partners.brightspace.com/d2l/api/le/1.43/${orgId}/grades/final/values/${userId}`;

//         try {
//             const response = await fetch(gradeUrl, {
//                 headers: {
//                     'Authorization': `Bearer ${apiToken}`,
//                     'Content-Type': 'application/json'
//                 }
//             });

//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }

//             const gradeData = await response.json();
//             // Cache the fetched grades
//             cache.grades[orgId] = gradeData;

//             return gradeData;

//         } catch (error) {
//             console.error('Error fetching grades:', error);
//             return null;
//         }
//     }

//     async function fetchCourseName(orgId, apiToken) {
//         // Check if course name is already cached
//         if (cache.courseNames[orgId]) {
//             console.log(`Fetching course name for orgId ${orgId} from cache.`);
//             return cache.courseNames[orgId];
//         }

//         const courseUrl = `https://acadlms.d2l-partners.brightspace.com/d2l/api/lp/1.43/orgstructure/${orgId}`;

//         try {
//             const response = await fetch(courseUrl, {
//                 headers: {
//                     'Authorization': `Bearer ${apiToken}`,
//                     'Content-Type': 'application/json'
//                 }
//             });

//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }

//             const courseData = await response.json();
//             const courseName = courseData.Name || 'N/A';
//             // Cache the fetched course name
//             cache.courseNames[orgId] = courseName;

//             return courseName;

//         } catch (error) {
//             console.error('Error fetching course name:', error);
//             return 'N/A';
//         }
//     }

//     function displayUserData(allGrades, userName) {
//         let htmlContent = `<h3>${userName}'s Grades:</h3>`; // Display user name

//         allGrades.forEach(item => {
//             const orgId = item.orgId;
//             const courseName = item.courseName;
//             const grades = item.grades;

//             htmlContent += `<h4>Course: ${courseName}<div class="org-id">Org Unit ID: ${orgId}</div></h4>`;
//             if (grades && grades.DisplayedGrade !== undefined && grades.PointsNumerator !== undefined) {
//                 const displayedGrade = grades.DisplayedGrade || 'No Grades Assigned yet';
//                 htmlContent += `<p>Grade: ${displayedGrade}</p>`;
//             } else {
//                 htmlContent += `<p>No grades available for this course.</p>`;
//             }
//         });

//         userDataElement.innerHTML = htmlContent;
//     }

//     function percentageToGradePoint(percentage) {
//         if (percentage >= 90) {
//             return 4.0;
//         } else if (percentage >= 80) {
//             return 3.0;
//         } else if (percentage >= 70) {
//             return 2.0;
//         } else if (percentage >= 60) {
//             return 1.0;
//         } else {
//             return 0.0;
//         }
//     }

//     function calculateSGPACGPA(allGrades, method) {
//         let totalSGPA = 0;
//         let totalCredits = 0;
//         let totalCGPA = 0;
//         let totalCourses = 0;

//         allGrades.forEach(item => {
//             const percentage = parseFloat(item.grades.DisplayedGrade);
//             const gradePoint = method === 'percentage' ? percentage / 25 : percentageToGradePoint(percentage);
//             totalSGPA += gradePoint;
//             totalCredits += 1; // Assuming each course is worth 1 credit
//             totalCGPA += gradePoint;
//             totalCourses++;
//         });

//         const sgpa = totalSGPA / totalCredits;
//         const cgpa = totalCGPA / totalCourses;

//         console.log(`SGPA: ${sgpa}, CGPA: ${cgpa}`);

//         return { sgpa, cgpa };
//     }

//     function displaySGPA(sgpa) {
//         sgpaResultsDiv.innerHTML = `
//             <h4>Calculated SGPA:</h4>
//             <p>SGPA: ${sgpa.toFixed(2)}</p>
//         `;
//     }

//     function displayCGPA(cgpa) {
//         cgpaResultsDiv.innerHTML = `
//             <h4>Calculated CGPA:</h4>
//             <p>CGPA: ${cgpa.toFixed(2)}</p>
//         `;
//     }

//     const fetchBtn = document.getElementById('fetchBtn');
//     if (fetchBtn) {
//         fetchBtn.addEventListener('click', async () => {
//             const allGrades = await fetchOrgUnitIds();
//             if (allGrades) {
//                 const calculationMethod = calculationMethodSelect.value;
//                 const { sgpa, cgpa } = calculateSGPACGPA(allGrades, calculationMethod);
//                 displaySGPA(sgpa); // Display SGPA after fetching data
//                 displayCGPA(cgpa); // Display CGPA after fetching data
//             }
//         });
//     }
// });

//CODE 3 optimized the code reduced the time of fetching data from 12s to 4s

// document.addEventListener('DOMContentLoaded', () => {
//     const userIdInput = document.getElementById('userId');
//     const calculationMethodSelect = document.getElementById('calculationMethod');
//     const resultDiv = document.getElementById('result');
//     const userDataElement = document.getElementById('userData');
//     const sgpaResultsDiv = document.getElementById('sgpa-results');
//     const cgpaResultsDiv = document.getElementById('cgpa-results');

//     const apiToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjRjZWJiNTM2LWQwNTItNDQ1OC04YTYyLWQwYWI0MmYyNjUxYSIsInR5cCI6IkpXVCJ9.eyJuYmYiOjE3MjA0MTYxNzAsImV4cCI6MTcyMDQ4ODE3MCwiaXNzIjoiaHR0cHM6Ly9hcGkuYnJpZ2h0c3BhY2UuY29tL2F1dGgiLCJhdWQiOiJodHRwczovL2FwaS5icmlnaHRzcGFjZS5jb20vYXV0aC90b2tlbiIsInN1YiI6IjY4MiIsInRlbmFudGlkIjoiYzQyNmU0MmQtYWMyYS00ZTU3LTkxZTYtYTJiZjY0ZGNjYmQwIiwiYXpwIjoiN2UxMmUyZWItZGJhMy00MzU2LTkwYjQtYjE3ZTMyNzBlZjBkIiwic2NvcGUiOiJjb250ZW50Oio6KiBjb3JlOio6KiBkYXRhaHViOio6KiBlbnJvbGxtZW50Oio6KiBncmFkZXM6KjoqIG9yZ2FuaXphdGlvbnM6KjoqIHF1aXp6aW5nOio6KiByZXBvcnRpbmc6KjoqIHVzZXJzOio6KiIsImp0aSI6IjRhNGE1ZDAyLTgwNWQtNDAxZC04NTBkLTRiZWFhYTNkNmMyNSJ9.NZEWpvCpiX8TiV9aOWCufifMejiDxJf0TXYpmIJqMlEbkICqAgD_CQzjitTnbUR-PVCggJPMCAF9OQ7cFU0aLmHUzxgy0inXChuTlQeHf58BiX7Bpq596vREr8mdXodm3pfRPIEQctJPNCfSNiDz9jr7wpTY-FNejVf9Qj1ylZVsaPZiFHyarbEVYOUO0gOaqOSpx7E8hsCQECi1FYhpAMVibPanNpFuw4tR8HIfj4KaIrYV1R3n5-bFcjUKjJARPyofQDhWj0AHRY0CAHtWALtudXK_W5c5WNv3rngWOaSce4xmg-ZE79en7ZtVN5OgrsQwgOrmspUIhKODzX3qdw';

//     async function fetchOrgUnitIds() {
        
//         const userId = userIdInput.value.trim();
//         if (!userId) {
//             alert('Please enter a valid User ID.');
//             return null;
//         }

//         resultDiv.innerHTML = '';
//         userDataElement.innerHTML = '';
//         sgpaResultsDiv.innerHTML = '';
//         cgpaResultsDiv.innerHTML = '';

//         const apiUrl = `https://acadlms.d2l-partners.brightspace.com/d2l/api/lp/1.43/enrollments/users/${userId}/orgunits/`;

//         try {
//             const response = await fetch(apiUrl, {
//                 method: 'GET',
//                 headers: {
//                     'Authorization': `Bearer ${apiToken}`,
//                     'Content-Type': 'application/json'
//                 }
//             });

//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }

//             const data = await response.json();
//             const orgUnitIds = data.Items.map(item => item.OrgUnit.Id);

//             // Fetch all grades and course names in parallel
//             const fetchPromises = orgUnitIds.map(orgId => {
//                 return Promise.all([
//                     fetchGrades(orgId, userId, apiToken),
//                     fetchCourseName(orgId, apiToken)
//                 ]).then(([grades, courseName]) => ({ orgId, grades, courseName }));
//             });

//             const allGradesAndNames = await Promise.all(fetchPromises);

//             if (allGradesAndNames.length === 0) {
//                 userDataElement.innerHTML = '<p>The user does not have any valid grades assigned.</p>';
//             } else {
//                 displayUserData(allGradesAndNames, userName);
//                 const calculationMethod = calculationMethodSelect.value;
//                 const { sgpa, cgpa } = calculateSGPACGPA(allGradesAndNames, calculationMethod);
//                 displaySGPA(sgpa);
//                 displayCGPA(cgpa);
//             }

//             return allGradesAndNames;

//         } catch (error) {
//             console.error('Error fetching org unit IDs:', error);
//             resultDiv.innerHTML = `<p>Error fetching org unit IDs. Please try again.</p>`;
//             return null;
//         }
//     }

//     async function fetchGrades(orgId, userId, apiToken) {
//         const gradeUrl = `https://acadlms.d2l-partners.brightspace.com/d2l/api/le/1.43/${orgId}/grades/final/values/${userId}`;

//         try {
//             const response = await fetch(gradeUrl, {
//                 headers: {
//                     'Authorization': `Bearer ${apiToken}`,
//                     'Content-Type': 'application/json'
//                 }
//             });

//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }

//             const gradeData = await response.json();
//             return gradeData;

//         } catch (error) {
//             console.error(`Error fetching grades for orgId ${orgId}:`, error);
//             return null;
//         }

//     }

//     async function fetchCourseName(orgId, apiToken) {
//         const courseUrl = `https://acadlms.d2l-partners.brightspace.com/d2l/api/lp/1.43/orgstructure/${orgId}`;
    
//         try {
//             const response = await fetch(courseUrl, {
//                 headers: {
//                     'Authorization': `Bearer ${apiToken}`,
//                     'Content-Type': 'application/json'
//                 }
//             });
    
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
    
//             const responseData = await response.json();
//             const orgUnit = responseData.OrgUnit;
    
//             // Check if the orgUnit exists and has Type.Id === 3 (Course Offering)
//             if (orgUnit && orgUnit.Type && orgUnit.Type.Id === 3) {
//                 return orgUnit.Name || 'N/A';
//             } else {
//                 return 'N/A'; // Return N/A if not a course offering or structure doesn't match
//             }
    
//         } catch (error) {
//             console.error(`Error fetching course name for orgId ${orgId}:`, error);
//             return 'N/A';
//         }
//     }    
        

//     function displayUserData(allGradesAndNames, userName) {
//         let htmlContent = `<h4> Grades </h4>`;
    
//         for (let i = 1; i < allGradesAndNames.length; i++) {
//             const item = allGradesAndNames[i];
//             const orgId = item.orgId;
//             const courseName = item.courseName || 'N/A';
//             const grades = item.grades;
    
//             htmlContent += `<h4>Course: ${courseName}<div class="org-id">Org Unit ID: ${orgId}</div></h4>`;
//             if (grades && grades.DisplayedGrade !== undefined && grades.PointsNumerator !== undefined) {
//                 const displayedGrade = grades.DisplayedGrade || 'No Grades Assigned yet';
//                 htmlContent += `<p>Grade: ${displayedGrade}</p>`;
//             } else {
//                 htmlContent += `<p>No grades available for this course.</p>`;
//             }
//         }
    
//         userDataElement.innerHTML = htmlContent;
//     }
    

//     function percentageToGradePoint(percentage) {
//         if (percentage >= 90) {
//             return 4.0;
//         } else if (percentage >= 80) {
//             return 3.0;
//         } else if (percentage >= 70) {
//             return 2.0;
//         } else if (percentage >= 60) {
//             return 1.0;
//         } else {
//             return 0.0;
//         }
//     }

//     function calculateSGPACGPA(allGradesAndNames, method) {
//         let totalSGPA = 0;
//         let totalCredits = 0;
//         let totalCGPA = 0;
//         let totalCourses = 0;

//         allGradesAndNames.forEach(item => {
//             const grades = item.grades;
//             if (grades && grades.DisplayedGrade !== undefined) {
//                 const percentage = parseFloat(grades.DisplayedGrade);
//                 const gradePoint = method === 'percentage' ? percentage / 25 : percentageToGradePoint(percentage);
//                 totalSGPA += gradePoint;
//                 totalCredits += 1; // Assuming each course is worth 1 credit
//                 totalCGPA += gradePoint;
//                 totalCourses++;
//             }
//         });

//         const sgpa = totalSGPA / totalCredits || 0;
//         const cgpa = totalCGPA / totalCourses || 0;

//         console.log(`SGPA: ${sgpa}, CGPA: ${cgpa}`);

//         return { sgpa, cgpa };
//     }

//     function displaySGPA(sgpa) {
//         sgpaResultsDiv.innerHTML = `
//             <h4>Calculated SGPA:</h4>
//             <p>SGPA: ${sgpa.toFixed(2)}</p>
//         `;
//     }

//     function displayCGPA(cgpa) {
//         cgpaResultsDiv.innerHTML = `
//             <h4>Calculated CGPA:</h4>
//             <p>CGPA: ${cgpa.toFixed(2)}</p>
//         `;
//     }

//     const fetchBtn = document.getElementById('fetchBtn');
//     if (fetchBtn) {
//         fetchBtn.addEventListener('click', async () => {
//             const allGradesAndNames = await fetchOrgUnitIds();
//             if (allGradesAndNames) {
//                 const calculationMethod = calculationMethodSelect.value;
//                 const { sgpa, cgpa } = calculateSGPACGPA(allGradesAndNames, calculationMethod);
//                  displaySGPA(sgpa);
//                  displayCGPA(cgpa);
//              }
//          });
//      }
// });

// FILTERIN ONLY COURSE IDS

// document.addEventListener('DOMContentLoaded', () => {
//     const userNameInput = document.getElementById('userName');
//     const userIdInput = document.getElementById('userId');
//     const calculationMethodSelect = document.getElementById('calculationMethod');
//     const resultDiv = document.getElementById('result');
//     const userDataElement = document.getElementById('userData');
//     const sgpaResultsDiv = document.getElementById('sgpa-results');
//     const cgpaResultsDiv = document.getElementById('cgpa-results');

//     const apiToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjRjZWJiNTM2LWQwNTItNDQ1OC04YTYyLWQwYWI0MmYyNjUxYSIsInR5cCI6IkpXVCJ9.eyJuYmYiOjE3MjA0MTYxNzAsImV4cCI6MTcyMDQ4ODE3MCwiaXNzIjoiaHR0cHM6Ly9hcGkuYnJpZ2h0c3BhY2UuY29tL2F1dGgiLCJhdWQiOiJodHRwczovL2FwaS5icmlnaHRzcGFjZS5jb20vYXV0aC90b2tlbiIsInN1YiI6IjY4MiIsInRlbmFudGlkIjoiYzQyNmU0MmQtYWMyYS00ZTU3LTkxZTYtYTJiZjY0ZGNjYmQwIiwiYXpwIjoiN2UxMmUyZWItZGJhMy00MzU2LTkwYjQtYjE3ZTMyNzBlZjBkIiwic2NvcGUiOiJjb250ZW50Oio6KiBjb3JlOio6KiBkYXRhaHViOio6KiBlbnJvbGxtZW50Oio6KiBncmFkZXM6KjoqIG9yZ2FuaXphdGlvbnM6KjoqIHF1aXp6aW5nOio6KiByZXBvcnRpbmc6KjoqIHVzZXJzOio6KiIsImp0aSI6IjRhNGE1ZDAyLTgwNWQtNDAxZC04NTBkLTRiZWFhYTNkNmMyNSJ9.NZEWpvCpiX8TiV9aOWCufifMejiDxJf0TXYpmIJqMlEbkICqAgD_CQzjitTnbUR-PVCggJPMCAF9OQ7cFU0aLmHUzxgy0inXChuTlQeHf58BiX7Bpq596vREr8mdXodm3pfRPIEQctJPNCfSNiDz9jr7wpTY-FNejVf9Qj1ylZVsaPZiFHyarbEVYOUO0gOaqOSpx7E8hsCQECi1FYhpAMVibPanNpFuw4tR8HIfj4KaIrYV1R3n5-bFcjUKjJARPyofQDhWj0AHRY0CAHtWALtudXK_W5c5WNv3rngWOaSce4xmg-ZE79en7ZtVN5OgrsQwgOrmspUIhKODzX3qdw';

//     async function fetchOrgUnitIds() {
//         const userName = userNameInput.value.trim();
//         const userId = userIdInput.value.trim();
//         if (!userName || !userId) {
//             alert('Please enter a valid User Name and User ID.');
//             return null;
//         }

//         resultDiv.innerHTML = '';
//         userDataElement.innerHTML = '';
//         sgpaResultsDiv.innerHTML = '';
//         cgpaResultsDiv.innerHTML = '';

//         const apiUrl = `https://acadlms.d2l-partners.brightspace.com/d2l/api/lp/1.43/enrollments/users/${userId}/orgunits/`;

//         try {
//             const response = await fetch(apiUrl, {
//                 method: 'GET',
//                 headers: {
//                     'Authorization': `Bearer ${apiToken}`,
//                     'Content-Type': 'application/json'
//                 }
//             });

//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }

//             const data = await response.json();
//             const orgUnitIds = data.Items.map(item => item.OrgUnit.Id);

//             // Filter to fetch only course names (Type 3)
//             const fetchPromises = orgUnitIds.map(orgId => {
//                 return Promise.all([
//                     fetchGrades(orgId, userId, apiToken),
//                     fetchCourseName(orgId, apiToken)
//                 ]).then(([grades, courseName]) => ({ orgId, grades, courseName }));
//             });

//             const allGradesAndNames = await Promise.all(fetchPromises);

//             if (allGradesAndNames.length === 0) {
//                 userDataElement.innerHTML = '<p>The user does not have any valid grades assigned.</p>';
//             } else {
//                 // Display filtered data
//                 displayUserData(allGradesAndNames, userName);
//                 const calculationMethod = calculationMethodSelect.value;
//                 const { sgpa, cgpa } = calculateSGPACGPA(allGradesAndNames, calculationMethod);
//                 displaySGPA(sgpa);
//                 displayCGPA(cgpa);
//             }

//             return allGradesAndNames;

//         } catch (error) {
//             console.error('Error fetching org unit IDs:', error);
//             resultDiv.innerHTML = `<p>Error fetching org unit IDs. Please try again.</p>`;
//             return null;
//         }
//     }

//     async function fetchGrades(orgId, userId, apiToken) {
//         const gradeUrl = `https://acadlms.d2l-partners.brightspace.com/d2l/api/le/1.43/${orgId}/grades/final/values/${userId}`;

//         try {
//             const response = await fetch(gradeUrl, {
//                 headers: {
//                     'Authorization': `Bearer ${apiToken}`,
//                     'Content-Type': 'application/json'
//                 }
//             });

//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }

//             const gradeData = await response.json();
//             return gradeData;

//         } catch (error) {
//             console.error(`Error fetching grades for orgId ${orgId}:`, error);
//             return null;
//         }
//     }

//     async function fetchCourseName(orgId, apiToken) {
//         const courseUrl = `https://acadlms.d2l-partners.brightspace.com/d2l/api/lp/1.43/orgstructure/${orgId}`;

//         try {
//             const response = await fetch(courseUrl, {
//                 headers: {
//                     'Authorization': `Bearer ${apiToken}`,
//                     'Content-Type': 'application/json'
//                 }
//             });

//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }

//             const courseData = await response.json();
//             if (courseData.Type === 3) { // Assuming Type 3 is for courses
//                 return courseData.Name[1] || 'N/A';
//             } else {
//                 return null; // Return null for non-course org units
//             }

//         } catch (error) {
//             console.error(`Error fetching course name for orgId ${orgId}:`, error);
//             return 'N/A';
//         }
//     }

//     function displayUserData(allGradesAndNames, userName) {
//         let htmlContent = `<h4>${userName}'s Grades:</h4>`;

//         for (let i = 1; i < allGradesAndNames.length; i++) {
//             const item = allGradesAndNames[i];
//             const orgId = item.orgId;
//             const courseName = item.courseName || 'N/A';
//             const grades = item.grades;

//             htmlContent += `<h4>Course: ${courseName}<div class="org-id">Org Unit ID: ${orgId}</div></h4>`;
//             if (grades && grades.DisplayedGrade !== undefined && grades.PointsNumerator !== undefined) {
//                 const displayedGrade = grades.DisplayedGrade || 'No Grades Assigned yet';
//                 htmlContent += `<p>Grade: ${displayedGrade}</p>`;
//             } else {
//                 htmlContent += `<p>No grades available for this course.</p>`;
//             }
//         }

//         userDataElement.innerHTML = htmlContent;
//     }


//     function percentageToGradePoint(percentage) {
//         if (percentage >= 90) {
//             return 4.0;
//         } else if (percentage >= 80) {
//             return 3.0;
//         } else if (percentage >= 70) {
//             return 2.0;
//         } else if (percentage >= 60) {
//             return 1.0;
//         } else {
//             return 0.0;
//         }
//     }

//     function calculateSGPACGPA(allGradesAndNames, method) {
//         let totalSGPA = 0;
//         let totalCredits = 0;
//         let totalCGPA = 0;
//         let totalCourses = 0;

//         allGradesAndNames.forEach(item => {
//             const grades = item.grades;
//             if (grades && grades.DisplayedGrade !== undefined) {
//                 const percentage = parseFloat(grades.DisplayedGrade);
//                 const gradePoint = method === 'percentage' ? percentage / 25 : percentageToGradePoint(percentage);
//                 totalSGPA += gradePoint;
//                 totalCredits += 1; // Assuming each course is worth 1 credit
//                 totalCGPA += gradePoint;
//                 totalCourses++;
//             }
//         });

//         const sgpa = totalSGPA / totalCredits || 0;
//         const cgpa = totalCGPA / totalCourses || 0;

//         console.log(`SGPA: ${sgpa}, CGPA: ${cgpa}`);

//         return { sgpa, cgpa };
//     }

//     function displaySGPA(sgpa) {
//         sgpaResultsDiv.innerHTML = `
//             <h4>Calculated SGPA:</h4>
//             <p>SGPA: ${sgpa.toFixed(2)}</p>
//         `;
//     }

//     function displayCGPA(cgpa) {
//         cgpaResultsDiv.innerHTML = `
//             <h4>Calculated CGPA:</h4>
//             <p>CGPA: ${cgpa.toFixed(2)}</p>
//         `;
//     }

//     const fetchBtn = document.getElementById('fetchBtn');
//     if (fetchBtn) {
//         fetchBtn.addEventListener('click', async () => {
//             const allGradesAndNames = await fetchOrgUnitIds();
//             if (allGradesAndNames) {
//                 const calculationMethod = calculationMethodSelect.value;
//                 const { sgpa, cgpa } = calculateSGPACGPA(allGradesAndNames, calculationMethod);
//                 displaySGPA(sgpa);
//                 displayCGPA(cgpa);
//             }
//         });
//     }
// });

// DISPLAYING THE DATA IN TABLE VIEW 

// document.addEventListener('DOMContentLoaded', () => {
//     const userIdInput = document.getElementById('userId');
//     const calculationMethodSelect = document.getElementById('calculationMethod');
//     const resultDiv = document.getElementById('result');
//     const userDataElement = document.getElementById('userData');
//     const sgpaResultsDiv = document.getElementById('sgpa-results');
//     const cgpaResultsDiv = document.getElementById('cgpa-results');
//     const outputTableBody = document.getElementById('outputTableBody'); // Added for table population

//     const apiToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjRjZWJiNTM2LWQwNTItNDQ1OC04YTYyLWQwYWI0MmYyNjUxYSIsInR5cCI6IkpXVCJ9.eyJuYmYiOjE3MjA0MjUxNDEsImV4cCI6MTcyMDQ5NzE0MSwiaXNzIjoiaHR0cHM6Ly9hcGkuYnJpZ2h0c3BhY2UuY29tL2F1dGgiLCJhdWQiOiJodHRwczovL2FwaS5icmlnaHRzcGFjZS5jb20vYXV0aC90b2tlbiIsInN1YiI6IjY4MiIsInRlbmFudGlkIjoiYzQyNmU0MmQtYWMyYS00ZTU3LTkxZTYtYTJiZjY0ZGNjYmQwIiwiYXpwIjoiN2UxMmUyZWItZGJhMy00MzU2LTkwYjQtYjE3ZTMyNzBlZjBkIiwic2NvcGUiOiJjb250ZW50Oio6KiBjb3JlOio6KiBkYXRhaHViOio6KiBlbnJvbGxtZW50Oio6KiBncmFkZXM6KjoqIG9yZ2FuaXphdGlvbnM6KjoqIHF1aXp6aW5nOio6KiByZXBvcnRpbmc6KjoqIHVzZXJzOio6KiIsImp0aSI6ImVlZDM3ODVlLTNjYmQtNDk3MS04MDEzLTAzNDMxNmFjM2NmZCJ9.Wj93axugoh_mJKRm_2XqjweKsdUqT3xgWP-Yxo7EQUn5iKF3UKSLetwi6FLiqxOUo0CRkDhIt-t9iUigUeXBJWPjJxCiVUcAw0xEFxw_WNxCrrVYfTnuNRq7PYzog--lfKWQu5Py_d04W49wAHuNhWjWeGcUjvOnHPBDB80jgkj-zJ72nJsyGomDJrh7kzC9q-GupNVwvORY1ISd22kmnEgi4e-wcsC5uKEs_iZvliv8s2Ofb6TgHwboUVsxvmgtW0I2rY-xExILm6uqgWDf9cYhbPMSGdfcXCD4s6JOKk2SpNyK_QPg84mrnNTUbrO7gpcejtA3YjhkQd0AjZToQQ'; // Replace with your actual API token

//     async function fetchOrgUnitIds() {
//         const userId = userIdInput.value.trim();
//         if (!userId) {
//             alert('Please enter a valid User ID.');
//             return null;
//         }

//         resultDiv.innerHTML = '';
//         userDataElement.innerHTML = '';
//         sgpaResultsDiv.innerHTML = '';
//         cgpaResultsDiv.innerHTML = '';
//         outputTableBody.innerHTML = ''; // Clear existing table rows

//         const apiUrl = `https://acadlms.d2l-partners.brightspace.com/d2l/api/lp/1.43/enrollments/users/${userId}/orgunits/`;

//         try {
//             const response = await fetch(apiUrl, {
//                 method: 'GET',
//                 headers: {
//                     'Authorization': `Bearer ${apiToken}`,
//                     'Content-Type': 'application/json'
//                 }
//             });

//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }

//             const data = await response.json();
//             const orgUnitIds = data.Items.map(item => item.OrgUnit.Id);

//             // Fetch all grades and course names in parallel
//             const fetchPromises = orgUnitIds.map(orgId => {
//                 return Promise.all([
//                     fetchGrades(orgId, userId, apiToken),
//                     fetchCourseName(orgId, apiToken)
//                 ]).then(([grades, courseName]) => ({ orgId, grades, courseName }));
//             });

//             const allGradesAndNames = await Promise.all(fetchPromises);

//             if (allGradesAndNames.length === 0) {
//                 userDataElement.innerHTML = '<p>The user does not have any valid grades assigned.</p>';
//             } else {
//                 displayUserData(allGradesAndNames, userName);
//                 displayOutputTable(allGradesAndNames); // Display data in the table
//                 const calculationMethod = calculationMethodSelect.value;
//                 const { sgpa, cgpa } = calculateSGPACGPA(allGradesAndNames, calculationMethod);
//                 displaySGPA(sgpa);
//                 displayCGPA(cgpa);
//             }

//             return allGradesAndNames;

//         } catch (error) {
//             console.error('Error fetching org unit IDs:', error);
//             resultDiv.innerHTML = `<p>Error fetching org unit IDs. Please try again.</p>`;
//             return null;
//         }
//     }

//     async function fetchGrades(orgId, userId, apiToken) {
//         const gradeUrl = `https://acadlms.d2l-partners.brightspace.com/d2l/api/le/1.43/${orgId}/grades/final/values/${userId}`;

//         try {
//             const response = await fetch(gradeUrl, {
//                 headers: {
//                     'Authorization': `Bearer ${apiToken}`,
//                     'Content-Type': 'application/json'
//                 }
//             });

//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }

//             const gradeData = await response.json();
//             return gradeData;

//         } catch (error) {
//             console.error(`Error fetching grades for orgId ${orgId}:`, error);
//             return null;
//         }
//     }

//     async function fetchCourseName(orgId, apiToken) {
//         const courseUrl = `https://acadlms.d2l-partners.brightspace.com/d2l/api/lp/1.43/orgstructure/${orgId}`;

//         try {
//             const response = await fetch(courseUrl, {
//                 headers: {
//                     'Authorization': `Bearer ${apiToken}`,
//                     'Content-Type': 'application/json'
//                 }
//             });

//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }

//             const responseData = await response.json();
//             const orgUnit = responseData.OrgUnit;

//             if (orgUnit && orgUnit.Type && orgUnit.Type.Id === 3) {
//                 return orgUnit.Name || 'N/A';
//             } else {
//                 return 'N/A'; // Return N/A if not a course offering or structure doesn't match
//             }

//         } catch (error) {
//             console.error(`Error fetching course name for orgId ${orgId}:`, error);
//             return 'N/A';
//         }
//     }

//     function displayUserData(allGradesAndNames, userName) {
//         let htmlContent = `<h4> Grades </h4>`;

//         allGradesAndNames.forEach(item => {
//             const orgId = item.orgId;
//             const courseName = item.courseName || 'N/A';
//             const grades = item.grades;

//             htmlContent += `<h4>Course: ${courseName}<div class="org-id">Org Unit ID: ${orgId}</div></h4>`;
//             if (grades && grades.DisplayedGrade !== undefined && grades.PointsNumerator !== undefined) {
//                 const displayedGrade = grades.DisplayedGrade || 'No Grades Assigned yet';
//                 htmlContent += `<p>Grade: ${displayedGrade}</p>`;
//             } else {
//                 htmlContent += `<p>No grades available for this course.</p>`;
//             }
//         });

//         userDataElement.innerHTML = htmlContent;
//     }

//     function displayOutputTable(allGradesAndNames) {
//         allGradesAndNames.forEach(item => {
//             const orgId = item.orgId;
//             const courseName = item.courseName || 'N/A';
//             const grades = item.grades;

//             const row = document.createElement('tr');
//             row.innerHTML = `
//                 <td>${courseName}</td>
//                 <td>${orgId}</td>
//                 <td>${grades ? (grades.DisplayedGrade || 'N/A') : 'N/A'}</td>
//             `;
//             outputTableBody.appendChild(row);
//         });
//     }

//     function percentageToGradePoint(percentage) {
//         if (percentage >= 90) {
//             return 4.0;
//         } else if (percentage >= 80) {
//             return 3.0;
//         } else if (percentage >= 70) {
//             return 2.0;
//         } else if (percentage >= 60) {
//             return 1.0;
//         } else {
//             return 0.0;
//         }
//     }

//     function calculateSGPACGPA(allGradesAndNames, method) {
//         let totalSGPA = 0;
//         let totalCredits = 0;
//         let totalCGPA = 0;
//         let totalCourses = 0;

//         allGradesAndNames.forEach(item => {
//             const grades = item.grades;
//             if (grades && grades.DisplayedGrade !== undefined) {
//                 const percentage = parseFloat(grades.DisplayedGrade);
//                 const gradePoint = method === 'percentage' ? percentage / 25 : percentageToGradePoint(percentage);
//                 totalSGPA += gradePoint;
//                 totalCredits += 1; // Assuming each course is worth 1 credit
//                 totalCGPA += gradePoint;
//                 totalCourses++;
//             }
//         });

//         const sgpa = totalSGPA / totalCredits || 0;
//         const cgpa = totalCGPA / totalCourses || 0;

//         console.log(`SGPA: ${sgpa}, CGPA: ${cgpa}`);

//         return { sgpa, cgpa };
//     }

//     function displaySGPA(sgpa) {
//         sgpaResultsDiv.innerHTML = `
//             <h4>Calculated SGPA:</h4>
//             <p>SGPA: ${sgpa.toFixed(2)}</p>
//         `;
//     }

//     function displayCGPA(cgpa) {
//         cgpaResultsDiv.innerHTML = `
//             <h4>Calculated CGPA:</h4>
//             <p>CGPA: ${cgpa.toFixed(2)}</p>
//         `;
//     }

//     const fetchBtn = document.getElementById('fetchBtn');
//     if (fetchBtn) {
//         fetchBtn.addEventListener('click', async () => {
//             const allGradesAndNames = await fetchOrgUnitIds();
//             if (allGradesAndNames) {
//                 const calculationMethod = calculationMethodSelect.value;
//                 const { sgpa, cgpa } = calculateSGPACGPA(allGradesAndNames, calculationMethod);
//                 displaySGPA(sgpa);
//                 displayCGPA(cgpa);
//             }
//         });
//     }
// });

// TABLE VIEW VERSION 2

// document.addEventListener('DOMContentLoaded', () => {
//     // Selecting HTML elements
//     const userIdInput = document.getElementById('userId');
//     const calculationMethodSelect = document.getElementById('calculationMethod');
//     const resultDiv = document.getElementById('result');
//     const userDataElement = document.getElementById('userData');
//     const sgpaResultsDiv = document.getElementById('sgpa-results');
//     const cgpaResultsDiv = document.getElementById('cgpa-results');
//     const outputTableBody = document.getElementById('outputTableBody');

//     // Replace with your actual API token
//     const apiToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjRjZWJiNTM2LWQwNTItNDQ1OC04YTYyLWQwYWI0MmYyNjUxYSIsInR5cCI6IkpXVCJ9.eyJuYmYiOjE3MjA0MjY5MTcsImV4cCI6MTcyMDQ5ODkxNywiaXNzIjoiaHR0cHM6Ly9hcGkuYnJpZ2h0c3BhY2UuY29tL2F1dGgiLCJhdWQiOiJodHRwczovL2FwaS5icmlnaHRzcGFjZS5jb20vYXV0aC90b2tlbiIsInN1YiI6IjY4MiIsInRlbmFudGlkIjoiYzQyNmU0MmQtYWMyYS00ZTU3LTkxZTYtYTJiZjY0ZGNjYmQwIiwiYXpwIjoiN2UxMmUyZWItZGJhMy00MzU2LTkwYjQtYjE3ZTMyNzBlZjBkIiwic2NvcGUiOiJjb250ZW50Oio6KiBjb3JlOio6KiBkYXRhaHViOio6KiBlbnJvbGxtZW50Oio6KiBncmFkZXM6KjoqIG9yZ2FuaXphdGlvbnM6KjoqIHF1aXp6aW5nOio6KiByZXBvcnRpbmc6KjoqIHVzZXJzOio6KiIsImp0aSI6IjI5NDgxMzU0LTY5M2EtNDMxYS05MDBhLWFlZTQ1MGE4ZjRjMCJ9.I4NC6lapm76FCcHF_-pFBKrRFs2-4G4BDSfNNbAYfh-PcCVeCWFUXujvfOwCZijc-JJ2FM2AJGyI0RFX3rnqOT5-V9YgdBpS2G6n7iMnGKc7ZuinkKu8imkuTrarGge776IJr7FFQl117ek0kxk7mhsXZkvXv8o4dCSl8RIEFj7qUSd2C06h3pE6RXLPZi4Uq9qe-kcevXLONFXzSIWxVvkE1eqxD7XsNi8qTXJegAI0F_CurtCtLZDQDd4etyJ_fVxBC2d9C8gSGWkmjf-sgHKGHiC_PznZqk4otUM1I6ONkz-aqWnqEKoifH03kr-2uVknqi7Z4seKlDhQ0xHIWw';

//     // Function to fetch organization unit IDs and associated data
//     async function fetchOrgUnitIds() {
//         const userId = userIdInput.value.trim();
//         if (!userId) {
//             alert('Please enter a valid User ID.');
//             return null;
//         }

//         // Clear previous data
//         resultDiv.innerHTML = '';
//         userDataElement.innerHTML = '';
//         sgpaResultsDiv.innerHTML = '';
//         cgpaResultsDiv.innerHTML = '';
//         outputTableBody.innerHTML = ''; // Clear existing table rows

//         const apiUrl = `https://acadlms.d2l-partners.brightspace.com/d2l/api/lp/1.43/enrollments/users/${userId}/orgunits/`;

//         try {
//             const response = await fetch(apiUrl, {
//                 method: 'GET',
//                 headers: {
//                     'Authorization': `Bearer ${apiToken}`,
//                     'Content-Type': 'application/json'
//                 }
//             });

//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }

//             const data = await response.json();
//             const orgUnitIds = data.Items.map(item => item.OrgUnit.Id);

//             // Fetch grades and course names in parallel
//             const fetchPromises = orgUnitIds.map(orgId => {
//                 return Promise.all([
//                     fetchGrades(orgId, userId, apiToken),
//                     fetchCourseName(orgId, apiToken)
//                 ]).then(([grades, courseName]) => ({ orgId, grades, courseName }));
//             });

//             const allGradesAndNames = await Promise.all(fetchPromises);

//             if (allGradesAndNames.length === 0) {
//                 userDataElement.innerHTML = '<p>The user does not have any valid grades assigned.</p>';
//             } else {
//                 displayUserData(allGradesAndNames);
//                 displayOutputTable(allGradesAndNames); // Display data in the table
//                 const calculationMethod = calculationMethodSelect.value;
//                 const { sgpa, cgpa } = calculateSGPACGPA(allGradesAndNames, calculationMethod);
//                 displaySGPA(sgpa);
//                 displayCGPA(cgpa);
//             }

//             return allGradesAndNames;

//         } catch (error) {
//             console.error('Error fetching org unit IDs:', error);
//             resultDiv.innerHTML = `<p>Error fetching org unit IDs. Please try again.</p>`;
//             return null;
//         }
//     }

//     // Function to fetch grades for a specific organization unit
//     async function fetchGrades(orgId, userId, apiToken) {
//         const gradeUrl = `https://acadlms.d2l-partners.brightspace.com/d2l/api/le/1.43/${orgId}/grades/final/values/${userId}`;

//         try {
//             const response = await fetch(gradeUrl, {
//                 headers: {
//                     'Authorization': `Bearer ${apiToken}`,
//                     'Content-Type': 'application/json'
//                 }
//             });

//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }

//             const gradeData = await response.json();
//             return gradeData;

//         } catch (error) {
//             console.error(`Error fetching grades for orgId ${orgId}:`, error);
//             return null;
//         }
//     }

//     // Function to fetch course name for a specific organization unit
//     async function fetchCourseName(orgId, apiToken) {
//         const courseUrl = `https://acadlms.d2l-partners.brightspace.com/d2l/api/lp/1.43/orgstructure/${orgId}`;
    
//         try {
//             const response = await fetch(courseUrl, {
//                 headers: {
//                     'Authorization': `Bearer ${apiToken}`,
//                     'Content-Type': 'application/json'
//                 }
//             });
    
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
    
//             const responseData = await response.json();
    
//             // Extract course name directly if Type.Id is 3 (Course Offering)
//             if (responseData.Type && responseData.Type.Id === 3) {
//                 return responseData.Name || 'N/A';
//             } else {
//                 return 'N/A'; // Return N/A if not a course offering or structure doesn't match
//             }
    
//         } catch (error) {
//             console.error(`Error fetching course name for orgId ${orgId}:`, error);
//             return 'N/A';
//         }
//     }
    

//     // Function to display user data
//     function displayUserData(allGradesAndNames) {
//         let htmlContent = '';

//         allGradesAndNames.forEach(item => {
//             const orgId = item.orgId;
//             const courseName = item.courseName || 'N/A';
//             const grades = item.grades;

//             htmlContent += `
//                 <div class="grid-item">
//                     <h4>Course: ${courseName}</h4>
//                     <div class="org-id">Org Unit ID: ${orgId}</div>
//                     <p>Grade: ${grades ? (grades.DisplayedGrade || 'N/A') : 'N/A'}</p>
//                 </div>
//             `;
//         });

//         userDataElement.innerHTML = htmlContent;
//     }

//     // Function to display data in the output table
// function displayOutputTable(allGradesAndNames) {
//     const outputTableBody = document.getElementById('outputTableBody');
//     outputTableBody.innerHTML = ''; // Clear existing table rows

//     allGradesAndNames.forEach(item => {
//         const orgId = item.orgId;
//         const courseName = item.courseName || 'N/A';
//         const grades = item.grades;

//         const row = document.createElement('tr');
//         row.innerHTML = `
//             <td>${courseName}</td>
//             <td>${orgId}</td>
//             <td>${grades ? (grades.DisplayedGrade || 'N/A') : 'N/A'}</td>
//         `;
//         outputTableBody.appendChild(row);
//     });
// }


//     // Function to convert percentage to grade point
//     function percentageToGradePoint(percentage) {
//         if (percentage >= 90) {
//             return 4.0;
//         } else if (percentage >= 80) {
//             return 3.0;
//         } else if (percentage >= 70) {
//             return 2.0;
//         } else if (percentage >= 60) {
//             return 1.0;
//         } else {
//             return 0.0;
//         }
//     }

//     // Function to calculate SGPA and CGPA
//     function calculateSGPACGPA(allGradesAndNames, method) {
//         let totalSGPA = 0;
//         let totalCredits = 0;
//         let totalCGPA = 0;
//         let totalCourses = 0;

//         allGradesAndNames.forEach(item => {
//             const grades = item.grades;
//             if (grades && grades.DisplayedGrade !== undefined) {
//                 const percentage = parseFloat(grades.DisplayedGrade);
//                 const gradePoint = method === 'percentage' ? percentage / 25 : percentageToGradePoint(percentage);
//                 totalSGPA += gradePoint;
//                 totalCredits += 1; // Assuming each course is worth 1 credit
//                 totalCGPA += gradePoint;
//                 totalCourses++;
//             }
//         });

//         const sgpa = totalSGPA / totalCredits || 0;
//         const cgpa = totalCGPA / totalCourses || 0;

//         console.log(`SGPA: ${sgpa}, CGPA: ${cgpa}`);

//         return { sgpa, cgpa };
//     }

//     // Function to display SGPA
//     function displaySGPA(sgpa) {
//         sgpaResultsDiv.innerHTML = `
//             <h4>Calculated SGPA:</h4>
//             <p>SGPA: ${sgpa.toFixed(2)}</p>
//         `;
//     }

//     // Function to display CGPA
//     function displayCGPA(cgpa) {
//         cgpaResultsDiv.innerHTML = `
//             <h4>Calculated CGPA:</h4>
//             <p>CGPA: ${cgpa.toFixed(2)}</p>
//         `;
//     }

//     // Event listener for Fetch Data button
//     const fetchBtn = document.getElementById('fetchBtn');
//     if (fetchBtn) {
//         fetchBtn.addEventListener('click', async () => {
//             const allGradesAndNames = await fetchOrgUnitIds();
//             if (allGradesAndNames) {
//                 const calculationMethod = calculationMethodSelect.value;
//                 const { sgpa, cgpa } = calculateSGPACGPA(allGradesAndNames, calculationMethod);
//                 displaySGPA(sgpa);
//                 displayCGPA(cgpa);
//             }
//         });
//     }
// });

// #3 DISPLAYING ONLY COURSES

// document.addEventListener('DOMContentLoaded', () => {
//     // Selecting HTML elements
//     const userIdInput = document.getElementById('userId');
//     const calculationMethodSelect = document.getElementById('calculationMethod');
//     const userDataElement = document.getElementById('userData');
//     const sgpaResultsDiv = document.getElementById('sgpa-results');
//     const cgpaResultsDiv = document.getElementById('cgpa-results');
//     const outputTableBody = document.getElementById('outputTableBody');

//     // Replace with your actual API token
//     const apiToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjRjZWJiNTM2LWQwNTItNDQ1OC04YTYyLWQwYWI0MmYyNjUxYSIsInR5cCI6IkpXVCJ9.eyJuYmYiOjE3MjA0MjY5MTcsImV4cCI6MTcyMDQ5ODkxNywiaXNzIjoiaHR0cHM6Ly9hcGkuYnJpZ2h0c3BhY2UuY29tL2F1dGgiLCJhdWQiOiJodHRwczovL2FwaS5icmlnaHRzcGFjZS5jb20vYXV0aC90b2tlbiIsInN1YiI6IjY4MiIsInRlbmFudGlkIjoiYzQyNmU0MmQtYWMyYS00ZTU3LTkxZTYtYTJiZjY0ZGNjYmQwIiwiYXpwIjoiN2UxMmUyZWItZGJhMy00MzU2LTkwYjQtYjE3ZTMyNzBlZjBkIiwic2NvcGUiOiJjb250ZW50Oio6KiBjb3JlOio6KiBkYXRhaHViOio6KiBlbnJvbGxtZW50Oio6KiBncmFkZXM6KjoqIG9yZ2FuaXphdGlvbnM6KjoqIHF1aXp6aW5nOio6KiByZXBvcnRpbmc6KjoqIHVzZXJzOio6KiIsImp0aSI6IjI5NDgxMzU0LTY5M2EtNDMxYS05MDBhLWFlZTQ1MGE4ZjRjMCJ9.I4NC6lapm76FCcHF_-pFBKrRFs2-4G4BDSfNNbAYfh-PcCVeCWFUXujvfOwCZijc-JJ2FM2AJGyI0RFX3rnqOT5-V9YgdBpS2G6n7iMnGKc7ZuinkKu8imkuTrarGge776IJr7FFQl117ek0kxk7mhsXZkvXv8o4dCSl8RIEFj7qUSd2C06h3pE6RXLPZi4Uq9qe-kcevXLONFXzSIWxVvkE1eqxD7XsNi8qTXJegAI0F_CurtCtLZDQDd4etyJ_fVxBC2d9C8gSGWkmjf-sgHKGHiC_PznZqk4otUM1I6ONkz-aqWnqEKoifH03kr-2uVknqi7Z4seKlDhQ0xHIWw';

//     // Function to fetch organization unit IDs and associated data
//     async function fetchOrgUnitIds() {
//         const userId = userIdInput.value.trim();
//         if (!userId) {
//             alert('Please enter a valid User ID.');
//             return null;
//         }

//         const apiUrl = `https://acadlms.d2l-partners.brightspace.com/d2l/api/lp/1.43/enrollments/users/${userId}/orgunits/`;

//         try {
//             const response = await fetch(apiUrl, {
//                 method: 'GET',
//                 headers: {
//                     'Authorization': `Bearer ${apiToken}`,
//                     'Content-Type': 'application/json'
//                 }
//             });

//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }

//             const data = await response.json();
//             const orgUnitIds = data.Items.map(item => item.OrgUnit.Id);

//             // Fetch grades and course names in parallel
//             const fetchPromises = orgUnitIds.map(orgId => {
//                 return Promise.all([
//                     fetchGrades(orgId, userId, apiToken),
//                     fetchCourseName(orgId, apiToken)
//                 ]).then(([grades, courseName]) => ({ orgId, grades, courseName }));
//             });

//             const allGradesAndNames = await Promise.all(fetchPromises);

//             if (allGradesAndNames.length === 0) {
//                 userDataElement.innerHTML = '<p>The user does not have any valid grades assigned.</p>';
//             } else {
//                 displayUserData(allGradesAndNames);
//                 displayOutputTable(allGradesAndNames); // Display data in the table
//                 const calculationMethod = calculationMethodSelect.value;
//                 const { sgpa, cgpa } = calculateSGPACGPA(allGradesAndNames, calculationMethod);
//                 displaySGPA(sgpa);
//                 displayCGPA(cgpa);
//             }

//             return allGradesAndNames;

//         } catch (error) {
//             console.error('Error fetching org unit IDs:', error);
//             return null;
//         }
//     }

//     // Function to fetch grades for a specific organization unit
//     async function fetchGrades(orgId, userId, apiToken) {
//         const gradeUrl = `https://acadlms.d2l-partners.brightspace.com/d2l/api/le/1.43/${orgId}/grades/final/values/${userId}`;

//         try {
//             const response = await fetch(gradeUrl, {
//                 headers: {
//                     'Authorization': `Bearer ${apiToken}`,
//                     'Content-Type': 'application/json'
//                 }
//             });

//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }

//             const gradeData = await response.json();
//             return gradeData;

//         } catch (error) {
//             console.error(`Error fetching grades for orgId ${orgId}:`, error);
//             return null;
//         }
//     }

//     // Function to fetch course name for a specific organization unit
//     async function fetchCourseName(orgId, apiToken) {
//         const courseUrl = `https://acadlms.d2l-partners.brightspace.com/d2l/api/lp/1.43/orgstructure/${orgId}`;
    
//         try {
//             const response = await fetch(courseUrl, {
//                 headers: {
//                     'Authorization': `Bearer ${apiToken}`,
//                     'Content-Type': 'application/json'
//                 }
//             });
    
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
    
//             const responseData = await response.json();
    
//             // Extract course name directly if Type.Id is 3 (Course Offering)
//             if (responseData.Type && responseData.Type.Id === 3) {
//                 return responseData.Name || 'N/A';
//             } else {
//                 return 'N/A'; // Return N/A if not a course offering or structure doesn't match
//             }
    
//         } catch (error) {
//             console.error(`Error fetching course name for orgId ${orgId}:`, error);
//             return 'N/A';
//         }
//     }

//     // Function to display user data
//     function displayUserData(allGradesAndNames) {
//         let htmlContent = '';

//         allGradesAndNames.forEach(item => {
//             const orgId = item.orgId;
//             const courseName = item.courseName || 'N/A';
//             const grades = item.grades;

//             htmlContent += `
//                 <div class="grid-item">
//                     <h4>Course: ${courseName}</h4>
//                     <div class="org-id">Org Unit ID: ${orgId}</div>
//                     <p>Grade: ${grades ? (grades.DisplayedGrade || 'N/A') : 'N/A'}</p>
//                 </div>
//             `;
//         });

//         userDataElement.innerHTML = htmlContent;
//     }

//     // Function to display data in the output table
//     function displayOutputTable(allGradesAndNames) {
//         outputTableBody.innerHTML = ''; // Clear existing table rows

//         allGradesAndNames.forEach(item => {
//             const orgId = item.orgId;
//             const courseName = item.courseName || 'N/A';
//             const grades = item.grades;

//             const row = document.createElement('tr');
//             row.innerHTML = `
//                 <td>${courseName}</td>
//                 <td>${orgId}</td>
//                 <td>${grades ? (grades.DisplayedGrade || 'N/A') : 'N/A'}</td>
//             `;
//             outputTableBody.appendChild(row);
//         });
//     }

//     // Function to convert percentage to grade point
//     function percentageToGradePoint(percentage) {
//         if (percentage >= 90) {
//             return 4.0;
//         } else if (percentage >= 80) {
//             return 3.0;
//         } else if (percentage >= 70) {
//             return 2.0;
//         } else if (percentage >= 60) {
//             return 1.0;
//         } else {
//             return 0.0;
//         }
//     }

//     // Function to calculate SGPA and CGPA
//     function calculateSGPACGPA(allGradesAndNames, method) {
//         let totalSGPA = 0;
//         let totalCredits = 0;
//         let totalCGPA = 0;
//         let totalCourses = 0;

//         allGradesAndNames.forEach(item => {
//             const grades = item.grades;
//             if (grades && grades.DisplayedGrade !== undefined) {
//                 const percentage = parseFloat(grades.DisplayedGrade);
//                 const gradePoint = method === 'percentage' ? percentage / 25 : percentageToGradePoint(percentage);
//                 totalSGPA += gradePoint;
//                 totalCredits += 1; // Assuming each course is worth 1 credit
//                 totalCGPA += gradePoint;
//                 totalCourses++;
//             }
//         });

//         const sgpa = totalSGPA / totalCredits || 0;
//         const cgpa = totalCGPA / totalCourses || 0;

//         return { sgpa, cgpa };
//     }

//     // Function to display SGPA
//     function displaySGPA(sgpa) {
//         sgpaResultsDiv.innerHTML = `
//             <h4>Calculated SGPA:</h4>
//             <p>SGPA: ${sgpa.toFixed(2)}</p>
//         `;
//     }

//     // Function to display CGPA
//     function displayCGPA(cgpa) {
//         cgpaResultsDiv.innerHTML = `
//             <h4>Calculated CGPA:</h4>
//             <p>CGPA: ${cgpa.toFixed(2)}</p>
//         `;
//     }

//     // Event listener for Fetch Data button
//     const fetchBtn = document.getElementById('fetchBtn');
//     if (fetchBtn) {
//         fetchBtn.addEventListener('click', async () => {
//             await fetchOrgUnitIds();
//         });
//     }
// });


//CODE 4 TO DISPLAY THE FILTERED DATA

// document.addEventListener('DOMContentLoaded', () => {
//     // Selecting HTML elements
//     const userIdInput = document.getElementById('userId');
//     const calculationMethodSelect = document.getElementById('calculationMethod');
//     const userDataElement = document.getElementById('userData');
//     const sgpaResultsDiv = document.getElementById('sgpa-results');
//     const cgpaResultsDiv = document.getElementById('cgpa-results');
//     const outputTableBody = document.getElementById('outputTableBody');

//     // Replace with your actual API token
//     const apiToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjRjZWJiNTM2LWQwNTItNDQ1OC04YTYyLWQwYWI0MmYyNjUxYSIsInR5cCI6IkpXVCJ9.eyJuYmYiOjE3MjA0MjY5MTcsImV4cCI6MTcyMDQ5ODkxNywiaXNzIjoiaHR0cHM6Ly9hcGkuYnJpZ2h0c3BhY2UuY29tL2F1dGgiLCJhdWQiOiJodHRwczovL2FwaS5icmlnaHRzcGFjZS5jb20vYXV0aC90b2tlbiIsInN1YiI6IjY4MiIsInRlbmFudGlkIjoiYzQyNmU0MmQtYWMyYS00ZTU3LTkxZTYtYTJiZjY0ZGNjYmQwIiwiYXpwIjoiN2UxMmUyZWItZGJhMy00MzU2LTkwYjQtYjE3ZTMyNzBlZjBkIiwic2NvcGUiOiJjb250ZW50Oio6KiBjb3JlOio6KiBkYXRhaHViOio6KiBlbnJvbGxtZW50Oio6KiBncmFkZXM6KjoqIG9yZ2FuaXphdGlvbnM6KjoqIHF1aXp6aW5nOio6KiByZXBvcnRpbmc6KjoqIHVzZXJzOio6KiIsImp0aSI6IjI5NDgxMzU0LTY5M2EtNDMxYS05MDBhLWFlZTQ1MGE4ZjRjMCJ9.I4NC6lapm76FCcHF_-pFBKrRFs2-4G4BDSfNNbAYfh-PcCVeCWFUXujvfOwCZijc-JJ2FM2AJGyI0RFX3rnqOT5-V9YgdBpS2G6n7iMnGKc7ZuinkKu8imkuTrarGge776IJr7FFQl117ek0kxk7mhsXZkvXv8o4dCSl8RIEFj7qUSd2C06h3pE6RXLPZi4Uq9qe-kcevXLONFXzSIWxVvkE1eqxD7XsNi8qTXJegAI0F_CurtCtLZDQDd4etyJ_fVxBC2d9C8gSGWkmjf-sgHKGHiC_PznZqk4otUM1I6ONkz-aqWnqEKoifH03kr-2uVknqi7Z4seKlDhQ0xHIWw';

//     // Function to fetch organization unit IDs and associated data
//     async function fetchOrgUnitIds() {
//         const userId = userIdInput.value.trim();
//         if (!userId) {
//             alert('Please enter a valid User ID.');
//             return null;
//         }

//         const apiUrl = `https://acadlms.d2l-partners.brightspace.com/d2l/api/lp/1.43/enrollments/users/${userId}/orgunits/`;

//         try {
//             const response = await fetch(apiUrl, {
//                 method: 'GET',
//                 headers: {
//                     'Authorization': `Bearer ${apiToken}`,
//                     'Content-Type': 'application/json'
//                 }
//             });

//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }

//             const data = await response.json();
//             const orgUnitIds = data.Items.map(item => item.OrgUnit.Id);

//             // Fetch grades and course names in parallel
//             const fetchPromises = orgUnitIds.map(orgId => {
//                 return Promise.all([
//                     fetchGrades(orgId, userId, apiToken),
//                     fetchCourseName(orgId, apiToken)
//                 ]).then(([grades, courseName]) => ({ orgId, grades, courseName }));
//             });

//             const allGradesAndNames = await Promise.all(fetchPromises);

//             if (allGradesAndNames.length === 0) {
//                 userDataElement.innerHTML = '<p>The user does not have any valid grades assigned.</p>';
//             } else {
//                 displayUserData(allGradesAndNames);
//                 displayOutputTable(allGradesAndNames); // Display data in the table
//                 const calculationMethod = calculationMethodSelect.value;
//                 const { sgpa, cgpa } = calculateSGPACGPA(allGradesAndNames, calculationMethod);
//                 displaySGPA(sgpa);
//                 displayCGPA(cgpa);
//             }

//             return allGradesAndNames;

//         } catch (error) {
//             console.error('Error fetching org unit IDs:', error);
//             return null;
//         }
//     }

//     // Function to fetch grades for a specific organization unit
//     async function fetchGrades(orgId, userId, apiToken) {
//         const gradeUrl = `https://acadlms.d2l-partners.brightspace.com/d2l/api/le/1.43/${orgId}/grades/final/values/${userId}`;

//         try {
//             const response = await fetch(gradeUrl, {
//                 headers: {
//                     'Authorization': `Bearer ${apiToken}`,
//                     'Content-Type': 'application/json'
//                 }
//             });

//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }

//             const gradeData = await response.json();
//             return gradeData;

//         } catch (error) {
//             console.error(`Error fetching grades for orgId ${orgId}:`, error);
//             return null;
//         }
//     }

//     // Function to fetch course name for a specific organization unit
//     async function fetchCourseName(orgId, apiToken) {
//         const courseUrl = `https://acadlms.d2l-partners.brightspace.com/d2l/api/lp/1.43/orgstructure/${orgId}`;
    
//         try {
//             const response = await fetch(courseUrl, {
//                 headers: {
//                     'Authorization': `Bearer ${apiToken}`,
//                     'Content-Type': 'application/json'
//                 }
//             });
    
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
    
//             const responseData = await response.json();
    
//             // Extract course name directly if Type.Id is 3 (Course Offering)
//             if (responseData.Type && responseData.Type.Id === 3) {
//                 return responseData.Name || 'N/A';
//             } else {
//                 return null; // Return null if not a course offering or structure doesn't match
//             }
    
//         } catch (error) {
//             console.error(`Error fetching course name for orgId ${orgId}:`, error);
//             return null;
//         }
//     }    

//     // Function to display user data
//     function displayUserData(allGradesAndNames) {
//         let htmlContent = '';
    
//         allGradesAndNames.forEach(item => {
//             const orgId = item.orgId;
//             const courseName = item.courseName;
//             const grades = item.grades;
    
//             if (courseName && orgId && grades && grades.DisplayedGrade !== undefined) {
//                 htmlContent += `
//                     <div class="grid-item">
//                         <h4>Course: ${courseName}</h4>
//                         <div class="org-id">Org Unit ID: ${orgId}</div>
//                         <p>Grade: ${grades ? (grades.DisplayedGrade || 'N/A') : 'N/A'}</p>
//                     </div>
//                 `;
//             }
//         });
    
//         userDataElement.innerHTML = htmlContent;
//     }    
    
//     // Function to display data in the output table
//     function displayOutputTable(allGradesAndNames) {
//         const outputTableBody = document.getElementById('outputTableBody');
//         outputTableBody.innerHTML = ''; // Clear existing table rows
    
//         allGradesAndNames.forEach(item => {
//             const orgId = item.orgId;
//             const courseName = item.courseName;
//             const grades = item.grades;
    
//             if (courseName && orgId && grades && grades.DisplayedGrade !== undefined) {
//                 const row = document.createElement('tr');
//                 row.innerHTML = `
//                     <td>${courseName}</td>
//                     <td>${orgId}</td>
//                     <td>${grades ? (grades.DisplayedGrade || 'N/A') : 'N/A'}</td>
//                 `;
//                 outputTableBody.appendChild(row);
//             }
//         });
//     }    

//     // Function to convert percentage to grade point
//     function percentageToGradePoint(percentage) {
//         if (percentage >= 90) {
//             return 4.0;
//         } else if (percentage >= 80) {
//             return 3.0;
//         } else if (percentage >= 70) {
//             return 2.0;
//         } else if (percentage >= 60) {
//             return 1.0;
//         } else {
//             return 0.0;
//         }
//     }

//     // Function to calculate SGPA and CGPA
//     function calculateSGPACGPA(allGradesAndNames, method) {
//         let totalSGPA = 0;
//         let totalCredits = 0;
//         let totalCGPA = 0;
//         let totalCourses = 0;

//         allGradesAndNames.forEach(item => {
//             const grades = item.grades;
//             if (grades && grades.DisplayedGrade !== undefined) {
//                 const percentage = parseFloat(grades.DisplayedGrade);
//                 const gradePoint = method === 'percentage' ? percentage / 25 : percentageToGradePoint(percentage);
//                 totalSGPA += gradePoint;
//                 totalCredits += 1; // Assuming each course is worth 1 credit
//                 totalCGPA += gradePoint;
//                 totalCourses++;
//             }
//         });

//         const sgpa = totalSGPA / totalCredits || 0;
//         const cgpa = totalCGPA / totalCourses || 0;

//         return { sgpa, cgpa };
//     }

//     // Function to display SGPA
//     function displaySGPA(sgpa) {
//         sgpaResultsDiv.innerHTML = `
//             <h4>Calculated SGPA:</h4>
//             <p>SGPA: ${sgpa.toFixed(2)}</p>
//         `;
//     }

//     // Function to display CGPA
//     function displayCGPA(cgpa) {
//         cgpaResultsDiv.innerHTML = `
//             <h4>Calculated CGPA:</h4>
//             <p>CGPA: ${cgpa.toFixed(2)}</p>
//         `;
//     }

//     // Event listener for Fetch Data button
//     const fetchBtn = document.getElementById('fetchBtn');
//     if (fetchBtn) {
//         fetchBtn.addEventListener('click', async () => {
//             await fetchOrgUnitIds();
//         });
//     }
// });

// DISPLAYING ONLY THE TABLE

// document.addEventListener('DOMContentLoaded', () => {
//     // Selecting HTML elements
//     const userIdInput = document.getElementById('userId');
//     const calculationMethodSelect = document.getElementById('calculationMethod');
//     const outputTableBody = document.getElementById('outputTableBody');

//     // Replace with your actual API token
//     const apiToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjRjZWJiNTM2LWQwNTItNDQ1OC04YTYyLWQwYWI0MmYyNjUxYSIsInR5cCI6IkpXVCJ9.eyJuYmYiOjE3MjA1MDAzMTUsImV4cCI6MTcyMDU3MjMxNSwiaXNzIjoiaHR0cHM6Ly9hcGkuYnJpZ2h0c3BhY2UuY29tL2F1dGgiLCJhdWQiOiJodHRwczovL2FwaS5icmlnaHRzcGFjZS5jb20vYXV0aC90b2tlbiIsInN1YiI6IjY4MiIsInRlbmFudGlkIjoiYzQyNmU0MmQtYWMyYS00ZTU3LTkxZTYtYTJiZjY0ZGNjYmQwIiwiYXpwIjoiN2UxMmUyZWItZGJhMy00MzU2LTkwYjQtYjE3ZTMyNzBlZjBkIiwic2NvcGUiOiJjb250ZW50Oio6KiBjb3JlOio6KiBkYXRhaHViOio6KiBlbnJvbGxtZW50Oio6KiBncmFkZXM6KjoqIG9yZ2FuaXphdGlvbnM6KjoqIHF1aXp6aW5nOio6KiByZXBvcnRpbmc6KjoqIHVzZXJzOio6KiIsImp0aSI6IjhkNDU4ZWI4LTJjN2UtNDExMy1hZWNlLTM5Y2I2YzczYmI4YiJ9.hyO2N8RslvKEqFnFNHrsEswwhdOqgjGF5Zy_ZTI5enPhE6qyHjpkgBZM_L-5SU7vEMOd6YKGrsC9e3zyVGdEFX2yYNUj63vAvDLfRa_0QiJgD6VQKrCH1hcGB9b1g3zqw1SA_pARxSZIt1OSNz7W2mGbvnTanQLdCGse52sbq0ApvQcfO3Nbz7lLrC5Y1xY0JKY-OxvJypCeNiRMKUfu9qKrOoc0l1z3xBEIv8zhOJRZvmnpVPoSnRYGVgvlYWoWFui-x_vg_lQjBIJHF5gwS8LupDIg_3-xh27mKw8hhth3km_6FRrIeM4uKhobAID_gBMYzRUMqryrdQ5SOz2bxA';

//     // Function to fetch organization unit IDs and associated data
//     async function fetchOrgUnitIds() {
//         const userId = userIdInput.value.trim();
//         if (!userId) {
//             alert('Please enter a valid User ID.');
//             return null;
//         }

//         const apiUrl = `https://acadlms.d2l-partners.brightspace.com/d2l/api/lp/1.43/enrollments/users/${userId}/orgunits/`;

//         try {
//                 const response = await fetch(apiUrl, {
//                 method: 'GET',
//                 headers: {
//                     'Authorization': `Bearer ${apiToken}`,
//                     'Content-Type': 'application/json'
//                 }
//             });

//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }

//             const data = await response.json();
//             const orgUnitIds = data.Items.map(item => item.OrgUnit.Id);

//             // Fetch grades and course names in parallel
//             const fetchPromises = orgUnitIds.map(orgId => {
//                 return Promise.all([
//                     fetchGrades(orgId, userId, apiToken),
//                     fetchCourseName(orgId, apiToken)
//                 ]).then(([grades, courseName]) => ({ orgId, grades, courseName }));
//             });

//             const allGradesAndNames = await Promise.all(fetchPromises);

//             if (allGradesAndNames.length === 0) {
//                 alert('The user does not have any valid grades assigned.');
//             } else {
//                 displayOutputTable(allGradesAndNames); // Display data in the table
//             }

//             return allGradesAndNames;

//         } catch (error) {
//             console.error('Error fetching org unit IDs:', error);
//             return null;
//         }
//     }

//     // Function to fetch grades for a specific organization unit
//     async function fetchGrades(orgId, userId, apiToken) {
//         const gradeUrl = `https://acadlms.d2l-partners.brightspace.com/d2l/api/le/1.43/${orgId}/grades/final/values/${userId}`;

//         try {
//             const response = await fetch(gradeUrl, {
//                 headers: {
//                     'Authorization': `Bearer ${apiToken}`,
//                     'Content-Type': 'application/json'
//                 }
//             });

//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }

//             const gradeData = await response.json();
//             return gradeData;

//         } catch (error) {
//             console.error(`Error fetching grades for orgId ${orgId}:`, error);
//             return null;
//         }
//     }

//     // Function to fetch course name for a specific organization unit
//     async function fetchCourseName(orgId, apiToken) {
//         const courseUrl = `https://acadlms.d2l-partners.brightspace.com/d2l/api/lp/1.43/orgstructure/${orgId}`;
    
//         try {
//             const response = await fetch(courseUrl, {
//                 headers: {
//                     'Authorization': `Bearer ${apiToken}`,
//                     'Content-Type': 'application/json'
//                 }
//             });
    
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
    
//             const responseData = await response.json();
    
//             // Extract course name directly if Type.Id is 3 (Course Offering)
//             if (responseData.Type && responseData.Type.Id === 3) {
//                 return responseData.Name || 'N/A';
//             } else {
//                 return null; // Return null if not a course offering or structure doesn't match
//             }
    
//         } catch (error) {
//             console.error(`Error fetching course name for orgId ${orgId}:`, error);
//             return null;
//         }
//     }    

//     // Function to display data in the output table
//     function displayOutputTable(allGradesAndNames) {
//         const outputTableBody = document.getElementById('outputTableBody');
//         outputTableBody.innerHTML = ''; // Clear existing table rows
    
//         allGradesAndNames.forEach(item => {
//             const orgId = item.orgId;
//             const courseName = item.courseName;
//             const grades = item.grades;
    
//             if (courseName && orgId && grades && grades.DisplayedGrade !== undefined) {
//                 const row = document.createElement('tr');
//                 row.innerHTML = `
//                     <td>${courseName}</td>
//                     <td>${orgId}</td>
//                     <td>${grades ? (grades.DisplayedGrade || 'N/A') : 'N/A'}</td>
//                 `;
//                 outputTableBody.appendChild(row);
//             }
//         });
//     }

//     // Event listener for Fetch Data button
//     const fetchBtn = document.getElementById('fetchBtn');
//     if (fetchBtn) {
//         fetchBtn.addEventListener('click', async () => {
//             await fetchOrgUnitIds();
//         });
//     }
// });

//UPDATED CODE TO CONNECT TO THE DATABASE

// document.addEventListener('DOMContentLoaded', () => {
//     // Selecting HTML elements
//     const userIdInput = document.getElementById('userId');
//     const calculationMethodSelect = document.getElementById('calculationMethod');
//     const outputTableBody = document.getElementById('outputTableBody');

//     // Replace with your actual API token
//     const apiToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjRjZWJiNTM2LWQwNTItNDQ1OC04YTYyLWQwYWI0MmYyNjUxYSIsInR5cCI6IkpXVCJ9.eyJuYmYiOjE3MjA2NzM5MDMsImV4cCI6MTcyMDc0NTkwMywiaXNzIjoiaHR0cHM6Ly9hcGkuYnJpZ2h0c3BhY2UuY29tL2F1dGgiLCJhdWQiOiJodHRwczovL2FwaS5icmlnaHRzcGFjZS5jb20vYXV0aC90b2tlbiIsInN1YiI6IjY4MiIsInRlbmFudGlkIjoiYzQyNmU0MmQtYWMyYS00ZTU3LTkxZTYtYTJiZjY0ZGNjYmQwIiwiYXpwIjoiN2UxMmUyZWItZGJhMy00MzU2LTkwYjQtYjE3ZTMyNzBlZjBkIiwic2NvcGUiOiJjb250ZW50Oio6KiBjb3JlOio6KiBkYXRhaHViOio6KiBlbnJvbGxtZW50Oio6KiBncmFkZXM6KjoqIG9yZ2FuaXphdGlvbnM6KjoqIHF1aXp6aW5nOio6KiByZXBvcnRpbmc6KjoqIHVzZXJzOio6KiIsImp0aSI6IjM3YjI1MmVkLWViZmQtNGU1MC04MTBlLWQ3MTEyOWE3NzJlOSJ9.gqv-NtsW_9eR7YTfaovEqjE7c2E_X3vLK3Cz2NB7qtz_ZB-mgrq-KXFUmbDrHu_Waravcc-ySLJGfBT18mgmYHGbV__RYB3J0Z2R7wj4EFpFAz1BhUx1BvpdgwEWIxAIMHZgo_PuzzRr_OnogOUgd0GNsJRLN6BsMea8JjWJxwZH-txILdyzfIQiLJthDYZdVxtQ7455rFeW2SodR13hiIVGpRKmqX7uPCSLWJxop7i5cWylLqFpvkY7t66QL2XhK6EbNAPLyZq3l1MoedIUWcqN215Cqg4923a4eiL4Zp3x3ZTlancYkNfcZQSvjqKIZP05xqa6kRUDajBgk9UkdQ';

//     // Function to fetch organization unit IDs and associated data
//     async function fetchOrgUnitIds() {
//         const userId = userIdInput.value.trim();
//         if (!userId) {
//             alert('Please enter a valid User ID.');
//             return null;
//         }

//         const apiUrl = `https://acadlms.d2l-partners.brightspace.com/d2l/api/lp/1.43/enrollments/users/${userId}/orgunits/`;

//         try {
//             const response = await fetch(apiUrl, {
//                 method: 'GET',
//                 headers: {
//                     'Authorization': `Bearer ${apiToken}`,
//                     'Content-Type': 'application/json'
//                 }
//             });

//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }

//             const data = await response.json();
//             const orgUnitIds = data.Items.map(item => item.OrgUnit.Id);

//             // Fetch grades and course names in parallel
//             const fetchPromises = orgUnitIds.map(orgId => {
//                 return Promise.all([
//                     fetchGrades(orgId, userId, apiToken),
//                     fetchCourseName(orgId, apiToken)
//                 ]).then(([grades, courseName]) => ({ orgId, grades, courseName }));
//             });

//             const allGradesAndNames = await Promise.all(fetchPromises);

//             if (allGradesAndNames.length === 0) {
//                 alert('The user does not have any valid grades assigned.');
//             } else {
//                 displayOutputTable(allGradesAndNames); // Display data in the table
//             }

//             return allGradesAndNames;

//         } catch (error) {
//             console.error('Error fetching org unit IDs:', error);
//             return null;
//         }
//     }

//     // Function to fetch grades for a specific organization unit
//     async function fetchGrades(orgId, userId, apiToken) {
//         const gradeUrl = `https://acadlms.d2l-partners.brightspace.com/d2l/api/le/1.43/${orgId}/grades/final/values/${userId}`;

//         try {
//             const response = await fetch(gradeUrl, {
//                 headers: {
//                     'Authorization': `Bearer ${apiToken}`,
//                     'Content-Type': 'application/json'
//                 }
//             });

//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }

//             const gradeData = await response.json();
//             return gradeData;

//         } catch (error) {
//             console.error(`Error fetching grades for orgId ${orgId}:`, error);
//             return null;
//         }
//     }

//     // Function to fetch course name for a specific organization unit
//     async function fetchCourseName(orgId, apiToken) {
//         const courseUrl = `https://acadlms.d2l-partners.brightspace.com/d2l/api/lp/1.43/orgstructure/${orgId}`;
    
//         try {
//             const response = await fetch(courseUrl, {
//                 headers: {
//                     'Authorization': `Bearer ${apiToken}`,
//                     'Content-Type': 'application/json'
//                 }
//             });
    
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
    
//             const responseData = await response.json();
    
//             // Extract course name directly if Type.Id is 3 (Course Offering)
//             if (responseData.Type && responseData.Type.Id === 3) {
//                 return responseData.Name || 'N/A';
//             } else {
//                 return null; // Return null if not a course offering or structure doesn't match
//             }
    
//         } catch (error) {
//             console.error(`Error fetching course name for orgId ${orgId}:`, error);
//             return null;
//         }
//     }    

//     // Function to store data using fetch API
//     async function storeData(courseName, orgId, displayedGrade) {
//         const data = {
//             course_name: courseName,
//             org_id: orgId,
//             displayed_grade: displayedGrade
//         };

//         try {
//             const response = await fetch('store_data.php', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(data)
//             });

//             const result = await response.json();
//             if (result.status === "success") {
//                 console.log("Data stored successfully");
//             } else {
//                 console.error("Error storing data:", result.message);
//             }
//         } catch (error) {
//             console.error('Error:', error);
//         }
//     }

//     // Function to display data in the output table and store it
//     function displayOutputTable(allGradesAndNames) {
//         const outputTableBody = document.getElementById('outputTableBody');
//         outputTableBody.innerHTML = ''; // Clear existing table rows
    
//         allGradesAndNames.forEach(item => {
//             const orgId = item.orgId;
//             const courseName = item.courseName;
//             const grades = item.grades;
    
//             if (courseName && orgId && grades && grades.DisplayedGrade !== undefined) {
//                 const row = document.createElement('tr');
//                 row.innerHTML = `
//                     <td>${courseName}</td>
//                     <td>${orgId}</td>
//                     <td>${grades ? (grades.DisplayedGrade || 'N/A') : 'N/A'}</td>
//                 `;
//                 outputTableBody.appendChild(row);

//                 // Store data in the database
//                 storeData(courseName, orgId, grades.DisplayedGrade);
//             }
//         });
//     }

//     // Event listener for Fetch Data button
//     const fetchBtn = document.getElementById('fetchBtn');
//     if (fetchBtn) {
//         fetchBtn.addEventListener('click', async () => {
//             await fetchOrgUnitIds();
//         });
//     }
// });

// ADDED A CONFIG WEB PAGE(INERFACE) TO CONFIG THE URLS AND APIS

// document.addEventListener('DOMContentLoaded', () => {
//     // Selecting HTML elements
//     const userIdInput = document.getElementById('userId');
//     const calculationMethodSelect = document.getElementById('calculationMethod');
//     const outputTableBody = document.getElementById('outputTableBody');

//     // Function to fetch organization unit IDs and associated data
//     async function fetchOrgUnitIds() {
//         const userId = userIdInput.value.trim();
//         if (!userId) {
//             alert('Please enter a valid User ID.');
//             return null;
//         }

//         const apiUrl = localStorage.getItem('apiUrl') + `/enrollments/users/${userId}/orgunits/`;
//         const apiToken = localStorage.getItem('apiToken');

//         try {
//             const response = await fetch(apiUrl, {
//                 method: 'GET',
//                 headers: {
//                     'Authorization': `Bearer ${apiToken}`,
//                     'Content-Type': 'application/json'
//                 }
//             });

//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }

//             const data = await response.json();
//             const orgUnitIds = data.Items.map(item => item.OrgUnit.Id);

//             // Fetch grades and course names in parallel
//             const fetchPromises = orgUnitIds.map(orgId => {
//                 return Promise.all([
//                     fetchGrades(orgId, userId, apiToken),
//                     fetchCourseName(orgId, apiToken)
//                 ]).then(([grades, courseName]) => ({ orgId, grades, courseName }));
//             });

//             const allGradesAndNames = await Promise.all(fetchPromises);

//             if (allGradesAndNames.length === 0) {
//                 alert('The user does not have any valid grades assigned.');
//             } else {
//                 displayOutputTable(allGradesAndNames); // Display data in the table
//             }

//             return allGradesAndNames;

//         } catch (error) {
//             console.error('Error fetching org unit IDs:', error);
//             return null;
//         }
//     }

//     // Function to fetch grades for a specific organization unit
//     async function fetchGrades(orgId, userId, apiToken) {
//         const gradeUrl = localStorage.getItem('apiUrl') + `/le/1.43/${orgId}/grades/final/values/${userId}`;

//         try {
//             const response = await fetch(gradeUrl, {
//                 headers: {
//                     'Authorization': `Bearer ${apiToken}`,
//                     'Content-Type': 'application/json'
//                 }
//             });

//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }

//             const gradeData = await response.json();
//             return gradeData;

//         } catch (error) {
//             console.error(`Error fetching grades for orgId ${orgId}:`, error);
//             return null;
//         }
//     }

//     // Function to fetch course name for a specific organization unit
//     async function fetchCourseName(orgId, apiToken) {
//         const courseUrl = localStorage.getItem('apiUrl') + `/lp/1.43/orgstructure/${orgId}`;
    
//         try {
//             const response = await fetch(courseUrl, {
//                 headers: {
//                     'Authorization': `Bearer ${apiToken}`,
//                     'Content-Type': 'application/json'
//                 }
//             });
    
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
    
//             const responseData = await response.json();
    
//             // Extract course name directly if Type.Id is 3 (Course Offering)
//             if (responseData.Type && responseData.Type.Id === 3) {
//                 return responseData.Name || 'N/A';
//             } else {
//                 return null; // Return null if not a course offering or structure doesn't match
//             }
    
//         } catch (error) {
//             console.error(`Error fetching course name for orgId ${orgId}:`, error);
//             return null;
//         }
//     }    

//     // Function to store data using fetch API
//     async function storeData(courseName, orgId, displayedGrade) {
//         const data = {
//             course_name: courseName,
//             org_id: orgId,
//             displayed_grade: displayedGrade
//         };

//         try {
//             const response = await fetch('store_data.php', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(data)
//             });

//             const result = await response.json();
//             if (result.status === "success") {
//                 console.log("Data stored successfully");
//             } else {
//                 console.error("Error storing data:", result.message);
//             }
//         } catch (error) {
//             console.error('Error:', error);
//         }
//     }

//     // Function to display data in the output table and store it
//     function displayOutputTable(allGradesAndNames) {
//         const outputTableBody = document.getElementById('outputTableBody');
//         outputTableBody.innerHTML = ''; // Clear existing table rows
    
//         allGradesAndNames.forEach(item => {
//             const orgId = item.orgId;
//             const courseName = item.courseName;
//             const grades = item.grades;
    
//             if (courseName && orgId && grades && grades.DisplayedGrade !== undefined) {
//                 const row = document.createElement('tr');
//                 row.innerHTML = `
//                     <td>${courseName}</td>
//                     <td>${orgId}</td>
//                     <td>${grades ? (grades.DisplayedGrade || 'N/A') : 'N/A'}</td>
//                 `;
//                 outputTableBody.appendChild(row);

//                 // Store data in the database
//                 storeData(courseName, orgId, grades.DisplayedGrade);
//             }
//         });
//     }

//     // Event listener for Fetch Data button
//     const fetchBtn = document.getElementById('fetchBtn');
//     if (fetchBtn) {
//         fetchBtn.addEventListener('click', async () => {
//             await fetchOrgUnitIds();
//         });
//     }
// });

//BUILD 2 FOR CONFIG

// document.addEventListener('DOMContentLoaded', () => {
//     // Selecting HTML elements
//     const userIdInput = document.getElementById('userId');
//     const calculationMethodSelect = document.getElementById('calculationMethod');
//     const outputTableBody = document.getElementById('outputTableBody');

//     // Retrieve API URL and token from local storage
//     const apiUrl = localStorage.getItem('apiUrl');
//     const apiToken = localStorage.getItem('apiToken');

//     if (!apiUrl || !apiToken) {
//         alert('API URL or Token is missing. Please configure the application first.');
//         return;
//     }

//     // Function to fetch organization unit IDs and associated data
//     async function fetchOrgUnitIds() {
//         const userId = userIdInput.value.trim();
//         if (!userId) {
//             alert('Please enter a valid User ID.');
//             return null;
//         }

//         const apiUrlWithUser = `${apiUrl}/d2l/api/lp/1.43/enrollments/users/${userId}/orgunits/`;

//         try {
//             const response = await fetch(apiUrlWithUser, {
//                 method: 'GET',
//                 headers: {
//                     'Authorization': `Bearer ${apiToken}`,
//                     'Content-Type': 'application/json'
//                 }
//             });

//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }

//             const data = await response.json();
//             const orgUnitIds = data.Items.map(item => item.OrgUnit.Id);

//             // Fetch grades and course names in parallel
//             const fetchPromises = orgUnitIds.map(orgId => {
//                 return Promise.all([
//                     fetchGrades(orgId, userId, apiToken),
//                     fetchCourseName(orgId, apiToken)
//                 ]).then(([grades, courseName]) => ({ orgId, grades, courseName }));
//             });

//             const allGradesAndNames = await Promise.all(fetchPromises);

//             if (allGradesAndNames.length === 0) {
//                 alert('The user does not have any valid grades assigned.');
//             } else {
//                 displayOutputTable(allGradesAndNames); // Display data in the table
//             }

//             return allGradesAndNames;

//         } catch (error) {
//             console.error('Error fetching org unit IDs:', error);
//             return null;
//         }
//     }

//     // Function to fetch grades for a specific organization unit
//     async function fetchGrades(orgId, userId, apiToken) {
//         const gradeUrl = `${apiUrl}/d2l/api/le/1.43/${orgId}/grades/final/values/${userId}`;

//         try {
//             const response = await fetch(gradeUrl, {
//                 headers: {
//                     'Authorization': `Bearer ${apiToken}`,
//                     'Content-Type': 'application/json'
//                 }
//             });

//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }

//             const gradeData = await response.json();
//             return gradeData;

//         } catch (error) {
//             console.error(`Error fetching grades for orgId ${orgId}:`, error);
//             return null;
//         }
//     }

//     // Function to fetch course name for a specific organization unit
//     async function fetchCourseName(orgId, apiToken) {
//         const courseUrl = `${apiUrl}/d2l/api/lp/1.43/orgstructure/${orgId}`;
    
//         try {
//             const response = await fetch(courseUrl, {
//                 headers: {
//                     'Authorization': `Bearer ${apiToken}`,
//                     'Content-Type': 'application/json'
//                 }
//             });
    
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
    
//             const responseData = await response.json();
    
//             // Extract course name directly if Type.Id is 3 (Course Offering)
//             if (responseData.Type && responseData.Type.Id === 3) {
//                 return responseData.Name || 'N/A';
//             } else {
//                 return null; // Return null if not a course offering or structure doesn't match
//             }
    
//         } catch (error) {
//             console.error(`Error fetching course name for orgId ${orgId}:`, error);
//             return null;
//         }
//     }    

//     // Function to store data using fetch API
// async function storeData(courseName, orgId, displayedGrade) {
//     const data = {
//         course_name: courseName,
//         org_id: orgId,
//         displayed_grade: displayedGrade
//     };

//     try {
//         const response = await fetch('http://localhost:3000/store_data', { // Update the URL if your server runs on a different port
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(data)
//         });

//         const result = await response.json();
//         if (result.status === "success") {
//             console.log("Data stored successfully");
//         } else {
//             console.error("Error storing data:", result.message);
//         }
//     } catch (error) {
//         console.error('Error:', error);
//     }
// }

//     // Function to display data in the output table and store it
//     function displayOutputTable(allGradesAndNames) {
//         const outputTableBody = document.getElementById('outputTableBody');
//         outputTableBody.innerHTML = ''; // Clear existing table rows
    
//         allGradesAndNames.forEach(item => {
//             const orgId = item.orgId;
//             const courseName = item.courseName;
//             const grades = item.grades;
    
//             if (courseName && orgId && grades && grades.DisplayedGrade !== undefined) {
//                 const row = document.createElement('tr');
//                 row.innerHTML = `
//                     <td>${courseName}</td>
//                     <td>${orgId}</td>
//                     <td>${grades ? (grades.DisplayedGrade || 'N/A') : 'N/A'}</td>
//                 `;
//                 outputTableBody.appendChild(row);

//                 // Store data in the database
//                 storeData(courseName, orgId, grades.DisplayedGrade);
//             }
//         });
//     }

//     // Event listener for Fetch Data button
//     const fetchBtn = document.getElementById('fetchBtn');
//     if (fetchBtn) {
//         fetchBtn.addEventListener('click', async () => {
//             await fetchOrgUnitIds();
//         });
//     }
// });

// MYSQL CONNECTION

// document.addEventListener('DOMContentLoaded', () => {
//     // Selecting HTML elements
//     const userIdInput = document.getElementById('userId');
//     const calculationMethodSelect = document.getElementById('calculationMethod');
//     const outputTableBody = document.getElementById('outputTableBody');

//     // Retrieve API URL and token from local storage
//     const apiUrl = localStorage.getItem('apiUrl');
//     const apiToken = localStorage.getItem('apiToken');

//     if (!apiUrl || !apiToken) {
//         alert('API URL or Token is missing. Please configure the application first.');
//         return;
//     }

//     // Function to fetch organization unit IDs and associated data
//     async function fetchOrgUnitIds() {
//         const userId = userIdInput.value.trim();
//         if (!userId) {
//             alert('Please enter a valid User ID.');
//             return null;
//         }

//         const apiUrlWithUser = `${apiUrl}/d2l/api/lp/1.43/enrollments/users/${userId}/orgunits/`;

//         try {
//             const response = await fetch(apiUrlWithUser, {
//                 method: 'GET',
//                 headers: {
//                     'Authorization': `Bearer ${apiToken}`,
//                     'Content-Type': 'application/json'
//                 }
//             });

//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }

//             const data = await response.json();
//             const orgUnitIds = data.Items.map(item => item.OrgUnit.Id);

//             // Fetch grades and course names in parallel
//             const fetchPromises = orgUnitIds.map(orgId => {
//                 return Promise.all([
//                     fetchGrades(orgId, userId, apiToken),
//                     fetchCourseName(orgId, apiToken)
//                 ]).then(([grades, courseName]) => ({ orgId, grades, courseName }));
//             });

//             const allGradesAndNames = await Promise.all(fetchPromises);

//             if (allGradesAndNames.length === 0) {
//                 alert('The user does not have any valid grades assigned.');
//             } else {
//                 displayOutputTable(allGradesAndNames); // Display data in the table
//             }

//             return allGradesAndNames;

//         } catch (error) {
//             console.error('Error fetching org unit IDs:', error);
//             return null;
//         }
//     }

//     // Function to fetch grades for a specific organization unit
//     async function fetchGrades(orgId, userId, apiToken) {
//         const gradeUrl = `${apiUrl}/d2l/api/le/1.43/${orgId}/grades/final/values/${userId}`;

//         try {
//             const response = await fetch(gradeUrl, {
//                 headers: {
//                     'Authorization': `Bearer ${apiToken}`,
//                     'Content-Type': 'application/json'
//                 }
//             });

//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }

//             const gradeData = await response.json();
//             return gradeData;

//         } catch (error) {
//             console.error(`Error fetching grades for orgId ${orgId}:`, error);
//             return null;
//         }
//     }

//     // Function to fetch course name for a specific organization unit
//     async function fetchCourseName(orgId, apiToken) {
//         const courseUrl = `${apiUrl}/d2l/api/lp/1.43/orgstructure/${orgId}`;
    
//         try {
//             const response = await fetch(courseUrl, {
//                 headers: {
//                     'Authorization': `Bearer ${apiToken}`,
//                     'Content-Type': 'application/json'
//                 }
//             });
    
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
    
//             const responseData = await response.json();
    
//             // Extract course name directly if Type.Id is 3 (Course Offering)
//             if (responseData.Type && responseData.Type.Id === 3) {
//                 return responseData.Name || 'N/A';
//             } else {
//                 return null; // Return null if not a course offering or structure doesn't match
//             }
    
//         } catch (error) {
//             console.error(`Error fetching course name for orgId ${orgId}:`, error);
//             return null;
//         }
//     }    

//     // Function to store data using fetch API
//     async function storeData(courseName, orgId, displayedGrade) {
//         const data = {
//             course_name: courseName,
//             org_id: orgId,
//             displayed_grade: displayedGrade
//         };

//         try {
//             const response = await fetch('http://localhost:4000/store_data', { // Update the URL if your server runs on a different port
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(data)
//             });

//             const result = await response.json();
//             if (result.status === "success") {
//                 console.log("Data stored successfully");
//             } else {
//                 console.error("Error storing data:", result.message);
//             }
//         } catch (error) {
//             console.error('Error:', error);
//         }
//     }

//     // Function to display data in the output table and store it
//     function displayOutputTable(allGradesAndNames) {
//         const outputTableBody = document.getElementById('outputTableBody');
//         outputTableBody.innerHTML = ''; // Clear existing table rows
    
//         allGradesAndNames.forEach(item => {
//             const orgId = item.orgId;
//             const courseName = item.courseName;
//             const grades = item.grades;
    
//             if (courseName && orgId && grades && grades.DisplayedGrade !== undefined) {
//                 const row = document.createElement('tr');
//                 row.innerHTML = `
//                     <td>${courseName}</td>
//                     <td>${orgId}</td>
//                     <td>${grades ? (grades.DisplayedGrade || 'N/A') : 'N/A'}</td>
//                 `;
//                 outputTableBody.appendChild(row);

//                 // Store data in the database
//                 storeData(courseName, orgId, grades.DisplayedGrade);
//             }
//         });
//     }

//     // Event listener for Fetch Data button
//     const fetchBtn = document.getElementById('fetchBtn');
//     if (fetchBtn) {
//         fetchBtn.addEventListener('click', async () => {
//             await fetchOrgUnitIds();
//         });
//     }
// });

// UPDATED

// document.addEventListener('DOMContentLoaded', () => {
//     // Selecting HTML elements
//     const userIdInput = document.getElementById('userId');
//     const calculationMethodSelect = document.getElementById('calculationMethod');
//     const outputTableBody = document.getElementById('outputTableBody');

//     // Retrieve API URL and token from local storage
//     const apiUrl = localStorage.getItem('apiUrl');
//     const apiToken = localStorage.getItem('apiToken');

//     if (!apiUrl || !apiToken) {
//         alert('API URL or Token is missing. Please configure the application first.');
//         return;
//     }

//     // Function to fetch organization unit IDs and associated data
//     async function fetchOrgUnitIds() {
//         const userId = userIdInput.value.trim();
//         if (!userId) {
//             alert('Please enter a valid User ID.');
//             return null;
//         }

//         const apiUrlWithUser = `${apiUrl}/d2l/api/lp/1.43/enrollments/users/${userId}/orgunits/`;

//         try {
//             const response = await fetch(apiUrlWithUser, {
//                 method: 'GET',
//                 headers: {
//                     'Authorization': `Bearer ${apiToken}`,
//                     'Content-Type': 'application/json'
//                 }
//             });

//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }

//             const data = await response.json();
//             const orgUnitIds = data.Items.map(item => item.OrgUnit.Id);

//             // Fetch grades and course names in parallel
//             const fetchPromises = orgUnitIds.map(orgId => {
//                 return Promise.all([
//                     fetchGrades(orgId, userId, apiToken),
//                     fetchCourseName(orgId, apiToken)
//                 ]).then(([grades, courseName]) => ({ orgId, grades, courseName }));
//             });

//             const allGradesAndNames = await Promise.all(fetchPromises);

//             if (allGradesAndNames.length === 0) {
//                 alert('The user does not have any valid grades assigned.');
//             } else {
//                 // Store data in local storage and redirect to the results page
//                 localStorage.setItem('gradesData', JSON.stringify(allGradesAndNames));
//                 window.location.href = 'results.html';
//             }

//             return allGradesAndNames;

//         } catch (error) {
//             console.error('Error fetching org unit IDs:', error);
//             return null;
//         }
//     }
// // Get the current URL
// var currentURL = window.location.href;

// // Display the current URL
// console.log("Current URL: " + currentURL);

//     // Function to fetch grades for a specific organization unit
//     async function fetchGrades(orgId, userId, apiToken) {
//         const gradeUrl = `${apiUrl}/d2l/api/le/1.43/${orgId}/grades/final/values/${userId}`;

//         try {
//             const response = await fetch(gradeUrl, {
//                 headers: {
//                     'Authorization': `Bearer ${apiToken}`,
//                     'Content-Type': 'application/json'
//                 }
//             });

//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }

//             const gradeData = await response.json();
//             return gradeData;

//         } catch (error) {
//             console.error(`Error fetching grades for orgId ${orgId}:`, error);
//             return null;
//         }
//     }

//     // Function to fetch course name for a specific organization unit
//     async function fetchCourseName(orgId, apiToken) {
//         const courseUrl = `${apiUrl}/d2l/api/lp/1.43/orgstructure/${orgId}`;
    
//         try {
//             const response = await fetch(courseUrl, {
//                 headers: {
//                     'Authorization': `Bearer ${apiToken}`,
//                     'Content-Type': 'application/json'
//                 }
//             });
    
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
    
//             const responseData = await response.json();
    
//             // Extract course name directly if Type.Id is 3 (Course Offering)
//             if (responseData.Type && responseData.Type.Id === 3) {
//                 return responseData.Name || 'N/A';
//             } else {
//                 return null; // Return null if not a course offering or structure doesn't match
//             }
    
//         } catch (error) {
//             console.error(`Error fetching course name for orgId ${orgId}:`, error);
//             return null;
//         }
//     }    

//     // Event listener for Fetch Data button
//     const fetchBtn = document.getElementById('fetchBtn');
//     if (fetchBtn) {
//         fetchBtn.addEventListener('click', async () => {
//             await fetchOrgUnitIds();
//         });
//     }
// });


// document.addEventListener('DOMContentLoaded', () => {
//     // Selecting HTML elements
//     const userIdInput = document.getElementById('userId');
//     const outputTableBody = document.getElementById('outputTableBody');

//     // Retrieve API URL and token from local storage
//     const apiUrl = localStorage.getItem('apiUrl');
//     const apiToken = localStorage.getItem('apiToken');

//     if (!apiUrl || !apiToken) {
//         alert('API URL or Token is missing. Please configure the application first.');
//         return;
//     }

//     // Function to fetch organization unit IDs and associated data
//     async function fetchOrgUnitIds() {
//         const userId = userIdInput.value.trim();
//         if (!userId) {
//             alert('Please enter a valid User ID.');
//             return null;
//         }

//         const apiUrlWithUser = `${apiUrl}/d2l/api/lp/1.43/enrollments/users/${userId}/orgunits/`;

//         try {
//             const response = await fetch(apiUrlWithUser, {
//                 method: 'GET',
//                 headers: {
//                     'Authorization': `Bearer ${apiToken}`,
//                     'Content-Type': 'application/json'
//                 }
//             });

//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }

//             const data = await response.json();
//             const orgUnitIds = data.Items.map(item => item.OrgUnit.Id);

//             // Fetch grades and course names in parallel
//             const fetchPromises = orgUnitIds.map(orgId => {
//                 return Promise.all([
//                     fetchGrades(orgId, userId, apiToken),
//                     fetchCourseName(orgId, apiToken)
//                 ]).then(([grades, courseName]) => ({ orgId, grades, courseName }));
//             });

//             const allGradesAndNames = await Promise.all(fetchPromises);

//             if (allGradesAndNames.length === 0) {
//                 alert('The user does not have any valid grades assigned.');
//             } else {
//                 // Store data in local storage and redirect to the results page
//                 localStorage.setItem('gradesData', JSON.stringify(allGradesAndNames));
//                 window.location.href = 'results.html';
//             }

//             return allGradesAndNames;

//         } catch (error) {
//             console.error('Error fetching org unit IDs:', error);
//             return null;
//         }
//     }

//     // Function to fetch grades for a specific organization unit
//     async function fetchGrades(orgId, userId, apiToken) {
//         const gradeUrl = `${apiUrl}/d2l/api/le/1.43/${orgId}/grades/final/values/${userId}`;

//         try {
//             const response = await fetch(gradeUrl, {
//                 headers: {
//                     'Authorization': `Bearer ${apiToken}`,
//                     'Content-Type': 'application/json'
//                 }
//             });

//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }

//             const gradeData = await response.json();
//             return gradeData;

//         } catch (error) {
//             console.error(`Error fetching grades for orgId ${orgId}:`, error);
//             return null;
//         }
//     }

//     // Function to fetch course name for a specific organization unit
//     async function fetchCourseName(orgId, apiToken) {
//         const courseUrl = `${apiUrl}/d2l/api/lp/1.43/orgstructure/${orgId}`;
    
//         try {
//             const response = await fetch(courseUrl, {
//                 headers: {
//                     'Authorization': `Bearer ${apiToken}`,
//                     'Content-Type': 'application/json'
//                 }
//             });
    
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
    
//             const responseData = await response.json();
    
//             // Extract course name directly if Type.Id is 3 (Course Offering)
//             if (responseData.Type && responseData.Type.Id === 3) {
//                 return responseData.Name || 'N/A';
//             } else {
//                 return null; // Return null if not a course offering or structure doesn't match
//             }
    
//         } catch (error) {
//             console.error(`Error fetching course name for orgId ${orgId}:`, error);
//             return null;
//         }
//     }    

//     // Event listener for Fetch Data button
//     const fetchBtn = document.getElementById('fetchBtn');
//     if (fetchBtn) {
//         fetchBtn.addEventListener('click', async () => {
//             await fetchOrgUnitIds();
//         });
//     }
// });


// UPDATED CODE WITH OAuth 2.0

document.addEventListener('DOMContentLoaded', () => {
    // Selecting HTML elements
    const userIdInput = document.getElementById('userId');
    const outputTableBody = document.getElementById('outputTableBody');
    const authorizeBtn = document.getElementById('authorizeBtn');
    const fetchBtn = document.getElementById('fetchBtn');

    // OAuth 2.0 configuration
    const clientId = 'YOUR_CLIENT_ID';
    const clientSecret = 'YOUR_CLIENT_SECRET';
    const redirectUri = 'https://localhost3001/';
    const authEndpoint = 'https://auth.brightspace.com/oauth2/auth';
    const tokenEndpoint = 'https://auth.brightspace.com/core/connect/token';
    let apiUrl = 'https://acadlms.d2l-partners.brightspace.com/';
    let apiToken = null;

    // Function to initiate OAuth 2.0 authorization
    function authorize() {
        const authUrl = `${authEndpoint}?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=*`;
        window.location.href = authUrl;
    }

    // Function to handle the OAuth 2.0 callback
    async function handleCallback() {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');

        if (code) {
            try {
                const response = await fetch(tokenEndpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: new URLSearchParams({
                        grant_type: 'authorization_code',
                        code: code,
                        redirect_uri: redirectUri,
                        client_id: clientId,
                        client_secret: clientSecret
                    })
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const tokenData = await response.json();
                apiToken = tokenData.access_token;

                // Remove code parameter from URL
                window.history.replaceState({}, document.title, redirectUri);
            } catch (error) {
                console.error('Error exchanging authorization code for access token:', error);
            }
        }
    }

    // Handle OAuth 2.0 callback if code parameter is present
    if (window.location.search.includes('code=')) {
        handleCallback();
    }

    // Function to fetch organization unit IDs and associated data
    async function fetchOrgUnitIds() {
        const userId = userIdInput.value.trim();
        if (!userId) {
            alert('Please enter a valid User ID.');
            return null;
        }

        const apiUrlWithUser = `${apiUrl}/d2l/api/lp/1.43/enrollments/users/${userId}/orgunits/`;

        try {
            const response = await fetch(apiUrlWithUser, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${apiToken}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            const orgUnitIds = data.Items.map(item => item.OrgUnit.Id);

            // Fetch grades and course names in parallel
            const fetchPromises = orgUnitIds.map(orgId => {
                return Promise.all([
                    fetchGrades(orgId, userId, apiToken),
                    fetchCourseName(orgId, apiToken)
                ]).then(([grades, courseName]) => ({ orgId, grades, courseName }));
            });

            const allGradesAndNames = await Promise.all(fetchPromises);

            if (allGradesAndNames.length === 0) {
                alert('The user does not have any valid grades assigned.');
            } else {
                // Store data in local storage and redirect to the results page
                localStorage.setItem('gradesData', JSON.stringify(allGradesAndNames));
                window.location.href = 'results.html';
            }

            return allGradesAndNames;

        } catch (error) {
            console.error('Error fetching org unit IDs:', error);
            return null;
        }
    }

    // Function to fetch grades for a specific organization unit
    async function fetchGrades(orgId, userId, apiToken) {
        const gradeUrl = `${apiUrl}/d2l/api/le/1.43/${orgId}/grades/final/values/${userId}`;

        try {
            const response = await fetch(gradeUrl, {
                headers: {
                    'Authorization': `Bearer ${apiToken}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const gradeData = await response.json();
            return gradeData;

        } catch (error) {
            console.error(`Error fetching grades for orgId ${orgId}:`, error);
            return null;
        }
    }

    // Function to fetch course name for a specific organization unit
    async function fetchCourseName(orgId, apiToken) {
        const courseUrl = `${apiUrl}/d2l/api/lp/1.43/orgstructure/${orgId}`;
    
        try {
            const response = await fetch(courseUrl, {
                headers: {
                    'Authorization': `Bearer ${apiToken}`,
                    'Content-Type': 'application/json'
                }
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const responseData = await response.json();
    
            // Extract course name directly if Type.Id is 3 (Course Offering)
            if (responseData.Type && responseData.Type.Id === 3) {
                return responseData.Name || 'N/A';
            } else {
                return null; // Return null if not a course offering or structure doesn't match
            }
    
        } catch (error) {
            console.error(`Error fetching course name for orgId ${orgId}:`, error);
            return null;
        }
    }    

    // Event listener for Fetch Data button
    if (fetchBtn) {
        fetchBtn.addEventListener('click', async () => {
            await fetchOrgUnitIds();
        });
    }

    // Event listener for Authorize button
    if (authorizeBtn) {
        authorizeBtn.addEventListener('click', authorize);
    }
});

## Getting Started

1. Clone this repository to your local machine:
```bash
git clone https://github.com/your-username/Blog-App-using-MERN-stack.git
```

2. Install the required dependencies for both the backend and frontend:
```bash
cd frontend-coding-challenge
cd server && npm install
cd ../absence-manager-frontend && npm install
```

3. Start the backend server:
```bash
cd server && npm start
```

5. Start the frontend application:
```bash
cd absence-manager-frontend && npm start
```

6. Access the application in your web browser at [http://localhost:3000](http://localhost:3000).


## Functionalities
- **List Absences :** 🗓️ View absence records.
- **Color Indicators :** 🎨 Visual status cues (🔴:Rejected, 🟢:Confirmed, 🟠:Requested).
- **Filter Absences :** 🔍 Filter by type, start date, and end date.
- **Export to iCal :** 📅 Download absence records in iCal format.
- **Cancel Filters :** 🔄 Revert applied filters.
- **Pagination :** 📄 Navigate through records seamlessly.


## Technologies Used

*__Client__*<br>
[React](https://reactjs.org/)<br>
[Axios](https://github.com/axios)<br>
*__API__*<br>
[Node.js](https://nodejs.org/en/docs/) <br>
[Express](https://expressjs.com/)<br>


## Project structure

```
├───absence-manager-frontend
│   └───src
│       │   App.css
│       │   App.js
│       │   index.css
│       │   index.js
│       │
│       ├───components
│       │       AbsenceItem.js
│       │       EmptyStateComponent.js
│       │       ErrorComponent.js
│       │       FilterBar.js
│       │       Footer.js
│       │       LoadingComponent.js
│       │       NavBar.js
│       │       PaginatedAbsenceList.js
│       │       PagincationButtons.js
│       │
│       ├───componentsTests
│       │       AbsenceItem.test.js
│       │       EmptyStateComponent.test.js
│       │       ErrorComponent.test.js
│       │       FilterBar.test.js
│       │       Footer.test.js
│       │       LoadingComponent.test.js
│       │       NavBar.test.js
│       │       PaginatedAbsenceList.test.js
│       │       PagincationButtons.test.js
│       │
│       ├───pages
│       │       AbsenceManager.js
│       │       AbsenceManager.test.js
│       │
│       └───utils
│               api.js
│               constants.js
│               helperFunctions.js
│               helperFunctions.test.js
│
└───server
    │   app.js
    │
    └───api
        │   api.js
        │
        └───json_files
                absences.json
                members.json
```
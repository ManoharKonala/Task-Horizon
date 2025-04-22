# Task Horizon

Task Horizon is a modern task management dashboard application built to help users organize, track, and manage tasks efficiently. With a sleek neon-themed interface, interactive widgets, and real-time updates, it provides an intuitive experience for both individual and team task management.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)


## Features
```markdown
- ** Comprehensive Task Management **: Enable the creation, editing, deletion, and status toggling (complete/incomplete) of tasks through an intuitive interface, supported by seamless backend integration for data persistence.
- **Multi-Perspective Task Views**: Provide flexible navigation across multiple views—Dashboard for an overview, All Tasks for system-wide visibility, My Tasks for user-specific tasks, and Assigned Tasks for delegated responsibilities—ensuring tailored task oversight.
- **Real-Time Task Progress Visualization**: Deliver an interactive doughnut chart that dynamically updates to reflect task distribution across statuses (Completed, In Progress, Pending, Not Yet Started), enhancing decision-making with visual analytics.
- **Detailed Status Monitoring**: Offer a granular breakdown of task statuses with live counts, allowing users to monitor progress and identify bottlenecks across In Progress, Completed, Pending, and Not Yet Started categories.
- **Efficient Task Search Functionality**: Implement a robust search bar that filters tasks by name in real-time, optimizing task retrieval and improving productivity for users managing large task lists.
- **Customizable User Interface**: Support theme toggling between professionally designed dark and light modes, ensuring accessibility and a personalized experience for all users.
- **Secure User Authentication**: Integrate a robust authentication system with login and logout capabilities, leveraging backend APIs (e.g., `/api/auth/user`) to ensure secure access and user data management.
- **Advanced Team Management**: Facilitate team collaboration by allowing task assignment to team members, monitoring assigned tasks, and managing workflows with role-based delegation, supported by backend team data retrieval (e.g., `/api/team`).
- **Optimized Responsive Design**: Feature a collapsible sidebar and a layout optimized for desktop environments, providing a fluid and adaptable user experience across different screen sizes.
```
## Technologies Used
- **HTML5**: Structure and layout of the dashboard.
- **CSS3**: Styling with a neon theme, including Chart.js integration for visualizations.
- **JavaScript**: Core functionality, including API calls and interactivity.
- **Chart.js**: For creating the task progress doughnut chart.
- **Interact.js**: For potential future drag-and-drop features.
- **Toastr.js**: For notification alerts.
- **Font Awesome**: Icons for UI elements.
- **Backend API**: Placeholder for authentication and task management (e.g., `/api/auth`, `/api/tasks`).
- 
## Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/task-horizon.git
   cd task-horizon
## Contributing
```markdown
We welcome contributions to enhance Task Horizon! To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes and commit them (`git commit -m "Add your message"`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request with a clear description of your changes.
- **Login**: The application checks authentication on load. Update the `checkAuth` function to integrate with your authentication system.
- **Add Tasks**: Use the "Add New Task" widget to create tasks with a name, dates, priority, and optional assignee.
- **Manage Tasks**: Click the action button (...) on a task row to edit, mark as complete, or delete it.
- **Switch Views**: Use the sidebar to navigate between different task views.
- **Toggle Theme**: Click "Toggle Theme" to switch between dark and light modes.
Please ensure your code follows the project's style guidelines and includes appropriate tests.
```
## Usage
```markdown
Task Horizon is designed to streamline task and team management with a user-friendly interface. Follow these steps to effectively utilize its features:

- **Authentication**:
  - Upon loading, the application verifies user authentication. Modify the `checkAuth` function in the JavaScript code to integrate with your existing authentication system (e.g., OAuth, JWT). Ensure the backend API endpoint (`/api/auth/user`) is configured to return user data, including name and email.

- **Task Creation**:
  - Navigate to the "Add New Task" widget on the dashboard.
  - Enter a task name, select start and end dates using the date pickers, choose a priority (Low, Medium, High) from the dropdown, and optionally assign the task to a team member from the "Assign To" dropdown.
  - Click "Add Task" to submit. The task will be saved via the `/api/tasks` endpoint and reflected in the task list.

- **Task Management**:
  - View and manage tasks in the task table. Click the action button (...) on any task row to open a modal with options to:
    - **Edit**: Update the task name, dates, or priority via a prompt interface.
    - **Mark as Complete/Incomplete**: Toggle the task status, updating it through the `/api/tasks/{id}` endpoint.
    - **Delete**: Remove the task permanently after confirmation, using the `/api/tasks/{id}` DELETE request.
  - Changes are synchronized in real-time across the dashboard.

- **View Navigation**:
  - Use the sidebar to switch between views:
    - **Dashboard**: Overview with task progress chart and status summary.
    - **All Tasks**: Display all tasks in the system.
    - **My Tasks**: View tasks assigned to the logged-in user.
    - **Assigned Tasks**: Manage tasks assigned to other team members (available in non-"My Tasks" views).
  - Select a view by clicking the corresponding button, which updates the table and widget data accordingly.

- **Team Management**:
  - Assign tasks to team members by selecting a user from the "Assign To" dropdown in the "Add New Task" widget. This requires a backend to populate the dropdown with team member data (e.g., via `/api/team`).
  - In the "Assigned Tasks" view, monitor and manage tasks delegated to others, with options to reassign or update statuses as needed.
  - Ensure the backend supports team member retrieval and assignment updates via API calls.

- **Theme Customization**:
  - Enhance usability by toggling between dark and light themes. Click the "Toggle Theme" button in the header to switch modes, adjusting the interface to your preference.

- **Search Functionality**:
  - Use the search bar to filter tasks by name. Type a keyword, and the task table will dynamically update to show matching entries.

This application assumes a backend API for data persistence and user management. Configure the frontend JavaScript to match your API endpoints (e.g., `/api/tasks`, `/api/auth`) for full functionality.
```
## Setup
1. Install dependencies: `npm install`
2. Set up MongoDB Atlas:
   - Create a cluster and database user.
   - Configure network access (Allow Access From Anywhere for development).
   - Copy the connection string and add it to `.env` as `ATLAS_URI`.
3. Configure email:
   - Add `EMAIL_USER` and `EMAIL_PASS` (app password for Gmail) to `.env`.
4. Run locally: `npm run dev`
5. Deploy:
   - Back-end: Push to Heroku with a `Procfile` (web: node server/server.js).
   - Front-end: Deploy `/public` to Vercel.

## License
This project is licensed under the [MIT License](LICENSE). See the `LICENSE` file for details.

## Contact
- **Author**: Manohar Konala
- **Email**: konalavrmanohar@gmail.com
- **GitHub**: (https://github.com/ManoharKonala)

Feel free to open an issue or contact me for questions, feedback, or collaboration opportunities!

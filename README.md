# BloodFlow (Every Drop Counts, Every Life Thrives)

### Admin Credentials:
- **Username:** sheikhmuhammadantor@gmail.com
- **Password:** Muhammad

### Live Site URL:
[bloodflow.com](https://bloodflow.netlify.app/)

## Features of BloodFlow:
1. **User Role Management:**
   - Supports three roles: Donor, Volunteer, and Admin.
   - Admin can manage user roles and statuses efficiently.

2. **My Donation Requests:**
   - Donors can view all their donation requests in a well-organized table.
   - Includes filtering options by status (Pending, In-progress, Done, Canceled).

3. **Donation Request Management:**
   - Users can edit or delete their requests.
   - Status management for donation requests, including marking as "Done" or "Canceled."

4. **All Users Page (Admin Panel):**
   - Admins can view all users in a tabular format.
   - Advanced filtering options (Active, Blocked).
   - Admin actions include blocking, unblocking, role changes (e.g., Donor to Volunteer).

5. **Content Management System:**
   - Admins can add, edit, and manage blogs.
   - Blog status management (Draft, Published) with a rich-text editor for content creation.

6. **Responsive and User-Friendly Design:**
   - Fully responsive across devices.
   - Styled using TailwindCSS and DaisyUI for a modern look.

7. **Real-Time Updates:**
   - Integrated TanStack Query for efficient data fetching and refetching.
   - Axios for seamless API communication.

8. **Secure Authentication:**
   - JWT-based authentication for secure user sessions.
   - Role-based access control to ensure data protection.

9. **Dynamic Filtering and Search:**
   - Dropdown filters and search functionality for an improved user experience.

10. **Robust API Integration:**
    - Back-end communication via RESTful APIs.
    - Scalable design for future enhancements.

## Technical Highlights:
- **Frontend Technologies:** React, Axios, TanStack Query, TailwindCSS, DaisyUI.
- **Backend Technologies:** Node.js, Express.js, MongoDB.
- **Additional Libraries:** React Hot Toast, SweetAlert2, Jodit-react, React Icon
- **Hosting:** Hosted on netlify for frontend and varcel for backend.

## Installation and Setup:
1. Clone the repository:
   ```bash
   git clone https://github.com/Programming-Hero-Web-Course4/b10a12-client-side-sheikhmuhammadantor
   ```
2. Navigate to the project directory:
   ```bash
   cd b10a12-client-side-sheikhmuhammadantor
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Configure environment variables:
   - Add a `.env.local` file with necessary keys (e.g., database URI, JWT secret).
5. Start the development server:
   ```bash
   npm run dev
   ```

## Contribution Guidelines:
- Fork the repository and create a new branch for your feature.
- Submit a pull request with detailed information about your changes.

---
**"Every drop counts, every life thrives" — Join us in saving lives through BloodFlow.**
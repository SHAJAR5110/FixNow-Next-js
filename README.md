# FixNow - Service Marketplace Platform

FixNow is a comprehensive service marketplace platform designed to connect clients with skilled professionals such as plumbers, electricians, and other tradespeople. The platform offers an efficient, secure, and user-friendly experience for both clients and service providers, enabling seamless job management, secure payments, and transparent reviews.

---

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Dependencies](#dependencies)
- [License](#license)
- [Contributing](#contributing)
- [Contact](#contact)

---

## Features

- **Professional Profiles**: Showcase skills, experience, and reviews for service providers.
- **Job Postings**: Allow clients to create detailed job requests.
- **Services**: Services from the sevice providers are avialable .
- **Scalability**: Designed to handle a growing number of users and data efficiently.

---

## Technologies Used

- **Frontend**: [Next.js](https://nextjs.org/) with JavaScript
- **Backend**: [Node.js](https://nodejs.org/) with server-side rendering
- **Database**: [MongoDb] (MongoDB) integrated using MongoDB atlas
- **Version Control**: Git
- **Deployment**: Can be deployed on platforms like Vercel, AWS, or others

---

## Installation

Follow these steps to set up FixNow locally:

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Git**

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/SHAJAR5110/FixNow-Next-js.git
   cd fixnow
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up the database:

   - Create a mongoose instance.
   - Update the `.env` file with your database connection string:

     ```env
     DATABASE_URL="your_neon_connection_string"
     ```

4. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open your browser and navigate to `http://localhost:3000`.

---

## Usage

- **Clients**: Create an account, post job requests, and hire professionals.
- **Professionals**: Sign up, build a profile, and respond to job requests.


---

## Dependencies

### Backend
- **Node.js**: JavaScript runtime environment

### Frontend
- **Next.js**: React framework for building user interfaces
- **React**: Library for UI development

### Other
- **dotenv**: Environment variable management
- **axios**: HTTP client for API requests
- **jsonwebtoken**: User authentication

---

## License

This project is licensed under the MIT License. See the full license text below:

```text
MIT License

Copyright (c) 2024 FixNow

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix:

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. Commit your changes:

   ```bash
   git commit -m "Add your feature description"
   ```

4. Push to the branch:

   ```bash
   git push origin feature/your-feature-name
   ```

5. Open a pull request.

---

## Contact

For questions or feedback, contact us at: [shajarabbas602@gmail.com](mailto:shajarabbas602@gmail.com).

---

Thank you for using FixNow! We look forward to your contributions and feedback.
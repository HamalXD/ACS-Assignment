# Secure User Registration System

A comprehensive React-based user registration and authentication system that implements cybersecurity best practices and demonstrates secure coding principles.

## 🚀 Features

### Security Features
- **Password Strength Validation**: Advanced password strength analysis using zxcvbn library
- **CAPTCHA Verification**: Prevents automated attacks and bot registrations
- **Password Hashing**: Secure password storage with salt using crypto-js
- **Password Reuse Prevention**: Tracks password history to prevent reuse
- **Input Validation**: Comprehensive client-side validation with sanitization
- **Username Uniqueness**: Ensures unique usernames across the system
- **Real-time Feedback**: Instant password strength and validation feedback
- **Secure Session Management**: Proper session handling and logout functionality

### User Interface
- **Modern Design**: Beautiful, responsive UI built with Tailwind CSS
- **Interactive Dashboard**: Admin dashboard with user management capabilities
- **Password Visibility Toggle**: Show/hide password functionality
- **Progress Indicators**: Visual feedback for password strength and validation
- **Responsive Layout**: Works seamlessly on desktop and mobile devices

## 🛠️ Technology Stack

- **Frontend**: React 19.1.0 with TypeScript
- **Build Tool**: Vite 5.4.0
- **Styling**: Tailwind CSS 3.4.1
- **Security Libraries**: 
  - `crypto-js` (4.2.0) - Password hashing and encryption
  - `zxcvbn` (4.4.2) - Password strength estimation
- **Development**: ESLint, TypeScript, PostCSS

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd secure-user-registration-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── Captcha.tsx     # CAPTCHA verification component
│   ├── Dashboard.tsx   # User management dashboard
│   ├── LoginForm.tsx   # User login form
│   ├── PasswordStrength.tsx # Password strength indicator
│   ├── RegistrationForm.tsx # User registration form
│   ├── SecurityFeatures.tsx # Security features display
│   └── UsersList.tsx   # User list component
├── hooks/              # Custom React hooks
│   ├── usePasswordStrength.ts # Password strength logic
│   └── usePasswordValidation.ts # Password validation logic
├── App.tsx             # Main application component
└── main.tsx           # Application entry point
```

## 🔐 Security Implementation

### Password Requirements
- Minimum 8 characters
- Mixed case (uppercase and lowercase)
- Numbers and special characters
- Password strength validation using zxcvbn
- Prevention of common passwords

### Data Protection
- Passwords are hashed with salt before storage
- No plain text passwords are stored
- Input sanitization and validation
- CAPTCHA protection against automated attacks

### Session Security
- Secure session management
- Proper logout functionality
- User authentication state management

## 🎯 Usage

### User Registration
1. Navigate to the registration page
2. Enter a unique username (3-20 characters, alphanumeric + underscore)
3. Create a strong password meeting all requirements
4. Complete the CAPTCHA verification
5. Submit the form to create your account

### User Login
1. Enter your username and password
2. Click login to access the dashboard
3. View your account information and security status

### Admin Dashboard
- View all registered users
- Monitor password strength across the system
- Search and sort user accounts
- View security statistics and metrics

## 🛡️ Security Best Practices Demonstrated

1. **Password Security**
   - Strong password requirements
   - Password strength estimation
   - Password history tracking
   - Secure hashing with salt

2. **Input Validation**
   - Client-side validation
   - Input sanitization
   - Username uniqueness checks
   - CAPTCHA verification

3. **Data Protection**
   - No sensitive data in client-side storage
   - Secure password handling
   - Proper session management

4. **User Experience**
   - Real-time feedback
   - Clear error messages
   - Intuitive interface design
   - Accessibility considerations

# Walnut - Investment App with Plaid Integration

**Budget Breaker? Meet Your Fix.**

Walnut is the revolutionary app for college students that makes saving automatic, even with irregular income. Uniquely, we harness your daily spending habits – not just your unpredictable incoming funds – giving you the flexibility you need to truly take control.

For ultimate discipline, Walnut directly re-routes your overspend into your financial goals. Plus, invest your discount wins and effortlessly round up every purchase. No more excuses.

Built for Capital One Tech Summit 2025.

**Innovatively presented by the Walnut Team**

## Features

- 🔗 **Plaid Integration**: Connect real bank accounts securely
- 💰 **Round-up Savings**: Automatically round up transactions to save
- 📊 **Transaction Tracking**: View and manage your spending
- 🎯 **Savings Goals**: Set and track investment targets
- 🧪 **Sandbox Environment**: Test with Plaid's sandbox data
- 📱 **Modern UI**: Beautiful, responsive design

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Plaid account (for API credentials)

## Setup Instructions

### 1. Get Plaid API Credentials

1. Sign up for a [Plaid account](https://dashboard.plaid.com/signup)
2. Navigate to the [Plaid Dashboard](https://dashboard.plaid.com/)
3. Go to "Team Settings" → "Keys"
4. Copy your `Client ID` and `Sandbox Secret`

### 2. Configure Environment Variables

#### Backend (.env file in server directory)

```bash
cd server
```

Create a `.env` file with your Plaid credentials:

```env
PORT=3001
PLAID_CLIENT_ID=your_client_id_here
PLAID_SANDBOX_SECRET=your_sandbox_secret_here
```

### 3. Install Dependencies

#### Frontend

```bash
npm install
```

#### Backend

```bash
cd server
npm install
```

### 4. Start the Application

#### Start the Backend Server

```bash
cd server
npm start
```

The server will run on `http://localhost:3001`

#### Start the Frontend Development Server

```bash
npm run dev
```

The app will run on `http://localhost:5173`

## Using the Sandbox Environment

### Test Credentials

When connecting a bank account in the sandbox environment, use these credentials:

- **Username**: `user_good`
- **Password**: `pass_good`
- **Bank**: Chase Bank (or any available institution)

### Available Sandbox Institutions

- Chase Bank (`ins_109508`)
- Bank of America (`ins_109509`)
- Wells Fargo (`ins_109510`)
- Citibank (`ins_109511`)
- US Bank (`ins_109512`)

### Test Data

The sandbox environment includes:

- Sample checking and savings accounts
- Historical transaction data
- Realistic merchant names and amounts

## API Endpoints

### Backend Server (Port 3001)

- `GET /api/health` - Health check
- `POST /api/create-link-token` - Create Plaid Link token
- `POST /api/exchange-token` - Exchange public token for access token
- `GET /api/accounts/:userId` - Get user's bank accounts
- `GET /api/transactions/:userId` - Get user's transactions
- `POST /api/sandbox/reset` - Reset sandbox data

## Project Structure

```
walnut/
├── src/
│   ├── components/
│   │   ├── Dashboard.jsx      # Main dashboard with Plaid integration
│   │   ├── Login.jsx          # Login component
│   │   └── PlaidLink.jsx      # Plaid Link component
│   ├── services/
│   │   └── plaidService.js    # Plaid API service
│   ├── config/
│   │   └── plaid.js           # Plaid configuration
│   └── styles/
│       ├── Dashboard.css      # Dashboard styles
│       ├── Login.css          # Login styles
│       └── PlaidLink.css      # Plaid Link styles
├── server/
│   ├── server.js              # Express server with Plaid API
│   ├── package.json           # Server dependencies
│   └── .env                   # Environment variables
└── package.json               # Frontend dependencies
```

## Development

### Adding New Features

1. Create new components in `src/components/`
2. Add corresponding styles in `src/styles/`
3. Update the main App component to include new routes

### Plaid Integration

- The app uses Plaid's Link component for secure bank authentication
- All Plaid API calls are proxied through the backend server
- Access tokens are stored server-side (in production, use a database)

### Styling

- CSS modules or regular CSS files
- Responsive design with mobile-first approach
- Consistent color scheme and typography

## Production Deployment

### Environment Variables

- Set `NODE_ENV=production`
- Use production Plaid credentials
- Configure proper CORS settings
- Set up a production database for storing access tokens

### Security Considerations

- Never expose Plaid secrets in client-side code
- Use HTTPS in production
- Implement proper user authentication
- Store access tokens securely in a database

## Troubleshooting

### Common Issues

1. **Plaid Link not loading**

   - Check that the backend server is running
   - Verify Plaid credentials in `.env` file
   - Check browser console for errors

2. **CORS errors**

   - Ensure the backend server has CORS enabled
   - Check that the frontend is making requests to the correct URL

3. **Transaction data not loading**
   - Verify that the bank account is properly connected
   - Check that the access token is valid
   - Ensure the date range is within available data

### Debug Mode

Enable debug logging by setting `DEBUG=true` in the backend `.env` file.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For issues related to:

- **Plaid API**: Check the [Plaid Documentation](https://plaid.com/docs/)
- **App functionality**: Open an issue in this repository
- **Setup problems**: Check the troubleshooting section above

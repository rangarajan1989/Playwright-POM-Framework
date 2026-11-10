### Environment Configuration

The framework uses environment variables to manage application
credentials and API configuration.

Create a local `.env` file using `.env.example` as a template.

Required variables:

- BASE_URL
- APP_USER_NAME
- APP_PASSWORD
- API_URL
- TOKEN

Never commit `.env` or actual credentials to the repository.
GitHub Actions uses repository secrets for CI execution.
